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
 * - OCP (Open/Closed Principle): Implements interface without modifying it
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for English language
 */

import type { Arc42Section } from '../../../types.js';
import type { LanguageStrategy, SectionTitle, SectionDescription } from '../language-strategy.js';
import { getSectionTitle, getSectionDescription } from './sections.js';
import { getTemplate, getWorkflowGuide, getReadmeContent } from './templates.js';

/**
 * English Language Strategy
 *
 * The default language strategy for arc42 documentation.
 * All content is in English.
 */
export const englishStrategy: LanguageStrategy = {
  code: 'EN',
  name: 'English',
  nativeName: 'English',

  getSectionTitle(section: Arc42Section): SectionTitle {
    return {
      title: getSectionTitle(section),
      section
    };
  },

  getSectionDescription(section: Arc42Section): SectionDescription {
    return {
      description: getSectionDescription(section),
      section
    };
  },

  getTemplate(section: Arc42Section): string {
    return getTemplate(section);
  },

  getWorkflowGuide(): string {
    return getWorkflowGuide();
  },

  getReadmeContent(projectName?: string): string {
    return getReadmeContent(projectName);
  }
};

// Re-export for convenience
export { getSectionTitle, getSectionDescription } from './sections.js';
export { getTemplate, getWorkflowGuide, getReadmeContent } from './templates.js';
