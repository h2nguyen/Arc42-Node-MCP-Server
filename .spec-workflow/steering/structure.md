# Project Structure

## Directory Organization

```
Arc42-Node-MCP-Server/
├── src/                        # Source code
│   ├── index.ts               # Entry point - CLI argument parsing & server startup
│   ├── server.ts              # MCP server class - tool registration & transport
│   ├── types.ts               # Shared type definitions & utilities
│   ├── tools/                 # Tool implementations (one per arc42 operation)
│   │   ├── index.ts           # Tool registry & dispatch
│   │   ├── arc42-workflow-guide.ts
│   │   ├── arc42-init.ts
│   │   ├── arc42-status.ts
│   │   ├── generate-template.ts
│   │   ├── update-section.ts
│   │   └── get-section.ts
│   ├── templates/             # Arc42 template content & localization
│   │   ├── index.ts           # Template exports & public API
│   │   ├── arc42-reference.ts # Arc42 version information
│   │   ├── formats/           # Multi-format support (Strategy Pattern)
│   │   │   ├── index.ts       # Format barrel exports & utilities
│   │   │   ├── output-format-strategy.ts  # OutputFormatStrategy interface
│   │   │   ├── output-format-factory.ts   # Factory for creating strategies
│   │   │   ├── output-format-registry.ts  # Registry for format strategies
│   │   │   ├── markdown/      # Markdown format implementation
│   │   │   │   └── markdown-format-strategy.ts
│   │   │   └── asciidoc/      # AsciiDoc format implementation
│   │   │       └── asciidoc-format-strategy.ts
│   │   └── locales/           # Multi-language support (Strategy Pattern)
│   │       ├── index.ts       # Locale barrel exports
│   │       ├── language-strategy.ts       # LanguageStrategy interface (format-aware)
│   │       ├── language-factory.ts        # Factory for creating strategies
│   │       ├── language-registry.ts       # Registry for language strategies
│   │       ├── language-strategy-factory.ts # Plugin-based strategy factory
│   │       ├── template-provider.ts       # Unified template access API
│   │       ├── en/            # English (default)
│   │       │   ├── index.ts   # English strategy export (uses plugin architecture)
│   │       │   ├── sections.ts # Section metadata
│   │       │   ├── templates-markdown.ts  # Markdown templates
│   │       │   └── templates-asciidoc.ts  # Native AsciiDoc templates
│   │       ├── de/            # German (same structure)
│   │       ├── es/            # Spanish
│   │       ├── fr/            # French
│   │       ├── it/            # Italian
│   │       ├── nl/            # Dutch
│   │       ├── pt/            # Portuguese
│   │       ├── ru/            # Russian
│   │       ├── cz/            # Czech
│   │       ├── ukr/           # Ukrainian
│   │       └── zh/            # Chinese
│   └── __tests__/             # Test files (mirrors source structure)
│       ├── fixtures/
│       ├── templates/
│       │   ├── formats/       # Output format tests
│       │   └── locales/       # Language strategy tests
│       ├── integration/       # Integration tests (format-language combinations)
│       └── tools/
├── dist/                       # Compiled JavaScript output
├── docs/                       # Documentation
│   ├── arc42-docs/            # Arc42 documentation for THIS project
│   └── specs/                 # Feature specifications
├── scripts/                    # Build and utility scripts
├── release_notes/              # Version release notes
├── vendor/                     # Git submodules
│   └── arc42-template/        # Official arc42 template (submodule)
├── test-project/               # Test workspace for development
├── coverage/                   # Test coverage reports
├── .spec-workflow/             # Spec workflow documentation
│   ├── steering/              # Steering documents (product, tech, structure)
│   ├── specs/                 # Feature specifications
│   ├── templates/             # Spec templates
│   └── user-templates/        # Custom user template overrides
└── [config files]              # package.json, tsconfig.json, etc.
```

## Naming Conventions

### Files
- **Source files**: `kebab-case.ts` (e.g., `arc42-init.ts`, `arc42-workflow-guide.ts`)
- **Test files**: `kebab-case.test.ts` (e.g., `arc42-init.test.ts`)
- **Type definitions**: `types.ts` for shared types in each directory
- **Index files**: `index.ts` for barrel exports

### Code
- **Classes**: `PascalCase` (e.g., `Arc42MCPServer`)
- **Types/Interfaces**: `PascalCase` (e.g., `ToolContext`, `Arc42Section`)
- **Functions**: `camelCase` (e.g., `arc42InitHandler`, `toMCPResponse`)
- **Constants**: `UPPER_SNAKE_CASE` for arrays/objects (e.g., `ARC42_SECTIONS`, `SECTION_METADATA`)
- **Type exports**: `PascalCase` (e.g., `type Arc42Section`)

## Import Patterns

### Import Order
1. External dependencies (`@modelcontextprotocol/sdk`, `zod`, `fs`, `path`)
2. Internal types (`./types.js`)
3. Internal modules (`./tools/...`, `./templates/...`)

### Module Organization
```typescript
// Standard import pattern for tools
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse } from '../types.js';
```

- **Always use `.js` extension** in imports (required for ESM)
- **Absolute imports** from `src/` root not used - relative imports preferred
- **Barrel exports** via `index.ts` for clean imports

## Code Structure Patterns

### Tool Handler Pattern
Each tool follows this consistent structure:

```typescript
// src/tools/[tool-name].ts

// 1. Imports
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse, resolveWorkspaceRoot } from '../types.js';

// 2. Tool Definition (exported)
export const toolNameTool: Tool = {
  name: 'tool-name',
  description: '...',
  inputSchema: { ... }
};

// 3. Handler Function (exported)
export async function toolNameHandler(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<ToolResponse> {
  // Resolve workspace (supports targetFolder override)
  const { projectPath, workspaceRoot } = resolveWorkspaceRoot(context, args.targetFolder);
  
  // Implementation
  
  // Return standard response
  return {
    success: true,
    message: '...',
    data: { ... },
    nextSteps: ['...']
  };
}
```

### Response Structure
All tools return consistent `ToolResponse`:

```typescript
interface ToolResponse {
  success: boolean;    // Operation status
  message: string;     // Human-readable result
  data?: any;          // Structured data (varies by tool)
  nextSteps?: string[]; // Suggested actions
}
```

### Server Pattern
The `Arc42MCPServer` class follows:

```typescript
class Arc42MCPServer {
  constructor()     // Initialize MCP server with metadata
  initialize()      // Setup transport, register tools
  registerTools()   // Register all tool handlers
  stop()           // Graceful shutdown
}
```

## Module Boundaries

### Core Boundaries

```
┌─────────────────────────────────────────────────────────────────┐
│ Entry Point (index.ts)                                          │
│ - CLI parsing, server instantiation                             │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│ Server (server.ts)                                              │
│ - MCP server lifecycle, tool registration                       │
│ - Depends on: tools/, types.ts                                  │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│ Tools (tools/*.ts)                                              │
│ - Individual tool implementations                               │
│ - Depends on: types.ts, templates/                              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│ Templates (templates/*.ts)                                      │
│ - Arc42 template content and metadata                           │
│ - No dependencies on other src modules                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Types (types.ts) - Shared across all modules                    │
│ - Interfaces, constants, utility functions                      │
└─────────────────────────────────────────────────────────────────┘
```

### Dependency Rules
- **Templates** → No internal dependencies (pure data)
- **Types** → No internal dependencies (shared definitions)
- **Tools** → Can import types.ts, templates/
- **Server** → Can import tools/, types.ts
- **Index** → Only imports server.ts

## Multi-Language Architecture (v2.0.0+)

The multi-language support uses the **Strategy Pattern** for clean separation and extensibility.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ TemplateProvider                                                │
│ - Unified API for accessing templates                           │
│ - Handles language and format selection                         │
│ - Uses LanguageFactory to get strategies                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│ LanguageFactory                                                 │
│ - Creates LanguageStrategy instances                            │
│ - Uses LanguageRegistry for lookup                              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│ LanguageRegistry                                                │
│ - Stores registered language strategies                         │
│ - Supports dynamic registration                                 │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│ LanguageStrategy (Interface) - Format-Aware                     │
│ - code: LanguageCode                                            │
│ - getSectionTitle(section): SectionTitle                        │
│ - getTemplateForFormat(section, format): string                 │
│ - getWorkflowGuideForFormat(format): string                     │
│ - getReadmeContentForFormat(projectName, format): string        │
└─────────────────────────────────────────────────────────────────┘
          │
          ├── EnglishStrategy (EN - default)
          ├── GermanStrategy (DE)
          ├── ... (11 languages total)
          │
          │   Each language uses FormatTemplatePlugin:
          │   ┌─────────────────────────────────────────┐
          │   │ FormatTemplatePlugin (per format)       │
          │   │ - getTemplate(section): string          │
          │   │ - getWorkflowGuide(): string            │
          │   │ - getReadmeContent(name?): string       │
          │   └─────────────────────────────────────────┘
          │         │
          │         ├── markdownPlugin (templates-markdown.ts)
          │         └── asciidocPlugin (templates-asciidoc.ts)
```

### Supported Languages
| Code | Language   | Markdown | AsciiDoc |
|------|------------|----------|----------|
| EN   | English    | ✅       | ✅       |
| DE   | German     | ✅       | ✅       |
| ES   | Spanish    | ✅       | ✅       |
| FR   | French     | ✅       | ✅       |
| IT   | Italian    | ✅       | ✅       |
| NL   | Dutch      | ✅       | ✅       |
| PT   | Portuguese | ✅       | ✅       |
| RU   | Russian    | ✅       | ✅       |
| CZ   | Czech      | ✅       | ✅       |
| UKR  | Ukrainian  | ✅       | ✅       |
| ZH   | Chinese    | ✅       | ✅       |

### Adding a New Language

1. Create language directory: `src/templates/locales/[code]/`
2. Add four files:
   - `index.ts` - Export the strategy (uses `createLanguageStrategy`)
   - `sections.ts` - Localized section metadata
   - `templates-markdown.ts` - Markdown template content
   - `templates-asciidoc.ts` - Native AsciiDoc template content
3. Register in `src/templates/locales/index.ts`
4. Add tests in `src/__tests__/templates/locales/[code]/`
5. Update `LanguageCode` type in language-strategy.ts

## Multi-Format Architecture (v2.1.0+)

The multi-format support uses the **Strategy Pattern** and **Plugin Pattern** for extensibility.

### Format Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ OutputFormatFactory                                             │
│ - Creates OutputFormatStrategy instances                        │
│ - Normalizes format codes and aliases                           │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│ OutputFormatRegistry                                            │
│ - Stores registered format strategies                           │
│ - O(1) lookup by format code                                    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│ OutputFormatStrategy (Interface)                                │
│ - code: OutputFormatCode                                        │
│ - fileExtension: string                                         │
│ - formatHeading(text, level): string                            │
│ - formatTable(headers, rows): string                            │
│ - formatCode(code, language?): string                           │
│ - ... (formatting methods)                                      │
└─────────────────────────────────────────────────────────────────┘
          │
          ├── MarkdownFormatStrategy
          │   - code: 'markdown'
          │   - fileExtension: '.md'
          │
          └── AsciiDocFormatStrategy
              - code: 'asciidoc'
              - fileExtension: '.adoc'
```

### Supported Formats
| Code       | Format   | Extension | Aliases                       |
|------------|----------|-----------|-------------------------------|
| `asciidoc` | AsciiDoc | `.adoc`   | adoc, ascii, asciidoctor, asc |
| `markdown` | Markdown | `.md`     | md, mdown, mkd                |

### Adding a New Format

1. Create format directory: `src/templates/formats/[format]/`
2. Implement `OutputFormatStrategy` interface
3. Register in `src/templates/formats/index.ts`
4. Add `FormatTemplatePlugin` implementations for each language
5. Add tests in `src/__tests__/templates/formats/[format]/`

## Code Size Guidelines

- **File size**: ~200-400 lines maximum (tools are typically 50-150 lines)
- **Function size**: ~50 lines maximum
- **Tool complexity**: Each tool should do ONE thing well
- **Nesting depth**: Maximum 3-4 levels of nesting

## Test Structure

Tests mirror the source structure:

```
src/__tests__/
├── fixtures/
│   └── test-helpers.ts              # Shared test utilities
├── templates/
│   ├── arc42-reference.test.ts      # Template version tests
│   ├── index.test.ts                # Template export tests
│   ├── formats/                     # Multi-format support tests
│   │   ├── index.test.ts            # Format barrel export tests
│   │   ├── output-format-strategy.test.ts   # Strategy interface tests
│   │   ├── output-format-registry.test.ts   # Registry tests
│   │   ├── output-format-factory.test.ts    # Factory pattern tests
│   │   ├── markdown/
│   │   │   └── markdown-format-strategy.test.ts
│   │   └── asciidoc/
│   │       └── asciidoc-strategy.test.ts
│   └── locales/                     # Multi-language support tests
│       ├── all-strategies.test.ts   # Parameterized tests for all languages
│       ├── language-factory.test.ts # Factory pattern tests
│       ├── language-registry.test.ts # Registry tests
│       ├── language-strategy.test.ts # Strategy interface tests
│       ├── template-provider.test.ts # Template provider tests
│       ├── en/
│       │   └── english-strategy.test.ts # English-specific tests
│       └── de/
│           └── german-strategy.test.ts  # German-specific tests
├── integration/                     # Integration tests
│   └── output-format-integration.test.ts # Format-language combinations
├── tools/
│   ├── arc42-init.test.ts           # Each tool has dedicated test file
│   ├── arc42-status.test.ts
│   ├── arc42-workflow-guide.test.ts
│   ├── generate-template.test.ts
│   ├── get-section.test.ts
│   └── update-section.test.ts
└── types.test.ts                    # Type utility tests
```

### Test Patterns
- **Unit tests** for individual functions and handlers
- **Mock file system** for tools that modify files
- **Consistent test structure**: describe → it → expect

## Documentation Standards

- **Public APIs**: JSDoc comments on exported functions and types
- **Complex logic**: Inline comments explaining WHY, not WHAT
- **README files**: Main README.md, docs/ for detailed guides
- **Code comments**: Use `// NOTE:` for important implementation notes
- **Type documentation**: Descriptive interface property comments

## Adding New Tools

To add a new MCP tool:

1. **Create tool file**: `src/tools/new-tool.ts`
   - Export `newToolTool` (tool definition)
   - Export `newToolHandler` (handler function)

2. **Register in server**: `src/server.ts`
   - Import handler
   - Add `registerTool()` call in `registerTools()`

3. **Add tests**: `src/__tests__/tools/new-tool.test.ts`

4. **Update documentation**: README.md, add tool description
