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
│        │                  │                   ▼                         │
│        │                  │           ┌─────────────┐                  │
│        │                  │           │   Locales   │                  │
│        │                  │           │   Module    │                  │
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

| Block                 | Responsibility                          | Location                 |
|-----------------------|-----------------------------------------|--------------------------|
| **Entry Point**       | Process startup, CLI argument handling  | `src/index.ts`           |
| **Server Core**       | MCP server lifecycle, tool registration | `src/server.ts`          |
| **Tools Layer**       | Individual tool implementations         | `src/tools/*.ts`         |
| **Templates Layer**   | arc42 section templates facade          | `src/templates/*.ts`     |
| **Locales Module**    | Multi-language support infrastructure   | `src/templates/locales/` |
| **Types & Utilities** | Shared types, constants, helpers        | `src/types.ts`           |

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
│  │  documentation      │    │  + language param   │                    │
│  │  + language param   │    │                     │                    │
│  └─────────────────────┘    └─────────────────────┘                    │
│                                                                         │
│  ┌─────────────────────┐    ┌─────────────────────┐                    │
│  │   arc42-status      │    │  generate-template  │                    │
│  │                     │    │                     │                    │
│  │  Reports progress   │    │  Creates section    │                    │
│  │  + language info    │    │  template content   │                    │
│  │  + available langs  │    │  + language param   │                    │
│  └─────────────────────┘    └─────────────────────┘                    │
│                                                                         │
│  ┌─────────────────────┐    ┌─────────────────────┐                    │
│  │   update-section    │    │    get-section      │                    │
│  │                     │    │                     │                    │
│  │  Writes content to  │    │  Reads section      │                    │
│  │  section files      │    │  content + lang     │                    │
│  └─────────────────────┘    └─────────────────────┘                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tool Details

| Tool                   | File                                | Dependencies              | Language Support           |
|------------------------|-------------------------------------|---------------------------|----------------------------|
| `arc42-workflow-guide` | `src/tools/arc42-workflow-guide.ts` | Types, Locales            | ✅ `language` param         |
| `arc42-init`           | `src/tools/arc42-init.ts`           | Types, Templates, Locales | ✅ `language` param         |
| `arc42-status`         | `src/tools/arc42-status.ts`         | Types, Locales            | ✅ displays config language |
| `generate-template`    | `src/tools/generate-template.ts`    | Types, Templates, Locales | ✅ `language` param         |
| `update-section`       | `src/tools/update-section.ts`       | Types                     | -                          |
| `get-section`          | `src/tools/get-section.ts`          | Types, Locales            | ✅ reads config language    |

## 5.3 Level 2: Templates Layer with Locales

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Templates Layer                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    templates/index.ts                            │   │
│  │                                                                  │   │
│  │  • getSectionTemplate(section, language?) → template content    │   │
│  │  • getSectionMetadata(section, language?) → localized metadata  │   │
│  │  • getWorkflowGuide(language?) → localized guide               │   │
│  │  • getAvailableLanguages() → list of 11 languages              │   │
│  │  • templateProvider (facade instance)                           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                │                                        │
│                                ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    templates/locales/                            │   │
│  │                                                                  │   │
│  │  ┌───────────────────┐  ┌───────────────────┐                   │   │
│  │  │ LanguageStrategy  │  │  LanguageRegistry │                   │   │
│  │  │   (interface)     │  │     (storage)     │                   │   │
│  │  └───────────────────┘  └───────────────────┘                   │   │
│  │  ┌───────────────────┐  ┌───────────────────┐                   │   │
│  │  │  LanguageFactory  │  │LocalizedTemplate- │                   │   │
│  │  │   (creation)      │  │    Provider       │                   │   │
│  │  └───────────────────┘  └───────────────────┘                   │   │
│  │                                                                  │   │
│  │  Language Strategies (11 languages):                            │   │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                     │   │
│  │  │ EN │ │ DE │ │ ES │ │ FR │ │ IT │ │ NL │                     │   │
│  │  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                     │   │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                            │   │
│  │  │ PT │ │ RU │ │ CZ │ │UKR │ │ ZH │                            │   │
│  │  └────┘ └────┘ └────┘ └────┘ └────┘                            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                 templates/arc42-reference.ts                     │   │
│  │                                                                  │   │
│  │  • getArc42TemplateVersion() → version info from submodule      │   │
│  │  • arc42Reference object (static template content)              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 5.4 Level 3: Locales Module (Design Patterns)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Locales Module - Design Patterns                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  STRATEGY PATTERN                     REGISTRY PATTERN                  │
│  ┌──────────────────────┐            ┌──────────────────────┐          │
│  │  «interface»         │            │  LanguageRegistry    │          │
│  │  LanguageStrategy    │            │                      │          │
│  ├──────────────────────┤            │  - strategies: Map   │          │
│  │  + code: string      │            │                      │          │
│  │  + name: string      │            │  + register(s)       │          │
│  │  + nativeName: string│◀───────────│  + get(code)         │          │
│  │  + getSectionTitle() │            │  + getAvailableCodes │          │
│  │  + getTemplate()     │            │  + isSupported()     │          │
│  │  + getWorkflowGuide()│            └──────────────────────┘          │
│  └──────────────────────┘                      │                        │
│           △                                    │ uses                   │
│           │ implements                         ▼                        │
│  ┌────────┴────────┐              ┌──────────────────────┐             │
│  │                 │              │   LanguageFactory    │             │
│  ▼                 ▼              │                      │             │
│ EnglishStrategy  GermanStrategy   │  + create(code)      │◀── FACTORY  │
│ SpanishStrategy  FrenchStrategy   │  + createWithFallback│    PATTERN  │
│ ItalianStrategy  DutchStrategy    │  + normalizeCode()   │             │
│ PortugueseStrat  RussianStrategy  └──────────────────────┘             │
│ CzechStrategy    UkrainianStrat           │                            │
│ ChineseStrategy                           │ uses                       │
│                                           ▼                            │
│                              ┌──────────────────────┐                  │
│                              │LocalizedTemplate-    │◀── FACADE       │
│                              │     Provider         │    PATTERN      │
│                              │                      │                  │
│                              │ + getTemplate()      │                  │
│                              │ + getSectionMetadata │                  │
│                              │ + getWorkflowGuide() │                  │
│                              │ + getAvailableLangs()│                  │
│                              └──────────────────────┘                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 5.5 File Structure

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
│   ├── index.ts             # Template functions (facade to locales)
│   ├── arc42-reference.ts   # arc42 template reference
│   │
│   └── locales/             # Multi-language support
│       ├── index.ts             # Barrel export + singletons
│       ├── language-strategy.ts # Interface + types
│       ├── language-registry.ts # Registry class
│       ├── language-factory.ts  # Factory class
│       ├── template-provider.ts # Facade class
│       │
│       ├── en/                  # English strategy
│       │   ├── index.ts
│       │   ├── sections.ts
│       │   └── templates.ts
│       ├── de/                  # German strategy
│       ├── es/                  # Spanish strategy
│       ├── fr/                  # French strategy
│       ├── it/                  # Italian strategy
│       ├── nl/                  # Dutch strategy
│       ├── pt/                  # Portuguese strategy
│       ├── ru/                  # Russian strategy
│       ├── cz/                  # Czech strategy
│       ├── ukr/                 # Ukrainian strategy
│       └── zh/                  # Chinese strategy
│
└── __tests__/               # Test files (mirrors src/ structure)
    ├── templates/
    │   └── locales/
    │       ├── language-strategy.test.ts
    │       ├── language-registry.test.ts
    │       ├── language-factory.test.ts
    │       ├── template-provider.test.ts
    │       ├── all-strategies.test.ts   # Parameterized tests
    │       ├── en/
    │       └── de/
    └── tools/
        └── *.test.ts        # Tool tests with language scenarios
```

## 5.6 Key Interfaces

### LanguageStrategy

```typescript
interface LanguageStrategy {
    readonly code: LanguageCode;    // e.g., 'EN', 'DE'
    readonly name: string;          // e.g., 'English', 'German'
    readonly nativeName: string;    // e.g., 'English', 'Deutsch'

    getSectionTitle(section: Arc42Section): SectionTitle;

    getSectionDescription(section: Arc42Section): SectionDescription;

    getTemplate(section: Arc42Section): string;

    getWorkflowGuide(): string;

    getReadmeContent(projectName?: string): string;
}
```

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

### LanguageCode

```typescript
type LanguageCode =
    | 'EN' | 'DE' | 'ES' | 'FR' | 'IT'
    | 'NL' | 'PT' | 'RU' | 'CZ' | 'UKR' | 'ZH';
```
