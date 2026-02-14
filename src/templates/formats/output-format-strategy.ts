/**
 * Output Format Strategy
 *
 * Defines the interface for output format strategies that handle
 * format-specific syntax generation (Markdown, AsciiDoc, etc.).
 *
 * @module templates/formats/output-format-strategy
 *
 * S.O.L.I.D Principles:
 * - SRP (Single Responsibility Principle): Each strategy only handles
 *   format-specific syntax generation
 * - ISP (Interface Segregation Principle): Focused interface with only
 *   necessary methods for format conversion
 *
 * Design Patterns:
 * - Strategy Pattern: Interchangeable format implementations
 */

/**
 * Supported output format codes
 */
export type OutputFormatCode = 'markdown' | 'asciidoc';

/**
 * Array of all supported output format codes
 */
export const SUPPORTED_OUTPUT_FORMAT_CODES: readonly OutputFormatCode[] = [
  'markdown',
  'asciidoc'
] as const;

/**
 * Alias mappings for format code normalization
 *
 * Maps common format aliases to their canonical format codes.
 * Used by OutputFormatFactory for flexible format specification.
 */
export const OUTPUT_FORMAT_ALIASES: Record<string, OutputFormatCode> = {
  // Markdown aliases
  'md': 'markdown',
  'markdown': 'markdown',
  'mdown': 'markdown',
  'mkd': 'markdown',

  // AsciiDoc aliases
  'adoc': 'asciidoc',
  'asciidoc': 'asciidoc',
  'ascii': 'asciidoc',
  'asciidoctor': 'asciidoc',
  'asc': 'asciidoc'
};

/**
 * Default output format when not specified
 *
 * AsciiDoc is the default format for new projects.
 */
export const DEFAULT_OUTPUT_FORMAT: OutputFormatCode = 'asciidoc';

/**
 * Output Format Strategy Interface
 *
 * Defines the contract for all output format implementations.
 * Each format strategy converts content to its specific syntax.
 *
 * @example
 * ```typescript
 * class MarkdownFormatStrategy implements OutputFormatStrategy {
 *   code = 'markdown' as const;
 *   name = 'Markdown';
 *   fileExtension = '.md';
 *
 *   formatHeading(text: string, level: number): string {
 *     return '#'.repeat(level) + ' ' + text;
 *   }
 *   // ... other methods
 * }
 * ```
 */
export interface OutputFormatStrategy {
  /**
   * Unique format code identifier
   */
  readonly code: OutputFormatCode;

  /**
   * Human-readable format name
   */
  readonly name: string;

  /**
   * File extension for this format (including dot)
   */
  readonly fileExtension: string;

  // ============================================
  // Text Formatting Methods
  // ============================================

  /**
   * Format a heading at the specified level
   *
   * @param text - The heading text
   * @param level - Heading level (1-6)
   * @returns Formatted heading string
   */
  formatHeading(text: string, level: number): string;

  /**
   * Format text as bold
   *
   * @param text - The text to make bold
   * @returns Bold formatted text
   */
  formatBold(text: string): string;

  /**
   * Format text as italic
   *
   * @param text - The text to make italic
   * @returns Italic formatted text
   */
  formatItalic(text: string): string;

  /**
   * Format a code block with optional language
   *
   * @param code - The code content
   * @param language - Optional language identifier for syntax highlighting
   * @returns Formatted code block
   */
  formatCode(code: string, language?: string): string;

  /**
   * Format inline code
   *
   * @param text - The code text
   * @returns Inline code formatted text
   */
  formatInlineCode(text: string): string;

  // ============================================
  // List Methods
  // ============================================

  /**
   * Format an unordered (bulleted) list
   *
   * @param items - Array of list items
   * @returns Formatted unordered list
   */
  formatUnorderedList(items: string[]): string;

  /**
   * Format an ordered (numbered) list
   *
   * @param items - Array of list items
   * @returns Formatted ordered list
   */
  formatOrderedList(items: string[]): string;

  // ============================================
  // Link and Media Methods
  // ============================================

  /**
   * Format a hyperlink
   *
   * @param text - Link display text
   * @param url - Link URL
   * @returns Formatted link
   */
  formatLink(text: string, url: string): string;

  /**
   * Format an image
   *
   * @param alt - Alternative text for the image
   * @param url - Image URL or path
   * @returns Formatted image reference
   */
  formatImage(alt: string, url: string): string;

  // ============================================
  // Structural Methods
  // ============================================

  /**
   * Format a table
   *
   * @param headers - Array of column headers
   * @param rows - 2D array of row data
   * @returns Formatted table
   */
  formatTable(headers: string[], rows: string[][]): string;

  /**
   * Format a blockquote
   *
   * @param text - The quote text (may contain newlines)
   * @returns Formatted blockquote
   */
  formatBlockquote(text: string): string;

  /**
   * Format a horizontal rule/divider
   *
   * @returns Formatted horizontal rule
   */
  formatHorizontalRule(): string;

  /**
   * Format an anchor/bookmark
   *
   * @param id - The anchor identifier
   * @returns Formatted anchor (maybe empty for formats that auto-generate anchors)
   */
  formatAnchor(id: string): string;

  // ============================================
  // File Naming Methods
  // ============================================

  /**
   * Get the README filename for this format
   *
   * @returns README filename (e.g., 'README.md', 'README.adoc')
   */
  getReadmeFilename(): string;

  /**
   * Get the section filename for a given section
   *
   * @param section - The section identifier
   * @returns Section filename with appropriate extension
   */
  getSectionFilename(section: string): string;
}

/**
 * Type guard to check if a string is a valid OutputFormatCode
 *
 * @param code - The code to check
 * @returns True if the code is a valid OutputFormatCode
 */
export function isOutputFormatCode(code: string): code is OutputFormatCode {
  return SUPPORTED_OUTPUT_FORMAT_CODES.includes(code as OutputFormatCode);
}

/**
 * Normalize a format code string to its canonical form
 *
 * @param code - The format code to normalize (case-insensitive)
 * @returns The normalized format code, or undefined if not recognized
 */
export function normalizeOutputFormatCode(code: string): OutputFormatCode | undefined {
  const normalized = code.trim().toLowerCase();
  return OUTPUT_FORMAT_ALIASES[normalized];
}
