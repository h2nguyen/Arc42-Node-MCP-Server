import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse, MCPToolResponse, toMCPResponse } from '../types.js';

// Import tool definitions and handlers
import { arc42WorkflowGuideTool, arc42WorkflowGuideHandler } from './arc42-workflow-guide.js';
import { arc42InitTool, arc42InitHandler } from './arc42-init.js';
import { arc42StatusTool, arc42StatusHandler } from './arc42-status.js';
import { updateSectionTool, updateSectionHandler } from './update-section.js';
import { getSectionTool, getSectionHandler } from './get-section.js';
import { generateTemplateTool, generateTemplateHandler } from './generate-template.js';

/**
 * Register all available tools
 */
export function registerTools(): Tool[] {
  return [
    arc42WorkflowGuideTool,
    arc42InitTool,
    arc42StatusTool,
    updateSectionTool,
    getSectionTool,
    generateTemplateTool
  ];
}

/**
 * Handle tool invocation
 */
export async function handleToolCall(
  name: string,
  args: Record<string, unknown>,
  context: ToolContext
): Promise<MCPToolResponse> {
  let response: ToolResponse;
  let isError = false;

  try {
    switch (name) {
      case 'arc42-workflow-guide':
        response = await arc42WorkflowGuideHandler(args, context);
        break;
      case 'arc42-init':
        response = await arc42InitHandler(args, context);
        break;
      case 'arc42-status':
        response = await arc42StatusHandler(args, context);
        break;
      case 'update-section':
        response = await updateSectionHandler(args, context);
        break;
      case 'get-section':
        response = await getSectionHandler(args, context);
        break;
      case 'generate-template':
        response = await generateTemplateHandler(args, context);
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    // Check if the response indicates an error
    isError = !response.success;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    response = {
      success: false,
      message: `Tool execution failed: ${errorMessage}`
    };
    isError = true;
  }

  return toMCPResponse(response, isError);
}
