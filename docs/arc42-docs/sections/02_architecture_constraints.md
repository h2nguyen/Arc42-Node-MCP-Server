# 2. Architecture Constraints

## 2.1 Technical Constraints

| Constraint | Description | Rationale |
|------------|-------------|-----------|
| **TC-1: MCP Protocol** | Must implement the Model Context Protocol (MCP) specification | Required for compatibility with AI assistants (Claude Desktop, Cursor, Cline) |
| **TC-2: Node.js Runtime** | Must run on Node.js 24+ | TypeScript support, async/await patterns, npm ecosystem |
| **TC-3: STDIO Transport** | Primary communication via STDIO (stdin/stdout) | Standard MCP transport mechanism for local tool execution |
| **TC-4: TypeScript** | Implementation in TypeScript 5.7+ | Type safety, better IDE support, maintainability |
| **TC-5: Markdown Output** | Documentation output in Markdown format | Universal readability, version control friendly, static site compatible |
| **TC-6: File System Based** | Documentation stored as local files | Simplicity, version control integration, no database dependencies |
| **TC-7: Git Submodule** | arc42 template reference via git submodule | Dynamic versioning, upstream synchronization |

## 2.2 Organizational Constraints

| Constraint | Description | Rationale |
|------------|-------------|-----------|
| **OC-1: Open Source** | Apache 2.0 License | Community contribution, enterprise-friendly licensing |
| **OC-2: arc42 Attribution** | Must attribute arc42 template (CC BY-SA 4.0) | Legal requirement, respect for original creators |
| **OC-3: npm Distribution** | Primary distribution via npm | Standard Node.js package distribution |
| **OC-4: Docker Support** | Must provide Docker containerization | Deployment flexibility, CI/CD integration |
| **OC-5: Test Coverage** | Minimum 70% test coverage | Quality assurance, regression prevention |

## 2.3 Conventions

| Convention | Description |
|------------|-------------|
| **Semantic Versioning** | Version numbers follow SemVer (MAJOR.MINOR.PATCH) |
| **Conventional Commits** | Commit messages follow Conventional Commits specification |
| **ES Modules** | Use ES module syntax (import/export) |
| **Async/Await** | Prefer async/await over callbacks or raw promises |
| **Zod Validation** | Use Zod for runtime type validation of tool inputs |
| **arc42 Structure** | Documentation follows arc42 template 9.0 structure |

## 2.4 Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@modelcontextprotocol/sdk` | ^1.24.3 | MCP server implementation |
| `zod` | ^3.25.36 | Schema validation for tool inputs |
| `yaml` | ^2.3.4 | YAML configuration file handling |
| `gray-matter` | ^4.0.3 | Markdown frontmatter parsing |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5.7.2 | TypeScript compiler |
| `vitest` | ^4.0.15 | Test framework |
| `tsx` | ^4.7.0 | TypeScript execution for development |
| `rimraf` | ^6.0.1 | Cross-platform file deletion |
