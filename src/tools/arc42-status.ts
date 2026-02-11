import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse, ARC42_SECTIONS, SECTION_METADATA, resolveWorkspaceRoot, getErrorMessage } from '../types.js';
import { ARC42_REFERENCE } from '../templates/index.js';
import { existsSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

export const arc42StatusTool: Tool = {
  name: 'arc42-status',
  description: `Check the status of arc42 documentation.

This tool provides an overview of which sections have been created, their completion status, and overall progress. Use this tool to track documentation progress and identify which sections need attention.

You can optionally specify a targetFolder to check documentation status in a specific directory instead of the default workspace.`,
  inputSchema: {
    type: 'object',
    properties: {
      targetFolder: {
        type: 'string',
        description: 'Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.'
      }
    }
  }
};

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
    const status: {
      projectPath: string;
      workspaceRoot: string;
      initialized: boolean;
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
      initialized: true,
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
      const sectionPath = join(sectionsDir, `${section}.md`);
      const metadata = SECTION_METADATA[section];

      if (existsSync(sectionPath)) {
        const stats = statSync(sectionPath);
        const content = readFileSync(sectionPath, 'utf-8');
        const wordCount = content.split(/\s+/).length;
        
        // Simple completeness heuristic: >50 words = some content
        const completeness = Math.min(100, Math.floor((wordCount / 100) * 100));

        status.sections[section] = {
          exists: true,
          path: sectionPath,
          lastModified: stats.mtime.toISOString(),
          wordCount,
          completeness,
          metadata
        };

        totalCompleteness += completeness;

        if (!lastModified || stats.mtime > lastModified) {
          lastModified = stats.mtime;
        }
      } else {
        status.sections[section] = {
          exists: false,
          completeness: 0,
          metadata
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
      message: `Documentation status: ${completedSections}/${ARC42_SECTIONS.length} sections have content`,
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
