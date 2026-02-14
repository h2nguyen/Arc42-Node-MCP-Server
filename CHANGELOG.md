# Changelog

All notable changes to the arc42 MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-02-14

### Added
- **Multiple Output Format Support**: Documentation can now be generated in both Markdown and AsciiDoc formats
  - Supported formats: `markdown` (aliases: md, mdown, mkd) and `asciidoc` (aliases: adoc, ascii, asciidoctor, asc)
  - Format parameter added to `arc42-init`, `generate-template`, and `arc42-workflow-guide` tools
  - Format configuration stored in `config.yaml` for project-level default
  - AsciiDoc is now the **default format** for new projects (richer feature set for professional documentation)
- **Native AsciiDoc Templates**: All 11 languages now have native AsciiDoc templates sourced directly from the official arc42-template repository
  - Templates preserve AsciiDoc-specific features (includes, admonitions, cross-references)
  - No quality loss from format conversion - true native templates
- **Output Format Strategy Architecture**: Pluggable format system using Strategy Pattern
  - `OutputFormatStrategy` interface for format-specific syntax generation
  - `OutputFormatRegistry` for centralized format storage with O(1) lookup
  - `OutputFormatFactory` for format creation with normalization and fallback
  - `MarkdownFormatStrategy` and `AsciiDocFormatStrategy` implementations
- **Plugin Architecture for Language Templates**: New plugin-based template system
  - `FormatTemplatePlugin` interface for format-specific template providers
  - `createLanguageStrategy()` factory for composing strategies with format plugins
  - `createFormatPlugin()` and `createFormatPluginsWithFallback()` helper functions
  - Each language now uses plugin architecture for DRY template management
- **Format Detection Utilities**: New utility functions in `src/templates/formats/index.ts`
  - `detectOutputFormatFromExtension()` - detect format from file extension
  - `detectOutputFormatFromFilename()` - detect format from filename
  - `isOutputFormatSupported()` - check if format code is supported
  - `getSupportedOutputFormatCodes()` - list all available format codes
- **Comprehensive Test Coverage**: 1,279 tests with excellent coverage
  - New test files for format module (`output-format-strategy.test.ts`, `output-format-registry.test.ts`, etc.)
  - Integration tests for format-language combinations
  - Coverage: 98.77% statements, 91.82% branches, 99.18% functions, 98.75% lines

### Changed
- **Breaking**: `LanguageStrategy` interface methods renamed for format awareness:
  - `getTemplate(section)` → `getTemplateForFormat(section, format)`
  - `getWorkflowGuide()` → `getWorkflowGuideForFormat(format)`
  - `getReadmeContent(projectName?)` → `getReadmeContentForFormat(projectName, format)`
- **Breaking**: Default output format changed from Markdown to AsciiDoc for new projects
- `arc42-init` now accepts optional `format` parameter (defaults to asciidoc)
- `generate-template` now accepts optional `format` parameter (defaults to config.yaml setting or asciidoc)
- `arc42-workflow-guide` now accepts optional `format` parameter (defaults to asciidoc)
- `arc42-status` now displays configured format alongside language information
- `update-section` now detects and maintains existing file format based on extension
- `get-section` now reads files regardless of format (supports both `.md` and `.adoc`)
- Template files restructured: each language now has separate `templates-markdown.ts` and `templates-asciidoc.ts`
- Removed unified `templates.ts` files in favor of format-specific template files

### Architecture
- Added Strategy Pattern for output format implementations (`OutputFormatStrategy` interface)
- Added Registry Pattern for format storage (`OutputFormatRegistry` class)
- Added Factory Pattern for format creation (`OutputFormatFactory` class)
- Added Plugin Pattern for language template providers (`FormatTemplatePlugin` interface)
- New `src/templates/formats/` module with complete format infrastructure
- New `src/templates/locales/language-strategy-factory.ts` for plugin-based strategy creation
- All format strategies follow S.O.L.I.D principles with LSP-compliant substitutability
- Format constants defined in `output-format-strategy.ts`: `SUPPORTED_OUTPUT_FORMAT_CODES`, `OUTPUT_FORMAT_ALIASES`, `DEFAULT_OUTPUT_FORMAT`

### Documentation
- Architecture documentation converted from Markdown to AsciiDoc format
- Added PlantUML diagrams throughout arc42 documentation (business context, building blocks, runtime views, etc.)
- Updated ADR-011 through ADR-014 documenting format-related architectural decisions
- Updated glossary with output format terminology
- Spec documents in `.spec-workflow/specs/multiple-output-formats/` documenting feature requirements and design

## [2.0.0] - 2026-02-14

### Added
- **Multi-Language Template Support**: Documentation templates now available in 11 languages
  - Supported languages: EN (English), DE (German), ES (Spanish), FR (French), IT (Italian), NL (Dutch), PT (Portuguese), RU (Russian), CZ (Czech), UKR (Ukrainian), ZH (Chinese)
  - Language parameter added to `arc42-init`, `generate-template`, and `arc42-workflow-guide` tools
  - Language configuration stored in `config.yaml` for project-level default
  - Localized section titles, descriptions, and template content
  - Localized README content when initializing workspace
  - Localized workflow guides for each language
- **Spec Driven Development (SDD) Development Support**: Added steering documents and templates for structured development workflow
  - Product, requirements, and design documentation templates
  - Tasks document template for step-by-step feature development
  - Custom templates feature with user-templates directory for overrides
  - Coding best practices focused on S.O.L.I.D & DRY principles, TDD, and design patterns
- **Documentation Quality Assurance**: Enhanced README with new sections
  - Star History chart for tracking repository growth
  - Spec Driven Development methodology details
  - Integration with [@pimzino/spec-workflow-mcp](https://github.com/Pimzino/spec-workflow-mcp) for structured workflow
  - Integration with [dacli](https://github.com/docToolchain/dacli) for reviewing and validating architecture documentation
- Added dependency `chokidar` for file system watching in development

### Changed
- **Breaking**: Renamed `arc42-template.md` to `arc42-documentation.md` for clarity (the file contains actual documentation, not a template)
- `arc42-init` now accepts optional `language` parameter (defaults to EN)
- `generate-template` now accepts optional `language` parameter (defaults to EN)
- `arc42-workflow-guide` now accepts optional `language` parameter (defaults to EN)
- `arc42-status` now displays configured language and available languages
- `get-section` now displays localized section metadata based on config.yaml language
- Switched Docker base image from `node:24-slim` to `node:24-alpine` for better resource optimization
- Improved test coverage thresholds: Statements (80%), Branches (75%), Functions (90%), Lines (80%)

### Architecture
- Added Strategy Pattern for language implementations (`LanguageStrategy` interface)
- Added Registry Pattern for language storage (`LanguageRegistry` class)
- Added Factory Pattern for language creation (`LanguageFactory` class)
- Added Facade Pattern for simplified access (`LocalizedTemplateProvider` class)
- All 11 languages follow S.O.L.I.D principles with LSP-compliant substitutability
- Parameterized tests for all language strategies ensuring interface compliance
- Verified LSP compliance and TDD patterns in language strategy implementations

## [1.0.3] - 2026-02-12

### Fixed
- Updated the build script to set execute permissions on dist/index.js

## [1.0.2] - 2026-02-11

### Changed
- Updated README installation section with examples for installing specific versions
- Updated CI workflow to publish with environment secrets

## [1.0.1] - 2026-02-11

### Fixed
- Fixed CI workflow to trigger npm publishing on version tags
- Fixed npm authentication configuration for automated releases

## [1.0.0] - 2026-02-11

### Added
- Initial release of arc42 MCP Server
- Complete arc42 workflow guide with all 12 sections
- `arc42-workflow-guide` tool for comprehensive documentation guidance
- `arc42-init` tool to initialize arc42 workspace with optional targetFolder parameter
- `arc42-status` tool to track documentation progress with arc42 template reference information
- `generate-template` tool for all 12 arc42 sections
- `update-section` tool to add/modify section content
- `get-section` tool to read section content
- Comprehensive templates for all arc42 sections:
  1. Introduction and Goals
  2. Architecture Constraints
  3. Context and Scope
  4. Solution Strategy
  5. Building Block View
  6. Runtime View
  7. Deployment View
  8. Cross-cutting Concepts
  9. Architecture Decisions
  10. Quality Requirements
  11. Risks and Technical Debt
  12. Glossary
- **arc42 Template Version Tracking**: Hybrid versioning approach for upstream arc42 template
  - Git submodule at `vendor/arc42-template` for development reference and easy upgrades
  - Metadata file `src/templates/arc42-reference.ts` tracking version for runtime (currently 9.0-EN, July 2025)
  - Generated documentation includes arc42 template version in `config.yaml`
- TypeScript implementation with full type safety
- MCP protocol support
- Markdown-based documentation format
- Progress tracking and completeness metrics
- Docker support with Dockerfile and docker-compose.yml
- Comprehensive test suite with Vitest
- Apache 2.0 license with proper arc42 attribution (CC BY-SA 4.0)

### Documentation
- Comprehensive README with examples
- Quick start guide
- Best practices for AI-assisted documentation
- Setup instructions for Claude Desktop and Cursor
- Usage examples for each tool
- MCP Inspector testing guide
- CONTRIBUTING.md with development guidelines
- NOTICE file with third-party attributions
- LICENSE-ARC42 with full CC BY-SA 4.0 license text
