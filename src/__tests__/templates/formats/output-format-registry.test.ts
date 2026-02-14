/**
 * Tests for OutputFormatRegistry
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { OutputFormatRegistry } from '../../../templates/formats/output-format-registry.js';
import type { OutputFormatStrategy } from '../../../templates/formats/output-format-strategy.js';

// Mock format strategy for testing
function createMockStrategy(code: 'markdown' | 'asciidoc', name: string): OutputFormatStrategy {
  return {
    code,
    name,
    fileExtension: code === 'markdown' ? '.md' : '.adoc',
    formatHeading: (text, level) => '#'.repeat(level) + ' ' + text,
    formatBold: (text) => `**${text}**`,
    formatItalic: (text) => `*${text}*`,
    formatCode: (code, lang) => '```' + (lang ?? '') + '\n' + code + '\n```',
    formatInlineCode: (text) => '`' + text + '`',
    formatUnorderedList: (items) => items.map(i => `- ${i}`).join('\n'),
    formatOrderedList: (items) => items.map((i, idx) => `${idx + 1}. ${i}`).join('\n'),
    formatLink: (text, url) => `[${text}](${url})`,
    formatImage: (alt, url) => `![${alt}](${url})`,
    formatTable: () => '',
    formatBlockquote: (text) => text.split('\n').map(l => `> ${l}`).join('\n'),
    formatHorizontalRule: () => '---',
    formatAnchor: () => '',
    getReadmeFilename: () => code === 'markdown' ? 'README.md' : 'README.adoc',
    getSectionFilename: (section) => `${section}${code === 'markdown' ? '.md' : '.adoc'}`
  };
}

describe('OutputFormatRegistry', () => {
  let registry: OutputFormatRegistry;
  let markdownStrategy: OutputFormatStrategy;
  let asciidocStrategy: OutputFormatStrategy;

  beforeEach(() => {
    registry = new OutputFormatRegistry();
    markdownStrategy = createMockStrategy('markdown', 'Markdown');
    asciidocStrategy = createMockStrategy('asciidoc', 'AsciiDoc');
  });

  describe('register', () => {
    it('should register a strategy', () => {
      registry.register(markdownStrategy);
      expect(registry.size).toBe(1);
    });

    it('should support method chaining', () => {
      const result = registry.register(markdownStrategy);
      expect(result).toBe(registry);
    });

    it('should allow registering multiple strategies', () => {
      registry.register(markdownStrategy).register(asciidocStrategy);
      expect(registry.size).toBe(2);
    });

    it('should overwrite existing strategy with same code', () => {
      const newMarkdownStrategy = createMockStrategy('markdown', 'New Markdown');
      registry.register(markdownStrategy);
      registry.register(newMarkdownStrategy);
      expect(registry.size).toBe(1);
      expect(registry.get('markdown')?.name).toBe('New Markdown');
    });
  });

  describe('get', () => {
    beforeEach(() => {
      registry.register(markdownStrategy).register(asciidocStrategy);
    });

    it('should return registered strategy', () => {
      const result = registry.get('markdown');
      expect(result).toBe(markdownStrategy);
    });

    it('should return undefined for unknown format', () => {
      const result = registry.get('unknown');
      expect(result).toBeUndefined();
    });

    it('should be case-insensitive', () => {
      expect(registry.get('MARKDOWN')).toBe(markdownStrategy);
      expect(registry.get('Markdown')).toBe(markdownStrategy);
      expect(registry.get('ASCIIDOC')).toBe(asciidocStrategy);
      expect(registry.get('AsciiDoc')).toBe(asciidocStrategy);
    });

    it('should handle whitespace', () => {
      expect(registry.get('  markdown  ')).toBe(markdownStrategy);
    });
  });

  describe('getOrThrow', () => {
    it('should return registered strategy', () => {
      registry.register(markdownStrategy).register(asciidocStrategy);
      const result = registry.getOrThrow('markdown');
      expect(result).toBe(markdownStrategy);
    });

    it('should throw for unknown format with descriptive message', () => {
      registry.register(markdownStrategy).register(asciidocStrategy);
      expect(() => registry.getOrThrow('unknown')).toThrow(
        'Output format "unknown" is not registered. Available formats: markdown, asciidoc'
      );
    });

    it('should be case-insensitive', () => {
      registry.register(markdownStrategy).register(asciidocStrategy);
      expect(registry.getOrThrow('MARKDOWN')).toBe(markdownStrategy);
    });

    it('should throw with "none" when registry is empty', () => {
      // Registry is empty - no strategies registered
      expect(() => registry.getOrThrow('unknown')).toThrow(
        'Output format "unknown" is not registered. Available formats: none'
      );
    });

    it('should normalize format code in error message', () => {
      expect(() => registry.getOrThrow('  UNKNOWN  ')).toThrow(
        'Output format "unknown" is not registered. Available formats: none'
      );
    });
  });

  describe('getAll', () => {
    it('should return empty array when no strategies registered', () => {
      expect(registry.getAll()).toEqual([]);
    });

    it('should return all registered strategies', () => {
      registry.register(markdownStrategy).register(asciidocStrategy);
      const all = registry.getAll();
      expect(all).toHaveLength(2);
      expect(all).toContain(markdownStrategy);
      expect(all).toContain(asciidocStrategy);
    });

    it('should return a copy, not the internal collection', () => {
      registry.register(markdownStrategy);
      const all1 = registry.getAll();
      const all2 = registry.getAll();
      expect(all1).not.toBe(all2);
    });
  });

  describe('isSupported', () => {
    beforeEach(() => {
      registry.register(markdownStrategy).register(asciidocStrategy);
    });

    it('should return true for registered format', () => {
      expect(registry.isSupported('markdown')).toBe(true);
      expect(registry.isSupported('asciidoc')).toBe(true);
    });

    it('should return false for unknown format', () => {
      expect(registry.isSupported('unknown')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(registry.isSupported('MARKDOWN')).toBe(true);
      expect(registry.isSupported('AsciiDoc')).toBe(true);
    });
  });

  describe('getAvailableCodes', () => {
    it('should return empty array when no strategies registered', () => {
      expect(registry.getAvailableCodes()).toEqual([]);
    });

    it('should return all registered codes', () => {
      registry.register(markdownStrategy).register(asciidocStrategy);
      const codes = registry.getAvailableCodes();
      expect(codes).toHaveLength(2);
      expect(codes).toContain('markdown');
      expect(codes).toContain('asciidoc');
    });
  });

  describe('getDefault', () => {
    it('should return undefined when asciidoc is not registered', () => {
      registry.register(markdownStrategy);
      expect(registry.getDefault()).toBeUndefined();
    });

    it('should return asciidoc strategy when registered', () => {
      registry.register(markdownStrategy).register(asciidocStrategy);
      expect(registry.getDefault()).toBe(asciidocStrategy);
    });
  });

  describe('size', () => {
    it('should return 0 for empty registry', () => {
      expect(registry.size).toBe(0);
    });

    it('should return correct count', () => {
      registry.register(markdownStrategy);
      expect(registry.size).toBe(1);
      registry.register(asciidocStrategy);
      expect(registry.size).toBe(2);
    });
  });

  describe('clear', () => {
    it('should remove all strategies', () => {
      registry.register(markdownStrategy).register(asciidocStrategy);
      expect(registry.size).toBe(2);
      registry.clear();
      expect(registry.size).toBe(0);
    });

    it('should support method chaining', () => {
      const result = registry.clear();
      expect(result).toBe(registry);
    });
  });
});
