# Arc42 MCP Server Setup

## Installation

```bash
npm install -g @h2nguyen/arc42-node-mcp-server
```

Or run directly without installing:
```bash
npx -y @h2nguyen/arc42-node-mcp-server /path/to/project
```

**Requires:** Node.js >= 24.0.0

---

## Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "arc42-mcp-server": {
      "command": "npx",
      "args": ["-y", "@h2nguyen/arc42-node-mcp-server", "/path/to/your/project"]
    }
  }
}
```

### Claude Code

Add to `.mcp.json` in your project root (project-scoped) or `~/.claude.json` (global):

```json
{
  "mcpServers": {
    "arc42-mcp-server": {
      "command": "npx",
      "args": ["-y", "@h2nguyen/arc42-node-mcp-server", "."]
    }
  }
}
```

With a global installation:
```json
{
  "mcpServers": {
    "arc42-mcp-server": {
      "command": "arc42-mcp",
      "args": ["."]
    }
  }
}
```

### Cursor

```json
{
  "mcpServers": {
    "arc42-mcp-server": {
      "command": "npx",
      "args": ["-y", "@h2nguyen/arc42-node-mcp-server", "${workspaceFolder}"]
    }
  }
}
```

### Cline

```json
{
  "mcpServers": {
    "arc42-mcp-server": {
      "command": "npx",
      "args": ["-y", "@h2nguyen/arc42-node-mcp-server", "${workspaceFolder}"]
    }
  }
}
```

### Troubleshooting: NVM Users

If you use NVM (Node Version Manager), the `npx` command may not be found because MCP clients don't always inherit your shell's PATH. Use the full path to your Node.js binary:

```json
{
  "mcpServers": {
    "arc42-mcp-server": {
      "command": "/Users/<username>/.nvm/versions/node/v24.x.x/bin/npx",
      "args": ["-y", "@h2nguyen/arc42-node-mcp-server", "/path/to/project"]
    }
  }
}
```

Find your NVM path with: `which npx`

---

## Workspace Configuration

The server needs a workspace path where it creates the `arc42-docs/` directory. There are three ways to provide it:

| Method | When Used | Example |
|--------|-----------|---------|
| **Startup argument** | Passed as the last CLI argument at server start | `arc42-mcp /path/to/project` |
| **`targetFolder` parameter** | Per-tool override on individual calls | `{ "targetFolder": "/other/project" }` |
| **Fallback** | When neither above is provided | Current working directory |

**Priority:** `targetFolder` parameter > startup argument > current working directory

Use the `targetFolder` parameter when working with multiple projects simultaneously.
