/**
 * German Language Strategy
 *
 * Implements the LanguageStrategy interface for German (Deutsch).
 * Provides German section titles, descriptions, and templates.
 *
 * @module templates/locales/de
 *
 * S.O.L.I.D Principles:
 * - LSP (Liskov Substitution Principle): GermanStrategy is substitutable for LanguageStrategy
 * - OCP (Open/Closed Principle): New formats can be added via plugins without modifying this file
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for German language
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
 * German Markdown format plugin
 */
export const germanMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * German AsciiDoc format plugin
 */
export const germanAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * German Language Strategy
 *
 * Provides German translations for arc42 documentation.
 * Based on official arc42 German template from vendor/arc42-template/DE/.
 */
export const germanStrategy = createLanguageStrategy({
  code: 'DE',
  name: 'German',
  nativeName: 'Deutsch',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: germanMarkdownPlugin,
    asciidoc: germanAsciidocPlugin
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
