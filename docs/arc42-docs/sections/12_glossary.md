# 12. Glossary

## Domain Terms

| Term                                   | Definition                                                                                                                                                |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **arc42**                              | A template for architecture communication and documentation, consisting of 12 standardized sections. Created by Dr. Gernot Starke and Dr. Peter Hruschka. |
| **Architecture Documentation**         | Systematic description of a software system's structure, behavior, and design decisions to enable understanding and maintenance.                          |
| **Architecture Decision Record (ADR)** | A document capturing an important architectural decision along with its context and consequences.                                                         |
| **Building Block**                     | A logical or technical component of a system at any level of decomposition.                                                                               |
| **Quality Attribute**                  | A measurable or testable property of a system used to indicate how well the system satisfies stakeholder needs. Also called non-functional requirement.   |
| **Stakeholder**                        | Anyone with interest in or affected by the system - users, developers, operators, management, etc.                                                        |

## Technical Terms

| Term                             | Definition                                                                                                                                                     |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **MCP (Model Context Protocol)** | An open protocol that standardizes how AI assistants connect with external data sources and tools. Enables AI systems to access contextual information safely. |
| **MCP Server**                   | A program that exposes tools and resources to MCP clients (AI assistants) via the Model Context Protocol.                                                      |
| **MCP Client**                   | An application (like Claude Desktop, Cursor, or Cline) that connects to MCP servers to use their tools and resources.                                          |
| **STDIO Transport**              | Communication method using standard input (stdin) and standard output (stdout) for process-to-process messaging.                                               |
| **Tool**                         | In MCP context, a callable function that an AI assistant can invoke, defined with a schema for inputs and outputs.                                             |
| **Zod**                          | A TypeScript-first schema declaration and validation library used to define and validate data structures at runtime.                                           |

## Internationalization Terms

| Term                            | Definition                                                                                                                                      |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Language Strategy**           | A design pattern implementation that encapsulates all localized content for a specific language, implementing the `LanguageStrategy` interface. |
| **Language Registry**           | A central storage (using Registry Pattern) that holds all registered language strategies for O(1) lookup by language code.                      |
| **Language Factory**            | A factory class that creates language strategy instances with code normalization and fallback support.                                          |
| **Language Code**               | A standardized identifier for a language (e.g., EN, DE, FR). In this project, uses uppercase 2-3 letter codes.                                  |
| **Localized Template Provider** | A facade class that provides simplified access to localized templates, hiding the complexity of language selection.                             |
| **Fallback Language**           | The default language (English) used when a requested language is not available or invalid.                                                      |
| **Native Name**                 | The name of a language in its own language (e.g., "Deutsch" for German, "中文" for Chinese).                                                      |
| **i18n**                        | Abbreviation for "internationalization" - the process of designing software so it can be adapted to various languages.                          |
| **L10n**                        | Abbreviation for "localization" - the process of adapting software for a specific language or region.                                           |

## Project-Specific Terms

| Term             | Definition                                                                                                        |
|------------------|-------------------------------------------------------------------------------------------------------------------|
| **Section**      | One of the 12 numbered parts of the arc42 template (e.g., "01_introduction_and_goals").                           |
| **Workspace**    | The `arc42-docs/` directory created by the server to store architecture documentation files.                      |
| **ToolContext**  | Internal data structure containing project path and workspace root for tool execution.                            |
| **ToolResponse** | Standardized response format from tool handlers, containing success status, message, and optional data.           |
| **targetFolder** | Optional parameter allowing tools to operate on a specific directory instead of the default workspace.            |
| **config.yaml**  | YAML configuration file storing project metadata including name, version, language, and arc42 template reference. |

## Abbreviations

| Abbreviation | Full Form                                      |
|--------------|------------------------------------------------|
| **ADR**      | Architecture Decision Record                   |
| **API**      | Application Programming Interface              |
| **CI/CD**    | Continuous Integration / Continuous Deployment |
| **CLI**      | Command Line Interface                         |
| **DIP**      | Dependency Inversion Principle                 |
| **ES**       | ECMAScript (JavaScript standard)               |
| **i18n**     | Internationalization                           |
| **ISP**      | Interface Segregation Principle                |
| **JSON**     | JavaScript Object Notation                     |
| **JSON-RPC** | JSON Remote Procedure Call                     |
| **L10n**     | Localization                                   |
| **LLM**      | Large Language Model                           |
| **LSP**      | Liskov Substitution Principle                  |
| **MCP**      | Model Context Protocol                         |
| **npm**      | Node Package Manager                           |
| **OCP**      | Open/Closed Principle                          |
| **SDK**      | Software Development Kit                       |
| **SRP**      | Single Responsibility Principle                |
| **STDIO**    | Standard Input/Output                          |
| **TDD**      | Test-Driven Development                        |
| **YAML**     | YAML Ain't Markup Language                     |

## Supported Language Codes

| Code    | Language   | Native Name |
|---------|------------|-------------|
| **EN**  | English    | English     |
| **DE**  | German     | Deutsch     |
| **ES**  | Spanish    | Español     |
| **FR**  | French     | Français    |
| **IT**  | Italian    | Italiano    |
| **NL**  | Dutch      | Nederlands  |
| **PT**  | Portuguese | Português   |
| **RU**  | Russian    | Русский     |
| **CZ**  | Czech      | Čeština     |
| **UKR** | Ukrainian  | Українська  |
| **ZH**  | Chinese    | 中文          |

## Related Projects and Tools

| Name               | Description                                                          |
|--------------------|----------------------------------------------------------------------|
| **Claude Desktop** | Anthropic's desktop application for Claude AI, supports MCP servers. |
| **Cursor**         | AI-powered code editor that supports MCP for tool integration.       |
| **Cline**          | VS Code extension for AI-assisted development with MCP support.      |
| **MCP Inspector**  | Web-based tool for testing and debugging MCP servers.                |
| **Vitest**         | Fast unit testing framework for JavaScript/TypeScript projects.      |

## arc42 Section Reference

| Section | Name                     | Purpose                                            |
|---------|--------------------------|----------------------------------------------------|
| 01      | Introduction and Goals   | Requirements overview, quality goals, stakeholders |
| 02      | Architecture Constraints | Technical and organizational constraints           |
| 03      | Context and Scope        | Business and technical context                     |
| 04      | Solution Strategy        | Fundamental decisions and strategies               |
| 05      | Building Block View      | Static decomposition of the system                 |
| 06      | Runtime View             | Dynamic behavior and scenarios                     |
| 07      | Deployment View          | Infrastructure and deployment                      |
| 08      | Cross-cutting Concepts   | Overall regulations and approaches                 |
| 09      | Architecture Decisions   | Important decisions (ADRs)                         |
| 10      | Quality Requirements     | Quality tree and scenarios                         |
| 11      | Risks and Technical Debt | Known problems and risks                           |
| 12      | Glossary                 | Important domain and technical terms               |
