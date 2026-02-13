/**
 * Tests for update-section tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { updateSectionHandler, updateSectionInputSchema, updateSectionDescription } from '../../tools/update-section.js';
import { createTestContext, createInitializedWorkspace, ALL_SECTIONS } from '../fixtures/test-helpers.js';
import type { ToolContext } from '../../types.js';

describe('update-section', () => {
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

  describe('updateSection schema definition', () => {
    it('should have a descriptive description', () => {
      expect(updateSectionDescription).toContain('Update content');
      expect(updateSectionDescription).toContain('arc42');
    });

    it('should have section schema defined', () => {
      expect(updateSectionInputSchema.section).toBeDefined();
      // Verify it's a Zod enum with section values
      const sectionOptions = updateSectionInputSchema.section._def.values;
      expect(sectionOptions).toHaveLength(12);
      ALL_SECTIONS.forEach(section => {
        expect(sectionOptions).toContain(section);
      });
    });

    it('should have content schema defined as string', () => {
      expect(updateSectionInputSchema.content).toBeDefined();
      expect(updateSectionInputSchema.content._def.typeName).toBe('ZodString');
    });

    it('should have mode parameter with replace and append options', () => {
      expect(updateSectionInputSchema.mode).toBeDefined();
      const modeOptions = updateSectionInputSchema.mode._def.innerType._def.values;
      expect(modeOptions).toContain('replace');
      expect(modeOptions).toContain('append');
    });

    it('should have optional targetFolder parameter', () => {
      expect(updateSectionInputSchema.targetFolder).toBeDefined();
      expect(updateSectionInputSchema.targetFolder.isOptional()).toBe(true);
    });
  });

  describe('updateSectionHandler', () => {
    it('should fail if section parameter is missing', async () => {
      const result = await updateSectionHandler({ content: 'test' }, context);
      expect(result.success).toBe(false);
      expect(result.message).toContain('required');
    });

    it('should fail if content parameter is missing', async () => {
      const result = await updateSectionHandler({ section: '01_introduction_and_goals' }, context);
      expect(result.success).toBe(false);
      expect(result.message).toContain('required');
    });

    it('should fail if workspace is not initialized', async () => {
      const result = await updateSectionHandler({
        section: '01_introduction_and_goals',
        content: 'Test content'
      }, context);
      expect(result.success).toBe(false);
      expect(result.message).toContain('not initialized');
    });

    it('should successfully update section with replace mode (default)', async () => {
      // Initialize workspace
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '01_introduction_and_goals';
      const testContent = '# Introduction and Goals\n\nThis is new content.';

      const result = await updateSectionHandler({
        section: sectionName,
        content: testContent
      }, context);

      expect(result.success).toBe(true);
      expect(result.message).toContain('updated successfully');
      expect(result.data.section).toBe(sectionName);
      expect(result.data.mode).toBe('replace');
      expect(result.data.wordCount).toBeGreaterThan(0);

      // Verify file was written
      const fileContent = await readFile(join(context.workspaceRoot, 'sections', `${sectionName}.md`), 'utf-8');
      expect(fileContent).toBe(testContent);
    });

    it('should replace existing content in replace mode', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '02_architecture_constraints';
      const sectionPath = join(context.workspaceRoot, 'sections', `${sectionName}.md`);
      const oldContent = '# Old Content\n\nThis will be replaced.';
      const newContent = '# New Content\n\nThis is the replacement.';

      await writeFile(sectionPath, oldContent);

      const result = await updateSectionHandler({
        section: sectionName,
        content: newContent,
        mode: 'replace'
      }, context);

      expect(result.success).toBe(true);

      const fileContent = await readFile(sectionPath, 'utf-8');
      expect(fileContent).toBe(newContent);
      expect(fileContent).not.toContain('Old Content');
    });

    it('should append content in append mode', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '03_context_and_scope';
      const sectionPath = join(context.workspaceRoot, 'sections', `${sectionName}.md`);
      const existingContent = '# Context and Scope\n\nExisting content here.';
      const appendContent = '## Additional Information\n\nAppended content.';

      await writeFile(sectionPath, existingContent);

      const result = await updateSectionHandler({
        section: sectionName,
        content: appendContent,
        mode: 'append'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.mode).toBe('append');

      const fileContent = await readFile(sectionPath, 'utf-8');
      expect(fileContent).toContain(existingContent);
      expect(fileContent).toContain(appendContent);
    });

    it('should create file if it does not exist in append mode', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '04_solution_strategy';
      const content = '# Solution Strategy\n\nNew content.';

      const result = await updateSectionHandler({
        section: sectionName,
        content: content,
        mode: 'append'
      }, context);

      expect(result.success).toBe(true);

      const fileContent = await readFile(join(context.workspaceRoot, 'sections', `${sectionName}.md`), 'utf-8');
      expect(fileContent).toBe(content);
    });

    it('should return correct word count', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '05_building_block_view';
      const content = 'One two three four five'; // 5 words

      const result = await updateSectionHandler({
        section: sectionName,
        content: content
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.wordCount).toBe(5);
    });

    it('should include nextSteps in response', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const result = await updateSectionHandler({
        section: '06_runtime_view',
        content: 'Test content'
      }, context);

      expect(result.success).toBe(true);
      expect(result.nextSteps).toBeDefined();
      expect(result.nextSteps?.length).toBeGreaterThan(0);
    });

    it('should work with targetFolder parameter', async () => {
      const { context: customContext, cleanup: customCleanup } = createInitializedWorkspace();

      try {
        const result = await updateSectionHandler({
          section: '07_deployment_view',
          content: '# Deployment View\n\nTest content.',
          targetFolder: customContext.projectPath
        }, context);

        expect(result.success).toBe(true);
      } finally {
        customCleanup();
      }
    });
  });
});
