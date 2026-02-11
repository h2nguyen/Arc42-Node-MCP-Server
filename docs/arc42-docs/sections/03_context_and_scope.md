# 3. Context and Scope

## 3.1 Business Context

The Arc42 MCP Server sits at the intersection of AI-assisted development tools and architecture documentation practices.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Business Context                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│    ┌──────────────┐     ┌─────────────────────┐     ┌──────────────┐   │
│    │   Software   │────▶│   Arc42 MCP Server  │────▶│  arc42-docs/ │   │
│    │  Architects  │     │                     │     │   (Files)    │   │
│    └──────────────┘     └─────────────────────┘     └──────────────┘   │
│           │                       ▲                         │          │
│           │                       │                         │          │
│           ▼                       │                         ▼          │
│    ┌──────────────┐              │                  ┌──────────────┐   │
│    │ MCP Clients  │              │                  │  Development │   │
│    │ (Claude,     │──────────────┘                  │    Teams     │   │
│    │  Cursor,     │                                 │  (Readers)   │   │
│    │  Cline)      │                                 └──────────────┘   │
│    └──────────────┘                                                    │
│                                                                         │
│    ┌──────────────┐                                                    │
│    │   arc42      │ ◀─────── Template Reference (CC BY-SA 4.0)        │
│    │  Template    │                                                    │
│    └──────────────┘                                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Communication Partners

| Partner | Input | Output |
|---------|-------|--------|
| **Software Architects** | Documentation requests via AI chat | Structured architecture documentation |
| **MCP Clients** | MCP tool calls (JSON-RPC over STDIO) | Tool results (success/error responses) |
| **Development Teams** | (indirect) Read documentation files | - |
| **arc42 Template** | Template structure and guidance | - |

## 3.2 Technical Context

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Technical Context                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────┐    STDIO (JSON-RPC)    ┌───────────────────┐    │
│  │    MCP Client     │◀──────────────────────▶│  Arc42 MCP Server │    │
│  │                   │                         │                   │    │
│  │  • Claude Desktop │    stdin/stdout         │  • Node.js 24+    │    │
│  │  • Cursor         │    (MCP Protocol)       │  • TypeScript     │    │
│  │  • Cline          │                         │  • MCP SDK        │    │
│  │  • MCP Inspector  │                         │                   │    │
│  └───────────────────┘                         └───────────────────┘    │
│                                                          │              │
│                                                          │ File I/O     │
│                                                          ▼              │
│                                                ┌───────────────────┐    │
│                                                │   File System     │    │
│                                                │                   │    │
│                                                │  arc42-docs/      │    │
│                                                │  ├── sections/    │    │
│                                                │  ├── images/      │    │
│                                                │  └── config.yaml  │    │
│                                                └───────────────────┘    │
│                                                                         │
│                          Git Submodule                                  │
│                               │                                         │
│                               ▼                                         │
│                    ┌───────────────────┐                               │
│                    │  vendor/arc42-    │                               │
│                    │  template/        │                               │
│                    │  (Version Info)   │                               │
│                    └───────────────────┘                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Technical Interfaces

| Interface | Technology | Format | Description |
|-----------|------------|--------|-------------|
| **MCP Protocol** | STDIO | JSON-RPC 2.0 | Communication with MCP clients |
| **File System** | Node.js fs | Markdown/YAML | Documentation storage |
| **Git Submodule** | Git | Properties file | arc42 template version info |

## 3.3 External Interfaces

### MCP Tool Interface

The server exposes 6 tools via the MCP protocol:

| Tool | Input | Output |
|------|-------|--------|
| `arc42-workflow-guide` | None | Workflow guidance (JSON) |
| `arc42-init` | `projectName`, `force?`, `targetFolder?` | Initialization status (JSON) |
| `arc42-status` | `targetFolder?` | Status report (JSON) |
| `generate-template` | `section` | Section template (JSON) |
| `update-section` | `section`, `content`, `mode?`, `targetFolder?` | Update confirmation (JSON) |
| `get-section` | `section`, `targetFolder?` | Section content (JSON) |
