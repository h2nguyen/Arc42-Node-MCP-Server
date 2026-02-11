/**
 * Tests for arc42-status tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { arc42StatusHandler, arc42StatusTool } from '../../tools/arc42-status.js';
import { createTestContext, createInitializedWorkspace, createWorkspaceWithContent, ALL_SECTIONS } from '../fixtures/test-helpers.js';
import type { ToolContext } from '../../types.js';

describe('arc42-status', () => {
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

  describe('arc42StatusTool definition', () => {
    it('should have correct tool name', () => {
      expect(arc42StatusTool.name).toBe('arc42-status');
    });

    it('should have a descriptive description', () => {
      expect(arc42StatusTool.description).toContain('status');
      expect(arc42StatusTool.description).toContain('arc42');
    });

    it('should have optional targetFolder parameter', () => {
      const properties = arc42StatusTool.inputSchema.properties as Record<string, unknown>;
      expect(properties.targetFolder).toBeDefined();
      // No required parameters
      expect(arc42StatusTool.inputSchema.required).toBeUndefined();
    });
  });

  describe('arc42StatusHandler', () => {
    it('should fail if workspace is not initialized', async () => {
      const result = await arc42StatusHandler({}, context);
      expect(result.success).toBe(false);
      expect(result.message).toContain('not initialized');
    });

    it('should return status for initialized workspace', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      expect(result.data.initialized).toBe(true);
      expect(result.data.workspaceRoot).toBe(context.workspaceRoot);
      expect(result.data.sections).toBeDefined();
    });

    it('should show 0/12 sections with content for empty workspace', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      expect(result.message).toContain('0/12 sections');
    });

    it('should report section exists as false when section file is missing', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      
      const sections = result.data.sections as Record<string, { exists: boolean }>;
      ALL_SECTIONS.forEach(section => {
        expect(sections[section].exists).toBe(false);
      });
    });

    it('should report section exists as true when section file is present', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '01_introduction_and_goals';
      const sectionPath = join(context.workspaceRoot, 'sections', `${sectionName}.md`);
      await writeFile(sectionPath, '# Introduction\n\nSome content here.');

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      
      const sections = result.data.sections as Record<string, { exists: boolean }>;
      expect(sections[sectionName].exists).toBe(true);
    });

    it('should calculate word count for existing sections', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '02_architecture_constraints';
      const sectionPath = join(context.workspaceRoot, 'sections', `${sectionName}.md`);
      const content = 'word1 word2 word3 word4 word5'; // 5 words
      await writeFile(sectionPath, content);

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      
      const sections = result.data.sections as Record<string, { wordCount: number }>;
      expect(sections[sectionName].wordCount).toBe(5);
    });

    it('should calculate completeness based on word count', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '03_context_and_scope';
      const sectionPath = join(context.workspaceRoot, 'sections', `${sectionName}.md`);
      // 50 words = 50% completeness
      const content = Array(50).fill('word').join(' ');
      await writeFile(sectionPath, content);

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      
      const sections = result.data.sections as Record<string, { completeness: number }>;
      expect(sections[sectionName].completeness).toBe(50);
    });

    it('should cap completeness at 100%', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '04_solution_strategy';
      const sectionPath = join(context.workspaceRoot, 'sections', `${sectionName}.md`);
      // 150 words should cap at 100%
      const content = Array(150).fill('word').join(' ');
      await writeFile(sectionPath, content);

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      
      const sections = result.data.sections as Record<string, { completeness: number }>;
      expect(sections[sectionName].completeness).toBe(100);
    });

    it('should calculate overall completeness', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      expect(result.data.overallCompleteness).toBeDefined();
      expect(typeof result.data.overallCompleteness).toBe('number');
    });

    it('should include lastModified timestamp', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionPath = join(context.workspaceRoot, 'sections', '01_introduction_and_goals.md');
      await writeFile(sectionPath, 'Content');

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      expect(result.data.lastModified).toBeDefined();
    });

    it('should include metadata for each section', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      
      const sections = result.data.sections as Record<string, { metadata: { title: string } }>;
      expect(sections['01_introduction_and_goals'].metadata).toBeDefined();
      expect(sections['01_introduction_and_goals'].metadata.title).toContain('Introduction');
    });

    it('should include nextSteps in response', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      expect(result.nextSteps).toBeDefined();
      expect(result.nextSteps?.length).toBeGreaterThan(0);
    });

    it('should work with targetFolder parameter', async () => {
      const { context: customContext, cleanup: customCleanup } = createInitializedWorkspace();
      
      try {
        const result = await arc42StatusHandler({
          targetFolder: customContext.projectPath
        }, context);

        expect(result.success).toBe(true);
        expect(result.data.initialized).toBe(true);
      } finally {
        customCleanup();
      }
    });

    it('should correctly count sections with content', async () => {
      const { context: contentContext, cleanup: contentCleanup } = createWorkspaceWithContent();
      
      try {
        const result = await arc42StatusHandler({
          targetFolder: contentContext.projectPath
        }, context);

        expect(result.success).toBe(true);
        // createWorkspaceWithContent creates 3 sections with content
        expect(result.message).toMatch(/\d\/12 sections/);
      } finally {
        contentCleanup();
      }
    });
  });
});
