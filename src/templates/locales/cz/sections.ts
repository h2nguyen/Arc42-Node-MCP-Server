/**
 * Czech Section Titles and Descriptions
 * @module templates/locales/cz/sections
 */

import type { Arc42Section } from '../../../types.js';

export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Úvod a cíle',
  '02_architecture_constraints': 'Omezení architektury',
  '03_context_and_scope': 'Kontext a rozsah',
  '04_solution_strategy': 'Strategie řešení',
  '05_building_block_view': 'Pohled stavebních bloků',
  '06_runtime_view': 'Pohled běhu',
  '07_deployment_view': 'Pohled nasazení',
  '08_concepts': 'Průřezové koncepty',
  '09_architecture_decisions': 'Architektonická rozhodnutí',
  '10_quality_requirements': 'Požadavky na kvalitu',
  '11_technical_risks': 'Rizika a technický dluh',
  '12_glossary': 'Slovník'
};

export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': 'Popis úlohy, cíle kvality a zainteresované strany',
  '02_architecture_constraints': 'Technická a organizační omezení',
  '03_context_and_scope': 'Obchodní a technický kontext, externí rozhraní',
  '04_solution_strategy': 'Základní rozhodnutí a strategie řešení',
  '05_building_block_view': 'Statická dekompozice systému',
  '06_runtime_view': 'Dynamické chování a důležité scénáře',
  '07_deployment_view': 'Infrastruktura a nasazení',
  '08_concepts': 'Průřezová pravidla a přístupy k řešení',
  '09_architecture_decisions': 'Důležitá, nákladná, kritická nebo riziková rozhodnutí',
  '10_quality_requirements': 'Strom kvality a scénáře kvality',
  '11_technical_risks': 'Známé problémy, rizika a technický dluh',
  '12_glossary': 'Důležité obchodní a technické pojmy'
};

export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
