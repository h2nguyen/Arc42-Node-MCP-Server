/**
 * Output Format Registry
 *
 * Registry for storing and retrieving output format strategies.
 * Uses Map for O(1) lookup by normalized format code.
 *
 * @module templates/formats/output-format-registry
 *
 * S.O.L.I.D Principles:
 * - SRP (Single Responsibility Principle): Only manages registration and lookup,
 *   not creation or content generation
 *
 * Design Patterns:
 * - Registry Pattern: Single source of truth for format strategies
 */

import type { OutputFormatStrategy, OutputFormatCode } from './output-format-strategy.js';
import { DEFAULT_OUTPUT_FORMAT } from './output-format-strategy.js';

/**
 * Output Format Registry Class
 *
 * Manages the collection of output format strategies, providing registration,
 * lookup, and enumeration capabilities with case-insensitive code handling.
 *
 * @example
 * ```typescript
 * const registry = new OutputFormatRegistry();
 * registry.register(markdownStrategy);
 * registry.register(asciidocStrategy);
 *
 * const strategy = registry.get('asciidoc'); // Case-insensitive
 * const allCodes = registry.getAvailableCodes(); // ['markdown', 'asciidoc']
 * ```
 */
export class OutputFormatRegistry {
  /**
   * Internal map storing strategies by normalized (lowercase) format code
   */
  private readonly strategies: Map<string, OutputFormatStrategy>;

  constructor() {
    this.strategies = new Map();
  }

  /**
   * Normalize a format code for consistent storage and lookup
   *
   * @param code - The format code to normalize
   * @returns Lowercase, trimmed format code
   */
  private normalizeCode(code: string): string {
    return code.trim().toLowerCase();
  }

  /**
   * Register an output format strategy
   *
   * Stores the strategy using its code (normalized to lowercase).
   * If a strategy with the same code already exists, it will be overwritten.
   *
   * @param strategy - The output format strategy to register
   * @returns This registry instance for method chaining
   */
  register(strategy: OutputFormatStrategy): this {
    const normalizedCode = this.normalizeCode(strategy.code);
    this.strategies.set(normalizedCode, strategy);
    return this;
  }

  /**
   * Get an output format strategy by code
   *
   * Performs case-insensitive lookup.
   *
   * @param code - The format code to look up
   * @returns The output format strategy, or undefined if not found
   */
  get(code: string): OutputFormatStrategy | undefined {
    const normalizedCode = this.normalizeCode(code);
    return this.strategies.get(normalizedCode);
  }

  /**
   * Get an output format strategy by code, throwing if not found
   *
   * Performs case-insensitive lookup and throws a descriptive error
   * if the requested format is not registered.
   *
   * @param code - The format code to look up
   * @returns The output format strategy
   * @throws Error if the format code is not registered
   */
  getOrThrow(code: string): OutputFormatStrategy {
    const strategy = this.get(code);
    if (!strategy) {
      const availableCodes = this.getAvailableCodes().join(', ');
      throw new Error(
        `Output format "${code.trim().toLowerCase()}" is not registered. ` +
        `Available formats: ${availableCodes || 'none'}`
      );
    }
    return strategy;
  }

  /**
   * Get all registered output format strategies
   *
   * @returns Array of all registered strategies (copy, not the internal collection)
   */
  getAll(): OutputFormatStrategy[] {
    return Array.from(this.strategies.values());
  }

  /**
   * Check if a format code is supported
   *
   * Performs case-insensitive check.
   *
   * @param code - The format code to check
   * @returns True if the format is registered
   */
  isSupported(code: string): boolean {
    const normalizedCode = this.normalizeCode(code);
    return this.strategies.has(normalizedCode);
  }

  /**
   * Get all available format codes
   *
   * @returns Array of all registered format codes (lowercase)
   */
  getAvailableCodes(): OutputFormatCode[] {
    return Array.from(this.strategies.keys()) as OutputFormatCode[];
  }

  /**
   * Get the default output format strategy (AsciiDoc)
   *
   * @returns The default (AsciiDoc) format strategy, or undefined if not registered
   */
  getDefault(): OutputFormatStrategy | undefined {
    return this.get(DEFAULT_OUTPUT_FORMAT);
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
