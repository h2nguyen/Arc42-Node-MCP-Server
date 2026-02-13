# Requirements Document: Multi-Language Template Support

## Introduction

This feature adds multi-language support to the Arc42 Node MCP Server, enabling users to generate and manage architecture documentation in languages other than English. The implementation will support **all 11 languages** available in the official arc42 template repository, making the tool accessible to a global audience.

This addresses a key limitation in the current system where only English templates are available, making the tool less accessible to non-English speaking teams and organizations that prefer documentation in their native language.

## Alignment with Product Vision

From **product.md**, the key alignments are:

1. **Accessibility Goal**: "Make arc42 methodology accessible to teams who may not have formal architecture training" - Multi-language support extends this accessibility to non-English speakers
2. **Community Goal**: "Build an open-source community around AI-assisted documentation practices" - Supporting multiple languages enables global community participation
3. **Future Vision Enhancement**: "Multi-Language Support" is explicitly listed as a potential enhancement
4. **AI-First Design Principle**: Templates must remain AI-friendly with clear guidance text in each language

## Requirements

### Requirement 1: Language Selection for arc42-init

**User Story:** As a developer, I want to initialize arc42 documentation in my preferred language, so that I can create architecture documentation that my non-English speaking team members can read and contribute to.

#### Acceptance Criteria

1. WHEN arc42-init is called with a `language` parameter THEN the system SHALL create templates in the specified language
2. IF language parameter is "DE" THEN the system SHALL generate German templates with German section titles and guidance text
3. IF language parameter is "ZH" THEN the system SHALL generate Chinese templates with Chinese section titles and guidance text
4. IF language parameter is any of the 11 supported codes (EN, CZ, DE, ES, FR, IT, NL, PT, RU, UKR, ZH) THEN the system SHALL generate templates in that language
5. IF language parameter is not provided THEN the system SHALL default to English ("EN") templates
6. IF language parameter contains an unsupported language code THEN the system SHALL return an error listing all 11 available languages

### Requirement 2: Language-Aware Template Generation

**User Story:** As an AI assistant, I want to generate section templates in the user's preferred language, so that I can provide context-appropriate guidance for documentation in any supported language.

#### Acceptance Criteria

1. WHEN generate-template is called THEN the system SHALL check the project's configured language from config.yaml
2. IF project has a configured language THEN the system SHALL return the template in that language
3. IF a `language` parameter is provided THEN the system SHALL use it to override the project's configured language
4. WHEN generating templates THEN the system SHALL include AI guidance text translated to the target language
5. WHEN generating templates THEN the system SHALL preserve the arc42 section structure across all languages

### Requirement 3: Language Configuration Persistence

**User Story:** As a user, I want my language preference to be saved in the project configuration, so that I don't have to specify the language for every operation.

#### Acceptance Criteria

1. WHEN arc42-init creates a new workspace THEN the system SHALL save the language setting in config.yaml
2. WHEN config.yaml exists with a language setting THEN all tools SHALL read and respect this setting
3. IF config.yaml language differs from tool parameter THEN the tool parameter SHALL take precedence
4. WHEN arc42-status is called THEN the system SHALL display the project's configured language

### Requirement 4: Translation of Section Titles and Metadata

**User Story:** As a user reading documentation in my native language, I want section titles, headings, and structural elements to be in my language, so that the documentation is fully localized.

#### Acceptance Criteria

1. WHEN creating section files THEN the system SHALL use translated section titles (e.g., "Einführung und Ziele" for German)
2. WHEN updating SECTION_METADATA THEN the system SHALL provide translated titles and descriptions for each language
3. IF section file references other sections THEN the system SHALL use localized section names

### Requirement 5: Mixed Language Support (Optional Override)

**User Story:** As a developer working with an international team, I want to be able to override the language for specific operations, so that I can accommodate mixed-language documentation needs.

#### Acceptance Criteria

1. WHEN update-section is called with a `language` parameter THEN the system SHALL apply templates in that language regardless of project config
2. WHEN get-section is called THEN the system SHALL return content as stored (original language) without translation
3. IF user requests template in a different language than stored content THEN the system SHALL generate the template in the requested language

## Non-Functional Requirements

### Code Architecture and Modularity

- **Single Responsibility Principle**: Language-specific templates SHALL be stored in separate modules by language code
- **Modular Design**: A new `src/templates/locales/` directory SHALL contain language-specific template content
- **Dependency Management**: Language packs SHALL be lazy-loaded to minimize startup overhead
- **Clear Interfaces**: A `LanguageProvider` interface SHALL abstract language-specific operations
- **Extensibility**: Adding a new language SHALL require only adding new template files without core code changes

### Design Patterns

The implementation SHALL use established design patterns for internationalization (i18n) to ensure maintainability, testability, and extensibility:

#### Strategy Pattern
- Each language SHALL be implemented as an interchangeable strategy
- A `LanguageStrategy` interface SHALL define the contract for all language implementations
- Switching languages SHALL be achieved by swapping strategy instances at runtime
- Benefits: Easy to add new languages, follows Open/Closed Principle

#### Factory Pattern
- A `LanguageFactory` SHALL create appropriate language strategy instances
- Factory SHALL handle language code normalization (case-insensitive lookup)
- Factory SHALL implement fallback logic (unknown language → English)
- Benefits: Centralized object creation, encapsulated instantiation logic

#### Registry Pattern
- A `LanguageRegistry` SHALL maintain a catalog of all available languages
- Registry SHALL provide language discovery and validation
- Registry SHALL support dynamic registration for future plugin architecture
- Benefits: Single source of truth for supported languages, enables runtime introspection

#### Provider Pattern
- A `TemplateProvider` interface SHALL abstract template retrieval operations
- `LocalizedTemplateProvider` SHALL implement language-aware template loading
- Provider SHALL handle caching and lazy loading of templates
- Benefits: Separation of concerns, testable with mock providers

#### Recommended Implementation Structure

```
src/templates/
├── locales/
│   ├── index.ts                    # LanguageRegistry & LanguageFactory
│   ├── language-strategy.ts        # LanguageStrategy interface
│   ├── template-provider.ts        # TemplateProvider interface
│   ├── en/                         # English strategy implementation
│   │   ├── index.ts
│   │   └── sections.ts
│   ├── de/                         # German strategy implementation
│   │   ├── index.ts
│   │   └── sections.ts
│   └── [other-languages]/          # One folder per language
```

#### Pattern Benefits Summary

| Pattern | Purpose | Benefit |
|---------|---------|---------|
| Strategy | Language implementations | Add languages without modifying existing code |
| Factory | Object creation | Centralized, testable instantiation |
| Registry | Language catalog | Runtime discovery, validation |
| Provider | Template access | Abstraction, caching, lazy loading |

### Performance

- Template loading SHALL complete within 100ms regardless of selected language
- Language detection and configuration reading SHALL not add perceptible latency
- Total arc42-init time SHALL remain under 2 seconds with any language

### Security

- Language codes SHALL be validated against a whitelist of supported languages
- Template content SHALL not include executable code or user-controllable paths
- Input validation SHALL prevent directory traversal via malicious language codes

### Reliability

- Missing translations SHALL gracefully fall back to English with a warning
- Corrupted or partial language files SHALL not crash the server
- All existing tests SHALL pass with any supported language

### Usability

- Available languages SHALL be discoverable via arc42-workflow-guide
- Error messages for unsupported languages SHALL suggest valid alternatives
- Language codes SHALL match the arc42 template folder names (EN, CZ, DE, ES, FR, IT, NL, PT, RU, UKR, ZH)
- Language codes SHALL be case-insensitive (accepting "de", "DE", or "De")

## Supported Languages

All 11 languages from the official arc42 template repository (`vendor/arc42-template/`) will be supported:

| Code | Language | Folder | Status |
|------|----------|--------|--------|
| EN | English | `EN/` | Default (existing) |
| CZ | Czech | `CZ/` | New |
| DE | German | `DE/` | New |
| ES | Spanish | `ES/` | New |
| FR | French | `FR/` | New |
| IT | Italian | `IT/` | New |
| NL | Dutch | `NL/` | New |
| PT | Portuguese | `PT/` | New |
| RU | Russian | `RU/` | New |
| UKR | Ukrainian | `UKR/` | New |
| ZH | Chinese | `ZH/` | New |

**Note**: Language codes follow ISO 639-1 (2-letter) or ISO 639-2 (3-letter for Ukrainian) standards, matching the folder names in the arc42 template repository.

## Out of Scope

- Automatic translation of existing documentation
- Runtime language switching within a project
- Right-to-left (RTL) language support
- Language detection from system locale
