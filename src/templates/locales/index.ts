/**
 * Locales Module - Multi-Language Template Support
 *
 * Barrel export for the language localization infrastructure.
 * Exports all types, classes, and singleton instances for the locales module.
 *
 * @module templates/locales
 *
 * Design Patterns:
 * - Singleton Pattern: Module-level instances provide global access points
 * - Barrel Export Pattern: Single entry point for all locales functionality
 */

// Re-export types and interfaces
export type {
  LanguageCode,
  SectionTitle,
  SectionDescription,
  LanguageInfo,
  LanguageStrategy
} from './language-strategy.js';

// Re-export constants
export { SUPPORTED_LANGUAGE_CODES } from './language-strategy.js';

// Re-export utility functions
export { isLanguageCode, normalizeLanguageCode } from './language-strategy.js';

// Re-export classes
export { LanguageRegistry } from './language-registry.js';
export { LanguageFactory } from './language-factory.js';
export { LocalizedTemplateProvider } from './template-provider.js';

// Re-export template provider types
export type { LocalizedSectionMetadata } from './template-provider.js';

// Create singleton instances
// These provide global access points for the locales module
import { LanguageRegistry } from './language-registry.js';
import { LanguageFactory } from './language-factory.js';
import { LocalizedTemplateProvider } from './template-provider.js';

// Import language strategies for registration
import { englishStrategy } from './en/index.js';
import { germanStrategy } from './de/index.js';
import { spanishStrategy } from './es/index.js';
import { frenchStrategy } from './fr/index.js';
import { italianStrategy } from './it/index.js';
import { dutchStrategy } from './nl/index.js';
import { portugueseStrategy } from './pt/index.js';
import { russianStrategy } from './ru/index.js';
import { czechStrategy } from './cz/index.js';
import { ukrainianStrategy } from './ukr/index.js';
import { chineseStrategy } from './zh/index.js';

/**
 * Global language registry instance
 *
 * Use this registry to register new language strategies
 * and access registered languages throughout the application.
 */
export const languageRegistry = new LanguageRegistry();

// Register all language strategies
// English is the default language
languageRegistry.register(englishStrategy);
languageRegistry.register(germanStrategy);
languageRegistry.register(spanishStrategy);
languageRegistry.register(frenchStrategy);
languageRegistry.register(italianStrategy);
languageRegistry.register(dutchStrategy);
languageRegistry.register(portugueseStrategy);
languageRegistry.register(russianStrategy);
languageRegistry.register(czechStrategy);
languageRegistry.register(ukrainianStrategy);
languageRegistry.register(chineseStrategy);

/**
 * Global language factory instance
 *
 * Use this factory to create language strategy instances
 * with proper normalization and fallback handling.
 */
export const languageFactory = new LanguageFactory(languageRegistry);

/**
 * Global template provider instance
 *
 * Use this provider to access templates in different languages
 * with config.yaml integration support.
 */
export const templateProvider = new LocalizedTemplateProvider(languageFactory);

// Re-export language strategies for direct access
export { englishStrategy } from './en/index.js';
export { germanStrategy } from './de/index.js';
export { spanishStrategy } from './es/index.js';
export { frenchStrategy } from './fr/index.js';
export { italianStrategy } from './it/index.js';
export { dutchStrategy } from './nl/index.js';
export { portugueseStrategy } from './pt/index.js';
export { russianStrategy } from './ru/index.js';
export { czechStrategy } from './cz/index.js';
export { ukrainianStrategy } from './ukr/index.js';
export { chineseStrategy } from './zh/index.js';

/**
 * Helper function to get the default language code
 *
 * @returns The default language code ('EN')
 */
export function getDefaultLanguageCode(): string {
  return 'EN';
}

/**
 * Helper function to check if the registry has been initialized with languages
 *
 * @returns True if at least one language is registered
 */
export function isInitialized(): boolean {
  return languageRegistry.size > 0;
}
