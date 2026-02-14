/**
 * Templates Module
 *
 * Main entry point for arc42 templates.
 * Provides backward-compatible access to English templates while delegating
 * to the new locales system for multi-language support.
 *
 * @module templates
 */

import { Arc42Section } from '../types.js';
import { templateProvider } from './locales/index.js';
import type { OutputFormatCode } from './formats/index.js';

// Re-export arc42 reference information
export {
  ARC42_REFERENCE,
  Arc42Reference,
  getArc42ReferenceString,
  getArc42ReferenceMarkdown,
  getArc42ReferenceConfig,
  reloadArc42Reference
} from './arc42-reference.js';

// Re-export locales module for multi-language support
export {
  // Types
  type LanguageCode,
  type SectionTitle,
  type SectionDescription,
  type LanguageInfo,
  type LanguageStrategy,
  type LocalizedSectionMetadata,

  // Constants
  SUPPORTED_LANGUAGE_CODES,

  // Utility functions
  isLanguageCode,
  normalizeLanguageCode,
  getDefaultLanguageCode,
  isInitialized,

  // Classes
  LanguageRegistry,
  LanguageFactory,
  LocalizedTemplateProvider,

  // Singleton instances
  languageRegistry,
  languageFactory,
  templateProvider,

  // English strategy
  englishStrategy
} from './locales/index.js';

// Re-export formats module for multi-format support
export {
  // Types
  type OutputFormatStrategy,
  type OutputFormatCode,

  // Constants
  SUPPORTED_OUTPUT_FORMAT_CODES,
  OUTPUT_FORMAT_ALIASES,
  DEFAULT_OUTPUT_FORMAT,

  // Utility functions
  isOutputFormatCode,
  normalizeOutputFormatCode,
  isOutputFormatSupported,
  getSupportedOutputFormatCodes,
  detectOutputFormatFromExtension,
  detectOutputFormatFromFilename,

  // Classes
  OutputFormatRegistry,
  OutputFormatFactory,
  MarkdownFormatStrategy,
  AsciiDocFormatStrategy,

  // Singleton instances
  outputFormatRegistry,
  outputFormatFactory,
  markdownFormatStrategy,
  asciidocFormatStrategy,

  // Convenience functions
  getOutputFormatStrategy,
  getOutputFormatStrategyWithFallback,
  getDefaultOutputFormatStrategy
} from './formats/index.js';

/**
 * Get template for a specific arc42 section in a specific format
 *
 * @param section - The arc42 section to get the template for
 * @param language - Optional language code (defaults to English)
 * @param format - Optional output format (defaults to AsciiDoc)
 * @returns The template content in the specified format
 */
export function getTemplateForFormat(
  section: Arc42Section,
  language?: string,
  format?: OutputFormatCode
): string {
  return templateProvider.getTemplateForFormat(section, language, format);
}

/**
 * Get localized section metadata
 *
 * @param section - The arc42 section
 * @param language - Optional language code (defaults to English)
 * @returns The section metadata including title and description
 */
export function getSectionMetadata(section: Arc42Section, language?: string) {
  return templateProvider.getSectionMetadata(section, language);
}

/**
 * Get the workflow guide in a specific format
 *
 * @param language - Optional language code (defaults to English)
 * @param format - Optional output format (defaults to AsciiDoc)
 * @returns The workflow guide content
 */
export function getWorkflowGuideForFormat(language?: string, format?: OutputFormatCode): string {
  return templateProvider.getWorkflowGuideForFormat(language, format);
}

/**
 * Get available languages
 *
 * @returns Array of available language information
 */
export function getAvailableLanguages() {
  return templateProvider.getAvailableLanguages();
}

/**
 * Check if a language is supported
 *
 * @param language - The language code to check
 * @returns True if the language is supported
 */
export function isLanguageSupported(language: string): boolean {
  return templateProvider.isSupported(language);
}
