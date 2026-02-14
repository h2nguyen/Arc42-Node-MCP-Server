/**
 * Language Strategy Factory
 *
 * Provides a plugin-based architecture for creating language strategies.
 * This factory enables easy extension of new languages and output formats
 * while maintaining DRY principles.
 *
 * @module templates/locales/language-strategy-factory
 *
 * Design Patterns:
 * - Factory Pattern: Creates LanguageStrategy instances with consistent structure
 * - Plugin Architecture: Format handlers are pluggable via FormatTemplatePlugin
 * - Strategy Pattern: Each format has its own template provider
 *
 * S.O.L.I.D Principles:
 * - OCP (Open/Closed Principle): New formats can be added without modifying existing code
 * - DIP (Dependency Inversion Principle): Depends on abstractions (plugin interface)
 * - SRP (Single Responsibility Principle): Factory only creates strategies
 */

import type { Arc42Section } from '../../types.js';
import type { OutputFormatCode } from '../formats/index.js';
import type {
  LanguageStrategy,
  LanguageCode,
  SectionTitle,
  SectionDescription
} from './language-strategy.js';

/**
 * Plugin interface for format-specific template providers
 * Implement this interface to add support for a new output format
 */
export interface FormatTemplatePlugin {
  /** Get template for a specific section */
  getTemplate(section: Arc42Section): string;
  /** Get workflow guide content */
  getWorkflowGuide(): string;
  /** Get README content */
  getReadmeContent(projectName?: string): string;
}

/**
 * Configuration for creating a language strategy
 */
export interface LanguageStrategyConfig {
  /** ISO language code */
  code: LanguageCode;
  /** English name of the language */
  name: string;
  /** Name of the language in its native form */
  nativeName: string;
  /** Function to get section title */
  getSectionTitle: (section: Arc42Section) => string;
  /** Function to get section description */
  getSectionDescription: (section: Arc42Section) => string;
  /** Format-specific template plugins */
  formatPlugins: Record<OutputFormatCode, FormatTemplatePlugin>;
}

/**
 * Creates a LanguageStrategy from a configuration object
 *
 * This factory function creates consistent language strategies with proper
 * format dispatch. It uses a plugin architecture where each output format
 * provides its own template implementations.
 *
 * @param config - The language strategy configuration
 * @returns A complete LanguageStrategy implementation
 *
 * @example
 * ```typescript
 * const englishStrategy = createLanguageStrategy({
 *   code: 'EN',
 *   name: 'English',
 *   nativeName: 'English',
 *   getSectionTitle: (section) => getSectionTitle(section),
 *   getSectionDescription: (section) => getSectionDescription(section),
 *   formatPlugins: {
 *     markdown: markdownPlugin,
 *     asciidoc: asciidocPlugin
 *   }
 * });
 * ```
 */
export function createLanguageStrategy(config: LanguageStrategyConfig): LanguageStrategy {
  const { code, name, nativeName, getSectionTitle, getSectionDescription, formatPlugins } = config;

  return {
    code,
    name,
    nativeName,

    getSectionTitle(section: Arc42Section): SectionTitle {
      return {
        title: getSectionTitle(section),
        section
      };
    },

    getSectionDescription(section: Arc42Section): SectionDescription {
      return {
        description: getSectionDescription(section),
        section
      };
    },

    getTemplateForFormat(section: Arc42Section, format: OutputFormatCode): string {
      return formatPlugins[format].getTemplate(section);
    },

    getWorkflowGuideForFormat(format: OutputFormatCode): string {
      return formatPlugins[format].getWorkflowGuide();
    },

    getReadmeContentForFormat(projectName: string | undefined, format: OutputFormatCode): string {
      return formatPlugins[format].getReadmeContent(projectName);
    }
  };
}

/**
 * Creates a format plugin from individual functions
 *
 * Helper function to create a FormatTemplatePlugin from separate functions.
 * This is useful when importing functions from existing template modules.
 *
 * @param getTemplate - Function to get section template
 * @param getWorkflowGuide - Function to get workflow guide
 * @param getReadmeContent - Function to get README content
 * @returns A FormatTemplatePlugin instance
 *
 * @example
 * ```typescript
 * const markdownPlugin = createFormatPlugin(
 *   getTemplateMarkdown,
 *   getWorkflowGuideMarkdown,
 *   getReadmeContentMarkdown
 * );
 * ```
 */
export function createFormatPlugin(
  getTemplate: (section: Arc42Section) => string,
  getWorkflowGuide: () => string,
  getReadmeContent: (projectName?: string) => string
): FormatTemplatePlugin {
  return {
    getTemplate,
    getWorkflowGuide,
    getReadmeContent
  };
}

/**
 * Creates format plugins with fallback support
 *
 * For languages that don't have all format templates implemented,
 * this function creates plugins that fall back to another language's
 * templates (typically English) for missing formats.
 *
 * @param primaryPlugins - The primary format plugin (e.g., markdown in native language)
 * @param fallbackPlugins - Fallback plugins for formats not natively supported
 * @returns A complete set of format plugins
 *
 * @example
 * ```typescript
 * // French only has markdown templates, falls back to English for AsciiDoc
 * const formatPlugins = createFormatPluginsWithFallback(
 *   { markdown: frenchMarkdownPlugin },
 *   { asciidoc: englishAsciidocPlugin }
 * );
 * ```
 */
export function createFormatPluginsWithFallback(
  primaryPlugins: Partial<Record<OutputFormatCode, FormatTemplatePlugin>>,
  fallbackPlugins: Record<OutputFormatCode, FormatTemplatePlugin>
): Record<OutputFormatCode, FormatTemplatePlugin> {
  return {
    markdown: primaryPlugins.markdown ?? fallbackPlugins.markdown,
    asciidoc: primaryPlugins.asciidoc ?? fallbackPlugins.asciidoc
  };
}
