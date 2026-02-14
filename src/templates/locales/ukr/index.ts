/**
 * Ukrainian Language Strategy
 *
 * Implements the LanguageStrategy interface for Ukrainian (Українська).
 * Provides Ukrainian section titles, descriptions, and templates in both Markdown and AsciiDoc formats.
 *
 * @module templates/locales/ukr
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Ukrainian language
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
 * Ukrainian Markdown format plugin
 */
export const ukrainianMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * Ukrainian AsciiDoc format plugin
 */
export const ukrainianAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * Ukrainian Language Strategy
 *
 * Provides Ukrainian translations for arc42 documentation.
 */
export const ukrainianStrategy = createLanguageStrategy({
  code: 'UKR',
  name: 'Ukrainian',
  nativeName: 'Українська',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: ukrainianMarkdownPlugin,
    asciidoc: ukrainianAsciidocPlugin
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
