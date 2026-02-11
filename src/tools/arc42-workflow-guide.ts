import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse } from '../types.js';

export const arc42WorkflowGuideTool: Tool = {
  name: 'arc42-workflow-guide',
  description: `Load the complete arc42 documentation workflow guide.

This tool provides comprehensive instructions for creating architecture documentation following the arc42 template standard. Use this tool FIRST when starting architecture documentation to understand the complete workflow and all 12 sections.

The arc42 template is a proven, practical, and pragmatic approach to architecture documentation used worldwide.`,
  inputSchema: {
    type: 'object',
    properties: {},
    additionalProperties: false
  }
};

export async function arc42WorkflowGuideHandler(
  _args: Record<string, unknown>,
  context: ToolContext
): Promise<ToolResponse> {
  const guide = getArc42WorkflowGuide();

  return {
    success: true,
    message: 'arc42 workflow guide loaded successfully',
    data: {
      guide,
      workspaceRoot: context.workspaceRoot
    },
    nextSteps: [
      'Initialize arc42 documentation with: arc42-init',
      'Check current status with: arc42-status',
      'Generate section templates with: generate-template',
      'Update sections with: update-section'
    ]
  };
}

function getArc42WorkflowGuide(): string {
  return `# arc42 Architecture Documentation Workflow

## Overview

arc42 is a template for architecture communication and documentation. It provides a clear structure for documenting software and system architectures, making them understandable for all stakeholders.

**Website**: https://arc42.org/
**Documentation**: https://docs.arc42.org/

## The 12 arc42 Sections

arc42 consists of 12 sections that cover all aspects of architecture documentation:

### 1. Introduction and Goals
**Purpose**: Define requirements overview, quality goals, and stakeholders
- What are the key requirements?
- What are the top 3-5 quality goals?
- Who are the stakeholders?

### 2. Architecture Constraints
**Purpose**: Document technical and organizational constraints
- Technology constraints (must-use technologies, frameworks)
- Organizational constraints (team structure, deadlines, budget)
- Conventions (coding standards, architecture patterns)

### 3. Context and Scope
**Purpose**: Define system boundaries and external interfaces
- Business context: What business processes does the system support?
- Technical context: What are the external systems and interfaces?
- Who uses the system and how?

### 4. Solution Strategy
**Purpose**: Summarize fundamental solution decisions and strategies
- What are the key architectural patterns?
- How do you achieve the quality goals?
- What are the main technology decisions?

### 5. Building Block View
**Purpose**: Static decomposition - how is the system structured?
- Level 1: Overall system structure (black box view)
- Level 2: Decomposition of major building blocks
- Level 3: Detailed structure where needed
- Use diagrams (component diagrams, package diagrams)

### 6. Runtime View
**Purpose**: Dynamic behavior - how do components interact?
- Key scenarios and use cases
- Sequence diagrams, activity diagrams
- Important runtime behaviors
- Data flows and message exchanges

### 7. Deployment View
**Purpose**: Infrastructure and deployment
- Hardware architecture
- Deployment environments (dev, staging, production)
- Network topology
- Infrastructure components

### 8. Cross-cutting Concepts
**Purpose**: Overall, principal regulations and solution approaches
- Domain models
- Security concepts
- Error handling
- Logging and monitoring
- Configuration management
- Testing strategies

### 9. Architecture Decisions
**Purpose**: Important, expensive, critical, or risky architecture decisions
- Use Architecture Decision Records (ADRs)
- Document: Context, Decision, Consequences
- Focus on decisions that have significant impact
- Explain the rationale

### 10. Quality Requirements
**Purpose**: Quality tree and quality scenarios
- Quality tree: hierarchy of quality requirements
- Quality scenarios: concrete scenarios testing quality attributes
- Based on ISO 25010 quality model
- Map to quality goals from section 1

### 11. Risks and Technical Debt
**Purpose**: Known problems, risks, and technical debt
- What could go wrong?
- Known technical debt
- Risk mitigation strategies
- Priority and severity

### 12. Glossary
**Purpose**: Important domain and technical terms
- Domain terminology
- Technical terms
- Abbreviations and acronyms
- Ensure consistent terminology

## Workflow

### Phase 1: Initialize Project
1. Use \`arc42-init\` tool to create the workspace structure
2. This creates the \`arc42-docs\` directory with:
   - All 12 section templates
   - Configuration files
   - README with instructions

### Phase 2: Document Iteratively
You don't need to complete all sections in order! Common approaches:

**Top-Down Approach**:
1. Section 1: Introduction and Goals (always start here!)
2. Section 3: Context and Scope
3. Section 4: Solution Strategy
4. Section 5: Building Block View
5. Fill in other sections as needed

**Use-Case Driven**:
1. Section 1: Introduction and Goals
2. Section 6: Runtime View (key scenarios)
3. Section 5: Building Block View
4. Other sections as needed

**Risk-Driven**:
1. Section 1: Introduction and Goals
2. Section 11: Risks and Technical Debt
3. Sections addressing the identified risks

### Phase 3: Review and Refine
- Regular reviews with stakeholders
- Keep it up-to-date as architecture evolves
- Focus on decisions and rationale, not implementation details
- Use diagrams effectively

### Phase 4: Generate and Publish
- Generate HTML, PDF, or other formats
- Publish to wiki or documentation site
- Version control your architecture documentation

## Best Practices

### 1. Keep It Simple
- Focus on decisions, not details
- Use diagrams liberally
- Write for your stakeholders

### 2. Iterative Approach
- Start with high-level views
- Add detail where needed
- Don't try to complete everything at once

### 3. Maintain Traceability
- Link requirements to architecture decisions
- Link quality goals to solution strategies
- Reference specific sections when documenting decisions

### 4. Use Appropriate Detail Level
- Management: Sections 1, 2, 3, 4, 10, 11
- Developers: Sections 5, 6, 7, 8, 9
- Operations: Sections 7, 8, 11

### 5. Keep It Current
- Update when architecture changes
- Review quarterly or after major changes
- Use version control

## AI-Assisted Documentation Tips

### When Using This MCP Server:
1. **Start with context**: Always run \`arc42-workflow-guide\` first
2. **Initialize properly**: Use \`arc42-init\` to set up structure
3. **Work section by section**: Use \`generate-template\` to get section templates
4. **Update incrementally**: Use \`update-section\` to add content
5. **Check progress**: Use \`arc42-status\` regularly

### Prompting Tips:
- "Generate section 1 focusing on quality goals for a microservices e-commerce system"
- "Create section 5 building block view with component diagram for authentication service"
- "Document ADR for choosing PostgreSQL over MongoDB in section 9"
- "Generate quality scenarios for performance and security in section 10"

### What the AI Can Help With:
✅ Structure and templates
✅ Boilerplate content
✅ Diagrams (as text/PlantUML/Mermaid)
✅ Initial drafts
✅ Consistency checking

### What Requires Human Input:
⚠️ Specific business requirements
⚠️ Actual architecture decisions
⚠️ Stakeholder priorities
⚠️ Quality goal priorities
⚠️ Risk assessment

## Tools Available

### arc42-init
Initialize arc42 documentation workspace
- Creates directory structure
- Generates all section templates
- Sets up configuration

### arc42-status  
Check documentation status
- Shows completion status for all sections
- Identifies missing or incomplete sections
- Provides overall progress

### generate-template
Generate a template for a specific section
- Gets the detailed template for any section
- Includes help text and examples
- Can be customized

### update-section
Update content in a specific section
- Add or modify content
- Preserves structure
- Validates against template

## File Structure

\`\`\`
project-root/
└── arc42-docs/
    ├── README.md
    ├── arc42-template.md          # Main combined document
    ├── config.yaml                # Configuration
    └── sections/
        ├── 01_introduction_and_goals.md
        ├── 02_architecture_constraints.md
        ├── 03_context_and_scope.md
        ├── 04_solution_strategy.md
        ├── 05_building_block_view.md
        ├── 06_runtime_view.md
        ├── 07_deployment_view.md
        ├── 08_concepts.md
        ├── 09_architecture_decisions.md
        ├── 10_quality_requirements.md
        ├── 11_technical_risks.md
        └── 12_glossary.md
\`\`\`

## References

- **arc42**: https://arc42.org/
- **arc42 Documentation**: https://docs.arc42.org/
- **arc42 Examples**: https://arc42.org/examples
- **FAQ**: https://faq.arc42.org/
- **GitHub**: https://github.com/arc42

## Next Steps

1. Run \`arc42-init\` with your project name
2. Start with Section 1: Introduction and Goals
3. Work through sections based on your approach
4. Review and refine regularly
5. Generate final documentation

Remember: arc42 is a communication tool. Focus on making architecture decisions transparent and understandable for all stakeholders!
`;
}
