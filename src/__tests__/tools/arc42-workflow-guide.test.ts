/**
 * Tests for arc42-workflow-guide tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { arc42WorkflowGuideHandler, arc42WorkflowGuideTool } from '../../tools/arc42-workflow-guide.js';
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

  describe('arc42WorkflowGuideTool definition', () => {
    it('should have correct tool name', () => {
      expect(arc42WorkflowGuideTool.name).toBe('arc42-workflow-guide');
    });

    it('should have a descriptive description', () => {
      expect(arc42WorkflowGuideTool.description).toContain('workflow');
      expect(arc42WorkflowGuideTool.description).toContain('arc42');
    });

    it('should not have any required parameters', () => {
      const required = arc42WorkflowGuideTool.inputSchema.required;
      expect(required === undefined || (Array.isArray(required) && required.length === 0)).toBe(true);
    });

    it('should have empty properties', () => {
      const properties = arc42WorkflowGuideTool.inputSchema.properties as Record<string, unknown>;
      expect(Object.keys(properties).length).toBe(0);
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

    it('should include workflow phases', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      const guide = result.data.guide as string;
      
      expect(guide).toContain('Phase 1');
      expect(guide).toContain('Phase 2');
      expect(guide).toContain('Phase 3');
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

    it('should include file structure documentation', async () => {
      const result = await arc42WorkflowGuideHandler({}, context);
      const guide = result.data.guide as string;
      
      expect(guide).toContain('arc42-docs');
      expect(guide).toContain('sections');
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
  });
});
