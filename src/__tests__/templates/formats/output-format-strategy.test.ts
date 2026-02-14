/**
 * Tests for OutputFormatStrategy interface and types
 */

import { describe, it, expect } from 'vitest';
import {
  SUPPORTED_OUTPUT_FORMAT_CODES,
  OUTPUT_FORMAT_ALIASES,
  DEFAULT_OUTPUT_FORMAT,
  isOutputFormatCode,
  normalizeOutputFormatCode
} from '../../../templates/formats/output-format-strategy.js';

describe('OutputFormatStrategy Types and Constants', () => {
  describe('SUPPORTED_OUTPUT_FORMAT_CODES', () => {
    it('should contain markdown and asciidoc', () => {
      expect(SUPPORTED_OUTPUT_FORMAT_CODES).toContain('markdown');
      expect(SUPPORTED_OUTPUT_FORMAT_CODES).toContain('asciidoc');
    });

    it('should have exactly 2 supported formats', () => {
      expect(SUPPORTED_OUTPUT_FORMAT_CODES).toHaveLength(2);
    });

    it('should be a readonly array type', () => {
      // TypeScript ensures this at compile time with 'as const'
      // We verify it's an array with the expected contents
      expect(Array.isArray(SUPPORTED_OUTPUT_FORMAT_CODES)).toBe(true);
      expect(SUPPORTED_OUTPUT_FORMAT_CODES[0]).toBe('markdown');
      expect(SUPPORTED_OUTPUT_FORMAT_CODES[1]).toBe('asciidoc');
    });
  });

  describe('OUTPUT_FORMAT_ALIASES', () => {
    it('should map md to markdown', () => {
      expect(OUTPUT_FORMAT_ALIASES['md']).toBe('markdown');
    });

    it('should map markdown to markdown', () => {
      expect(OUTPUT_FORMAT_ALIASES['markdown']).toBe('markdown');
    });

    it('should map mdown to markdown', () => {
      expect(OUTPUT_FORMAT_ALIASES['mdown']).toBe('markdown');
    });

    it('should map mkd to markdown', () => {
      expect(OUTPUT_FORMAT_ALIASES['mkd']).toBe('markdown');
    });

    it('should map adoc to asciidoc', () => {
      expect(OUTPUT_FORMAT_ALIASES['adoc']).toBe('asciidoc');
    });

    it('should map asciidoc to asciidoc', () => {
      expect(OUTPUT_FORMAT_ALIASES['asciidoc']).toBe('asciidoc');
    });

    it('should map ascii to asciidoc', () => {
      expect(OUTPUT_FORMAT_ALIASES['ascii']).toBe('asciidoc');
    });

    it('should map asciidoctor to asciidoc', () => {
      expect(OUTPUT_FORMAT_ALIASES['asciidoctor']).toBe('asciidoc');
    });

    it('should map asc to asciidoc', () => {
      expect(OUTPUT_FORMAT_ALIASES['asc']).toBe('asciidoc');
    });
  });

  describe('DEFAULT_OUTPUT_FORMAT', () => {
    it('should be asciidoc', () => {
      expect(DEFAULT_OUTPUT_FORMAT).toBe('asciidoc');
    });
  });

  describe('isOutputFormatCode', () => {
    it('should return true for markdown', () => {
      expect(isOutputFormatCode('markdown')).toBe(true);
    });

    it('should return true for asciidoc', () => {
      expect(isOutputFormatCode('asciidoc')).toBe(true);
    });

    it('should return false for unknown format', () => {
      expect(isOutputFormatCode('unknown')).toBe(false);
    });

    it('should return false for alias (md)', () => {
      // isOutputFormatCode checks canonical codes, not aliases
      expect(isOutputFormatCode('md')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isOutputFormatCode('')).toBe(false);
    });

    it('should be case-sensitive', () => {
      expect(isOutputFormatCode('MARKDOWN')).toBe(false);
      expect(isOutputFormatCode('Markdown')).toBe(false);
    });
  });

  describe('normalizeOutputFormatCode', () => {
    it('should normalize md to markdown', () => {
      expect(normalizeOutputFormatCode('md')).toBe('markdown');
    });

    it('should normalize MARKDOWN to markdown', () => {
      expect(normalizeOutputFormatCode('MARKDOWN')).toBe('markdown');
    });

    it('should normalize Markdown to markdown', () => {
      expect(normalizeOutputFormatCode('Markdown')).toBe('markdown');
    });

    it('should normalize adoc to asciidoc', () => {
      expect(normalizeOutputFormatCode('adoc')).toBe('asciidoc');
    });

    it('should normalize ASCIIDOC to asciidoc', () => {
      expect(normalizeOutputFormatCode('ASCIIDOC')).toBe('asciidoc');
    });

    it('should normalize AsciiDoc to asciidoc', () => {
      expect(normalizeOutputFormatCode('AsciiDoc')).toBe('asciidoc');
    });

    it('should return undefined for unknown format', () => {
      expect(normalizeOutputFormatCode('unknown')).toBeUndefined();
    });

    it('should handle whitespace', () => {
      expect(normalizeOutputFormatCode('  md  ')).toBe('markdown');
      expect(normalizeOutputFormatCode('  adoc  ')).toBe('asciidoc');
    });

    it('should return undefined for empty string', () => {
      expect(normalizeOutputFormatCode('')).toBeUndefined();
    });
  });
});
