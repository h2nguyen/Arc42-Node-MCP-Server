# 12. Glossary

## Domain Terms

| Term | Definition |
|------|------------|
| **arc42** | A template for architecture communication and documentation, consisting of 12 standardized sections. Created by Dr. Gernot Starke and Dr. Peter Hruschka. |
| **Architecture Documentation** | Systematic description of a software system's structure, behavior, and design decisions to enable understanding and maintenance. |
| **Architecture Decision Record (ADR)** | A document capturing an important architectural decision along with its context and consequences. |
| **Building Block** | A logical or technical component of a system at any level of decomposition. |
| **Quality Attribute** | A measurable or testable property of a system used to indicate how well the system satisfies stakeholder needs. Also called non-functional requirement. |
| **Stakeholder** | Anyone with interest in or affected by the system - users, developers, operators, management, etc. |

## Technical Terms

| Term | Definition |
|------|------------|
| **MCP (Model Context Protocol)** | An open protocol that standardizes how AI assistants connect with external data sources and tools. Enables AI systems to access contextual information safely. |
| **MCP Server** | A program that exposes tools and resources to MCP clients (AI assistants) via the Model Context Protocol. |
| **MCP Client** | An application (like Claude Desktop, Cursor, or Cline) that connects to MCP servers to use their tools and resources. |
| **STDIO Transport** | Communication method using standard input (stdin) and standard output (stdout) for process-to-process messaging. |
| **Tool** | In MCP context, a callable function that an AI assistant can invoke, defined with a schema for inputs and outputs. |
| **Zod** | A TypeScript-first schema declaration and validation library used to define and validate data structures at runtime. |

## Project-Specific Terms

| Term | Definition |
|------|------------|
| **Section** | One of the 12 numbered parts of the arc42 template (e.g., "01_introduction_and_goals"). |
| **Workspace** | The `arc42-docs/` directory created by the server to store architecture documentation files. |
| **ToolContext** | Internal data structure containing project path and workspace root for tool execution. |
| **ToolResponse** | Standardized response format from tool handlers, containing success status, message, and optional data. |
| **targetFolder** | Optional parameter allowing tools to operate on a specific directory instead of the default workspace. |

## Abbreviations

| Abbreviation | Full Form |
|--------------|-----------|
| **ADR** | Architecture Decision Record |
| **API** | Application Programming Interface |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **CLI** | Command Line Interface |
| **ES** | ECMAScript (JavaScript standard) |
| **JSON** | JavaScript Object Notation |
| **JSON-RPC** | JSON Remote Procedure Call |
| **LLM** | Large Language Model |
| **MCP** | Model Context Protocol |
| **npm** | Node Package Manager |
| **SDK** | Software Development Kit |
| **STDIO** | Standard Input/Output |
| **YAML** | YAML Ain't Markup Language |

## Related Projects and Tools

| Name | Description |
|------|-------------|
| **Claude Desktop** | Anthropic's desktop application for Claude AI, supports MCP servers. |
| **Cursor** | AI-powered code editor that supports MCP for tool integration. |
| **Cline** | VS Code extension for AI-assisted development with MCP support. |
| **MCP Inspector** | Web-based tool for testing and debugging MCP servers. |
| **Vitest** | Fast unit testing framework for JavaScript/TypeScript projects. |

## arc42 Section Reference

| Section | Name | Purpose |
|---------|------|---------|
| 01 | Introduction and Goals | Requirements overview, quality goals, stakeholders |
| 02 | Architecture Constraints | Technical and organizational constraints |
| 03 | Context and Scope | Business and technical context |
| 04 | Solution Strategy | Fundamental decisions and strategies |
| 05 | Building Block View | Static decomposition of the system |
| 06 | Runtime View | Dynamic behavior and scenarios |
| 07 | Deployment View | Infrastructure and deployment |
| 08 | Cross-cutting Concepts | Overall regulations and approaches |
| 09 | Architecture Decisions | Important decisions (ADRs) |
| 10 | Quality Requirements | Quality tree and scenarios |
| 11 | Risks and Technical Debt | Known problems and risks |
| 12 | Glossary | Important domain and technical terms |
