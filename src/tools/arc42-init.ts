import { z } from 'zod';
import { ToolContext, ToolResponse, resolveWorkspaceRoot, getErrorMessage } from '../types.js';
import {
  ARC42_REFERENCE,
  getArc42ReferenceConfig,
  templateProvider,
  SUPPORTED_LANGUAGE_CODES,
  isLanguageCode,
  normalizeLanguageCode
} from '../templates/index.js';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

// Zod schema as the SINGLE SOURCE OF TRUTH for tool input
const languageValues = SUPPORTED_LANGUAGE_CODES as unknown as [string, ...string[]];

export const arc42InitInputSchema = {
  projectName: z.string().describe('Name of the project being documented'),
  force: z.boolean().optional().describe('Force re-initialization even if workspace exists'),
  targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder where arc42-docs will be created. If not provided, uses the default workspace configured at server startup.'),
  language: z.enum(languageValues).optional().default('EN').describe('Language code for the documentation templates. Supported: EN (English), DE (German), ES (Spanish), FR (French), IT (Italian), NL (Dutch), PT (Portuguese), RU (Russian), CZ (Czech), UKR (Ukrainian), ZH (Chinese). Defaults to EN.')
};

export const arc42InitDescription = `Initialize arc42 documentation workspace for a project.

This tool creates the complete directory structure and template files for arc42 architecture documentation. It sets up all 12 sections with templates, configuration files, and a main documentation file.

Use this tool once at the beginning of your architecture documentation journey.

You can optionally specify a targetFolder to create the documentation in a specific directory instead of the default workspace.`;

export async function arc42InitHandler(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<ToolResponse> {
  const projectNameArg = args.projectName;
  const force = (args.force as boolean) ?? false;
  const targetFolder = args.targetFolder as string | undefined;
  const languageArg = (args.language as string) ?? 'EN';

  if (typeof projectNameArg !== 'string' || !projectNameArg) {
    return {
      success: false,
      message: 'Project name is required'
    };
  }

  // Validate and normalize language code
  let language: string;
  try {
    const normalizedLanguage = normalizeLanguageCode(languageArg);
    if (!isLanguageCode(normalizedLanguage)) {
      return {
        success: false,
        message: `Unsupported language code: ${languageArg}. Supported languages: ${SUPPORTED_LANGUAGE_CODES.join(', ')}`
      };
    }
    language = normalizedLanguage;
  } catch {
    return {
      success: false,
      message: `Invalid language code: ${languageArg}. Supported languages: ${SUPPORTED_LANGUAGE_CODES.join(', ')}`
    };
  }

  // Now TypeScript knows projectName is a string
  const projectName: string = projectNameArg;

  // Resolve workspace root - use targetFolder if provided, otherwise use context default
  const { workspaceRoot } = resolveWorkspaceRoot(context, targetFolder);

  // Check if workspace already exists
  if (existsSync(workspaceRoot) && !force) {
    return {
      success: false,
      message: `Workspace already exists at ${workspaceRoot}. Use force=true to re-initialize.`
    };
  }

  try {
    // Create directories
    await mkdir(workspaceRoot, { recursive: true });
    await mkdir(join(workspaceRoot, 'sections'), { recursive: true });
    await mkdir(join(workspaceRoot, 'images'), { recursive: true });

    // Create configuration with arc42 template reference
    const arc42Ref = getArc42ReferenceConfig();
    const config = {
      projectName,
      version: '1.0.0',
      created: new Date().toISOString(),
      format: 'markdown',
      language: language,
      // Include arc42 template reference info
      ...arc42Ref
    };

    await writeFile(
      join(workspaceRoot, 'config.yaml'),
      `# arc42 Documentation Configuration
projectName: ${projectName}
version: ${config.version}
created: ${config.created}
format: ${config.format}
language: ${language}

# arc42 Template Reference
# This documents which version of the arc42 template this documentation is based on.
# Source: ${ARC42_REFERENCE.sourceRepo}
arc42_template_version: ${ARC42_REFERENCE.version}
arc42_template_date: ${ARC42_REFERENCE.date}
arc42_template_commit: ${ARC42_REFERENCE.commitSha}
`
    );

    // Create README with localized content
    await writeFile(
      join(workspaceRoot, 'README.md'),
      templateProvider.getReadmeContent(language, projectName)
    );

    // Create main template file with localized section titles
    await writeFile(
      join(workspaceRoot, 'arc42-template.md'),
      getMainTemplateContent(projectName, language)
    );

    // Create section files (we'll create empty templates for now)
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

    for (const section of sections) {
      // Get localized section metadata
      const metadata = templateProvider.getSectionMetadata(section as import('../types.js').Arc42Section, language);
      await writeFile(
        join(workspaceRoot, 'sections', `${section}.md`),
        `# ${metadata.title}\n\n<!-- ${metadata.description} -->\n`
      );
    }

    return {
      success: true,
      message: `arc42 workspace initialized successfully for project: ${projectName} (language: ${language})`,
      data: {
        workspaceRoot,
        projectName,
        language,
        sectionsCreated: sections.length,
        config
      },
      nextSteps: [
        'Check workspace status with: arc42-status',
        'Generate section templates with: generate-template',
        'Start with Section 1: Introduction and Goals',
        'Read the workflow guide again if needed: arc42-workflow-guide'
      ]
    };

  } catch (error: unknown) {
    return {
      success: false,
      message: `Failed to initialize workspace: ${getErrorMessage(error)}`
    };
  }
}

function getMainTemplateContent(projectName: string, language: string): string {
  const date = new Date().toISOString().split('T')[0];

  // Get localized section titles for table of contents
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
  ] as const;

  const tocEntries = sections.map((section, index) => {
    const metadata = templateProvider.getSectionMetadata(section, language);
    return `${index + 1}. [${metadata.title}](sections/${section}.md)`;
  }).join('\n');

  return `# ${projectName} - Architecture Documentation

**Version**: 1.0.0
**Date**: ${date}
**Status**: Draft
**Language**: ${language}

---

This document describes the architecture of ${projectName} following the arc42 template.

## Table of Contents

${tocEntries}

---

## About arc42

arc42, the template for documentation of software and system architectures, was created by Dr. Gernot Starke and Dr. Peter Hruschka.

**Template Reference**: arc42 v${ARC42_REFERENCE.version} (${ARC42_REFERENCE.date})
**Source**: [${ARC42_REFERENCE.sourceRepo}](${ARC42_REFERENCE.sourceRepo})

© We acknowledge that this document uses material from the arc42 architecture template, https://arc42.org. Created by Dr. Gernot Starke, Dr. Peter Hruschka and contributors.
`;
}
