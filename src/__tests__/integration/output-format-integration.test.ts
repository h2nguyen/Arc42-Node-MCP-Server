/**
 * Integration Tests for Output Format Support
 *
 * Tests the complete workflow of initializing, reading, and updating
 * documentation with different output formats (Markdown and AsciiDoc).
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { arc42InitHandler } from '../../tools/arc42-init.js';
import { arc42StatusHandler } from '../../tools/arc42-status.js';
import { getSectionHandler } from '../../tools/get-section.js';
import { updateSectionHandler } from '../../tools/update-section.js';
import { generateTemplateHandler } from '../../tools/generate-template.js';
import { createTestContext } from '../fixtures/test-helpers.js';
import type { ToolContext } from '../../types.js';

describe('Output Format Integration', () => {
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

  describe('AsciiDoc Format (Default)', () => {
    it('should initialize workspace with AsciiDoc files by default', async () => {
      // Initialize without specifying format (should use AsciiDoc default)
      const initResult = await arc42InitHandler({ projectName: 'test-project' }, context);

      expect(initResult.success).toBe(true);

      // Verify AsciiDoc files are created
      expect(existsSync(join(context.workspaceRoot, 'README.adoc'))).toBe(true);
      expect(existsSync(join(context.workspaceRoot, 'arc42-documentation.adoc'))).toBe(true);
      expect(existsSync(join(context.workspaceRoot, 'sections', '01_introduction_and_goals.adoc'))).toBe(true);

      // Verify config.yaml contains format: asciidoc
      const configContent = readFileSync(join(context.workspaceRoot, 'config.yaml'), 'utf-8');
      expect(configContent).toContain('format: asciidoc');
    });

    it('should get section content from AsciiDoc files', async () => {
      // Initialize
      await arc42InitHandler({ projectName: 'test-project' }, context);

      // Get section
      const result = await getSectionHandler({ section: '01_introduction_and_goals' }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('01_introduction_and_goals');
      expect(result.data.format).toBe('asciidoc');
    });

    it('should update section maintaining AsciiDoc format', async () => {
      // Initialize
      await arc42InitHandler({ projectName: 'test-project' }, context);

      // Update section
      const newContent = '= Introduction and Goals\n\nUpdated content here.';
      const result = await updateSectionHandler({
        section: '01_introduction_and_goals',
        content: newContent
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.format).toBe('asciidoc');

      // Verify file content
      const fileContent = await readFile(
        join(context.workspaceRoot, 'sections', '01_introduction_and_goals.adoc'),
        'utf-8'
      );
      expect(fileContent).toBe(newContent);
    });

    it('should report correct format in status', async () => {
      // Initialize
      await arc42InitHandler({ projectName: 'test-project' }, context);

      // Get status
      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      expect(result.data.format.code).toBe('asciidoc');
      expect(result.data.format.name).toBe('AsciiDoc');
    });
  });

  describe('Markdown Format (Explicit)', () => {
    it('should initialize workspace with Markdown files when specified', async () => {
      // Initialize with explicit markdown format
      const initResult = await arc42InitHandler({
        projectName: 'test-project',
        format: 'markdown'
      }, context);

      expect(initResult.success).toBe(true);

      // Verify Markdown files are created
      expect(existsSync(join(context.workspaceRoot, 'README.md'))).toBe(true);
      expect(existsSync(join(context.workspaceRoot, 'arc42-documentation.md'))).toBe(true);
      expect(existsSync(join(context.workspaceRoot, 'sections', '01_introduction_and_goals.md'))).toBe(true);

      // Verify config.yaml contains format: markdown
      const configContent = readFileSync(join(context.workspaceRoot, 'config.yaml'), 'utf-8');
      expect(configContent).toContain('format: markdown');
    });

    it('should get section content from Markdown files', async () => {
      // Initialize with markdown
      await arc42InitHandler({ projectName: 'test-project', format: 'markdown' }, context);

      // Get section
      const result = await getSectionHandler({ section: '01_introduction_and_goals' }, context);

      expect(result.success).toBe(true);
      expect(result.data.section).toBe('01_introduction_and_goals');
      expect(result.data.format).toBe('markdown');
    });

    it('should update section maintaining Markdown format', async () => {
      // Initialize with markdown
      await arc42InitHandler({ projectName: 'test-project', format: 'markdown' }, context);

      // Update section
      const newContent = '# Introduction and Goals\n\nUpdated content here.';
      const result = await updateSectionHandler({
        section: '01_introduction_and_goals',
        content: newContent
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.format).toBe('markdown');

      // Verify file content
      const fileContent = await readFile(
        join(context.workspaceRoot, 'sections', '01_introduction_and_goals.md'),
        'utf-8'
      );
      expect(fileContent).toBe(newContent);
    });

    it('should report correct format in status', async () => {
      // Initialize with markdown
      await arc42InitHandler({ projectName: 'test-project', format: 'markdown' }, context);

      // Get status
      const result = await arc42StatusHandler({}, context);

      expect(result.success).toBe(true);
      expect(result.data.format.code).toBe('markdown');
      expect(result.data.format.name).toBe('Markdown');
    });
  });

  describe('Format Aliases', () => {
    it('should accept md as alias for markdown', async () => {
      const initResult = await arc42InitHandler({
        projectName: 'test-project',
        format: 'md'
      }, context);

      expect(initResult.success).toBe(true);
      expect(existsSync(join(context.workspaceRoot, 'README.md'))).toBe(true);
    });

    it('should accept adoc as alias for asciidoc', async () => {
      const initResult = await arc42InitHandler({
        projectName: 'test-project',
        format: 'adoc'
      }, context);

      expect(initResult.success).toBe(true);
      expect(existsSync(join(context.workspaceRoot, 'README.adoc'))).toBe(true);
    });
  });

  describe('Format Consistency', () => {
    it('should detect and maintain existing file format on update', async () => {
      // Initialize with AsciiDoc (default)
      await arc42InitHandler({ projectName: 'test-project' }, context);

      // Update a section
      const content = '= Updated Section\n\nNew content.';
      const result = await updateSectionHandler({
        section: '02_architecture_constraints',
        content
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.format).toBe('asciidoc');

      // Verify the .adoc file was updated
      const filePath = join(context.workspaceRoot, 'sections', '02_architecture_constraints.adoc');
      expect(existsSync(filePath)).toBe(true);
      const fileContent = await readFile(filePath, 'utf-8');
      expect(fileContent).toBe(content);
    });

    it('should use config format for new files when no existing file', async () => {
      // Initialize workspace directories only
      await mkdir(context.workspaceRoot, { recursive: true });
      await mkdir(join(context.workspaceRoot, 'sections'), { recursive: true });

      // Create config.yaml with markdown format
      const { writeFile } = await import('fs/promises');
      await writeFile(
        join(context.workspaceRoot, 'config.yaml'),
        'projectName: test\nformat: markdown\n'
      );

      // Update a section - should create .md file based on config
      const content = '# New Section\n\nContent here.';
      const result = await updateSectionHandler({
        section: '01_introduction_and_goals',
        content
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.format).toBe('markdown');

      // Verify .md file was created
      expect(existsSync(join(context.workspaceRoot, 'sections', '01_introduction_and_goals.md'))).toBe(true);
    });
  });

  describe('Generate Template with Format', () => {
    it('should include format information in generated template', async () => {
      // Generate template with AsciiDoc format
      const result = await generateTemplateHandler({
        section: '01_introduction_and_goals',
        format: 'asciidoc'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.format).toBe('asciidoc');
      expect(result.data.formatName).toBe('AsciiDoc');
      expect(result.data.fileExtension).toBe('.adoc');
    });

    it('should default to AsciiDoc format in template generation', async () => {
      // Generate template without specifying format
      const result = await generateTemplateHandler({
        section: '01_introduction_and_goals'
      }, context);

      expect(result.success).toBe(true);
      expect(result.data.format).toBe('asciidoc');
    });
  });

  describe('Complete Workflow', () => {
    it('should support full documentation workflow with AsciiDoc', async () => {
      // 1. Initialize workspace
      const initResult = await arc42InitHandler({
        projectName: 'complete-workflow-test',
        language: 'EN'
      }, context);
      expect(initResult.success).toBe(true);

      // 2. Check status
      const statusResult = await arc42StatusHandler({}, context);
      expect(statusResult.success).toBe(true);
      expect(statusResult.data.format.code).toBe('asciidoc');

      // 3. Get a section
      const getResult = await getSectionHandler({
        section: '01_introduction_and_goals'
      }, context);
      expect(getResult.success).toBe(true);

      // 4. Update the section
      const updateResult = await updateSectionHandler({
        section: '01_introduction_and_goals',
        content: '= Introduction and Goals\n\nThis system provides...',
        mode: 'replace'
      }, context);
      expect(updateResult.success).toBe(true);

      // 5. Verify the update persisted
      const verifyResult = await getSectionHandler({
        section: '01_introduction_and_goals'
      }, context);
      expect(verifyResult.data.content).toContain('This system provides');
    });

    it('should support full documentation workflow with Markdown', async () => {
      // 1. Initialize workspace with Markdown
      const initResult = await arc42InitHandler({
        projectName: 'markdown-workflow-test',
        format: 'markdown',
        language: 'EN'
      }, context);
      expect(initResult.success).toBe(true);

      // 2. Check status
      const statusResult = await arc42StatusHandler({}, context);
      expect(statusResult.success).toBe(true);
      expect(statusResult.data.format.code).toBe('markdown');

      // 3. Get a section
      const getResult = await getSectionHandler({
        section: '01_introduction_and_goals'
      }, context);
      expect(getResult.success).toBe(true);
      expect(getResult.data.format).toBe('markdown');

      // 4. Update the section
      const updateResult = await updateSectionHandler({
        section: '01_introduction_and_goals',
        content: '# Introduction and Goals\n\nThis system provides...',
        mode: 'replace'
      }, context);
      expect(updateResult.success).toBe(true);
      expect(updateResult.data.format).toBe('markdown');

      // 5. Verify the update persisted
      const verifyResult = await getSectionHandler({
        section: '01_introduction_and_goals'
      }, context);
      expect(verifyResult.data.content).toContain('This system provides');
      expect(verifyResult.data.format).toBe('markdown');
    });
  });
});
