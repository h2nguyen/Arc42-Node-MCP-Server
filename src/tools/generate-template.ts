import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse, Arc42Section, SECTION_METADATA, getErrorMessage } from '../types.js';
import { getSectionTemplate } from '../templates/index.js';

export const generateTemplateTool: Tool = {
  name: 'generate-template',
  description: `Generate a detailed template for a specific arc42 section.

This tool provides the complete template structure, guidance, and examples for any of the 12 arc42 sections. Use this before documenting a section to understand what content is needed.`,
  inputSchema: {
    type: 'object',
    properties: {
      section: {
        type: 'string',
        description: 'The section to generate template for',
        enum: [
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
        ]
      }
    },
    required: ['section']
  }
};

export async function generateTemplateHandler(
  args: Record<string, unknown>,
  _context: ToolContext
): Promise<ToolResponse> {
  const section = args.section as string | undefined;

  if (!section) {
    return {
      success: false,
      message: 'Section parameter is required'
    };
  }

  try {
    const metadata = SECTION_METADATA[section as Arc42Section];
    const template = getSectionTemplate(section as Arc42Section);

    return {
      success: true,
      message: `Template for ${metadata.title} generated`,
      data: {
        section,
        metadata,
        template
      },
      nextSteps: [
        'Review the template structure and guidance',
        'Create content based on the template',
        'Use update-section to save your content',
        'Check status with arc42-status'
      ]
    };

  } catch (error: unknown) {
    return {
      success: false,
      message: `Failed to generate template: ${getErrorMessage(error)}`
    };
  }
}
