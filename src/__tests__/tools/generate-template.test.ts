/**
 * Tests for generate-template tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { generateTemplateHandler, generateTemplateTool } from '../../tools/generate-template.js';
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

  describe('generateTemplateTool definition', () => {
    it('should have correct tool name', () => {
      expect(generateTemplateTool.name).toBe('generate-template');
    });

    it('should have a descriptive description', () => {
      expect(generateTemplateTool.description).toContain('template');
      expect(generateTemplateTool.description).toContain('arc42');
    });

    it('should require section parameter', () => {
      expect(generateTemplateTool.inputSchema.required).toContain('section');
    });

    it('should list all 12 sections in enum', () => {
      const properties = generateTemplateTool.inputSchema.properties as Record<string, { enum?: string[] }>;
      expect(properties.section.enum).toHaveLength(12);
      ALL_SECTIONS.forEach(section => {
        expect(properties.section.enum).toContain(section);
      });
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
  });
});
