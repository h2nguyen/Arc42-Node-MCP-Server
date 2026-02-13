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
│  │ • language      │                                                   │
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
│  ┌─────────────────┐          ┌─────────────────┐                      │
│  │ LanguageStrategy│          │  LanguageCode   │                      │
│  │   (interface)   │          │   (type)        │                      │
│  │                 │          │                 │                      │
│  │ • code          │          │ EN, DE, ES, FR  │                      │
│  │ • name          │          │ IT, NL, PT, RU  │                      │
│  │ • nativeName    │          │ CZ, UKR, ZH     │                      │
│  │ • methods...    │          │                 │                      │
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

| Category              | Handling               | User Message                                            |
|-----------------------|------------------------|---------------------------------------------------------| 
| **Validation Error**  | Zod schema validation  | "Invalid input: [field] must be [constraint]"           |
| **Not Found**         | Check existence first  | "Workspace not found. Run arc42-init first."            |
| **File System Error** | Try-catch with details | "Failed to write section: [error details]"              |
| **Permission Error**  | Catch EACCES/EPERM     | "Permission denied writing to [path]"                   |
| **Invalid Language**  | Language validation    | "Invalid language code: [code]. Supported: EN, DE, ..." |

## 8.3 Validation Concept

### Input Validation with Zod

```typescript
// Schema definition in server.ts
inputSchema: {
  projectName: z.string().describe('Name of the project'),
  language: z.enum(['EN','DE','ES',...]).optional().describe('Language code'),
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

### Language Code Validation

```typescript
// Type-safe language code validation
type LanguageCode = 'EN' | 'DE' | 'ES' | 'FR' | 'IT' | 'NL' | 'PT' | 'RU' | 'CZ' | 'UKR' | 'ZH';

function isLanguageCode(code: string): code is LanguageCode;
function normalizeLanguageCode(code: string): LanguageCode; // throws on invalid
```

## 8.4 Internationalization (i18n) Concept

### Multi-Language Architecture

The system supports **11 languages** using a Strategy Pattern approach:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Internationalization Flow                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  User Request           Tool Handler            Locales Module          │
│  ────────────           ────────────            ──────────────          │
│       │                      │                        │                 │
│       │  language: "DE"      │                        │                 │
│       │─────────────────────▶│                        │                 │
│       │                      │  getTemplate("DE")     │                 │
│       │                      │───────────────────────▶│                 │
│       │                      │                        │                 │
│       │                      │   ┌──────────────────┐ │                 │
│       │                      │   │ LanguageFactory  │ │                 │
│       │                      │   │ creates          │ │                 │
│       │                      │   │ GermanStrategy   │ │                 │
│       │                      │   └──────────────────┘ │                 │
│       │                      │                        │                 │
│       │                      │◀───────────────────────│                 │
│       │  German template     │   localized content    │                 │
│       │◀─────────────────────│                        │                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Supported Languages

| Code | Language   | Native Name | Source                     |
|------|------------|-------------|----------------------------|
| EN   | English    | English     | Default                    |
| DE   | German     | Deutsch     | vendor/arc42-template/DE/  |
| ES   | Spanish    | Español     | vendor/arc42-template/ES/  |
| FR   | French     | Français    | vendor/arc42-template/FR/  |
| IT   | Italian    | Italiano    | vendor/arc42-template/IT/  |
| NL   | Dutch      | Nederlands  | vendor/arc42-template/NL/  |
| PT   | Portuguese | Português   | vendor/arc42-template/PT/  |
| RU   | Russian    | Русский     | vendor/arc42-template/RU/  |
| CZ   | Czech      | Čeština     | vendor/arc42-template/CZ/  |
| UKR  | Ukrainian  | Українська  | vendor/arc42-template/UKR/ |
| ZH   | Chinese    | 中文          | vendor/arc42-template/ZH/  |

### Language Configuration Persistence

Language is stored in `config.yaml` and read by tools:

```yaml
projectName: "My Project"
language: DE  # Default language for this workspace
```

### Design Patterns Used

| Pattern       | Class                       | Purpose                                                |
|---------------|-----------------------------|--------------------------------------------------------|
| **Strategy**  | `LanguageStrategy`          | Interface for interchangeable language implementations |
| **Registry**  | `LanguageRegistry`          | Central storage for all registered strategies          |
| **Factory**   | `LanguageFactory`           | Creates strategies with normalization and fallback     |
| **Facade**    | `LocalizedTemplateProvider` | Simplified API for tools to access localized content   |
| **Singleton** | Module instances            | Global access to registry, factory, provider           |

### Fallback Behavior

If an unsupported language is requested:
1. `createWithFallback()` logs a warning
2. Returns English strategy as default
3. Tool continues with English content

## 8.5 File Organization Pattern

### Documentation Workspace Structure

```
arc42-docs/
├── README.md              # Getting started guide (localized)
├── arc42-documentation.md # Combined main document (localized ToC)
├── config.yaml            # Metadata & configuration (includes language)
├── images/                # Diagrams and screenshots
│   └── .gitkeep
└── sections/              # Individual section files (localized titles)
    ├── 01_introduction_and_goals.md
    ├── 02_architecture_constraints.md
    └── ... (12 sections total)
```

### Naming Conventions

| Pattern          | Example                        | Purpose                      |
|------------------|--------------------------------|------------------------------|
| Section files    | `01_introduction_and_goals.md` | Numbered prefix for ordering |
| Config files     | `config.yaml`                  | YAML for configuration       |
| Documentation    | `README.md`, `*.md`            | Markdown for content         |
| Language folders | `locales/de/`, `locales/fr/`   | Lowercase ISO codes          |

## 8.6 Template System

### Template Generation Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ generate-       │────▶│ templateProvider│────▶│ Markdown        │
│ template(lang)  │     │ .getTemplate()  │     │ Output          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               │ Selects via LanguageFactory
                               ▼
                        ┌─────────────────┐
                        │ LanguageStrategy│
                        │ (EN/DE/ES/...)  │
                        │                 │
                        │ • Title         │
                        │ • Description   │
                        │ • Guidance text │
                        │ • Examples      │
                        │ • Sub-sections  │
                        └─────────────────┘
```

### Template Properties

| Property              | Description                                   |
|-----------------------|-----------------------------------------------|
| **Guidance Text**     | AI-friendly instructions for what to document |
| **Examples**          | Placeholder examples to illustrate structure  |
| **Sub-sections**      | Breakdown of section components               |
| **arc42 Attribution** | Reference to original arc42 template          |
| **Localized Content** | All content in the requested language         |

## 8.7 Configuration Management

### config.yaml Structure

```yaml
projectName: "My Project"
version: "1.0.0"
created: "2026-02-11T12:00:00.000Z"
format: "markdown"
language: "EN"  # Language code for this workspace
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

## 8.8 Response Format Convention

All tools return consistent MCP-compliant responses:

```typescript
// Success response (with language info)
{
  content: [{
    type: "text",
    text: JSON.stringify({
      success: true,
      message: "Operation completed (language: DE)",
      data: {
        language: { code: "DE", name: "German", nativeName: "Deutsch" },
        availableLanguages: [...],
        /* operation-specific data */
      },
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

## 8.9 Testing Strategy

| Test Type             | Coverage                                   | Tools                     |
|-----------------------|--------------------------------------------|---------------------------|
| **Unit Tests**        | Functions, utilities                       | Vitest                    |
| **Template Tests**    | All 12 section templates                   | Vitest                    |
| **Strategy Tests**    | All 11 language strategies                 | Vitest (parameterized)    |
| **Tool Tests**        | Each MCP tool handler + language scenarios | Vitest                    |
| **Integration Tests** | End-to-end flows                           | Vitest + temp directories |

### Coverage Thresholds

```typescript
// vitest.config.ts
coverage: {
  thresholds: {
    statements: 80,
    branches: 75,
    functions: 90,
    lines: 80
  }
}
```

### Language Strategy Testing

All 11 language strategies are tested with parameterized tests:

```typescript
describe.each(strategies)('$name ($code) Strategy', ({ strategy, code }) => {
  it.each(ARC42_SECTIONS)('returns valid template for %s', (section) => {
    const template = strategy.getTemplate(section);
    expect(template).toBeDefined();
    expect(template.length).toBeGreaterThan(0);
  });
});
```
