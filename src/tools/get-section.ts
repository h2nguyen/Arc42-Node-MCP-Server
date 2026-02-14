import { z } from 'zod';
import { ToolContext, ToolResponse, Arc42Section, ARC42_SECTIONS, SECTION_METADATA, resolveWorkspaceRoot, getErrorMessage } from '../types.js';
import {
  templateProvider,
  type OutputFormatCode
} from '../templates/index.js';
import { existsSync, readFileSync } from 'fs';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { parse as parseYaml } from 'yaml';

// Zod schema as the SINGLE SOURCE OF TRUTH for tool input
const sectionValues = ARC42_SECTIONS as unknown as [Arc42Section, ...Arc42Section[]];

export const getSectionInputSchema = {
  section: z.enum(sectionValues).describe('The section to read (e.g., "01_introduction_and_goals")'),
  targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.')
};

export const getSectionDescription = `Read content from a specific arc42 section.

This tool allows you to retrieve the current content of any of the 12 arc42 sections. Use this to review existing documentation or before making updates.

You can optionally specify a targetFolder to read documentation from a specific directory instead of the default workspace.`;

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

export async function getSectionHandler(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<ToolResponse> {
  const section = args.section as string | undefined;
  const targetFolder = args.targetFolder as string | undefined;

  if (!section) {
    return {
      success: false,
      message: 'Section parameter is required'
    };
  }

  // Resolve workspace root - use targetFolder if provided, otherwise use context default
  const { workspaceRoot } = resolveWorkspaceRoot(context, targetFolder);
  if (!existsSync(workspaceRoot)) {
    return {
      success: false,
      message: 'arc42 workspace not initialized. Run arc42-init first.'
    };
  }

  try {
    const sectionsDir = join(workspaceRoot, 'sections');

    // Find section file with any supported extension
    const sectionFile = findSectionFile(sectionsDir, section);

    if (!sectionFile) {
      return {
        success: false,
        message: `Section file not found: ${section}. This section might not have been created yet. Expected ${section}.adoc or ${section}.md`
      };
    }

    // Read language from config.yaml
    let language = 'EN';
    const configPath = join(workspaceRoot, 'config.yaml');
    if (existsSync(configPath)) {
      try {
        const configContent = readFileSync(configPath, 'utf-8');
        const config = parseYaml(configContent);
        if (config?.language) {
          language = String(config.language).toUpperCase();
        }
      } catch {
        // If config parsing fails, use default language
      }
    }

    const content = await readFile(sectionFile.path, 'utf-8');
    const stats = await stat(sectionFile.path);
    const standardMetadata = SECTION_METADATA[section as Arc42Section];

    // Get localized metadata
    const localizedMetadata = templateProvider.getSectionMetadata(section as Arc42Section, language);

    const wordCount = content.trim() ? content.split(/\s+/).length : 0;

    return {
      success: true,
      message: `Section ${localizedMetadata.title} retrieved successfully (${sectionFile.format} format)`,
      data: {
        section,
        language,
        format: sectionFile.format,
        sectionTitle: localizedMetadata.title,
        sectionDescription: localizedMetadata.description,
        content,
        metadata: {
          ...standardMetadata,
          title: localizedMetadata.title,
          description: localizedMetadata.description,
          path: sectionFile.path,
          format: sectionFile.format,
          lastModified: stats.mtime.toISOString(),
          wordCount,
          size: stats.size
        }
      },
      nextSteps: [
        'Use update-section to modify this content',
        'Check status with arc42-status',
        'Generate a template for this section with generate-template'
      ]
    };

  } catch (error: unknown) {
    return {
      success: false,
      message: `Failed to retrieve section: ${getErrorMessage(error)}`
    };
  }
}
