/**
 * Tests for LocalizedTemplateProvider class
 *
 * Tests template retrieval, config integration, and language fallback
 * Following TDD with AAA pattern (Arrange-Act-Assert)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LocalizedTemplateProvider } from '../../../templates/locales/template-provider.js';
import { LanguageRegistry } from '../../../templates/locales/language-registry.js';
import { LanguageFactory } from '../../../templates/locales/language-factory.js';
import type { LanguageStrategy, LanguageCode } from '../../../templates/locales/language-strategy.js';
import type { Arc42Section } from '../../../types.js';
import { ALL_SECTIONS } from '../../fixtures/test-helpers.js';
import { writeFileSync, rmSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

// Mock strategy factory for testing
function createMockStrategy(code: LanguageCode, name: string, nativeName: string): LanguageStrategy {
  return {
    code,
    name,
    nativeName,
    getSectionTitle: (section: Arc42Section) => ({ title: `${name} Title for ${section}`, section }),
    getSectionDescription: (section: Arc42Section) => ({ description: `${name} Description for ${section}`, section }),
    getTemplate: (section: Arc42Section) => `# ${name} Template\n\nContent for ${section}`,
    getWorkflowGuide: () => `# ${name} Workflow Guide`,
    getReadmeContent: () => `# ${name} README`
  };
}

describe('LocalizedTemplateProvider', () => {
  let registry: LanguageRegistry;
  let factory: LanguageFactory;
  let provider: LocalizedTemplateProvider;
  let tempDir: string;

  beforeEach(() => {
    registry = new LanguageRegistry();
    registry.register(createMockStrategy('EN', 'English', 'English'));
    registry.register(createMockStrategy('DE', 'German', 'Deutsch'));
    registry.register(createMockStrategy('FR', 'French', 'Français'));

    factory = new LanguageFactory(registry);
    provider = new LocalizedTemplateProvider(factory);

    // Create temp directory for config tests
    tempDir = join(tmpdir(), `arc42-provider-test-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('constructor', () => {
    it('should accept a LanguageFactory instance', () => {
      // Arrange & Act
      const newProvider = new LocalizedTemplateProvider(factory);

      // Assert
      expect(newProvider).toBeInstanceOf(LocalizedTemplateProvider);
    });
  });

  describe('getTemplate', () => {
    it('should return template for specified language', () => {
      // Act
      const template = provider.getTemplate('01_introduction_and_goals', 'DE');

      // Assert
      expect(template).toContain('German Template');
      expect(template).toContain('01_introduction_and_goals');
    });

    it('should return English template when no language specified', () => {
      // Act
      const template = provider.getTemplate('01_introduction_and_goals');

      // Assert
      expect(template).toContain('English Template');
    });

    it('should be case-insensitive for language code', () => {
      // Act
      const template1 = provider.getTemplate('01_introduction_and_goals', 'de');
      const template2 = provider.getTemplate('01_introduction_and_goals', 'De');
      const template3 = provider.getTemplate('01_introduction_and_goals', 'DE');

      // Assert
      expect(template1).toBe(template2);
      expect(template2).toBe(template3);
    });

    it('should work with all 12 sections', () => {
      // Act & Assert
      ALL_SECTIONS.forEach((section) => {
        const template = provider.getTemplate(section, 'EN');
        expect(template).toBeTruthy();
        expect(template.length).toBeGreaterThan(0);
      });
    });

    it('should fall back to English for unknown language with warning', () => {
      // Arrange
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Act
      const template = provider.getTemplate('01_introduction_and_goals', 'XX');

      // Assert
      expect(template).toContain('English Template');
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });

  describe('getSectionMetadata', () => {
    it('should return title and description for specified language', () => {
      // Act
      const metadata = provider.getSectionMetadata('01_introduction_and_goals', 'DE');

      // Assert
      expect(metadata.title).toContain('German');
      expect(metadata.description).toContain('German');
      expect(metadata.section).toBe('01_introduction_and_goals');
      expect(metadata.languageCode).toBe('DE');
    });

    it('should return English metadata when no language specified', () => {
      // Act
      const metadata = provider.getSectionMetadata('01_introduction_and_goals');

      // Assert
      expect(metadata.title).toContain('English');
      expect(metadata.languageCode).toBe('EN');
    });

    it('should work with all 12 sections', () => {
      // Act & Assert
      ALL_SECTIONS.forEach((section) => {
        const metadata = provider.getSectionMetadata(section, 'EN');
        expect(metadata.section).toBe(section);
        expect(metadata.title).toBeTruthy();
        expect(metadata.description).toBeTruthy();
      });
    });
  });

  describe('getAvailableLanguages', () => {
    it('should return all registered languages', () => {
      // Act
      const languages = provider.getAvailableLanguages();

      // Assert
      expect(languages).toHaveLength(3);
      expect(languages.map(l => l.code).sort()).toEqual(['DE', 'EN', 'FR']);
    });

    it('should include code, name, and nativeName for each language', () => {
      // Act
      const languages = provider.getAvailableLanguages();
      const german = languages.find(l => l.code === 'DE');

      // Assert
      expect(german).toBeDefined();
      expect(german?.name).toBe('German');
      expect(german?.nativeName).toBe('Deutsch');
    });
  });

  describe('getWorkflowGuide', () => {
    it('should return workflow guide for specified language', () => {
      // Act
      const guide = provider.getWorkflowGuide('DE');

      // Assert
      expect(guide).toContain('German Workflow Guide');
    });

    it('should return English guide when no language specified', () => {
      // Act
      const guide = provider.getWorkflowGuide();

      // Assert
      expect(guide).toContain('English Workflow Guide');
    });
  });

  describe('getReadmeContent', () => {
    it('should return README for specified language', () => {
      // Act
      const readme = provider.getReadmeContent('FR');

      // Assert
      expect(readme).toContain('French README');
    });

    it('should return English README when no language specified', () => {
      // Act
      const readme = provider.getReadmeContent();

      // Assert
      expect(readme).toContain('English README');
    });
  });

  describe('getTemplateWithConfig', () => {
    it('should use language from config.yaml when no parameter specified', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: DE\nprojectName: Test\n');

      // Act
      const template = provider.getTemplateWithConfig('01_introduction_and_goals', tempDir);

      // Assert
      expect(template).toContain('German Template');
    });

    it('should override config with parameter', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: DE\nprojectName: Test\n');

      // Act
      const template = provider.getTemplateWithConfig('01_introduction_and_goals', tempDir, 'FR');

      // Assert
      expect(template).toContain('French Template');
    });

    it('should fall back to English when config has no language', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'projectName: Test\n');

      // Act
      const template = provider.getTemplateWithConfig('01_introduction_and_goals', tempDir);

      // Assert
      expect(template).toContain('English Template');
    });

    it('should fall back to English when config file does not exist', () => {
      // Act
      const template = provider.getTemplateWithConfig('01_introduction_and_goals', '/nonexistent/path');

      // Assert
      expect(template).toContain('English Template');
    });

    it('should handle malformed config gracefully', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'not: valid: yaml: content:::');

      // Act
      const template = provider.getTemplateWithConfig('01_introduction_and_goals', tempDir);

      // Assert
      expect(template).toContain('English Template');
    });
  });

  describe('readLanguageFromConfig', () => {
    it('should read language code from valid config', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: FR\nprojectName: Test\n');

      // Act
      const code = provider.readLanguageFromConfig(tempDir);

      // Assert
      expect(code).toBe('FR');
    });

    it('should return undefined for missing config', () => {
      // Act
      const code = provider.readLanguageFromConfig('/nonexistent/path');

      // Assert
      expect(code).toBeUndefined();
    });

    it('should return undefined for config without language', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'projectName: Test\n');

      // Act
      const code = provider.readLanguageFromConfig(tempDir);

      // Assert
      expect(code).toBeUndefined();
    });

    it('should normalize language code to uppercase', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: de\nprojectName: Test\n');

      // Act
      const code = provider.readLanguageFromConfig(tempDir);

      // Assert
      expect(code).toBe('DE');
    });
  });

  describe('isSupported', () => {
    it('should return true for supported languages', () => {
      // Act & Assert
      expect(provider.isSupported('EN')).toBe(true);
      expect(provider.isSupported('DE')).toBe(true);
      expect(provider.isSupported('FR')).toBe(true);
    });

    it('should return false for unsupported languages', () => {
      // Act & Assert
      expect(provider.isSupported('XX')).toBe(false);
      expect(provider.isSupported('ZH')).toBe(false);
    });

    it('should be case-insensitive', () => {
      // Act & Assert
      expect(provider.isSupported('en')).toBe(true);
      expect(provider.isSupported('De')).toBe(true);
    });
  });
});
