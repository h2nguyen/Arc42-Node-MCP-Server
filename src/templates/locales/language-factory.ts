/**
 * Language Factory
 *
 * Factory for creating language strategy instances.
 * Handles code normalization and fallback to English for unknown codes.
 *
 * @module templates/locales/language-factory
 *
 * S.O.L.I.D Principles:
 * - SRP (Single Responsibility Principle): Only creates instances, not registration
 * - DIP (Dependency Inversion Principle): Depends on LanguageRegistry abstraction
 *
 * Design Patterns:
 * - Factory Pattern: Centralized object creation
 */

import type { LanguageStrategy, LanguageCode } from './language-strategy.js';
import type { LanguageRegistry } from './language-registry.js';

/**
 * Language Factory Class
 *
 * Creates language strategy instances from the registry with code normalization
 * and optional fallback to English for unknown language codes.
 *
 * @example
 * ```typescript
 * const factory = new LanguageFactory(registry);
 *
 * // Strict mode - throws for unknown codes
 * const german = factory.create('de'); // Case-insensitive
 *
 * // Lenient mode - falls back to English
 * const fallback = factory.createWithFallback('unknown');
 * ```
 */
export class LanguageFactory {
  /**
   * The registry to retrieve strategies from
   */
  private readonly registry: LanguageRegistry;

  /**
   * Create a new LanguageFactory
   *
   * @param registry - The language registry to use for lookups
   */
  constructor(registry: LanguageRegistry) {
    this.registry = registry;
  }

  /**
   * Normalize a language code
   *
   * Converts to uppercase and trims whitespace for consistent handling.
   *
   * @param code - The language code to normalize
   * @returns The normalized code (uppercase, trimmed)
   */
  normalizeCode(code: string): string {
    return code.trim().toUpperCase();
  }

  /**
   * Create a language strategy for the given code
   *
   * Performs case-insensitive lookup and throws if the language is not registered.
   *
   * @param code - The language code
   * @returns The language strategy
   * @throws Error if the language code is not registered
   */
  create(code: string): LanguageStrategy {
    return this.registry.getOrThrow(code);
  }

  /**
   * Create a language strategy with fallback to English
   *
   * Attempts to create a strategy for the given code. If the code is not registered,
   * logs a warning and returns the English strategy as fallback.
   *
   * @param code - The language code
   * @returns The language strategy (or English if code not found)
   * @throws Error if neither the requested code nor English is registered
   */
  createWithFallback(code: string): LanguageStrategy {
    const normalizedCode = this.normalizeCode(code);
    const strategy = this.registry.get(normalizedCode);

    if (strategy) {
      return strategy;
    }

    // Log warning and fall back to English
    console.warn(
      `Language code "${normalizedCode}" is not registered. Falling back to English.`
    );

    const englishStrategy = this.registry.get('EN');
    if (!englishStrategy) {
      throw new Error(
        `Cannot fall back to English: English language is not registered. ` +
        `Available languages: ${this.registry.getAvailableCodes().join(', ') || 'none'}`
      );
    }

    return englishStrategy;
  }

  /**
   * Check if a language code is supported
   *
   * @param code - The language code to check
   * @returns True if the language is registered
   */
  isSupported(code: string): boolean {
    return this.registry.isSupported(code);
  }

  /**
   * Get all available language codes
   *
   * @returns Array of registered language codes
   */
  getAvailableCodes(): LanguageCode[] {
    return this.registry.getAvailableCodes();
  }

  /**
   * Get the default language strategy (English)
   *
   * @returns The English language strategy
   * @throws Error if English is not registered
   */
  getDefault(): LanguageStrategy {
    const defaultStrategy = this.registry.getDefault();
    if (!defaultStrategy) {
      throw new Error(
        'Default language (English) is not registered. ' +
        `Available languages: ${this.registry.getAvailableCodes().join(', ') || 'none'}`
      );
    }
    return defaultStrategy;
  }
}
