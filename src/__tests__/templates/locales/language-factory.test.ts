/**
 * Tests for LanguageFactory class
 *
 * Tests factory functionality: creation, normalization, fallback
 * Following TDD with AAA pattern (Arrange-Act-Assert)
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LanguageFactory } from '../../../templates/locales/language-factory.js';
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
    getTemplate: (section: Arc42Section) => `# ${name} Template for ${section}`,
    getWorkflowGuide: () => `# ${name} Workflow Guide`,
    getReadmeContent: () => `# ${name} README`
  };
}

describe('LanguageFactory', () => {
  let registry: LanguageRegistry;
  let factory: LanguageFactory;

  beforeEach(() => {
    registry = new LanguageRegistry();
    registry.register(createMockStrategy('EN', 'English', 'English'));
    registry.register(createMockStrategy('DE', 'German', 'Deutsch'));
    registry.register(createMockStrategy('FR', 'French', 'Français'));

    factory = new LanguageFactory(registry);
  });

  describe('constructor', () => {
    it('should accept a LanguageRegistry instance', () => {
      // Arrange & Act
      const newFactory = new LanguageFactory(registry);

      // Assert
      expect(newFactory).toBeInstanceOf(LanguageFactory);
    });
  });

  describe('create', () => {
    it('should return strategy for registered code', () => {
      // Act
      const strategy = factory.create('EN');

      // Assert
      expect(strategy.code).toBe('EN');
      expect(strategy.name).toBe('English');
    });

    it('should throw error for unknown code', () => {
      // Act & Assert
      expect(() => factory.create('XX')).toThrow();
      expect(() => factory.create('XX')).toThrow(/XX/);
    });

    it('should include available codes in error message', () => {
      // Act & Assert
      try {
        factory.create('XX');
      } catch (error) {
        const message = (error as Error).message;
        expect(message).toContain('EN');
        expect(message).toContain('DE');
        expect(message).toContain('FR');
      }
    });
  });

  describe('createWithFallback', () => {
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('should return strategy for registered code', () => {
      // Act
      const strategy = factory.createWithFallback('DE');

      // Assert
      expect(strategy.code).toBe('DE');
      expect(strategy.name).toBe('German');
    });

    it('should return English for unknown code with warning', () => {
      // Act
      const strategy = factory.createWithFallback('XX');

      // Assert
      expect(strategy.code).toBe('EN');
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it('should include unknown code in warning message', () => {
      // Act
      factory.createWithFallback('UNKNOWN');

      // Assert
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('UNKNOWN')
      );
    });

    it('should throw if English is not registered and code is unknown', () => {
      // Arrange
      const emptyRegistry = new LanguageRegistry();
      emptyRegistry.register(createMockStrategy('DE', 'German', 'Deutsch'));
      const factoryWithoutEnglish = new LanguageFactory(emptyRegistry);

      // Act & Assert
      expect(() => factoryWithoutEnglish.createWithFallback('XX')).toThrow();
    });
  });

  describe('normalizeCode', () => {
    it('should convert lowercase to uppercase', () => {
      // Act & Assert
      expect(factory.normalizeCode('en')).toBe('EN');
      expect(factory.normalizeCode('de')).toBe('DE');
    });

    it('should handle mixed case', () => {
      // Act & Assert
      expect(factory.normalizeCode('En')).toBe('EN');
      expect(factory.normalizeCode('dE')).toBe('DE');
      expect(factory.normalizeCode('De')).toBe('DE');
    });

    it('should trim whitespace', () => {
      // Act & Assert
      expect(factory.normalizeCode('  EN  ')).toBe('EN');
      expect(factory.normalizeCode('\tDE\n')).toBe('DE');
    });

    it('should handle already uppercase codes', () => {
      // Act & Assert
      expect(factory.normalizeCode('EN')).toBe('EN');
      expect(factory.normalizeCode('DE')).toBe('DE');
    });
  });

  describe('isSupported', () => {
    it('should return true for registered codes', () => {
      // Act & Assert
      expect(factory.isSupported('EN')).toBe(true);
      expect(factory.isSupported('DE')).toBe(true);
      expect(factory.isSupported('FR')).toBe(true);
    });

    it('should return false for unregistered codes', () => {
      // Act & Assert
      expect(factory.isSupported('XX')).toBe(false);
      expect(factory.isSupported('ZH')).toBe(false);
    });

    it('should be case-insensitive', () => {
      // Act & Assert
      expect(factory.isSupported('en')).toBe(true);
      expect(factory.isSupported('De')).toBe(true);
      expect(factory.isSupported('fr')).toBe(true);
    });
  });

  describe('getAvailableCodes', () => {
    it('should return all available codes from registry', () => {
      // Act
      const codes = factory.getAvailableCodes();

      // Assert
      expect(codes).toHaveLength(3);
      expect(codes.sort()).toEqual(['DE', 'EN', 'FR']);
    });
  });

  describe('getDefault', () => {
    it('should return English strategy', () => {
      // Act
      const strategy = factory.getDefault();

      // Assert
      expect(strategy.code).toBe('EN');
    });

    it('should throw if English is not registered', () => {
      // Arrange
      const emptyRegistry = new LanguageRegistry();
      emptyRegistry.register(createMockStrategy('DE', 'German', 'Deutsch'));
      const factoryWithoutEnglish = new LanguageFactory(emptyRegistry);

      // Act & Assert
      expect(() => factoryWithoutEnglish.getDefault()).toThrow();
    });
  });

  describe('integration with registry', () => {
    it('should reflect registry changes', () => {
      // Arrange
      const italianStrategy = createMockStrategy('IT', 'Italian', 'Italiano');

      // Act - add new language to registry
      registry.register(italianStrategy);

      // Assert - factory sees the new language
      expect(factory.isSupported('IT')).toBe(true);
      expect(factory.create('IT').name).toBe('Italian');
    });
  });
});
