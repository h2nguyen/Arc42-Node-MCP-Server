/**
 * Dutch Templates - AsciiDoc Format
 *
 * Contains all arc42 section templates in Dutch using AsciiDoc syntax.
 * Based on the official arc42 templates from vendor/arc42-template.
 *
 * @module templates/locales/nl/templates-asciidoc
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Dutch AsciiDoc template for a specific section
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
  return `= 1. Introductie en Doelen

== Requirements Overzicht

*Doel*: Beschrijft de relevante requirements en het krachtenveld waar software architecten en het development team rekening mee moeten houden.

=== Belangrijke Requirements

// Lijst de top 3-5 functionele requirements

[options="header",cols="1,3,1"]
|===
|ID |Requirement |Prioriteit
|REQ-1 |[Korte beschrijving] |Hoog
|REQ-2 |[Korte beschrijving] |Gemiddeld
|===

=== Features

// Essentiele features van het systeem

* Feature 1: [Beschrijving]
* Feature 2: [Beschrijving]

== Kwaliteits Doelen

*Doel*: Definieer de top 3-5 kwaliteits doelen die het meest van belang zijn voor belanghebbenden.

// Gebaseerd op ISO 25010, prioriteer kwaliteiten zoals:
// Performance, Security, Betrouwbaarheid, Onderhoudbaarheid, Bruikbaarheid, etc.

[options="header",cols="1,2,3"]
|===
|Prioriteit |Kwaliteits Doel |Motivatie
|1 |[bijv. Performance] |[Waarom dit kritiek is]
|2 |[bijv. Security] |[Waarom dit kritiek is]
|3 |[bijv. Onderhoudbaarheid] |[Waarom dit kritiek is]
|===

== Belanghebbenden

*Doel*: Identificeer alle personen die van de architectuur op de hoogte moeten zijn.

[options="header",cols="2,2,3"]
|===
|Rol/Naam |Contact persoon |Verwachtingen
|Product Owner |[Naam/Email] |[Wat verwachten zij van de architectuur]
|Development Team |[Team naam] |[Wat moeten zij weten]
|Operations |[Team/Persoon] |[Deployment en operations zorgen]
|Eindgebruikers |[Type] |[Verwachtingen gebruikerservaring]
|===

.Verdere Informatie
Zie link:https://docs.arc42.org/section-1/[Introductie en Doelen] in de arc42 documentatie.
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `= 2. Architectuur Beperkingen

*Doel*: Documenteer requirements die de architecten beperken in hun vrijheid met betrekking tot ontwerp en implementatie beslissingen.

== Technische Beperkingen

[options="header",cols="1,3"]
|===
|Beperking |Uitleg
|[bijv. Moet draaien op Linux] |[Waarom deze beperking bestaat]
|[bijv. Java 17 minimum] |[Organisatorische requirement]
|===

== Organisatorische Beperkingen

[options="header",cols="1,3"]
|===
|Beperking |Uitleg
|[bijv. Team grootte: 5 ontwikkelaars] |[Impact op architectuur]
|[bijv. Tijdlijn: 6 maanden] |[Oplever beperkingen]
|===

== Conventies

[options="header",cols="1,3"]
|===
|Conventie |Uitleg
|[bijv. Code stijl: Google Java Style] |[Link naar stijlgids]
|[bijv. Documentatie: arc42] |[Documentatie requirements]
|===

.Verdere Informatie
Zie link:https://docs.arc42.org/section-2/[Architectuur Beperkingen] in de arc42 documentatie.
`;
}

function getContextAndScopeTemplate(): string {
  return `= 3. Context en Systeem Scope

*Doel*: Maakt onderscheid tussen het eigen systeem en alle communicatie partners (buur systemen en gebruikers).

== Business Context

*Doel*: Specificeer alle communicatie partners (gebruikers, IT-systemen, ...) met uitleg van domein specifieke inputs en outputs.

// Voeg hier een context diagram toe (PlantUML, Mermaid, of afbeelding)

[plantuml, business-context, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(user, "Gebruiker", "Systeem gebruiker")
System(system, "Jouw Systeem", "Beschrijving")
System_Ext(external, "Extern Systeem", "Beschrijving")

Rel(user, system, "Gebruikt")
Rel(system, external, "Roept aan")
@enduml
----

[options="header",cols="1,2,2"]
|===
|Partner |Input |Output
|[Gebruiker/Systeem naam] |[Wat zij versturen] |[Wat zij ontvangen]
|===

== Technische Context

*Doel*: Specificeer de technische kanalen en protocollen tussen het systeem en haar context.

// Technische infrastructuur met protocollen

[options="header",cols="1,1,2"]
|===
|Partner |Kanaal |Protocol
|[Systeem naam] |[bijv. REST API] |[bijv. HTTPS, JSON]
|[Systeem naam] |[bijv. Message Queue] |[bijv. AMQP]
|===

.Verdere Informatie
Zie link:https://docs.arc42.org/section-3/[Context en Scope] in de arc42 documentatie.
`;
}

function getSolutionStrategyTemplate(): string {
  return `= 4. Oplossing Strategie

*Doel*: Samenvatting van de fundamentele beslissingen en oplossings strategieen die de architectuur vormen.

== Technologie Beslissingen

[options="header",cols="1,2,2"]
|===
|Beslissing |Keuze |Motivatie
|Programmeertaal |[bijv. TypeScript] |[Waarom deze keuze]
|Framework |[bijv. NestJS] |[Waarom deze keuze]
|Database |[bijv. PostgreSQL] |[Waarom deze keuze]
|===

== Top-level Decompositie

Beschrijf de structuur op hoog niveau:

* [bijv. Gelaagde architectuur]
* [bijv. Microservices]
* [bijv. Event-driven]

== Kwaliteits Doelen Strategieen

[options="header",cols="1,2"]
|===
|Kwaliteits Doel |Behaal Strategie
|[Performance] |[bijv. Caching, asynchrone verwerking]
|[Security] |[bijv. OAuth2, encryptie at rest]
|[Onderhoudbaarheid] |[bijv. Clean architecture, uitgebreide tests]
|===

.Verdere Informatie
Zie link:https://docs.arc42.org/section-4/[Oplossing Strategie] in de arc42 documentatie.
`;
}

function getBuildingBlockViewTemplate(): string {
  return `= 5. Bouwstenen View

*Doel*: Statische decompositie van het systeem in bouwstenen met hun onderlinge afhankelijkheden.

== Niveau 1: Gehele Systeem

*Doel*: De white-box beschrijving toont de interne structuur van het gehele systeem.

=== White Box Beschrijving

// Voeg hier een component diagram toe

[plantuml, building-blocks-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Container(web, "Web Applicatie", "React", "Gebruikersinterface")
Container(api, "API Server", "Node.js", "Business logica")
ContainerDb(db, "Database", "PostgreSQL", "Data opslag")

Rel(web, api, "Roept aan", "REST/JSON")
Rel(api, db, "Leest/Schrijft", "SQL")
@enduml
----

=== Ingesloten Bouwstenen

[options="header",cols="1,3"]
|===
|Bouwsteen |Beschrijving
|[Component A] |[Verantwoordelijkheid en doel]
|[Component B] |[Verantwoordelijkheid en doel]
|===

== Niveau 2: [Subsysteem Naam]

*Doel*: Decomposeer de hoofd componenten in kleinere bouwstenen.

=== White Box [Component A]

// Beschrijf de interne structuur van Component A

[options="header",cols="1,3"]
|===
|Bouwsteen |Beschrijving
|[Sub-component A.1] |[Verantwoordelijkheid]
|[Sub-component A.2] |[Verantwoordelijkheid]
|===

.Verdere Informatie
Zie link:https://docs.arc42.org/section-5/[Bouwstenen View] in de arc42 documentatie.
`;
}

function getRuntimeViewTemplate(): string {
  return `= 6. Runtime View

*Doel*: Documenteer gedrag en interacties tussen bouwstenen tijdens runtime.

== Scenario 1: [bijv. Gebruiker Login]

// Beschrijf het runtime gedrag voor een belangrijk scenario

[plantuml, runtime-login, svg]
----
@startuml
actor Gebruiker
participant "Web App" as Web
participant "API Server" as API
participant "Auth Service" as Auth
database "Gebruiker DB" as DB

Gebruiker -> Web: Voer gegevens in
Web -> API: POST /auth/login
API -> Auth: Valideer gegevens
Auth -> DB: Query gebruiker
DB --> Auth: Gebruiker data
Auth --> API: JWT token
API --> Web: Succes + token
Web --> Gebruiker: Dashboard
@enduml
----

=== Beschrijving

. Gebruiker voert gegevens in via de web applicatie
. Web app stuurt login verzoek naar API server
. API valideert gegevens tegen auth service
. Bij succes wordt JWT token teruggegeven

== Scenario 2: [bijv. Data Verwerking]

// Documenteer een ander belangrijk runtime scenario

=== Beschrijving

[Beschrijf de stappen en interacties]

.Verdere Informatie
Zie link:https://docs.arc42.org/section-6/[Runtime View] in de arc42 documentatie.
`;
}

function getDeploymentViewTemplate(): string {
  return `= 7. Deployment View

*Doel*: Technische infrastructuur met omgevingen, computers, processors, topologieen.

== Infrastructuur Niveau 1

*Doel*: Overzicht van de deployment infrastructuur.

[plantuml, deployment-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

Deployment_Node(cloud, "Cloud Provider", "AWS/Azure/GCP") {
    Deployment_Node(web_tier, "Web Laag") {
        Container(web, "Web Server", "nginx", "Statische bestanden + reverse proxy")
    }
    Deployment_Node(app_tier, "Applicatie Laag") {
        Container(api, "API Server", "Node.js", "Business logica")
    }
    Deployment_Node(data_tier, "Data Laag") {
        ContainerDb(db, "Database", "PostgreSQL", "Primaire opslag")
    }
}
@enduml
----

=== Motivatie

[Waarom deze deployment architectuur is gekozen]

=== Kwaliteit en Performance Eigenschappen

[Hoe deze deployment de kwaliteits doelen ondersteunt]

== Infrastructuur Niveau 2

*Doel*: Gedetailleerde weergave van specifieke deployment nodes.

=== [Node Naam]

[options="header",cols="1,3"]
|===
|Aspect |Beschrijving
|Hardware |[bijv. 4 vCPU, 16GB RAM]
|Software |[bijv. Ubuntu 22.04, Docker 24.x]
|Netwerk |[bijv. VPC, security groups]
|===

.Verdere Informatie
Zie link:https://docs.arc42.org/section-7/[Deployment View] in de arc42 documentatie.
`;
}

function getConceptsTemplate(): string {
  return `= 8. Cross-cutting Concepten

*Doel*: Algemene uitgangspunten en oplossings ideeen die relevant zijn voor meerdere bouwstenen.

== Domein Model

// Kern domein concepten en hun relaties

[plantuml, domain-model, svg]
----
@startuml
class Gebruiker {
  +id: UUID
  +email: String
  +naam: String
}
class Bestelling {
  +id: UUID
  +status: BestelStatus
  +aangemaakt: DateTime
}
Gebruiker "1" -- "*" Bestelling : plaatst
@enduml
----

== Security Concept

=== Authenticatie

[Beschrijf de authenticatie aanpak: JWT, OAuth2, etc.]

=== Autorisatie

[Beschrijf de autorisatie aanpak: RBAC, ABAC, etc.]

== Foutafhandeling

[Beschrijf hoe fouten worden afgehandeld in het systeem]

* [bijv. Globale error handler]
* [bijv. Gestructureerde foutmeldingen]
* [bijv. Error logging strategie]

== Logging en Monitoring

[options="header",cols="1,2"]
|===
|Aspect |Aanpak
|Logging |[bijv. Gestructureerde JSON logs, ELK stack]
|Metrics |[bijv. Prometheus, Grafana]
|Tracing |[bijv. OpenTelemetry, Jaeger]
|===

== Test Strategie

[options="header",cols="1,2,1"]
|===
|Type |Scope |Dekking Doel
|Unit Tests |Individuele functies/classes |80%
|Integratie Tests |Component interacties |Belangrijke paden
|E2E Tests |Volledige gebruikers flows |Kritieke flows
|===

.Verdere Informatie
Zie link:https://docs.arc42.org/section-8/[Cross-cutting Concepten] in de arc42 documentatie.
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `= 9. Architectuur Beslissingen

*Doel*: Documenteer belangrijke, kostbare, ver reikende of risicovolle architectuur beslissingen.

== ADR-001: [Beslissing Titel]

=== Status

[Voorgesteld | Geaccepteerd | Verouderd | Vervangen]

=== Context

[Beschrijf het probleem dat deze beslissing motiveert]

=== Beslissing

[Beschrijf de genomen beslissing]

=== Consequenties

*Positief:*

* [Voordeel 1]
* [Voordeel 2]

*Negatief:*

* [Nadeel 1]
* [Nadeel 2]

=== Overwogen Alternatieven

[options="header",cols="1,2,2"]
|===
|Alternatief |Voordelen |Nadelen
|[Optie A] |[Voordelen] |[Nadelen]
|[Optie B] |[Voordelen] |[Nadelen]
|===

'''

== ADR-002: [Beslissing Titel]

// Gebruik hetzelfde template voor aanvullende beslissingen

.Verdere Informatie
Zie link:https://docs.arc42.org/section-9/[Architectuur Beslissingen] in de arc42 documentatie.
`;
}

function getQualityRequirementsTemplate(): string {
  return `= 10. Kwaliteits Requirements

*Doel*: Concrete kwaliteits requirements met scenarios voor evaluatie.

== Kwaliteits Boom

// Visuele weergave van kwaliteits doelen en hun verfijningen

[plantuml, quality-tree, svg]
----
@startmindmap
* Kwaliteit
** Performance
*** Responstijd
*** Doorvoer
** Security
*** Authenticatie
*** Autorisatie
** Onderhoudbaarheid
*** Modulariteit
*** Testbaarheid
@endmindmap
----

== Kwaliteits Scenarios

=== Performance Scenarios

[options="header",cols="1,2,1,1"]
|===
|ID |Scenario |Verwachte Respons |Prioriteit
|PERF-1 |Gebruiker vraagt dashboard op onder normale belasting |< 200ms |Hoog
|PERF-2 |Systeem verwerkt 1000 gelijktijdige gebruikers |Geen degradatie |Gemiddeld
|===

=== Security Scenarios

[options="header",cols="1,2,1,1"]
|===
|ID |Scenario |Verwacht Gedrag |Prioriteit
|SEC-1 |Ongeldige login poging |Account blokkering na 5 pogingen |Hoog
|SEC-2 |Ongeautoriseerde API toegang |401 response, audit gelogd |Hoog
|===

=== Onderhoudbaarheid Scenarios

[options="header",cols="1,2,1,1"]
|===
|ID |Scenario |Verwachte Inspanning |Prioriteit
|MAINT-1 |Nieuw entiteitstype toevoegen |< 2 dagen ontwikkeling |Gemiddeld
|MAINT-2 |Dependency versie updaten |< 4 uur inclusief tests |Gemiddeld
|===

.Verdere Informatie
Zie link:https://docs.arc42.org/section-10/[Kwaliteits Requirements] in de arc42 documentatie.
`;
}

function getTechnicalRisksTemplate(): string {
  return `= 11. Risico's en Technical Debt

*Doel*: Identificeer en volg bekende technische risico's en opgebouwde technical debt.

== Technische Risico's

[options="header",cols="1,2,1,2"]
|===
|Risico |Beschrijving |Waarschijnlijkheid |Mitigatie
|[bijv. Third-party API storing] |[Externe service waarvan we afhankelijk zijn] |Gemiddeld |[Circuit breaker, fallback]
|[bijv. Data verlies] |[Database corruptie] |Laag |[Backups, replicatie]
|===

== Technical Debt

[options="header",cols="1,2,1,1"]
|===
|Item |Beschrijving |Impact |Prioriteit
|[bijv. Legacy authenticatie] |[Oude auth systeem moet vervangen worden] |Hoog |Gemiddeld
|[bijv. Ontbrekende tests] |[Dekking onder doel in module X] |Gemiddeld |Laag
|===

== Risico Monitoring

[Beschrijf hoe risico's worden gemonitord en beoordeeld]

* [bijv. Wekelijkse risico review meetings]
* [bijv. Geautomatiseerde monitoring alerts]

.Verdere Informatie
Zie link:https://docs.arc42.org/section-11/[Risico's en Technical Debt] in de arc42 documentatie.
`;
}

function getGlossaryTemplate(): string {
  return `= 12. Woordenlijst

*Doel*: Definieer belangrijke domein en technische termen die in de architectuur documentatie worden gebruikt.

== Domein Termen

[options="header",cols="1,3"]
|===
|Term |Definitie
|[Domein Term 1] |[Heldere, bondige definitie]
|[Domein Term 2] |[Heldere, bondige definitie]
|===

== Technische Termen

[options="header",cols="1,3"]
|===
|Term |Definitie
|[Technische Term 1] |[Heldere, bondige definitie]
|[Technische Term 2] |[Heldere, bondige definitie]
|===

== Afkortingen

[options="header",cols="1,3"]
|===
|Afkorting |Betekenis
|API |Application Programming Interface
|JWT |JSON Web Token
|REST |Representational State Transfer
|===

.Verdere Informatie
Zie link:https://docs.arc42.org/section-12/[Woordenlijst] in de arc42 documentatie.
`;
}

/**
 * Get the Dutch workflow guide in AsciiDoc format
 */
export function getWorkflowGuide(): string {
  return `= arc42 Architectuur Documentatie Workflow Gids

== Overzicht

Deze gids helpt u bij het documenteren van uw software architectuur met behulp van het arc42 template. Het arc42 template is een praktisch, beproefd template voor documentatie van software en systeem architecturen.

== Beschikbare Talen

Deze arc42 MCP Server ondersteunt meerdere talen voor documentatie:

[options="header",cols="1,2,2"]
|===
|Code |Taal |Native Naam
|EN |Engels |English
|DE |Duits |Deutsch
|CZ |Tsjechisch |Ceština
|ES |Spaans |Espanol
|FR |Frans |Francais
|IT |Italiaans |Italiano
|NL |Nederlands |Nederlands
|PT |Portugees |Portugues
|RU |Russisch |Russkiy
|UKR |Oekraiens |Ukrayinska
|ZH |Chinees |Zhongwen
|===

== Aan de Slag

=== Stap 1: Initialiseer Uw Workspace

Gebruik de \`arc42-init\` tool om uw documentatie workspace aan te maken:

[source]
----
arc42-init(projectName: "Mijn Project", language: "NL")
----

U kunt een andere taal specificeren met behulp van de ISO taalcode.

=== Stap 2: Controleer Status

Gebruik \`arc42-status\` om de huidige staat van uw documentatie te zien:

[source]
----
arc42-status()
----

=== Stap 3: Genereer Sectie Templates

Gebruik \`generate-template\` om gedetailleerde templates voor elke sectie te krijgen:

[source]
----
generate-template(section: "01_introduction_and_goals", language: "NL")
----

== De 12 arc42 Secties

. *Introductie en Doelen* - Begin hier! Definieer wat u bouwt en waarom.
. *Architectuur Beperkingen* - Wat mag u NIET doen?
. *Context en Scope* - Wat valt binnen en buiten scope?
. *Oplossing Strategie* - Aanpak op hoog niveau om het probleem op te lossen.
. *Bouwstenen View* - Statische structuur van uw systeem.
. *Runtime View* - Dynamisch gedrag en scenarios.
. *Deployment View* - Hoe wordt het gedeployed en beheerd?
. *Cross-cutting Concepten* - Patronen die in het hele systeem worden gebruikt.
. *Architectuur Beslissingen* - Belangrijke beslissingen en hun motivatie.
. *Kwaliteits Requirements* - Concrete kwaliteits scenarios.
. *Risico's en Technical Debt* - Wat kan er misgaan?
. *Woordenlijst* - Definieer uw termen.

== Best Practices

. *Begin met Sectie 1* - Het begrijpen van doelen is fundamenteel
. *Houd het bondig* - arc42 is pragmatisch, niet bureaucratisch
. *Gebruik diagrammen* - Een plaatje zegt meer dan duizend woorden
. *Documenteer beslissingen* - Toekomstige jij zal huidige jij dankbaar zijn
. *Itereer* - Architectuur documentatie is nooit "klaar"

== Beschikbare Tools

* \`arc42-init\` - Initialiseer documentatie workspace
* \`arc42-status\` - Controleer documentatie status
* \`generate-template\` - Genereer sectie templates
* \`update-section\` - Update sectie inhoud
* \`get-section\` - Lees sectie inhoud
* \`arc42-workflow-guide\` - Toon deze gids

== Bronnen

* link:https://arc42.org/[arc42 Website]
* link:https://docs.arc42.org/[arc42 Documentatie]
* link:https://arc42.org/examples[arc42 Voorbeelden]
`;
}

/**
 * Get the Dutch README content in AsciiDoc format
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Project';
  return `= ${name} - Architectuur Documentatie

Deze directory bevat de architectuur documentatie voor ${name}, volgens het arc42 template.

== Structuur

* \`sections/\` - Individuele sectie AsciiDoc bestanden (12 secties)
* \`images/\` - Diagrammen en afbeeldingen
* \`arc42-documentation.adoc\` - Hoofd gecombineerde documentatie
* \`config.yaml\` - Configuratie

== De 12 arc42 Secties

. *Introductie en Doelen* - Requirements, kwaliteits doelen, belanghebbenden
. *Architectuur Beperkingen* - Technische en organisatorische beperkingen
. *Context en Scope* - Business en technische context
. *Oplossing Strategie* - Fundamentele beslissingen en strategieen
. *Bouwstenen View* - Statische decompositie
. *Runtime View* - Dynamisch gedrag
. *Deployment View* - Infrastructuur en deployment
. *Cross-cutting Concepten* - Algemene uitgangspunten en aanpakken
. *Architectuur Beslissingen* - Belangrijke beslissingen (ADRs)
. *Kwaliteits Requirements* - Kwaliteits boom en scenarios
. *Risico's en Technical Debt* - Bekende problemen en risico's
. *Woordenlijst* - Belangrijke termen

== Aan de Slag

. Begin met Sectie 1: Introductie en Doelen
. Werk iteratief door de secties
. Gebruik diagrammen om concepten te illustreren
. Focus op beslissingen, niet implementatie details

== Documentatie Genereren

Gebruik de MCP tools om:

* Status controleren: \`arc42-status\`
* Templates genereren: \`generate-template\`
* Secties updaten: \`update-section\`

== Bronnen

* link:https://arc42.org/[arc42 Website]
* link:https://docs.arc42.org/[arc42 Documentatie]
* link:https://arc42.org/examples[arc42 Voorbeelden]
`;
}
