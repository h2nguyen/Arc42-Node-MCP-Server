# Tasks Document: Multi-Language Template Support

## Implementation Principles

This task list follows the coding best practices defined in `tech.md`:

### TDD Approach (Red-Green-Refactor)
All implementation tasks SHALL follow Test-Driven Development:
1. **Red**: Write failing tests first
2. **Green**: Write minimal code to pass tests
3. **Refactor**: Improve code while keeping tests green

### S.O.L.I.D Compliance
Each component is designed following S.O.L.I.D principles:
- **SRP**: Each class has single responsibility
- **OCP**: New languages extend without modifying existing code
- **LSP**: All strategies are substitutable
- **ISP**: Small, focused interfaces
- **DIP**: Depend on abstractions, not concretions

### Design Patterns
- **Strategy**: `LanguageStrategy` interface + implementations
- **Factory**: `LanguageFactory` for object creation
- **Registry**: `LanguageRegistry` for discovery
- **Facade**: `LocalizedTemplateProvider` for simplified access
- **Singleton**: Module-level instances

---

## Phase 1: Core Language Infrastructure

- [-] 1. Create LanguageStrategy interface
  - File: `src/templates/locales/language-strategy.ts`
  - Define the core interface that all language implementations must follow
  - Include methods: getSectionTitle, getSectionDescription, getTemplate, getWorkflowGuide, getReadmeContent
  - Export language-related type definitions
  - **S.O.L.I.D**: ISP - focused interface for language content only
  - **Pattern**: Strategy Pattern contract
  - _Leverage: src/types.ts (Arc42Section type)_
  - _Requirements: Non-functional: Strategy Pattern_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: TypeScript Developer specializing in design patterns and interfaces
    Task: Create the LanguageStrategy interface that defines the contract for all language implementations, including code/name/nativeName properties and methods for section titles, descriptions, templates, workflow guide, and readme content
    Restrictions: Do not implement concrete classes yet, only the interface. Follow kebab-case file naming. Use PascalCase for interface name. Export all types needed by strategy implementations
    S.O.L.I.D: Apply ISP - interface should be focused only on language content, not registration or creation logic
    TDD: Write interface type tests first to verify the type contract compiles correctly
    _Leverage: src/types.ts for Arc42Section type
    _Requirements: Non-functional Design Patterns - Strategy Pattern, tech.md S.O.L.I.D ISP
    Success: Interface compiles without errors, includes all 5 required methods, properly typed with Arc42Section parameter
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 2. Create LanguageRegistry class
  - File: `src/templates/locales/language-registry.ts`
  - Implement registry for storing and retrieving language strategies
  - Methods: register, get, getOrThrow, getAll, isSupported, getAvailableCodes, getDefault
  - Use Map for O(1) lookup by normalized language code
  - **S.O.L.I.D**: SRP - only manages registration, not creation or template retrieval
  - **Pattern**: Registry Pattern as single source of truth
  - _Leverage: src/templates/locales/language-strategy.ts_
  - _Requirements: Non-functional: Registry Pattern, tech.md SRP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: TypeScript Developer specializing in design patterns and data structures
    Task: Create LanguageRegistry class that maintains a Map of language strategies, with methods for registration, lookup (case-insensitive), validation, and enumeration
    Restrictions: Normalize all codes to uppercase for storage and lookup. getDefault should return English. getOrThrow should throw descriptive error with available codes
    S.O.L.I.D: Apply SRP - registry ONLY manages registration and lookup, no template loading or strategy creation
    TDD: Write failing tests first using AAA pattern (Arrange-Act-Assert) for registration, lookup, validation, and enumeration methods
    _Leverage: src/templates/locales/language-strategy.ts
    _Requirements: Non-functional Design Patterns - Registry Pattern, tech.md S.O.L.I.D SRP
    Success: Registry correctly stores and retrieves strategies, case-insensitive lookup works, getAvailableCodes returns all 11 language codes, tests achieve 85% coverage
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 3. Create LanguageFactory class
  - File: `src/templates/locales/language-factory.ts`
  - Implement factory for creating language strategy instances
  - Methods: create, createWithFallback, normalizeCode
  - Handle case normalization and fallback to English for unknown codes
  - **S.O.L.I.D**: SRP - only creates instances, DIP - depends on LanguageRegistry abstraction
  - **Pattern**: Factory Pattern for centralized object creation
  - _Leverage: src/templates/locales/language-registry.ts_
  - _Requirements: Non-functional: Factory Pattern, tech.md SRP/DIP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: TypeScript Developer specializing in creational design patterns
    Task: Create LanguageFactory class that creates language strategy instances from the registry, with code normalization and fallback logic
    Restrictions: create() should throw for unknown codes, createWithFallback() should return English with warning for unknown codes. normalizeCode should handle mixed case and trim whitespace
    S.O.L.I.D: Apply SRP - factory ONLY creates instances, not registration. Apply DIP - inject LanguageRegistry via constructor
    TDD: Write failing tests first for normalization, fallback, and error cases using AAA pattern
    _Leverage: src/templates/locales/language-registry.ts
    _Requirements: Non-functional Design Patterns - Factory Pattern, tech.md S.O.L.I.D SRP/DIP
    Success: Factory creates correct strategy for each language code, fallback returns English, normalization handles "de", "DE", "De" identically, tests achieve 85% coverage
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 4. Create LocalizedTemplateProvider class
  - File: `src/templates/locales/template-provider.ts`
  - Implement TemplateProvider interface for language-aware template access
  - Methods: getTemplate, getSectionMetadata, getAvailableLanguages
  - Integrate with config.yaml for default language reading
  - **S.O.L.I.D**: SRP - only retrieves templates, ISP - implements focused TemplateProvider interface, DIP - depends on LanguageFactory abstraction
  - **Pattern**: Facade Pattern simplifying language/config complexity
  - _Leverage: src/templates/locales/language-factory.ts, yaml library_
  - _Requirements: Requirement 2, 3, Non-functional: Facade Pattern, tech.md SRP/ISP/DIP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: TypeScript Developer specializing in provider patterns and configuration
    Task: Create LocalizedTemplateProvider class that provides language-aware template access, reading default language from config.yaml and allowing parameter override
    Restrictions: Parameter should override config setting. If neither provided, default to English. Handle missing config.yaml gracefully
    S.O.L.I.D: Apply SRP - provider ONLY retrieves templates. Apply ISP - implement focused TemplateProvider interface. Apply DIP - inject LanguageFactory
    Pattern: This is a Facade - it simplifies complex language/config logic for tool handlers
    TDD: Write failing tests first for template retrieval, config reading, and fallback using AAA pattern
    _Leverage: src/templates/locales/language-factory.ts, yaml library for config reading
    _Requirements: Requirement 2 (Language-Aware Template Generation), Requirement 3 (Language Configuration Persistence), tech.md S.O.L.I.D
    Success: Provider returns templates in correct language, config override works, available languages list returns all 11, tests achieve 85% coverage
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 5. Create locales barrel export
  - File: `src/templates/locales/index.ts`
  - Export all locales components: LanguageStrategy, LanguageRegistry, LanguageFactory, LocalizedTemplateProvider
  - Create and export singleton instances: registry, factory, provider
  - **Pattern**: Singleton Pattern for global access to registry, factory, provider
  - _Leverage: All files from tasks 1-4_
  - _Requirements: structure.md: Barrel exports, tech.md Singleton Pattern_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: TypeScript Developer specializing in module organization
    Task: Create barrel export file that exports all types, classes, and singleton instances from the locales module
    Restrictions: Follow existing barrel export patterns in the project. Export singleton instances for registry, factory, and provider
    Pattern: Singleton - module-level instances provide global access points
    _Leverage: src/templates/locales/*.ts
    _Requirements: structure.md conventions for barrel exports, tech.md Singleton Pattern
    Success: All types and classes importable from src/templates/locales, singleton instances properly initialized
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

## Phase 2: English Strategy (Refactor Existing)

- [ ] 6. Create English language strategy
  - Files: `src/templates/locales/en/index.ts`, `src/templates/locales/en/sections.ts`, `src/templates/locales/en/templates.ts`
  - Refactor existing English templates from src/templates/index.ts into strategy implementation
  - Implement LanguageStrategy interface for English
  - **S.O.L.I.D**: LSP - EnglishStrategy substitutable for any LanguageStrategy, OCP - implements interface without modifying it
  - **Pattern**: Strategy Pattern concrete implementation
  - _Leverage: src/templates/index.ts (existing templates), src/templates/locales/language-strategy.ts_
  - _Requirements: Requirement 1 (default to English), tech.md LSP/OCP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: TypeScript Developer specializing in refactoring and migration
    Task: Create English language strategy by refactoring existing templates from src/templates/index.ts into the new locales structure, implementing the LanguageStrategy interface
    Restrictions: Must preserve ALL existing template content exactly. Do not modify existing templates - copy and restructure only. English is the default language
    S.O.L.I.D: Apply LSP - EnglishStrategy must be substitutable wherever LanguageStrategy is expected. Apply OCP - implement interface, don't modify it
    TDD: Write tests first verifying EnglishStrategy implements all interface methods and returns expected content
    _Leverage: src/templates/index.ts (existing templates to refactor)
    _Requirements: Requirement 1 (EN is default), tech.md S.O.L.I.D LSP/OCP
    Success: English strategy passes all existing template tests, content identical to current templates, properly implements interface, all language strategies substitutable
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 7. Register English strategy and update templates/index.ts
  - Files: `src/templates/index.ts` (modify), `src/templates/locales/index.ts` (modify)
  - Register English strategy in the LanguageRegistry
  - Update templates/index.ts to re-export from locales module
  - **S.O.L.I.D**: OCP - adding English without modifying core registry logic
  - _Leverage: src/templates/locales/en/index.ts, src/templates/locales/language-registry.ts_
  - _Requirements: Backward compatibility, tech.md OCP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: TypeScript Developer specializing in API design and backward compatibility
    Task: Register English strategy in the registry and update templates/index.ts to use the new locales system while maintaining backward compatibility for existing imports
    Restrictions: Existing imports from src/templates must continue to work. Do not break any existing functionality
    S.O.L.I.D: Apply OCP - add new language support without modifying existing template retrieval code
    TDD: Run existing tests to verify backward compatibility, add integration tests for registry registration
    _Leverage: src/templates/locales/en/index.ts, src/templates/locales/index.ts
    _Requirements: Backward compatibility with existing code, tech.md OCP
    Success: All existing tests pass without modification, English templates accessible via both old and new imports
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

## Phase 3: Additional Language Strategies (10 languages)

- [ ] 8. Create German (DE) language strategy
  - Files: `src/templates/locales/de/index.ts`, `src/templates/locales/de/sections.ts`, `src/templates/locales/de/templates.ts`
  - Translate section titles, descriptions, and template content to German
  - Register in LanguageRegistry
  - **S.O.L.I.D**: LSP - GermanStrategy substitutable for LanguageStrategy, OCP - extends system without modifying existing strategies
  - **Pattern**: Strategy Pattern - another interchangeable implementation
  - _Leverage: vendor/arc42-template/DE/, src/templates/locales/en/ (as structure reference)_
  - _Requirements: Requirement 4 (localized section titles), tech.md LSP/OCP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: TypeScript Developer with German language proficiency
    Task: Create German language strategy using translations from vendor/arc42-template/DE/, following the same structure as English strategy
    Restrictions: Use official arc42 German translations from vendor folder. Maintain same structure as English implementation
    S.O.L.I.D: Apply LSP - GermanStrategy must be substitutable for LanguageStrategy anywhere. Apply OCP - add German without modifying English or core
    TDD: Write tests first verifying all 12 sections have German titles, descriptions, and templates
    _Leverage: vendor/arc42-template/DE/ for German translations, src/templates/locales/en/ for structure
    _Requirements: Requirement 4 (Translation of Section Titles and Metadata), tech.md S.O.L.I.D LSP/OCP
    Success: German strategy implements interface, all section titles/descriptions in German, registered in registry, substitutable for EnglishStrategy
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 9. Create remaining 9 language strategies
  - Files: `src/templates/locales/{cz,es,fr,it,nl,pt,ru,ukr,zh}/` (3 files each)
  - Create strategies for: Czech, Spanish, French, Italian, Dutch, Portuguese, Russian, Ukrainian, Chinese
  - Register all in LanguageRegistry
  - **S.O.L.I.D**: LSP - all strategies substitutable, OCP - 9 new languages without modifying existing code
  - **Pattern**: Strategy Pattern - 9 more interchangeable implementations
  - _Leverage: vendor/arc42-template/{CZ,ES,FR,IT,NL,PT,RU,UKR,ZH}/, src/templates/locales/en/_
  - _Requirements: Supported Languages table in requirements.md, tech.md LSP/OCP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: TypeScript Developer with internationalization expertise
    Task: Create language strategies for all remaining 9 languages (CZ, ES, FR, IT, NL, PT, RU, UKR, ZH) using translations from vendor/arc42-template folders
    Restrictions: Use official arc42 translations from vendor folders. Each language follows same structure as English. Register all in registry
    S.O.L.I.D: Apply LSP - all 9 strategies must be substitutable. Apply OCP - add all languages without modifying core or existing strategies
    TDD: Write tests for each language verifying all 12 sections have content, use parameterized tests for efficiency
    _Leverage: vendor/arc42-template/{lang}/ folders, src/templates/locales/en/ for structure
    _Requirements: Supported Languages table - all 11 languages, tech.md S.O.L.I.D LSP/OCP
    Success: All 9 strategies implement interface correctly, registered in registry, getAvailableCodes returns all 11, all strategies substitutable
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

## Phase 4: Tool Integration

- [ ] 10. Extend arc42-init with language parameter
  - File: `src/tools/arc42-init.ts` (modify)
  - Add `language` parameter to tool schema
  - Use LocalizedTemplateProvider for template generation
  - Save language setting to config.yaml
  - **S.O.L.I.D**: DIP - tool depends on TemplateProvider interface, not concrete LocalizedTemplateProvider
  - _Leverage: src/templates/locales/template-provider.ts, src/tools/arc42-init.ts_
  - _Requirements: Requirement 1 (Language Selection for arc42-init), tech.md DIP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: MCP Tool Developer with TypeScript expertise
    Task: Extend arc42-init tool to accept optional language parameter, use LocalizedTemplateProvider for templates, and save language to config.yaml
    Restrictions: Default to English if no language specified. Validate language code against supported list. Save language in config.yaml project section
    S.O.L.I.D: Apply DIP - tool handler should depend on TemplateProvider interface, not LocalizedTemplateProvider directly
    TDD: Write failing tests first for language parameter handling, config saving, and default behavior using AAA pattern
    _Leverage: src/templates/locales/template-provider.ts, existing arc42-init implementation
    _Requirements: Requirement 1 (Language Selection for arc42-init), tech.md S.O.L.I.D DIP
    Success: arc42-init accepts language parameter, creates templates in specified language, saves to config.yaml, tests achieve 85% coverage
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 11. Extend generate-template with language support
  - File: `src/tools/generate-template.ts` (modify)
  - Add optional `language` parameter to tool schema
  - Read default language from config.yaml if not specified
  - Use LocalizedTemplateProvider for template generation
  - **S.O.L.I.D**: DIP - tool depends on TemplateProvider interface
  - _Leverage: src/templates/locales/template-provider.ts, src/tools/generate-template.ts_
  - _Requirements: Requirement 2 (Language-Aware Template Generation), tech.md DIP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: MCP Tool Developer with TypeScript expertise
    Task: Extend generate-template tool to support language parameter and read default from config.yaml
    Restrictions: Parameter overrides config. If neither provided, use English default. Maintain existing tool behavior for English
    S.O.L.I.D: Apply DIP - depend on TemplateProvider interface for template retrieval
    TDD: Write failing tests first for language parameter, config reading, and override behavior using AAA pattern
    _Leverage: src/templates/locales/template-provider.ts, existing generate-template implementation
    _Requirements: Requirement 2 (Language-Aware Template Generation), tech.md S.O.L.I.D DIP
    Success: generate-template returns templates in correct language, respects config.yaml setting, parameter override works, tests achieve 85% coverage
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 12. Extend arc42-status with language display
  - File: `src/tools/arc42-status.ts` (modify)
  - Read language setting from config.yaml
  - Include language in status response
  - Show "EN (default)" when not configured
  - _Leverage: src/tools/arc42-status.ts, yaml library_
  - _Requirements: Requirement 3 (Language Configuration Persistence)_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: MCP Tool Developer with TypeScript expertise
    Task: Extend arc42-status tool to read and display the configured language from config.yaml
    Restrictions: Show "EN (default)" if language not configured. Display both language code and name (e.g., "DE (German)")
    TDD: Write failing tests first for language display, default handling, and missing config using AAA pattern
    _Leverage: existing arc42-status implementation, yaml library
    _Requirements: Requirement 3 (arc42-status SHALL display the project's configured language)
    Success: arc42-status includes language in response, shows default when not set, displays human-readable name, tests achieve 85% coverage
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 13. Update arc42-workflow-guide with language info
  - File: `src/tools/arc42-workflow-guide.ts` (modify)
  - Include list of available languages in workflow guide response
  - Document language parameter usage
  - **S.O.L.I.D**: DIP - use LanguageRegistry interface for language discovery
  - _Leverage: src/templates/locales/language-registry.ts, src/tools/arc42-workflow-guide.ts_
  - _Requirements: Non-functional: Usability (languages discoverable), tech.md DIP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: MCP Tool Developer with documentation expertise
    Task: Update arc42-workflow-guide to include available languages and document how to use language parameter
    Restrictions: List all 11 languages with codes and names. Document usage in arc42-init and generate-template sections
    S.O.L.I.D: Apply DIP - use LanguageRegistry abstraction for language list, not hardcoded values
    TDD: Write failing tests first verifying language section exists and lists all 11 languages
    _Leverage: src/templates/locales/language-registry.ts for language list
    _Requirements: Non-functional Usability - languages discoverable via workflow guide, tech.md S.O.L.I.D DIP
    Success: Workflow guide includes language section with all 11 languages listed, usage documented, tests pass
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 14. Register updated tools in server.ts
  - File: `src/server.ts` (modify)
  - Update tool registrations with new `language` parameter schemas
  - Add Zod validation for language codes
  - _Leverage: src/server.ts, zod_
  - _Requirements: Requirement 1 acceptance criteria 6 (error with valid codes)_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: MCP Server Developer with Zod validation expertise
    Task: Update server.ts tool registrations to include language parameter with Zod validation
    Restrictions: Language parameter should be optional. Validation should be case-insensitive. Error message should list valid codes
    TDD: Write failing tests first for schema validation, case handling, and error messages using AAA pattern
    _Leverage: src/server.ts existing tool registrations, zod for validation
    _Requirements: Requirement 1 AC 6 (error listing available languages)
    Success: All tool schemas include language parameter, Zod validation works, error messages helpful, tests achieve 85% coverage
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

## Phase 5: Testing

- [ ] 15. Add unit tests for language infrastructure
  - Files: `src/__tests__/templates/locales/language-registry.test.ts`, `language-factory.test.ts`, `template-provider.test.ts`
  - Test registry: registration, lookup, validation
  - Test factory: normalization, fallback
  - Test provider: template retrieval, config integration
  - **TDD**: Use AAA (Arrange-Act-Assert) pattern for all tests
  - **Coverage**: Target 85% coverage (minimum 70%)
  - _Leverage: src/__tests__/fixtures/test-helpers.ts, vitest_
  - _Requirements: Testing Strategy in design.md, tech.md TDD section_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: QA Engineer with Vitest expertise
    Task: Create comprehensive unit tests for LanguageRegistry, LanguageFactory, and LocalizedTemplateProvider
    Restrictions: Follow existing test patterns. Test both success and failure cases. Use mock strategies for isolated testing
    TDD: Use AAA pattern (Arrange-Act-Assert) for all tests. Mock dependencies for isolation. Target 85% coverage
    _Leverage: src/__tests__/fixtures/test-helpers.ts, existing test patterns
    _Requirements: Testing Strategy in design.md - Unit Testing section, tech.md TDD section
    Success: All core classes have comprehensive tests, edge cases covered, tests pass independently, coverage >= 85%
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 16. Add unit tests for language strategies
  - File: `src/__tests__/templates/locales/strategies.test.ts`
  - Test each of the 11 language strategies
  - Verify all sections have titles, descriptions, templates
  - Verify template content is valid markdown
  - **TDD**: Use AAA pattern, parameterized tests for all 11 languages
  - **S.O.L.I.D**: LSP verification - all strategies behave consistently
  - _Leverage: src/__tests__/fixtures/test-helpers.ts, vitest_
  - _Requirements: Testing Strategy in design.md, tech.md TDD/LSP_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: QA Engineer with internationalization testing expertise
    Task: Create tests for all 11 language strategies verifying completeness and correctness
    Restrictions: Test all 12 sections for each language. Verify non-empty content. Check markdown validity
    TDD: Use AAA pattern. Use parameterized tests (describe.each or it.each) to test all 11 languages efficiently
    S.O.L.I.D: Verify LSP - test that all strategies are substitutable and behave consistently
    _Leverage: src/__tests__/fixtures/test-helpers.ts
    _Requirements: Testing Strategy - test each LanguageStrategy, tech.md TDD/LSP
    Success: All 11 strategies tested for all 12 sections, no empty content, all tests pass, LSP verified
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 17. Extend tool tests with language scenarios
  - Files: `src/__tests__/tools/arc42-init.test.ts`, `generate-template.test.ts`, `arc42-status.test.ts` (extend existing)
  - Add tests for language parameter handling
  - Test config.yaml language persistence
  - Test fallback behavior
  - **TDD**: Use AAA pattern, add integration tests
  - _Leverage: Existing tool tests, vitest_
  - _Requirements: Testing Strategy in design.md - Integration Testing, tech.md TDD_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: QA Engineer with MCP tool testing expertise
    Task: Extend existing tool tests with language-specific scenarios
    Restrictions: Do not remove existing tests. Add language scenarios as additional test cases. Test error handling for invalid codes
    TDD: Use AAA pattern for all new tests. Cover success, failure, and edge cases. Target 85% coverage for tool files
    _Leverage: Existing tool test files
    _Requirements: Testing Strategy - Integration Testing section, tech.md TDD section
    Success: All new language scenarios tested, existing tests still pass, error handling verified, coverage >= 85%
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

## Phase 6: Documentation

- [ ] 18. Update README.md with language documentation
  - File: `README.md` (modify)
  - Document language parameter in tool descriptions
  - Add examples for different languages
  - Update "Available Tools" section
  - _Leverage: README.md_
  - _Requirements: Usability_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: Technical Writer with developer documentation expertise
    Task: Update README.md to document the new multi-language feature with examples
    Restrictions: Follow existing README style. Include examples for at least 3 languages. Update all affected tool sections
    _Leverage: Existing README.md structure
    _Requirements: Non-functional Usability - documentation
    Success: README documents all 11 supported languages, includes usage examples, tool sections updated
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_

- [ ] 19. Create CHANGELOG entry
  - File: `CHANGELOG.md` (modify)
  - Document multi-language template support feature
  - List all supported languages
  - Note any breaking changes (none expected)
  - _Leverage: CHANGELOG.md_
  - _Requirements: Release documentation_
  - _Prompt: Implement the task for spec multi-language-templates, first run spec-workflow-guide to get the workflow guide then implement the task:
    Role: Technical Writer with release documentation expertise
    Task: Add CHANGELOG entry for multi-language template support feature
    Restrictions: Follow existing CHANGELOG format. Use semantic versioning guidelines. List all 11 languages
    _Leverage: Existing CHANGELOG.md format
    _Requirements: Release documentation
    Success: CHANGELOG entry added with feature description, language list, and usage summary
    After completing implementation, mark this task [-] as in-progress in tasks.md, then log implementation with log-implementation tool, then mark [x] as complete_
