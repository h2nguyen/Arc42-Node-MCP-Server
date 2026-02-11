#!/usr/bin/env node

import { Arc42MCPServer } from './server.js';

async function main() {
  // Get project path from command line or use current directory
  const projectPath = process.argv[2] || process.cwd();

  // NOTE: MCP servers use stderr for logging because stdout is reserved for MCP protocol messages
  // The MCP protocol communicates via stdin/stdout, so all diagnostic logging must go to stderr
  console.error('Starting arc42 MCP Server...');
  console.error(`Project path: ${projectPath}`);

  const server = new Arc42MCPServer();

  try {
    await server.initialize(projectPath);
    console.error('arc42 MCP Server running');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
