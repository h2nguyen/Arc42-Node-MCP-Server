/**
 * Language Registry
 *
 * Registry for storing and retrieving language strategies.
 * Uses Map for O(1) lookup by normalized language code.
 *
 * @module templates/locales/language-registry
 *
 * S.O.L.I.D Principles:
 * - SRP (Single Responsibility Principle): Only manages registration and lookup,
 *   not creation or template retrieval
 *
 * Design Patterns:
 * - Registry Pattern: Single source of truth for language strategies
 */

import type { LanguageStrategy, LanguageCode } from './language-strategy.js';

/**
 * Language Registry Class
 *
 * Manages the collection of language strategies, providing registration,
 * lookup, and enumeration capabilities with case-insensitive code handling.
 *
 * @example
 * ```typescript
 * const registry = new LanguageRegistry();
 * registry.register(englishStrategy);
 * registry.register(germanStrategy);
 *
 * const strategy = registry.get('de'); // Case-insensitive
 * const allCodes = registry.getAvailableCodes(); // ['EN', 'DE']
 * ```
 */
export class LanguageRegistry {
  /**
   * Internal map storing strategies by normalized (uppercase) language code
   */
  private readonly strategies: Map<string, LanguageStrategy>;

  constructor() {
    this.strategies = new Map();
  }

  /**
   * Normalize a language code for consistent storage and lookup
   *
   * @param code - The language code to normalize
   * @returns Uppercase, trimmed language code
   */
  private normalizeCode(code: string): string {
    return code.trim().toUpperCase();
  }

  /**
   * Register a language strategy
   *
   * Stores the strategy using its code (normalized to uppercase).
   * If a strategy with the same code already exists, it will be overwritten.
   *
   * @param strategy - The language strategy to register
   * @returns This registry instance for method chaining
   */
  register(strategy: LanguageStrategy): this {
    const normalizedCode = this.normalizeCode(strategy.code);
    this.strategies.set(normalizedCode, strategy);
    return this;
  }

  /**
   * Get a language strategy by code
   *
   * Performs case-insensitive lookup.
   *
   * @param code - The language code to look up
   * @returns The language strategy, or undefined if not found
   */
  get(code: string): LanguageStrategy | undefined {
    const normalizedCode = this.normalizeCode(code);
    return this.strategies.get(normalizedCode);
  }

  /**
   * Get a language strategy by code, throwing if not found
   *
   * Performs case-insensitive lookup and throws a descriptive error
   * if the requested language is not registered.
   *
   * @param code - The language code to look up
   * @returns The language strategy
   * @throws Error if the language code is not registered
   */
  getOrThrow(code: string): LanguageStrategy {
    const strategy = this.get(code);
    if (!strategy) {
      const availableCodes = this.getAvailableCodes().join(', ');
      throw new Error(
        `Language code "${code.trim().toUpperCase()}" is not registered. ` +
        `Available languages: ${availableCodes || 'none'}`
      );
    }
    return strategy;
  }

  /**
   * Get all registered language strategies
   *
   * @returns Array of all registered strategies (copy, not the internal collection)
   */
  getAll(): LanguageStrategy[] {
    return Array.from(this.strategies.values());
  }

  /**
   * Check if a language code is supported
   *
   * Performs case-insensitive check.
   *
   * @param code - The language code to check
   * @returns True if the language is registered
   */
  isSupported(code: string): boolean {
    const normalizedCode = this.normalizeCode(code);
    return this.strategies.has(normalizedCode);
  }

  /**
   * Get all available language codes
   *
   * @returns Array of all registered language codes (uppercase)
   */
  getAvailableCodes(): LanguageCode[] {
    return Array.from(this.strategies.keys()) as LanguageCode[];
  }

  /**
   * Get the default language strategy (English)
   *
   * @returns The English language strategy, or undefined if not registered
   */
  getDefault(): LanguageStrategy | undefined {
    return this.get('EN');
  }

  /**
   * Get the number of registered strategies
   */
  get size(): number {
    return this.strategies.size;
  }

  /**
   * Remove all registered strategies
   *
   * @returns This registry instance for method chaining
   */
  clear(): this {
    this.strategies.clear();
    return this;
  }
}
