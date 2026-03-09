# 📦 Arc42 Node MCP Server v2.2.1 - License & Socket.dev Compliance

**Maintenance Patch Release**

This release resolves Socket.dev alerts by clarifying license metadata and adding a Socket.dev configuration file to suppress expected alerts.

## ✨ Highlights

- 📄 **License Metadata Simplified** - `package.json` now declares `Apache-2.0` as the sole license; CC-BY-SA-4.0 for arc42 template content is documented in `NOTICE` and `LICENSE-ARC42`
- 🔧 **Socket.dev Configuration** - Added `socket.yml` to suppress expected alerts for filesystem access and copyleft license

## 📄 License Metadata

### Simplified SPDX Expression

- Changed `license` field from `(Apache-2.0 AND CC-BY-SA-4.0)` to `Apache-2.0`
- The CC-BY-SA-4.0 applies only to bundled arc42 template content (third-party), not to the server code
- Third-party license attribution remains documented in `NOTICE` and `LICENSE-ARC42`

## 🔧 Socket.dev Configuration

### New `socket.yml`

Added a v2 Socket.dev configuration to suppress two expected alerts:

| Alert             | Reason for Suppression                                                                      |
|-------------------|---------------------------------------------------------------------------------------------|
| `fsAccess`        | Filesystem access is core functionality — the server reads/writes arc42 documentation files |
| `copyleftLicense` | CC-BY-SA-4.0 applies only to bundled arc42 template content, not to the server code         |

## 🚀 Upgrade

```bash
# Update to latest version
npm install -g @h2nguyen/arc42-node-mcp-server@2.2.1

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
