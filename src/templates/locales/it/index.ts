/**
 * Italian Language Strategy
 *
 * Implements the LanguageStrategy interface for Italian (Italiano).
 * Provides Italian section titles, descriptions, and templates.
 *
 * @module templates/locales/it
 *
 * S.O.L.I.D Principles:
 * - LSP (Liskov Substitution Principle): ItalianStrategy is substitutable for LanguageStrategy
 * - OCP (Open/Closed Principle): Implements interface without modifying it
 *
 * Design Patterns:
 * - Strategy Pattern: Concrete implementation for Italian language
 */

import type { Arc42Section } from '../../../types.js';
import type { LanguageStrategy, SectionTitle, SectionDescription } from '../language-strategy.js';
import { getSectionTitle, getSectionDescription } from './sections.js';
import { getTemplate, getWorkflowGuide, getReadmeContent } from './templates.js';

/**
 * Italian Language Strategy
 *
 * Provides Italian translations for arc42 documentation.
 * Based on official arc42 Italian template from vendor/arc42-template/IT/.
 */
export const italianStrategy: LanguageStrategy = {
  code: 'IT',
  name: 'Italian',
  nativeName: 'Italiano',

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
