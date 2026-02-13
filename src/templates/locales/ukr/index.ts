/**
 * Ukrainian Language Strategy
 * @module templates/locales/ukr
 */

import type { Arc42Section } from '../../../types.js';
import type { LanguageStrategy, SectionTitle, SectionDescription } from '../language-strategy.js';
import { getSectionTitle, getSectionDescription } from './sections.js';
import { getTemplate, getWorkflowGuide, getReadmeContent } from './templates.js';

export const ukrainianStrategy: LanguageStrategy = {
  code: 'UKR',
  name: 'Ukrainian',
  nativeName: 'Українська',

  getSectionTitle(section: Arc42Section): SectionTitle {
    return { title: getSectionTitle(section), section };
  },

  getSectionDescription(section: Arc42Section): SectionDescription {
    return { description: getSectionDescription(section), section };
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

export { getSectionTitle, getSectionDescription } from './sections.js';
export { getTemplate, getWorkflowGuide, getReadmeContent } from './templates.js';
