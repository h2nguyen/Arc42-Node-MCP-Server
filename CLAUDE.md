# CLAUDE.md

## Project

Arc42 Node MCP Server — an MCP server providing AI-assisted architecture documentation following the arc42 template. Supports 11 languages and 2 output formats (AsciiDoc default, Markdown).

## Commands

```bash
npm run build          # Clean, compile TypeScript, chmod +x entry point
npm test               # Run tests (Vitest)
npm run test:coverage  # Tests with V8 coverage (80/75/90/80 thresholds)
npm run dev            # Run via tsx (dev mode)
```

## Code Conventions

- **ESM only** — all imports use `.js` extensions (e.g., `import { foo } from './bar.js'`)
- **TypeScript strict mode** — `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`
- **Naming** — PascalCase classes, camelCase functions/variables, SCREAMING_SNAKE_CASE constants
- **Type imports** — use `import type { T }` for type-only imports
- **Tool modules** export three things: `Handler`, `InputSchema` (Zod), `Description`
- **Schemas** — define with Zod in tool files, re-export from `src/tools/index.ts`

## Architecture

- **Strategy + Registry + Factory** patterns for formats (`src/templates/formats/`) and languages (`src/templates/locales/`)
- Tools live in `src/tools/`, each self-contained with handler, schema, and description
- Server entry: `src/server.ts` (Arc42MCPServer class using `@modelcontextprotocol/sdk`)
- Templates organized by locale with format-specific plugins per language
- See `docs/arc42-docs/` for architecture docs and ADRs explaining design decisions

## Testing

- Tests colocated in `src/__tests__/` mirroring source structure
- Use temp directories for filesystem isolation — see `src/__tests__/fixtures/test-helpers.ts`
- Helpers: `createTestContext()`, `createTempDir()`, `createInitializedWorkspace()`, `isSuccessResponse()`, `isErrorResponse()`
- Test files: `*.test.ts`

## Key Constraints

- Node >= 24.0.0 (CI tests on 22 and 24)
- Target: ES2022, module resolution: Node16
- Do not modify `vendor/arc42-template/` (git submodule)
