/**
 * Russian Language Strategy
 *
 * Implements the LanguageStrategy interface for Russian (Русский).
 * Provides Russian section titles, descriptions, and templates in both Markdown and AsciiDoc formats.
 *
 * @module templates/locales/ru
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Russian language
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
 * Russian Markdown format plugin
 */
export const russianMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * Russian AsciiDoc format plugin
 */
export const russianAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * Russian Language Strategy
 *
 * Provides Russian translations for arc42 documentation.
 */
export const russianStrategy = createLanguageStrategy({
  code: 'RU',
  name: 'Russian',
  nativeName: 'Русский',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: russianMarkdownPlugin,
    asciidoc: russianAsciidocPlugin
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
