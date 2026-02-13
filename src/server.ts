import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ToolContext, ToolResponse } from './types.js';
import { toMCPResponse } from './types.js';

// Import tool handlers AND schemas (Single Source of Truth)
import {
  arc42WorkflowGuideHandler,
  arc42WorkflowGuideInputSchema,
  arc42WorkflowGuideDescription
} from './tools/arc42-workflow-guide.js';
import {
  arc42InitHandler,
  arc42InitInputSchema,
  arc42InitDescription
} from './tools/arc42-init.js';
import {
  arc42StatusHandler,
  arc42StatusInputSchema,
  arc42StatusDescription
} from './tools/arc42-status.js';
import {
  updateSectionHandler,
  updateSectionInputSchema,
  updateSectionDescription
} from './tools/update-section.js';
import {
  getSectionHandler,
  getSectionInputSchema,
  getSectionDescription
} from './tools/get-section.js';
import {
  generateTemplateHandler,
  generateTemplateInputSchema,
  generateTemplateDescription
} from './tools/generate-template.js';

export class Arc42MCPServer {
  private mcpServer: McpServer;
  private projectPath!: string;
  private context!: ToolContext;
  private isStopping = false;

  constructor() {
    // Get version from package.json
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const packageJsonPath = join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    this.mcpServer = new McpServer({
      name: '@arc42/mcp-server',
      version: packageJson.version
    });
  }

  async initialize(projectPath: string): Promise<void> {
    this.projectPath = projectPath;

    try {
      // Create context for tools
      this.context = {
        projectPath: this.projectPath,
        workspaceRoot: join(this.projectPath, 'arc42-docs')
      };

      // Register all tools
      this.registerTools();

      // Connect to stdio transport
      const transport = new StdioServerTransport();

      // Handle client disconnection - exit gracefully when transport closes
      transport.onclose = async () => {
        await this.stop();
        process.exit(0);
      };

      await this.mcpServer.connect(transport);

      // Monitor stdin for client disconnection (additional safety net)
      process.stdin.on('end', async () => {
        await this.stop();
        process.exit(0);
      });

      // Handle stdin errors
      // NOTE: Using console.error because stdout is reserved for MCP protocol messages
      process.stdin.on('error', async (error: Error) => {
        console.error('stdin error:', error);
        await this.stop();
        process.exit(1);
      });

      // MCP server initialized successfully

    } catch (error) {
      throw error;
    }
  }

  private registerTools(): void {
    const context = this.context;

    // Helper to convert ToolResponse to CallToolResult
    const toCallToolResult = (response: ToolResponse): CallToolResult => {
      const mcpResponse = toMCPResponse(response, !response.success);
      return {
        content: mcpResponse.content,
        isError: mcpResponse.isError
      };
    };

    // Register arc42-workflow-guide tool (using imported schema)
    this.mcpServer.registerTool(
      'arc42-workflow-guide',
      {
        description: arc42WorkflowGuideDescription,
        inputSchema: arc42WorkflowGuideInputSchema
      },
      async (args) => {
        const response = await arc42WorkflowGuideHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );

    // Register arc42-init tool (using imported schema)
    this.mcpServer.registerTool(
      'arc42-init',
      {
        description: arc42InitDescription,
        inputSchema: arc42InitInputSchema
      },
      async (args) => {
        const response = await arc42InitHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );

    // Register arc42-status tool (using imported schema)
    this.mcpServer.registerTool(
      'arc42-status',
      {
        description: arc42StatusDescription,
        inputSchema: arc42StatusInputSchema
      },
      async (args) => {
        const response = await arc42StatusHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );

    // Register update-section tool (using imported schema)
    this.mcpServer.registerTool(
      'update-section',
      {
        description: updateSectionDescription,
        inputSchema: updateSectionInputSchema
      },
      async (args) => {
        const response = await updateSectionHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );

    // Register get-section tool (using imported schema)
    this.mcpServer.registerTool(
      'get-section',
      {
        description: getSectionDescription,
        inputSchema: getSectionInputSchema
      },
      async (args) => {
        const response = await getSectionHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );

    // Register generate-template tool (using imported schema)
    this.mcpServer.registerTool(
      'generate-template',
      {
        description: generateTemplateDescription,
        inputSchema: generateTemplateInputSchema
      },
      async (args) => {
        const response = await generateTemplateHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );
  }

  async stop(): Promise<void> {
    // Prevent re-entrant shutdown calls (avoids infinite loop)
    if (this.isStopping) {
      return;
    }
    this.isStopping = true;

    try {
      // Stop MCP server
      await this.mcpServer.close();
    } catch (error) {
      // NOTE: Using console.error because stdout is reserved for MCP protocol
      console.error('Error during shutdown:', error);
      // Continue with shutdown even if there are errors
    }
  }
}
