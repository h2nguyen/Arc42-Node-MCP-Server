# 🧠 Arc42 Node MCP Server v2.2.0 - Claude Skill & Metadata Updates

**Feature & Maintenance Release**

This release introduces a pre-built Claude Skill for arc42 documentation, updates license metadata for improved compliance, and bumps dependencies to address security advisories.

## ✨ Highlights

- 🧠 **Claude Skill for Arc42** - Pre-built skill that teaches Claude how to use the arc42 MCP tools effectively
- 📋 **Project CLAUDE.md** - Project-level instructions for Claude Code with conventions and architecture overview
- 🔒 **License Metadata** - Updated to dual SPDX expression for accurate Apache-2.0 + CC-BY-SA-4.0 representation
- 📦 **Dependency Updates** - Security bumps for express-rate-limit, hono, and @hono/node-server

## 🧠 Claude Skill for Arc42

### Pre-Built Skill (`.claude/skills/arc42-docs-mcp/`)

A structured knowledge package that enables Claude to automatically follow arc42 best practices:

- **SKILL.md** - Workflows, tool reference, and behavioral guidelines for all 6 MCP tools
- **references/setup.md** - MCP server installation and configuration for all clients
- **references/examples.md** - 8 practical usage scenarios

### What It Enables

| Capability         | Description                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| Workflow awareness | Follows guide → init → status → template → write → review order                   |
| Tool mastery       | Calls the right tools with correct parameters in the right sequence               |
| Content quality    | Generates templates first, asks clarifying questions, documents WHY not just WHAT |
| ADR safety         | Reads existing ADRs before writing, always uses append mode                       |
| Format consistency | Checks configured format and writes AsciiDoc or Markdown consistently             |

### Installation in Other Projects

Copy or symlink `.claude/skills/arc42-docs-mcp/` into any project's `.claude/skills/` directory. See the [README](https://github.com/h2nguyen/Arc42-Node-MCP-Server#-claude-skill-for-arc42) for detailed instructions.

## 🔧 Metadata & Configuration

### License Metadata Update

- Updated `package.json` license field to SPDX expression `(Apache-2.0 AND CC-BY-SA-4.0)`
- Added explicit dual-license entries for Apache-2.0 (code) and CC-BY-SA-4.0 (arc42 template content)

### Dependency Review Configuration

- Added `.github/dependency-review-config.yml` with allowed license list for CI checks
- Covers Apache-2.0, MIT, ISC, BSD-2-Clause, BSD-3-Clause, CC-BY-SA-4.0, CC0-1.0, and 0BSD

## 📦 Dependency Updates

| Package              | From   | To      |
|----------------------|--------|---------|
| `express-rate-limit` | 8.2.1  | 8.3.1   |
| `hono`               | 4.12.3 | 4.12.5  |
| `@hono/node-server`  | 1.19.9 | 1.19.10 |
| `ip-address`         | 10.0.1 | 10.1.0  |

## 🚀 Upgrade

```bash
# Update to latest version
npm install -g @h2nguyen/arc42-node-mcp-server@2.2.0

# Or update in your project
npm update @h2nguyen/arc42-node-mcp-server
```

## 🔗 Compatibility

- **Node.js**: 24.0.0 or higher
- **MCP SDK**: 1.24.3
- **arc42 Template**: 9.0-EN (July 2025)

## 📖 Documentation

- [📘 README](https://github.com/h2nguyen/Arc42-Node-MCP-Server#readme) - Full setup and usage guide
- [🏛️ Architecture Documentation](https://github.com/h2nguyen/Arc42-Node-MCP-Server/tree/main/docs/arc42-docs) - arc42 documentation
- [🤝 Contributing](https://github.com/h2nguyen/Arc42-Node-MCP-Server/blob/main/CONTRIBUTING.md) - How to contribute

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
