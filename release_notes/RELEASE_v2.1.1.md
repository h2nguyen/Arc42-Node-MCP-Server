# 🔒 Arc42 Node MCP Server v2.1.1 - Security Hardening

**Security-Focused Patch Release**

This release addresses security vulnerabilities by removing direct system shell access and updates dependencies to their latest versions.

## ✨ Highlights

- 🔒 **Security Hardening** - Removed direct system shell access to eliminate code execution risk
- 📦 **Dependency Updates** - Updated balanced-match, brace-expansion, and minimatch to latest versions
- 🔧 **Package Configuration** - Marked dependencies as peer in package-lock.json

## 🔒 Security Fixes

### Shell Execution Vulnerability Removed

- Eliminated direct system shell access that could potentially be exploited for arbitrary code execution
- Strengthened input handling and command processing
- Follows security best practices for MCP server implementations

## 📦 Dependency Updates

| Package           | Description               |
|-------------------|---------------------------|
| `balanced-match`  | Updated to latest version |
| `brace-expansion` | Updated to latest version |
| `minimatch`       | Updated to latest version |

### Package Configuration

- Dependencies marked as peer in package-lock.json for improved dependency management

## 🚀 Upgrade

```bash
# Update to latest version
npm install -g @h2nguyen/arc42-node-mcp-server@2.1.1

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
