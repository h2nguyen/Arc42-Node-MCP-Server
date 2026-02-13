/**
 * Tests for arc42-workflow-guide tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { arc42WorkflowGuideHandler, arc42WorkflowGuideInputSchema, arc42WorkflowGuideDescription } from '../../tools/arc42-workflow-guide.js';
import { createTestContext } from '../fixtures/test-helpers.js';
import type { ToolContext } from '../../types.js';

describe('arc42-workflow-guide', () => {
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

  describe('arc42WorkflowGuide schema definition', () => {
    it('should have a descriptive description', () => {
      expect(arc42WorkflowGuideDescription).toContain('workflow');
      expect(arc42WorkflowGuideDescription).toContain('arc42');
    });

    it('should have optional language parameter with enum values', () => {
      expect(arc42WorkflowGuideInputSchema.language).toBeDefined();
      expect(arc42WorkflowGuideInputSchema.language.isOptional()).toBe(true);
      // Check the enum values - schema is ZodDefault<ZodOptional<ZodEnum>>
      // Navigate through: default -> optional -> enum
      const optionalType = arc42WorkflowGuideInputSchema.language._def.innerType;
      const enumType = optionalType._def.innerType;
      const languageOptions = enumType._def.values;
      expect(languageOptions).toContain('EN');
      expect(languageOptions).toContain('DE');
    });
  });

  describe('arc42WorkflowGuideHandler', () => {
    it('should return success', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      expect(result.success).toBe(true);
    });

    it('should return guide in data', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      expect(result.success).toBe(true);
      expect(result.data.guide).toBeDefined();
      expect(typeof result.data.guide).toBe('string');
    });

    it('should include workspaceRoot in data', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      expect(result.success).toBe(true);
      expect(result.data.workspaceRoot).toBe(context.workspaceRoot);
    });

    it('should return a comprehensive guide', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      const guide = result.data.guide as string;

      // Should mention all 12 sections
      expect(guide).toContain('Introduction and Goals');
      expect(guide).toContain('Architecture Constraints');
      expect(guide).toContain('Context and Scope');
      expect(guide).toContain('Solution Strategy');
      expect(guide).toContain('Building Block View');
      expect(guide).toContain('Runtime View');
      expect(guide).toContain('Deployment View');
      expect(guide).toContain('Cross-cutting Concepts');
      expect(guide).toContain('Architecture Decisions');
      expect(guide).toContain('Quality Requirements');
      expect(guide).toContain('Risks and Technical Debt');
      expect(guide).toContain('Glossary');
    });

    it('should include getting started steps', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      const guide = result.data.guide as string;

      expect(guide).toContain('Step 1');
      expect(guide).toContain('Step 2');
      expect(guide).toContain('Step 3');
    });

    it('should include best practices', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      const guide = result.data.guide as string;

      expect(guide).toContain('Best Practices');
    });

    it('should include available tools', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      const guide = result.data.guide as string;

      expect(guide).toContain('arc42-init');
      expect(guide).toContain('arc42-status');
      expect(guide).toContain('generate-template');
      expect(guide).toContain('update-section');
    });

    it('should include arc42 website references', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      const guide = result.data.guide as string;

      expect(guide).toContain('arc42.org');
    });

    it('should include available languages', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      const guide = result.data.guide as string;

      expect(guide).toContain('Available Languages');
      expect(guide).toContain('EN');
      expect(guide).toContain('DE');
    });

    it('should include success message', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      expect(result.message).toContain('workflow guide');
      expect(result.message).toContain('successfully');
    });

    it('should include nextSteps in response', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      expect(result.nextSteps).toBeDefined();
      expect(result.nextSteps?.length).toBeGreaterThan(0);
    });

    it('should recommend arc42-init as a next step', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      const hasInitStep = result.nextSteps?.some((step: string) =>
        step.toLowerCase().includes('arc42-init')
      );
      expect(hasInitStep).toBe(true);
    });

    it('should work without any arguments', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      expect(result.success).toBe(true);
      expect(result.data.guide).toBeDefined();
    });

    it('should ignore extra arguments', async () => {
      const result = await arc42WorkflowGuideHandler({
        unknownParam: 'value',
        anotherParam: 123
      }, context);
      expect(result.success).toBe(true);
      expect(result.data.guide).toBeDefined();
    });

    describe('language parameter handling', () => {
      it('should default to EN when no language specified', async () => {
        // Arrange & Act
        const result = await arc42WorkflowGuideHandler({}, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language.code).toBe('EN');
      });

      it('should accept valid language code', async () => {
        // Arrange & Act
        const result = await arc42WorkflowGuideHandler({ language: 'DE' }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language.code).toBe('DE');
        expect(result.message).toContain('DE');
      });

      it('should return localized guide for German', async () => {
        // Arrange & Act
        const result = await arc42WorkflowGuideHandler({ language: 'DE' }, context);

        // Assert
        expect(result.success).toBe(true);
        const guide = result.data.guide as string;
        // German guide should have German content
        expect(guide).toContain('arc42');
      });

      it('should normalize lowercase language codes', async () => {
        // Arrange & Act
        const result = await arc42WorkflowGuideHandler({ language: 'de' }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language.code).toBe('DE');
      });

      it('should reject invalid language code', async () => {
        // Arrange & Act
        const result = await arc42WorkflowGuideHandler({ language: 'INVALID' }, context);

        // Assert
        expect(result.success).toBe(false);
        expect(result.message).toContain('Supported languages');
      });

      it('should include available languages in response', async () => {
        // Arrange & Act
        const result = await arc42WorkflowGuideHandler({}, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.availableLanguages).toBeDefined();
        expect(Array.isArray(result.data.availableLanguages)).toBe(true);
        expect(result.data.availableLanguages.length).toBe(11);
      });

      it('should include language name and native name', async () => {
        // Arrange & Act
        const result = await arc42WorkflowGuideHandler({ language: 'DE' }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language.name).toBe('German');
        expect(result.data.language.nativeName).toBe('Deutsch');
      });

      it.each(['EN', 'DE', 'ES', 'FR', 'IT', 'NL', 'PT', 'RU', 'CZ', 'UKR', 'ZH'])(
        'should return guide in %s language',
        async (langCode) => {
          // Act
          const result = await arc42WorkflowGuideHandler({ language: langCode }, context);

          // Assert
          expect(result.success).toBe(true);
          expect(result.data.language.code).toBe(langCode);
          expect(result.data.guide).toBeDefined();
          expect((result.data.guide as string).length).toBeGreaterThan(100);
        }
      );
    });
  });
});
