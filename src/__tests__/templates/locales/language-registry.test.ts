/**
 * Tests for LanguageRegistry class
 *
 * Tests registry functionality: registration, lookup, validation, enumeration
 * Following TDD with AAA pattern (Arrange-Act-Assert)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageRegistry } from '../../../templates/locales/language-registry.js';
import type { LanguageStrategy, LanguageCode } from '../../../templates/locales/language-strategy.js';
import type { Arc42Section } from '../../../types.js';

// Mock strategy factory for testing
function createMockStrategy(code: LanguageCode, name: string, nativeName: string): LanguageStrategy {
  return {
    code,
    name,
    nativeName,
    getSectionTitle: (section: Arc42Section) => ({ title: `${name} Title`, section }),
    getSectionDescription: (section: Arc42Section) => ({ description: `${name} Description`, section }),
    getTemplateForFormat: (section: Arc42Section, _format) => `# ${name} Template for ${section}`,
    getWorkflowGuideForFormat: (_format) => `# ${name} Workflow Guide`,
    getReadmeContentForFormat: (_projectName, _format) => `# ${name} README`
  };
}

describe('LanguageRegistry', () => {
  let registry: LanguageRegistry;

  beforeEach(() => {
    registry = new LanguageRegistry();
  });

  describe('register', () => {
    it('should register a language strategy', () => {
      // Arrange
      const strategy = createMockStrategy('EN', 'English', 'English');

      // Act
      registry.register(strategy);

      // Assert
      expect(registry.isSupported('EN')).toBe(true);
    });

    it('should allow registering multiple strategies', () => {
      // Arrange
      const englishStrategy = createMockStrategy('EN', 'English', 'English');
      const germanStrategy = createMockStrategy('DE', 'German', 'Deutsch');

      // Act
      registry.register(englishStrategy);
      registry.register(germanStrategy);

      // Assert
      expect(registry.isSupported('EN')).toBe(true);
      expect(registry.isSupported('DE')).toBe(true);
    });

    it('should overwrite existing strategy for same code', () => {
      // Arrange
      const strategy1 = createMockStrategy('EN', 'English v1', 'English');
      const strategy2 = createMockStrategy('EN', 'English v2', 'English');

      // Act
      registry.register(strategy1);
      registry.register(strategy2);

      // Assert
      const retrieved = registry.get('EN');
      expect(retrieved?.name).toBe('English v2');
    });

    it('should return the registry for method chaining', () => {
      // Arrange
      const strategy = createMockStrategy('EN', 'English', 'English');

      // Act
      const result = registry.register(strategy);

      // Assert
      expect(result).toBe(registry);
    });
  });

  describe('get', () => {
    beforeEach(() => {
      registry.register(createMockStrategy('EN', 'English', 'English'));
      registry.register(createMockStrategy('DE', 'German', 'Deutsch'));
    });

    it('should return strategy for registered code', () => {
      // Act
      const strategy = registry.get('EN');

      // Assert
      expect(strategy).toBeDefined();
      expect(strategy?.code).toBe('EN');
      expect(strategy?.name).toBe('English');
    });

    it('should return undefined for unregistered code', () => {
      // Act
      const strategy = registry.get('FR');

      // Assert
      expect(strategy).toBeUndefined();
    });

    it('should perform case-insensitive lookup', () => {
      // Act & Assert
      expect(registry.get('en')?.code).toBe('EN');
      expect(registry.get('En')?.code).toBe('EN');
      expect(registry.get('eN')?.code).toBe('EN');
      expect(registry.get('EN')?.code).toBe('EN');
    });

    it('should handle codes with whitespace', () => {
      // Act
      const strategy = registry.get('  EN  ');

      // Assert
      expect(strategy?.code).toBe('EN');
    });
  });

  describe('getOrThrow', () => {
    beforeEach(() => {
      registry.register(createMockStrategy('EN', 'English', 'English'));
      registry.register(createMockStrategy('DE', 'German', 'Deutsch'));
    });

    it('should return strategy for registered code', () => {
      // Act
      const strategy = registry.getOrThrow('EN');

      // Assert
      expect(strategy.code).toBe('EN');
    });

    it('should throw error for unregistered code with available codes', () => {
      // Act & Assert
      expect(() => registry.getOrThrow('FR')).toThrow();
      expect(() => registry.getOrThrow('FR')).toThrow(/FR/);
      expect(() => registry.getOrThrow('FR')).toThrow(/EN/);
      expect(() => registry.getOrThrow('FR')).toThrow(/DE/);
    });

    it('should perform case-insensitive lookup', () => {
      // Act & Assert
      expect(() => registry.getOrThrow('en')).not.toThrow();
      expect(registry.getOrThrow('de').code).toBe('DE');
    });
  });

  describe('getAll', () => {
    it('should return empty array when no strategies registered', () => {
      // Act
      const all = registry.getAll();

      // Assert
      expect(all).toEqual([]);
    });

    it('should return all registered strategies', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English', 'English'));
      registry.register(createMockStrategy('DE', 'German', 'Deutsch'));
      registry.register(createMockStrategy('FR', 'French', 'Français'));

      // Act
      const all = registry.getAll();

      // Assert
      expect(all).toHaveLength(3);
      expect(all.map(s => s.code).sort()).toEqual(['DE', 'EN', 'FR']);
    });

    it('should return a copy of the strategies array', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English', 'English'));

      // Act
      const all1 = registry.getAll();
      const all2 = registry.getAll();

      // Assert
      expect(all1).not.toBe(all2);
    });
  });

  describe('isSupported', () => {
    beforeEach(() => {
      registry.register(createMockStrategy('EN', 'English', 'English'));
    });

    it('should return true for registered code', () => {
      // Act & Assert
      expect(registry.isSupported('EN')).toBe(true);
    });

    it('should return false for unregistered code', () => {
      // Act & Assert
      expect(registry.isSupported('FR')).toBe(false);
    });

    it('should be case-insensitive', () => {
      // Act & Assert
      expect(registry.isSupported('en')).toBe(true);
      expect(registry.isSupported('En')).toBe(true);
      expect(registry.isSupported('eN')).toBe(true);
    });
  });

  describe('getAvailableCodes', () => {
    it('should return empty array when no strategies registered', () => {
      // Act
      const codes = registry.getAvailableCodes();

      // Assert
      expect(codes).toEqual([]);
    });

    it('should return all registered codes', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English', 'English'));
      registry.register(createMockStrategy('DE', 'German', 'Deutsch'));
      registry.register(createMockStrategy('FR', 'French', 'Français'));

      // Act
      const codes = registry.getAvailableCodes();

      // Assert
      expect(codes).toHaveLength(3);
      expect(codes.sort()).toEqual(['DE', 'EN', 'FR']);
    });

    it('should return codes in uppercase', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English', 'English'));

      // Act
      const codes = registry.getAvailableCodes();

      // Assert
      expect(codes).toContain('EN');
    });
  });

  describe('getDefault', () => {
    it('should return English strategy when registered', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English', 'English'));
      registry.register(createMockStrategy('DE', 'German', 'Deutsch'));

      // Act
      const defaultStrategy = registry.getDefault();

      // Assert
      expect(defaultStrategy?.code).toBe('EN');
    });

    it('should return undefined when English not registered', () => {
      // Arrange
      registry.register(createMockStrategy('DE', 'German', 'Deutsch'));

      // Act
      const defaultStrategy = registry.getDefault();

      // Assert
      expect(defaultStrategy).toBeUndefined();
    });

    it('should return undefined when registry is empty', () => {
      // Act
      const defaultStrategy = registry.getDefault();

      // Assert
      expect(defaultStrategy).toBeUndefined();
    });
  });

  describe('size', () => {
    it('should return 0 for empty registry', () => {
      // Act & Assert
      expect(registry.size).toBe(0);
    });

    it('should return correct count after registrations', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English', 'English'));
      registry.register(createMockStrategy('DE', 'German', 'Deutsch'));

      // Act & Assert
      expect(registry.size).toBe(2);
    });

    it('should not increase when overwriting existing code', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English v1', 'English'));
      registry.register(createMockStrategy('EN', 'English v2', 'English'));

      // Act & Assert
      expect(registry.size).toBe(1);
    });
  });

  describe('clear', () => {
    it('should remove all registered strategies', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English', 'English'));
      registry.register(createMockStrategy('DE', 'German', 'Deutsch'));

      // Act
      registry.clear();

      // Assert
      expect(registry.size).toBe(0);
      expect(registry.getAll()).toEqual([]);
    });

    it('should return the registry for method chaining', () => {
      // Act
      const result = registry.clear();

      // Assert
      expect(result).toBe(registry);
    });

    it('should allow re-registration after clearing', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English', 'English'));
      registry.clear();

      // Act
      registry.register(createMockStrategy('DE', 'German', 'Deutsch'));

      // Assert
      expect(registry.size).toBe(1);
      expect(registry.isSupported('DE')).toBe(true);
      expect(registry.isSupported('EN')).toBe(false);
    });
  });

  describe('getOrThrow - edge cases', () => {
    it('should throw with "none" in message when registry is empty', () => {
      // Act & Assert
      expect(() => registry.getOrThrow('XX')).toThrow(/none/);
    });

    it('should include normalized code in error message', () => {
      // Act & Assert
      expect(() => registry.getOrThrow('  xx  ')).toThrow(/XX/);
    });
  });

  describe('getAll - edge cases', () => {
    it('should not be affected by modifying returned array', () => {
      // Arrange
      registry.register(createMockStrategy('EN', 'English', 'English'));
      const all = registry.getAll();

      // Act - modify returned array
      all.push(createMockStrategy('DE', 'German', 'Deutsch'));

      // Assert - original registry unchanged
      expect(registry.size).toBe(1);
      expect(registry.getAll()).toHaveLength(1);
    });
  });
});
