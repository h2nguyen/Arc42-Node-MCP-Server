import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse, Arc42Section, SECTION_METADATA, resolveWorkspaceRoot } from '../types.js';
import { existsSync } from 'fs';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export const getSectionTool: Tool = {
  name: 'get-section',
  description: `Read content from a specific arc42 section.

This tool allows you to retrieve the current content of any of the 12 arc42 sections. Use this to review existing documentation or before making updates.

You can optionally specify a targetFolder to read documentation from a specific directory instead of the default workspace.`,
  inputSchema: {
    type: 'object',
    properties: {
      section: {
        type: 'string',
        description: 'The section to read (e.g., "01_introduction_and_goals")',
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
      targetFolder: {
        type: 'string',
        description: 'Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.'
      }
    },
    required: ['section']
  }
};

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
    const sectionPath = join(workspaceRoot, 'sections', `${section}.md`);
    
    if (!existsSync(sectionPath)) {
      return {
        success: false,
        message: `Section file not found: ${section}.md. This section might not have been created yet.`
      };
    }

    const content = await readFile(sectionPath, 'utf-8');
    const stats = await stat(sectionPath);
    const metadata = SECTION_METADATA[section as Arc42Section];

    const wordCount = content.trim() ? content.split(/\s+/).length : 0;

    return {
      success: true,
      message: `Section ${metadata.title} retrieved successfully`,
      data: {
        section,
        sectionTitle: metadata.title,
        content,
        metadata: {
          path: sectionPath,
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Failed to retrieve section: ${errorMessage}`
    };
  }
}
