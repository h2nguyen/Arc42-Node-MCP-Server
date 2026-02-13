/**
 * Chinese Section Titles and Descriptions
 * @module templates/locales/zh/sections
 */

import type { Arc42Section } from '../../../types.js';

export const SECTION_TITLES: Record<Arc42Section, string> = {
  '01_introduction_and_goals': '简介和目标',
  '02_architecture_constraints': '架构约束',
  '03_context_and_scope': '上下文和范围',
  '04_solution_strategy': '解决方案策略',
  '05_building_block_view': '构建块视图',
  '06_runtime_view': '运行时视图',
  '07_deployment_view': '部署视图',
  '08_concepts': '横切概念',
  '09_architecture_decisions': '架构决策',
  '10_quality_requirements': '质量要求',
  '11_technical_risks': '风险和技术债务',
  '12_glossary': '术语表'
};

export const SECTION_DESCRIPTIONS: Record<Arc42Section, string> = {
  '01_introduction_and_goals': '任务陈述、质量目标和利益相关者',
  '02_architecture_constraints': '技术和组织约束',
  '03_context_and_scope': '业务和技术上下文、外部接口',
  '04_solution_strategy': '基本决策和解决方案策略',
  '05_building_block_view': '系统的静态分解',
  '06_runtime_view': '动态行为和重要场景',
  '07_deployment_view': '基础设施和部署',
  '08_concepts': '横切规则和解决方案方法',
  '09_architecture_decisions': '重要的、昂贵的、关键的或有风险的决策',
  '10_quality_requirements': '质量树和质量场景',
  '11_technical_risks': '已知问题、风险和技术债务',
  '12_glossary': '重要的业务和技术术语'
};

export function getSectionTitle(section: Arc42Section): string {
  return SECTION_TITLES[section];
}

export function getSectionDescription(section: Arc42Section): string {
  return SECTION_DESCRIPTIONS[section];
}
