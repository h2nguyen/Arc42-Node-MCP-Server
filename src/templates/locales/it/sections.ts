/**
 * Italian Section Titles and Descriptions
 *
 * Provides localized section metadata for the Italian language.
 * Translations are based on the official arc42 Italian template.
 *
 * @module templates/locales/it/sections
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Italian section titles
 * Based on vendor/arc42-template/IT/
 */
export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Introduzione e Obiettivi',
  '02_architecture_constraints': 'Vincoli dell\'Architettura',
  '03_context_and_scope': 'Contesto e Ambito',
  '04_solution_strategy': 'Strategia di Soluzione',
  '05_building_block_view': 'Vista dei Building Block',
  '06_runtime_view': 'Vista Runtime',
  '07_deployment_view': 'Vista di Deployment',
  '08_concepts': 'Concetti Trasversali',
  '09_architecture_decisions': 'Decisioni Architetturali',
  '10_quality_requirements': 'Requisiti di Qualita',
  '11_technical_risks': 'Rischi e Debito Tecnico',
  '12_glossary': 'Glossario'
};

/**
 * Italian section descriptions
 * Based on vendor/arc42-template/IT/
 */
export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Requisiti, obiettivi di qualita e stakeholder',
  '02_architecture_constraints': 'Vincoli tecnici e organizzativi',
  '03_context_and_scope': 'Contesto di business e tecnico, interfacce esterne',
  '04_solution_strategy': 'Decisioni e strategie fondamentali della soluzione',
  '05_building_block_view': 'Decomposizione statica del sistema',
  '06_runtime_view': 'Comportamento dinamico e scenari importanti',
  '07_deployment_view': 'Infrastruttura e distribuzione',
  '08_concepts': 'Regolamenti e approcci trasversali',
  '09_architecture_decisions': 'Decisioni importanti, costose, critiche o rischiose',
  '10_quality_requirements': 'Albero della qualita e scenari di qualita',
  '11_technical_risks': 'Problemi noti, rischi e debito tecnico',
  '12_glossary': 'Termini importanti di business e tecnici'
};

/**
 * Get the Italian title for a section
 */
export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

/**
 * Get the Italian description for a section
 */
export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
