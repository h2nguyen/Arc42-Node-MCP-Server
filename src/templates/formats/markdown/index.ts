/**
 * Markdown Format Strategy
 *
 * Implements the OutputFormatStrategy interface for Markdown format.
 * Generates valid GitHub Flavored Markdown (GFM) syntax.
 *
 * @module templates/formats/markdown
 *
 * S.O.L.I.D Principles:
 * - SRP (Single Responsibility Principle): Only handles Markdown syntax generation
 * - LSP (Liskov Substitution Principle): Can replace any OutputFormatStrategy
 *
 * Design Patterns:
 * - Strategy Pattern: Interchangeable format implementation
 */

import type { OutputFormatStrategy, OutputFormatCode } from '../output-format-strategy.js';

/**
 * Markdown Format Strategy
 *
 * Generates content in Markdown format using GitHub Flavored Markdown syntax.
 *
 * @example
 * ```typescript
 * const markdown = new MarkdownFormatStrategy();
 *
 * markdown.formatHeading('Hello', 1);  // '# Hello'
 * markdown.formatBold('text');          // '**text**'
 * markdown.formatCode('const x = 1;', 'typescript');
 * ```
 */
export class MarkdownFormatStrategy implements OutputFormatStrategy {
  /**
   * Format code identifier
   */
  readonly code: OutputFormatCode = 'markdown';

  /**
   * Human-readable format name
   */
  readonly name: string = 'Markdown';

  /**
   * File extension for Markdown files
   */
  readonly fileExtension: string = '.md';

  /**
   * Format a heading at the specified level
   *
   * Uses ATX-style headings with # prefix.
   *
   * @param text - The heading text
   * @param level - Heading level (1-6)
   * @returns Markdown heading (e.g., '## Heading')
   */
  formatHeading(text: string, level: number): string {
    const clampedLevel = Math.max(1, Math.min(6, level));
    return '#'.repeat(clampedLevel) + ' ' + text;
  }

  /**
   * Format text as bold
   *
   * @param text - The text to make bold
   * @returns Bold text with ** wrapper
   */
  formatBold(text: string): string {
    return `**${text}**`;
  }

  /**
   * Format text as italic
   *
   * @param text - The text to make italic
   * @returns Italic text with * wrapper
   */
  formatItalic(text: string): string {
    return `*${text}*`;
  }

  /**
   * Format a code block with optional language
   *
   * Uses fenced code blocks with triple backticks.
   *
   * @param code - The code content
   * @param language - Optional language identifier for syntax highlighting
   * @returns Fenced code block
   */
  formatCode(code: string, language?: string): string {
    const lang = language ?? '';
    return '```' + lang + '\n' + code + '\n```';
  }

  /**
   * Format inline code
   *
   * @param text - The code text
   * @returns Inline code with backtick wrapper
   */
  formatInlineCode(text: string): string {
    return '`' + text + '`';
  }

  /**
   * Format an unordered (bulleted) list
   *
   * Uses - prefix for each item.
   *
   * @param items - Array of list items
   * @returns Formatted unordered list
   */
  formatUnorderedList(items: string[]): string {
    return items.map(item => `- ${item}`).join('\n');
  }

  /**
   * Format an ordered (numbered) list
   *
   * Uses 1. 2. 3. prefix for each item.
   *
   * @param items - Array of list items
   * @returns Formatted ordered list
   */
  formatOrderedList(items: string[]): string {
    return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
  }

  /**
   * Format a hyperlink
   *
   * @param text - Link display text
   * @param url - Link URL
   * @returns Markdown link [text](url)
   */
  formatLink(text: string, url: string): string {
    return `[${text}](${url})`;
  }

  /**
   * Format an image
   *
   * @param alt - Alternative text for the image
   * @param url - Image URL or path
   * @returns Markdown image ![alt](url)
   */
  formatImage(alt: string, url: string): string {
    return `![${alt}](${url})`;
  }

  /**
   * Format a table
   *
   * Creates a GFM-style pipe table with header separator.
   *
   * @param headers - Array of column headers
   * @param rows - 2D array of row data
   * @returns Formatted Markdown table
   */
  formatTable(headers: string[], rows: string[][]): string {
    if (headers.length === 0) {
      return '';
    }

    const headerRow = '| ' + headers.join(' | ') + ' |';
    const separatorRow = '| ' + headers.map(() => '---').join(' | ') + ' |';
    const dataRows = rows.map(row => '| ' + row.join(' | ') + ' |');

    return [headerRow, separatorRow, ...dataRows].join('\n');
  }

  /**
   * Format a blockquote
   *
   * Prefixes each line with >.
   *
   * @param text - The quote text (may contain newlines)
   * @returns Formatted blockquote
   */
  formatBlockquote(text: string): string {
    return text.split('\n').map(line => `> ${line}`).join('\n');
  }

  /**
   * Format a horizontal rule/divider
   *
   * @returns Markdown horizontal rule
   */
  formatHorizontalRule(): string {
    return '---';
  }

  /**
   * Format an anchor/bookmark
   *
   * Markdown auto-generates anchors from headings, so this returns empty string.
   * Explicit anchors can be added using HTML if needed.
   *
   * @param id - The anchor identifier (not used in standard Markdown)
   * @returns Empty string (Markdown uses auto-generated heading anchors)
   */
  formatAnchor(_id: string): string {
    // Markdown auto-generates anchors from headings
    // Return empty string as explicit anchors aren't standard in GFM
    return '';
  }

  /**
   * Get the README filename for Markdown
   *
   * @returns 'README.md'
   */
  getReadmeFilename(): string {
    return 'README.md';
  }

  /**
   * Get the section filename with .md extension
   *
   * @param section - The section identifier
   * @returns Section filename with .md extension
   */
  getSectionFilename(section: string): string {
    return `${section}.md`;
  }
}

/**
 * Singleton instance of the Markdown format strategy
 */
export const markdownFormatStrategy = new MarkdownFormatStrategy();
