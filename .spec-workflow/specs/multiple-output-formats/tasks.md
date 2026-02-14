# Implementation Tasks: Multiple Output Formats

## Overview

This document breaks down the Multiple Output Formats feature into implementable tasks. Tasks follow the design document architecture and implement the requirements with AsciiDoc as the default format.

## Tasks

### Group 1: Core Format Infrastructure

- [x] 1.1 Create OutputFormatStrategy interface and types in `src/templates/formats/output-format-strategy.ts`
- [x] 1.2 Create OutputFormatRegistry class in `src/templates/formats/output-format-registry.ts`
- [x] 1.3 Create OutputFormatFactory class in `src/templates/formats/output-format-factory.ts`

### Group 2: Format Strategy Implementations

- [x] 2.1 Implement MarkdownFormatStrategy in `src/templates/formats/markdown/index.ts`
- [x] 2.2 Implement AsciiDocFormatStrategy in `src/templates/formats/asciidoc/index.ts`
- [x] 2.3 Create format module index and registration in `src/templates/formats/index.ts`

### Group 3: Unit Tests for Format Infrastructure

- [x] 3.1 Create OutputFormatStrategy interface tests
- [x] 3.2 Create OutputFormatRegistry tests
- [x] 3.3 Create OutputFormatFactory tests
- [x] 3.4 Create MarkdownFormatStrategy tests
- [x] 3.5 Create AsciiDocFormatStrategy tests

### Group 4: Template Provider Integration

- [x] 4.1 Update types.ts with format type exports
- [x] 4.2 Extend LocalizedTemplateProvider with format support
- [x] 4.3 Update templates index exports

### Group 5: Tool Updates

- [x] 5.1 Update arc42-init tool with format parameter
- [x] 5.2 Update generate-template tool with format support
- [x] 5.3 Update arc42-status tool to detect both formats
- [x] 5.4 Update get-section tool for multi-format detection
- [x] 5.5 Update update-section tool to maintain existing format

### Group 6: Integration Tests

- [x] 6.1 Create format integration tests
- [x] 6.2 Update existing tool tests for format support

### Group 7: Plugin Architecture and Native Templates

- [x] 7.1 Create FormatTemplatePlugin interface in `src/templates/locales/language-strategy-factory.ts`
- [x] 7.2 Create createLanguageStrategy factory function
- [x] 7.3 Create createFormatPlugin helper function
- [x] 7.4 Create createFormatPluginsWithFallback helper function
- [x] 7.5 Update LanguageStrategy interface with format-aware methods
- [x] 7.6 Create native AsciiDoc templates for all 11 languages from vendor sources
- [x] 7.7 Update all language index.ts files to use plugin architecture
- [x] 7.8 Add format detection utility functions to formats/index.ts
- [x] 7.9 Create comprehensive tests for formats/index.ts barrel exports

### Group 8: Documentation and Finalization

- [x] 8.1 Update tool descriptions for format documentation
- [x] 8.2 Run full test suite and fix issues
- [x] 8.3 Build and verify implementation

## Task Details

### Task 1.1: Create OutputFormatStrategy Interface

_Requirements: Req 1.1, Req 1.3_

Create `src/templates/formats/output-format-strategy.ts` with:
- `OutputFormatCode` type: `'markdown' | 'asciidoc'`
- `SUPPORTED_OUTPUT_FORMAT_CODES` constant array
- `OUTPUT_FORMAT_ALIASES` mapping for normalization
- `DEFAULT_OUTPUT_FORMAT` constant as `'asciidoc'`
- `OutputFormatStrategy` interface with syntax methods:
  - `code`, `name`, `fileExtension` properties
  - `formatHeading(text, level)`, `formatBold(text)`, `formatItalic(text)`
  - `formatCode(code, language?)`, `formatInlineCode(text)`
  - `formatUnorderedList(items)`, `formatOrderedList(items)`
  - `formatLink(text, url)`, `formatImage(alt, url)`
  - `formatTable(headers, rows)`, `formatBlockquote(text)`
  - `formatHorizontalRule()`, `formatAnchor(id)`
  - `getReadmeFilename()`, `getSectionFilename(section)`

---

### Task 1.2: Create OutputFormatRegistry Class

_Requirements: Req 2.1, Req 2.4, Req 2.5_

Create `src/templates/formats/output-format-registry.ts` with:
- `OutputFormatRegistry` class matching `LanguageRegistry` pattern
- `normalizeCode(code)` private method for case-insensitive lookup
- `register(strategy)` method with method chaining
- `get(code)` method returning strategy or undefined
- `getOrThrow(code)` method with descriptive error
- `getAll()` method returning array of strategies
- `isSupported(code)` method for checking support
- `getAvailableCodes()` method returning format codes
- `getDefault()` method returning AsciiDoc strategy
- `size` getter and `clear()` method

---

### Task 1.3: Create OutputFormatFactory Class

_Requirements: Req 1.5, Req 2.2, Req 2.3_

Create `src/templates/formats/output-format-factory.ts` with:
- `OutputFormatFactory` class matching `LanguageFactory` pattern
- Constructor accepting `OutputFormatRegistry`
- `normalizeCode(code)` using `OUTPUT_FORMAT_ALIASES`
- `create(code)` method using registry lookup
- `createWithFallback(code)` with AsciiDoc fallback and warning
- `isSupported(code)` method
- `getAvailableCodes()` method
- `getDefault()` returning AsciiDoc strategy

---

### Task 2.1: Implement MarkdownFormatStrategy

_Requirements: Req 3.1, Req 3.2, Req 3.3, Req 3.4_

Create `src/templates/formats/markdown/index.ts` with:
- `MarkdownFormatStrategy` class implementing `OutputFormatStrategy`
- `code = 'markdown'`, `name = 'Markdown'`, `fileExtension = '.md'`
- `formatHeading(text, level)`: `#`.repeat(level) + ` ${text}`
- `formatBold(text)`: `**${text}**`
- `formatItalic(text)`: `*${text}*`
- `formatCode(code, language?)`: triple backticks with language
- `formatInlineCode(text)`: single backticks
- `formatUnorderedList(items)`: `- item` format
- `formatOrderedList(items)`: `1. item` format
- `formatLink(text, url)`: `[text](url)`
- `formatImage(alt, url)`: `![alt](url)`
- `formatTable(headers, rows)`: pipe-separated table
- `formatBlockquote(text)`: `> text`
- `formatHorizontalRule()`: `---`
- `formatAnchor(id)`: empty string
- `getReadmeFilename()`: `README.md`
- `getSectionFilename(section)`: `${section}.md`

---

### Task 2.2: Implement AsciiDocFormatStrategy

_Requirements: Req 4.1-4.10_

Create `src/templates/formats/asciidoc/index.ts` with:
- `AsciiDocFormatStrategy` class implementing `OutputFormatStrategy`
- `code = 'asciidoc'`, `name = 'AsciiDoc'`, `fileExtension = '.adoc'`
- `formatHeading(text, level)`: `=`.repeat(level) + ` ${text}`
- `formatBold(text)`: `*${text}*`
- `formatItalic(text)`: `_${text}_`
- `formatCode(code, language?)`: `[source,lang]` + `----` block
- `formatInlineCode(text)`: backticks
- `formatUnorderedList(items)`: `* item` format
- `formatOrderedList(items)`: `. item` format
- `formatLink(text, url)`: `link:url[text]`
- `formatImage(alt, url)`: `image::url[alt]`
- `formatTable(headers, rows)`: AsciiDoc table with `|===`
- `formatBlockquote(text)`: `____` block
- `formatHorizontalRule()`: `'''`
- `formatAnchor(id)`: `[[id]]`
- `getReadmeFilename()`: `README.adoc`
- `getSectionFilename(section)`: `${section}.adoc`

---

### Task 2.3: Create Format Module Index

_Requirements: Req 1.4, Req 2.1_

Create `src/templates/formats/index.ts` with:
- Import all format strategies
- Create and export `outputFormatRegistry` singleton
- Register MarkdownFormatStrategy and AsciiDocFormatStrategy
- Create and export `outputFormatFactory` singleton
- Export all types, constants, and utilities
- Add `isOutputFormatCode()` and `normalizeOutputFormatCode()` helpers

---

### Task 3.1: Create OutputFormatStrategy Tests

Create `src/__tests__/templates/formats/output-format-strategy.test.ts` with:
- Test type definitions are correct
- Test constant values are correct
- Test alias mappings cover expected cases

---

### Task 3.2: Create OutputFormatRegistry Tests

Create `src/__tests__/templates/formats/output-format-registry.test.ts` with:
- Test registration with method chaining
- Test case-insensitive lookup
- Test `getOrThrow` error messages
- Test `getAll()` returns all strategies
- Test `isSupported()` returns correct boolean
- Test `getAvailableCodes()` returns all codes
- Test `getDefault()` returns AsciiDoc
- Test `size` getter and `clear()` method

---

### Task 3.3: Create OutputFormatFactory Tests

Create `src/__tests__/templates/formats/output-format-factory.test.ts` with:
- Test code normalization with aliases
- Test `create()` returns correct strategy
- Test `createWithFallback()` returns AsciiDoc for unknown
- Test `isSupported()` returns correct boolean
- Test `getDefault()` returns AsciiDoc

---

### Task 3.4: Create MarkdownFormatStrategy Tests

Create `src/__tests__/templates/formats/markdown/markdown-strategy.test.ts` with:
- Test all formatting methods produce correct Markdown syntax
- Test headings at all levels (1-6)
- Test code blocks with and without language
- Test table generation
- Test file naming methods

---

### Task 3.5: Create AsciiDocFormatStrategy Tests

Create `src/__tests__/templates/formats/asciidoc/asciidoc-strategy.test.ts` with:
- Test all formatting methods produce correct AsciiDoc syntax
- Test headings at all levels (1-6)
- Test code blocks with and without language
- Test table generation with AsciiDoc syntax
- Test anchor generation
- Test file naming methods

---

### Task 4.1: Update types.ts

Modify `src/types.ts` to add:
- `OutputFormatCode` type export
- `SUPPORTED_OUTPUT_FORMAT_CODES` export
- `DEFAULT_OUTPUT_FORMAT` export
- `OutputFormatStrategy` type export

---

### Task 4.2: Extend LocalizedTemplateProvider

_Requirements: Req 5.3, Req 5.4_

Modify `src/templates/locales/template-provider.ts` to add:
- Import `outputFormatFactory` from formats module
- `getFormatStrategy(format?: string)` method
- `getFormattedTemplate(section, language?, format?)` method
- `getFormattedReadmeContent(language?, format?, projectName?)` method
- `readFormatFromConfig(workspacePath)` helper method

---

### Task 4.3: Update Templates Index

Modify `src/templates/index.ts` to:
- Add exports from `./formats/index.js`
- Export format-related types and utilities

---

### Task 5.1: Update arc42-init Tool

_Requirements: Req 5.1, Req 5.2, Req 6.1_

Modify `src/tools/arc42-init.ts` to:
- Import format utilities from templates
- Add `format` parameter to input schema (default: 'asciidoc')
- Update config.yaml generation to include format
- Update README file creation to use format strategy
- Update section files to use correct extension
- Update main documentation file creation

---

### Task 5.2: Update generate-template Tool

_Requirements: Req 5.4, Req 6.2_

Modify `src/tools/generate-template.ts` to:
- Import format utilities from templates
- Add `format` parameter to input schema (optional)
- Read format from config.yaml if not specified
- Generate templates using the format strategy
- Update output to use correct file extension

---

### Task 5.3: Update arc42-status Tool

_Requirements: Req 6.5_

Modify `src/tools/arc42-status.ts` to:
- Update file detection to check both `.md` and `.adoc` extensions
- Report detected format in status output
- Handle mixed-format projects gracefully

---

### Task 5.4: Update get-section Tool

_Requirements: Req 6.4_

Modify `src/tools/get-section.ts` to:
- Update file detection to find both `.md` and `.adoc` files
- Return content regardless of format

---

### Task 5.5: Update update-section Tool

_Requirements: Req 6.3_

Modify `src/tools/update-section.ts` to:
- Detect existing file format from extension
- Maintain existing format when updating

---

### Task 6.1: Create Format Integration Tests

Create `src/__tests__/tools/format-integration.test.ts` with:
- Test `arc42-init` creates files in AsciiDoc format by default
- Test `arc42-init` creates files in Markdown format when specified
- Test `generate-template` respects config format
- Test `arc42-status` detects both formats
- Test format persistence across tool calls

---

### Task 6.2: Update Existing Tool Tests

Modify existing test files:
- `src/__tests__/tools/arc42-init.test.ts` for format support
- `src/__tests__/tools/generate-template.test.ts` for format support
- `src/__tests__/tools/arc42-status.test.ts` for format detection

---

### Task 7.1: Create FormatTemplatePlugin Interface

Create `src/templates/locales/language-strategy-factory.ts` with:
- `FormatTemplatePlugin` interface defining:
  - `getTemplate(section: Arc42Section): string`
  - `getWorkflowGuide(): string`
  - `getReadmeContent(projectName?: string): string`

---

### Task 7.2: Create createLanguageStrategy Factory Function

Add to `src/templates/locales/language-strategy-factory.ts`:
- `LanguageStrategyConfig` interface for configuration
- `createLanguageStrategy(config)` function that:
  - Creates LanguageStrategy with format dispatch
  - Routes template calls to appropriate FormatTemplatePlugin

---

### Task 7.3: Create createFormatPlugin Helper Function

Add to `src/templates/locales/language-strategy-factory.ts`:
- `createFormatPlugin(getTemplate, getWorkflowGuide, getReadmeContent)` helper
- Creates FormatTemplatePlugin from individual functions

---

### Task 7.4: Create createFormatPluginsWithFallback Helper Function

Add to `src/templates/locales/language-strategy-factory.ts`:
- `createFormatPluginsWithFallback(primaryPlugins, fallbackPlugins)` helper
- Enables languages to fall back to another language's templates for missing formats

---

### Task 7.5: Update LanguageStrategy Interface

Modify `src/templates/locales/language-strategy.ts`:
- Replace `getTemplate(section)` with `getTemplateForFormat(section, format)`
- Replace `getWorkflowGuide()` with `getWorkflowGuideForFormat(format)`
- Replace `getReadmeContent(projectName?)` with `getReadmeContentForFormat(projectName, format)`

---

### Task 7.6: Create Native AsciiDoc Templates for All Languages

Create `templates-asciidoc.ts` for each language from vendor sources:
- `src/templates/locales/cz/templates-asciidoc.ts` from `vendor/arc42-template/CZ/asciidoc/`
- `src/templates/locales/es/templates-asciidoc.ts` from `vendor/arc42-template/ES/asciidoc/`
- `src/templates/locales/fr/templates-asciidoc.ts` from `vendor/arc42-template/FR/asciidoc/`
- `src/templates/locales/it/templates-asciidoc.ts` from `vendor/arc42-template/IT/asciidoc/`
- `src/templates/locales/nl/templates-asciidoc.ts` from `vendor/arc42-template/NL/asciidoc/`
- `src/templates/locales/pt/templates-asciidoc.ts` from `vendor/arc42-template/PT/asciidoc/`
- `src/templates/locales/ru/templates-asciidoc.ts` from `vendor/arc42-template/RU/asciidoc/`
- `src/templates/locales/ukr/templates-asciidoc.ts` from `vendor/arc42-template/UA/asciidoc/`
- `src/templates/locales/zh/templates-asciidoc.ts` from `vendor/arc42-template/ZH/asciidoc/`

---

### Task 7.7: Update All Language Index Files

Update each language's `index.ts` to use plugin architecture:
- Import `createLanguageStrategy`, `createFormatPlugin` from factory
- Import templates from `templates-markdown.ts` and `templates-asciidoc.ts`
- Create format plugins for each format
- Export strategy created with `createLanguageStrategy`

---

### Task 7.8: Add Format Detection Utilities

Add to `src/templates/formats/index.ts`:
- `getOutputFormatStrategy(code)` - get strategy by code
- `getOutputFormatStrategyWithFallback(code)` - with AsciiDoc fallback
- `getDefaultOutputFormatStrategy()` - returns AsciiDoc
- `isOutputFormatSupported(code)` - check support
- `getSupportedOutputFormatCodes()` - list all codes
- `detectOutputFormatFromExtension(extension)` - detect from file extension
- `detectOutputFormatFromFilename(filename)` - detect from filename

---

### Task 7.9: Create Tests for Format Module Index

Create `src/__tests__/templates/formats/index.test.ts` with:
- Tests for singleton exports
- Tests for all utility functions
- Tests for format detection functions
- Tests for re-exported types and constants

---

### Task 8.1: Update Tool Descriptions

Modify tool files:
- `src/tools/arc42-init.ts` description for format parameter
- `src/tools/generate-template.ts` description for format parameter
- `src/tools/arc42-workflow-guide.ts` to document format selection

---

### Task 8.2: Run Full Test Suite

- Run `npm test` and ensure all tests pass
- Run `npm run test:coverage` and verify coverage thresholds
- Fix any failing tests or coverage gaps

---

### Task 8.3: Build and Verify

- Run `npm run build` and ensure no TypeScript errors
- Test manual workflow with MCP client
- Verify AsciiDoc output is valid

## Task Dependencies

```
1.1 ──┬──> 1.2 ──┬──> 1.3 ──┬──> 2.3
      │         │          │
      └──> 2.1 ─┘          │
      │                    │
      └──> 2.2 ────────────┘
                           │
                           v
           3.1 ────────────┬──> 4.1
           3.2 ────────────┤
           3.3 ────────────┤
           3.4 ────────────┤
           3.5 ────────────┘
                           │
                           v
           4.2 ────────────┬──> 4.3
                           │
                           v
           5.1 ──> 5.2 ──> 5.3 ──> 5.4 ──> 5.5
                           │
                           v
           6.1 ────────────┴────> 6.2
                                  │
                                  v
           7.1 ──> 7.2 ──> ... ──> 7.9
                                  │
                                  v
           8.1 ──> 8.2 ──> 8.3
```

## Summary

| Group | Description | Tasks |
|-------|-------------|-------|
| 1 | Core Infrastructure | 3 |
| 2 | Format Implementations | 3 |
| 3 | Unit Tests | 5 |
| 4 | Template Provider | 3 |
| 5 | Tool Updates | 5 |
| 6 | Integration Tests | 2 |
| 7 | Plugin Architecture & Native Templates | 9 |
| 8 | Documentation and Finalization | 3 |

**Total Tasks: 33**

## Implementation Statistics

- **Test Coverage**: 98.77% statements, 91.82% branches, 99.18% functions, 98.75% lines
- **Total Tests**: 1279 passing
- **Languages with Native AsciiDoc Templates**: 11 (EN, DE, CZ, ES, FR, IT, NL, PT, RU, UKR, ZH)
- **Output Formats Supported**: 2 (Markdown, AsciiDoc)
