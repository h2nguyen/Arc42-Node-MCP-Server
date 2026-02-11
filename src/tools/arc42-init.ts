import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse, resolveWorkspaceRoot } from '../types.js';
import { ARC42_REFERENCE, getArc42ReferenceConfig } from '../templates/index.js';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export const arc42InitTool: Tool = {
  name: 'arc42-init',
  description: `Initialize arc42 documentation workspace for a project.

This tool creates the complete directory structure and template files for arc42 architecture documentation. It sets up all 12 sections with templates, configuration files, and a main documentation file.

Use this tool once at the beginning of your architecture documentation journey.

You can optionally specify a targetFolder to create the documentation in a specific directory instead of the default workspace.`,
  inputSchema: {
    type: 'object',
    properties: {
      projectName: {
        type: 'string',
        description: 'Name of the project being documented'
      },
      force: {
        type: 'boolean',
        description: 'Force re-initialization even if workspace exists',
        default: false
      },
      targetFolder: {
        type: 'string',
        description: 'Optional: Absolute path to the target folder where arc42-docs will be created. If not provided, uses the default workspace configured at server startup.'
      }
    },
    required: ['projectName']
  }
};

export async function arc42InitHandler(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<ToolResponse> {
  const projectNameArg = args.projectName;
  const force = (args.force as boolean) ?? false;
  const targetFolder = args.targetFolder as string | undefined;

  if (typeof projectNameArg !== 'string' || !projectNameArg) {
    return {
      success: false,
      message: 'Project name is required'
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
      language: 'en',
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
language: ${config.language}

# arc42 Template Reference
# This documents which version of the arc42 template this documentation is based on.
# Source: ${ARC42_REFERENCE.sourceRepo}
arc42_template_version: ${ARC42_REFERENCE.version}
arc42_template_date: ${ARC42_REFERENCE.date}
arc42_template_commit: ${ARC42_REFERENCE.commitSha}
`
    );

    // Create README
    await writeFile(
      join(workspaceRoot, 'README.md'),
      getReadmeContent(projectName)
    );

    // Create main template file
    await writeFile(
      join(workspaceRoot, 'arc42-template.md'),
      getMainTemplateContent(projectName)
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
      await writeFile(
        join(workspaceRoot, 'sections', `${section}.md`),
        `# ${section.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}\n\n<!-- Content will be generated here -->\n`
      );
    }

    return {
      success: true,
      message: `arc42 workspace initialized successfully for project: ${projectName}`,
      data: {
        workspaceRoot,
        projectName,
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Failed to initialize workspace: ${errorMessage}`
    };
  }
}

function getReadmeContent(projectName: string): string {
  return `# ${projectName} - Architecture Documentation

This directory contains the architecture documentation for ${projectName}, following the arc42 template.

## Structure

- \`sections/\` - Individual section markdown files (12 sections)
- \`images/\` - Diagrams and images
- \`arc42-template.md\` - Main combined documentation
- \`config.yaml\` - Configuration

## The 12 arc42 Sections

1. **Introduction and Goals** - Requirements, quality goals, stakeholders
2. **Architecture Constraints** - Technical and organizational constraints  
3. **Context and Scope** - Business and technical context
4. **Solution Strategy** - Fundamental decisions and strategies
5. **Building Block View** - Static decomposition
6. **Runtime View** - Dynamic behavior
7. **Deployment View** - Infrastructure and deployment
8. **Cross-cutting Concepts** - Overall regulations and approaches
9. **Architecture Decisions** - Important decisions (ADRs)
10. **Quality Requirements** - Quality tree and scenarios
11. **Risks and Technical Debt** - Known problems and risks
12. **Glossary** - Important terms

## Getting Started

1. Start with Section 1: Introduction and Goals
2. Work through sections iteratively
3. Use diagrams to illustrate concepts
4. Keep it focused on decisions, not implementation details

## Generating Documentation

Use the MCP tools to:
- Check status: \`arc42-status\`
- Generate templates: \`generate-template\`
- Update sections: \`update-section\`

## Resources

- [arc42 Website](https://arc42.org/)
- [arc42 Documentation](https://docs.arc42.org/)
- [arc42 Examples](https://arc42.org/examples)
`;
}

function getMainTemplateContent(projectName: string): string {
  const date = new Date().toISOString().split('T')[0];
  return `# ${projectName} - Architecture Documentation

**Version**: 1.0.0  
**Date**: ${date}  
**Status**: Draft

---

This document describes the architecture of ${projectName} following the arc42 template.

## Table of Contents

1. [Introduction and Goals](sections/01_introduction_and_goals.md)
2. [Architecture Constraints](sections/02_architecture_constraints.md)
3. [Context and Scope](sections/03_context_and_scope.md)
4. [Solution Strategy](sections/04_solution_strategy.md)
5. [Building Block View](sections/05_building_block_view.md)
6. [Runtime View](sections/06_runtime_view.md)
7. [Deployment View](sections/07_deployment_view.md)
8. [Cross-cutting Concepts](sections/08_concepts.md)
9. [Architecture Decisions](sections/09_architecture_decisions.md)
10. [Quality Requirements](sections/10_quality_requirements.md)
11. [Risks and Technical Debt](sections/11_technical_risks.md)
12. [Glossary](sections/12_glossary.md)

---

## About arc42

arc42, the template for documentation of software and system architectures, was created by Dr. Gernot Starke and Dr. Peter Hruschka.

**Template Reference**: arc42 v${ARC42_REFERENCE.version} (${ARC42_REFERENCE.date})  
**Source**: [${ARC42_REFERENCE.sourceRepo}](${ARC42_REFERENCE.sourceRepo})

© We acknowledge that this document uses material from the arc42 architecture template, https://arc42.org. Created by Dr. Gernot Starke, Dr. Peter Hruschka and contributors.
`;
}
