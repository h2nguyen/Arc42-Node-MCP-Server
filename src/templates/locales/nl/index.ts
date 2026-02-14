/**
 * Dutch Language Strategy
 *
 * Implements the LanguageStrategy interface for Dutch (Nederlands).
 * Provides Dutch section titles, descriptions, and templates in both Markdown and AsciiDoc formats.
 *
 * @module templates/locales/nl
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Dutch language
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
 * Dutch Markdown format plugin
 */
export const dutchMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * Dutch AsciiDoc format plugin
 */
export const dutchAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * Dutch Language Strategy
 *
 * Provides Dutch translations for arc42 documentation.
 */
export const dutchStrategy = createLanguageStrategy({
  code: 'NL',
  name: 'Dutch',
  nativeName: 'Nederlands',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: dutchMarkdownPlugin,
    asciidoc: dutchAsciidocPlugin
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
