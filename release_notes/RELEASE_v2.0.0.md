# 🎉 Arc42 Node MCP Server v2.0.0 - Multi-Language Support

**AI-Assisted Architecture Documentation in 11 Languages**

This major release brings internationalization to arc42 documentation with support for 11 languages, enhanced development workflows, and improved documentation quality tools.

## ✨ Highlights

- 🌍 **Multi-Language Support** - Documentation templates now available in 11 languages
- 📋 **Spec Driven Development** - Integrated workflow with steering documents and templates
- 🔍 **Documentation Quality** - dacli integration for reviewing and validating architecture docs
- ⚠️ **Breaking Change** - `arc42-template.md` renamed to `arc42-documentation.md`

## 🌐 Supported Languages

| Code | Language   | Code | Language   |
|------|------------|------|------------|
| EN   | English    | PT   | Portuguese |
| DE   | German     | RU   | Russian    |
| ES   | Spanish    | CZ   | Czech      |
| FR   | French     | UKR  | Ukrainian  |
| IT   | Italian    | ZH   | Chinese    |
| NL   | Dutch      |      |            |

## 🆕 What's New

### 🌍 Multi-Language Template Support
- Language parameter added to `arc42-init`, `generate-template`, and `arc42-workflow-guide` tools
- Language configuration stored in `config.yaml` for project-level default
- Localized section titles, descriptions, template content, README, and workflow guides

### 📋 Spec Driven Development (SDD) Development Support
- Product, requirements, and design documentation templates
- Tasks document template for step-by-step feature development
- Custom templates feature with user-templates directory for overrides
- Coding best practices focused on S.O.L.I.D & DRY principles, TDD, and design patterns
- Integration with [@pimzino/spec-workflow-mcp](https://github.com/Pimzino/spec-workflow-mcp)

### 🔍 Documentation Quality Assurance
- Integration with [dacli](https://github.com/docToolchain/dacli) for reviewing and validating architecture documentation
- Star History chart for tracking repository growth

### 🏗️ Architecture Improvements
- Strategy Pattern for language implementations (`LanguageStrategy` interface)
- Registry Pattern for language storage (`LanguageRegistry` class)
- Factory Pattern for language creation (`LanguageFactory` class)
- Facade Pattern for simplified access (`LocalizedTemplateProvider` class)
- All 11 languages follow S.O.L.I.D principles with LSP-compliant substitutability

### 🔧 Other Changes
- Switched Docker base image from `node:24-slim` to `node:24-alpine`
- Improved test coverage thresholds: Statements (80%), Branches (75%), Functions (90%), Lines (80%)
- Added `chokidar` dependency for file system watching

## ⚠️ Breaking Changes

| Change | Migration |
|--------|-----------|
| `arc42-template.md` renamed to `arc42-documentation.md` | Update any scripts or references to use the new filename |

## 🚀 Quick Start

```bash
# Install globally
npm install -g @h2nguyen/arc42-node-mcp-server

# Initialize with a specific language
arc42-init --projectName "My Project" --language DE
```

## 💬 Example Interaction

```
User: "Create German architecture documentation for my banking platform"

AI: runs arc42-init { projectName: "Banking Platform", language: "DE" }
AI: runs generate-template { section: "01_introduction_and_goals", language: "DE" }
AI: "Beginnen wir mit Abschnitt 1. Was sind Ihre wichtigsten Qualitätsziele?"
```

## 🔗 Compatibility

- **Node.js**: 24.0.0 or higher
- **MCP SDK**: 1.24.3
- **arc42 Template**: 9.0-EN (July 2025)

## 📖 Documentation

- [📘 README](https://github.com/h2nguyen/Arc42-Node-MCP-Server#readme) - Full setup and usage guide
- [🏛️ Architecture Documentation](https://github.com/h2nguyen/Arc42-Node-MCP-Server/tree/main/docs/arc42-docs) - arc42 documentation of this project
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

---

**Built with ❤️ for the global software architecture community**

[![arc42](https://img.shields.io/badge/template-arc42-orange.svg)](https://arc42.org/)
[![MCP](https://img.shields.io/badge/protocol-MCP-blue.svg)](https://modelcontextprotocol.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
