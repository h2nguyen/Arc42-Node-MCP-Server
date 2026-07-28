import type { ZodRawShape } from 'zod';
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

// Import handlers, schemas, and descriptions for the tool registry
import {
  arc42WorkflowGuideHandler,
  arc42WorkflowGuideInputSchema,
  arc42WorkflowGuideDescription
} from './arc42-workflow-guide.js';
import {
  arc42InitHandler,
  arc42InitInputSchema,
  arc42InitDescription
} from './arc42-init.js';
import {
  arc42StatusHandler,
  arc42StatusInputSchema,
  arc42StatusDescription
} from './arc42-status.js';
import {
  updateSectionHandler,
  updateSectionInputSchema,
  updateSectionDescription
} from './update-section.js';
import {
  getSectionHandler,
  getSectionInputSchema,
  getSectionDescription
} from './get-section.js';
import {
  generateTemplateHandler,
  generateTemplateInputSchema,
  generateTemplateDescription
} from './generate-template.js';

/**
 * A complete tool definition: name, description, input schema, and handler
 */
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: ZodRawShape;
  handler: (args: Record<string, unknown>, context: ToolContext) => Promise<ToolResponse>;
}

/**
 * Single Source of Truth for all tools exposed by the server.
 *
 * Both the MCP registration (server.ts) and handleToolCall dispatch from
 * this registry, so adding a tool requires exactly one new entry here.
 */
export const TOOL_REGISTRY: readonly ToolDefinition[] = [
  {
    name: 'arc42-workflow-guide',
    description: arc42WorkflowGuideDescription,
    inputSchema: arc42WorkflowGuideInputSchema,
    handler: arc42WorkflowGuideHandler
  },
  {
    name: 'arc42-init',
    description: arc42InitDescription,
    inputSchema: arc42InitInputSchema,
    handler: arc42InitHandler
  },
  {
    name: 'arc42-status',
    description: arc42StatusDescription,
    inputSchema: arc42StatusInputSchema,
    handler: arc42StatusHandler
  },
  {
    name: 'update-section',
    description: updateSectionDescription,
    inputSchema: updateSectionInputSchema,
    handler: updateSectionHandler
  },
  {
    name: 'get-section',
    description: getSectionDescription,
    inputSchema: getSectionInputSchema,
    handler: getSectionHandler
  },
  {
    name: 'generate-template',
    description: generateTemplateDescription,
    inputSchema: generateTemplateInputSchema,
    handler: generateTemplateHandler
  }
] as const;

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
    const tool = TOOL_REGISTRY.find(t => t.name === name);
    if (!tool) {
      throw new Error(`Unknown tool: ${name}`);
    }
    response = await tool.handler(args, context);

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
