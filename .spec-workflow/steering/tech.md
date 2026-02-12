# Technology Stack

## Project Type
MCP Server (Model Context Protocol) - A Node.js CLI tool that implements the MCP specification to enable AI assistants to create and manage arc42 architecture documentation.

## Core Technologies

### Primary Language(s)
- **Language**: TypeScript 5.7
- **Runtime**: Node.js >= 24.0.0
- **Module System**: ES Modules (ESM) with Node16 module resolution
- **Build Target**: ES2022

### Key Dependencies/Libraries

#### Runtime Dependencies
- **@modelcontextprotocol/sdk ^1.24.3**: Official MCP SDK for building MCP servers, provides server implementation, transport protocols, and type definitions
- **zod ^3.25.36**: Runtime schema validation for tool input parameters
- **gray-matter ^4.0.3**: YAML front matter parsing for Markdown files
- **yaml ^2.3.4**: YAML configuration file parsing and serialization
- **chokidar ^3.5.3**: File system watcher (for potential future live-reload features)

#### Development Dependencies
- **typescript ^5.7.2**: TypeScript compiler
- **tsx ^4.7.0**: TypeScript execution for development and scripts
- **vitest ^4.0.15**: Test framework (Vite-based)
- **@vitest/coverage-v8 ^4.0.15**: Code coverage via V8
- **rimraf ^6.0.1**: Cross-platform file deletion

### Application Architecture
The project follows a **tool-based plugin architecture** where each MCP tool is implemented as a separate handler module. The main components are:

1. **MCP Server (Arc42MCPServer class)**: Central coordinator that:
   - Registers tools with the MCP SDK
   - Manages stdio transport for communication with AI clients
   - Handles lifecycle (initialization, graceful shutdown)

2. **Tool Handlers**: Individual modules for each arc42 operation:
   - `arc42-workflow-guide`: Documentation workflow guidance
   - `arc42-init`: Workspace initialization
   - `arc42-status`: Progress tracking
   - `generate-template`: Section template generation
   - `update-section`: Content updates
   - `get-section`: Content retrieval

3. **Templates**: Static arc42 templates stored as TypeScript modules with reference content

4. **Types System**: Centralized type definitions for arc42 sections, responses, and contexts

### Data Storage
- **Primary storage**: File system (Markdown files)
- **Configuration**: YAML files (`config.yaml`)
- **Data formats**: 
  - Markdown for documentation content
  - JSON for MCP protocol messages
  - YAML for configuration and front matter

### External Integrations
- **Protocols**: MCP (Model Context Protocol) over STDIO
- **Client Communication**: JSON-RPC 2.0 via stdio streams
- **No authentication required**: Runs locally, trusts the host environment

## Development Environment

### Build & Development Tools
- **Build System**: npm scripts + TypeScript compiler
- **Package Management**: npm with package-lock.json
- **Key Commands**:
  - `npm run build`: Clean build with TypeScript compilation
  - `npm run dev`: Development mode with tsx
  - `npm test`: Run test suite
  - `npm run test:coverage`: Coverage report

### Code Quality Tools
- **Type Checking**: TypeScript strict mode with comprehensive checks:
  - `strict: true`
  - `noUnusedLocals`, `noUnusedParameters`
  - `noImplicitReturns`, `noFallthroughCasesInSwitch`
- **Testing Framework**: Vitest with V8 coverage
- **Coverage Thresholds**:
  - Statements: 70%
  - Branches: 60%
  - Functions: 70%
  - Lines: 70%

### Version Control & Collaboration
- **VCS**: Git with GitHub
- **Submodules**: arc42 template from official repository (`vendor/arc42-template`)
- **Branching Strategy**: GitHub Flow (main + feature branches)
- **CI/CD**: GitHub Actions for lint, test, and Docker builds

## Deployment & Distribution

### Target Platform(s)
- **Primary**: Local development environments
- **Supported OS**: macOS, Linux, Windows
- **Runs with**: Claude Desktop, Cursor, Cline, and other MCP-compatible tools

### Distribution Method
- **NPM Package**: `@h2nguyen/arc42-node-mcp-server`
- **NPX Support**: `npx -y @h2nguyen/arc42-node-mcp-server`
- **Docker**: Available via Dockerfile and docker-compose

### Installation Requirements
- Node.js >= 24.0.0
- npm for package management
- MCP-compatible AI client (Claude, Cursor, Cline)

### Update Mechanism
- npm package versioning with semver
- GitHub Releases for release notes

## Technical Requirements & Constraints

### Performance Requirements
- Fast tool response times (< 1 second for all operations)
- Minimal memory footprint for long-running MCP sessions
- Efficient file system operations for documentation management

### Compatibility Requirements
- **Platform Support**: Cross-platform (macOS, Linux, Windows)
- **Node.js**: >= 24.0.0 (using modern ESM features)
- **MCP Protocol**: Compatible with MCP SDK 1.24+

### Security & Compliance
- Runs locally with user file system permissions
- No network requests or external data transmission
- Documentation stored in plain text (auditable, versionable)

## Technical Decisions & Rationale

### Decision Log

1. **TypeScript over JavaScript**: Chosen for type safety, better IDE support, and maintainability in a tool that generates structured content
   
2. **ES Modules over CommonJS**: Modern module system aligns with Node.js direction, enables better tree-shaking and static analysis

3. **Zod for Schema Validation**: Provides runtime validation with TypeScript type inference, ensuring tool inputs match expected schemas

4. **File-based Documentation**: Markdown files enable version control, diff-friendly content, and platform independence vs database storage

5. **STDIO Transport**: Standard MCP transport mechanism, enables simple integration with any MCP client without networking complexity

6. **Vitest over Jest**: Faster execution, native ESM support, simpler configuration for TypeScript projects

## Known Limitations

- **Node.js 24+ requirement**: Limits usage to environments with latest Node.js (needed for native ESM features)
- **Single-user design**: No built-in multi-user collaboration or conflict resolution
- **No diagram rendering**: Mermaid/PlantUML diagrams stored as text, rendering left to documentation viewers
- **English-only templates**: Arc42 templates currently only in English (multi-language is a future enhancement)
