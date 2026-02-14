import { z } from 'zod';
import { ToolContext, ToolResponse } from '../types.js';
import {
  getWorkflowGuideForFormat,
  SUPPORTED_LANGUAGE_CODES,
  normalizeLanguageCode,
  getAvailableLanguages
} from '../templates/index.js';
import {
  SUPPORTED_OUTPUT_FORMAT_CODES,
  DEFAULT_OUTPUT_FORMAT,
  type OutputFormatCode
} from '../templates/formats/index.js';

// Zod schema as the SINGLE SOURCE OF TRUTH for tool input
const languageValues = SUPPORTED_LANGUAGE_CODES as unknown as [string, ...string[]];

const formatValues = SUPPORTED_OUTPUT_FORMAT_CODES as unknown as [string, ...string[]];

export const arc42WorkflowGuideInputSchema = {
  language: z.enum(languageValues).optional().default('EN').describe('Language code for the workflow guide. Supported: EN, DE, ES, FR, IT, NL, PT, RU, CZ, UKR, ZH. Defaults to EN.'),
  format: z.enum(formatValues).optional().describe('Output format for the workflow guide. Supported: markdown, asciidoc. Defaults to asciidoc.')
};

export const arc42WorkflowGuideDescription = `Get a comprehensive guide for arc42 architecture documentation workflow.

This tool provides detailed guidance on how to document software architecture using the arc42 template. It explains the 12 sections of arc42, recommended workflow, and best practices.

Use this tool when:
- Starting a new architecture documentation project
- Needing guidance on what to document in each section
- Looking for best practices in architecture documentation`;

export async function arc42WorkflowGuideHandler(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<ToolResponse> {
  const languageArg = (args.language as string) ?? 'EN';

  // Validate and normalize language code
  // normalizeLanguageCode throws for invalid codes, so we catch and return an error
  let language: string;
  try {
    language = normalizeLanguageCode(languageArg);
  } catch {
    return {
      success: false,
      message: `Invalid language code: ${languageArg}. Supported languages: ${SUPPORTED_LANGUAGE_CODES.join(', ')}`
    };
  }

  // Get format from args
  const formatArg = (args.format as OutputFormatCode) ?? DEFAULT_OUTPUT_FORMAT;

  // Get the localized workflow guide in the specified format
  const guide = getWorkflowGuideForFormat(language, formatArg);

  // Get available languages for display
  const availableLanguages = getAvailableLanguages();
  const currentLanguageInfo = availableLanguages.find(
    lang => lang.code === language
  ) || { code: 'EN', name: 'English', nativeName: 'English' };

  return {
    success: true,
    message: `arc42 workflow guide loaded successfully (language: ${language}, format: ${formatArg})`,
    data: {
      guide,
      language: currentLanguageInfo,
      format: formatArg,
      availableLanguages,
      supportedFormats: SUPPORTED_OUTPUT_FORMAT_CODES,
      defaultFormat: DEFAULT_OUTPUT_FORMAT,
      workspaceRoot: context.workspaceRoot
    },
    nextSteps: [
      `Initialize arc42 documentation with: arc42-init (default format: ${DEFAULT_OUTPUT_FORMAT})`,
      'Check current status with: arc42-status',
      'Generate section templates with: generate-template',
      'Update sections with: update-section'
    ]
  };
}
