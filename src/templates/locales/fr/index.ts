/**
 * French Language Strategy
 *
 * Implements the LanguageStrategy interface for French (Français).
 * Provides French section titles, descriptions, and templates in both Markdown and AsciiDoc formats.
 *
 * @module templates/locales/fr
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for French language
 * - Plugin Pattern: Format-specific templates are provided via plugins
 */

import { getSectionTitle, getSectionDescription } from './sections.js';
import {
  getTemplate as getTemplateMarkdown,
  getWorkflowGuide as getWorkflowGuideMarkdown,
  getReadmeContent as getReadmeContentMarkdown
} from './templates-markdown.js';
import {
  getTemplate as getTemplateAsciidoc,
  getWorkflowGuide as getWorkflowGuideAsciidoc,
  getReadmeContent as getReadmeContentAsciidoc
} from './templates-asciidoc.js';
import {
  createLanguageStrategy,
  createFormatPlugin,
  type FormatTemplatePlugin
} from '../language-strategy-factory.js';

/**
 * French Markdown format plugin
 */
export const frenchMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * French AsciiDoc format plugin
 */
export const frenchAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * French Language Strategy
 *
 * Provides French translations for arc42 documentation.
 */
export const frenchStrategy = createLanguageStrategy({
  code: 'FR',
  name: 'French',
  nativeName: 'Français',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: frenchMarkdownPlugin,
    asciidoc: frenchAsciidocPlugin
  }
});

// Re-export for convenience
export { getSectionTitle, getSectionDescription } from './sections.js';
export {
  getTemplate as getTemplateMarkdown,
  getWorkflowGuide as getWorkflowGuideMarkdown,
  getReadmeContent as getReadmeContentMarkdown
} from './templates-markdown.js';
export {
  getTemplate as getTemplateAsciidoc,
  getWorkflowGuide as getWorkflowGuideAsciidoc,
  getReadmeContent as getReadmeContentAsciidoc
} from './templates-asciidoc.js';
