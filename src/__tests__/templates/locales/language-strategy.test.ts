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
import type { OutputFormatCode } from '../../../templates/formats/output-format-strategy.js';
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

        getTemplateForFormat: (section: Arc42Section, _format: OutputFormatCode): string => {
          return `# Template for ${section}`;
        },

        getWorkflowGuideForFormat: (_format: OutputFormatCode): string => {
          return '# Workflow Guide';
        },

        getReadmeContentForFormat: (_projectName: string | undefined, _format: OutputFormatCode): string => {
          return '# README Content';
        }
      };

      // Verify the mock implementation is valid
      expect(mockStrategy.code).toBe('EN');
      expect(mockStrategy.name).toBe('English');
      expect(mockStrategy.nativeName).toBe('English');
      expect(typeof mockStrategy.getSectionTitle).toBe('function');
      expect(typeof mockStrategy.getSectionDescription).toBe('function');
      expect(typeof mockStrategy.getTemplateForFormat).toBe('function');
      expect(typeof mockStrategy.getWorkflowGuideForFormat).toBe('function');
      expect(typeof mockStrategy.getReadmeContentForFormat).toBe('function');
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
      getTemplateForFormat: (section: Arc42Section, _format: OutputFormatCode) => `Template: ${section}`,
      getWorkflowGuideForFormat: (_format: OutputFormatCode) => 'Workflow',
      getReadmeContentForFormat: (_projectName: string | undefined, _format: OutputFormatCode) => 'Readme'
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

    it('getTemplateForFormat should accept Arc42Section and format, return string', () => {
      const result = mockStrategy.getTemplateForFormat('01_introduction_and_goals', 'markdown');

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('getWorkflowGuideForFormat should accept format and return string', () => {
      const result = mockStrategy.getWorkflowGuideForFormat('asciidoc');

      expect(typeof result).toBe('string');
    });

    it('getReadmeContentForFormat should accept projectName and format, return string', () => {
      const result = mockStrategy.getReadmeContentForFormat('MyProject', 'markdown');

      expect(typeof result).toBe('string');
    });

    it('should work with all 12 Arc42 sections', () => {
      ALL_SECTIONS.forEach((section) => {
        const title = mockStrategy.getSectionTitle(section);
        const description = mockStrategy.getSectionDescription(section);
        const template = mockStrategy.getTemplateForFormat(section, 'markdown');

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
        getTemplateForFormat: () => '',
        getWorkflowGuideForFormat: () => '',
        getReadmeContentForFormat: () => ''
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
        getTemplateForFormat: () => '',
        getWorkflowGuideForFormat: () => '',
        getReadmeContentForFormat: () => ''
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
        getTemplateForFormat: () => '',
        getWorkflowGuideForFormat: () => '',
        getReadmeContentForFormat: () => ''
      };

      expect(strategy.nativeName).toBe('Deutsch');
    });
  });
});
