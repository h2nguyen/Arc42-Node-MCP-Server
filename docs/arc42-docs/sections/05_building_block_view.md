# 5. Building Block View

## 5.1 Level 1: System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Arc42 MCP Server                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                 │
│  │   Entry     │───▶│   Server    │───▶│   Tools     │                 │
│  │   Point     │    │   Core      │    │   Layer     │                 │
│  └─────────────┘    └─────────────┘    └─────────────┘                 │
│        │                  │                   │                         │
│        │                  │                   ▼                         │
│        │                  │           ┌─────────────┐                  │
│        │                  │           │  Templates  │                  │
│        │                  │           │   Layer     │                  │
│        │                  │           └─────────────┘                  │
│        │                  │                   │                         │
│        │                  ▼                   ▼                         │
│        │           ┌─────────────────────────────────┐                 │
│        │           │         Types & Utilities       │                 │
│        └──────────▶│          (src/types.ts)        │                 │
│                    └─────────────────────────────────┘                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Building Blocks Overview

| Block | Responsibility | Location |
|-------|---------------|----------|
| **Entry Point** | Process startup, CLI argument handling | `src/index.ts` |
| **Server Core** | MCP server lifecycle, tool registration | `src/server.ts` |
| **Tools Layer** | Individual tool implementations | `src/tools/*.ts` |
| **Templates Layer** | arc42 section templates | `src/templates/*.ts` |
| **Types & Utilities** | Shared types, constants, helpers | `src/types.ts` |

## 5.2 Level 2: Tools Layer

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Tools Layer                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────┐    ┌─────────────────────┐                    │
│  │ arc42-workflow-     │    │     arc42-init      │                    │
│  │      guide          │    │                     │                    │
│  │                     │    │  Creates workspace  │                    │
│  │  Returns workflow   │    │  structure & files  │                    │
│  │  documentation      │    │                     │                    │
│  └─────────────────────┘    └─────────────────────┘                    │
│                                                                         │
│  ┌─────────────────────┐    ┌─────────────────────┐                    │
│  │   arc42-status      │    │  generate-template  │                    │
│  │                     │    │                     │                    │
│  │  Reports progress   │    │  Creates section    │                    │
│  │  and completeness   │    │  template content   │                    │
│  └─────────────────────┘    └─────────────────────┘                    │
│                                                                         │
│  ┌─────────────────────┐    ┌─────────────────────┐                    │
│  │   update-section    │    │    get-section      │                    │
│  │                     │    │                     │                    │
│  │  Writes content to  │    │  Reads section      │                    │
│  │  section files      │    │  content            │                    │
│  └─────────────────────┘    └─────────────────────┘                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tool Details

| Tool | File | Dependencies |
|------|------|--------------|
| `arc42-workflow-guide` | `src/tools/arc42-workflow-guide.ts` | Types |
| `arc42-init` | `src/tools/arc42-init.ts` | Types, Templates |
| `arc42-status` | `src/tools/arc42-status.ts` | Types |
| `generate-template` | `src/tools/generate-template.ts` | Types, Templates |
| `update-section` | `src/tools/update-section.ts` | Types |
| `get-section` | `src/tools/get-section.ts` | Types |

## 5.3 Level 2: Templates Layer

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Templates Layer                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    templates/index.ts                            │   │
│  │                                                                  │   │
│  │  • getSectionTemplate(section) → template content               │   │
│  │  • getInitialSectionContent(section, projectName) → markdown    │   │
│  │  • SECTION_TEMPLATES record                                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                │                                        │
│                                ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                 templates/arc42-reference.ts                     │   │
│  │                                                                  │   │
│  │  • getArc42TemplateVersion() → version info from submodule      │   │
│  │  • arc42Reference object (static template content)              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 5.4 File Structure

```
src/
├── index.ts                 # Entry point, CLI handling
├── server.ts                # Arc42MCPServer class
├── types.ts                 # Types, constants, utilities
│
├── tools/
│   ├── index.ts             # Tool exports
│   ├── arc42-workflow-guide.ts
│   ├── arc42-init.ts
│   ├── arc42-status.ts
│   ├── generate-template.ts
│   ├── update-section.ts
│   └── get-section.ts
│
├── templates/
│   ├── index.ts             # Template functions
│   └── arc42-reference.ts   # arc42 template reference
│
└── __tests__/               # Test files (mirrors src/ structure)
    ├── types.test.ts
    ├── fixtures/
    │   └── test-helpers.ts
    ├── templates/
    │   ├── index.test.ts
    │   └── arc42-reference.test.ts
    └── tools/
        ├── arc42-init.test.ts
        ├── arc42-status.test.ts
        ├── arc42-workflow-guide.test.ts
        ├── generate-template.test.ts
        ├── get-section.test.ts
        └── update-section.test.ts
```

## 5.5 Key Interfaces

### ToolContext

```typescript
interface ToolContext {
  projectPath: string;      // Base project directory
  workspaceRoot: string;    // arc42-docs directory path
}
```

### ToolResponse

```typescript
interface ToolResponse {
  success: boolean;         // Operation success flag
  message: string;          // Human-readable message
  data?: any;               // Operation-specific data
  nextSteps?: string[];     // Suggested next actions
}
```

### Arc42Section

```typescript
type Arc42Section = 
  | '01_introduction_and_goals'
  | '02_architecture_constraints'
  | '03_context_and_scope'
  // ... 12 sections total
  | '12_glossary';
```
