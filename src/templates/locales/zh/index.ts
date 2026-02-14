/**
 * Chinese Language Strategy
 *
 * Implements the LanguageStrategy interface for Chinese (中文).
 * Provides Chinese section titles, descriptions, and templates in both Markdown and AsciiDoc formats.
 *
 * @module templates/locales/zh
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Chinese language
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
 * Chinese Markdown format plugin
 */
export const chineseMarkdownPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateMarkdown,
  getWorkflowGuideMarkdown,
  getReadmeContentMarkdown
);

/**
 * Chinese AsciiDoc format plugin
 */
export const chineseAsciidocPlugin: FormatTemplatePlugin = createFormatPlugin(
  getTemplateAsciidoc,
  getWorkflowGuideAsciidoc,
  getReadmeContentAsciidoc
);

/**
 * Chinese Language Strategy
 *
 * Provides Chinese translations for arc42 documentation.
 */
export const chineseStrategy = createLanguageStrategy({
  code: 'ZH',
  name: 'Chinese',
  nativeName: '中文',
  getSectionTitle,
  getSectionDescription,
  formatPlugins: {
    markdown: chineseMarkdownPlugin,
    asciidoc: chineseAsciidocPlugin
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
