# Changelog

All notable changes to the arc42 MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Multi-Language Template Support**: Documentation templates now available in 11 languages
  - Supported languages: EN (English), DE (German), ES (Spanish), FR (French), IT (Italian), NL (Dutch), PT (Portuguese), RU (Russian), CZ (Czech), UKR (Ukrainian), ZH (Chinese)
  - Language parameter added to `arc42-init`, `generate-template`, and `arc42-workflow-guide` tools
  - Language configuration stored in `config.yaml` for project-level default
  - Localized section titles, descriptions, and template content
  - Localized README content when initializing workspace
  - Localized workflow guides for each language

### Changed
- `arc42-init` now accepts optional `language` parameter (defaults to EN)
- `generate-template` now accepts optional `language` parameter (defaults to EN)
- `arc42-workflow-guide` now accepts optional `language` parameter (defaults to EN)
- `arc42-status` now displays configured language and available languages
- `get-section` now displays localized section metadata based on config.yaml language

### Architecture
- Added Strategy Pattern for language implementations (`LanguageStrategy` interface)
- Added Registry Pattern for language storage (`LanguageRegistry` class)
- Added Factory Pattern for language creation (`LanguageFactory` class)
- Added Facade Pattern for simplified access (`LocalizedTemplateProvider` class)
- All 11 languages follow S.O.L.I.D principles with LSP-compliant substitutability

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
