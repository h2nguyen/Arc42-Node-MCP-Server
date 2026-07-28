# 🤝 Arc42 Node MCP Server v2.3.0 - Seamless Skill & Server Alignment

**Minor Feature Release**

This release makes the MCP server and the bundled Claude skill work seamlessly together for AI agents: format aliases are now accepted everywhere as documented, tool descriptions are optimized for LLM tool selection, error messages guide agents to recovery, and a new protocol-level contract test keeps skill and server from drifting apart again.

## ✨ Highlights

- 🔤 **Format Aliases Everywhere** - `md`/`adoc` now accepted by all format-bearing tools, not just `arc42-init`
- 🤖 **LLM-Optimized Tool Descriptions** - All 6 tools now state when to use them, when not to, and warn before destructive operations
- 🧭 **Agent-Actionable Errors** - Every error message tells the agent the concrete next step
- 🧪 **MCP Protocol Contract Test** - 16 integration tests drive the built server over real stdio JSON-RPC, verifying the skill-documented workflows end-to-end
- 📌 **Skill Version Pinning** - The Claude skill (v2.1.0) now declares its compatible server version

## 🔤 Format Aliases

`arc42-workflow-guide` and `generate-template` previously rejected the `md`/`adoc` aliases that the documentation promised — only `arc42-init` accepted them. All three tools now share a single `FORMAT_INPUT_VALUES` constant and normalize aliases in their handlers:

```
arc42-workflow-guide { format: "md" }    → markdown guide
generate-template    { format: "adoc" }  → AsciiDoc template
```

Schema defaults are now also declared in the tool JSON schema, so MCP clients see them directly:

| Tool                   | Parameter | Declared Default |
|------------------------|-----------|------------------|
| `update-section`       | `mode`    | `"replace"`      |
| `arc42-workflow-guide` | `format`  | `"asciidoc"`     |

## 🤖 Tool Descriptions for AI Agents

All 6 tool descriptions were rewritten for reliable tool selection by LLM clients:

- **When to use / when NOT to use** guidance and workflow ordering on every tool
- **Read-only markers** on tools that never touch files (`arc42-workflow-guide`, `generate-template`, `arc42-status`, `get-section`)
- **Destructive-operation warnings**: `arc42-init` with `force: true` and `update-section` in `replace` mode now clearly warn that existing content is overwritten, with `append` recommended for ADRs

## 🧭 Agent-Actionable Error Messages

| Situation                        | The error now says                                                              |
|----------------------------------|---------------------------------------------------------------------------------|
| Re-init on an existing workspace | Check `arc42-status`, write with `update-section`; warns `force` OVERWRITES     |
| Workspace not initialized        | Run `arc42-init` first                                                          |
| Section file missing             | Names both expected filenames and suggests `arc42-status` / `update-section`    |

## 🏗️ Internal Improvements

- **Single tool registry**: `TOOL_REGISTRY` in `src/tools/index.ts` is now the one place tools are defined — MCP registration and dispatch both derive from it
- **Consistent word counting**: shared `countWords()` fixes miscounts on empty/padded content
- **Completeness heuristic**: fixed a floating-point error (57 words previously reported as 56%)
- **Path handling**: `resolveWorkspaceRoot` uses `path.join()`

## 🧪 Quality

- New MCP protocol contract test suite (16 tests) spawns `dist/index.js` and verifies the skill's documented workflows over real stdio JSON-RPC; skipped automatically when `dist/` is not built
- 1308 tests passing, coverage 98.77% statements / 91.5% branches / 99.18% functions / 98.76% lines

## 📌 Compatibility

- **No breaking changes** — no tool renames, no removed or retyped parameters; enum changes only widen accepted values
- The bundled Claude skill is now v2.1.0 and pins `@h2nguyen/arc42-node-mcp-server` **>= 2.3.0** (older servers work, but `md`/`adoc` aliases are only accepted by `arc42-init` there)

## 🚀 Upgrade

```bash
# Update to latest version
npm install -g @h2nguyen/arc42-node-mcp-server@2.3.0

# Or update in your project
npm update @h2nguyen/arc42-node-mcp-server
```
