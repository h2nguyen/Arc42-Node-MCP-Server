/**
 * Output Format Factory
 *
 * Factory for creating output format strategy instances with code normalization
 * and fallback behavior.
 *
 * @module templates/formats/output-format-factory
 *
 * S.O.L.I.D Principles:
 * - SRP (Single Responsibility Principle): Only handles strategy creation
 *   and code normalization, not registration or content generation
 * - DIP (Dependency Inversion Principle): Depends on OutputFormatRegistry
 *   abstraction, not concrete implementations
 *
 * Design Patterns:
 * - Factory Pattern: Encapsulates strategy creation with normalization logic
 */

import type { OutputFormatStrategy, OutputFormatCode } from './output-format-strategy.js';
import {
  OUTPUT_FORMAT_ALIASES,
  DEFAULT_OUTPUT_FORMAT,
  normalizeOutputFormatCode
} from './output-format-strategy.js';
import type { OutputFormatRegistry } from './output-format-registry.js';

/**
 * Output Format Factory Class
 *
 * Creates output format strategy instances with support for:
 * - Code normalization (case-insensitive, alias support)
 * - Fallback to default format (AsciiDoc) for unknown codes
 * - Validation of format codes
 *
 * @example
 * ```typescript
 * const factory = new OutputFormatFactory(registry);
 *
 * // These all return the same Markdown strategy
 * factory.create('markdown');
 * factory.create('MARKDOWN');
 * factory.create('md');
 *
 * // Unknown formats fall back to AsciiDoc with warning
 * factory.createWithFallback('unknown'); // Returns AsciiDoc strategy
 * ```
 */
export class OutputFormatFactory {
  /**
   * The registry used for strategy lookup
   */
  private readonly registry: OutputFormatRegistry;

  /**
   * Create a new OutputFormatFactory
   *
   * @param registry - The registry to use for strategy lookup
   */
  constructor(registry: OutputFormatRegistry) {
    this.registry = registry;
  }

  /**
   * Normalize a format code to its canonical form
   *
   * Handles case-insensitivity and common aliases.
   *
   * @param code - The format code to normalize
   * @returns The normalized format code, or the original (lowercased) if not recognized
   */
  normalizeCode(code: string): string {
    const trimmed = code.trim().toLowerCase();
    return OUTPUT_FORMAT_ALIASES[trimmed] ?? trimmed;
  }

  /**
   * Create an output format strategy by code
   *
   * Normalizes the code and looks up the strategy in the registry.
   * Throws an error if the format is not found.
   *
   * @param code - The format code (case-insensitive, supports aliases)
   * @returns The output format strategy
   * @throws Error if the format is not registered
   */
  create(code: string): OutputFormatStrategy {
    const normalizedCode = this.normalizeCode(code);
    return this.registry.getOrThrow(normalizedCode);
  }

  /**
   * Create an output format strategy with fallback to default
   *
   * Attempts to create the requested format strategy. If the format
   * is not recognized, falls back to the default format (AsciiDoc)
   * and logs a warning.
   *
   * @param code - The format code (case-insensitive, supports aliases)
   * @returns The output format strategy (requested or default)
   */
  createWithFallback(code: string): OutputFormatStrategy {
    const normalizedCode = this.normalizeCode(code);

    // Try to get the requested format
    const strategy = this.registry.get(normalizedCode);
    if (strategy) {
      return strategy;
    }

    // Fall back to default format with warning
    const defaultStrategy = this.registry.getDefault();
    if (!defaultStrategy) {
      throw new Error(
        `Output format "${code}" is not supported and no default format is registered. ` +
        `Available formats: ${this.getAvailableCodes().join(', ') || 'none'}`
      );
    }

    console.warn(
      `Unknown output format "${code}". Falling back to ${defaultStrategy.name}. ` +
      `Available formats: ${this.getAvailableCodes().join(', ')}`
    );

    return defaultStrategy;
  }

  /**
   * Check if a format code is supported
   *
   * Normalizes the code before checking.
   *
   * @param code - The format code to check
   * @returns True if the format is supported
   */
  isSupported(code: string): boolean {
    const normalizedCode = this.normalizeCode(code);
    return this.registry.isSupported(normalizedCode);
  }

  /**
   * Get all available format codes
   *
   * @returns Array of all registered format codes
   */
  getAvailableCodes(): OutputFormatCode[] {
    return this.registry.getAvailableCodes();
  }

  /**
   * Get the default output format strategy (AsciiDoc)
   *
   * @returns The default format strategy
   * @throws Error if the default format is not registered
   */
  getDefault(): OutputFormatStrategy {
    const defaultStrategy = this.registry.getDefault();
    if (!defaultStrategy) {
      throw new Error(
        `Default output format "${DEFAULT_OUTPUT_FORMAT}" is not registered. ` +
        `Available formats: ${this.getAvailableCodes().join(', ') || 'none'}`
      );
    }
    return defaultStrategy;
  }

  /**
   * Get the default format code
   *
   * @returns The default format code
   */
  getDefaultCode(): OutputFormatCode {
    return DEFAULT_OUTPUT_FORMAT;
  }

  /**
   * Get all supported format codes including aliases
   *
   * @returns Array of all recognized format codes and aliases
   */
  getAllAliases(): string[] {
    return Object.keys(OUTPUT_FORMAT_ALIASES);
  }

  /**
   * Resolve a format code or alias to its canonical form
   *
   * @param code - The format code or alias
   * @returns The canonical format code, or undefined if not recognized
   */
  resolveAlias(code: string): OutputFormatCode | undefined {
    return normalizeOutputFormatCode(code);
  }
}
