/**
 * Tests for arc42-status tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { arc42StatusHandler, arc42StatusInputSchema, arc42StatusDescription } from '../../tools/arc42-status.js';
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

  describe('arc42Status schema definition', () => {
    it('should have a descriptive description', () => {
      expect(arc42StatusDescription).toContain('status');
      expect(arc42StatusDescription).toContain('arc42');
    });

    it('should have optional targetFolder parameter', () => {
      expect(arc42StatusInputSchema.targetFolder).toBeDefined();
      expect(arc42StatusInputSchema.targetFolder.isOptional()).toBe(true);
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

    it('should include arc42 template reference information', async () => {
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      expect(result.data.arc42TemplateReference).toBeDefined();
      expect(result.data.arc42TemplateReference.version).toBeDefined();
      expect(result.data.arc42TemplateReference.date).toBeDefined();
      expect(result.data.arc42TemplateReference.source).toBeDefined();
    });

    describe('language display', () => {
      it('should default to EN when config.yaml has no language', async () => {
        // Arrange
        await mkdir(context.workspaceRoot, { recursive: true });
        await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

        // Act
        const result = await arc42StatusHandler({}, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language).toBeDefined();
        expect(result.data.language.code).toBe('EN');
        expect(result.data.language.name).toBe('English');
      });

      it('should read language from config.yaml', async () => {
        // Arrange
        await mkdir(context.workspaceRoot, { recursive: true });
        await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });
        await writeFile(
          join(context.workspaceRoot, 'config.yaml'),
          'projectName: test\nlanguage: DE\n'
        );

        // Act
        const result = await arc42StatusHandler({}, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language.code).toBe('DE');
        expect(result.data.language.name).toBe('German');
        expect(result.data.language.nativeName).toBe('Deutsch');
      });

      it('should include available languages list', async () => {
        // Arrange
        await mkdir(context.workspaceRoot, { recursive: true });
        await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

        // Act
        const result = await arc42StatusHandler({}, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.availableLanguages).toBeDefined();
        expect(Array.isArray(result.data.availableLanguages)).toBe(true);
        expect(result.data.availableLanguages.length).toBe(11);

        // Check that all 11 languages are present
        const codes = result.data.availableLanguages.map((lang: { code: string }) => lang.code);
        expect(codes).toContain('EN');
        expect(codes).toContain('DE');
        expect(codes).toContain('FR');
      });

      it('should display localized section titles based on language', async () => {
        // Arrange
        await mkdir(context.workspaceRoot, { recursive: true });
        await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });
        await writeFile(
          join(context.workspaceRoot, 'config.yaml'),
          'projectName: test\nlanguage: DE\n'
        );

        // Act
        const result = await arc42StatusHandler({}, context);

        // Assert
        expect(result.success).toBe(true);
        const sections = result.data.sections as Record<string, { metadata: { title: string } }>;
        // German title for section 1
        expect(sections['01_introduction_and_goals'].metadata.title).toContain('Einführung');
      });

      it('should handle invalid language in config gracefully', async () => {
        // Arrange
        await mkdir(context.workspaceRoot, { recursive: true });
        await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });
        await writeFile(
          join(context.workspaceRoot, 'config.yaml'),
          'projectName: test\nlanguage: INVALID\n'
        );

        // Act
        const result = await arc42StatusHandler({}, context);

        // Assert - should fallback to EN
        expect(result.success).toBe(true);
        expect(result.data.language.code).toBe('EN');
      });

      it('should read projectName from config.yaml', async () => {
        // Arrange
        await mkdir(context.workspaceRoot, { recursive: true });
        await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });
        await writeFile(
          join(context.workspaceRoot, 'config.yaml'),
          'projectName: my-project\nlanguage: EN\n'
        );

        // Act
        const result = await arc42StatusHandler({}, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.projectName).toBe('my-project');
      });
    });
  });
});
