/**
 * English Templates - AsciiDoc Format
 *
 * Contains all arc42 section templates in English using AsciiDoc syntax.
 * Based on the official arc42 templates from vendor/arc42-template.
 *
 * @module templates/locales/en/templates-asciidoc
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the English AsciiDoc template for a specific section
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
  return `= 1. Introduction and Goals

== Requirements Overview

*Purpose*: Describe the relevant requirements and driving forces that architects and development teams must consider.

=== Key Requirements

// List the top 3-5 functional requirements

[options="header",cols="1,3,1"]
|===
|ID |Requirement |Priority
|REQ-1 |[Brief description] |High
|REQ-2 |[Brief description] |Medium
|===

=== Features

// Essential features of the system

* Feature 1: [Description]
* Feature 2: [Description]

== Quality Goals

*Purpose*: Define the top 3-5 quality goals that are most important for stakeholders.

// Based on ISO 25010, prioritize qualities like:
// Performance, Security, Reliability, Maintainability, Usability, etc.

[options="header",cols="1,2,3"]
|===
|Priority |Quality Goal |Motivation
|1 |[e.g., Performance] |[Why this is critical]
|2 |[e.g., Security] |[Why this is critical]
|3 |[e.g., Maintainability] |[Why this is critical]
|===

== Stakeholders

*Purpose*: Identify everyone who should know about the architecture.

[options="header",cols="2,2,3"]
|===
|Role/Name |Contact |Expectations
|Product Owner |[Name/Email] |[What they expect from the architecture]
|Development Team |[Team name] |[What they need to know]
|Operations |[Team/Person] |[Deployment and operations concerns]
|End Users |[Type] |[User experience expectations]
|===

.Further Information
See link:https://docs.arc42.org/section-1/[Introduction and Goals] in the arc42 documentation.
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `= 2. Architecture Constraints

*Purpose*: Document any requirements that constrain architects in their freedom of design and implementation decisions.

== Technical Constraints

[options="header",cols="1,3"]
|===
|Constraint |Explanation
|[e.g., Must run on Linux] |[Why this constraint exists]
|[e.g., Java 17 minimum] |[Organizational requirement]
|===

== Organizational Constraints

[options="header",cols="1,3"]
|===
|Constraint |Explanation
|[e.g., Team size: 5 developers] |[Impact on architecture]
|[e.g., Timeline: 6 months] |[Delivery constraints]
|===

== Conventions

[options="header",cols="1,3"]
|===
|Convention |Explanation
|[e.g., Code style: Google Java Style] |[Link to style guide]
|[e.g., Documentation: arc42] |[Documentation requirements]
|===

.Further Information
See link:https://docs.arc42.org/section-2/[Architecture Constraints] in the arc42 documentation.
`;
}

function getContextAndScopeTemplate(): string {
  return `= 3. Context and Scope

*Purpose*: Delimits your system from its communication partners (neighboring systems and users).

== Business Context

*Purpose*: Specify all communication partners (users, IT-systems, ...) with explanations of domain specific inputs and outputs.

// Add a context diagram here (PlantUML, Mermaid, or image)

[plantuml, business-context, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(user, "User", "System user")
System(system, "Your System", "Description")
System_Ext(external, "External System", "Description")

Rel(user, system, "Uses")
Rel(system, external, "Calls")
@enduml
----

[options="header",cols="1,2,2"]
|===
|Partner |Input |Output
|[User/System name] |[What they send] |[What they receive]
|===

== Technical Context

*Purpose*: Specify the technical channels and protocols between the system and its context.

// Technical infrastructure with protocols

[options="header",cols="1,1,2"]
|===
|Partner |Channel |Protocol
|[System name] |[e.g., REST API] |[e.g., HTTPS, JSON]
|[System name] |[e.g., Message Queue] |[e.g., AMQP]
|===

.Further Information
See link:https://docs.arc42.org/section-3/[Context and Scope] in the arc42 documentation.
`;
}

function getSolutionStrategyTemplate(): string {
  return `= 4. Solution Strategy

*Purpose*: Summary of the fundamental decisions and solution strategies that shape the architecture.

== Technology Decisions

[options="header",cols="1,2,2"]
|===
|Decision |Choice |Rationale
|Programming Language |[e.g., TypeScript] |[Why this choice]
|Framework |[e.g., NestJS] |[Why this choice]
|Database |[e.g., PostgreSQL] |[Why this choice]
|===

== Top-level Decomposition

Describe the high-level structure:

* [e.g., Layered architecture]
* [e.g., Microservices]
* [e.g., Event-driven]

== Quality Achievement Strategies

[options="header",cols="1,2"]
|===
|Quality Goal |Achievement Strategy
|[Performance] |[e.g., Caching, async processing]
|[Security] |[e.g., OAuth2, encryption at rest]
|[Maintainability] |[e.g., Clean architecture, comprehensive tests]
|===

.Further Information
See link:https://docs.arc42.org/section-4/[Solution Strategy] in the arc42 documentation.
`;
}

function getBuildingBlockViewTemplate(): string {
  return `= 5. Building Block View

*Purpose*: Static decomposition of the system into building blocks with their dependencies.

== Level 1: Overall System

*Purpose*: The white-box description shows the internal structure of the overall system.

=== White Box Description

// Add a component diagram here

[plantuml, building-blocks-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Container(web, "Web Application", "React", "User interface")
Container(api, "API Server", "Node.js", "Business logic")
ContainerDb(db, "Database", "PostgreSQL", "Data storage")

Rel(web, api, "Calls", "REST/JSON")
Rel(api, db, "Reads/Writes", "SQL")
@enduml
----

=== Contained Building Blocks

[options="header",cols="1,3"]
|===
|Building Block |Description
|[Component A] |[Responsibility and purpose]
|[Component B] |[Responsibility and purpose]
|===

== Level 2: [Subsystem Name]

*Purpose*: Decompose the main components into smaller building blocks.

=== White Box [Component A]

// Describe internal structure of Component A

[options="header",cols="1,3"]
|===
|Building Block |Description
|[Sub-component A.1] |[Responsibility]
|[Sub-component A.2] |[Responsibility]
|===

.Further Information
See link:https://docs.arc42.org/section-5/[Building Block View] in the arc42 documentation.
`;
}

function getRuntimeViewTemplate(): string {
  return `= 6. Runtime View

*Purpose*: Document behavior and interaction of building blocks during runtime.

== Scenario 1: [e.g., User Login]

// Describe the runtime behavior for a key scenario

[plantuml, runtime-login, svg]
----
@startuml
actor User
participant "Web App" as Web
participant "API Server" as API
participant "Auth Service" as Auth
database "User DB" as DB

User -> Web: Enter credentials
Web -> API: POST /auth/login
API -> Auth: Validate credentials
Auth -> DB: Query user
DB --> Auth: User data
Auth --> API: JWT token
API --> Web: Success + token
Web --> User: Dashboard
@enduml
----

=== Description

. User enters credentials in the web application
. Web app sends login request to API server
. API validates credentials against auth service
. On success, JWT token is returned

== Scenario 2: [e.g., Data Processing]

// Document another important runtime scenario

=== Description

[Describe the steps and interactions]

.Further Information
See link:https://docs.arc42.org/section-6/[Runtime View] in the arc42 documentation.
`;
}

function getDeploymentViewTemplate(): string {
  return `= 7. Deployment View

*Purpose*: Technical infrastructure with environments, computers, processors, topologies.

== Infrastructure Level 1

*Purpose*: Overview of the deployment infrastructure.

[plantuml, deployment-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

Deployment_Node(cloud, "Cloud Provider", "AWS/Azure/GCP") {
    Deployment_Node(web_tier, "Web Tier") {
        Container(web, "Web Server", "nginx", "Static files + reverse proxy")
    }
    Deployment_Node(app_tier, "Application Tier") {
        Container(api, "API Server", "Node.js", "Business logic")
    }
    Deployment_Node(data_tier, "Data Tier") {
        ContainerDb(db, "Database", "PostgreSQL", "Primary storage")
    }
}
@enduml
----

=== Motivation

[Why this deployment architecture was chosen]

=== Quality and Performance Features

[How this deployment supports quality goals]

== Infrastructure Level 2

*Purpose*: Detailed view of specific deployment nodes.

=== [Node Name]

[options="header",cols="1,3"]
|===
|Aspect |Description
|Hardware |[e.g., 4 vCPU, 16GB RAM]
|Software |[e.g., Ubuntu 22.04, Docker 24.x]
|Network |[e.g., VPC, security groups]
|===

.Further Information
See link:https://docs.arc42.org/section-7/[Deployment View] in the arc42 documentation.
`;
}

function getConceptsTemplate(): string {
  return `= 8. Cross-cutting Concepts

*Purpose*: Overall regulations and solution ideas relevant across multiple building blocks.

== Domain Model

// Core domain concepts and their relationships

[plantuml, domain-model, svg]
----
@startuml
class User {
  +id: UUID
  +email: String
  +name: String
}
class Order {
  +id: UUID
  +status: OrderStatus
  +createdAt: DateTime
}
User "1" -- "*" Order : places
@enduml
----

== Security Concept

=== Authentication

[Describe authentication approach: JWT, OAuth2, etc.]

=== Authorization

[Describe authorization approach: RBAC, ABAC, etc.]

== Error Handling

[Describe how errors are handled across the system]

* [e.g., Global error handler]
* [e.g., Structured error responses]
* [e.g., Error logging strategy]

== Logging and Monitoring

[options="header",cols="1,2"]
|===
|Aspect |Approach
|Logging |[e.g., Structured JSON logs, ELK stack]
|Metrics |[e.g., Prometheus, Grafana]
|Tracing |[e.g., OpenTelemetry, Jaeger]
|===

== Testing Strategy

[options="header",cols="1,2,1"]
|===
|Type |Scope |Coverage Target
|Unit Tests |Individual functions/classes |80%
|Integration Tests |Component interactions |Key paths
|E2E Tests |Full user journeys |Critical flows
|===

.Further Information
See link:https://docs.arc42.org/section-8/[Cross-cutting Concepts] in the arc42 documentation.
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `= 9. Architecture Decisions

*Purpose*: Document important, expensive, large-scale, or risky architecture decisions.

== ADR-001: [Decision Title]

=== Status

[Proposed | Accepted | Deprecated | Superseded]

=== Context

[Describe the issue motivating this decision]

=== Decision

[Describe the decision that was made]

=== Consequences

*Positive:*

* [Benefit 1]
* [Benefit 2]

*Negative:*

* [Drawback 1]
* [Drawback 2]

=== Alternatives Considered

[options="header",cols="1,2,2"]
|===
|Alternative |Pros |Cons
|[Option A] |[Benefits] |[Drawbacks]
|[Option B] |[Benefits] |[Drawbacks]
|===

'''

== ADR-002: [Decision Title]

// Use the same template for additional decisions

.Further Information
See link:https://docs.arc42.org/section-9/[Architecture Decisions] in the arc42 documentation.
`;
}

function getQualityRequirementsTemplate(): string {
  return `= 10. Quality Requirements

*Purpose*: Concrete quality requirements with scenarios for evaluation.

== Quality Tree

// Visual representation of quality goals and their refinements

[plantuml, quality-tree, svg]
----
@startmindmap
* Quality
** Performance
*** Response Time
*** Throughput
** Security
*** Authentication
*** Authorization
** Maintainability
*** Modularity
*** Testability
@endmindmap
----

== Quality Scenarios

=== Performance Scenarios

[options="header",cols="1,2,1,1"]
|===
|ID |Scenario |Expected Response |Priority
|PERF-1 |User requests dashboard under normal load |< 200ms |High
|PERF-2 |System handles 1000 concurrent users |No degradation |Medium
|===

=== Security Scenarios

[options="header",cols="1,2,1,1"]
|===
|ID |Scenario |Expected Behavior |Priority
|SEC-1 |Invalid login attempt |Account lockout after 5 attempts |High
|SEC-2 |Unauthorized API access |401 response, audit logged |High
|===

=== Maintainability Scenarios

[options="header",cols="1,2,1,1"]
|===
|ID |Scenario |Expected Effort |Priority
|MAINT-1 |Add new entity type |< 2 days development |Medium
|MAINT-2 |Update dependency version |< 4 hours including tests |Medium
|===

.Further Information
See link:https://docs.arc42.org/section-10/[Quality Requirements] in the arc42 documentation.
`;
}

function getTechnicalRisksTemplate(): string {
  return `= 11. Technical Risks and Technical Debt

*Purpose*: Identify and track known technical risks and accumulated technical debt.

== Technical Risks

[options="header",cols="1,2,1,2"]
|===
|Risk |Description |Probability |Mitigation
|[e.g., Third-party API failure] |[External service we depend on] |Medium |[Circuit breaker, fallback]
|[e.g., Data loss] |[Database corruption] |Low |[Backups, replication]
|===

== Technical Debt

[options="header",cols="1,2,1,1"]
|===
|Item |Description |Impact |Priority
|[e.g., Legacy authentication] |[Old auth system needs replacement] |High |Medium
|[e.g., Missing tests] |[Coverage below target in module X] |Medium |Low
|===

== Risk Monitoring

[Describe how risks are monitored and reviewed]

* [e.g., Weekly risk review meetings]
* [e.g., Automated monitoring alerts]

.Further Information
See link:https://docs.arc42.org/section-11/[Risks and Technical Debt] in the arc42 documentation.
`;
}

function getGlossaryTemplate(): string {
  return `= 12. Glossary

*Purpose*: Define important domain and technical terms used in the architecture documentation.

== Domain Terms

[options="header",cols="1,3"]
|===
|Term |Definition
|[Domain Term 1] |[Clear, concise definition]
|[Domain Term 2] |[Clear, concise definition]
|===

== Technical Terms

[options="header",cols="1,3"]
|===
|Term |Definition
|[Technical Term 1] |[Clear, concise definition]
|[Technical Term 2] |[Clear, concise definition]
|===

== Abbreviations

[options="header",cols="1,3"]
|===
|Abbreviation |Meaning
|API |Application Programming Interface
|JWT |JSON Web Token
|REST |Representational State Transfer
|===

.Further Information
See link:https://docs.arc42.org/section-12/[Glossary] in the arc42 documentation.
`;
}

/**
 * Get the English workflow guide in AsciiDoc format
 */
export function getWorkflowGuide(): string {
  return `= arc42 Architecture Documentation Workflow Guide

== Overview

This guide helps you document your software architecture using the arc42 template. The arc42 template is a practical, proven template for documentation of software and system architectures.

== Available Languages

This arc42 MCP Server supports multiple languages for documentation:

[options="header",cols="1,2,2"]
|===
|Code |Language |Native Name
|EN |English |English
|DE |German |Deutsch
|CZ |Czech |Čeština
|ES |Spanish |Español
|FR |French |Français
|IT |Italian |Italiano
|NL |Dutch |Nederlands
|PT |Portuguese |Português
|RU |Russian |Русский
|UKR |Ukrainian |Українська
|ZH |Chinese |中文
|===

== Getting Started

=== Step 1: Initialize Your Workspace

Use the \`arc42-init\` tool to create your documentation workspace:

[source]
----
arc42-init(projectName: "My Project", language: "EN")
----

You can specify a different language using the ISO language code.

=== Step 2: Check Status

Use \`arc42-status\` to see the current state of your documentation:

[source]
----
arc42-status()
----

=== Step 3: Generate Section Templates

Use \`generate-template\` to get detailed templates for each section:

[source]
----
generate-template(section: "01_introduction_and_goals", language: "EN")
----

== The 12 arc42 Sections

. *Introduction and Goals* - Start here! Define what you're building and why.
. *Architecture Constraints* - What are you NOT allowed to do?
. *Context and Scope* - What's in and what's out?
. *Solution Strategy* - High-level approach to solving the problem.
. *Building Block View* - Static structure of your system.
. *Runtime View* - Dynamic behavior and scenarios.
. *Deployment View* - How is it deployed and operated?
. *Cross-cutting Concepts* - Patterns used across the system.
. *Architecture Decisions* - Important decisions and their rationale.
. *Quality Requirements* - Concrete quality scenarios.
. *Risks and Technical Debt* - What could go wrong?
. *Glossary* - Define your terms.

== Best Practices

. *Start with Section 1* - Understanding goals is fundamental
. *Keep it concise* - arc42 is pragmatic, not bureaucratic
. *Use diagrams* - A picture is worth a thousand words
. *Document decisions* - Future you will thank present you
. *Iterate* - Architecture documentation is never "done"

== Tools Available

* \`arc42-init\` - Initialize documentation workspace
* \`arc42-status\` - Check documentation status
* \`generate-template\` - Generate section templates
* \`update-section\` - Update section content
* \`get-section\` - Read section content
* \`arc42-workflow-guide\` - Show this guide

== Resources

* link:https://arc42.org/[arc42 Website]
* link:https://docs.arc42.org/[arc42 Documentation]
* link:https://arc42.org/examples[arc42 Examples]
`;
}

/**
 * Get the English README content in AsciiDoc format
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Project';
  return `= ${name} - Architecture Documentation

This directory contains the architecture documentation for ${name}, following the arc42 template.

== Structure

* \`sections/\` - Individual section AsciiDoc files (12 sections)
* \`images/\` - Diagrams and images
* \`arc42-documentation.adoc\` - Main combined documentation
* \`config.yaml\` - Configuration

== The 12 arc42 Sections

. *Introduction and Goals* - Requirements, quality goals, stakeholders
. *Architecture Constraints* - Technical and organizational constraints
. *Context and Scope* - Business and technical context
. *Solution Strategy* - Fundamental decisions and strategies
. *Building Block View* - Static decomposition
. *Runtime View* - Dynamic behavior
. *Deployment View* - Infrastructure and deployment
. *Cross-cutting Concepts* - Overall regulations and approaches
. *Architecture Decisions* - Important decisions (ADRs)
. *Quality Requirements* - Quality tree and scenarios
. *Risks and Technical Debt* - Known problems and risks
. *Glossary* - Important terms

== Getting Started

. Start with Section 1: Introduction and Goals
. Work through sections iteratively
. Use diagrams to illustrate concepts
. Keep it focused on decisions, not implementation details

== Generating Documentation

Use the MCP tools to:

* Check status: \`arc42-status\`
* Generate templates: \`generate-template\`
* Update sections: \`update-section\`

== Resources

* link:https://arc42.org/[arc42 Website]
* link:https://docs.arc42.org/[arc42 Documentation]
* link:https://arc42.org/examples[arc42 Examples]
`;
}
