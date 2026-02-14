/**
 * Localized Template Provider
 *
 * Provides language-aware template access with config.yaml integration.
 * Acts as a facade simplifying the complexity of language selection and configuration.
 *
 * @module templates/locales/template-provider
 *
 * S.O.L.I.D Principles:
 * - SRP (Single Responsibility Principle): Only retrieves templates
 * - ISP (Interface Segregation Principle): Implements focused TemplateProvider interface
 * - DIP (Dependency Inversion Principle): Depends on LanguageFactory abstraction
 *
 * Design Patterns:
 * - Facade Pattern: Simplifies language/config complexity for tool handlers
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { parse as parseYaml } from 'yaml';
import type { Arc42Section } from '../../types.js';
import type { LanguageCode, LanguageInfo } from './language-strategy.js';
import type { LanguageFactory } from './language-factory.js';
import type { OutputFormatCode } from '../formats/index.js';
import { DEFAULT_OUTPUT_FORMAT } from '../formats/index.js';

/**
 * Section metadata with localized content
 */
export interface LocalizedSectionMetadata {
  /** The section identifier */
  section: Arc42Section;
  /** Localized section title */
  title: string;
  /** Localized section description */
  description: string;
  /** The language code used */
  languageCode: LanguageCode;
}

/**
 * Localized Template Provider Class
 *
 * Provides a simplified interface for accessing templates in different languages.
 * Integrates with config.yaml to read default language settings.
 *
 * @example
 * ```typescript
 * const provider = new LocalizedTemplateProvider(factory);
 *
 * // Get template with explicit language
 * const deTemplate = provider.getTemplate('01_introduction_and_goals', 'DE');
 *
 * // Get template using config.yaml language
 * const template = provider.getTemplateWithConfig('01_introduction_and_goals', workspacePath);
 * ```
 */
export class LocalizedTemplateProvider {
  /**
   * The factory for creating language strategies
   */
  private readonly factory: LanguageFactory;

  /**
   * Create a new LocalizedTemplateProvider
   *
   * @param factory - The language factory for strategy creation
   */
  constructor(factory: LanguageFactory) {
    this.factory = factory;
  }

  /**
   * Get the template for a section in a specific language and format
   *
   * @param section - The arc42 section
   * @param language - The language code (defaults to English)
   * @param format - The output format (markdown or asciidoc, defaults to asciidoc)
   * @returns The template content in the specified format
   */
  getTemplateForFormat(
    section: Arc42Section,
    language?: string,
    format?: OutputFormatCode
  ): string {
    const strategy = language
      ? this.factory.createWithFallback(language)
      : this.factory.getDefault();
    const effectiveFormat = format || DEFAULT_OUTPUT_FORMAT;
    return strategy.getTemplateForFormat(section, effectiveFormat);
  }

  /**
   * Get the template using config.yaml for language and format
   *
   * @param section - The arc42 section
   * @param workspacePath - Path to the workspace (or parent containing config.yaml)
   * @param language - Optional override language (takes precedence over config)
   * @param format - Optional override format (takes precedence over config)
   * @returns The template content in the specified format
   */
  getTemplateWithConfigAndFormat(
    section: Arc42Section,
    workspacePath: string,
    language?: string,
    format?: OutputFormatCode
  ): string {
    const effectiveLanguage = language || this.readLanguageFromConfig(workspacePath) || 'EN';
    const effectiveFormat = format || this.readFormatFromConfig(workspacePath) || DEFAULT_OUTPUT_FORMAT;
    return this.getTemplateForFormat(section, effectiveLanguage, effectiveFormat);
  }

  /**
   * Get section metadata in a specific language
   *
   * @param section - The arc42 section
   * @param language - The language code (defaults to English)
   * @returns The section metadata
   */
  getSectionMetadata(section: Arc42Section, language?: string): LocalizedSectionMetadata {
    const strategy = language
      ? this.factory.createWithFallback(language)
      : this.factory.getDefault();

    const title = strategy.getSectionTitle(section);
    const description = strategy.getSectionDescription(section);

    return {
      section,
      title: title.title,
      description: description.description,
      languageCode: strategy.code
    };
  }

  /**
   * Get the workflow guide in a specific language and format
   *
   * @param language - The language code (defaults to English)
   * @param format - The output format (defaults to asciidoc)
   * @returns The workflow guide content
   */
  getWorkflowGuideForFormat(language?: string, format?: OutputFormatCode): string {
    const strategy = language
      ? this.factory.createWithFallback(language)
      : this.factory.getDefault();
    const effectiveFormat = format || DEFAULT_OUTPUT_FORMAT;
    return strategy.getWorkflowGuideForFormat(effectiveFormat);
  }

  /**
   * Get README content in a specific language and format
   *
   * @param language - The language code (defaults to English)
   * @param projectName - Optional project name for README header
   * @param format - The output format (defaults to asciidoc)
   * @returns The README content
   */
  getReadmeContentForFormat(language?: string, projectName?: string, format?: OutputFormatCode): string {
    const strategy = language
      ? this.factory.createWithFallback(language)
      : this.factory.getDefault();
    const effectiveFormat = format || DEFAULT_OUTPUT_FORMAT;
    return strategy.getReadmeContentForFormat(projectName, effectiveFormat);
  }

  /**
   * Get all available languages
   *
   * @returns Array of language information objects
   */
  getAvailableLanguages(): LanguageInfo[] {
    const codes = this.factory.getAvailableCodes();
    return codes.map(code => {
      const strategy = this.factory.create(code);
      return {
        code: strategy.code,
        name: strategy.name,
        nativeName: strategy.nativeName
      };
    });
  }

  /**
   * Check if a language is supported
   *
   * @param language - The language code to check
   * @returns True if the language is supported
   */
  isSupported(language: string): boolean {
    return this.factory.isSupported(language);
  }

  /**
   * Read the language setting from config.yaml
   *
   * @param workspacePath - Path to the workspace directory
   * @returns The language code from config, or undefined if not found
   */
  readLanguageFromConfig(workspacePath: string): string | undefined {
    const configPath = join(workspacePath, 'config.yaml');

    if (!existsSync(configPath)) {
      return undefined;
    }

    try {
      const content = readFileSync(configPath, 'utf-8');
      const config = parseYaml(content);

      if (config && typeof config === 'object' && 'language' in config) {
        const language = config.language;
        if (typeof language === 'string') {
          return language.trim().toUpperCase();
        }
      }
    } catch {
      // Config file exists but couldn't be parsed
      return undefined;
    }

    return undefined;
  }

  /**
   * Read the format setting from config.yaml
   *
   * @param workspacePath - Path to the workspace directory
   * @returns The format code from config, or undefined if not found
   */
  readFormatFromConfig(workspacePath: string): OutputFormatCode | undefined {
    const configPath = join(workspacePath, 'config.yaml');

    if (!existsSync(configPath)) {
      return undefined;
    }

    try {
      const content = readFileSync(configPath, 'utf-8');
      const config = parseYaml(content);

      if (config && typeof config === 'object' && 'format' in config) {
        const format = config.format;
        if (typeof format === 'string') {
          const normalized = format.trim().toLowerCase();
          if (normalized === 'markdown' || normalized === 'asciidoc') {
            return normalized as OutputFormatCode;
          }
        }
      }
    } catch {
      // Config file exists but couldn't be parsed
      return undefined;
    }

    return undefined;
  }
}
