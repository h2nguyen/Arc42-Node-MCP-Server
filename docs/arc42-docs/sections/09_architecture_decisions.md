# 9. Architecture Decisions

## ADR-001: Use Model Context Protocol (MCP)

**Status:** Accepted

**Context:**
We need to enable AI assistants to create and manage arc42 documentation. Several approaches exist:
- Custom API integration with each AI provider
- Language Server Protocol (LSP)
- Model Context Protocol (MCP)
- CLI-based interaction

**Decision:**
Use Model Context Protocol (MCP) as the integration mechanism.

**Rationale:**
- MCP is specifically designed for AI tool integration
- Supported by major AI assistants (Claude, Cursor, Cline)
- Provides standardized tool definitions with schemas
- STDIO transport is simple and universal
- Growing ecosystem and community support

**Consequences:**
- (+) Single implementation works with multiple AI clients
- (+) Clear contract for tool inputs/outputs via Zod schemas
- (+) Future-proof as MCP adoption grows
- (-) Dependency on MCP SDK updates
- (-) Limited to MCP-compatible clients

---

## ADR-002: TypeScript as Primary Language

**Status:** Accepted

**Context:**
The MCP SDK is available in multiple languages (Python, TypeScript). We need to choose a primary implementation language.

**Decision:**
Use TypeScript with Node.js runtime.

**Rationale:**
- MCP TypeScript SDK is well-maintained
- Type safety reduces runtime errors
- Excellent tooling (IDE support, debugging)
- npm ecosystem for dependencies
- Same language as many AI assistant extensions

**Consequences:**
- (+) Type-safe tool definitions
- (+) Self-documenting code with interfaces
- (+) Rich npm ecosystem
- (-) Requires Node.js 24+ runtime
- (-) Build step required (TypeScript → JavaScript)

---

## ADR-003: File-Based Documentation Storage

**Status:** Accepted

**Context:**
Documentation needs to be stored persistently. Options include:
- Database (SQLite, PostgreSQL)
- File system (Markdown files)
- Cloud storage (S3, etc.)

**Decision:**
Use local file system with Markdown files.

**Rationale:**
- Markdown is universal and human-readable
- Git-friendly for version control
- No database dependencies
- Easy to edit outside the tool
- Follows arc42 convention (template is Markdown/AsciiDoc)

**Consequences:**
- (+) Documentation versioned with source code
- (+) No additional infrastructure required
- (+) Editable with any text editor
- (-) No concurrent edit protection
- (-) Platform-specific path handling needed

---

## ADR-004: Git Submodule for arc42 Template

**Status:** Accepted

**Context:**
We need to reference the official arc42 template for version information and potentially content. Options:
- Hardcode version information
- Copy template files into repository
- Git submodule reference

**Decision:**
Use git submodule pointing to official arc42-template repository.

**Rationale:**
- Maintains link to upstream template
- Version info loaded dynamically at runtime
- Easy to update with `git submodule update`
- Clear attribution to arc42 creators

**Consequences:**
- (+) Always know exact template version
- (+) Easy to update to new template versions
- (+) Clear provenance for license compliance
- (-) Contributors must init submodules
- (-) npm package needs fallback (no submodule)

---

## ADR-005: STDIO Transport Only

**Status:** Accepted

**Context:**
MCP supports multiple transports: STDIO, HTTP/SSE. We need to decide which to support.

**Decision:**
Support only STDIO transport initially.

**Rationale:**
- STDIO is the standard for local tool execution
- All major MCP clients support STDIO
- Simpler implementation and testing
- No network security concerns

**Consequences:**
- (+) Simple, secure local communication
- (+) Works with all current MCP clients
- (-) Cannot run as remote service
- (-) One process per client connection

---

## ADR-006: Zod for Input Validation

**Status:** Accepted

**Context:**
Tool inputs need validation. Options:
- Manual validation
- JSON Schema
- Zod
- io-ts or other TypeScript-first validators

**Decision:**
Use Zod for runtime validation with TypeScript inference.

**Rationale:**
- MCP SDK uses Zod for schema definitions
- TypeScript type inference from schemas
- Excellent error messages
- Composable and chainable API

**Consequences:**
- (+) Single source of truth for types and validation
- (+) Clear error messages for invalid inputs
- (+) IDE autocomplete from schemas
- (-) Runtime dependency
- (-) Learning curve for Zod API

---

## ADR-007: Workspace-Based Documentation Structure

**Status:** Accepted

**Context:**
Need to organize documentation files within user projects. Options:
- Single file with all sections
- Flat directory of files
- Nested directory structure (arc42-docs/)

**Decision:**
Create dedicated `arc42-docs/` workspace directory with sections subdirectory.

**Rationale:**
- Clear separation from source code
- Organized structure matches arc42 template
- Space for images and additional assets
- Config file for metadata

**Consequences:**
- (+) Clean, organized documentation
- (+) Portable across projects
- (+) Easy to gitignore if desired
- (-) Creates multiple directories/files
- (-) Users must understand structure

---

## ADR-008: Optional targetFolder Parameter

**Status:** Accepted

**Context:**
Users may want to document multiple projects or use non-default locations. Options:
- Single fixed workspace per server instance
- Dynamic workspace via parameter
- Both (default with override)

**Decision:**
Support optional `targetFolder` parameter to override default workspace.

**Rationale:**
- Flexibility for multi-project scenarios
- AI agents can dynamically choose targets
- Default path still useful for single-project focus
- No reconfiguration needed for workspace changes

**Consequences:**
- (+) Works with multiple projects
- (+) AI can document any directory
- (+) Backward compatible (optional parameter)
- (-) Must validate paths carefully
- (-) Slight API complexity increase
