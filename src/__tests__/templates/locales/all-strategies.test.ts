/**
 * Parameterized tests for all 11 language strategies
 *
 * Tests that all language strategies implement the LanguageStrategy interface
 * correctly and return valid content for all 12 arc42 sections.
 *
 * TDD Pattern: AAA (Arrange-Act-Assert)
 * S.O.L.I.D: LSP - verifies all strategies are substitutable
 */

import { describe, it, expect } from 'vitest';
import { ARC42_SECTIONS } from '../../../types.js';
import type { LanguageStrategy, LanguageCode } from '../../../templates/locales/language-strategy.js';

// Import all language strategies
import { englishStrategy } from '../../../templates/locales/en/index.js';
import { germanStrategy } from '../../../templates/locales/de/index.js';
import { czechStrategy } from '../../../templates/locales/cz/index.js';
import { spanishStrategy } from '../../../templates/locales/es/index.js';
import { frenchStrategy } from '../../../templates/locales/fr/index.js';
import { italianStrategy } from '../../../templates/locales/it/index.js';
import { dutchStrategy } from '../../../templates/locales/nl/index.js';
import { portugueseStrategy } from '../../../templates/locales/pt/index.js';
import { russianStrategy } from '../../../templates/locales/ru/index.js';
import { ukrainianStrategy } from '../../../templates/locales/ukr/index.js';
import { chineseStrategy } from '../../../templates/locales/zh/index.js';

// All strategies with their expected metadata
const strategies: Array<{
  strategy: LanguageStrategy;
  code: LanguageCode;
  name: string;
  nativeName: string;
}> = [
  { strategy: englishStrategy, code: 'EN', name: 'English', nativeName: 'English' },
  { strategy: germanStrategy, code: 'DE', name: 'German', nativeName: 'Deutsch' },
  { strategy: czechStrategy, code: 'CZ', name: 'Czech', nativeName: 'Čeština' },
  { strategy: spanishStrategy, code: 'ES', name: 'Spanish', nativeName: 'Español' },
  { strategy: frenchStrategy, code: 'FR', name: 'French', nativeName: 'Français' },
  { strategy: italianStrategy, code: 'IT', name: 'Italian', nativeName: 'Italiano' },
  { strategy: dutchStrategy, code: 'NL', name: 'Dutch', nativeName: 'Nederlands' },
  { strategy: portugueseStrategy, code: 'PT', name: 'Portuguese', nativeName: 'Português' },
  { strategy: russianStrategy, code: 'RU', name: 'Russian', nativeName: 'Русский' },
  { strategy: ukrainianStrategy, code: 'UKR', name: 'Ukrainian', nativeName: 'Українська' },
  { strategy: chineseStrategy, code: 'ZH', name: 'Chinese', nativeName: '中文' }
];

describe('All Language Strategies', () => {
  describe.each(strategies)('$name ($code) Strategy', ({ strategy, code, name, nativeName }) => {
    describe('Strategy metadata', () => {
      it('should have correct code', () => {
        expect(strategy.code).toBe(code);
      });

      it('should have correct name', () => {
        expect(strategy.name).toBe(name);
      });

      it('should have correct native name', () => {
        expect(strategy.nativeName).toBe(nativeName);
      });
    });

    describe('Section titles', () => {
      it.each(ARC42_SECTIONS)('should return non-empty title for section %s', (section) => {
        // Arrange
        const expectedSection = section;

        // Act
        const result = strategy.getSectionTitle(section);

        // Assert
        expect(result).toBeDefined();
        expect(result.section).toBe(expectedSection);
        expect(result.title).toBeDefined();
        expect(typeof result.title).toBe('string');
        expect(result.title.length).toBeGreaterThan(0);
      });
    });

    describe('Section descriptions', () => {
      it.each(ARC42_SECTIONS)('should return non-empty description for section %s', (section) => {
        // Arrange
        const expectedSection = section;

        // Act
        const result = strategy.getSectionDescription(section);

        // Assert
        expect(result).toBeDefined();
        expect(result.section).toBe(expectedSection);
        expect(result.description).toBeDefined();
        expect(typeof result.description).toBe('string');
        expect(result.description.length).toBeGreaterThan(0);
      });
    });

    describe('Section templates', () => {
      it.each(ARC42_SECTIONS)('should return valid markdown template for section %s', (section) => {
        // Arrange & Act
        const template = strategy.getTemplate(section);

        // Assert
        expect(template).toBeDefined();
        expect(typeof template).toBe('string');
        expect(template.length).toBeGreaterThan(0);
        // Template should start with a markdown heading
        expect(template.trim()).toMatch(/^#/);
      });
    });

    describe('Workflow guide', () => {
      it('should return non-empty workflow guide', () => {
        // Act
        const guide = strategy.getWorkflowGuide();

        // Assert
        expect(guide).toBeDefined();
        expect(typeof guide).toBe('string');
        expect(guide.length).toBeGreaterThan(100);
        // Should be markdown content
        expect(guide).toMatch(/^#/);
      });

      it('should contain key sections', () => {
        // Act
        const guide = strategy.getWorkflowGuide();

        // Assert - workflow guide should mention key concepts
        expect(guide.toLowerCase()).toContain('arc42');
      });
    });

    describe('README content', () => {
      it('should return non-empty README content', () => {
        // Act
        const readme = strategy.getReadmeContent();

        // Assert
        expect(readme).toBeDefined();
        expect(typeof readme).toBe('string');
        expect(readme.length).toBeGreaterThan(100);
      });

      it('should return README with project name when provided', () => {
        // Arrange
        const projectName = 'Test Project';

        // Act
        const readme = strategy.getReadmeContent(projectName);

        // Assert
        expect(readme).toContain(projectName);
      });
    });
  });

  describe('LSP Substitutability', () => {
    it('should have all strategies implement the same interface', () => {
      // Arrange
      const interfaceMethods = [
        'getSectionTitle',
        'getSectionDescription',
        'getTemplate',
        'getWorkflowGuide',
        'getReadmeContent'
      ];
      const interfaceProperties = ['code', 'name', 'nativeName'];

      // Act & Assert - verify all strategies have the same shape
      for (const { strategy, code } of strategies) {
        for (const method of interfaceMethods) {
          expect(
            typeof (strategy as Record<string, unknown>)[method],
            `${code} should have method ${method}`
          ).toBe('function');
        }
        for (const prop of interfaceProperties) {
          expect(
            (strategy as Record<string, unknown>)[prop],
            `${code} should have property ${prop}`
          ).toBeDefined();
        }
      }
    });

    it('should allow any strategy to be used interchangeably', () => {
      // Arrange
      const section = '01_introduction_and_goals';

      // Act & Assert - all strategies can be used the same way
      for (const { strategy } of strategies) {
        const title = strategy.getSectionTitle(section);
        const description = strategy.getSectionDescription(section);
        const template = strategy.getTemplate(section);

        expect(title.title).toBeDefined();
        expect(description.description).toBeDefined();
        expect(template.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Content quality', () => {
    it('should have unique section titles per language (not all empty)', () => {
      // For each language, collect all titles and verify they're not all empty
      for (const { strategy, code } of strategies) {
        const titles = ARC42_SECTIONS.map(section =>
          strategy.getSectionTitle(section).title
        );

        // All titles should be non-empty strings
        const nonEmptyTitles = titles.filter(t => t && t.trim().length > 0);
        expect(
          nonEmptyTitles.length,
          `${code} should have 12 non-empty section titles`
        ).toBe(12);
      }
    });

    it('should have all 12 templates available for each language', () => {
      for (const { strategy, code } of strategies) {
        let templateCount = 0;
        for (const section of ARC42_SECTIONS) {
          const template = strategy.getTemplate(section);
          if (template && template.length > 0) {
            templateCount++;
          }
        }
        expect(
          templateCount,
          `${code} should have all 12 templates`
        ).toBe(12);
      }
    });
  });
});
