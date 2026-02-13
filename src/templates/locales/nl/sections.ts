/**
 * Dutch Section Titles and Descriptions
 *
 * Provides localized section metadata for the Dutch language.
 * Translations are based on the official arc42 Dutch template.
 *
 * @module templates/locales/nl/sections
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Dutch section titles
 * Based on vendor/arc42-template/NL/
 */
export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Introductie en Doelen',
  '02_architecture_constraints': 'Beperkingen',
  '03_context_and_scope': 'Scope en Context',
  '04_solution_strategy': 'Oplossingsstrategie',
  '05_building_block_view': 'Bouwstenenweergave',
  '06_runtime_view': 'Runtime-weergave',
  '07_deployment_view': 'Deployment-weergave',
  '08_concepts': 'Cross-cutting Concepten',
  '09_architecture_decisions': 'Architectuurbeslissingen',
  '10_quality_requirements': 'Kwaliteitseisen',
  '11_technical_risks': "Risico's en Technische Schuld",
  '12_glossary': 'Woordenlijst'
};

/**
 * Dutch section descriptions
 * Based on vendor/arc42-template/NL/
 */
export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Probleemstelling, kwaliteitsdoelen en stakeholders',
  '02_architecture_constraints': 'Technische en organisatorische beperkingen',
  '03_context_and_scope': 'Zakelijke en technische context, externe interfaces',
  '04_solution_strategy': 'Fundamentele oplossingsbeslissingen en strategieën',
  '05_building_block_view': 'Statische decompositie van het systeem',
  '06_runtime_view': 'Dynamisch gedrag en belangrijke scenario\'s',
  '07_deployment_view': 'Infrastructuur en deployment',
  '08_concepts': 'Overkoepelende regelingen en oplossingsbenaderingen',
  '09_architecture_decisions': 'Belangrijke, kostbare, kritieke of risicovolle beslissingen',
  '10_quality_requirements': 'Kwaliteitsboom en kwaliteitsscenario\'s',
  '11_technical_risks': 'Bekende problemen, risico\'s en technische schuld',
  '12_glossary': 'Belangrijke zakelijke en technische termen'
};

/**
 * Get the Dutch title for a section
 */
export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

/**
 * Get the Dutch description for a section
 */
export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
