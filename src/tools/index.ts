import { ToolContext, ToolResponse, MCPToolResponse, toMCPResponse } from '../types.js';

// Re-export tool handlers and schemas (Single Source of Truth pattern)
export {
  arc42WorkflowGuideHandler,
  arc42WorkflowGuideInputSchema,
  arc42WorkflowGuideDescription
} from './arc42-workflow-guide.js';

export {
  arc42InitHandler,
  arc42InitInputSchema,
  arc42InitDescription
} from './arc42-init.js';

export {
  arc42StatusHandler,
  arc42StatusInputSchema,
  arc42StatusDescription
} from './arc42-status.js';

export {
  updateSectionHandler,
  updateSectionInputSchema,
  updateSectionDescription
} from './update-section.js';

export {
  getSectionHandler,
  getSectionInputSchema,
  getSectionDescription
} from './get-section.js';

export {
  generateTemplateHandler,
  generateTemplateInputSchema,
  generateTemplateDescription
} from './generate-template.js';

// Import handlers for handleToolCall function
import { arc42WorkflowGuideHandler } from './arc42-workflow-guide.js';
import { arc42InitHandler } from './arc42-init.js';
import { arc42StatusHandler } from './arc42-status.js';
import { updateSectionHandler } from './update-section.js';
import { getSectionHandler } from './get-section.js';
import { generateTemplateHandler } from './generate-template.js';

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
