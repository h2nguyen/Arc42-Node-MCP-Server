import { z } from 'zod';
import { ToolContext, ToolResponse, ARC42_SECTIONS, SECTION_METADATA, resolveWorkspaceRoot, getErrorMessage } from '../types.js';
import {
  ARC42_REFERENCE,
  templateProvider,
  getAvailableLanguages,
  DEFAULT_OUTPUT_FORMAT,
  SUPPORTED_OUTPUT_FORMAT_CODES,
  detectOutputFormatFromFilename,
  outputFormatFactory,
  type OutputFormatCode
} from '../templates/index.js';
import { existsSync, statSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parse as parseYaml } from 'yaml';

// Zod schema as the SINGLE SOURCE OF TRUTH for tool input
export const arc42StatusInputSchema = {
  targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.')
};

export const arc42StatusDescription = `Check the status of arc42 documentation.

This tool provides an overview of which sections have been created, their completion status, and overall progress. Use this tool to track documentation progress and identify which sections need attention.

You can optionally specify a targetFolder to check documentation status in a specific directory instead of the default workspace.`;

/**
 * Find section file with any supported format extension
 */
function findSectionFile(sectionsDir: string, section: string): { path: string; format: OutputFormatCode } | null {
  // Check for .adoc first (default), then .md
  const extensions: Array<{ ext: string; format: OutputFormatCode }> = [
    { ext: '.adoc', format: 'asciidoc' },
    { ext: '.md', format: 'markdown' }
  ];

  for (const { ext, format } of extensions) {
    const sectionPath = join(sectionsDir, `${section}${ext}`);
    if (existsSync(sectionPath)) {
      return { path: sectionPath, format };
    }
  }

  return null;
}

/**
 * Detect format from existing files in sections directory
 */
function detectProjectFormat(sectionsDir: string): OutputFormatCode | undefined {
  if (!existsSync(sectionsDir)) {
    return undefined;
  }

  try {
    const files = readdirSync(sectionsDir);
    for (const file of files) {
      const format = detectOutputFormatFromFilename(file);
      if (format) {
        return format;
      }
    }
  } catch {
    // Ignore errors
  }

  return undefined;
}

export async function arc42StatusHandler(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<ToolResponse> {
  const targetFolder = args.targetFolder as string | undefined;

  // Resolve workspace root - use targetFolder if provided, otherwise use context default
  const { projectPath, workspaceRoot } = resolveWorkspaceRoot(context, targetFolder);

  if (!existsSync(workspaceRoot)) {
    return {
      success: false,
      message: 'arc42 workspace not initialized. Run arc42-init first.'
    };
  }

  try {
    const sectionsDir = join(workspaceRoot, 'sections');

    // Read language and format from config.yaml
    let language = 'EN';
    let configFormat: OutputFormatCode | undefined;
    let projectName = '';
    const configPath = join(workspaceRoot, 'config.yaml');
    if (existsSync(configPath)) {
      try {
        const configContent = readFileSync(configPath, 'utf-8');
        const config = parseYaml(configContent);
        if (config?.language) {
          language = String(config.language).toUpperCase();
        }
        if (config?.projectName) {
          projectName = String(config.projectName);
        }
        if (config?.format && SUPPORTED_OUTPUT_FORMAT_CODES.includes(config.format)) {
          configFormat = config.format as OutputFormatCode;
        }
      } catch {
        // If config parsing fails, use defaults
      }
    }

    // Detect format from existing files if not in config
    const detectedFormat = detectProjectFormat(sectionsDir);
    const effectiveFormat = configFormat || detectedFormat || DEFAULT_OUTPUT_FORMAT;
    const formatStrategy = outputFormatFactory.createWithFallback(effectiveFormat);

    // Get language info for display
    const availableLanguages = getAvailableLanguages();
    const currentLanguageInfo = availableLanguages.find(
      lang => lang.code === language
    ) || { code: 'EN', name: 'English', nativeName: 'English' };

    const status: {
      projectPath: string;
      workspaceRoot: string;
      projectName: string;
      initialized: boolean;
      language: {
        code: string;
        name: string;
        nativeName: string;
      };
      format: {
        code: OutputFormatCode;
        name: string;
        fileExtension: string;
        configuredFormat: OutputFormatCode | undefined;
        detectedFormat: OutputFormatCode | undefined;
      };
      availableLanguages: typeof availableLanguages;
      availableFormats: readonly OutputFormatCode[];
      arc42TemplateReference: {
        version: string;
        date: string;
        source: string;
      };
      sections: Record<string, unknown>;
      overallCompleteness?: number;
      lastModified?: string;
    } = {
      projectPath,
      workspaceRoot,
      projectName,
      initialized: true,
      language: currentLanguageInfo,
      format: {
        code: effectiveFormat,
        name: formatStrategy.name,
        fileExtension: formatStrategy.fileExtension,
        configuredFormat: configFormat,
        detectedFormat: detectedFormat
      },
      availableLanguages,
      availableFormats: SUPPORTED_OUTPUT_FORMAT_CODES,
      arc42TemplateReference: {
        version: ARC42_REFERENCE.version,
        date: ARC42_REFERENCE.date,
        source: ARC42_REFERENCE.sourceRepo
      },
      sections: {}
    };

    let totalCompleteness = 0;
    let lastModified: Date | undefined;

    for (const section of ARC42_SECTIONS) {
      const standardMetadata = SECTION_METADATA[section];

      // Get localized metadata
      const localizedMetadata = templateProvider.getSectionMetadata(section, language);

      // Find section file with any supported extension
      const sectionFile = findSectionFile(sectionsDir, section);

      if (sectionFile) {
        const stats = statSync(sectionFile.path);
        const content = readFileSync(sectionFile.path, 'utf-8');
        const wordCount = content.split(/\s+/).length;

        // Simple completeness heuristic: >50 words = some content
        const completeness = Math.min(100, Math.floor((wordCount / 100) * 100));

        status.sections[section] = {
          exists: true,
          path: sectionFile.path,
          format: sectionFile.format,
          lastModified: stats.mtime.toISOString(),
          wordCount,
          completeness,
          metadata: {
            ...standardMetadata,
            title: localizedMetadata.title,
            description: localizedMetadata.description
          }
        };

        totalCompleteness += completeness;

        if (!lastModified || stats.mtime > lastModified) {
          lastModified = stats.mtime;
        }
      } else {
        status.sections[section] = {
          exists: false,
          completeness: 0,
          metadata: {
            ...standardMetadata,
            title: localizedMetadata.title,
            description: localizedMetadata.description
          }
        };
      }
    }

    status.overallCompleteness = Math.floor(totalCompleteness / ARC42_SECTIONS.length);
    status.lastModified = lastModified?.toISOString();

    // Generate summary
    const completedSections = Object.values(status.sections).filter(
      (s) => (s as { completeness?: number }).completeness !== undefined && (s as { completeness: number }).completeness > 50
    ).length;

    return {
      success: true,
      message: `Documentation status: ${completedSections}/${ARC42_SECTIONS.length} sections have content (format: ${formatStrategy.name})`,
      data: status,
      nextSteps: [
        'Use generate-template to get section templates',
        'Use update-section to add content',
        'Focus on sections with low completeness'
      ]
    };

  } catch (error: unknown) {
    return {
      success: false,
      message: `Failed to check status: ${getErrorMessage(error)}`
    };
  }
}
