/**
 * Output Formats Module
 *
 * Barrel file for output format support. Exports all format-related
 * types, strategies, registry, and factory.
 *
 * @module templates/formats
 *
 * This module provides:
 * - OutputFormatStrategy interface and types
 * - OutputFormatRegistry for format storage
 * - OutputFormatFactory for format creation
 * - Pre-configured singleton instances
 * - Markdown and AsciiDoc format strategies
 */

// ============================================
// Types and Constants
// ============================================

export type {
  OutputFormatStrategy,
  OutputFormatCode
} from './output-format-strategy.js';

export {
  SUPPORTED_OUTPUT_FORMAT_CODES,
  OUTPUT_FORMAT_ALIASES,
  DEFAULT_OUTPUT_FORMAT,
  isOutputFormatCode,
  normalizeOutputFormatCode
} from './output-format-strategy.js';

// ============================================
// Registry
// ============================================

export { OutputFormatRegistry } from './output-format-registry.js';

// ============================================
// Factory
// ============================================

export { OutputFormatFactory } from './output-format-factory.js';

// ============================================
// Format Strategies
// ============================================

export { MarkdownFormatStrategy, markdownFormatStrategy } from './markdown/index.js';
export { AsciiDocFormatStrategy, asciidocFormatStrategy } from './asciidoc/index.js';

// ============================================
// Pre-configured Singletons
// ============================================

import { OutputFormatRegistry } from './output-format-registry.js';
import { OutputFormatFactory } from './output-format-factory.js';
import { markdownFormatStrategy } from './markdown/index.js';
import { asciidocFormatStrategy } from './asciidoc/index.js';

/**
 * Global output format registry
 *
 * Pre-configured with Markdown and AsciiDoc strategies.
 */
export const outputFormatRegistry = new OutputFormatRegistry()
  .register(markdownFormatStrategy)
  .register(asciidocFormatStrategy);

/**
 * Global output format factory
 *
 * Pre-configured with the global registry.
 * Provides format creation with normalization and fallback support.
 *
 * @example
 * ```typescript
 * import { outputFormatFactory } from './templates/formats/index.js';
 *
 * // Get the default format (AsciiDoc)
 * const defaultFormat = outputFormatFactory.getDefault();
 *
 * // Create a specific format
 * const markdown = outputFormatFactory.create('md');
 *
 * // Create with fallback for unknown formats
 * const format = outputFormatFactory.createWithFallback('unknown'); // Returns AsciiDoc
 * ```
 */
export const outputFormatFactory = new OutputFormatFactory(outputFormatRegistry);

// ============================================
// Utility Functions
// ============================================

import type { OutputFormatCode } from './output-format-strategy.js';

/**
 * Get an output format strategy by code
 *
 * Convenience function that uses the global factory.
 *
 * @param code - The format code (case-insensitive, supports aliases)
 * @returns The output format strategy
 * @throws Error if the format is not registered
 */
export function getOutputFormatStrategy(code: string) {
  return outputFormatFactory.create(code);
}

/**
 * Get an output format strategy with fallback to default
 *
 * Convenience function that uses the global factory.
 *
 * @param code - The format code (case-insensitive, supports aliases)
 * @returns The output format strategy (requested or default AsciiDoc)
 */
export function getOutputFormatStrategyWithFallback(code: string) {
  return outputFormatFactory.createWithFallback(code);
}

/**
 * Get the default output format strategy (AsciiDoc)
 *
 * Convenience function that uses the global factory.
 *
 * @returns The default (AsciiDoc) format strategy
 */
export function getDefaultOutputFormatStrategy() {
  return outputFormatFactory.getDefault();
}

/**
 * Check if an output format is supported
 *
 * Convenience function that uses the global factory.
 *
 * @param code - The format code to check
 * @returns True if the format is supported
 */
export function isOutputFormatSupported(code: string): boolean {
  return outputFormatFactory.isSupported(code);
}

/**
 * Get all supported output format codes
 *
 * @returns Array of supported format codes
 */
export function getSupportedOutputFormatCodes(): OutputFormatCode[] {
  return outputFormatFactory.getAvailableCodes();
}

/**
 * Detect the output format from a file extension
 *
 * @param extension - The file extension (with or without leading dot)
 * @returns The detected format code, or undefined if not recognized
 */
export function detectOutputFormatFromExtension(extension: string): OutputFormatCode | undefined {
  const ext = extension.startsWith('.') ? extension : '.' + extension;
  const normalizedExt = ext.toLowerCase();

  if (normalizedExt === '.md' || normalizedExt === '.markdown') {
    return 'markdown';
  }

  if (normalizedExt === '.adoc' || normalizedExt === '.asciidoc' || normalizedExt === '.asc') {
    return 'asciidoc';
  }

  return undefined;
}

/**
 * Detect the output format from a filename
 *
 * @param filename - The filename to analyze
 * @returns The detected format code, or undefined if not recognized
 */
export function detectOutputFormatFromFilename(filename: string): OutputFormatCode | undefined {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) {
    return undefined;
  }

  const extension = filename.substring(lastDot);
  return detectOutputFormatFromExtension(extension);
}
