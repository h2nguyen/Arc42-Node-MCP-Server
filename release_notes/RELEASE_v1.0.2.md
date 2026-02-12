# 🎉 Arc42 Node MCP Server v1.0.2 - First Public Release

**AI-Assisted Architecture Documentation following the arc42 Template**

This is the first public release of the Arc42 Node MCP Server - a Model Context Protocol (MCP) server that brings the proven [arc42](https://arc42.org/) architecture documentation template to the age of AI-assisted development.

## ✨ Highlights

- 🤖 **AI-Powered Documentation** - Seamlessly integrates with Claude, Cursor, Cline, and other MCP-compatible tools
- 📋 **Complete arc42 Support** - All 12 sections of the arc42 template with AI-optimized guidance
- 🚀 **Simple Installation** - `npm install -g @h2nguyen/arc42-node-mcp-server`
- 📊 **Progress Tracking** - Monitor documentation completeness across all sections
- 🐳 **Docker Ready** - Full Docker and Docker Compose support included

## 🛠️ Tools Included

| Tool                   | Description                                                         |
|------------------------|---------------------------------------------------------------------|
| `arc42-workflow-guide` | Load the complete arc42 documentation workflow with all 12 sections |
| `arc42-init`           | Initialize arc42 workspace for a project                            |
| `arc42-status`         | Check documentation progress and completeness                       |
| `generate-template`    | Generate detailed templates for any arc42 section                   |
| `update-section`       | Add or modify content in specific sections                          |
| `get-section`          | Read content from any section                                       |

## 📚 The 12 arc42 Sections

All twelve arc42 sections are fully supported with comprehensive templates and AI-friendly guidance:

1. Introduction and Goals
2. Architecture Constraints
3. Context and Scope
4. Solution Strategy
5. Building Block View
6. Runtime View
7. Deployment View
8. Cross-cutting Concepts
9. Architecture Decisions (ADRs)
10. Quality Requirements
11. Risks and Technical Debt
12. Glossary

## 🚀 Quick Start

```bash
# Install globally
npm install -g @h2nguyen/arc42-node-mcp-server

# Or use directly with npx
npx @h2nguyen/arc42-node-mcp-server /path/to/project
```

Configure the server in Claude Desktop, Cursor, or Cline and start documenting!

## 💬 Example Interaction

```
User: "Help me create architecture documentation for my e-commerce platform"

AI: runs arc42-init { projectName: "E-Commerce Platform" }
AI: runs generate-template { section: "01_introduction_and_goals" }
AI: "Let's start with Section 1. What are the top 3 quality goals?"
```

## 📦 What's Included in v1.0.2

### Core Features (from v1.0.0)
- Complete arc42 workflow guide with all 12 sections
- Full TypeScript implementation with type safety
- MCP protocol support for AI tool integration
- Markdown-based documentation format
- Progress tracking and completeness metrics
- Docker support with Dockerfile and docker-compose.yml
- Comprehensive test suite with Vitest
- **arc42 Template Version Tracking**: Hybrid versioning approach for upstream arc42 template
  - Git submodule at `vendor/arc42-template` for development reference and easy upgrades
  - Metadata file tracking version for runtime (currently 9.0-EN, July 2025)
  - Generated documentation includes arc42 template version in `config.yaml`

### Improvements in v1.0.1
- Fixed CI workflow to trigger npm publishing on version tags
- Fixed npm authentication configuration for automated releases

### Improvements in v1.0.2
- Updated README installation section with examples for installing specific versions
- Updated CI workflow to publish with environment secrets

## 🔗 Compatibility

- **Node.js**: 24.0.0 or higher
- **MCP SDK**: 1.24.3
- **arc42 Template**: 9.0-EN (July 2025)

## 📖 Documentation

- [📘 README](https://github.com/h2nguyen/Arc42-Node-MCP-Server#readme) - Full setup and usage guide
- [🤝 Contributing](https://github.com/h2nguyen/Arc42-Node-MCP-Server/blob/main/CONTRIBUTING.md) - How to contribute
- [🧪 MCP Inspector Guide](https://github.com/h2nguyen/Arc42-Node-MCP-Server/blob/main/docs/mcp-inspector-testing.md) - Testing with MCP Inspector

## 📄 License

This project is licensed under **Apache License 2.0**. The arc42 template material is used under **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.

## 🙏 Acknowledgments

- [arc42](https://arc42.org/) - The proven architecture documentation template
- [Dr. Gernot Starke](https://github.com/gernotstarke) & [Dr. Peter Hruschka](https://github.com/Hruschka) - Creators of arc42
- [Model Context Protocol](https://modelcontextprotocol.io/) - Enabling AI tool integration

---

**Built with ❤️ for the global software architecture community**

[![arc42](https://img.shields.io/badge/template-arc42-orange.svg)](https://arc42.org/)
[![MCP](https://img.shields.io/badge/protocol-MCP-blue.svg)](https://modelcontextprotocol.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
