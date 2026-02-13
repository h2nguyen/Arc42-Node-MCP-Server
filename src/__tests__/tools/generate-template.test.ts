/**
 * Tests for generate-template tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { generateTemplateHandler, generateTemplateInputSchema, generateTemplateDescription } from '../../tools/generate-template.js';
import { createTestContext, ALL_SECTIONS } from '../fixtures/test-helpers.js';
import type { ToolContext } from '../../types.js';

describe('generate-template', () => {
  let context: ToolContext;
  let cleanup: () => void;

  beforeEach(() => {
    const testSetup = createTestContext();
    context = testSetup.context;
    cleanup = testSetup.cleanup;
  });

  afterEach(() => {
    cleanup();
  });

  describe('generateTemplate schema definition', () => {
    it('should have a descriptive description', () => {
      expect(generateTemplateDescription).toContain('template');
      expect(generateTemplateDescription).toContain('arc42');
    });

    it('should have section parameter with all 12 sections', () => {
      expect(generateTemplateInputSchema.section).toBeDefined();
      const sectionOptions = generateTemplateInputSchema.section._def.values;
      expect(sectionOptions).toHaveLength(12);
      ALL_SECTIONS.forEach(section => {
        expect(sectionOptions).toContain(section);
      });
    });

    it('should have optional language parameter with enum values', () => {
      expect(generateTemplateInputSchema.language).toBeDefined();
      expect(generateTemplateInputSchema.language.isOptional()).toBe(true);
      // Check the enum values - schema is ZodDefault<ZodOptional<ZodEnum>>
      // Navigate through: default -> optional -> enum
      const optionalType = generateTemplateInputSchema.language._def.innerType;
      const enumType = optionalType._def.innerType;
      const languageOptions = enumType._def.values;
      expect(languageOptions).toContain('EN');
      expect(languageOptions).toContain('DE');
    });
  });

  describe('generateTemplateHandler', () => {
    it('should fail if section parameter is missing', async () => {
      const result = await generateTemplateHandler({}, context);
      expect(result.success).toBe(false);
      expect(result.message).toContain('required');
    });

    it('should generate template for section 01_introduction_and_goals', async () => {
      const result = await generateTemplateHandler({
        section: '01_introduction_and_goals'
      }, context);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Template');
      expect(result.message).toContain('Introduction');
      expect(result.data.section).toBe('01_introduction_and_goals');
      expect(result.data.metadata).toBeDefined();
      expect(result.data.template).toBeDefined();
    });

    it('should generate template for section 02_architecture_constraints', async () => {
      const result = await generateTemplateHandler({
        section: '02_architecture_constraints'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('02_architecture_constraints');
      expect(result.data.template).toContain('Constraints');
    });

    it('should generate template for section 03_context_and_scope', async () => {
      const result = await generateTemplateHandler({
        section: '03_context_and_scope'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('03_context_and_scope');
      expect(result.data.template).toContain('Context');
    });

    it('should generate template for section 04_solution_strategy', async () => {
      const result = await generateTemplateHandler({
        section: '04_solution_strategy'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('04_solution_strategy');
      expect(result.data.template).toContain('Strategy');
    });

    it('should generate template for section 05_building_block_view', async () => {
      const result = await generateTemplateHandler({
        section: '05_building_block_view'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('05_building_block_view');
      expect(result.data.template).toContain('Building Block');
    });

    it('should generate template for section 06_runtime_view', async () => {
      const result = await generateTemplateHandler({
        section: '06_runtime_view'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('06_runtime_view');
      expect(result.data.template).toContain('Runtime');
    });

    it('should generate template for section 07_deployment_view', async () => {
      const result = await generateTemplateHandler({
        section: '07_deployment_view'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('07_deployment_view');
      expect(result.data.template).toContain('Deployment');
    });

    it('should generate template for section 08_concepts', async () => {
      const result = await generateTemplateHandler({
        section: '08_concepts'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('08_concepts');
      expect(result.data.template).toContain('Concepts');
    });

    it('should generate template for section 09_architecture_decisions', async () => {
      const result = await generateTemplateHandler({
        section: '09_architecture_decisions'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('09_architecture_decisions');
      expect(result.data.template).toContain('Decision');
    });

    it('should generate template for section 10_quality_requirements', async () => {
      const result = await generateTemplateHandler({
        section: '10_quality_requirements'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('10_quality_requirements');
      expect(result.data.template).toContain('Quality');
    });

    it('should generate template for section 11_technical_risks', async () => {
      const result = await generateTemplateHandler({
        section: '11_technical_risks'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('11_technical_risks');
      expect(result.data.template).toContain('Risk');
    });

    it('should generate template for section 12_glossary', async () => {
      const result = await generateTemplateHandler({
        section: '12_glossary'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('12_glossary');
      expect(result.data.template).toContain('Glossary');
    });

    it('should include metadata with title for each section', async () => {
      for (const section of ALL_SECTIONS) {
        const result = await generateTemplateHandler({ section }, context);
        expect(result.success).toBe(true);
        expect(result.data.metadata.title).toBeDefined();
        expect(typeof result.data.metadata.title).toBe('string');
      }
    });

    it('should include nextSteps in response', async () => {
      const result = await generateTemplateHandler({
        section: '01_introduction_and_goals'
      }, context);

      expect(result.success).toBe(true);
      expect(result.nextSteps).toBeDefined();
      expect(result.nextSteps?.length).toBeGreaterThan(0);
    });

    it('should generate non-empty template for all sections', async () => {
      for (const section of ALL_SECTIONS) {
        const result = await generateTemplateHandler({ section }, context);
        expect(result.success).toBe(true);
        expect(result.data.template).toBeDefined();
        expect(result.data.template.length).toBeGreaterThan(0);
      }
    });

    it('should handle error when invalid section causes runtime error', async () => {
      // Pass an invalid section to trigger a runtime error when accessing metadata.title
      const result = await generateTemplateHandler({
        section: 'invalid_section_that_does_not_exist'
      }, context);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Failed to generate template');
    });

    it('should convert Error instance to message string', async () => {
      // Pass invalid section to trigger error - Error instance path
      const result = await generateTemplateHandler({
        section: '99_nonexistent'
      }, context);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Failed to generate template');
      // Error message should be a string
      expect(typeof result.message).toBe('string');
    });

    it('should handle error gracefully for malformed section input', async () => {
      // Test with various invalid section values to ensure catch block is executed
      const invalidSections = [
        'not_a_valid_section',
        '00_invalid',
        '13_extra_section',
        'INVALID_UPPERCASE'
      ];

      for (const invalidSection of invalidSections) {
        const result = await generateTemplateHandler({
          section: invalidSection
        }, context);

        expect(result.success).toBe(false);
        expect(result.message).toBeDefined();
        expect(result.message).toContain('Failed to generate template');
      }
    });

    describe('language parameter handling', () => {
      it('should default to EN when no language specified', async () => {
        // Arrange & Act
        const result = await generateTemplateHandler({
          section: '01_introduction_and_goals'
        }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language).toBe('EN');
      });

      it('should accept valid language code', async () => {
        // Arrange & Act
        const result = await generateTemplateHandler({
          section: '01_introduction_and_goals',
          language: 'DE'
        }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language).toBe('DE');
        expect(result.message).toContain('DE');
      });

      it('should return localized template for German', async () => {
        // Arrange & Act
        const result = await generateTemplateHandler({
          section: '01_introduction_and_goals',
          language: 'DE'
        }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.metadata.title).toContain('Einführung');
      });

      it('should normalize lowercase language codes', async () => {
        // Arrange & Act
        const result = await generateTemplateHandler({
          section: '01_introduction_and_goals',
          language: 'de'
        }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language).toBe('DE');
      });

      it('should reject invalid language code', async () => {
        // Arrange & Act
        const result = await generateTemplateHandler({
          section: '01_introduction_and_goals',
          language: 'INVALID'
        }, context);

        // Assert
        expect(result.success).toBe(false);
        expect(result.message).toContain('Invalid language code');
      });

      it('should include languageCode in metadata', async () => {
        // Arrange & Act
        const result = await generateTemplateHandler({
          section: '01_introduction_and_goals',
          language: 'FR'
        }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.metadata.languageCode).toBe('FR');
      });

      it.each(['EN', 'DE', 'ES', 'FR', 'IT', 'NL', 'PT', 'RU', 'CZ', 'UKR', 'ZH'])(
        'should generate template in %s language',
        async (langCode) => {
          // Act
          const result = await generateTemplateHandler({
            section: '01_introduction_and_goals',
            language: langCode
          }, context);

          // Assert
          expect(result.success).toBe(true);
          expect(result.data.language).toBe(langCode);
          expect(result.data.template).toBeDefined();
          expect(result.data.template.length).toBeGreaterThan(0);
        }
      );
    });
  });
});
