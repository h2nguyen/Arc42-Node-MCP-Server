import { z } from 'zod';
import { ToolContext, ToolResponse, Arc42Section, SECTION_METADATA, ARC42_SECTIONS, getErrorMessage } from '../types.js';
import {
  getSectionMetadata,
  getTemplateForFormat,
  SUPPORTED_LANGUAGE_CODES,
  isLanguageCode,
  normalizeLanguageCode
} from '../templates/index.js';
import {
  SUPPORTED_OUTPUT_FORMAT_CODES,
  DEFAULT_OUTPUT_FORMAT,
  getOutputFormatStrategyWithFallback
} from '../templates/formats/index.js';

// Zod schema as the SINGLE SOURCE OF TRUTH for tool input
const sectionValues = ARC42_SECTIONS as unknown as [Arc42Section, ...Arc42Section[]];
const languageValues = SUPPORTED_LANGUAGE_CODES as unknown as [string, ...string[]];
const formatValues = SUPPORTED_OUTPUT_FORMAT_CODES as unknown as [string, ...string[]];

export const generateTemplateInputSchema = {
  section: z.enum(sectionValues).describe('The section to generate template for'),
  language: z.enum(languageValues).optional().default('EN').describe('Language code for the template. Supported: EN, DE, ES, FR, IT, NL, PT, RU, CZ, UKR, ZH. Defaults to EN.'),
  format: z.enum(formatValues).optional().default(DEFAULT_OUTPUT_FORMAT)
    .describe(`Output format for the template. Supported: markdown (md), asciidoc (adoc). Defaults to ${DEFAULT_OUTPUT_FORMAT}.`)
};

export const generateTemplateDescription = `Generate a detailed template for a specific arc42 section.

This tool provides the complete template structure, guidance, and examples for any of the 12 arc42 sections. Use this before documenting a section to understand what content is needed.`;

export async function generateTemplateHandler(
  args: Record<string, unknown>,
  _context: ToolContext
): Promise<ToolResponse> {
  const section = args.section as string | undefined;
  const languageArg = (args.language as string) ?? 'EN';
  const formatArg = (args.format as string) ?? DEFAULT_OUTPUT_FORMAT;

  if (!section) {
    return {
      success: false,
      message: 'Section parameter is required'
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

  // Get the output format strategy (with fallback to default)
  const formatStrategy = getOutputFormatStrategyWithFallback(formatArg);
  const format = formatStrategy.code;

  try {
    // Get localized metadata and format-specific template
    const localizedMetadata = getSectionMetadata(section as Arc42Section, language);
    const template = getTemplateForFormat(section as Arc42Section, language, format);

    // Also include the standard metadata for reference
    const standardMetadata = SECTION_METADATA[section as Arc42Section];

    return {
      success: true,
      message: `Template for ${localizedMetadata.title} generated (language: ${language}, format: ${formatStrategy.name})`,
      data: {
        section,
        language,
        format,
        formatName: formatStrategy.name,
        fileExtension: formatStrategy.fileExtension,
        metadata: {
          ...standardMetadata,
          title: localizedMetadata.title,
          description: localizedMetadata.description,
          languageCode: localizedMetadata.languageCode
        },
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
