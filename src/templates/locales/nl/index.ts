/**
 * Dutch Language Strategy
 *
 * Implements the LanguageStrategy interface for Dutch (Nederlands).
 * Provides Dutch section titles, descriptions, and templates.
 *
 * @module templates/locales/nl
 *
 * S.O.L.I.D Principles:
 * - LSP (Liskov Substitution Principle): DutchStrategy is substitutable for LanguageStrategy
 * - OCP (Open/Closed Principle): Implements interface without modifying it
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Dutch language
 */

import type { Arc42Section } from '../../../types.js';
import type { LanguageStrategy, SectionTitle, SectionDescription } from '../language-strategy.js';
import { getSectionTitle, getSectionDescription } from './sections.js';
import { getTemplate, getWorkflowGuide, getReadmeContent } from './templates.js';

/**
 * Dutch Language Strategy
 *
 * Provides Dutch translations for arc42 documentation.
 * Based on official arc42 Dutch template from vendor/arc42-template/NL/.
 */
export const dutchStrategy: LanguageStrategy = {
  code: 'NL',
  name: 'Dutch',
  nativeName: 'Nederlands',

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
