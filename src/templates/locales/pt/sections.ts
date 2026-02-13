/**
 * Portuguese Section Titles and Descriptions
 *
 * Provides localized section metadata for the Portuguese language.
 * Translations are based on the official arc42 Portuguese template.
 *
 * @module templates/locales/pt/sections
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Portuguese section titles
 * Based on vendor/arc42-template/PT/
 */
export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Introdução e Objetivos',
  '02_architecture_constraints': 'Restrições da Arquitetura',
  '03_context_and_scope': 'Contexto e Escopo',
  '04_solution_strategy': 'Estratégia de Solução',
  '05_building_block_view': 'Visão de Building Blocks',
  '06_runtime_view': 'Visão de Runtime',
  '07_deployment_view': 'Visão de Implantação',
  '08_concepts': 'Conceitos Transversais',
  '09_architecture_decisions': 'Decisões de Arquitetura',
  '10_quality_requirements': 'Requisitos de Qualidade',
  '11_technical_risks': 'Riscos e Dívida Técnica',
  '12_glossary': 'Glossário'
};

/**
 * Portuguese section descriptions
 * Based on vendor/arc42-template/PT/
 */
export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Requisitos, objetivos de qualidade e stakeholders',
  '02_architecture_constraints': 'Restrições técnicas e organizacionais',
  '03_context_and_scope': 'Contexto de negócio e técnico, interfaces externas',
  '04_solution_strategy': 'Decisões e estratégias fundamentais de solução',
  '05_building_block_view': 'Decomposição estática do sistema',
  '06_runtime_view': 'Comportamento dinâmico e cenários importantes',
  '07_deployment_view': 'Infraestrutura e distribuição',
  '08_concepts': 'Regras e abordagens transversais',
  '09_architecture_decisions': 'Decisões importantes, custosas, críticas ou arriscadas',
  '10_quality_requirements': 'Árvore de qualidade e cenários de qualidade',
  '11_technical_risks': 'Problemas conhecidos, riscos e dívida técnica',
  '12_glossary': 'Termos importantes de negócio e técnicos'
};

/**
 * Get the Portuguese title for a section
 */
export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

/**
 * Get the Portuguese description for a section
 */
export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
