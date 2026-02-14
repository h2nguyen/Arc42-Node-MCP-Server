/**
 * Portuguese Language Strategy
 *
 * Implements the LanguageStrategy interface for Portuguese (Português).
 * Provides Portuguese section titles, descriptions, and templates in both Markdown and AsciiDoc formats.
 *
 * @module templates/locales/pt
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Portuguese language
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
 * Portuguese Markdown format plugin
 */
export const portugueseMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * Portuguese AsciiDoc format plugin
 */
export const portugueseAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * Portuguese Language Strategy
 *
 * Provides Portuguese translations for arc42 documentation.
 */
export const portugueseStrategy = createLanguageStrategy({
  code: 'PT',
  name: 'Portuguese',
  nativeName: 'Português',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: portugueseMarkdownPlugin,
    asciidoc: portugueseAsciidocPlugin
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
