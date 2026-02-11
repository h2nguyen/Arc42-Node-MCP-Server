# 6. Runtime View

## 6.1 Server Startup Sequence

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  MCP Client │     │ index.ts    │     │ server.ts   │     │ MCP SDK     │
│(Claude,etc.)│     │(Entry Point)│     │Arc42Server  │     │ Transport   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │                   │
       │ Spawn process     │                   │                   │
       │──────────────────▶│                   │                   │
       │                   │                   │                   │
       │                   │ Parse CLI args    │                   │
       │                   │ (projectPath)     │                   │
       │                   │                   │                   │
       │                   │ new Arc42Server() │                   │
       │                   │──────────────────▶│                   │
       │                   │                   │                   │
       │                   │                   │ Create McpServer  │
       │                   │                   │──────────────────▶│
       │                   │                   │                   │
       │                   │ initialize(path)  │                   │
       │                   │──────────────────▶│                   │
       │                   │                   │                   │
       │                   │                   │ registerTools()   │
       │                   │                   │──────────────────▶│
       │                   │                   │                   │
       │                   │                   │ connect(transport)│
       │                   │                   │──────────────────▶│
       │                   │                   │                   │
       │                   │◀──────────────────│◀──────────────────│
       │                   │   Server Ready    │   Transport Open  │
       │◀──────────────────│                   │                   │
       │  Ready for tools  │                   │                   │
```

## 6.2 Tool Call Flow (Example: arc42-init)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  MCP Client │     │ MCP SDK     │     │ arc42-init  │     │ File System │
│             │     │             │     │  Handler    │     │             │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │                   │
       │  tools/call       │                   │                   │
       │  {arc42-init,     │                   │                   │
       │   projectName}    │                   │                   │
       │──────────────────▶│                   │                   │
       │                   │                   │                   │
       │                   │ Validate input    │                   │
       │                   │ (Zod schema)      │                   │
       │                   │                   │                   │
       │                   │ arc42InitHandler()│                   │
       │                   │──────────────────▶│                   │
       │                   │                   │                   │
       │                   │                   │ Check if exists   │
       │                   │                   │──────────────────▶│
       │                   │                   │◀──────────────────│
       │                   │                   │                   │
       │                   │                   │ Create directories│
       │                   │                   │──────────────────▶│
       │                   │                   │                   │
       │                   │                   │ Write config.yaml │
       │                   │                   │──────────────────▶│
       │                   │                   │                   │
       │                   │                   │ Create 12 sections│
       │                   │                   │──────────────────▶│
       │                   │                   │                   │
       │                   │◀──────────────────│                   │
       │◀──────────────────│  ToolResponse     │                   │
       │   {success: true} │  {success, data}  │                   │
```

## 6.3 Documentation Workflow

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Start   │──▶│Workflow │──▶│  Init   │──▶│Generate │──▶│ Update  │
│         │   │  Guide  │   │Workspace│   │Template │   │ Section │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
                                               │              │
                                               ▼              │
                                          ┌─────────┐        │
                                          │  Check  │◀───────┘
                                          │ Status  │
                                          └─────────┘
                                               │
                                               ▼
                                          ┌─────────┐
                                          │Complete?│──▶ Yes: Done
                                          └─────────┘
                                               │ No
                                               ▼
                                          (Loop back to Generate Template)
```

### Typical User Journey

1. **User**: "Help me document my architecture"
2. **AI calls**: `arc42-workflow-guide` → Gets process overview
3. **AI calls**: `arc42-init { projectName: "My Project" }` → Creates workspace
4. **AI calls**: `arc42-status` → Checks progress (0%)
5. **AI calls**: `generate-template { section: "01_introduction_and_goals" }` → Gets template
6. **AI discusses** with user to gather requirements
7. **AI calls**: `update-section { section: "01_...", content: "..." }` → Saves documentation
8. **AI calls**: `arc42-status` → Checks progress (~8%)
9. **Repeat** for each section...

## 6.4 Error Handling Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  MCP Client │     │  Tool       │     │  Response   │
│             │     │  Handler    │     │  Builder    │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ Invalid request   │                   │
       │──────────────────▶│                   │
       │                   │                   │
       │                   │ Zod validation    │
       │                   │ fails             │
       │                   │                   │
       │                   │ Create error      │
       │                   │──────────────────▶│
       │                   │                   │
       │                   │◀──────────────────│
       │◀──────────────────│ ToolResponse      │
       │ {isError: true,   │ {success: false}  │
       │  content: [...]}  │                   │
```

## 6.5 Graceful Shutdown

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  MCP Client │     │ server.ts   │     │ MCP SDK     │
│             │     │             │     │             │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ Close connection  │                   │
       │──────────────────▶│                   │
       │                   │                   │
       │                   │ transport.onclose │
       │                   │◀──────────────────│
       │                   │                   │
       │                   │ stop()            │
       │                   │ isStopping = true │
       │                   │                   │
       │                   │ mcpServer.close() │
       │                   │──────────────────▶│
       │                   │                   │
       │                   │ process.exit(0)   │
       │                   │──────────────────▶│
```
