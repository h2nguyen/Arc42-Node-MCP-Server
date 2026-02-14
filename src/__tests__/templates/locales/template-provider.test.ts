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
import type { OutputFormatCode } from '../../../templates/formats/output-format-strategy.js';
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
    getTemplateForFormat: (section: Arc42Section, format: OutputFormatCode) => {
      if (format === 'asciidoc') {
        return `= ${name} Template\n\nContent for ${section}`;
      }
      return `# ${name} Template\n\nContent for ${section}`;
    },
    getWorkflowGuideForFormat: (format: OutputFormatCode) => {
      if (format === 'asciidoc') {
        return `= ${name} Workflow Guide`;
      }
      return `# ${name} Workflow Guide`;
    },
    getReadmeContentForFormat: (_projectName: string | undefined, format: OutputFormatCode) => {
      if (format === 'asciidoc') {
        return `= ${name} README`;
      }
      return `# ${name} README`;
    }
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

  describe('getTemplateForFormat', () => {
    it('should return markdown template for specified language', () => {
      // Act
      const template = provider.getTemplateForFormat('01_introduction_and_goals', 'DE', 'markdown');

      // Assert
      expect(template).toContain('German Template');
      expect(template).toContain('01_introduction_and_goals');
      expect(template).toContain('#');
    });

    it('should return asciidoc template for specified language', () => {
      // Act
      const template = provider.getTemplateForFormat('01_introduction_and_goals', 'DE', 'asciidoc');

      // Assert
      expect(template).toContain('German Template');
      expect(template).toContain('01_introduction_and_goals');
      expect(template).toContain('=');
    });

    it('should return English template when no language specified', () => {
      // Act
      const template = provider.getTemplateForFormat('01_introduction_and_goals', undefined, 'markdown');

      // Assert
      expect(template).toContain('English Template');
    });

    it('should be case-insensitive for language code', () => {
      // Act
      const template1 = provider.getTemplateForFormat('01_introduction_and_goals', 'de', 'markdown');
      const template2 = provider.getTemplateForFormat('01_introduction_and_goals', 'De', 'markdown');
      const template3 = provider.getTemplateForFormat('01_introduction_and_goals', 'DE', 'markdown');

      // Assert
      expect(template1).toBe(template2);
      expect(template2).toBe(template3);
    });

    it('should work with all 12 sections', () => {
      // Act & Assert
      ALL_SECTIONS.forEach((section) => {
        const template = provider.getTemplateForFormat(section, 'EN', 'markdown');
        expect(template).toBeTruthy();
        expect(template.length).toBeGreaterThan(0);
      });
    });

    it('should fall back to English for unknown language with warning', () => {
      // Arrange
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Act
      const template = provider.getTemplateForFormat('01_introduction_and_goals', 'XX', 'markdown');

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

  describe('getWorkflowGuideForFormat', () => {
    it('should return markdown workflow guide for specified language', () => {
      // Act
      const guide = provider.getWorkflowGuideForFormat('DE', 'markdown');

      // Assert
      expect(guide).toContain('German Workflow Guide');
      expect(guide).toContain('#');
    });

    it('should return asciidoc workflow guide for specified language', () => {
      // Act
      const guide = provider.getWorkflowGuideForFormat('DE', 'asciidoc');

      // Assert
      expect(guide).toContain('German Workflow Guide');
      expect(guide).toContain('=');
    });

    it('should return English guide when no language specified', () => {
      // Act
      const guide = provider.getWorkflowGuideForFormat(undefined, 'markdown');

      // Assert
      expect(guide).toContain('English Workflow Guide');
    });
  });

  describe('getReadmeContentForFormat', () => {
    it('should return markdown README for specified language', () => {
      // Act
      const readme = provider.getReadmeContentForFormat('FR', undefined, 'markdown');

      // Assert
      expect(readme).toContain('French README');
      expect(readme).toContain('#');
    });

    it('should return asciidoc README for specified language', () => {
      // Act
      const readme = provider.getReadmeContentForFormat('FR', undefined, 'asciidoc');

      // Assert
      expect(readme).toContain('French README');
      expect(readme).toContain('=');
    });

    it('should return English README when no language specified', () => {
      // Act
      const readme = provider.getReadmeContentForFormat(undefined, undefined, 'markdown');

      // Assert
      expect(readme).toContain('English README');
    });
  });

  describe('getTemplateWithConfigAndFormat', () => {
    it('should use language from config.yaml when no parameter specified', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: DE\nprojectName: Test\n');

      // Act
      const template = provider.getTemplateWithConfigAndFormat('01_introduction_and_goals', tempDir);

      // Assert
      expect(template).toContain('German Template');
    });

    it('should override config with parameter', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: DE\nprojectName: Test\n');

      // Act
      const template = provider.getTemplateWithConfigAndFormat('01_introduction_and_goals', tempDir, 'FR');

      // Assert
      expect(template).toContain('French Template');
    });

    it('should fall back to English when config has no language', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'projectName: Test\n');

      // Act
      const template = provider.getTemplateWithConfigAndFormat('01_introduction_and_goals', tempDir);

      // Assert
      expect(template).toContain('English Template');
    });

    it('should fall back to English when config file does not exist', () => {
      // Act
      const template = provider.getTemplateWithConfigAndFormat('01_introduction_and_goals', '/nonexistent/path');

      // Assert
      expect(template).toContain('English Template');
    });

    it('should handle malformed config gracefully', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'not: valid: yaml: content:::');

      // Act
      const template = provider.getTemplateWithConfigAndFormat('01_introduction_and_goals', tempDir);

      // Assert
      expect(template).toContain('English Template');
    });

    it('should use format from config.yaml when no format parameter specified', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: EN\nformat: markdown\nprojectName: Test\n');

      // Act
      const template = provider.getTemplateWithConfigAndFormat('01_introduction_and_goals', tempDir);

      // Assert
      expect(template).toContain('#'); // Markdown heading
    });

    it('should override config format with parameter', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: EN\nformat: markdown\nprojectName: Test\n');

      // Act
      const template = provider.getTemplateWithConfigAndFormat('01_introduction_and_goals', tempDir, undefined, 'asciidoc');

      // Assert
      expect(template).toContain('='); // AsciiDoc heading
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

  describe('readFormatFromConfig', () => {
    it('should read format code from valid config', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'format: markdown\nprojectName: Test\n');

      // Act
      const format = provider.readFormatFromConfig(tempDir);

      // Assert
      expect(format).toBe('markdown');
    });

    it('should return undefined for missing config', () => {
      // Act
      const format = provider.readFormatFromConfig('/nonexistent/path');

      // Assert
      expect(format).toBeUndefined();
    });

    it('should return undefined for config without format', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'projectName: Test\n');

      // Act
      const format = provider.readFormatFromConfig(tempDir);

      // Assert
      expect(format).toBeUndefined();
    });

    it('should normalize format code to lowercase', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'format: ASCIIDOC\nprojectName: Test\n');

      // Act
      const format = provider.readFormatFromConfig(tempDir);

      // Assert
      expect(format).toBe('asciidoc');
    });

    it('should return undefined for invalid format values', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'format: invalid_format\nprojectName: Test\n');

      // Act
      const format = provider.readFormatFromConfig(tempDir);

      // Assert
      expect(format).toBeUndefined();
    });

    it('should return undefined for non-string format values', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'format: 123\nprojectName: Test\n');

      // Act
      const format = provider.readFormatFromConfig(tempDir);

      // Assert
      expect(format).toBeUndefined();
    });

    it('should handle format with whitespace', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'format: "  markdown  "\nprojectName: Test\n');

      // Act
      const format = provider.readFormatFromConfig(tempDir);

      // Assert
      expect(format).toBe('markdown');
    });

    it('should handle malformed config gracefully', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, ':::invalid yaml:::');

      // Act
      const format = provider.readFormatFromConfig(tempDir);

      // Assert
      expect(format).toBeUndefined();
    });
  });

  describe('readLanguageFromConfig - edge cases', () => {
    it('should return undefined for non-string language values', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: 123\nprojectName: Test\n');

      // Act
      const language = provider.readLanguageFromConfig(tempDir);

      // Assert
      expect(language).toBeUndefined();
    });

    it('should handle language with whitespace', () => {
      // Arrange
      const configPath = join(tempDir, 'config.yaml');
      writeFileSync(configPath, 'language: "  de  "\nprojectName: Test\n');

      // Act
      const language = provider.readLanguageFromConfig(tempDir);

      // Assert
      expect(language).toBe('DE');
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
