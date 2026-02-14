import { z } from 'zod';
import { ToolContext, ToolResponse, resolveWorkspaceRoot, getErrorMessage } from '../types.js';
import {
  ARC42_REFERENCE,
  getArc42ReferenceConfig,
  templateProvider,
  SUPPORTED_LANGUAGE_CODES,
  isLanguageCode,
  normalizeLanguageCode,
  SUPPORTED_OUTPUT_FORMAT_CODES,
  DEFAULT_OUTPUT_FORMAT,
  outputFormatFactory,
  type OutputFormatStrategy
} from '../templates/index.js';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

// Zod schema as the SINGLE SOURCE OF TRUTH for tool input
const languageValues = SUPPORTED_LANGUAGE_CODES as unknown as [string, ...string[]];
const formatValues = ['markdown', 'asciidoc', 'md', 'adoc'] as const;

export const arc42InitInputSchema = {
  projectName: z.string().describe('Name of the project being documented'),
  force: z.boolean().optional().describe('Force re-initialization even if workspace exists'),
  targetFolder: z.string().optional().describe('Optional: Absolute path to the target folder where arc42-docs will be created. If not provided, uses the default workspace configured at server startup.'),
  language: z.enum(languageValues).optional().default('EN').describe('Language code for the documentation templates. Supported: EN (English), DE (German), ES (Spanish), FR (French), IT (Italian), NL (Dutch), PT (Portuguese), RU (Russian), CZ (Czech), UKR (Ukrainian), ZH (Chinese). Defaults to EN.'),
  format: z.enum(formatValues).optional().default(DEFAULT_OUTPUT_FORMAT).describe(`Output format for documentation files. Supported: markdown (md), asciidoc (adoc). Defaults to ${DEFAULT_OUTPUT_FORMAT}.`)
};

export const arc42InitDescription = `Initialize arc42 documentation workspace for a project.

This tool creates the complete directory structure and template files for arc42 architecture documentation. It sets up all 12 sections with templates, configuration files, and a main documentation file.

Use this tool once at the beginning of your architecture documentation journey.

You can optionally specify:
- targetFolder: Create documentation in a specific directory instead of the default workspace
- language: Language for templates (default: EN)
- format: Output format - markdown or asciidoc (default: asciidoc)`;

export async function arc42InitHandler(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<ToolResponse> {
  const projectNameArg = args.projectName;
  const force = (args.force as boolean) ?? false;
  const targetFolder = args.targetFolder as string | undefined;
  const languageArg = (args.language as string) ?? 'EN';
  const formatArg = (args.format as string) ?? DEFAULT_OUTPUT_FORMAT;

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

  // Validate and get format strategy
  let formatStrategy: OutputFormatStrategy;
  try {
    formatStrategy = outputFormatFactory.createWithFallback(formatArg);
  } catch {
    return {
      success: false,
      message: `Invalid format: ${formatArg}. Supported formats: ${SUPPORTED_OUTPUT_FORMAT_CODES.join(', ')}`
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
      format: formatStrategy.code,
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

    // Create README with appropriate format
    const readmeFilename = formatStrategy.getReadmeFilename();
    await writeFile(
      join(workspaceRoot, readmeFilename),
      getReadmeContent(projectName, language, formatStrategy)
    );

    // Create main template file with appropriate format
    const mainDocFilename = `arc42-documentation${formatStrategy.fileExtension}`;
    await writeFile(
      join(workspaceRoot, mainDocFilename),
      getMainTemplateContent(projectName, language, formatStrategy)
    );

    // Create section files
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
      const sectionFilename = formatStrategy.getSectionFilename(section);
      const sectionContent = getSectionContent(metadata.title, metadata.description, formatStrategy);
      await writeFile(
        join(workspaceRoot, 'sections', sectionFilename),
        sectionContent
      );
    }

    return {
      success: true,
      message: `arc42 workspace initialized successfully for project: ${projectName} (language: ${language}, format: ${formatStrategy.name})`,
      data: {
        workspaceRoot,
        projectName,
        language,
        format: formatStrategy.code,
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

/**
 * Generate section content using the format strategy
 */
function getSectionContent(
  title: string,
  description: string,
  formatStrategy: OutputFormatStrategy
): string {
  const heading = formatStrategy.formatHeading(title, 1);

  if (formatStrategy.code === 'asciidoc') {
    // AsciiDoc uses // for comments
    return `${heading}\n\n// ${description}\n`;
  } else {
    // Markdown uses <!-- --> for comments
    return `${heading}\n\n<!-- ${description} -->\n`;
  }
}

/**
 * Generate README content using the format strategy
 */
function getReadmeContent(
  projectName: string,
  _language: string,
  formatStrategy: OutputFormatStrategy
): string {
  const name = projectName || 'Project';
  const ext = formatStrategy.fileExtension;

  const heading = formatStrategy.formatHeading(`${name} - Architecture Documentation`, 1);
  const structureHeading = formatStrategy.formatHeading('Structure', 2);
  const sectionsHeading = formatStrategy.formatHeading('The 12 arc42 Sections', 2);
  const gettingStartedHeading = formatStrategy.formatHeading('Getting Started', 2);
  const generatingHeading = formatStrategy.formatHeading('Generating Documentation', 2);
  const resourcesHeading = formatStrategy.formatHeading('Resources', 2);

  const structureList = formatStrategy.formatUnorderedList([
    `sections/ - Individual section files (12 sections)`,
    `images/ - Diagrams and images`,
    `arc42-documentation${ext} - Main combined documentation`,
    `config.yaml - Configuration`
  ]);

  const sectionsList = formatStrategy.formatOrderedList([
    `${formatStrategy.formatBold('Introduction and Goals')} - Requirements, quality goals, stakeholders`,
    `${formatStrategy.formatBold('Architecture Constraints')} - Technical and organizational constraints`,
    `${formatStrategy.formatBold('Context and Scope')} - Business and technical context`,
    `${formatStrategy.formatBold('Solution Strategy')} - Fundamental decisions and strategies`,
    `${formatStrategy.formatBold('Building Block View')} - Static decomposition`,
    `${formatStrategy.formatBold('Runtime View')} - Dynamic behavior`,
    `${formatStrategy.formatBold('Deployment View')} - Infrastructure and deployment`,
    `${formatStrategy.formatBold('Cross-cutting Concepts')} - Overall regulations and approaches`,
    `${formatStrategy.formatBold('Architecture Decisions')} - Important decisions (ADRs)`,
    `${formatStrategy.formatBold('Quality Requirements')} - Quality tree and scenarios`,
    `${formatStrategy.formatBold('Risks and Technical Debt')} - Known problems and risks`,
    `${formatStrategy.formatBold('Glossary')} - Important terms`
  ]);

  const gettingStartedList = formatStrategy.formatOrderedList([
    'Start with Section 1: Introduction and Goals',
    'Work through sections iteratively',
    'Use diagrams to illustrate concepts',
    'Keep it focused on decisions, not implementation details'
  ]);

  const toolsList = formatStrategy.formatUnorderedList([
    `Check status: ${formatStrategy.formatInlineCode('arc42-status')}`,
    `Generate templates: ${formatStrategy.formatInlineCode('generate-template')}`,
    `Update sections: ${formatStrategy.formatInlineCode('update-section')}`
  ]);

  const resourcesList = formatStrategy.formatUnorderedList([
    formatStrategy.formatLink('arc42 Website', 'https://arc42.org/'),
    formatStrategy.formatLink('arc42 Documentation', 'https://docs.arc42.org/'),
    formatStrategy.formatLink('arc42 Examples', 'https://arc42.org/examples')
  ]);

  return `${heading}

This directory contains the architecture documentation for ${name}, following the arc42 template.

${structureHeading}

${structureList}

${sectionsHeading}

${sectionsList}

${gettingStartedHeading}

${gettingStartedList}

${generatingHeading}

Use the MCP tools to:

${toolsList}

${resourcesHeading}

${resourcesList}
`;
}

/**
 * Generate main documentation content using the format strategy
 */
function getMainTemplateContent(
  projectName: string,
  language: string,
  formatStrategy: OutputFormatStrategy
): string {
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

  const heading = formatStrategy.formatHeading(`${projectName} - Architecture Documentation`, 1);

  // Build metadata section
  let metadataSection: string;
  if (formatStrategy.code === 'asciidoc') {
    metadataSection = `:version: 1.0.0
:date: ${date}
:status: Draft
:lang: ${language}`;
  } else {
    metadataSection = `${formatStrategy.formatBold('Version')}: 1.0.0
${formatStrategy.formatBold('Date')}: ${date}
${formatStrategy.formatBold('Status')}: Draft
${formatStrategy.formatBold('Language')}: ${language}`;
  }

  // Build table of contents
  const tocHeading = formatStrategy.formatHeading('Table of Contents', 2);
  const tocEntries = sections.map((section, index) => {
    const metadata = templateProvider.getSectionMetadata(section, language);
    const sectionFile = `sections/${formatStrategy.getSectionFilename(section)}`;
    return `${index + 1}. ${formatStrategy.formatLink(metadata.title, sectionFile)}`;
  }).join('\n');

  const aboutHeading = formatStrategy.formatHeading('About arc42', 2);

  return `${heading}

${metadataSection}

${formatStrategy.formatHorizontalRule()}

This document describes the architecture of ${projectName} following the arc42 template.

${tocHeading}

${tocEntries}

${formatStrategy.formatHorizontalRule()}

${aboutHeading}

arc42, the template for documentation of software and system architectures, was created by Dr. Gernot Starke and Dr. Peter Hruschka.

${formatStrategy.formatBold('Template Reference')}: arc42 v${ARC42_REFERENCE.version} (${ARC42_REFERENCE.date})
${formatStrategy.formatBold('Source')}: ${formatStrategy.formatLink(ARC42_REFERENCE.sourceRepo, ARC42_REFERENCE.sourceRepo)}

© We acknowledge that this document uses material from the arc42 architecture template, https://arc42.org. Created by Dr. Gernot Starke, Dr. Peter Hruschka and contributors.
`;
}
