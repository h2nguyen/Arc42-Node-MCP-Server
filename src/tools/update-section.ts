import { z } from 'zod';
import { ToolContext, ToolResponse, Arc42Section, ARC42_SECTIONS, SECTION_METADATA, resolveWorkspaceRoot, getErrorMessage, countWords } from '../types.js';
import {
  type OutputFormatCode,
  DEFAULT_OUTPUT_FORMAT,
  outputFormatFactory
} from '../templates/index.js';
import { existsSync, readFileSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { parse as parseYaml } from 'yaml';

// Zod schema as the SINGLE SOURCE OF TRUTH for tool input
const sectionValues = ARC42_SECTIONS as unknown as [Arc42Section, ...Arc42Section[]];

export const updateSectionInputSchema = {
  section: z.enum(sectionValues).describe('The section to update (e.g., "01_introduction_and_goals")'),
  content: z.string().describe('The content to write to the section, in the workspace\'s configured format (asciidoc or markdown — check with arc42-status)'),
  mode: z.enum(['replace', 'append']).optional().default('replace').describe('Write mode: "replace" OVERWRITES the entire section file; "append" adds the content after the existing content. Use "append" when adding ADRs (section 09) or other incremental entries so existing content is preserved. Defaults to "replace".'),
  targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.')
};

export const updateSectionDescription = `Update content in a specific arc42 section.

This tool writes content to any of the 12 arc42 section files. The file format (asciidoc or markdown) is automatically detected from existing files or config.yaml — write the content in that format.

Write modes:
- "replace" (default): OVERWRITES the entire section file with the new content
- "append": adds the content after the existing content

IMPORTANT: use mode "append" when adding ADRs to section 09_architecture_decisions or when adding incremental entries, so existing content is preserved. Call get-section first to review existing content (e.g., to determine the next ADR number).

Recommended flow: generate-template (structure) -> get-section (existing content) -> update-section.

You can optionally specify a targetFolder to update documentation in a specific directory instead of the default workspace.`;

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
 * Read format from config.yaml
 */
function readFormatFromConfig(workspaceRoot: string): OutputFormatCode | undefined {
  const configPath = join(workspaceRoot, 'config.yaml');
  if (existsSync(configPath)) {
    try {
      const configContent = readFileSync(configPath, 'utf-8');
      const config = parseYaml(configContent);
      if (config?.format) {
        const format = String(config.format).toLowerCase();
        if (format === 'markdown' || format === 'asciidoc') {
          return format as OutputFormatCode;
        }
      }
    } catch {
      // Ignore parsing errors
    }
  }
  return undefined;
}

export async function updateSectionHandler(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<ToolResponse> {
  const section = args.section as string | undefined;
  const content = args.content as string | undefined;
  const mode = (args.mode as string) || 'replace';
  const targetFolder = args.targetFolder as string | undefined;

  if (!section || !content) {
    return {
      success: false,
      message: 'Section and content are required'
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
    const metadata = SECTION_METADATA[section as Arc42Section];

    // Try to find existing section file first
    let sectionFile = findSectionFile(sectionsDir, section);
    let detectedFormat: OutputFormatCode;

    if (sectionFile) {
      // Use the existing file's format
      detectedFormat = sectionFile.format;
    } else {
      // No existing file - use config format or default
      const configFormat = readFormatFromConfig(workspaceRoot);
      detectedFormat = configFormat || DEFAULT_OUTPUT_FORMAT;

      // Create the path for the new file
      const formatStrategy = outputFormatFactory.create(detectedFormat);
      const sectionFilename = formatStrategy.getSectionFilename(section);
      sectionFile = {
        path: join(sectionsDir, sectionFilename),
        format: detectedFormat
      };
    }

    let finalContent = content;

    if (mode === 'append' && existsSync(sectionFile.path)) {
      const existingContent = await readFile(sectionFile.path, 'utf-8');
      finalContent = existingContent + '\n\n' + content;
    }

    await writeFile(sectionFile.path, finalContent);

    const wordCount = countWords(finalContent);

    return {
      success: true,
      message: `Section ${metadata.title} updated successfully (${sectionFile.format} format)`,
      data: {
        section,
        sectionTitle: metadata.title,
        path: sectionFile.path,
        format: sectionFile.format,
        wordCount,
        mode
      },
      nextSteps: [
        'Check progress with: arc42-status',
        'Continue with next section if needed',
        'Review the updated content'
      ]
    };

  } catch (error: unknown) {
    return {
      success: false,
      message: `Failed to update section: ${getErrorMessage(error)}`
    };
  }
}
