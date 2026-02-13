# 7. Deployment View

## 7.1 Infrastructure Overview

The Arc42 MCP Server is designed to run locally on developer machines, integrated with MCP-compatible AI assistants.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Developer Machine                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                     MCP Client Application                         │ │
│  │                                                                    │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │ │
│  │  │Claude Desktop│  │   Cursor     │  │   Cline      │            │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘            │ │
│  │           │                │                │                      │ │
│  │           └────────────────┼────────────────┘                      │ │
│  │                            │ STDIO (spawn)                         │ │
│  └────────────────────────────┼───────────────────────────────────────┘ │
│                               ▼                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                    Arc42 MCP Server Process                        │ │
│  │                                                                    │ │
│  │    node dist/index.js /path/to/project                            │ │
│  │                                                                    │ │
│  │    • Node.js 24+ runtime                                          │ │
│  │    • MCP SDK for protocol handling                                │ │
│  │    • File system access for documentation                         │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                               │                                         │
│                               ▼                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                      File System                                   │ │
│  │                                                                    │ │
│  │    /path/to/project/arc42-docs/                                   │ │
│  │    ├── sections/*.md                                              │ │
│  │    ├── config.yaml                                                │ │
│  │    └── images/                                                    │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 7.2 Deployment Scenarios

### Scenario 1: npm Global Installation (Recommended)

```bash
# Installation
npm install -g @h2nguyen/arc42-node-mcp-server

# Verification
which arc42-mcp
# → /usr/local/bin/arc42-mcp (or ~/.npm-global/bin/arc42-mcp)
```

**MCP Client Configuration:**
```json
{
  "mcpServers": {
    "arc42-mcp-server": {
      "command": "arc42-mcp",
      "args": ["/path/to/project"]
    }
  }
}
```

### Scenario 2: Local Development Build

```bash
# Clone and build
git clone --recurse-submodules https://github.com/h2nguyen/Arc42-Node-MCP-Server.git
cd Arc42-Node-MCP-Server
npm install
npm run build
```

**MCP Client Configuration:**
```json
{
  "mcpServers": {
    "arc42-mcp-server": {
      "command": "node",
      "args": ["/full/path/to/dist/index.js", "/path/to/project"]
    }
  }
}
```

### Scenario 3: Docker Container

```bash
# Build image
docker build -t arc42-node-mcp-server .

# Run with mounted project
docker run -v /path/to/project:/project arc42-node-mcp-server
```

## 7.3 Docker Deployment

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       Docker Container                                   │
│                   (arc42-node-mcp-server)                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  FROM node:24-alpine                                             │   │
│  │                                                                  │   │
│  │  WORKDIR /app                                                   │   │
│  │                                                                  │   │
│  │  /app/                                                          │   │
│  │  ├── dist/           # Built JavaScript                         │   │
│  │  ├── package.json    # Dependencies                             │   │
│  │  └── vendor/         # arc42 template submodule                 │   │
│  │                                                                  │   │
│  │  ENTRYPOINT ["node", "dist/index.js"]                          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Volume Mounts:                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  /project  ←─────── Host: /path/to/project                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 7.4 CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      GitHub Actions Pipeline                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐     │
│  │   Lint    │───▶│   Test    │───▶│  Docker   │───▶│ Security  │     │
│  │           │    │           │    │   Build   │    │  Audit    │     │
│  │ tsc       │    │ vitest    │    │           │    │           │     │
│  │ eslint    │    │ coverage  │    │ docker    │    │ npm audit │     │
│  └───────────┘    └───────────┘    │ build     │    └───────────┘     │
│                          │         └───────────┘                       │
│                          ▼                                             │
│                   ┌───────────┐                                        │
│                   │  Matrix   │                                        │
│                   │           │                                        │
│                   │ Node 22   │                                        │
│                   │ Node 24   │                                        │
│                   └───────────┘                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 7.5 Node/Environment Mapping

| Environment | Node Version | Distribution | Usage |
|-------------|--------------|--------------|-------|
| **Development** | 24.x (via .nvmrc) | Source + tsx | Live development |
| **Production** | 24+ | npm package | End users |
| **Docker** | 24-alpine | Container image | Isolated deployment |
| **CI/CD** | 22, 24 (matrix) | GitHub Actions | Testing compatibility |

## 7.6 Configuration Files

### MCP Client Configurations

| Client | Config File Location |
|--------|---------------------|
| Claude Desktop (macOS) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Claude Desktop (Windows) | `%APPDATA%\Claude\claude_desktop_config.json` |
| Cursor | Project `.cursor/mcp.json` or settings |
| Cline | `~/.cline/data/settings/cline_mcp_settings.json` |

### Project Configuration

| File | Purpose |
|------|---------|
| `.nvmrc` | Node.js version (24) |
| `tsconfig.json` | TypeScript compiler options |
| `vitest.config.ts` | Test configuration |
| `Dockerfile` | Container build instructions |
| `docker-compose.yml` | Development/testing services |
