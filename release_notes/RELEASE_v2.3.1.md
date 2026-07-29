# 🔒 Arc42 Node MCP Server v2.3.1 - Dependency Security Patch

**Maintenance Patch Release**

This release contains no source or API changes. It refreshes the dependency lockfile to clear all high and moderate severity advisories in the transitive dependency tree.

## ✨ Highlights

- 🛡️ **High-severity `js-yaml` DoS resolved** — `js-yaml` 3.14.2 → 3.15.0 in the `gray-matter` tree
- 🛡️ **Moderate path-traversal in `@hono/node-server` resolved** — 1.19.14 → 2.0.12 in the MCP SDK tree
- 📦 **Grouped dependency bump** — 10 packages updated via the `npm_and_yarn` group
- ✅ **No behavior change** — all 1308 tests pass unchanged

## 🛡️ Security

### Advisories resolved

| Package             | From     | To       | Advisory                                                                 | Severity |
|---------------------|----------|----------|--------------------------------------------------------------------------|----------|
| `js-yaml`           | 3.14.2   | 3.15.0   | GHSA-h67p-54hq-rp68 / GHSA-52cp-r559-cp3m — quadratic-complexity DoS via YAML merge keys | High     |
| `@hono/node-server` | 1.19.14  | 2.0.12   | GHSA-frvp-7c67-39w9 — `serve-static` path traversal on Windows via encoded backslash (`%5C`) | Moderate |

Both are transitive dependencies (`gray-matter` and `@modelcontextprotocol/sdk` respectively) — no direct dependency ranges changed.

### Grouped dependency bump

| Package             | From    | To      |
|---------------------|---------|---------|
| `vitest`            | 4.0.18  | 4.1.10  |
| `vite`              | 7.3.3   | 8.1.5   |
| `hono`              | 4.12.18 | 4.12.32 |
| `@hono/node-server` | 1.19.14 | 2.0.12  |
| `body-parser`       | 2.2.2   | 2.3.0   |
| `qs`                | 6.14.2  | 6.15.3  |
| `postcss`           | 8.5.14  | 8.5.24  |
| `esbuild`           | 0.27.3  | 0.27.7  |
| `brace-expansion`   | 5.0.3   | 5.0.8   |
| `fast-uri`          | 3.1.2   | 3.1.4   |

### Known remaining advisory

One low-severity advisory remains and is intentionally not fixed in this release:

- `esbuild` < 0.28.1 (GHSA-g7r4-m6w7-qqqr) — arbitrary file read via the esbuild **development server on Windows**. It reaches the tree only as a dev dependency of `tsx` and `vite`, is never used at runtime by the MCP server, and clearing it requires a breaking upgrade of those toolchain packages. It will be picked up with the next toolchain update.

## 🚀 Upgrade

```bash
# Update to latest version
npm install -g @h2nguyen/arc42-node-mcp-server@2.3.1

# Or update in your project
npm update @h2nguyen/arc42-node-mcp-server
```

No configuration or client changes are required when upgrading from 2.3.0.

## 🔗 Compatibility

- **Node.js**: 24.0.0 or higher
- **MCP SDK**: 1.30.0
- **arc42 Template**: 9.0-EN (July 2025)
- **Claude Skill**: v2.1.0 (unchanged, compatible with >= 2.3.0)

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
