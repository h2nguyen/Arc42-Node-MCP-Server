/**
 * Tests for English Language Strategy
 *
 * Verifies EnglishStrategy implements LanguageStrategy interface correctly
 * and returns expected English content for all sections.
 */

import { describe, it, expect } from 'vitest';
import { englishStrategy } from '../../../../templates/locales/en/index.js';
import type { LanguageStrategy } from '../../../../templates/locales/language-strategy.js';
import { ALL_SECTIONS } from '../../../fixtures/test-helpers.js';

describe('English Language Strategy', () => {
  describe('Interface Implementation', () => {
    it('should implement LanguageStrategy interface', () => {
      // Assert - verify it satisfies the interface
      const strategy: LanguageStrategy = englishStrategy;

      expect(strategy.code).toBe('EN');
      expect(strategy.name).toBe('English');
      expect(strategy.nativeName).toBe('English');
      expect(typeof strategy.getSectionTitle).toBe('function');
      expect(typeof strategy.getSectionDescription).toBe('function');
      expect(typeof strategy.getTemplate).toBe('function');
      expect(typeof strategy.getWorkflowGuide).toBe('function');
      expect(typeof strategy.getReadmeContent).toBe('function');
    });

    it('should have correct language properties', () => {
      expect(englishStrategy.code).toBe('EN');
      expect(englishStrategy.name).toBe('English');
      expect(englishStrategy.nativeName).toBe('English');
    });
  });

  describe('getSectionTitle', () => {
    it('should return title for all 12 sections', () => {
      ALL_SECTIONS.forEach((section) => {
        const result = englishStrategy.getSectionTitle(section);

        expect(result.section).toBe(section);
        expect(result.title).toBeTruthy();
        expect(typeof result.title).toBe('string');
        expect(result.title.length).toBeGreaterThan(0);
      });
    });

    it('should return expected titles', () => {
      expect(englishStrategy.getSectionTitle('01_introduction_and_goals').title)
        .toBe('Introduction and Goals');
      expect(englishStrategy.getSectionTitle('02_architecture_constraints').title)
        .toBe('Architecture Constraints');
      expect(englishStrategy.getSectionTitle('12_glossary').title)
        .toBe('Glossary');
    });
  });

  describe('getSectionDescription', () => {
    it('should return description for all 12 sections', () => {
      ALL_SECTIONS.forEach((section) => {
        const result = englishStrategy.getSectionDescription(section);

        expect(result.section).toBe(section);
        expect(result.description).toBeTruthy();
        expect(typeof result.description).toBe('string');
        expect(result.description.length).toBeGreaterThan(0);
      });
    });

    it('should return meaningful descriptions', () => {
      const intro = englishStrategy.getSectionDescription('01_introduction_and_goals');
      expect(intro.description).toContain('quality goals');

      const glossary = englishStrategy.getSectionDescription('12_glossary');
      expect(glossary.description.toLowerCase()).toContain('term');
    });
  });

  describe('getTemplate', () => {
    it('should return template for all 12 sections', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = englishStrategy.getTemplate(section);

        expect(template).toBeTruthy();
        expect(typeof template).toBe('string');
        expect(template.length).toBeGreaterThan(100);
      });
    });

    it('should return templates with markdown headings', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = englishStrategy.getTemplate(section);
        expect(template).toMatch(/^#/m);
      });
    });

    it('should return Introduction template with expected content', () => {
      const template = englishStrategy.getTemplate('01_introduction_and_goals');

      expect(template).toContain('Requirements Overview');
      expect(template).toContain('Quality Goals');
      expect(template).toContain('Stakeholders');
    });

    it('should not contain undefined or null values', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = englishStrategy.getTemplate(section);
        expect(template).not.toContain('undefined');
        expect(template).not.toContain('null');
        expect(template).not.toContain('[object Object]');
      });
    });
  });

  describe('getWorkflowGuide', () => {
    it('should return workflow guide in English', () => {
      const guide = englishStrategy.getWorkflowGuide();

      expect(guide).toBeTruthy();
      expect(typeof guide).toBe('string');
      expect(guide.length).toBeGreaterThan(500);
    });

    it('should contain expected workflow content', () => {
      const guide = englishStrategy.getWorkflowGuide();

      expect(guide).toContain('arc42');
      expect(guide).toContain('Getting Started');
      expect(guide).toContain('12');
    });

    it('should include available languages', () => {
      const guide = englishStrategy.getWorkflowGuide();

      expect(guide).toContain('Available Languages');
      expect(guide).toContain('EN');
      expect(guide).toContain('DE');
    });
  });

  describe('getReadmeContent', () => {
    it('should return README in English', () => {
      const readme = englishStrategy.getReadmeContent();

      expect(readme).toBeTruthy();
      expect(typeof readme).toBe('string');
      expect(readme.length).toBeGreaterThan(200);
    });

    it('should contain expected README content', () => {
      const readme = englishStrategy.getReadmeContent();

      expect(readme).toContain('Architecture Documentation');
      expect(readme).toContain('arc42');
      expect(readme).toContain('sections');
    });
  });

  describe('LSP - Liskov Substitution Principle', () => {
    it('should be substitutable for LanguageStrategy', () => {
      // Create a function that expects LanguageStrategy
      function useStrategy(strategy: LanguageStrategy): {
        code: string;
        title: string;
        template: string;
      } {
        return {
          code: strategy.code,
          title: strategy.getSectionTitle('01_introduction_and_goals').title,
          template: strategy.getTemplate('01_introduction_and_goals')
        };
      }

      // Act - use englishStrategy where LanguageStrategy is expected
      const result = useStrategy(englishStrategy);

      // Assert
      expect(result.code).toBe('EN');
      expect(result.title).toBe('Introduction and Goals');
      expect(result.template).toContain('Requirements Overview');
    });
  });
});
