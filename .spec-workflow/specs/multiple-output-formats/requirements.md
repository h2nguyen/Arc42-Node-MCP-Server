# Requirements Document: Multiple Output Formats

## Introduction

The Multiple Output Formats feature enables the Arc42 Node MCP Server to generate architecture documentation in different file formats beyond the current Markdown support. This feature specifically introduces AsciiDoc format support while establishing an extensible architecture that allows adding additional formats (such as reStructuredText, HTML, or custom formats) in the future.

The core value is flexibility: while Markdown is excellent for GitHub and many modern tools, some organizations and documentation platforms prefer or require AsciiDoc (especially in Java/enterprise ecosystems where tools like Asciidoctor are prevalent). This feature makes arc42 documentation accessible to a broader range of teams and toolchains.

## Alignment with Product Vision

This feature directly supports multiple product principles from product.md:

1. **AI-First Design**: All format strategies will provide structured outputs optimized for AI assistant usage with consistent interfaces
2. **Standards Compliance**: Both Markdown and AsciiDoc will faithfully implement the arc42 template structure
3. **Minimal Friction**: Format selection will be seamless via configuration or tool parameters
4. **Progressive Documentation**: Users can switch formats without losing content or starting over

This feature is explicitly listed in the "Future Vision > Potential Enhancements" section of product.md:
> "Multiple Output Formats: Support for different documentation file formats (Markdown, AsciiDoc) with potential for additional formats in the future"

## Requirements

### Requirement 1: Output Format Strategy Architecture

**User Story:** As a developer maintaining the arc42 MCP server, I want a pluggable format architecture using the Strategy pattern, so that new formats can be added without modifying existing code (Open/Closed Principle).

#### Acceptance Criteria

1. WHEN the system is designed THEN it SHALL define an `OutputFormatStrategy` interface with methods for generating formatted content
2. WHEN a new format is added THEN the system SHALL NOT require modifications to existing format implementations
3. WHEN a format strategy is implemented THEN it SHALL provide methods for:
   - Converting plain text to formatted equivalents (headings, lists, code blocks, etc.)
   - Generating section files with proper formatting
   - Generating README files with proper formatting
4. IF a format strategy is registered THEN it SHALL be discoverable through an `OutputFormatRegistry`
5. WHEN format strategies are created THEN an `OutputFormatFactory` SHALL instantiate them with fallback to AsciiDoc for unknown formats

### Requirement 2: Output Format Registry and Factory

**User Story:** As a developer, I want centralized format management through Registry and Factory patterns, so that format lookup and creation follows the same proven pattern as the multi-language feature.

#### Acceptance Criteria

1. WHEN the system initializes THEN it SHALL create an `OutputFormatRegistry` to store all available format strategies
2. WHEN a format is requested THEN the `OutputFormatFactory` SHALL normalize the format code (e.g., "markdown", "MARKDOWN", "md" → "markdown")
3. IF an unknown format is requested THEN the factory SHALL fall back to AsciiDoc with a warning
4. WHEN formats are registered THEN the registry SHALL support case-insensitive lookup
5. WHEN querying available formats THEN the system SHALL return all registered format codes and their display names

### Requirement 3: Markdown Format Strategy

**User Story:** As a user who prefers Markdown format, I want to be able to explicitly select Markdown format for my documentation, so that I can use it when needed.

#### Acceptance Criteria

1. WHEN the Markdown strategy is used THEN it SHALL produce identical output to the current implementation
2. WHEN generating section files THEN the Markdown strategy SHALL use `#` for headings, backticks for code blocks, and `-` for lists
3. WHEN generating README files THEN the Markdown strategy SHALL create `.md` files
4. WHEN file extensions are requested THEN the Markdown strategy SHALL return `.md`
5. IF Markdown format is explicitly specified THEN the Markdown strategy SHALL be used

### Requirement 4: AsciiDoc Format Strategy

**User Story:** As a technical writer using AsciiDoc-based documentation platforms, I want arc42 documentation generated in AsciiDoc format, so that it integrates seamlessly with our existing documentation toolchain.

#### Acceptance Criteria

1. WHEN the AsciiDoc strategy is used THEN it SHALL generate valid AsciiDoc syntax
2. WHEN generating headings THEN the AsciiDoc strategy SHALL use `=` prefix notation (e.g., `= Title`, `== Section`, `=== Subsection`)
3. WHEN generating code blocks THEN the AsciiDoc strategy SHALL use `[source,language]` with `----` delimiters
4. WHEN generating lists THEN the AsciiDoc strategy SHALL use `*` for unordered lists and `.` for ordered lists
5. WHEN generating file extensions THEN the AsciiDoc strategy SHALL return `.adoc`
6. WHEN generating bold text THEN the AsciiDoc strategy SHALL use `*bold*` syntax
7. WHEN generating italic text THEN the AsciiDoc strategy SHALL use `_italic_` syntax
8. WHEN generating section anchors THEN the AsciiDoc strategy SHALL use `[[anchor-name]]` syntax
9. WHEN generating README files THEN the AsciiDoc strategy SHALL create `README.adoc` files
10. IF no format is specified THEN AsciiDoc SHALL be the default format

### Requirement 5: Format Configuration

**User Story:** As a user initializing arc42 documentation, I want to specify my preferred output format, so that all generated files use my chosen format consistently.

#### Acceptance Criteria

1. WHEN running `arc42-init` THEN the tool SHALL accept an optional `format` parameter
2. WHEN a format is specified in `arc42-init` THEN it SHALL be written to `config.yaml`
3. WHEN reading config.yaml THEN the system SHALL read the `format` field (defaulting to "asciidoc" if not present)
4. WHEN generating templates THEN the system SHALL use the format from config.yaml or fall back to AsciiDoc
5. IF an unsupported format is in config.yaml THEN the system SHALL warn and fall back to AsciiDoc

### Requirement 6: Tool Integration

**User Story:** As an AI assistant using the arc42 MCP tools, I want all existing tools to respect the configured format, so that documentation remains consistent throughout the project lifecycle.

#### Acceptance Criteria

1. WHEN `arc42-init` runs THEN it SHALL create section files and README in the configured format
2. WHEN `generate-template` runs THEN it SHALL generate templates in the configured format
3. WHEN `update-section` runs THEN it SHALL maintain the existing file format (based on file extension)
4. WHEN `get-section` runs THEN it SHALL read files regardless of format
5. WHEN `arc42-status` runs THEN it SHALL detect completion status for all format extensions (`.md`, `.adoc`)

### Requirement 7: Format Detection and Compatibility

**User Story:** As a user working with existing documentation projects, I want the system to detect and work with different file formats, so that I can seamlessly work with both Markdown and AsciiDoc projects.

#### Acceptance Criteria

1. WHEN existing Markdown projects are used THEN they SHALL continue to work by detecting `.md` file extensions
2. WHEN existing AsciiDoc projects are used THEN they SHALL work by detecting `.adoc` file extensions
3. WHEN creating new projects without format specification THEN the system SHALL default to AsciiDoc format
4. WHEN the multi-language feature is used THEN it SHALL work with any output format
5. WHEN tools detect existing files THEN they SHALL respect the existing format based on file extensions

## Non-Functional Requirements

### Code Architecture and Modularity

- **Strategy Pattern**: Output format strategies SHALL follow the Strategy pattern, similar to the existing `LanguageStrategy` implementation
- **Single Responsibility Principle**: Each output format strategy SHALL only handle format-specific syntax generation
- **Open/Closed Principle**: New formats SHALL be addable without modifying existing format implementations
- **Registry Pattern**: Format discovery SHALL use a centralized registry (`OutputFormatRegistry`), matching the `LanguageRegistry` pattern
- **Factory Pattern**: Format instantiation SHALL use a factory (`OutputFormatFactory`) with normalization and fallback logic
- **Dependency Inversion**: Tools SHALL depend on the `OutputFormatStrategy` interface, not concrete implementations
- **DRY Principle**: Format constants and common logic SHALL be defined once and reused
- **Interface Segregation**: Output format strategies SHALL implement a focused interface with only necessary methods

### Performance

- Format strategy creation SHALL have O(1) lookup time through registry Map storage
- Format conversion SHALL not significantly impact tool response times (< 50ms overhead)
- Registry SHALL be initialized once at server startup, not per-request

### Security

- Format strategies SHALL NOT execute arbitrary code during content generation
- File extensions SHALL be validated to prevent path traversal attacks
- Format codes SHALL be validated against a whitelist before use

### Reliability

- IF a format strategy fails THEN the system SHALL fall back to AsciiDoc gracefully
- Format strategies SHALL be unit tested with >90% coverage
- Invalid format configurations SHALL produce clear error messages
- Existing Markdown and new AsciiDoc projects SHALL both function correctly (format compatibility)

### Usability

- Format names SHALL be intuitive and follow common conventions ("markdown", "asciidoc")
- Format selection SHALL support common aliases (e.g., "md" → "markdown", "adoc" → "asciidoc")
- Error messages SHALL suggest available formats when an unknown format is requested
- Documentation SHALL explain how to add new formats in the future

### Testability

- Each format strategy SHALL have dedicated unit tests covering all syntax conversions
- Integration tests SHALL verify format strategies work with all tools
- Test coverage SHALL meet project standards (statements: 80%, functions: 90%)
- Mock format strategies SHALL be available for testing tools without file I/O
