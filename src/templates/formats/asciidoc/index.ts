/**
 * AsciiDoc Format Strategy
 *
 * Implements the OutputFormatStrategy interface for AsciiDoc format.
 * Generates valid AsciiDoc syntax compatible with Asciidoctor.
 *
 * @module templates/formats/asciidoc
 *
 * S.O.L.I.D Principles:
 * - SRP (Single Responsibility Principle): Only handles AsciiDoc syntax generation
 * - LSP (Liskov Substitution Principle): Can replace any OutputFormatStrategy
 *
 * Design Patterns:
 * - Strategy Pattern: Interchangeable format implementation
 */

import type { OutputFormatStrategy, OutputFormatCode } from '../output-format-strategy.js';

/**
 * AsciiDoc Format Strategy
 *
 * Generates content in AsciiDoc format compatible with Asciidoctor.
 * This is the default format for new arc42 documentation projects.
 *
 * @example
 * ```typescript
 * const asciidoc = new AsciiDocFormatStrategy();
 *
 * asciidoc.formatHeading('Hello', 1);  // '= Hello'
 * asciidoc.formatBold('text');          // '*text*'
 * asciidoc.formatCode('const x = 1;', 'typescript');
 * ```
 */
export class AsciiDocFormatStrategy implements OutputFormatStrategy {
  /**
   * Format code identifier
   */
  readonly code: OutputFormatCode = 'asciidoc';

  /**
   * Human-readable format name
   */
  readonly name: string = 'AsciiDoc';

  /**
   * File extension for AsciiDoc files
   */
  readonly fileExtension: string = '.adoc';

  /**
   * Format a heading at the specified level
   *
   * Uses = prefix notation (= Title, == Section, === Subsection).
   *
   * @param text - The heading text
   * @param level - Heading level (1-6)
   * @returns AsciiDoc heading (e.g., '== Heading')
   */
  formatHeading(text: string, level: number): string {
    const clampedLevel = Math.max(1, Math.min(6, level));
    return '='.repeat(clampedLevel) + ' ' + text;
  }

  /**
   * Format text as bold
   *
   * @param text - The text to make bold
   * @returns Bold text with * wrapper
   */
  formatBold(text: string): string {
    return `*${text}*`;
  }

  /**
   * Format text as italic
   *
   * @param text - The text to make italic
   * @returns Italic text with _ wrapper
   */
  formatItalic(text: string): string {
    return `_${text}_`;
  }

  /**
   * Format a code block with optional language
   *
   * Uses [source,language] attribute with ---- delimiters.
   *
   * @param code - The code content
   * @param language - Optional language identifier for syntax highlighting
   * @returns AsciiDoc source block
   */
  formatCode(code: string, language?: string): string {
    const sourceAttr = language ? `[source,${language}]` : '[source]';
    return sourceAttr + '\n----\n' + code + '\n----';
  }

  /**
   * Format inline code
   *
   * Uses backtick wrapper (same as Markdown for compatibility).
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
   * Uses * prefix for each item.
   *
   * @param items - Array of list items
   * @returns Formatted unordered list
   */
  formatUnorderedList(items: string[]): string {
    return items.map(item => `* ${item}`).join('\n');
  }

  /**
   * Format an ordered (numbered) list
   *
   * Uses . prefix for each item (AsciiDoc auto-numbers).
   *
   * @param items - Array of list items
   * @returns Formatted ordered list
   */
  formatOrderedList(items: string[]): string {
    return items.map(item => `. ${item}`).join('\n');
  }

  /**
   * Format a hyperlink
   *
   * Uses link:url[text] syntax.
   *
   * @param text - Link display text
   * @param url - Link URL
   * @returns AsciiDoc link
   */
  formatLink(text: string, url: string): string {
    return `link:${url}[${text}]`;
  }

  /**
   * Format an image
   *
   * Uses image::url[alt] syntax.
   *
   * @param alt - Alternative text for the image
   * @param url - Image URL or path
   * @returns AsciiDoc image macro
   */
  formatImage(alt: string, url: string): string {
    return `image::${url}[${alt}]`;
  }

  /**
   * Format a table
   *
   * Creates an AsciiDoc table with |=== delimiters.
   *
   * @param headers - Array of column headers
   * @param rows - 2D array of row data
   * @returns Formatted AsciiDoc table
   */
  formatTable(headers: string[], rows: string[][]): string {
    if (headers.length === 0) {
      return '';
    }

    const lines: string[] = [];

    // Table start
    lines.push('[cols="' + headers.map(() => '1').join(',') + '", options="header"]');
    lines.push('|===');

    // Header row
    lines.push(headers.map(h => `| ${h}`).join(' '));

    // Data rows
    for (const row of rows) {
      lines.push('');
      lines.push(row.map(cell => `| ${cell}`).join(' '));
    }

    // Table end
    lines.push('|===');

    return lines.join('\n');
  }

  /**
   * Format a blockquote
   *
   * Uses ____ block delimiters for quote blocks.
   *
   * @param text - The quote text (may contain newlines)
   * @returns Formatted blockquote
   */
  formatBlockquote(text: string): string {
    return '[quote]\n____\n' + text + '\n____';
  }

  /**
   * Format a horizontal rule/divider
   *
   * @returns AsciiDoc thematic break
   */
  formatHorizontalRule(): string {
    return "'''";
  }

  /**
   * Format an anchor/bookmark
   *
   * Uses [[id]] syntax for explicit anchors.
   *
   * @param id - The anchor identifier
   * @returns AsciiDoc anchor
   */
  formatAnchor(id: string): string {
    return `[[${id}]]`;
  }

  /**
   * Get the README filename for AsciiDoc
   *
   * @returns 'README.adoc'
   */
  getReadmeFilename(): string {
    return 'README.adoc';
  }

  /**
   * Get the section filename with .adoc extension
   *
   * @param section - The section identifier
   * @returns Section filename with .adoc extension
   */
  getSectionFilename(section: string): string {
    return `${section}.adoc`;
  }
}

/**
 * Singleton instance of the AsciiDoc format strategy
 */
export const asciidocFormatStrategy = new AsciiDocFormatStrategy();
