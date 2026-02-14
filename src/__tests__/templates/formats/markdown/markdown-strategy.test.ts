/**
 * Tests for MarkdownFormatStrategy
 */

import { describe, it, expect } from 'vitest';
import { MarkdownFormatStrategy, markdownFormatStrategy } from '../../../../templates/formats/markdown/index.js';

describe('MarkdownFormatStrategy', () => {
  const strategy = new MarkdownFormatStrategy();

  describe('metadata', () => {
    it('should have code "markdown"', () => {
      expect(strategy.code).toBe('markdown');
    });

    it('should have name "Markdown"', () => {
      expect(strategy.name).toBe('Markdown');
    });

    it('should have file extension ".md"', () => {
      expect(strategy.fileExtension).toBe('.md');
    });
  });

  describe('formatHeading', () => {
    it('should format level 1 heading', () => {
      expect(strategy.formatHeading('Title', 1)).toBe('# Title');
    });

    it('should format level 2 heading', () => {
      expect(strategy.formatHeading('Section', 2)).toBe('## Section');
    });

    it('should format level 3 heading', () => {
      expect(strategy.formatHeading('Subsection', 3)).toBe('### Subsection');
    });

    it('should format level 6 heading', () => {
      expect(strategy.formatHeading('Deep', 6)).toBe('###### Deep');
    });

    it('should clamp level to minimum 1', () => {
      expect(strategy.formatHeading('Title', 0)).toBe('# Title');
      expect(strategy.formatHeading('Title', -1)).toBe('# Title');
    });

    it('should clamp level to maximum 6', () => {
      expect(strategy.formatHeading('Title', 7)).toBe('###### Title');
      expect(strategy.formatHeading('Title', 100)).toBe('###### Title');
    });
  });

  describe('formatBold', () => {
    it('should wrap text with double asterisks', () => {
      expect(strategy.formatBold('important')).toBe('**important**');
    });

    it('should handle empty string', () => {
      expect(strategy.formatBold('')).toBe('****');
    });
  });

  describe('formatItalic', () => {
    it('should wrap text with single asterisks', () => {
      expect(strategy.formatItalic('emphasized')).toBe('*emphasized*');
    });

    it('should handle empty string', () => {
      expect(strategy.formatItalic('')).toBe('**');
    });
  });

  describe('formatCode', () => {
    it('should create fenced code block without language', () => {
      const result = strategy.formatCode('const x = 1;');
      expect(result).toBe('```\nconst x = 1;\n```');
    });

    it('should create fenced code block with language', () => {
      const result = strategy.formatCode('const x = 1;', 'typescript');
      expect(result).toBe('```typescript\nconst x = 1;\n```');
    });

    it('should handle multiline code', () => {
      const code = 'function hello() {\n  return "world";\n}';
      const result = strategy.formatCode(code, 'javascript');
      expect(result).toBe('```javascript\nfunction hello() {\n  return "world";\n}\n```');
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
    it('should format single item', () => {
      expect(strategy.formatUnorderedList(['Item'])).toBe('- Item');
    });

    it('should format multiple items', () => {
      const result = strategy.formatUnorderedList(['First', 'Second', 'Third']);
      expect(result).toBe('- First\n- Second\n- Third');
    });

    it('should handle empty array', () => {
      expect(strategy.formatUnorderedList([])).toBe('');
    });
  });

  describe('formatOrderedList', () => {
    it('should format single item', () => {
      expect(strategy.formatOrderedList(['Item'])).toBe('1. Item');
    });

    it('should format multiple items with sequential numbers', () => {
      const result = strategy.formatOrderedList(['First', 'Second', 'Third']);
      expect(result).toBe('1. First\n2. Second\n3. Third');
    });

    it('should handle empty array', () => {
      expect(strategy.formatOrderedList([])).toBe('');
    });
  });

  describe('formatLink', () => {
    it('should format link correctly', () => {
      expect(strategy.formatLink('Click here', 'https://example.com')).toBe('[Click here](https://example.com)');
    });

    it('should handle relative URLs', () => {
      expect(strategy.formatLink('File', './file.md')).toBe('[File](./file.md)');
    });
  });

  describe('formatImage', () => {
    it('should format image correctly', () => {
      expect(strategy.formatImage('Logo', 'logo.png')).toBe('![Logo](logo.png)');
    });

    it('should handle empty alt text', () => {
      expect(strategy.formatImage('', 'image.jpg')).toBe('![](image.jpg)');
    });
  });

  describe('formatTable', () => {
    it('should format table with headers and rows', () => {
      const result = strategy.formatTable(
        ['Name', 'Value'],
        [['foo', '1'], ['bar', '2']]
      );
      expect(result).toBe(
        '| Name | Value |\n' +
        '| --- | --- |\n' +
        '| foo | 1 |\n' +
        '| bar | 2 |'
      );
    });

    it('should handle single column', () => {
      const result = strategy.formatTable(['Item'], [['A'], ['B']]);
      expect(result).toBe('| Item |\n| --- |\n| A |\n| B |');
    });

    it('should handle empty headers', () => {
      expect(strategy.formatTable([], [])).toBe('');
    });

    it('should handle empty rows', () => {
      const result = strategy.formatTable(['Header'], []);
      expect(result).toBe('| Header |\n| --- |');
    });
  });

  describe('formatBlockquote', () => {
    it('should prefix single line with >', () => {
      expect(strategy.formatBlockquote('Quote')).toBe('> Quote');
    });

    it('should prefix each line with >', () => {
      const result = strategy.formatBlockquote('Line 1\nLine 2');
      expect(result).toBe('> Line 1\n> Line 2');
    });

    it('should handle empty string', () => {
      expect(strategy.formatBlockquote('')).toBe('> ');
    });
  });

  describe('formatHorizontalRule', () => {
    it('should return ---', () => {
      expect(strategy.formatHorizontalRule()).toBe('---');
    });
  });

  describe('formatAnchor', () => {
    it('should return empty string (Markdown uses auto-generated anchors)', () => {
      expect(strategy.formatAnchor('section-1')).toBe('');
    });
  });

  describe('getReadmeFilename', () => {
    it('should return README.md', () => {
      expect(strategy.getReadmeFilename()).toBe('README.md');
    });
  });

  describe('getSectionFilename', () => {
    it('should return section name with .md extension', () => {
      expect(strategy.getSectionFilename('01_introduction')).toBe('01_introduction.md');
    });
  });

  describe('singleton', () => {
    it('should export markdownFormatStrategy singleton', () => {
      expect(markdownFormatStrategy).toBeInstanceOf(MarkdownFormatStrategy);
    });

    it('should be a single instance', () => {
      expect(markdownFormatStrategy.code).toBe('markdown');
    });
  });
});
