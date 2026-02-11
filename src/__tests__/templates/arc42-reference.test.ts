import { describe, it, expect } from 'vitest';
import {
  ARC42_REFERENCE,
  Arc42Reference,
  getArc42ReferenceString,
  getArc42ReferenceMarkdown,
  getArc42ReferenceConfig,
  reloadArc42Reference
} from '../../templates/arc42-reference.js';

describe('arc42-reference', () => {
  describe('ARC42_REFERENCE', () => {
    it('should have a valid version format', () => {
      expect(ARC42_REFERENCE.version).toBeDefined();
      // Version format: X.X-LANG (e.g., "9.0-EN")
      expect(ARC42_REFERENCE.version).toMatch(/^\d+\.\d+-[A-Z]+$/);
    });

    it('should have a valid date', () => {
      expect(ARC42_REFERENCE.date).toBeDefined();
      // Date format: Month Year (e.g., "July 2025")
      expect(ARC42_REFERENCE.date).toMatch(/^[A-Za-z]+ \d{4}$/);
    });

    it('should have a commit SHA or unknown', () => {
      expect(ARC42_REFERENCE.commitSha).toBeDefined();
      // Either a 40-char hex string or 'unknown'
      expect(
        ARC42_REFERENCE.commitSha === 'unknown' ||
        /^[a-f0-9]{40}$/.test(ARC42_REFERENCE.commitSha)
      ).toBe(true);
    });

    it('should have the correct source repo URL', () => {
      expect(ARC42_REFERENCE.sourceRepo).toBe('https://github.com/arc42/arc42-template');
    });

    it('should indicate submodule availability', () => {
      expect(typeof ARC42_REFERENCE.submoduleAvailable).toBe('boolean');
    });

    it('should have notes array', () => {
      expect(ARC42_REFERENCE.notes).toBeDefined();
      expect(Array.isArray(ARC42_REFERENCE.notes)).toBe(true);
      expect(ARC42_REFERENCE.notes.length).toBeGreaterThan(0);
    });

    it('should implement Arc42Reference interface', () => {
      // Type check - this will fail at compile time if interface doesn't match
      const ref: Arc42Reference = ARC42_REFERENCE;
      expect(ref.version).toBeDefined();
      expect(ref.date).toBeDefined();
      expect(ref.commitSha).toBeDefined();
      expect(ref.sourceRepo).toBeDefined();
      expect(ref.submoduleAvailable).toBeDefined();
      expect(ref.notes).toBeDefined();
    });
  });

  describe('getArc42ReferenceString', () => {
    it('should return a formatted string with version and date', () => {
      const result = getArc42ReferenceString();
      
      expect(result).toContain('arc42 Template');
      expect(result).toContain(ARC42_REFERENCE.version);
      expect(result).toContain(ARC42_REFERENCE.date);
    });

    it('should match expected format', () => {
      const result = getArc42ReferenceString();
      
      // Expected format: "arc42 Template v9.0-EN (July 2025)"
      expect(result).toMatch(/arc42 Template v\d+\.\d+-[A-Z]+ \([A-Za-z]+ \d{4}\)/);
    });
  });

  describe('getArc42ReferenceMarkdown', () => {
    it('should return valid markdown', () => {
      const result = getArc42ReferenceMarkdown();
      
      expect(result).toContain('---'); // Has markdown dividers
      expect(result).toContain('**arc42 Template Reference**');
      expect(result).toContain('Version:');
      expect(result).toContain('Date:');
      expect(result).toContain('Source:');
      expect(result).toContain('Commit:');
    });

    it('should include version info', () => {
      const result = getArc42ReferenceMarkdown();
      
      expect(result).toContain(ARC42_REFERENCE.version);
      expect(result).toContain(ARC42_REFERENCE.date);
    });

    it('should include source link', () => {
      const result = getArc42ReferenceMarkdown();
      
      expect(result).toContain(ARC42_REFERENCE.sourceRepo);
      expect(result).toContain('[arc42-template]');
    });

    it('should include shortened commit SHA', () => {
      const result = getArc42ReferenceMarkdown();
      
      const shortSha = ARC42_REFERENCE.commitSha.substring(0, 7);
      expect(result).toContain(shortSha);
    });
  });

  describe('getArc42ReferenceConfig', () => {
    it('should return an object with all required fields', () => {
      const result = getArc42ReferenceConfig();
      
      expect(result).toHaveProperty('arc42_template_version');
      expect(result).toHaveProperty('arc42_template_date');
      expect(result).toHaveProperty('arc42_template_source');
      expect(result).toHaveProperty('arc42_template_commit');
    });

    it('should have correct values', () => {
      const result = getArc42ReferenceConfig();
      
      expect(result.arc42_template_version).toBe(ARC42_REFERENCE.version);
      expect(result.arc42_template_date).toBe(ARC42_REFERENCE.date);
      expect(result.arc42_template_source).toBe(ARC42_REFERENCE.sourceRepo);
      expect(result.arc42_template_commit).toBe(ARC42_REFERENCE.commitSha);
    });

    it('should return string values suitable for YAML config', () => {
      const result = getArc42ReferenceConfig();
      
      Object.values(result).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  describe('reloadArc42Reference', () => {
    it('should return a valid Arc42Reference object', () => {
      const ref = reloadArc42Reference();
      
      expect(ref.version).toBeDefined();
      expect(ref.date).toBeDefined();
      expect(ref.commitSha).toBeDefined();
      expect(ref.sourceRepo).toBe('https://github.com/arc42/arc42-template');
      expect(typeof ref.submoduleAvailable).toBe('boolean');
      expect(Array.isArray(ref.notes)).toBe(true);
    });

    it('should return consistent values with ARC42_REFERENCE', () => {
      const ref = reloadArc42Reference();
      
      // Values should be the same since we're reading from the same source
      expect(ref.version).toBe(ARC42_REFERENCE.version);
      expect(ref.date).toBe(ARC42_REFERENCE.date);
      expect(ref.sourceRepo).toBe(ARC42_REFERENCE.sourceRepo);
    });
  });

  describe('dynamic loading from submodule', () => {
    it('should load version 9.0-EN when submodule is available', () => {
      // This test verifies the current submodule version
      // It may need updating when the submodule is updated
      if (ARC42_REFERENCE.submoduleAvailable) {
        expect(ARC42_REFERENCE.version).toBe('9.0-EN');
        expect(ARC42_REFERENCE.date).toBe('July 2025');
      }
    });

    it('should use fallback when submodule is not available', () => {
      if (!ARC42_REFERENCE.submoduleAvailable) {
        // Fallback values should still be valid
        expect(ARC42_REFERENCE.version).toMatch(/^\d+\.\d+-[A-Z]+$/);
        expect(ARC42_REFERENCE.notes).toContain('Fallback values used - submodule not available');
      }
    });
  });
});
