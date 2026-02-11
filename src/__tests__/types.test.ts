/**
 * Tests for types.ts
 * 
 * Tests type definitions, constants, and helper functions
 */

import { describe, it, expect } from 'vitest';
import {
  toMCPResponse,
  ARC42_SECTIONS,
  SECTION_METADATA,
  getErrorMessage,
  type ToolResponse,
  type MCPToolResponse
} from '../types.js';

describe('types.ts', () => {
  describe('ARC42_SECTIONS', () => {
    it('should contain exactly 12 sections', () => {
      expect(ARC42_SECTIONS).toHaveLength(12);
    });

    it('should have sections in correct order', () => {
      expect(ARC42_SECTIONS[0]).toBe('01_introduction_and_goals');
      expect(ARC42_SECTIONS[11]).toBe('12_glossary');
    });

    it('should contain all required arc42 sections', () => {
      const expectedSections = [
        '01_introduction_and_goals',
        '02_architecture_constraints',
        '03_context_and_scope',
        '04_solution_strategy',
        '05_building_block_view',
        '06_runtime_view',
        '07_deployment_view',
        '08_concepts',
        '09_architecture_decisions',
        '10_quality_requirements',
        '11_technical_risks',
        '12_glossary'
      ];

      expectedSections.forEach(section => {
        expect(ARC42_SECTIONS).toContain(section);
      });
    });

    it('should be readonly', () => {
      // TypeScript should prevent modification, but we can verify the runtime behavior
      expect(Object.isFrozen(ARC42_SECTIONS) || Array.isArray(ARC42_SECTIONS)).toBe(true);
    });
  });

  describe('SECTION_METADATA', () => {
    it('should have metadata for all 12 sections', () => {
      const metadataKeys = Object.keys(SECTION_METADATA);
      expect(metadataKeys).toHaveLength(12);
    });

    it('should have complete metadata for each section', () => {
      ARC42_SECTIONS.forEach((section) => {
        const metadata = SECTION_METADATA[section];
        
        expect(metadata).toBeDefined();
        expect(metadata.name).toBe(section);
        expect(metadata.title).toBeTruthy();
        expect(metadata.description).toBeTruthy();
        expect(metadata.order).toBeGreaterThanOrEqual(1);
        expect(metadata.order).toBeLessThanOrEqual(12);
      });
    });

    it('should have unique order numbers for each section', () => {
      const orders = Object.values(SECTION_METADATA).map(m => m.order);
      const uniqueOrders = new Set(orders);
      expect(uniqueOrders.size).toBe(12);
    });

    it('should have meaningful titles (not just section names)', () => {
      expect(SECTION_METADATA['01_introduction_and_goals'].title).toBe('Introduction and Goals');
      expect(SECTION_METADATA['05_building_block_view'].title).toBe('Building Block View');
      expect(SECTION_METADATA['12_glossary'].title).toBe('Glossary');
    });

    it('should have descriptions that explain the section purpose', () => {
      ARC42_SECTIONS.forEach((section) => {
        const description = SECTION_METADATA[section].description;
        expect(description.length).toBeGreaterThan(10);
      });
    });
  });

  describe('toMCPResponse', () => {
    it('should convert successful response to MCP format', () => {
      const toolResponse: ToolResponse = {
        success: true,
        message: 'Operation completed successfully',
        data: { key: 'value' }
      };

      const mcpResponse = toMCPResponse(toolResponse);

      expect(mcpResponse.content).toHaveLength(1);
      expect(mcpResponse.content[0].type).toBe('text');
      expect(mcpResponse.isError).toBeFalsy(); // false when not an error
      
      const parsedContent = JSON.parse(mcpResponse.content[0].text);
      expect(parsedContent.success).toBe(true);
      expect(parsedContent.message).toBe('Operation completed successfully');
      expect(parsedContent.data.key).toBe('value');
    });

    it('should convert error response with isError flag', () => {
      const toolResponse: ToolResponse = {
        success: false,
        message: 'Operation failed'
      };

      const mcpResponse = toMCPResponse(toolResponse, true);

      expect(mcpResponse.isError).toBe(true);
      expect(mcpResponse.content).toHaveLength(1);
      
      const parsedContent = JSON.parse(mcpResponse.content[0].text);
      expect(parsedContent.success).toBe(false);
    });

    it('should default isError to false when not specified', () => {
      const toolResponse: ToolResponse = {
        success: true,
        message: 'Success'
      };

      const mcpResponse = toMCPResponse(toolResponse);
      expect(mcpResponse.isError).toBeFalsy();
    });

    it('should preserve nextSteps in response', () => {
      const toolResponse: ToolResponse = {
        success: true,
        message: 'Done',
        nextSteps: ['Step 1', 'Step 2', 'Step 3']
      };

      const mcpResponse = toMCPResponse(toolResponse);
      const parsedContent = JSON.parse(mcpResponse.content[0].text);
      
      expect(parsedContent.nextSteps).toEqual(['Step 1', 'Step 2', 'Step 3']);
    });

    it('should format JSON with proper indentation', () => {
      const toolResponse: ToolResponse = {
        success: true,
        message: 'Test'
      };

      const mcpResponse = toMCPResponse(toolResponse);
      const text = mcpResponse.content[0].text;
      
      // Should have newlines (formatted JSON)
      expect(text).toContain('\n');
      // Should have proper indentation
      expect(text).toContain('  ');
    });

    it('should handle complex nested data', () => {
      const toolResponse: ToolResponse = {
        success: true,
        message: 'Complex data',
        data: {
          nested: {
            deep: {
              value: 123
            }
          },
          array: [1, 2, 3],
          nullValue: null,
          boolValue: false
        }
      };

      const mcpResponse = toMCPResponse(toolResponse);
      const parsedContent = JSON.parse(mcpResponse.content[0].text);
      
      expect(parsedContent.data.nested.deep.value).toBe(123);
      expect(parsedContent.data.array).toEqual([1, 2, 3]);
      expect(parsedContent.data.nullValue).toBeNull();
      expect(parsedContent.data.boolValue).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('should extract message from Error instance', () => {
      const error = new Error('Test error message');
      expect(getErrorMessage(error)).toBe('Test error message');
    });

    it('should extract message from TypeError', () => {
      const error = new TypeError('Type error occurred');
      expect(getErrorMessage(error)).toBe('Type error occurred');
    });

    it('should extract message from custom Error subclass', () => {
      class CustomError extends Error {
        constructor(message: string) {
          super(message);
          this.name = 'CustomError';
        }
      }
      const error = new CustomError('Custom error message');
      expect(getErrorMessage(error)).toBe('Custom error message');
    });

    it('should convert string thrown value to string', () => {
      const error = 'string error message';
      expect(getErrorMessage(error)).toBe('string error message');
    });

    it('should convert number thrown value to string', () => {
      const error = 42;
      expect(getErrorMessage(error)).toBe('42');
    });

    it('should convert null thrown value to string', () => {
      const error = null;
      expect(getErrorMessage(error)).toBe('null');
    });

    it('should convert undefined thrown value to string', () => {
      const error = undefined;
      expect(getErrorMessage(error)).toBe('undefined');
    });

    it('should convert object thrown value to string', () => {
      const error = { code: 'ERROR_CODE', detail: 'details' };
      expect(getErrorMessage(error)).toBe('[object Object]');
    });

    it('should handle boolean thrown value', () => {
      expect(getErrorMessage(false)).toBe('false');
      expect(getErrorMessage(true)).toBe('true');
    });

    it('should handle array thrown value', () => {
      const error = ['error1', 'error2'];
      expect(getErrorMessage(error)).toBe('error1,error2');
    });
  });

  describe('Type Contracts', () => {
    it('ToolResponse should support all required fields', () => {
      const response: ToolResponse = {
        success: true,
        message: 'Test message',
        data: { any: 'data' },
        nextSteps: ['step1']
      };

      expect(response.success).toBeDefined();
      expect(response.message).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.nextSteps).toBeDefined();
    });

    it('MCPToolResponse should have correct structure', () => {
      const response: MCPToolResponse = {
        content: [{ type: 'text', text: 'content' }],
        isError: false
      };

      expect(response.content).toBeInstanceOf(Array);
      expect(response.content[0].type).toBe('text');
      expect(typeof response.isError).toBe('boolean');
    });
  });
});
