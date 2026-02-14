# 🎉 Arc42 Node MCP Server v2.1.0 - Multi-Format Support

**AI-Assisted Architecture Documentation in Markdown & AsciiDoc**

This release brings multiple output format support with native AsciiDoc and Markdown templates, a plugin-based architecture for extensibility, and comprehensive test coverage improvements.

## ✨ Highlights

- 📄 **Multi-Format Support** - Documentation output in both Markdown and AsciiDoc formats
- 🎯 **AsciiDoc Default** - AsciiDoc is now the default format for richer professional documentation
- 🔌 **Plugin Architecture** - Extensible format system with `FormatTemplatePlugin` interface
- 📊 **Native Templates** - All 11 languages have native AsciiDoc templates from vendor sources
- ✅ **1,279 Tests** - Comprehensive test coverage at 98%+

## 📄 Supported Formats

| Code       | Format   | Extension | Aliases                       |
|------------|----------|-----------|-------------------------------|
| `asciidoc` | AsciiDoc | `.adoc`   | adoc, ascii, asciidoctor, asc |
| `markdown` | Markdown | `.md`     | md, mdown, mkd                |

> **Default**: AsciiDoc provides richer formatting features (includes, admonitions, cross-references) ideal for professional documentation.

## 🆕 What's New

### 📄 Multiple Output Format Support
- Format parameter added to `arc42-init`, `generate-template`, and `arc42-workflow-guide` tools
- Format configuration stored in `config.yaml` for project-level default
- Automatic format detection from file extension in `update-section` and `get-section`
- Support for format aliases (e.g., `adoc`, `md`, `ascii`)

### 🎯 Native AsciiDoc Templates
- All 11 languages now have native AsciiDoc templates sourced from the official arc42-template repository
- Templates preserve AsciiDoc-specific features (includes, admonitions, cross-references)
- No quality loss from format conversion - true native templates

### 🔌 Plugin Architecture for Language Templates
- `FormatTemplatePlugin` interface for format-specific template providers
- `createLanguageStrategy()` factory for composing strategies with format plugins
- `createFormatPlugin()` and `createFormatPluginsWithFallback()` helper functions
- DRY template management across 11 languages × 2 formats

### 🏗️ Output Format Strategy Architecture
- `OutputFormatStrategy` interface for format-specific syntax generation
- `OutputFormatRegistry` for centralized format storage with O(1) lookup
- `OutputFormatFactory` for format creation with normalization and fallback
- `MarkdownFormatStrategy` and `AsciiDocFormatStrategy` implementations

### 🔧 Format Detection Utilities
New utility functions in `src/templates/formats/index.ts`:
- `detectOutputFormatFromExtension()` - detect format from file extension
- `detectOutputFormatFromFilename()` - detect format from filename
- `isOutputFormatSupported()` - check if format code is supported
- `getSupportedOutputFormatCodes()` - list all available format codes

### 📊 Test Coverage Improvements
- **1,279 tests** passing
- Coverage: 98.77% statements, 91.82% branches, 99.18% functions, 98.75% lines
- New test files for format module
- Integration tests for format-language combinations

## ⚠️ Breaking Changes

| Change | Migration |
|--------|-----------|
| `LanguageStrategy.getTemplate(section)` | Use `getTemplateForFormat(section, format)` |
| `LanguageStrategy.getWorkflowGuide()` | Use `getWorkflowGuideForFormat(format)` |
| `LanguageStrategy.getReadmeContent(name?)` | Use `getReadmeContentForFormat(name, format)` |
| Default format changed to AsciiDoc | Specify `format: "markdown"` for Markdown output |

## 🚀 Quick Start

```bash
# Install globally
npm install -g @h2nguyen/arc42-node-mcp-server

# Initialize with AsciiDoc (default)
arc42-init --projectName "My Project"

# Initialize with Markdown
arc42-init --projectName "My Project" --format markdown

# Initialize with German AsciiDoc
arc42-init --projectName "Mein Projekt" --language DE --format asciidoc
```

## 💬 Example Interaction

```
User: "Create professional architecture documentation with AsciiDoc"

AI: runs arc42-init { projectName: "Enterprise Platform", format: "asciidoc" }
AI: runs generate-template { section: "01_introduction_and_goals", format: "asciidoc" }
AI: "I've created an AsciiDoc workspace with rich formatting support.
     Let's start documenting your architecture requirements."
```

## 🔗 Compatibility

- **Node.js**: 24.0.0 or higher
- **MCP SDK**: 1.24.3
- **arc42 Template**: 9.0-EN (July 2025)

## 📖 Documentation

- [📘 README](https://github.com/h2nguyen/Arc42-Node-MCP-Server#readme) - Full setup and usage guide
- [🏛️ Architecture Documentation](https://github.com/h2nguyen/Arc42-Node-MCP-Server/tree/main/docs/arc42-docs) - arc42 documentation (now in AsciiDoc with PlantUML diagrams)
- [🤝 Contributing](https://github.com/h2nguyen/Arc42-Node-MCP-Server/blob/main/CONTRIBUTING.md) - How to contribute
- [🧪 MCP Inspector Guide](https://github.com/h2nguyen/Arc42-Node-MCP-Server/blob/main/docs/mcp-inspector-testing.md) - Testing with MCP Inspector

## 📄 License

This project is licensed under **Apache License 2.0**. The arc42 template material is used under **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.

## 🙏 Acknowledgments

- [arc42](https://arc42.org/) - The proven architecture documentation template
- [Dr. Gernot Starke](https://github.com/gernotstarke) & [Dr. Peter Hruschka](https://github.com/Hruschka) - Creators of arc42
- [Model Context Protocol](https://modelcontextprotocol.io/) - Enabling AI tool integration
- [@pimzino/spec-workflow-mcp](https://github.com/Pimzino/spec-workflow-mcp) - Spec Driven Development workflow
- [dacli](https://github.com/docToolchain/dacli) - Documentation Access CLI
- [Asciidoctor](https://asciidoctor.org/) - The AsciiDoc toolchain

---

**Built with ❤️ for the global software architecture community**

[![arc42](https://img.shields.io/badge/template-arc42-orange.svg)](https://arc42.org/)
[![MCP](https://img.shields.io/badge/protocol-MCP-blue.svg)](https://modelcontextprotocol.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![AsciiDoc](https://img.shields.io/badge/format-AsciiDoc-green.svg)](https://asciidoc.org/)
