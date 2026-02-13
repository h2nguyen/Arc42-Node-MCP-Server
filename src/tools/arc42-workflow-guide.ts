import { z } from 'zod';
import { ToolContext, ToolResponse } from '../types.js';
import {
  getWorkflowGuide,
  SUPPORTED_LANGUAGE_CODES,
  isLanguageCode,
  normalizeLanguageCode,
  getAvailableLanguages
} from '../templates/index.js';

// Zod schema as the SINGLE SOURCE OF TRUTH for tool input
const languageValues = SUPPORTED_LANGUAGE_CODES as unknown as [string, ...string[]];

export const arc42WorkflowGuideInputSchema = {
  language: z.enum(languageValues).optional().default('EN').describe('Language code for the workflow guide. Supported: EN, DE, ES, FR, IT, NL, PT, RU, CZ, UKR, ZH. Defaults to EN.')
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

  // Get the localized workflow guide
  const guide = getWorkflowGuide(language);

  // Get available languages for display
  const availableLanguages = getAvailableLanguages();
  const currentLanguageInfo = availableLanguages.find(
    lang => lang.code === language
  ) || { code: 'EN', name: 'English', nativeName: 'English' };

  return {
    success: true,
    message: `arc42 workflow guide loaded successfully (language: ${language})`,
    data: {
      guide,
      language: currentLanguageInfo,
      availableLanguages,
      workspaceRoot: context.workspaceRoot
    },
    nextSteps: [
      'Initialize arc42 documentation with: arc42-init',
      'Check current status with: arc42-status',
      'Generate section templates with: generate-template',
      'Update sections with: update-section'
    ]
  };
}
