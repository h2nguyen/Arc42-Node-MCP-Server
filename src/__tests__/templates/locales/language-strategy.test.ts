/**
 * Tests for LanguageStrategy interface
 *
 * Tests that the interface is properly defined and compiles correctly
 * Following TDD: Write type tests first to verify the contract
 */

import { describe, it, expect } from 'vitest';
import type {
  LanguageStrategy,
  LanguageCode,
  SectionTitle,
  SectionDescription
} from '../../../templates/locales/language-strategy.js';
import type { Arc42Section } from '../../../types.js';
import { ALL_SECTIONS } from '../../fixtures/test-helpers.js';

describe('LanguageStrategy Interface', () => {
  describe('Type Contract', () => {
    it('should define LanguageCode type with all 11 supported languages', () => {
      // Type assertion test - if this compiles, the types are correct
      const validCodes: LanguageCode[] = [
        'EN', 'DE', 'CZ', 'ES', 'FR', 'IT', 'NL', 'PT', 'RU', 'UKR', 'ZH'
      ];
      expect(validCodes).toHaveLength(11);
    });

    it('should compile with a valid LanguageStrategy implementation', () => {
      // Mock implementation to verify interface compiles correctly
      const mockStrategy: LanguageStrategy = {
        code: 'EN',
        name: 'English',
        nativeName: 'English',

        getSectionTitle: (section: Arc42Section): SectionTitle => {
          return { title: 'Test Title', section };
        },

        getSectionDescription: (section: Arc42Section): SectionDescription => {
          return { description: 'Test Description', section };
        },

        getTemplate: (section: Arc42Section): string => {
          return `# Template for ${section}`;
        },

        getWorkflowGuide: (): string => {
          return '# Workflow Guide';
        },

        getReadmeContent: (): string => {
          return '# README Content';
        }
      };

      // Verify the mock implementation is valid
      expect(mockStrategy.code).toBe('EN');
      expect(mockStrategy.name).toBe('English');
      expect(mockStrategy.nativeName).toBe('English');
      expect(typeof mockStrategy.getSectionTitle).toBe('function');
      expect(typeof mockStrategy.getSectionDescription).toBe('function');
      expect(typeof mockStrategy.getTemplate).toBe('function');
      expect(typeof mockStrategy.getWorkflowGuide).toBe('function');
      expect(typeof mockStrategy.getReadmeContent).toBe('function');
    });
  });

  describe('Interface Method Signatures', () => {
    // Create a mock to test method signatures
    const mockStrategy: LanguageStrategy = {
      code: 'EN',
      name: 'English',
      nativeName: 'English',
      getSectionTitle: (section: Arc42Section) => ({ title: `Title: ${section}`, section }),
      getSectionDescription: (section: Arc42Section) => ({ description: `Desc: ${section}`, section }),
      getTemplate: (section: Arc42Section) => `Template: ${section}`,
      getWorkflowGuide: () => 'Workflow',
      getReadmeContent: () => 'Readme'
    };

    it('getSectionTitle should accept Arc42Section and return SectionTitle', () => {
      const result = mockStrategy.getSectionTitle('01_introduction_and_goals');

      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('section');
      expect(result.section).toBe('01_introduction_and_goals');
      expect(typeof result.title).toBe('string');
    });

    it('getSectionDescription should accept Arc42Section and return SectionDescription', () => {
      const result = mockStrategy.getSectionDescription('01_introduction_and_goals');

      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('section');
      expect(result.section).toBe('01_introduction_and_goals');
      expect(typeof result.description).toBe('string');
    });

    it('getTemplate should accept Arc42Section and return string', () => {
      const result = mockStrategy.getTemplate('01_introduction_and_goals');

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('getWorkflowGuide should return string without parameters', () => {
      const result = mockStrategy.getWorkflowGuide();

      expect(typeof result).toBe('string');
    });

    it('getReadmeContent should return string without parameters', () => {
      const result = mockStrategy.getReadmeContent();

      expect(typeof result).toBe('string');
    });

    it('should work with all 12 Arc42 sections', () => {
      ALL_SECTIONS.forEach((section) => {
        const title = mockStrategy.getSectionTitle(section);
        const description = mockStrategy.getSectionDescription(section);
        const template = mockStrategy.getTemplate(section);

        expect(title.section).toBe(section);
        expect(description.section).toBe(section);
        expect(template).toContain(section);
      });
    });
  });

  describe('Required Properties', () => {
    it('should require code property of type LanguageCode', () => {
      const strategy: LanguageStrategy = {
        code: 'DE',
        name: 'German',
        nativeName: 'Deutsch',
        getSectionTitle: () => ({ title: '', section: '01_introduction_and_goals' }),
        getSectionDescription: () => ({ description: '', section: '01_introduction_and_goals' }),
        getTemplate: () => '',
        getWorkflowGuide: () => '',
        getReadmeContent: () => ''
      };

      expect(strategy.code).toBe('DE');
    });

    it('should require name property (English name)', () => {
      const strategy: LanguageStrategy = {
        code: 'DE',
        name: 'German',
        nativeName: 'Deutsch',
        getSectionTitle: () => ({ title: '', section: '01_introduction_and_goals' }),
        getSectionDescription: () => ({ description: '', section: '01_introduction_and_goals' }),
        getTemplate: () => '',
        getWorkflowGuide: () => '',
        getReadmeContent: () => ''
      };

      expect(strategy.name).toBe('German');
    });

    it('should require nativeName property (name in native language)', () => {
      const strategy: LanguageStrategy = {
        code: 'DE',
        name: 'German',
        nativeName: 'Deutsch',
        getSectionTitle: () => ({ title: '', section: '01_introduction_and_goals' }),
        getSectionDescription: () => ({ description: '', section: '01_introduction_and_goals' }),
        getTemplate: () => '',
        getWorkflowGuide: () => '',
        getReadmeContent: () => ''
      };

      expect(strategy.nativeName).toBe('Deutsch');
    });
  });
});
