/**
 * Tests for templates/formats/index.ts
 *
 * Tests the barrel file exports and utility functions.
 */

import { describe, it, expect } from 'vitest';
import {
  // Singletons
  outputFormatRegistry,
  outputFormatFactory,
  // Utility functions
  getOutputFormatStrategy,
  getOutputFormatStrategyWithFallback,
  getDefaultOutputFormatStrategy,
  isOutputFormatSupported,
  getSupportedOutputFormatCodes,
  detectOutputFormatFromExtension,
  detectOutputFormatFromFilename,
  // Re-exports
  SUPPORTED_OUTPUT_FORMAT_CODES,
  DEFAULT_OUTPUT_FORMAT,
  isOutputFormatCode,
  normalizeOutputFormatCode,
  OutputFormatRegistry,
  OutputFormatFactory,
  MarkdownFormatStrategy,
  AsciiDocFormatStrategy,
  markdownFormatStrategy,
  asciidocFormatStrategy
} from '../../../templates/formats/index.js';

describe('templates/formats/index.ts', () => {
  describe('singleton exports', () => {
    it('should export outputFormatRegistry as OutputFormatRegistry instance', () => {
      expect(outputFormatRegistry).toBeInstanceOf(OutputFormatRegistry);
    });

    it('should export outputFormatFactory as OutputFormatFactory instance', () => {
      expect(outputFormatFactory).toBeInstanceOf(OutputFormatFactory);
    });

    it('should have markdown and asciidoc registered in outputFormatRegistry', () => {
      expect(outputFormatRegistry.isSupported('markdown')).toBe(true);
      expect(outputFormatRegistry.isSupported('asciidoc')).toBe(true);
    });
  });

  describe('strategy exports', () => {
    it('should export markdownFormatStrategy as MarkdownFormatStrategy instance', () => {
      expect(markdownFormatStrategy).toBeInstanceOf(MarkdownFormatStrategy);
    });

    it('should export asciidocFormatStrategy as AsciiDocFormatStrategy instance', () => {
      expect(asciidocFormatStrategy).toBeInstanceOf(AsciiDocFormatStrategy);
    });
  });

  describe('constant exports', () => {
    it('should export SUPPORTED_OUTPUT_FORMAT_CODES', () => {
      expect(SUPPORTED_OUTPUT_FORMAT_CODES).toContain('markdown');
      expect(SUPPORTED_OUTPUT_FORMAT_CODES).toContain('asciidoc');
    });

    it('should export DEFAULT_OUTPUT_FORMAT as asciidoc', () => {
      expect(DEFAULT_OUTPUT_FORMAT).toBe('asciidoc');
    });
  });

  describe('type guard exports', () => {
    it('should export isOutputFormatCode', () => {
      expect(isOutputFormatCode('markdown')).toBe(true);
      expect(isOutputFormatCode('asciidoc')).toBe(true);
      expect(isOutputFormatCode('unknown')).toBe(false);
    });

    it('should export normalizeOutputFormatCode', () => {
      expect(normalizeOutputFormatCode('md')).toBe('markdown');
      expect(normalizeOutputFormatCode('adoc')).toBe('asciidoc');
    });
  });

  describe('getOutputFormatStrategy', () => {
    it('should return markdown strategy for "markdown"', () => {
      const strategy = getOutputFormatStrategy('markdown');
      expect(strategy.code).toBe('markdown');
    });

    it('should return asciidoc strategy for "asciidoc"', () => {
      const strategy = getOutputFormatStrategy('asciidoc');
      expect(strategy.code).toBe('asciidoc');
    });

    it('should handle aliases like "md"', () => {
      const strategy = getOutputFormatStrategy('md');
      expect(strategy.code).toBe('markdown');
    });

    it('should handle aliases like "adoc"', () => {
      const strategy = getOutputFormatStrategy('adoc');
      expect(strategy.code).toBe('asciidoc');
    });

    it('should be case-insensitive', () => {
      const strategy = getOutputFormatStrategy('MARKDOWN');
      expect(strategy.code).toBe('markdown');
    });

    it('should throw for unknown format', () => {
      expect(() => getOutputFormatStrategy('unknown')).toThrow();
    });
  });

  describe('getOutputFormatStrategyWithFallback', () => {
    it('should return requested format when valid', () => {
      const strategy = getOutputFormatStrategyWithFallback('markdown');
      expect(strategy.code).toBe('markdown');
    });

    it('should return default format for unknown format', () => {
      const strategy = getOutputFormatStrategyWithFallback('unknown');
      expect(strategy.code).toBe('asciidoc');
    });
  });

  describe('getDefaultOutputFormatStrategy', () => {
    it('should return asciidoc strategy', () => {
      const strategy = getDefaultOutputFormatStrategy();
      expect(strategy.code).toBe('asciidoc');
    });

    it('should return a valid OutputFormatStrategy', () => {
      const strategy = getDefaultOutputFormatStrategy();
      expect(strategy.name).toBe('AsciiDoc');
      expect(strategy.fileExtension).toBe('.adoc');
    });
  });

  describe('isOutputFormatSupported', () => {
    it('should return true for supported formats', () => {
      expect(isOutputFormatSupported('markdown')).toBe(true);
      expect(isOutputFormatSupported('asciidoc')).toBe(true);
    });

    it('should return true for aliases', () => {
      expect(isOutputFormatSupported('md')).toBe(true);
      expect(isOutputFormatSupported('adoc')).toBe(true);
    });

    it('should return false for unsupported formats', () => {
      expect(isOutputFormatSupported('unknown')).toBe(false);
      expect(isOutputFormatSupported('html')).toBe(false);
      expect(isOutputFormatSupported('pdf')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(isOutputFormatSupported('MARKDOWN')).toBe(true);
      expect(isOutputFormatSupported('AsciiDoc')).toBe(true);
    });
  });

  describe('getSupportedOutputFormatCodes', () => {
    it('should return array of supported format codes', () => {
      const codes = getSupportedOutputFormatCodes();
      expect(Array.isArray(codes)).toBe(true);
      expect(codes).toContain('markdown');
      expect(codes).toContain('asciidoc');
    });

    it('should return exactly 2 formats', () => {
      const codes = getSupportedOutputFormatCodes();
      expect(codes).toHaveLength(2);
    });
  });

  describe('detectOutputFormatFromExtension', () => {
    describe('markdown detection', () => {
      it('should detect .md as markdown', () => {
        expect(detectOutputFormatFromExtension('.md')).toBe('markdown');
      });

      it('should detect md (without dot) as markdown', () => {
        expect(detectOutputFormatFromExtension('md')).toBe('markdown');
      });

      it('should detect .markdown as markdown', () => {
        expect(detectOutputFormatFromExtension('.markdown')).toBe('markdown');
      });

      it('should be case-insensitive for markdown', () => {
        expect(detectOutputFormatFromExtension('.MD')).toBe('markdown');
        expect(detectOutputFormatFromExtension('.Markdown')).toBe('markdown');
      });
    });

    describe('asciidoc detection', () => {
      it('should detect .adoc as asciidoc', () => {
        expect(detectOutputFormatFromExtension('.adoc')).toBe('asciidoc');
      });

      it('should detect adoc (without dot) as asciidoc', () => {
        expect(detectOutputFormatFromExtension('adoc')).toBe('asciidoc');
      });

      it('should detect .asciidoc as asciidoc', () => {
        expect(detectOutputFormatFromExtension('.asciidoc')).toBe('asciidoc');
      });

      it('should detect .asc as asciidoc', () => {
        expect(detectOutputFormatFromExtension('.asc')).toBe('asciidoc');
      });

      it('should be case-insensitive for asciidoc', () => {
        expect(detectOutputFormatFromExtension('.ADOC')).toBe('asciidoc');
        expect(detectOutputFormatFromExtension('.AsciiDoc')).toBe('asciidoc');
      });
    });

    describe('unknown extensions', () => {
      it('should return undefined for unknown extensions', () => {
        expect(detectOutputFormatFromExtension('.txt')).toBeUndefined();
        expect(detectOutputFormatFromExtension('.html')).toBeUndefined();
        expect(detectOutputFormatFromExtension('.pdf')).toBeUndefined();
        expect(detectOutputFormatFromExtension('.doc')).toBeUndefined();
      });

      it('should return undefined for empty string', () => {
        expect(detectOutputFormatFromExtension('')).toBeUndefined();
      });

      it('should return undefined for just a dot', () => {
        expect(detectOutputFormatFromExtension('.')).toBeUndefined();
      });
    });
  });

  describe('detectOutputFormatFromFilename', () => {
    describe('markdown detection', () => {
      it('should detect README.md as markdown', () => {
        expect(detectOutputFormatFromFilename('README.md')).toBe('markdown');
      });

      it('should detect document.markdown as markdown', () => {
        expect(detectOutputFormatFromFilename('document.markdown')).toBe('markdown');
      });

      it('should handle paths with directories', () => {
        expect(detectOutputFormatFromFilename('path/to/file.md')).toBe('markdown');
      });
    });

    describe('asciidoc detection', () => {
      it('should detect README.adoc as asciidoc', () => {
        expect(detectOutputFormatFromFilename('README.adoc')).toBe('asciidoc');
      });

      it('should detect document.asciidoc as asciidoc', () => {
        expect(detectOutputFormatFromFilename('document.asciidoc')).toBe('asciidoc');
      });

      it('should detect document.asc as asciidoc', () => {
        expect(detectOutputFormatFromFilename('document.asc')).toBe('asciidoc');
      });
    });

    describe('files without extension', () => {
      it('should return undefined for files without extension', () => {
        expect(detectOutputFormatFromFilename('README')).toBeUndefined();
        expect(detectOutputFormatFromFilename('Makefile')).toBeUndefined();
        expect(detectOutputFormatFromFilename('Dockerfile')).toBeUndefined();
      });

      it('should return undefined for empty filename', () => {
        expect(detectOutputFormatFromFilename('')).toBeUndefined();
      });
    });

    describe('unknown extensions', () => {
      it('should return undefined for unknown file extensions', () => {
        expect(detectOutputFormatFromFilename('file.txt')).toBeUndefined();
        expect(detectOutputFormatFromFilename('file.html')).toBeUndefined();
        expect(detectOutputFormatFromFilename('file.pdf')).toBeUndefined();
      });
    });

    describe('edge cases', () => {
      it('should handle files with multiple dots', () => {
        expect(detectOutputFormatFromFilename('file.name.md')).toBe('markdown');
        expect(detectOutputFormatFromFilename('my.document.adoc')).toBe('asciidoc');
      });

      it('should handle hidden files', () => {
        expect(detectOutputFormatFromFilename('.hidden.md')).toBe('markdown');
      });

      it('should return undefined for hidden files without extension after dot', () => {
        // .gitignore has extension "gitignore" which is unknown
        expect(detectOutputFormatFromFilename('.gitignore')).toBeUndefined();
      });
    });
  });
});
