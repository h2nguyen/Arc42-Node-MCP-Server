/**
 * Tests for get-section tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getSectionHandler, getSectionInputSchema, getSectionDescription } from '../../tools/get-section.js';
import { createTestContext, ALL_SECTIONS } from '../fixtures/test-helpers.js';
import type { ToolContext } from '../../types.js';

describe('get-section', () => {
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

  describe('getSection schema definition', () => {
    it('should have a descriptive description', () => {
      expect(getSectionDescription).toContain('Read content');
      expect(getSectionDescription).toContain('arc42');
    });

    it('should have section parameter with all 12 sections', () => {
      expect(getSectionInputSchema.section).toBeDefined();
      const sectionOptions = getSectionInputSchema.section._def.values;
      expect(sectionOptions).toHaveLength(12);
      ALL_SECTIONS.forEach(section => {
        expect(sectionOptions).toContain(section);
      });
    });

    it('should have optional targetFolder parameter', () => {
      expect(getSectionInputSchema.targetFolder).toBeDefined();
      expect(getSectionInputSchema.targetFolder.isOptional()).toBe(true);
    });
  });

  describe('getSectionHandler', () => {
    it('should fail if workspace is not initialized', async () => {
      const result = await getSectionHandler({ section: '01_introduction_and_goals' }, context);
      expect(result.success).toBe(false);
      expect(result.message).toContain('not initialized');
    });

    it('should fail if section file does not exist', async () => {
      // Create workspace root but not the section file
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const result = await getSectionHandler({ section: '01_introduction_and_goals' }, context);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Section file not found');
    });

    it('should successfully retrieve section content', async () => {
      // Initialize workspace and create a section file
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '01_introduction_and_goals';
      const sectionPath = join(context.workspaceRoot, 'sections', `${sectionName}.md`);
      const testContent = '# Introduction and Goals\n\nThis is a test content.';

      await writeFile(sectionPath, testContent);

      const result = await getSectionHandler({ section: sectionName }, context);

      expect(result.success).toBe(true);
      expect(result.message).toContain('retrieved successfully');
      expect(result.data.content).toBe(testContent);
      expect(result.data.section).toBe(sectionName);
      expect(result.data.metadata.wordCount).toBeGreaterThan(0);
    });

    it('should return 0 word count for empty file', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const sectionName = '02_architecture_constraints';
      const sectionPath = join(context.workspaceRoot, 'sections', `${sectionName}.md`);

      await writeFile(sectionPath, '');

      const result = await getSectionHandler({ section: sectionName }, context);

      expect(result.success).toBe(true);
      expect(result.data.content).toBe('');
      expect(result.data.metadata.wordCount).toBe(0);
    });

    it('should fail if section parameter is missing', async () => {
      const result = await getSectionHandler({}, context);
      expect(result.success).toBe(false);
      expect(result.message).toContain('required');
    });

    it('should fail if section parameter is undefined', async () => {
      const result = await getSectionHandler({ section: undefined }, context);
      expect(result.success).toBe(false);
      expect(result.message).toContain('required');
    });
  });
});
