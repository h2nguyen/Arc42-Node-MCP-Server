import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ToolContext, ToolResponse } from './types.js';
import { toMCPResponse } from './types.js';

// Import the tool registry (Single Source of Truth for all tools)
import { TOOL_REGISTRY } from './tools/index.js';

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

    // Register every tool from the registry (Single Source of Truth)
    for (const tool of TOOL_REGISTRY) {
      this.mcpServer.registerTool(
        tool.name,
        {
          description: tool.description,
          inputSchema: tool.inputSchema
        },
        async (args) => {
          const response = await tool.handler(args as Record<string, unknown>, context);
          return toCallToolResult(response);
        }
      );
    }
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
