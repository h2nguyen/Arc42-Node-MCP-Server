# Arc42 Documentation Examples

Practical examples showing how to use the arc42 MCP tools in real scenarios.

---

## Example 1: Starting a New Project

**User:** "Help me create architecture documentation for my e-commerce platform"

**Steps:**

1. Load the workflow guide to understand the arc42 structure:
   ```
   arc42-workflow-guide { language: "EN", format: "asciidoc" }
   ```
2. Initialize the workspace:
   ```
   arc42-init { projectName: "E-Commerce Platform", language: "EN", format: "asciidoc" }
   ```
3. Generate the template for Section 1 to understand what's needed:
   ```
   generate-template { section: "01_introduction_and_goals" }
   ```
4. **Ask the user** about their quality goals, stakeholders, and key requirements — do not assume
5. Write the content:
   ```
   update-section { section: "01_introduction_and_goals", content: "..." }
   ```
6. Verify progress:
   ```
   arc42-status {}
   ```
7. Continue with the recommended order: Section 3 (Context), Section 4 (Strategy), etc.

---

## Example 2: Documenting a Deployment View

**User:** "Document our deployment architecture — we use AWS with ECS and RDS"

**Steps:**

1. Generate the template to see the expected structure:
   ```
   generate-template { section: "07_deployment_view" }
   ```
2. Ask the user clarifying questions (e.g., environments, scaling strategy, networking)
3. Create content with infrastructure details and a Mermaid deployment diagram:

   **AsciiDoc content:**
   ```asciidoc
   == Deployment View

   === Infrastructure Level 1

   The system is deployed on AWS using containerized services.

   [plantuml]
   ----
   node "AWS Cloud" {
     node "VPC" {
       node "ECS Cluster" {
         artifact "API Service" as api
         artifact "Worker Service" as worker
       }
       database "RDS PostgreSQL" as db
       node "ElastiCache" as cache
     }
     node "CloudFront" as cdn
     artifact "S3 Static Assets" as s3
   }

   cdn --> s3
   cdn --> api
   api --> db
   api --> cache
   worker --> db
   ----

   === Environments

   [cols="1,2,2"]
   |===
   | Environment | Purpose | Scaling

   | Development | Feature testing | 1 ECS task, db.t3.micro
   | Staging | Pre-production validation | 2 ECS tasks, db.t3.small
   | Production | Live traffic | Auto-scaling 2–10 tasks, db.r5.large Multi-AZ
   |===
   ```

4. Write the content:
   ```
   update-section { section: "07_deployment_view", content: "..." }
   ```

---

## Example 3: Adding Architecture Decision Records

**User:** "Document why we chose PostgreSQL over MongoDB"

**Steps:**

1. Read existing ADRs to determine the next ADR number:
   ```
   get-section { section: "09_architecture_decisions" }
   ```
2. Create the ADR content — **always use `mode: "append"`** to preserve existing ADRs

3. Write using append mode:
   ```
   update-section {
     section: "09_architecture_decisions",
     content: "...",
     mode: "append"
   }
   ```

**AsciiDoc ADR format:**
```asciidoc
=== ADR-001: Use PostgreSQL as Primary Database

*Status:* Accepted

*Date:* 2025-01-15

*Context:*
We need a database for our e-commerce platform that handles complex queries,
transactions, and relational data. Our domain model has strong relationships
between entities (orders, products, customers, inventory).

*Decision:*
Use PostgreSQL as the primary database instead of MongoDB.

*Consequences:*

Positive::
* Strong ACID compliance for financial transactions
* Rich query capabilities with JOINs for complex reporting
* Mature ecosystem with excellent tooling (pgAdmin, pg_dump)
* PostGIS extension available for future geolocation features

Negative::
* Less flexible schema evolution compared to MongoDB
* Horizontal scaling requires more effort (read replicas, partitioning)
* Team needs to maintain migration scripts
```

**Markdown ADR format:**
```markdown
### ADR-001: Use PostgreSQL as Primary Database

**Status:** Accepted

**Date:** 2025-01-15

**Context:**
We need a database for our e-commerce platform that handles complex queries,
transactions, and relational data. Our domain model has strong relationships
between entities (orders, products, customers, inventory).

**Decision:**
Use PostgreSQL as the primary database instead of MongoDB.

**Consequences:**
- (+) Strong ACID compliance for financial transactions
- (+) Rich query capabilities with JOINs for complex reporting
- (+) Mature ecosystem with excellent tooling (pgAdmin, pg_dump)
- (+) PostGIS extension available for future geolocation features
- (-) Less flexible schema evolution compared to MongoDB
- (-) Horizontal scaling requires more effort (read replicas, partitioning)
- (-) Team needs to maintain migration scripts
```

---

## Example 4: Documenting Cross-cutting Concepts

**User:** "Document our security and error handling approach"

**Steps:**

1. Generate the template for guidance:
   ```
   generate-template { section: "08_concepts" }
   ```
2. Ask the user about their specific security mechanisms and error handling strategy
3. Write structured content covering the relevant cross-cutting concerns:
   ```
   update-section { section: "08_concepts", content: "..." }
   ```

**Typical subsections for Section 8:**
- Security (authentication, authorization, input validation, encryption)
- Error handling (error codes, retry strategies, circuit breakers)
- Persistence (ORM strategy, caching, data migration)
- Logging and monitoring (log levels, structured logging, observability)
- Internationalization (i18n approach)
- Testability (testing strategy, test data management)

---

## Example 5: Multi-Language Documentation

**User:** "Create architecture docs in German"

**Steps:**

1. Initialize with German language:
   ```
   arc42-init { projectName: "Mein Projekt", language: "DE", format: "asciidoc" }
   ```
2. Generate templates in German:
   ```
   generate-template { section: "01_introduction_and_goals", language: "DE" }
   ```
3. The section files, titles, and template guidance will all be in German
4. Continue writing content in German — the language is stored in `config.yaml`

---

## Example 6: Reviewing and Updating Existing Documentation

**User:** "What's the current state of our architecture docs?"

**Steps:**

1. Check overall status:
   ```
   arc42-status {}
   ```
   This returns per-section completeness (0–100%), word counts, last modified dates, and overall progress.

2. Read specific sections the user wants to review:
   ```
   get-section { section: "01_introduction_and_goals" }
   ```

3. Based on the status, suggest which sections need attention:
   - Sections with 0% completeness → need initial content
   - Sections with low word counts → may need expansion
   - Sections not modified recently → may be outdated

4. Generate templates for incomplete sections and help the user fill them in.

---

## Example 7: Re-initializing an Existing Workspace

**User:** "I want to start over with Markdown instead of AsciiDoc"

**Steps:**

1. Re-initialize with the `force` flag:
   ```
   arc42-init {
     projectName: "My Project",
     format: "markdown",
     force: true
   }
   ```

**Note:** This overwrites all existing section files. Warn the user that existing content will be lost. If they want to preserve content, suggest backing up the `arc42-docs/` directory first.

---

## Example 8: Working with Multiple Projects

**User:** "I need to document both the frontend and backend separately"

**Steps:**

1. Initialize the backend documentation:
   ```
   arc42-init {
     projectName: "Backend API",
     targetFolder: "/path/to/backend"
   }
   ```

2. Initialize the frontend documentation:
   ```
   arc42-init {
     projectName: "Frontend SPA",
     targetFolder: "/path/to/frontend"
   }
   ```

3. Use `targetFolder` on all subsequent tool calls to work with the correct project:
   ```
   arc42-status { targetFolder: "/path/to/backend" }
   update-section { section: "01_introduction_and_goals", content: "...", targetFolder: "/path/to/backend" }
   ```
