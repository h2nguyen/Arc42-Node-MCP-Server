import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse, Arc42Section, SECTION_METADATA, resolveWorkspaceRoot } from '../types.js';
import { existsSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export const updateSectionTool: Tool = {
  name: 'update-section',
  description: `Update content in a specific arc42 section.

This tool allows you to add or update content in any of the 12 arc42 sections. The content will be written to the appropriate section file while preserving the overall structure.

You can optionally specify a targetFolder to update documentation in a specific directory instead of the default workspace.`,
  inputSchema: {
    type: 'object',
    properties: {
      section: {
        type: 'string',
        description: 'The section to update (e.g., "01_introduction_and_goals")',
        enum: [
          '01_introduction_and_goals',
          '02_architecture_constraints',
          '03_context_and_scope',
          '04_solution_strategy',
          '05_building_block_view',
          '06_runtime_view',
          '07_deployment_view',
          '08_concepts',
          '09_architecture_decisions',
          '10_quality_requirements',
          '11_technical_risks',
          '12_glossary'
        ]
      },
      content: {
        type: 'string',
        description: 'The markdown content to write to the section'
      },
      mode: {
        type: 'string',
        description: 'Write mode: "replace" (default) or "append"',
        enum: ['replace', 'append'],
        default: 'replace'
      },
      targetFolder: {
        type: 'string',
        description: 'Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.'
      }
    },
    required: ['section', 'content']
  }
};

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
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Failed to update section: ${errorMessage}`
    };
  }
}
