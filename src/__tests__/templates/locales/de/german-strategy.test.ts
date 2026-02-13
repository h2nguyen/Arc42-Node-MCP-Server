/**
 * Tests for German Language Strategy
 *
 * Verifies GermanStrategy implements LanguageStrategy interface correctly
 * and returns expected German content for all sections.
 */

import { describe, it, expect } from 'vitest';
import { germanStrategy } from '../../../../templates/locales/de/index.js';
import type { LanguageStrategy } from '../../../../templates/locales/language-strategy.js';
import { ALL_SECTIONS } from '../../../fixtures/test-helpers.js';

describe('German Language Strategy', () => {
  describe('Interface Implementation', () => {
    it('should implement LanguageStrategy interface', () => {
      // Assert - verify it satisfies the interface
      const strategy: LanguageStrategy = germanStrategy;

      expect(strategy.code).toBe('DE');
      expect(strategy.name).toBe('German');
      expect(strategy.nativeName).toBe('Deutsch');
      expect(typeof strategy.getSectionTitle).toBe('function');
      expect(typeof strategy.getSectionDescription).toBe('function');
      expect(typeof strategy.getTemplate).toBe('function');
      expect(typeof strategy.getWorkflowGuide).toBe('function');
      expect(typeof strategy.getReadmeContent).toBe('function');
    });

    it('should have correct language properties', () => {
      expect(germanStrategy.code).toBe('DE');
      expect(germanStrategy.name).toBe('German');
      expect(germanStrategy.nativeName).toBe('Deutsch');
    });
  });

  describe('getSectionTitle', () => {
    it('should return German title for all 12 sections', () => {
      ALL_SECTIONS.forEach((section) => {
        const result = germanStrategy.getSectionTitle(section);

        expect(result.section).toBe(section);
        expect(result.title).toBeTruthy();
        expect(typeof result.title).toBe('string');
        expect(result.title.length).toBeGreaterThan(0);
      });
    });

    it('should return expected German titles', () => {
      expect(germanStrategy.getSectionTitle('01_introduction_and_goals').title)
        .toBe('Einführung und Ziele');
      expect(germanStrategy.getSectionTitle('02_architecture_constraints').title)
        .toBe('Randbedingungen');
      expect(germanStrategy.getSectionTitle('12_glossary').title)
        .toBe('Glossar');
    });

    it('should return different titles than English', () => {
      // German titles should be in German, not English
      const introTitle = germanStrategy.getSectionTitle('01_introduction_and_goals').title;
      expect(introTitle).not.toBe('Introduction and Goals');
      expect(introTitle).toBe('Einführung und Ziele');
    });
  });

  describe('getSectionDescription', () => {
    it('should return German description for all 12 sections', () => {
      ALL_SECTIONS.forEach((section) => {
        const result = germanStrategy.getSectionDescription(section);

        expect(result.section).toBe(section);
        expect(result.description).toBeTruthy();
        expect(typeof result.description).toBe('string');
        expect(result.description.length).toBeGreaterThan(0);
      });
    });

    it('should return meaningful German descriptions', () => {
      const intro = germanStrategy.getSectionDescription('01_introduction_and_goals');
      expect(intro.description).toContain('Qualitätsziele');

      const glossary = germanStrategy.getSectionDescription('12_glossary');
      expect(glossary.description.toLowerCase()).toContain('begriff');
    });
  });

  describe('getTemplate', () => {
    it('should return template for all 12 sections', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = germanStrategy.getTemplate(section);

        expect(template).toBeTruthy();
        expect(typeof template).toBe('string');
        expect(template.length).toBeGreaterThan(100);
      });
    });

    it('should return templates with markdown headings', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = germanStrategy.getTemplate(section);
        expect(template).toMatch(/^#/m);
      });
    });

    it('should return German template content', () => {
      const template = germanStrategy.getTemplate('01_introduction_and_goals');

      // Should contain German words
      expect(template).toContain('Aufgabenstellung');
      expect(template).toContain('Qualitätsziele');
      expect(template).toContain('Stakeholder');
    });

    it('should not contain undefined or null values', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = germanStrategy.getTemplate(section);
        expect(template).not.toContain('undefined');
        expect(template).not.toContain('null');
        expect(template).not.toContain('[object Object]');
      });
    });
  });

  describe('getWorkflowGuide', () => {
    it('should return workflow guide in German', () => {
      const guide = germanStrategy.getWorkflowGuide();

      expect(guide).toBeTruthy();
      expect(typeof guide).toBe('string');
      expect(guide.length).toBeGreaterThan(500);
    });

    it('should contain German workflow content', () => {
      const guide = germanStrategy.getWorkflowGuide();

      expect(guide).toContain('arc42');
      expect(guide).toContain('Erste Schritte');
      expect(guide).toContain('Verfügbare Sprachen');
    });
  });

  describe('getReadmeContent', () => {
    it('should return README in German', () => {
      const readme = germanStrategy.getReadmeContent();

      expect(readme).toBeTruthy();
      expect(typeof readme).toBe('string');
      expect(readme.length).toBeGreaterThan(200);
    });

    it('should contain German README content', () => {
      const readme = germanStrategy.getReadmeContent();

      expect(readme).toContain('Architektur-Dokumentation');
      expect(readme).toContain('arc42');
      expect(readme).toContain('Abschnitte');
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

      // Act - use germanStrategy where LanguageStrategy is expected
      const result = useStrategy(germanStrategy);

      // Assert
      expect(result.code).toBe('DE');
      expect(result.title).toBe('Einführung und Ziele');
      expect(result.template).toContain('Aufgabenstellung');
    });
  });
});
