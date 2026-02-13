import { z } from 'zod';
import { ToolContext, ToolResponse, Arc42Section, ARC42_SECTIONS, SECTION_METADATA, resolveWorkspaceRoot, getErrorMessage } from '../types.js';
import { existsSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

// Zod schema as the SINGLE SOURCE OF TRUTH for tool input
const sectionValues = ARC42_SECTIONS as unknown as [Arc42Section, ...Arc42Section[]];

export const updateSectionInputSchema = {
  section: z.enum(sectionValues).describe('The section to update (e.g., "01_introduction_and_goals")'),
  content: z.string().describe('The markdown content to write to the section'),
  mode: z.enum(['replace', 'append']).optional().describe('Write mode: "replace" (default) or "append"'),
  targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.')
};

export const updateSectionDescription = `Update content in a specific arc42 section.

This tool allows you to add or update content in any of the 12 arc42 sections. The content will be written to the appropriate section file while preserving the overall structure.

You can optionally specify a targetFolder to update documentation in a specific directory instead of the default workspace.`;

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
    const sectionPath = join(workspaceRoot, 'sections', `${section}.md`);
    const metadata = SECTION_METADATA[section as Arc42Section];

    let finalContent = content;

    if (mode === 'append' && existsSync(sectionPath)) {
      const existingContent = await readFile(sectionPath, 'utf-8');
      finalContent = existingContent + '\n\n' + content;
    }

    await writeFile(sectionPath, finalContent);

    const wordCount = finalContent.split(/\s+/).length;

    return {
      success: true,
      message: `Section ${metadata.title} updated successfully`,
      data: {
        section,
        sectionTitle: metadata.title,
        path: sectionPath,
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
