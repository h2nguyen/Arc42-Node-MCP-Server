/**
 * German Section Titles and Descriptions
 *
 * Provides localized section metadata for the German language.
 * Translations are based on the official arc42 German template.
 *
 * @module templates/locales/de/sections
 */

import type { Arc42Section } from '../../../types.js';

/**
 * German section titles
 * Based on vendor/arc42-template/DE/
 */
export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Einführung und Ziele',
  '02_architecture_constraints': 'Randbedingungen',
  '03_context_and_scope': 'Kontextabgrenzung',
  '04_solution_strategy': 'Lösungsstrategie',
  '05_building_block_view': 'Bausteinsicht',
  '06_runtime_view': 'Laufzeitsicht',
  '07_deployment_view': 'Verteilungssicht',
  '08_concepts': 'Querschnittliche Konzepte',
  '09_architecture_decisions': 'Architekturentscheidungen',
  '10_quality_requirements': 'Qualitätsanforderungen',
  '11_technical_risks': 'Risiken und technische Schulden',
  '12_glossary': 'Glossar'
};

/**
 * German section descriptions
 * Based on vendor/arc42-template/DE/
 */
export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Aufgabenstellung, Qualitätsziele und Stakeholder',
  '02_architecture_constraints': 'Technische und organisatorische Randbedingungen',
  '03_context_and_scope': 'Fachlicher und technischer Kontext, externe Schnittstellen',
  '04_solution_strategy': 'Grundlegende Lösungsentscheidungen und -strategien',
  '05_building_block_view': 'Statische Zerlegung des Systems',
  '06_runtime_view': 'Dynamisches Verhalten und wichtige Szenarien',
  '07_deployment_view': 'Infrastruktur und Verteilung',
  '08_concepts': 'Übergreifende Regelungen und Lösungsansätze',
  '09_architecture_decisions': 'Wichtige, teure, kritische oder riskante Entscheidungen',
  '10_quality_requirements': 'Qualitätsbaum und Qualitätsszenarien',
  '11_technical_risks': 'Bekannte Probleme, Risiken und technische Schulden',
  '12_glossary': 'Wichtige fachliche und technische Begriffe'
};

/**
 * Get the German title for a section
 */
export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

/**
 * Get the German description for a section
 */
export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
