/**
 * Russian Section Titles and Descriptions
 *
 * Provides localized section metadata for the Russian language.
 * Translations are based on the official arc42 Russian template.
 *
 * @module templates/locales/ru/sections
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Russian section titles
 * Based on vendor/arc42-template/RU/
 */
export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Введение и цели',
  '02_architecture_constraints': 'Ограничения архитектуры',
  '03_context_and_scope': 'Контекст и область',
  '04_solution_strategy': 'Стратегия решения',
  '05_building_block_view': 'Представление строительных блоков',
  '06_runtime_view': 'Представление времени выполнения',
  '07_deployment_view': 'Представление развертывания',
  '08_concepts': 'Сквозные концепции',
  '09_architecture_decisions': 'Архитектурные решения',
  '10_quality_requirements': 'Требования к качеству',
  '11_technical_risks': 'Риски и технический долг',
  '12_glossary': 'Глоссарий'
};

/**
 * Russian section descriptions
 * Based on vendor/arc42-template/RU/
 */
export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Постановка задачи, цели качества и заинтересованные стороны',
  '02_architecture_constraints': 'Технические и организационные ограничения',
  '03_context_and_scope': 'Бизнес-контекст и технический контекст, внешние интерфейсы',
  '04_solution_strategy': 'Основные решения и стратегии',
  '05_building_block_view': 'Статическая декомпозиция системы',
  '06_runtime_view': 'Динамическое поведение и важные сценарии',
  '07_deployment_view': 'Инфраструктура и развертывание',
  '08_concepts': 'Сквозные правила и подходы к решению',
  '09_architecture_decisions': 'Важные, дорогостоящие, критические или рискованные решения',
  '10_quality_requirements': 'Дерево качества и сценарии качества',
  '11_technical_risks': 'Известные проблемы, риски и технический долг',
  '12_glossary': 'Важные бизнес- и технические термины'
};

/**
 * Get the Russian title for a section
 */
export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

/**
 * Get the Russian description for a section
 */
export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
