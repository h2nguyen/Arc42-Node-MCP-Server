/**
 * Core types for arc42 MCP server
 */

// Re-export output format types for convenience
export type {
  OutputFormatStrategy,
  OutputFormatCode
} from './templates/formats/output-format-strategy.js';

export {
  SUPPORTED_OUTPUT_FORMAT_CODES,
  OUTPUT_FORMAT_ALIASES,
  DEFAULT_OUTPUT_FORMAT,
  isOutputFormatCode,
  normalizeOutputFormatCode
} from './templates/formats/output-format-strategy.js';

export interface ToolContext {
  projectPath: string;
  workspaceRoot: string;
}

export interface ToolResponse {
  success: boolean;
  message: string;
  data?: any;
  nextSteps?: string[];
}

// MCP-compliant response format (matches CallToolResult from SDK)
export interface MCPToolResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
  [key: string]: unknown;  // Allow additional properties for SDK compatibility
}

// Arc42 section definitions
export type Arc42Section = 
  | '01_introduction_and_goals'
  | '02_architecture_constraints'
  | '03_context_and_scope'
  | '04_solution_strategy'
  | '05_building_block_view'
  | '06_runtime_view'
  | '07_deployment_view'
  | '08_concepts'
  | '09_architecture_decisions'
  | '10_quality_requirements'
  | '11_technical_risks'
  | '12_glossary';

export const ARC42_SECTIONS: readonly Arc42Section[] = [
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

export interface SectionMetadata {
  name: string;
  title: string;
  description: string;
  order: number;
}

export const SECTION_METADATA: Record<Arc42Section, SectionMetadata> = {
  '01_introduction_and_goals': {
    name: '01_introduction_and_goals',
    title: 'Introduction and Goals',
    description: 'Requirements overview, quality goals, and stakeholders',
    order: 1
  },
  '02_architecture_constraints': {
    name: '02_architecture_constraints',
    title: 'Architecture Constraints',
    description: 'Technical and organizational constraints',
    order: 2
  },
  '03_context_and_scope': {
    name: '03_context_and_scope',
    title: 'Context and Scope',
    description: 'Business and technical context, external interfaces',
    order: 3
  },
  '04_solution_strategy': {
    name: '04_solution_strategy',
    title: 'Solution Strategy',
    description: 'Fundamental solution decisions and strategies',
    order: 4
  },
  '05_building_block_view': {
    name: '05_building_block_view',
    title: 'Building Block View',
    description: 'Static decomposition of the system',
    order: 5
  },
  '06_runtime_view': {
    name: '06_runtime_view',
    title: 'Runtime View',
    description: 'Dynamic behavior and key scenarios',
    order: 6
  },
  '07_deployment_view': {
    name: '07_deployment_view',
    title: 'Deployment View',
    description: 'Infrastructure and deployment',
    order: 7
  },
  '08_concepts': {
    name: '08_concepts',
    title: 'Cross-cutting Concepts',
    description: 'Overall, principal regulations and solution approaches',
    order: 8
  },
  '09_architecture_decisions': {
    name: '09_architecture_decisions',
    title: 'Architecture Decisions',
    description: 'Important, expensive, critical, or risky decisions',
    order: 9
  },
  '10_quality_requirements': {
    name: '10_quality_requirements',
    title: 'Quality Requirements',
    description: 'Quality tree and quality scenarios',
    order: 10
  },
  '11_technical_risks': {
    name: '11_technical_risks',
    title: 'Risks and Technical Debt',
    description: 'Known problems, risks, and technical debt',
    order: 11
  },
  '12_glossary': {
    name: '12_glossary',
    title: 'Glossary',
    description: 'Important domain and technical terms',
    order: 12
  }
};

export interface DocumentStatus {
  exists: boolean;
  path?: string;
  lastModified?: string;
  wordCount?: number;
  completeness?: number; // 0-100%
}

export interface Arc42Status {
  projectName: string;
  projectPath: string;
  initialized: boolean;
  sections: Record<Arc42Section, DocumentStatus>;
  overallCompleteness: number; // 0-100%
  lastModified?: string;
}

export interface SectionContent {
  section: Arc42Section;
  content: string;
  metadata?: {
    author?: string;
    version?: string;
    lastModified?: string;
    [key: string]: any;
  };
}

// Helper function to convert ToolResponse to MCP format
export function toMCPResponse(response: ToolResponse, isError: boolean = false): MCPToolResponse {
  return {
    content: [{
      type: "text",
      text: JSON.stringify(response, null, 2)
    }],
    isError
  };
}

// Helper function to resolve workspace root from optional targetFolder
export function resolveWorkspaceRoot(context: ToolContext, targetFolder?: string): {
  projectPath: string;
  workspaceRoot: string;
} {
  if (targetFolder) {
    return {
      projectPath: targetFolder,
      workspaceRoot: `${targetFolder}/arc42-docs`
    };
  }
  return {
    projectPath: context.projectPath,
    workspaceRoot: context.workspaceRoot
  };
}

// Helper function to extract error message from unknown error type
// This handles both Error instances and non-Error thrown values
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
