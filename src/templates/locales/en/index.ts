/**
 * English Language Strategy
 *
 * Implements the LanguageStrategy interface for English (default language).
 * Provides English section titles, descriptions, and templates.
 *
 * @module templates/locales/en
 *
 * S.O.L.I.D Principles:
 * - LSP (Liskov Substitution Principle): EnglishStrategy is substitutable for LanguageStrategy
 * - OCP (Open/Closed Principle): New formats can be added via plugins without modifying this file
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for English language
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
 * English Markdown format plugin
 */
export const englishMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * English AsciiDoc format plugin
 */
export const englishAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * English Language Strategy
 *
 * The default language strategy for arc42 documentation.
 * All content is in English.
 */
export const englishStrategy = createLanguageStrategy({
  code: 'EN',
  name: 'English',
  nativeName: 'English',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: englishMarkdownPlugin,
    asciidoc: englishAsciidocPlugin
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
