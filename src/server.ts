import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ToolContext, ToolResponse, Arc42Section } from './types.js';
import { toMCPResponse, ARC42_SECTIONS } from './types.js';

// Import tool handlers
import { arc42WorkflowGuideHandler } from './tools/arc42-workflow-guide.js';
import { arc42InitHandler } from './tools/arc42-init.js';
import { arc42StatusHandler } from './tools/arc42-status.js';
import { updateSectionHandler } from './tools/update-section.js';
import { getSectionHandler } from './tools/get-section.js';
import { generateTemplateHandler } from './tools/generate-template.js';

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

    // Register arc42-workflow-guide tool
    this.mcpServer.registerTool(
      'arc42-workflow-guide',
      {
        description: `Get a comprehensive guide for arc42 architecture documentation workflow.

This tool provides detailed guidance on how to document software architecture using the arc42 template. It explains the 12 sections of arc42, recommended workflow, and best practices.

Use this tool when:
- Starting a new architecture documentation project
- Needing guidance on what to document in each section
- Looking for best practices in architecture documentation`
      },
      async () => {
        const response = await arc42WorkflowGuideHandler({}, context);
        return toCallToolResult(response);
      }
    );

    // Register arc42-init tool
    this.mcpServer.registerTool(
      'arc42-init',
      {
        description: `Initialize arc42 documentation workspace for a project.

This tool creates the complete directory structure and template files for arc42 architecture documentation. It sets up all 12 sections with templates, configuration files, and a main documentation file.

Use this tool once at the beginning of your architecture documentation journey.

You can optionally specify a targetFolder to create the documentation in a specific directory instead of the default workspace.`,
        inputSchema: {
          projectName: z.string().describe('Name of the project being documented'),
          force: z.boolean().optional().describe('Force re-initialization even if workspace exists'),
          targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder where arc42-docs will be created. If not provided, uses the default workspace configured at server startup.')
        }
      },
      async (args) => {
        const response = await arc42InitHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );

    // Register arc42-status tool
    this.mcpServer.registerTool(
      'arc42-status',
      {
        description: `Check the status of arc42 documentation.

This tool provides an overview of which sections have been created, their completion status, and overall progress. Use this tool to track documentation progress and identify which sections need attention.

You can optionally specify a targetFolder to check documentation status in a specific directory instead of the default workspace.`,
        inputSchema: {
          targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.')
        }
      },
      async (args) => {
        const response = await arc42StatusHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );

    // Register update-section tool
    const sectionValues = ARC42_SECTIONS as unknown as [Arc42Section, ...Arc42Section[]];
    this.mcpServer.registerTool(
      'update-section',
      {
        description: `Update content in a specific arc42 section.

This tool allows you to add or update content in any of the 12 arc42 sections. The content will be written to the appropriate section file while preserving the overall structure.

You can optionally specify a targetFolder to update documentation in a specific directory instead of the default workspace.`,
        inputSchema: {
          section: z.enum(sectionValues).describe('The section to update (e.g., "01_introduction_and_goals")'),
          content: z.string().describe('The markdown content to write to the section'),
          mode: z.enum(['replace', 'append']).optional().describe('Write mode: "replace" (default) or "append"'),
          targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.')
        }
      },
      async (args) => {
        const response = await updateSectionHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );

    // Register get-section tool
    this.mcpServer.registerTool(
      'get-section',
      {
        description: `Read content from a specific arc42 section.

This tool allows you to retrieve the current content of any of the 12 arc42 sections. Use this to review existing documentation or before making updates.

You can optionally specify a targetFolder to read documentation from a specific directory instead of the default workspace.`,
        inputSchema: {
          section: z.enum(sectionValues).describe('The section to read (e.g., "01_introduction_and_goals")'),
          targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder containing arc42-docs. If not provided, uses the default workspace configured at server startup.')
        }
      },
      async (args) => {
        const response = await getSectionHandler(args as Record<string, unknown>, context);
        return toCallToolResult(response);
      }
    );

    // Register generate-template tool
    this.mcpServer.registerTool(
      'generate-template',
      {
        description: `Generate a detailed template for a specific arc42 section.

This tool provides the complete template structure, guidance, and examples for any of the 12 arc42 sections. Use this before documenting a section to understand what content is needed.`,
        inputSchema: {
          section: z.enum(sectionValues).describe('The section to generate template for')
        }
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
