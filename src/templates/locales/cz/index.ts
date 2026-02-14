/**
 * Czech Language Strategy
 *
 * Implements the LanguageStrategy interface for Czech (Čeština).
 * Provides Czech section titles, descriptions, and templates in both Markdown and AsciiDoc formats.
 *
 * @module templates/locales/cz
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Czech language
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
 * Czech Markdown format plugin
 */
export const czechMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * Czech AsciiDoc format plugin
 */
export const czechAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * Czech Language Strategy
 *
 * Provides Czech translations for arc42 documentation.
 */
export const czechStrategy = createLanguageStrategy({
  code: 'CZ',
  name: 'Czech',
  nativeName: 'Čeština',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: czechMarkdownPlugin,
    asciidoc: czechAsciidocPlugin
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
