/**
 * Italian Language Strategy
 *
 * Implements the LanguageStrategy interface for Italian (Italiano).
 * Provides Italian section titles, descriptions, and templates in both Markdown and AsciiDoc formats.
 *
 * @module templates/locales/it
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Italian language
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
 * Italian Markdown format plugin
 */
export const italianMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * Italian AsciiDoc format plugin
 */
export const italianAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * Italian Language Strategy
 *
 * Provides Italian translations for arc42 documentation.
 */
export const italianStrategy = createLanguageStrategy({
  code: 'IT',
  name: 'Italian',
  nativeName: 'Italiano',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: italianMarkdownPlugin,
    asciidoc: italianAsciidocPlugin
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
