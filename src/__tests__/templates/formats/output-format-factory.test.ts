/**
 * Tests for OutputFormatFactory
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OutputFormatRegistry } from '../../../templates/formats/output-format-registry.js';
import { OutputFormatFactory } from '../../../templates/formats/output-format-factory.js';
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

describe('OutputFormatFactory', () => {
  let registry: OutputFormatRegistry;
  let factory: OutputFormatFactory;
  let markdownStrategy: OutputFormatStrategy;
  let asciidocStrategy: OutputFormatStrategy;

  beforeEach(() => {
    registry = new OutputFormatRegistry();
    markdownStrategy = createMockStrategy('markdown', 'Markdown');
    asciidocStrategy = createMockStrategy('asciidoc', 'AsciiDoc');
    registry.register(markdownStrategy).register(asciidocStrategy);
    factory = new OutputFormatFactory(registry);
  });

  describe('normalizeCode', () => {
    it('should normalize md to markdown', () => {
      expect(factory.normalizeCode('md')).toBe('markdown');
    });

    it('should normalize MARKDOWN to markdown', () => {
      expect(factory.normalizeCode('MARKDOWN')).toBe('markdown');
    });

    it('should normalize adoc to asciidoc', () => {
      expect(factory.normalizeCode('adoc')).toBe('asciidoc');
    });

    it('should normalize ASCIIDOC to asciidoc', () => {
      expect(factory.normalizeCode('ASCIIDOC')).toBe('asciidoc');
    });

    it('should handle unknown codes by lowercasing', () => {
      expect(factory.normalizeCode('UNKNOWN')).toBe('unknown');
    });

    it('should trim whitespace', () => {
      expect(factory.normalizeCode('  md  ')).toBe('markdown');
    });
  });

  describe('create', () => {
    it('should return markdown strategy for md', () => {
      const result = factory.create('md');
      expect(result).toBe(markdownStrategy);
    });

    it('should return markdown strategy for MARKDOWN', () => {
      const result = factory.create('MARKDOWN');
      expect(result).toBe(markdownStrategy);
    });

    it('should return asciidoc strategy for adoc', () => {
      const result = factory.create('adoc');
      expect(result).toBe(asciidocStrategy);
    });

    it('should return asciidoc strategy for ASCIIDOC', () => {
      const result = factory.create('ASCIIDOC');
      expect(result).toBe(asciidocStrategy);
    });

    it('should throw for unknown format', () => {
      expect(() => factory.create('unknown')).toThrow(
        'Output format "unknown" is not registered. Available formats: markdown, asciidoc'
      );
    });
  });

  describe('createWithFallback', () => {
    it('should return requested strategy when found', () => {
      const result = factory.createWithFallback('md');
      expect(result).toBe(markdownStrategy);
    });

    it('should fall back to asciidoc for unknown format', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const result = factory.createWithFallback('unknown');
      expect(result).toBe(asciidocStrategy);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Unknown output format "unknown". Falling back to AsciiDoc.')
      );

      warnSpy.mockRestore();
    });

    it('should throw when no default is registered', () => {
      const emptyRegistry = new OutputFormatRegistry();
      emptyRegistry.register(markdownStrategy);
      const factoryNoDefault = new OutputFormatFactory(emptyRegistry);

      expect(() => factoryNoDefault.createWithFallback('unknown')).toThrow(
        'Output format "unknown" is not supported and no default format is registered.'
      );
    });
  });

  describe('isSupported', () => {
    it('should return true for supported formats', () => {
      expect(factory.isSupported('markdown')).toBe(true);
      expect(factory.isSupported('md')).toBe(true);
      expect(factory.isSupported('asciidoc')).toBe(true);
      expect(factory.isSupported('adoc')).toBe(true);
    });

    it('should return false for unknown formats', () => {
      expect(factory.isSupported('unknown')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(factory.isSupported('MARKDOWN')).toBe(true);
      expect(factory.isSupported('MD')).toBe(true);
    });
  });

  describe('getAvailableCodes', () => {
    it('should return all available codes', () => {
      const codes = factory.getAvailableCodes();
      expect(codes).toContain('markdown');
      expect(codes).toContain('asciidoc');
    });
  });

  describe('getDefault', () => {
    it('should return asciidoc strategy', () => {
      const result = factory.getDefault();
      expect(result).toBe(asciidocStrategy);
    });

    it('should throw when default not registered', () => {
      const emptyRegistry = new OutputFormatRegistry();
      emptyRegistry.register(markdownStrategy);
      const factoryNoDefault = new OutputFormatFactory(emptyRegistry);

      expect(() => factoryNoDefault.getDefault()).toThrow(
        'Default output format "asciidoc" is not registered.'
      );
    });
  });

  describe('getDefaultCode', () => {
    it('should return asciidoc', () => {
      expect(factory.getDefaultCode()).toBe('asciidoc');
    });
  });

  describe('getAllAliases', () => {
    it('should return all aliases', () => {
      const aliases = factory.getAllAliases();
      expect(aliases).toContain('md');
      expect(aliases).toContain('markdown');
      expect(aliases).toContain('adoc');
      expect(aliases).toContain('asciidoc');
    });
  });

  describe('resolveAlias', () => {
    it('should resolve md to markdown', () => {
      expect(factory.resolveAlias('md')).toBe('markdown');
    });

    it('should resolve adoc to asciidoc', () => {
      expect(factory.resolveAlias('adoc')).toBe('asciidoc');
    });

    it('should return undefined for unknown alias', () => {
      expect(factory.resolveAlias('unknown')).toBeUndefined();
    });
  });
});
