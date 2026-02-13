/**
 * English Section Titles and Descriptions
 *
 * Provides localized section metadata for the English language.
 *
 * @module templates/locales/en/sections
 */

import type { Arc42Section } from '../../../types.js';

/**
 * English section titles
 */
export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Introduction and Goals',
  '02_architecture_constraints': 'Architecture Constraints',
  '03_context_and_scope': 'Context and Scope',
  '04_solution_strategy': 'Solution Strategy',
  '05_building_block_view': 'Building Block View',
  '06_runtime_view': 'Runtime View',
  '07_deployment_view': 'Deployment View',
  '08_concepts': 'Cross-cutting Concepts',
  '09_architecture_decisions': 'Architecture Decisions',
  '10_quality_requirements': 'Quality Requirements',
  '11_technical_risks': 'Risks and Technical Debt',
  '12_glossary': 'Glossary'
};

/**
 * English section descriptions
 */
export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Requirements overview, quality goals, and stakeholders',
  '02_architecture_constraints': 'Technical and organizational constraints',
  '03_context_and_scope': 'Business and technical context, external interfaces',
  '04_solution_strategy': 'Fundamental solution decisions and strategies',
  '05_building_block_view': 'Static decomposition of the system',
  '06_runtime_view': 'Dynamic behavior and key scenarios',
  '07_deployment_view': 'Infrastructure and deployment',
  '08_concepts': 'Overall, principal regulations and solution approaches',
  '09_architecture_decisions': 'Important, expensive, critical, or risky decisions',
  '10_quality_requirements': 'Quality tree and quality scenarios',
  '11_technical_risks': 'Known problems, risks, and technical debt',
  '12_glossary': 'Important domain and technical terms'
};

/**
 * Get the English title for a section
 */
export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

/**
 * Get the English description for a section
 */
export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
