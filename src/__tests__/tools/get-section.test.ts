/**
 * Tests for get-section tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getSectionHandler, getSectionTool } from '../../tools/get-section.js';
import { createTestContext } from '../fixtures/test-helpers.js';
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

  describe('getSectionTool definition', () => {
    it('should have correct tool name', () => {
      expect(getSectionTool.name).toBe('get-section');
    });

    it('should have a descriptive description', () => {
      expect(getSectionTool.description).toContain('Read content');
      expect(getSectionTool.description).toContain('arc42');
    });

    it('should require section parameter', () => {
      expect(getSectionTool.inputSchema.required).toContain('section');
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
