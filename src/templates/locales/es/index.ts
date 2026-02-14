/**
 * Spanish Language Strategy
 *
 * Implements the LanguageStrategy interface for Spanish (Español).
 * Provides Spanish section titles, descriptions, and templates in both Markdown and AsciiDoc formats.
 *
 * @module templates/locales/es
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Spanish language
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
 * Spanish Markdown format plugin
 */
export const spanishMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * Spanish AsciiDoc format plugin
 */
export const spanishAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * Spanish Language Strategy
 *
 * Provides Spanish translations for arc42 documentation.
 */
export const spanishStrategy = createLanguageStrategy({
  code: 'ES',
  name: 'Spanish',
  nativeName: 'Español',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: spanishMarkdownPlugin,
    asciidoc: spanishAsciidocPlugin
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
