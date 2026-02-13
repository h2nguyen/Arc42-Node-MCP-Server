/**
 * English Templates
 *
 * Contains all arc42 section templates in English.
 * Extracted from the original templates/index.ts for multi-language support.
 *
 * @module templates/locales/en/templates
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the English template for a specific section
 */
export function getTemplate(section: Arc42Section): string {
  const templates: Record<Arc42Section, () => string> = {
    '01_introduction_and_goals': getIntroductionAndGoalsTemplate,
    '02_architecture_constraints': getArchitectureConstraintsTemplate,
    '03_context_and_scope': getContextAndScopeTemplate,
    '04_solution_strategy': getSolutionStrategyTemplate,
    '05_building_block_view': getBuildingBlockViewTemplate,
    '06_runtime_view': getRuntimeViewTemplate,
    '07_deployment_view': getDeploymentViewTemplate,
    '08_concepts': getConceptsTemplate,
    '09_architecture_decisions': getArchitectureDecisionsTemplate,
    '10_quality_requirements': getQualityRequirementsTemplate,
    '11_technical_risks': getTechnicalRisksTemplate,
    '12_glossary': getGlossaryTemplate
  };

  return templates[section]();
}

function getIntroductionAndGoalsTemplate(): string {
  return `# 1. Introduction and Goals

## Requirements Overview

**Purpose**: Describe the relevant requirements and driving forces that architects and development teams must consider.

### Key Requirements

<!-- List the top 3-5 functional requirements -->

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-1 | [Brief description] | High |
| REQ-2 | [Brief description] | Medium |

### Features

<!-- Essential features of the system -->

- Feature 1: [Description]
- Feature 2: [Description]

## Quality Goals

**Purpose**: Define the top 3-5 quality goals that are most important for stakeholders.

<!-- Based on ISO 25010, prioritize qualities like: -->
<!-- Performance, Security, Reliability, Maintainability, Usability, etc. -->

| Priority | Quality Goal | Motivation |
|----------|--------------|------------|
| 1 | [e.g., Performance] | [Why this is critical] |
| 2 | [e.g., Security] | [Why this is critical] |
| 3 | [e.g., Maintainability] | [Why this is critical] |

## Stakeholders

**Purpose**: Identify everyone who should know about the architecture.

| Role/Name | Contact | Expectations |
|-----------|---------|--------------|
| Product Owner | [Name/Email] | [What they expect from the architecture] |
| Development Team | [Team name] | [What they need to know] |
| Operations | [Team/Person] | [Deployment and operations concerns] |
| End Users | [Type] | [User experience expectations] |

## Success Criteria

<!-- What defines success for this system? -->

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `# 2. Architecture Constraints

## Technical Constraints

**Hardware Constraints**

| Constraint | Background/Motivation |
|------------|----------------------|
| [e.g., Cloud platform] | [Why this constraint exists] |

**Software/Technology Constraints**

| Constraint | Background/Motivation |
|------------|----------------------|
| [e.g., Must use Java 17+] | [Reason for constraint] |
| [e.g., Must use PostgreSQL] | [Why this was chosen] |

**Programming Constraints**

- Programming language: [Language]
- Framework: [Framework and version]
- Libraries: [Must-use or forbidden libraries]

## Organizational Constraints

**Organization and Structure**

| Constraint | Background/Motivation |
|------------|----------------------|
| [e.g., Team structure] | [How this affects architecture] |
| [e.g., Agile methodology] | [Development process impact] |

**Resources**

- Budget: [Budget constraints]
- Time: [Timeline constraints]
- Team: [Team size and skills]

## Conventions

**Architecture and Design Conventions**

- [e.g., Microservices architecture pattern]
- [e.g., RESTful API design]
- [e.g., Domain-Driven Design]

**Coding Conventions**

- Code style: [Link to style guide]
- Documentation: [Documentation standards]
- Testing: [Testing requirements]

**Compliance Requirements**

- [e.g., GDPR compliance]
- [e.g., Industry-specific regulations]
- [e.g., Accessibility standards]
`;
}

function getContextAndScopeTemplate(): string {
  return `# 3. Context and Scope

## Business Context

**Purpose**: Show the system's business environment and major external dependencies.

### Context Diagram

\`\`\`
[Create a diagram showing your system and external systems/users it interacts with]
You can use:
- Mermaid diagrams
- PlantUML
- ASCII art
- Or reference an image in /images/
\`\`\`

### External Interfaces

| External Entity | Interface | Purpose |
|----------------|-----------|---------|
| [External System 1] | [API/Protocol] | [What data/functionality is exchanged] |
| [User Type 1] | [UI/API] | [How users interact] |

### Business Processes Supported

<!-- What business processes does this system support? -->

1. **Process 1**: [Description]
   - Actors: [Who is involved]
   - Flow: [High-level flow]

2. **Process 2**: [Description]

## Technical Context

**Purpose**: Show technical interfaces and channels between system and environment.

### Technical Interfaces

| Interface | Technology | Protocol | Format |
|-----------|------------|----------|--------|
| [API 1] | [REST API] | [HTTPS] | [JSON] |
| [Database] | [PostgreSQL] | [TCP/IP] | [SQL] |

### Channels and Transmission

| Channel | Technology | Description |
|---------|------------|-------------|
| [Message Queue] | [RabbitMQ] | [Async communication between services] |

### Mapping: Business to Technical

| Business Context | Technical Realization |
|------------------|----------------------|
| [User Interface] | [React SPA via HTTPS] |
| [External System A] | [REST API over HTTPS] |
`;
}

function getSolutionStrategyTemplate(): string {
  return `# 4. Solution Strategy

**Purpose**: Summarize fundamental decisions and solution strategies that shape the system's architecture.

## Key Solution Decisions

### Architectural Patterns

| Pattern | Motivation | Consequences |
|---------|------------|--------------|
| [e.g., Microservices] | [Why this pattern was chosen] | [Benefits and trade-offs] |

### Technology Choices

| Component | Technology | Reason |
|-----------|------------|--------|
| Backend | [e.g., Node.js] | [Why this was chosen] |
| Frontend | [e.g., React] | [Reasons] |
| Database | [e.g., PostgreSQL] | [Reasons] |

### Top-level Decomposition

<!-- How is the system structured at the highest level? -->

\`\`\`
[High-level component diagram]
\`\`\`

Description:
- Component 1: [Purpose and responsibility]
- Component 2: [Purpose and responsibility]

## Achieving Quality Goals

### Mapping: Quality Goals to Solution Approaches

| Quality Goal | Solution Approach |
|--------------|-------------------|
| [Performance] | [Caching strategy, async processing, CDN] |
| [Security] | [Authentication, authorization, encryption] |
| [Scalability] | [Horizontal scaling, load balancing] |

### Key Design Decisions

1. **Decision 1**: [e.g., Event-driven architecture]
   - Reason: [Why this approach]
   - Impact: [How it helps achieve quality goals]

2. **Decision 2**: [Description]
   - Reason: [Rationale]
   - Impact: [Effects on quality goals]

## Development Strategy

- Development approach: [Agile, Scrum, etc.]
- Deployment strategy: [CI/CD, Blue-Green, etc.]
- Testing strategy: [Unit, Integration, E2E]
`;
}

function getBuildingBlockViewTemplate(): string {
  return `# 5. Building Block View

**Purpose**: Static decomposition of the system into building blocks and their relationships.

## Level 1: System Context

### Whitebox: Overall System

**Purpose**: [What does the system do]

\`\`\`
[Component diagram showing main building blocks]
\`\`\`

**Contained Building Blocks**:

| Component | Responsibility |
|-----------|---------------|
| [Component 1] | [What it does] |
| [Component 2] | [What it does] |

**Important Interfaces**:

| Interface | Description |
|-----------|-------------|
| [API 1] | [Purpose and protocol] |

## Level 2: Component Details

### Component 1 (Whitebox)

**Purpose**: [Detailed purpose]

**Interfaces**:
- Input: [What it receives]
- Output: [What it produces]

**Internal Structure**:

\`\`\`
[Diagram of internal modules/classes]
\`\`\`

**Contained Elements**:

| Element | Responsibility |
|---------|---------------|
| [Module A] | [Purpose] |
| [Module B] | [Purpose] |

### Component 2 (Whitebox)

[Similar structure]

## Level 3: Detailed Views

<!-- Only include Level 3 for components that need additional detail -->

### Module A Details

[Detailed class diagrams, package structure, etc.]
`;
}

function getRuntimeViewTemplate(): string {
  return `# 6. Runtime View

**Purpose**: Show the behavior and interaction of building blocks at runtime.

## Key Scenarios

### Scenario 1: [Name, e.g., "User Login"]

**Description**: [What happens in this scenario]

**Sequence Diagram**:

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Database

    User->>Frontend: Enter credentials
    Frontend->>API: POST /login
    API->>Database: Validate credentials
    Database-->>API: User data
    API-->>Frontend: JWT token
    Frontend-->>User: Login successful
\`\`\`

**Steps**:

1. User enters credentials
2. Frontend sends login request
3. API validates with database
4. Token is generated and returned
5. User is authenticated

### Scenario 2: [Name]

[Similar structure]

## Data Flow

### Flow 1: [Name]

**Purpose**: [What data flows where]

**Diagram**:

\`\`\`
[Data flow diagram]
\`\`\`

**Description**:
- Step 1: [What happens]
- Step 2: [What happens]

## State Machines

### State Machine for [Entity]

**States**:
- State 1: [Description]
- State 2: [Description]

**Transitions**:

| From | Event | To | Action |
|------|-------|----|----|
| [State 1] | [Event] | [State 2] | [What happens] |
`;
}

function getDeploymentViewTemplate(): string {
  return `# 7. Deployment View

**Purpose**: Describe the technical infrastructure and how software is deployed.

## Infrastructure Overview

### Deployment Diagram

\`\`\`
[Diagram showing servers, containers, networks]
\`\`\`

## Environments

### Production Environment

**Infrastructure**:

| Component | Technology | Configuration |
|-----------|------------|---------------|
| [Application Server] | [AWS ECS] | [Specs] |
| [Database] | [RDS PostgreSQL] | [Specs] |
| [Cache] | [Redis] | [Specs] |

**Network**:
- VPC: [Configuration]
- Subnets: [Public/Private setup]
- Security Groups: [Rules]

### Staging Environment

[Similar structure]

### Development Environment

[Similar structure]

## Deployment Strategy

### CI/CD Pipeline

1. **Build**: [What happens]
2. **Test**: [Automated tests]
3. **Deploy**: [Deployment process]

### Rollback Strategy

[How to rollback deployments]

## Scaling Strategy

### Horizontal Scaling

| Component | Scaling Trigger | Max Instances |
|-----------|----------------|---------------|
| [API Servers] | [CPU > 70%] | [10] |

### Vertical Scaling

[When and how to scale vertically]

## Monitoring and Operations

### Health Checks

| Component | Check | Threshold |
|-----------|-------|-----------|
| [API] | [/health endpoint] | [Response time < 1s] |

### Logging

- Log aggregation: [ELK, CloudWatch, etc.]
- Log retention: [Policy]

### Metrics

- Key metrics: [CPU, Memory, Request rate]
- Alerting: [Alert conditions]
`;
}

function getConceptsTemplate(): string {
  return `# 8. Cross-cutting Concepts

**Purpose**: Overall regulations and solution ideas relevant across multiple parts of the system.

## Domain Models

### Core Domain Concepts

\`\`\`
[Domain model diagram or class diagram]
\`\`\`

**Key Entities**:

| Entity | Responsibility | Relationships |
|--------|---------------|---------------|
| [Entity 1] | [Purpose] | [Related entities] |

## Security

### Authentication

- Method: [JWT, OAuth2, etc.]
- Implementation: [How it works]

### Authorization

- Model: [RBAC, ABAC, etc.]
- Roles: [List of roles and permissions]

### Data Protection

- Encryption at rest: [How]
- Encryption in transit: [TLS version]
- Sensitive data handling: [Approach]

## Error Handling

### Error Categories

| Category | Handling Strategy |
|----------|-------------------|
| [Validation errors] | [Return 400 with details] |
| [System errors] | [Log and return 500] |

### Error Response Format

\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
\`\`\`

## Logging and Monitoring

### Logging Strategy

- Log levels: [DEBUG, INFO, WARN, ERROR]
- Structured logging: [JSON format]
- Correlation IDs: [For request tracing]

### Monitoring

- APM: [Application Performance Monitoring tool]
- Metrics: [Key business and technical metrics]

## Configuration Management

### Configuration Sources

1. Environment variables
2. Configuration files
3. Secret management: [Vault, AWS Secrets Manager]

### Configuration by Environment

| Setting | Dev | Staging | Prod |
|---------|-----|---------|------|
| [Log level] | [DEBUG] | [INFO] | [WARN] |

## Testing Strategy

### Test Levels

| Level | Coverage | Tools |
|-------|----------|-------|
| Unit Tests | [Target %] | [Framework] |
| Integration Tests | [Scope] | [Tools] |
| E2E Tests | [Key flows] | [Tools] |

### Test Data Management

[How test data is created and managed]

## Development Concepts

### Code Organization

- Package structure: [Approach]
- Naming conventions: [Standards]

### Build and Dependency Management

- Build tool: [Maven, Gradle, npm, etc.]
- Dependency management: [Strategy]

## Operational Concepts

### Backup and Recovery

- Backup frequency: [Daily, hourly, etc.]
- Retention: [Policy]
- Recovery procedure: [Steps]

### Disaster Recovery

- RTO: [Recovery Time Objective]
- RPO: [Recovery Point Objective]
- DR strategy: [Approach]
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `# 9. Architecture Decisions

**Purpose**: Document important, expensive, critical, or risky architecture decisions including rationale.

## ADR Format

Each decision follows this structure:
- **Context**: What is the issue we're trying to address?
- **Decision**: What we decided to do
- **Consequences**: What becomes easier or harder as a result

## Decision Log

### ADR-001: [Decision Title]

**Date**: [YYYY-MM-DD]
**Status**: [Proposed | Accepted | Deprecated | Superseded]
**Deciders**: [Names]

**Context**:

[Describe the forces at play, technical, political, social, and local to the project. These forces are probably in tension and should be called out as such.]

**Decision**:

[Describe our response to these forces. This is where we make our decision.]

**Consequences**:

Positive:
- [Benefit 1]
- [Benefit 2]

Negative:
- [Trade-off 1]
- [Trade-off 2]

Risks:
- [Risk 1 and mitigation]

### ADR-002: [Another Decision]

[Similar structure]

## Decision Categories

### Structural Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| [Microservices vs Monolith] | [Why chosen] | [Date] |

### Technology Decisions

| Component | Technology | Alternative Considered | Why Chosen |
|-----------|------------|----------------------|-----------|
| [Backend] | [Node.js] | [Python, Java] | [Reasons] |

### Process Decisions

| Decision | Impact | Date |
|----------|--------|------|
| [Agile methodology] | [How it affects architecture] | [Date] |

## Deprecated Decisions

| Decision | Date Deprecated | Reason | Superseded By |
|----------|----------------|--------|---------------|
| [Old decision] | [Date] | [Why deprecated] | [ADR-XXX] |
`;
}

function getQualityRequirementsTemplate(): string {
  return `# 10. Quality Requirements

**Purpose**: Define quality requirements with concrete scenarios.

## Quality Tree

### Top-level Quality Goals

\`\`\`
Quality
├── Performance
│   ├── Response Time
│   └── Throughput
├── Security
│   ├── Authentication
│   └── Data Protection
├── Reliability
│   ├── Availability
│   └── Fault Tolerance
└── Maintainability
    ├── Testability
    └── Modifiability
\`\`\`

## Quality Scenarios

### Performance Scenarios

**Scenario 1: Normal Load Response Time**

| Aspect | Description |
|--------|-------------|
| Scenario | User requests data under normal load |
| Source | End user |
| Stimulus | HTTP request to API |
| Environment | Normal operation, 100 concurrent users |
| Response | System returns data |
| Measure | 95th percentile response time < 200ms |

**Scenario 2: Peak Load Handling**

| Aspect | Description |
|--------|-------------|
| Scenario | System under peak load |
| Source | Multiple users |
| Stimulus | 1000 concurrent requests |
| Environment | Peak hours |
| Response | System handles all requests |
| Measure | No request fails, response time < 1s |

### Security Scenarios

**Scenario 3: Unauthorized Access Attempt**

| Aspect | Description |
|--------|-------------|
| Scenario | Unauthorized user tries to access protected resource |
| Source | External attacker |
| Stimulus | HTTP request without valid token |
| Environment | Normal operation |
| Response | System denies access |
| Measure | Returns 401, logs attempt, no data exposed |

### Reliability Scenarios

**Scenario 4: Service Failure Recovery**

| Aspect | Description |
|--------|-------------|
| Scenario | Database connection fails |
| Source | Infrastructure failure |
| Stimulus | Database becomes unavailable |
| Environment | Normal operation |
| Response | System continues with cached data |
| Measure | Service degradation < 5%, recovery < 30s |

### Maintainability Scenarios

**Scenario 5: Adding New Feature**

| Aspect | Description |
|--------|-------------|
| Scenario | Developer adds new API endpoint |
| Source | Development team |
| Stimulus | New requirement |
| Environment | Development |
| Response | Feature is added |
| Measure | < 2 days, < 5 files modified, tests pass |

## Quality Requirements Prioritization

| Quality Attribute | Priority | Target Measure |
|-------------------|----------|----------------|
| Availability | High | 99.9% uptime |
| Response Time | High | < 200ms (p95) |
| Security | Critical | Zero data breaches |
| Maintainability | Medium | Test coverage > 80% |
| Usability | Medium | User task success > 95% |
`;
}

function getTechnicalRisksTemplate(): string {
  return `# 11. Risks and Technical Debt

**Purpose**: Document known problems, risks, and technical debt.

## Risks

### Risk Assessment Matrix

| Risk | Probability | Impact | Severity | Status |
|------|------------|--------|----------|--------|
| [Risk 1] | [High/Med/Low] | [High/Med/Low] | [Critical/High/Med/Low] | [Open/Mitigated] |

### Detailed Risks

**Risk 1: [Risk Title]**

- **Description**: [What is the risk]
- **Probability**: [High/Medium/Low]
- **Impact**: [High/Medium/Low - and what happens]
- **Mitigation**: [What we're doing about it]
- **Contingency**: [Plan if risk materializes]
- **Owner**: [Who is responsible]
- **Status**: [Open/Mitigating/Closed]

**Risk 2: [Title]**

[Similar structure]

## Technical Debt

### Debt Items

| Item | Type | Impact | Effort | Priority |
|------|------|--------|--------|----------|
| [Debt 1] | [Code/Architecture/Testing] | [High/Med/Low] | [Days] | [1-5] |

### Detailed Debt Items

**Debt 1: [Title]**

- **Description**: [What needs to be fixed]
- **Why it exists**: [How did this happen]
- **Impact**: [What problems does it cause]
- **Proposed solution**: [How to fix it]
- **Effort estimate**: [Time needed]
- **Priority**: [When should we fix it]

### Debt Repayment Plan

| Quarter | Debt Items to Address | Expected Impact |
|---------|----------------------|-----------------|
| Q1 2024 | [Items 1, 2] | [Improvement in X] |

## Known Issues

### Open Issues

| Issue | Severity | Workaround | Target Fix Date |
|-------|----------|------------|-----------------|
| [Issue 1] | [High/Med/Low] | [If any] | [Date] |

### Limitations

| Limitation | Impact | Rationale | Future Plans |
|------------|--------|-----------|--------------|
| [Limit 1] | [Effect] | [Why it exists] | [When/if to address] |

## Security Vulnerabilities

### Known Vulnerabilities

| CVE | Component | Severity | Status | Mitigation |
|-----|-----------|----------|--------|------------|
| [CVE-ID] | [Library] | [Critical/High/Med] | [Open/Fixed] | [Actions taken] |

## Performance Issues

| Issue | Impact | Workaround | Solution Plan |
|-------|--------|------------|---------------|
| [Issue] | [Effect on users] | [Temporary fix] | [Permanent solution] |
`;
}

function getGlossaryTemplate(): string {
  return `# 12. Glossary

**Purpose**: Define important domain and technical terms to ensure consistent terminology.

## Domain Terms

| Term | Definition |
|------|------------|
| [Domain Term 1] | [Clear, concise definition] |
| [Domain Term 2] | [Definition] |

## Technical Terms

| Term | Definition | Synonyms |
|------|------------|----------|
| [Technical Term 1] | [Definition] | [Alternative names] |
| [Technical Term 2] | [Definition] | [Alternative names] |

## Abbreviations and Acronyms

| Abbreviation | Full Name | Context |
|--------------|-----------|---------|
| API | Application Programming Interface | [When/where used] |
| SLA | Service Level Agreement | [Context] |
| JWT | JSON Web Token | [Usage] |

## Business Concepts

| Concept | Description | Related Terms |
|---------|-------------|---------------|
| [Concept 1] | [Detailed explanation] | [Related concepts] |

## System-Specific Terms

| Term | Definition | Example |
|------|------------|---------|
| [System Term 1] | [What it means in this system] | [Usage example] |

## Deprecated Terms

| Old Term | Replaced By | Reason |
|----------|-------------|--------|
| [Old term] | [New term] | [Why changed] |

---

**Note**: Keep this glossary updated as new terms emerge. Link to this section from other parts of the documentation when using these terms.
`;
}

/**
 * Get the English workflow guide
 */
export function getWorkflowGuide(): string {
  return `# arc42 Architecture Documentation Workflow Guide

## Overview

This guide helps you document your software architecture using the arc42 template. The arc42 template is a practical, proven template for documentation of software and system architectures.

## Available Languages

This arc42 MCP Server supports multiple languages for documentation:

| Code | Language | Native Name |
|------|----------|-------------|
| EN | English | English |
| DE | German | Deutsch |
| CZ | Czech | Čeština |
| ES | Spanish | Español |
| FR | French | Français |
| IT | Italian | Italiano |
| NL | Dutch | Nederlands |
| PT | Portuguese | Português |
| RU | Russian | Русский |
| UKR | Ukrainian | Українська |
| ZH | Chinese | 中文 |

## Getting Started

### Step 1: Initialize Your Workspace

Use the \`arc42-init\` tool to create your documentation workspace:

\`\`\`
arc42-init(projectName: "My Project", language: "EN")
\`\`\`

You can specify a different language using the ISO language code.

### Step 2: Check Status

Use \`arc42-status\` to see the current state of your documentation:

\`\`\`
arc42-status()
\`\`\`

### Step 3: Generate Section Templates

Use \`generate-template\` to get detailed templates for each section:

\`\`\`
generate-template(section: "01_introduction_and_goals", language: "EN")
\`\`\`

## The 12 arc42 Sections

1. **Introduction and Goals** - Start here! Define what you're building and why.
2. **Architecture Constraints** - What are you NOT allowed to do?
3. **Context and Scope** - What's in and what's out?
4. **Solution Strategy** - High-level approach to solving the problem.
5. **Building Block View** - Static structure of your system.
6. **Runtime View** - Dynamic behavior and scenarios.
7. **Deployment View** - How is it deployed and operated?
8. **Cross-cutting Concepts** - Patterns used across the system.
9. **Architecture Decisions** - Important decisions and their rationale.
10. **Quality Requirements** - Concrete quality scenarios.
11. **Risks and Technical Debt** - What could go wrong?
12. **Glossary** - Define your terms.

## Best Practices

1. **Start with Section 1** - Understanding goals is fundamental
2. **Keep it concise** - arc42 is pragmatic, not bureaucratic
3. **Use diagrams** - A picture is worth a thousand words
4. **Document decisions** - Future you will thank present you
5. **Iterate** - Architecture documentation is never "done"

## Tools Available

- \`arc42-init\` - Initialize documentation workspace
- \`arc42-status\` - Check documentation status
- \`generate-template\` - Generate section templates
- \`update-section\` - Update section content
- \`get-section\` - Read section content
- \`arc42-workflow-guide\` - Show this guide

## Resources

- [arc42 Website](https://arc42.org/)
- [arc42 Documentation](https://docs.arc42.org/)
- [arc42 Examples](https://arc42.org/examples)
`;
}

/**
 * Get the English README content
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Project';
  return `# ${name} - Architecture Documentation

This directory contains the architecture documentation for ${name}, following the arc42 template.

## Structure

- \`sections/\` - Individual section markdown files (12 sections)
- \`images/\` - Diagrams and images
- \`arc42-template.md\` - Main combined documentation
- \`config.yaml\` - Configuration

## The 12 arc42 Sections

1. **Introduction and Goals** - Requirements, quality goals, stakeholders
2. **Architecture Constraints** - Technical and organizational constraints
3. **Context and Scope** - Business and technical context
4. **Solution Strategy** - Fundamental decisions and strategies
5. **Building Block View** - Static decomposition
6. **Runtime View** - Dynamic behavior
7. **Deployment View** - Infrastructure and deployment
8. **Cross-cutting Concepts** - Overall regulations and approaches
9. **Architecture Decisions** - Important decisions (ADRs)
10. **Quality Requirements** - Quality tree and scenarios
11. **Risks and Technical Debt** - Known problems and risks
12. **Glossary** - Important terms

## Getting Started

1. Start with Section 1: Introduction and Goals
2. Work through sections iteratively
3. Use diagrams to illustrate concepts
4. Keep it focused on decisions, not implementation details

## Generating Documentation

Use the MCP tools to:
- Check status: \`arc42-status\`
- Generate templates: \`generate-template\`
- Update sections: \`update-section\`

## Resources

- [arc42 Website](https://arc42.org/)
- [arc42 Documentation](https://docs.arc42.org/)
- [arc42 Examples](https://arc42.org/examples)
`;
}
