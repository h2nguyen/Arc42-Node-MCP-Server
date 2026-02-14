/**
 * Tests for AsciiDocFormatStrategy
 */

import { describe, it, expect } from 'vitest';
import { AsciiDocFormatStrategy, asciidocFormatStrategy } from '../../../../templates/formats/asciidoc/index.js';

describe('AsciiDocFormatStrategy', () => {
  const strategy = new AsciiDocFormatStrategy();

  describe('metadata', () => {
    it('should have code "asciidoc"', () => {
      expect(strategy.code).toBe('asciidoc');
    });

    it('should have name "AsciiDoc"', () => {
      expect(strategy.name).toBe('AsciiDoc');
    });

    it('should have file extension ".adoc"', () => {
      expect(strategy.fileExtension).toBe('.adoc');
    });
  });

  describe('formatHeading', () => {
    it('should format level 1 heading with single =', () => {
      expect(strategy.formatHeading('Title', 1)).toBe('= Title');
    });

    it('should format level 2 heading with double =', () => {
      expect(strategy.formatHeading('Section', 2)).toBe('== Section');
    });

    it('should format level 3 heading with triple =', () => {
      expect(strategy.formatHeading('Subsection', 3)).toBe('=== Subsection');
    });

    it('should format level 6 heading', () => {
      expect(strategy.formatHeading('Deep', 6)).toBe('====== Deep');
    });

    it('should clamp level to minimum 1', () => {
      expect(strategy.formatHeading('Title', 0)).toBe('= Title');
      expect(strategy.formatHeading('Title', -1)).toBe('= Title');
    });

    it('should clamp level to maximum 6', () => {
      expect(strategy.formatHeading('Title', 7)).toBe('====== Title');
      expect(strategy.formatHeading('Title', 100)).toBe('====== Title');
    });
  });

  describe('formatBold', () => {
    it('should wrap text with single asterisks', () => {
      expect(strategy.formatBold('important')).toBe('*important*');
    });

    it('should handle empty string', () => {
      expect(strategy.formatBold('')).toBe('**');
    });
  });

  describe('formatItalic', () => {
    it('should wrap text with underscores', () => {
      expect(strategy.formatItalic('emphasized')).toBe('_emphasized_');
    });

    it('should handle empty string', () => {
      expect(strategy.formatItalic('')).toBe('__');
    });
  });

  describe('formatCode', () => {
    it('should create source block without language', () => {
      const result = strategy.formatCode('const x = 1;');
      expect(result).toBe('[source]\n----\nconst x = 1;\n----');
    });

    it('should create source block with language', () => {
      const result = strategy.formatCode('const x = 1;', 'typescript');
      expect(result).toBe('[source,typescript]\n----\nconst x = 1;\n----');
    });

    it('should handle multiline code', () => {
      const code = 'function hello() {\n  return "world";\n}';
      const result = strategy.formatCode(code, 'javascript');
      expect(result).toBe('[source,javascript]\n----\nfunction hello() {\n  return "world";\n}\n----');
    });
  });

  describe('formatInlineCode', () => {
    it('should wrap text with backticks', () => {
      expect(strategy.formatInlineCode('variable')).toBe('`variable`');
    });

    it('should handle empty string', () => {
      expect(strategy.formatInlineCode('')).toBe('``');
    });
  });

  describe('formatUnorderedList', () => {
    it('should format single item with asterisk', () => {
      expect(strategy.formatUnorderedList(['Item'])).toBe('* Item');
    });

    it('should format multiple items', () => {
      const result = strategy.formatUnorderedList(['First', 'Second', 'Third']);
      expect(result).toBe('* First\n* Second\n* Third');
    });

    it('should handle empty array', () => {
      expect(strategy.formatUnorderedList([])).toBe('');
    });
  });

  describe('formatOrderedList', () => {
    it('should format single item with dot', () => {
      expect(strategy.formatOrderedList(['Item'])).toBe('. Item');
    });

    it('should format multiple items with dots (AsciiDoc auto-numbers)', () => {
      const result = strategy.formatOrderedList(['First', 'Second', 'Third']);
      expect(result).toBe('. First\n. Second\n. Third');
    });

    it('should handle empty array', () => {
      expect(strategy.formatOrderedList([])).toBe('');
    });
  });

  describe('formatLink', () => {
    it('should format link correctly', () => {
      expect(strategy.formatLink('Click here', 'https://example.com')).toBe('link:https://example.com[Click here]');
    });

    it('should handle relative URLs', () => {
      expect(strategy.formatLink('File', './file.adoc')).toBe('link:./file.adoc[File]');
    });
  });

  describe('formatImage', () => {
    it('should format image correctly', () => {
      expect(strategy.formatImage('Logo', 'logo.png')).toBe('image::logo.png[Logo]');
    });

    it('should handle empty alt text', () => {
      expect(strategy.formatImage('', 'image.jpg')).toBe('image::image.jpg[]');
    });
  });

  describe('formatTable', () => {
    it('should format table with headers and rows', () => {
      const result = strategy.formatTable(
        ['Name', 'Value'],
        [['foo', '1'], ['bar', '2']]
      );
      expect(result).toBe(
        '[cols="1,1", options="header"]\n' +
        '|===\n' +
        '| Name | Value\n' +
        '\n' +
        '| foo | 1\n' +
        '\n' +
        '| bar | 2\n' +
        '|==='
      );
    });

    it('should handle single column', () => {
      const result = strategy.formatTable(['Item'], [['A'], ['B']]);
      expect(result).toBe(
        '[cols="1", options="header"]\n' +
        '|===\n' +
        '| Item\n' +
        '\n' +
        '| A\n' +
        '\n' +
        '| B\n' +
        '|==='
      );
    });

    it('should handle empty headers', () => {
      expect(strategy.formatTable([], [])).toBe('');
    });

    it('should handle empty rows', () => {
      const result = strategy.formatTable(['Header'], []);
      expect(result).toBe(
        '[cols="1", options="header"]\n' +
        '|===\n' +
        '| Header\n' +
        '|==='
      );
    });
  });

  describe('formatBlockquote', () => {
    it('should create quote block', () => {
      expect(strategy.formatBlockquote('Quote')).toBe('[quote]\n____\nQuote\n____');
    });

    it('should handle multiline text', () => {
      const result = strategy.formatBlockquote('Line 1\nLine 2');
      expect(result).toBe('[quote]\n____\nLine 1\nLine 2\n____');
    });

    it('should handle empty string', () => {
      expect(strategy.formatBlockquote('')).toBe('[quote]\n____\n\n____');
    });
  });

  describe('formatHorizontalRule', () => {
    it("should return '''", () => {
      expect(strategy.formatHorizontalRule()).toBe("'''");
    });
  });

  describe('formatAnchor', () => {
    it('should return [[id]] format', () => {
      expect(strategy.formatAnchor('section-1')).toBe('[[section-1]]');
    });

    it('should handle complex IDs', () => {
      expect(strategy.formatAnchor('my-complex_id-123')).toBe('[[my-complex_id-123]]');
    });
  });

  describe('getReadmeFilename', () => {
    it('should return README.adoc', () => {
      expect(strategy.getReadmeFilename()).toBe('README.adoc');
    });
  });

  describe('getSectionFilename', () => {
    it('should return section name with .adoc extension', () => {
      expect(strategy.getSectionFilename('01_introduction')).toBe('01_introduction.adoc');
    });
  });

  describe('singleton', () => {
    it('should export asciidocFormatStrategy singleton', () => {
      expect(asciidocFormatStrategy).toBeInstanceOf(AsciiDocFormatStrategy);
    });

    it('should be a single instance', () => {
      expect(asciidocFormatStrategy.code).toBe('asciidoc');
    });
  });
});
