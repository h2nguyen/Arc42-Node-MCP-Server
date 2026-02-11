/**
 * Test Helpers for arc42 MCP Server
 * 
 * Provides utilities for testing tool handlers with proper mocking
 * and temporary filesystem operations.
 */

import { mkdirSync, rmSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import type { ToolContext, ToolResponse, Arc42Section } from '../../types.js';

/**
 * Creates a temporary directory for testing
 * Returns the path and a cleanup function
 */
export function createTempDir(prefix: string = 'arc42-test'): { path: string; cleanup: () => void } {
  const tempPath = join(tmpdir(), `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(tempPath, { recursive: true });
  
  return {
    path: tempPath,
    cleanup: () => {
      if (existsSync(tempPath)) {
        rmSync(tempPath, { recursive: true, force: true });
      }
    }
  };
}

/**
 * Creates a test context with a temporary workspace
 */
export function createTestContext(tempPath?: string): { context: ToolContext; cleanup: () => void } {
  const temp = tempPath ? { path: tempPath, cleanup: () => {} } : createTempDir('arc42-context');
  
  const context: ToolContext = {
    projectPath: temp.path,
    workspaceRoot: join(temp.path, 'arc42-docs')
  };
  
  return {
    context,
    cleanup: temp.cleanup
  };
}

/**
 * Creates a pre-initialized workspace for testing
 */
export function createInitializedWorkspace(): { context: ToolContext; cleanup: () => void } {
  const { context, cleanup } = createTestContext();
  
  // Create workspace structure
  const workspaceRoot = context.workspaceRoot;
  mkdirSync(workspaceRoot, { recursive: true });
  mkdirSync(join(workspaceRoot, 'sections'), { recursive: true });
  mkdirSync(join(workspaceRoot, 'images'), { recursive: true });
  
  // Create config file
  writeFileSync(
    join(workspaceRoot, 'config.yaml'),
    `projectName: test-project
version: 1.0.0
created: ${new Date().toISOString()}
format: markdown
arc42Version: "8.0"
language: en
`
  );
  
  return { context, cleanup };
}

/**
 * Creates a workspace with sample section content
 */
export function createWorkspaceWithContent(): { context: ToolContext; cleanup: () => void } {
  const { context, cleanup } = createInitializedWorkspace();
  
  // Create sample section files
  const sections: Arc42Section[] = [
    '01_introduction_and_goals',
    '02_architecture_constraints',
    '03_context_and_scope'
  ];
  
  sections.forEach((section, index) => {
    const content = `# ${section.replace(/_/g, ' ')}\n\nThis is sample content for testing. `.repeat(20 + index * 10);
    writeFileSync(
      join(context.workspaceRoot, 'sections', `${section}.md`),
      content
    );
  });
  
  return { context, cleanup };
}

/**
 * Helper to read section content from workspace
 */
export function readSectionContent(context: ToolContext, section: Arc42Section): string | null {
  const sectionPath = join(context.workspaceRoot, 'sections', `${section}.md`);
  if (existsSync(sectionPath)) {
    return readFileSync(sectionPath, 'utf-8');
  }
  return null;
}

/**
 * Helper to check if workspace is properly initialized
 */
export function isWorkspaceInitialized(context: ToolContext): boolean {
  const workspaceRoot = context.workspaceRoot;
  return (
    existsSync(workspaceRoot) &&
    existsSync(join(workspaceRoot, 'sections')) &&
    existsSync(join(workspaceRoot, 'images')) &&
    existsSync(join(workspaceRoot, 'config.yaml'))
  );
}

/**
 * Type guard for successful response
 */
export function isSuccessResponse(response: ToolResponse): boolean {
  return response.success === true;
}

/**
 * Type guard for error response
 */
export function isErrorResponse(response: ToolResponse): boolean {
  return response.success === false;
}

/**
 * Helper to assert response has expected data fields
 */
export function assertResponseData<T extends Record<string, unknown>>(
  response: ToolResponse,
  expectedFields: (keyof T)[]
): asserts response is ToolResponse & { data: T } {
  if (!response.data) {
    throw new Error('Response data is undefined');
  }
  for (const field of expectedFields) {
    if (!(field in response.data)) {
      throw new Error(`Expected field '${String(field)}' not found in response data`);
    }
  }
}

/**
 * All arc42 section identifiers for testing
 */
export const ALL_SECTIONS: readonly Arc42Section[] = [
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
] as const;

/**
 * Sample valid project names for testing
 */
export const VALID_PROJECT_NAMES = [
  'my-project',
  'MyProject',
  'my_project_123',
  'Test Project',
  'Arc42-Node-MCP-Server'
];

/**
 * Sample invalid inputs for testing validation
 */
export const INVALID_INPUTS = {
  emptyString: '',
  whitespaceOnly: '   ',
  nullValue: null,
  undefinedValue: undefined
};
