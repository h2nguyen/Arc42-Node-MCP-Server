# Contributing to Arc42 Node MCP Server

Thank you for your interest in contributing to the Arc42 Node MCP Server! This project serves the global software architecture community, and we welcome contributions from developers worldwide.

## Code of Conduct

This project follows a code of conduct that all contributors are expected to adhere to. Please be respectful, inclusive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

- Check if the bug has already been reported in [Issues](https://github.com/h2nguyen/Arc42-Node-MCP-Server/issues)
- If not, create a new issue with a clear title and description
- Include steps to reproduce, expected behavior, and actual behavior
- Add relevant logs, screenshots, or code snippets

### Suggesting Enhancements

- Check existing [Issues](https://github.com/h2nguyen/Arc42-Node-MCP-Server/issues) for similar suggestions
- Create a new issue describing the enhancement
- Explain why this enhancement would be useful
- Provide examples of how it would work

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Set up development environment**:
   ```bash
   git clone https://github.com/<your-username>/Arc42-Node-MCP-Server.git
   cd Arc42-Node-MCP-Server
   npm install
   ```

3. **Make your changes**:
   - Write clear, documented code
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Test your changes**:
   ```bash
   npm test
   npm run build
   npm run dev /path/to/test/project
   ```

5. **Commit your changes**:
   - Use clear, descriptive commit messages
   - Follow conventional commits format: `feat:`, `fix:`, `docs:`, etc.
   - Reference issue numbers when applicable

6. **Push and create PR**:
   - Push your branch to your fork
   - Create a Pull Request with a clear description
   - Link-related issues
   - Wait for review

## Development Guidelines

### Project Structure

```
Arc42-Node-MCP-Server/
├── src/
│   ├── types.ts              # Core type definitions
│   ├── server.ts             # MCP server implementation
│   ├── index.ts              # Entry point
│   ├── tools/                # MCP tools
│   │   ├── index.ts          # Tool registry
│   │   ├── arc42-workflow-guide.ts
│   │   ├── arc42-init.ts
│   │   ├── arc42-status.ts
│   │   ├── get-section.ts
│   │   ├── update-section.ts
│   │   └── generate-template.ts
│   ├── templates/            # arc42 section templates
│   │   ├── index.ts
│   │   └── arc42-reference.ts
│   └── __tests__/            # Test files
│       ├── types.test.ts
│       ├── fixtures/
│       │   └── test-helpers.ts
│       ├── templates/
│       │   ├── arc42-reference.test.ts
│       │   └── index.test.ts
│       └── tools/
│           ├── arc42-init.test.ts
│           ├── arc42-status.test.ts
│           ├── arc42-workflow-guide.test.ts
│           ├── generate-template.test.ts
│           ├── get-section.test.ts
│           └── update-section.test.ts
├── docs/                     # Documentation
├── scripts/                  # Utility scripts
├── release_notes/            # Release notes
├── .github/workflows/        # CI/CD configuration
├── package.json
├── tsconfig.json
├── vitest.config.ts          # Test configuration
├── Dockerfile                # Container build
├── docker-compose.yml        # Container orchestration
├── CHANGELOG.md
├── LICENSE                   # Apache 2.0 License
├── LICENSE-ARC42             # arc42 CC BY-SA 4.0 License
├── NOTICE                    # Third-party notices
└── README.md
```

### Code Style

- Use TypeScript with strict mode
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Use async/await for asynchronous code
- Handle errors gracefully

### Adding a New Tool

1. Create a new file in `src/tools/` (e.g., `my-tool.ts`)
2. Define the tool schema and handler:
   ```typescript
   import { Tool } from '@modelcontextprotocol/sdk/types.js';
   import { ToolContext, ToolResponse } from '../types.js';

   export const myTool: Tool = {
     name: 'my-tool',
     description: 'Description of what this tool does',
     inputSchema: {
       type: 'object',
       properties: {
         param: { type: 'string', description: 'Parameter description' }
       },
       required: ['param']
     }
   };

   export async function myToolHandler(
     args: any,
     context: ToolContext
   ): Promise<ToolResponse> {
     // Implementation
     return {
       success: true,
       message: 'Success message',
       data: {},
       nextSteps: []
     };
   }
   ```

3. Register in `src/tools/index.ts`
4. Add tests in `src/__tests__/tools/`
5. Update documentation

### Adding a New Template

1. Add template function in `src/templates/index.ts`
2. Follow arc42 structure and guidelines
3. Include helpful comments and examples
4. Test with `generate-template` tool

### Testing

- Write unit tests for new functionality
- Run tests with `npm test` or `npm run test:watch`
- Check coverage with `npm run test:coverage`
- Test with real MCP clients (Claude, Cursor)
- Verify documentation is generated correctly
- Check error handling

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for code
- Update CHANGELOG.md
- Include examples for new features

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md with changes
3. Create a git tag: `git tag v1.x.x`
4. Push tag: `git push origin v1.x.x`
5. Create GitHub release
6. Publish to npm (maintainers only)

## Questions?

- Open an issue for questions
- Start a discussion in GitHub Discussions
- Check arc42 documentation: https://docs.arc42.org/

## License

By contributing, you agree that your contributions will be licensed as follows:
- **Software Code**: Apache License 2.0
- **arc42 Template Content**: Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0)

See [NOTICE](NOTICE) and [LICENSE-ARC42](LICENSE-ARC42) for more details on third-party content.

## Acknowledgments

Thank you for contributing to the Arc42 Node MCP Server and supporting the global software architecture community!
