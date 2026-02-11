# 8. Cross-cutting Concepts

## 8.1 Domain Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Domain Model                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐          ┌─────────────────┐                      │
│  │   Arc42Status   │          │  ToolContext    │                      │
│  │                 │          │                 │                      │
│  │ • projectName   │          │ • projectPath   │                      │
│  │ • initialized   │          │ • workspaceRoot │                      │
│  │ • sections[]    │          │                 │                      │
│  │ • completeness  │          └─────────────────┘                      │
│  └─────────────────┘                                                   │
│          │                                                             │
│          │ contains                                                    │
│          ▼                                                             │
│  ┌─────────────────┐          ┌─────────────────┐                      │
│  │ DocumentStatus  │          │  ToolResponse   │                      │
│  │                 │          │                 │                      │
│  │ • exists        │          │ • success       │                      │
│  │ • path          │          │ • message       │                      │
│  │ • wordCount     │          │ • data          │                      │
│  │ • completeness  │          │ • nextSteps[]   │                      │
│  └─────────────────┘          └─────────────────┘                      │
│                                                                         │
│  ┌─────────────────┐          ┌─────────────────┐                      │
│  │  Arc42Section   │          │ SectionMetadata │                      │
│  │   (enum)        │          │                 │                      │
│  │                 │          │ • name          │                      │
│  │ 12 section IDs  │◀────────│ • title         │                      │
│  │                 │          │ • description   │                      │
│  │                 │          │ • order         │                      │
│  └─────────────────┘          └─────────────────┘                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 8.2 Error Handling Strategy

### Approach
All errors are caught and converted to structured `ToolResponse` objects with `success: false`.

```typescript
// Consistent error response pattern
interface ToolResponse {
  success: false;
  message: "Error description for user";
  data?: {
    errorCode?: string;
    details?: string;
  };
}
```

### Error Categories

| Category | Handling | User Message |
|----------|----------|--------------|
| **Validation Error** | Zod schema validation | "Invalid input: [field] must be [constraint]" |
| **Not Found** | Check existence first | "Workspace not found. Run arc42-init first." |
| **File System Error** | Try-catch with details | "Failed to write section: [error details]" |
| **Permission Error** | Catch EACCES/EPERM | "Permission denied writing to [path]" |

## 8.3 Validation Concept

### Input Validation with Zod

```typescript
// Schema definition in server.ts
inputSchema: {
  projectName: z.string().describe('Name of the project'),
  force: z.boolean().optional().describe('Re-initialize if exists'),
  targetFolder: z.string().optional().describe('Custom target directory')
}
```

### Section Name Validation

```typescript
// Enum-based validation ensures only valid sections
type Arc42Section = 
  | '01_introduction_and_goals'
  | '02_architecture_constraints'
  // ... etc
  | '12_glossary';
```

## 8.4 File Organization Pattern

### Documentation Workspace Structure

```
arc42-docs/
├── README.md              # Getting started guide
├── arc42-template.md      # Combined main document
├── config.yaml            # Metadata & configuration
├── images/                # Diagrams and screenshots
│   └── .gitkeep
└── sections/              # Individual section files
    ├── 01_introduction_and_goals.md
    ├── 02_architecture_constraints.md
    └── ... (12 sections total)
```

### Naming Conventions

| Pattern | Example | Purpose |
|---------|---------|---------|
| Section files | `01_introduction_and_goals.md` | Numbered prefix for ordering |
| Config files | `config.yaml` | YAML for configuration |
| Documentation | `README.md`, `*.md` | Markdown for content |

## 8.5 Template System

### Template Generation Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ generate-       │────▶│ SECTION_        │────▶│ Markdown        │
│ template()      │     │ TEMPLATES       │     │ Output          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               │ Contains for each section:
                               ▼
                        ┌─────────────────┐
                        │ • Title         │
                        │ • Description   │
                        │ • Guidance text │
                        │ • Examples      │
                        │ • Sub-sections  │
                        └─────────────────┘
```

### Template Properties

| Property | Description |
|----------|-------------|
| **Guidance Text** | AI-friendly instructions for what to document |
| **Examples** | Placeholder examples to illustrate structure |
| **Sub-sections** | Breakdown of section components |
| **arc42 Attribution** | Reference to original arc42 template |

## 8.6 Configuration Management

### config.yaml Structure

```yaml
projectName: "My Project"
version: "1.0.0"
created: "2026-02-11T12:00:00.000Z"
format: "markdown"
language: "en"
arc42_template_version: "9.0-EN"
arc42_template_date: "July 2025"
arc42_template_source: "https://github.com/arc42/arc42-template"
arc42_template_commit: "b29e08928644af7ae49f51d729d14313db0d934c"
```

### Dynamic Version Loading

The arc42 template version is loaded dynamically from the git submodule:

```
vendor/arc42-template/EN/version.properties
↓
getArc42TemplateVersion()
↓
{
  version: "9.0-EN",
  date: "July 2025",
  source: "https://github.com/arc42/arc42-template"
}
```

## 8.7 Response Format Convention

All tools return consistent MCP-compliant responses:

```typescript
// Success response
{
  content: [{
    type: "text",
    text: JSON.stringify({
      success: true,
      message: "Operation completed",
      data: { /* operation-specific data */ },
      nextSteps: ["Suggested action 1", "Suggested action 2"]
    }, null, 2)
  }],
  isError: false
}

// Error response
{
  content: [{
    type: "text", 
    text: JSON.stringify({
      success: false,
      message: "Error description"
    }, null, 2)
  }],
  isError: true
}
```

## 8.8 Testing Strategy

| Test Type | Coverage | Tools |
|-----------|----------|-------|
| **Unit Tests** | Functions, utilities | Vitest |
| **Template Tests** | All 12 section templates | Vitest |
| **Tool Tests** | Each MCP tool handler | Vitest |
| **Integration Tests** | End-to-end flows | Vitest + temp directories |

### Coverage Thresholds

```typescript
// vitest.config.ts
coverage: {
  thresholds: {
    statements: 70,
    branches: 60,
    functions: 70,
    lines: 70
  }
}
```
