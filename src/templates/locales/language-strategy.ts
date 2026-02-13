/**
 * Language Strategy Interface
 *
 * Defines the contract for all language implementations in the multi-language template system.
 * This interface follows the Strategy Pattern, allowing different language implementations
 * to be used interchangeably.
 *
 * @module templates/locales/language-strategy
 *
 * S.O.L.I.D Principles:
 * - ISP (Interface Segregation Principle): Interface is focused only on language content,
 *   not registration or creation logic
 * - OCP (Open/Closed Principle): New languages can be added by implementing this interface
 *   without modifying existing code
 */

import type { Arc42Section } from '../../types.js';

/**
 * Supported language codes
 * Based on the arc42 template repository structure
 */
export type LanguageCode =
  | 'EN'   // English (default)
  | 'DE'   // German (Deutsch)
  | 'CZ'   // Czech (Čeština)
  | 'ES'   // Spanish (Español)
  | 'FR'   // French (Français)
  | 'IT'   // Italian (Italiano)
  | 'NL'   // Dutch (Nederlands)
  | 'PT'   // Portuguese (Português)
  | 'RU'   // Russian (Русский)
  | 'UKR'  // Ukrainian (Українська)
  | 'ZH';  // Chinese (中文)

/**
 * Array of all supported language codes
 */
export const SUPPORTED_LANGUAGE_CODES: readonly LanguageCode[] = [
  'EN', 'DE', 'CZ', 'ES', 'FR', 'IT', 'NL', 'PT', 'RU', 'UKR', 'ZH'
] as const;

/**
 * Section title with associated section identifier
 */
export interface SectionTitle {
  /** The localized title of the section */
  title: string;
  /** The section identifier */
  section: Arc42Section;
}

/**
 * Section description with associated section identifier
 */
export interface SectionDescription {
  /** The localized description of the section */
  description: string;
  /** The section identifier */
  section: Arc42Section;
}

/**
 * Language metadata for display purposes
 */
export interface LanguageInfo {
  /** ISO language code (uppercase) */
  code: LanguageCode;
  /** English name of the language */
  name: string;
  /** Name of the language in its native form */
  nativeName: string;
}

/**
 * Language Strategy Interface
 *
 * Defines the contract that all language implementations must follow.
 * Each language strategy provides localized content for arc42 documentation.
 *
 * @example
 * ```typescript
 * const englishStrategy: LanguageStrategy = {
 *   code: 'EN',
 *   name: 'English',
 *   nativeName: 'English',
 *   getSectionTitle: (section) => ({ title: 'Introduction and Goals', section }),
 *   getSectionDescription: (section) => ({ description: 'Overview of requirements...', section }),
 *   getTemplate: (section) => '# Introduction and Goals\n\n...',
 *   getWorkflowGuide: () => '# arc42 Workflow Guide\n\n...',
 *   getReadmeContent: () => '# Project Documentation\n\n...'
 * };
 * ```
 */
export interface LanguageStrategy extends LanguageInfo {
  /**
   * Get the localized title for a specific section
   *
   * @param section - The arc42 section identifier
   * @returns The section title with metadata
   */
  getSectionTitle(section: Arc42Section): SectionTitle;

  /**
   * Get the localized description for a specific section
   *
   * @param section - The arc42 section identifier
   * @returns The section description with metadata
   */
  getSectionDescription(section: Arc42Section): SectionDescription;

  /**
   * Get the localized template content for a specific section
   *
   * @param section - The arc42 section identifier
   * @returns The full markdown template for the section
   */
  getTemplate(section: Arc42Section): string;

  /**
   * Get the localized workflow guide
   *
   * @returns The complete workflow guide in markdown format
   */
  getWorkflowGuide(): string;

  /**
   * Get the localized README content
   *
   * @param projectName - Optional project name for README header
   * @returns The README content in markdown format
   */
  getReadmeContent(projectName?: string): string;
}

/**
 * Type guard to check if a value is a valid LanguageCode
 *
 * @param value - The value to check
 * @returns True if the value is a valid LanguageCode
 */
export function isLanguageCode(value: unknown): value is LanguageCode {
  return (
    typeof value === 'string' &&
    SUPPORTED_LANGUAGE_CODES.includes(value.toUpperCase() as LanguageCode)
  );
}

/**
 * Normalize a language code to uppercase
 *
 * @param code - The language code to normalize
 * @returns The normalized uppercase language code
 * @throws Error if the code is not a valid language code
 */
export function normalizeLanguageCode(code: string): LanguageCode {
  const normalized = code.trim().toUpperCase();
  if (!isLanguageCode(normalized)) {
    throw new Error(
      `Invalid language code: "${code}". Supported codes: ${SUPPORTED_LANGUAGE_CODES.join(', ')}`
    );
  }
  return normalized as LanguageCode;
}
