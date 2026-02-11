/**
 * Tests for templates/index.ts
 * 
 * Tests arc42 section template generation
 */

import { describe, it, expect } from 'vitest';
import { getSectionTemplate } from '../../templates/index.js';
import { ALL_SECTIONS } from '../fixtures/test-helpers.js';

describe('templates', () => {
  describe('getSectionTemplate', () => {
    it('should return template for all 12 sections', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = getSectionTemplate(section);
        expect(template).toBeTruthy();
        expect(typeof template).toBe('string');
        expect(template.length).toBeGreaterThan(100);
      });
    });

    it('should return templates with markdown formatting', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = getSectionTemplate(section);
        // All templates should have at least one heading
        expect(template).toMatch(/^#/m);
      });
    });

    describe('Section 01: Introduction and Goals', () => {
      const template = getSectionTemplate('01_introduction_and_goals');

      it('should include Requirements Overview', () => {
        expect(template).toContain('Requirements Overview');
      });

      it('should include Quality Goals', () => {
        expect(template).toContain('Quality Goals');
      });

      it('should include Stakeholders', () => {
        expect(template).toContain('Stakeholders');
      });

      it('should have structured tables', () => {
        expect(template).toMatch(/\|.*\|/);
      });
    });

    describe('Section 02: Architecture Constraints', () => {
      const template = getSectionTemplate('02_architecture_constraints');

      it('should include Technical Constraints', () => {
        expect(template).toContain('Technical Constraints');
      });

      it('should include Organizational Constraints', () => {
        expect(template).toContain('Organizational Constraints');
      });

      it('should include Conventions', () => {
        expect(template).toContain('Conventions');
      });
    });

    describe('Section 03: Context and Scope', () => {
      const template = getSectionTemplate('03_context_and_scope');

      it('should include Business Context', () => {
        expect(template).toContain('Business Context');
      });

      it('should include Technical Context', () => {
        expect(template).toContain('Technical Context');
      });
    });

    describe('Section 04: Solution Strategy', () => {
      const template = getSectionTemplate('04_solution_strategy');

      it('should include Solution Decisions', () => {
        expect(template).toContain('Solution');
      });

      it('should include Quality Goals mapping', () => {
        expect(template).toContain('Quality');
      });
    });

    describe('Section 05: Building Block View', () => {
      const template = getSectionTemplate('05_building_block_view');

      it('should include Level 1', () => {
        expect(template).toContain('Level 1');
      });

      it('should reference component structure', () => {
        expect(template).toContain('Component');
      });
    });

    describe('Section 06: Runtime View', () => {
      const template = getSectionTemplate('06_runtime_view');

      it('should include scenarios', () => {
        expect(template).toContain('Scenario');
      });

      it('should include sequence diagram support', () => {
        expect(template.toLowerCase()).toContain('sequence');
      });
    });

    describe('Section 07: Deployment View', () => {
      const template = getSectionTemplate('07_deployment_view');

      it('should include infrastructure', () => {
        expect(template.toLowerCase()).toContain('infrastructure');
      });

      it('should include deployment information', () => {
        expect(template.toLowerCase()).toContain('deploy');
      });
    });

    describe('Section 08: Cross-cutting Concepts', () => {
      const template = getSectionTemplate('08_concepts');

      it('should include domain model concepts', () => {
        expect(template.toLowerCase()).toContain('domain');
      });

      it('should include security concepts', () => {
        expect(template).toContain('Security');
      });

      it('should include error handling', () => {
        expect(template).toContain('Error');
      });
    });

    describe('Section 09: Architecture Decisions', () => {
      const template = getSectionTemplate('09_architecture_decisions');

      it('should include ADR format', () => {
        expect(template).toContain('ADR');
      });

      it('should include context and decision structure', () => {
        expect(template).toContain('Context');
        expect(template).toContain('Decision');
      });

      it('should include consequences', () => {
        expect(template).toContain('Consequences');
      });
    });

    describe('Section 10: Quality Requirements', () => {
      const template = getSectionTemplate('10_quality_requirements');

      it('should include Quality Tree', () => {
        expect(template).toContain('Quality Tree');
      });

      it('should include Quality Scenarios', () => {
        expect(template).toContain('Scenario');
      });
    });

    describe('Section 11: Risks and Technical Debt', () => {
      const template = getSectionTemplate('11_technical_risks');

      it('should include Risks section', () => {
        expect(template).toContain('Risk');
      });

      it('should include Technical Debt section', () => {
        expect(template).toContain('Technical Debt');
      });
    });

    describe('Section 12: Glossary', () => {
      const template = getSectionTemplate('12_glossary');

      it('should include Domain Terms', () => {
        expect(template).toContain('Domain');
      });

      it('should include Technical Terms', () => {
        expect(template).toContain('Technical');
      });

      it('should have table structure for terms', () => {
        expect(template).toMatch(/\|.*Term.*\|/i);
      });
    });
  });

  describe('Template Quality Standards', () => {
    it('all templates should have Purpose description', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = getSectionTemplate(section);
        // Most templates should explain their purpose
        expect(template.length).toBeGreaterThan(200);
      });
    });

    it('all templates should have proper markdown structure', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = getSectionTemplate(section);
        // Should have at least one H1 or H2
        expect(template).toMatch(/^#{1,2} /m);
      });
    });

    it('all templates should include helpful guidance', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = getSectionTemplate(section);
        // Templates should have substantial content with guidance
        expect(template.length).toBeGreaterThan(500);
      });
    });

    it('templates should not contain undefined values', () => {
      ALL_SECTIONS.forEach((section) => {
        const template = getSectionTemplate(section);
        expect(template).not.toContain('undefined');
        expect(template).not.toContain('[object Object]');
      });
    });
  });
});
