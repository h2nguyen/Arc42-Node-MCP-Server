/**
 * Spanish Section Titles and Descriptions
 *
 * Provides localized section metadata for the Spanish language.
 * Translations are based on the official arc42 Spanish template.
 *
 * @module templates/locales/es/sections
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Spanish section titles
 * Based on vendor/arc42-template/ES/
 */
export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Introducción y Metas',
  '02_architecture_constraints': 'Restricciones de la Arquitectura',
  '03_context_and_scope': 'Alcance y Contexto del Sistema',
  '04_solution_strategy': 'Estrategia de solución',
  '05_building_block_view': 'Vista de Bloques',
  '06_runtime_view': 'Vista de Ejecución',
  '07_deployment_view': 'Vista de Despliegue',
  '08_concepts': 'Conceptos Transversales',
  '09_architecture_decisions': 'Decisiones de Diseño',
  '10_quality_requirements': 'Requerimientos de Calidad',
  '11_technical_risks': 'Riesgos y Deuda Técnica',
  '12_glossary': 'Glosario'
};

/**
 * Spanish section descriptions
 * Based on vendor/arc42-template/ES/
 */
export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Vista de requerimientos, metas de calidad y partes interesadas',
  '02_architecture_constraints': 'Restricciones técnicas, organizacionales y convenciones',
  '03_context_and_scope': 'Contexto de negocio y técnico, interfaces externas',
  '04_solution_strategy': 'Decisiones y estrategias fundamentales de solución',
  '05_building_block_view': 'Descomposición estática del sistema',
  '06_runtime_view': 'Comportamiento dinámico y escenarios importantes',
  '07_deployment_view': 'Infraestructura y distribución',
  '08_concepts': 'Regulaciones y soluciones transversales',
  '09_architecture_decisions': 'Decisiones importantes, costosas, críticas o riesgosas',
  '10_quality_requirements': 'Árbol de calidad y escenarios de calidad',
  '11_technical_risks': 'Problemas conocidos, riesgos y deuda técnica',
  '12_glossary': 'Términos técnicos y de dominio importantes'
};

/**
 * Get the Spanish title for a section
 */
export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

/**
 * Get the Spanish description for a section
 */
export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
