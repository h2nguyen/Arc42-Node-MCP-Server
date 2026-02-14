/**
 * Tests for arc42-init tool
 *
 * Tests workspace initialization functionality
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { arc42InitHandler, arc42InitInputSchema, arc42InitDescription } from '../../tools/arc42-init.js';
import { createTestContext, isWorkspaceInitialized, VALID_PROJECT_NAMES } from '../fixtures/test-helpers.js';
import type { ToolContext } from '../../types.js';

describe('arc42-init', () => {
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

  describe('arc42Init schema definition', () => {
    it('should have a descriptive description', () => {
      expect(arc42InitDescription).toContain('Initialize');
      expect(arc42InitDescription).toContain('arc42');
      expect(arc42InitDescription.length).toBeGreaterThan(50);
    });

    it('should have projectName schema defined as required string', () => {
      expect(arc42InitInputSchema.projectName).toBeDefined();
      expect(arc42InitInputSchema.projectName._def.typeName).toBe('ZodString');
    });

    it('should have optional force parameter as boolean', () => {
      expect(arc42InitInputSchema.force).toBeDefined();
      expect(arc42InitInputSchema.force.isOptional()).toBe(true);
    });

    it('should have optional language parameter with enum values', () => {
      expect(arc42InitInputSchema.language).toBeDefined();
      expect(arc42InitInputSchema.language.isOptional()).toBe(true);
      // Check the enum values - schema is ZodDefault<ZodOptional<ZodEnum>>
      // Navigate through: default -> optional -> enum
      const optionalType = arc42InitInputSchema.language._def.innerType;
      const enumType = optionalType._def.innerType;
      const languageOptions = enumType._def.values;
      expect(languageOptions).toContain('EN');
      expect(languageOptions).toContain('DE');
      expect(languageOptions).toHaveLength(11);
    });
  });

  describe('arc42InitHandler', () => {
    describe('successful initialization', () => {
      it('should initialize workspace with valid project name', async () => {
        const result = await arc42InitHandler({ projectName: 'test-project' }, context);

        expect(result.success).toBe(true);
        expect(result.message).toContain('initialized successfully');
        expect(isWorkspaceInitialized(context)).toBe(true);
      });

      it('should create all required directories', async () => {
        await arc42InitHandler({ projectName: 'test-project' }, context);

        expect(existsSync(context.workspaceRoot)).toBe(true);
        expect(existsSync(join(context.workspaceRoot, 'sections'))).toBe(true);
        expect(existsSync(join(context.workspaceRoot, 'images'))).toBe(true);
      });

      it('should create config.yaml with correct content', async () => {
        const projectName = 'my-awesome-project';
        await arc42InitHandler({ projectName }, context);

        const configPath = join(context.workspaceRoot, 'config.yaml');
        expect(existsSync(configPath)).toBe(true);

        const configContent = readFileSync(configPath, 'utf-8');
        expect(configContent).toContain(`projectName: ${projectName}`);
        expect(configContent).toContain('version: 1.0.0');
        expect(configContent).toContain('format: asciidoc'); // AsciiDoc is the new default
        expect(configContent).toContain('language: EN');
        // Check for arc42 template reference info
        expect(configContent).toContain('arc42_template_version:');
        expect(configContent).toContain('arc42_template_date:');
        expect(configContent).toContain('arc42_template_commit:');
      });

      it('should create README.adoc (default format)', async () => {
        await arc42InitHandler({ projectName: 'test-project' }, context);

        const readmePath = join(context.workspaceRoot, 'README.adoc');
        expect(existsSync(readmePath)).toBe(true);

        const readmeContent = readFileSync(readmePath, 'utf-8');
        expect(readmeContent).toContain('test-project');
        expect(readmeContent).toContain('Architecture Documentation');
      });

      it('should create arc42-documentation.adoc (default format)', async () => {
        await arc42InitHandler({ projectName: 'test-project' }, context);

        const templatePath = join(context.workspaceRoot, 'arc42-documentation.adoc');
        expect(existsSync(templatePath)).toBe(true);

        const templateContent = readFileSync(templatePath, 'utf-8');
        expect(templateContent).toContain('Table of Contents');
      });

      it('should create all 12 section files', async () => {
        await arc42InitHandler({ projectName: 'test-project' }, context);

        const sections = [
          '01_introduction_and_goals',
          '02_architecture_constraints',
          '03_context_and_scope',
          '04_solution_strategy',
          '05_building_block_view',
          '06_runtime_view',
          '07_deployment_view',
          '08_concepts',
          '09_architecture_decisions',
          '10_quality_requirements',
          '11_technical_risks',
          '12_glossary'
        ];

        sections.forEach(section => {
          const sectionPath = join(context.workspaceRoot, 'sections', `${section}.adoc`);
          expect(existsSync(sectionPath)).toBe(true);
        });
      });

      it('should work with various valid project names', async () => {
        for (const projectName of VALID_PROJECT_NAMES) {
          const { context: ctx, cleanup: cleanupCtx } = createTestContext();

          try {
            const result = await arc42InitHandler({ projectName }, ctx);
            expect(result.success).toBe(true);
          } finally {
            cleanupCtx();
          }
        }
      });

      it('should return data with workspace info', async () => {
        const result = await arc42InitHandler({ projectName: 'test-project' }, context);

        expect(result.data).toBeDefined();
        expect(result.data.workspaceRoot).toBe(context.workspaceRoot);
        expect(result.data.projectName).toBe('test-project');
        expect(result.data.sectionsCreated).toBe(12);
        expect(result.data.config).toBeDefined();
      });

      it('should provide next steps', async () => {
        const result = await arc42InitHandler({ projectName: 'test-project' }, context);

        expect(result.nextSteps).toBeDefined();
        expect(result.nextSteps?.length).toBeGreaterThan(0);
      });
    });

    describe('error handling', () => {
      it('should fail when project name is missing', async () => {
        const result = await arc42InitHandler({}, context);

        expect(result.success).toBe(false);
        expect(result.message).toContain('required');
      });

      it('should fail when project name is empty string', async () => {
        const result = await arc42InitHandler({ projectName: '' }, context);

        expect(result.success).toBe(false);
        expect(result.message).toContain('required');
      });

      it('should fail when workspace already exists without force', async () => {
        // Initialize first
        await arc42InitHandler({ projectName: 'test-project' }, context);

        // Try again without force
        const result = await arc42InitHandler({ projectName: 'test-project' }, context);

        expect(result.success).toBe(false);
        expect(result.message).toContain('already exists');
      });
    });

    describe('force re-initialization', () => {
      it('should allow re-initialization with force=true', async () => {
        // Initialize first
        await arc42InitHandler({ projectName: 'initial-project' }, context);

        // Re-initialize with force
        const result = await arc42InitHandler({
          projectName: 'new-project',
          force: true
        }, context);

        expect(result.success).toBe(true);
        expect(result.data.projectName).toBe('new-project');
      });

      it('should update config when force re-initializing', async () => {
        await arc42InitHandler({ projectName: 'old-project' }, context);
        await arc42InitHandler({ projectName: 'new-project', force: true }, context);

        const configContent = readFileSync(
          join(context.workspaceRoot, 'config.yaml'),
          'utf-8'
        );
        expect(configContent).toContain('projectName: new-project');
      });
    });

    describe('language parameter handling', () => {
      it('should default to EN when no language specified', async () => {
        // Arrange & Act
        const result = await arc42InitHandler({ projectName: 'test-project' }, context);

        // Assert
        expect(result.success).toBe(true);
        const configContent = readFileSync(join(context.workspaceRoot, 'config.yaml'), 'utf-8');
        expect(configContent).toContain('language: EN');
      });

      it('should accept valid language code', async () => {
        // Arrange & Act
        const result = await arc42InitHandler({ projectName: 'test-project', language: 'DE' }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.message).toContain('DE');
        expect(result.data.language).toBe('DE');
      });

      it('should save language to config.yaml', async () => {
        // Arrange & Act
        await arc42InitHandler({ projectName: 'test-project', language: 'FR' }, context);

        // Assert
        const configContent = readFileSync(join(context.workspaceRoot, 'config.yaml'), 'utf-8');
        expect(configContent).toContain('language: FR');
      });

      it('should normalize lowercase language codes to uppercase', async () => {
        // Arrange & Act
        const result = await arc42InitHandler({ projectName: 'test-project', language: 'de' }, context);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.language).toBe('DE');
        const configContent = readFileSync(join(context.workspaceRoot, 'config.yaml'), 'utf-8');
        expect(configContent).toContain('language: DE');
      });

      it('should reject invalid language code', async () => {
        // Arrange & Act
        const result = await arc42InitHandler({ projectName: 'test-project', language: 'INVALID' }, context);

        // Assert
        expect(result.success).toBe(false);
        expect(result.message).toContain('Invalid language code');
        expect(result.message).toContain('Supported');
      });

      it('should create localized section titles for German', async () => {
        // Arrange & Act
        await arc42InitHandler({ projectName: 'test-project', language: 'DE' }, context);

        // Assert - German section title (default format is AsciiDoc)
        const sectionContent = readFileSync(
          join(context.workspaceRoot, 'sections', '01_introduction_and_goals.adoc'),
          'utf-8'
        );
        expect(sectionContent).toContain('Einführung und Ziele');
      });

      it('should create README for specified language', async () => {
        // Arrange & Act
        await arc42InitHandler({ projectName: 'test-project', language: 'DE' }, context);

        // Assert - README with project name (default format is AsciiDoc)
        const readmeContent = readFileSync(join(context.workspaceRoot, 'README.adoc'), 'utf-8');
        expect(readmeContent).toContain('test-project');
        // README should contain standard arc42 structure information
        expect(readmeContent).toContain('Architecture Documentation');
      });

      it.each(['EN', 'DE', 'ES', 'FR', 'IT', 'NL', 'PT', 'RU', 'CZ', 'UKR', 'ZH'])(
        'should accept language code %s',
        async (langCode) => {
          // Arrange
          const { context: ctx, cleanup: cleanupCtx } = createTestContext();

          try {
            // Act
            const result = await arc42InitHandler({ projectName: 'test-project', language: langCode }, ctx);

            // Assert
            expect(result.success).toBe(true);
            expect(result.data.language).toBe(langCode);
          } finally {
            cleanupCtx();
          }
        }
      );
    });

  });
});
