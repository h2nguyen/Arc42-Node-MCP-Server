/**
 * French Section Titles and Descriptions
 *
 * Provides localized section metadata for the French language.
 * Translations are based on the official arc42 French template.
 *
 * @module templates/locales/fr/sections
 */

import type { Arc42Section } from '../../../types.js';

/**
 * French section titles
 * Based on vendor/arc42-template/FR/
 */
export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Introduction et Objectifs',
  '02_architecture_constraints': 'Contraintes Architecturales',
  '03_context_and_scope': 'Portée et Contexte',
  '04_solution_strategy': 'Stratégie de Solution',
  '05_building_block_view': 'Vue des Blocs de Construction',
  '06_runtime_view': "Vue d'Exécution",
  '07_deployment_view': 'Vue de Déploiement',
  '08_concepts': 'Concepts Transversaux',
  '09_architecture_decisions': "Décisions d'Architecture",
  '10_quality_requirements': 'Exigences de Qualité',
  '11_technical_risks': 'Risques et Dette Technique',
  '12_glossary': 'Glossaire'
};

/**
 * French section descriptions
 * Based on vendor/arc42-template/FR/
 */
export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Aperçu des spécifications, objectifs de qualité et parties prenantes',
  '02_architecture_constraints': 'Contraintes techniques et organisationnelles',
  '03_context_and_scope': 'Contexte métier et technique, interfaces externes',
  '04_solution_strategy': 'Décisions et stratégies de solution fondamentales',
  '05_building_block_view': 'Décomposition statique du système',
  '06_runtime_view': 'Comportement dynamique et scénarios importants',
  '07_deployment_view': 'Infrastructure et déploiement',
  '08_concepts': 'Règles et approches transversales',
  '09_architecture_decisions': 'Décisions importantes, coûteuses, critiques ou risquées',
  '10_quality_requirements': 'Arbre de qualité et scénarios de qualité',
  '11_technical_risks': 'Problèmes connus, risques et dette technique',
  '12_glossary': 'Termes métier et techniques importants'
};

/**
 * Get the French title for a section
 */
export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

/**
 * Get the French description for a section
 */
export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
