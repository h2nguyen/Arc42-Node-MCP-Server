/**
 * Ukrainian Section Titles and Descriptions
 * @module templates/locales/ukr/sections
 */

import type { Arc42Section } from '../../../types.js';

export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Вступ та цілі',
  '02_architecture_constraints': 'Обмеження архітектури',
  '03_context_and_scope': 'Контекст та обсяг',
  '04_solution_strategy': 'Стратегія рішення',
  '05_building_block_view': 'Вигляд будівельних блоків',
  '06_runtime_view': 'Вигляд часу виконання',
  '07_deployment_view': 'Вигляд розгортання',
  '08_concepts': 'Наскрізні концепції',
  '09_architecture_decisions': 'Архітектурні рішення',
  '10_quality_requirements': 'Вимоги до якості',
  '11_technical_risks': 'Ризики та технічний борг',
  '12_glossary': 'Глосарій'
};

export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Постановка завдання, цілі якості та зацікавлені сторони',
  '02_architecture_constraints': 'Технічні та організаційні обмеження',
  '03_context_and_scope': 'Бізнес та технічний контекст, зовнішні інтерфейси',
  '04_solution_strategy': 'Основні рішення та стратегії',
  '05_building_block_view': 'Статична декомпозиція системи',
  '06_runtime_view': 'Динамічна поведінка та важливі сценарії',
  '07_deployment_view': 'Інфраструктура та розгортання',
  '08_concepts': 'Наскрізні правила та підходи до рішення',
  '09_architecture_decisions': 'Важливі, дорогі, критичні або ризиковані рішення',
  '10_quality_requirements': 'Дерево якості та сценарії якості',
  '11_technical_risks': 'Відомі проблеми, ризики та технічний борг',
  '12_glossary': 'Важливі бізнес та технічні терміни'
};

export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
