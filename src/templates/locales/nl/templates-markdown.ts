/**
 * Dutch Templates
 *
 * Contains all arc42 section templates in Dutch.
 * Based on the official arc42 Dutch template from vendor/arc42-template/NL/.
 *
 * @module templates/locales/nl/templates
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Dutch template for a specific section
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
  return `# 1. Introductie en Doelen

## Probleemstelling

**Doel**: Beschrijft de essentiële vereisten en drijvende krachten die moeten worden overwogen bij de implementatie van de softwarearchitectuur en ontwikkeling van het systeem.

### Essentiële Vereisten

<!-- Lijst de top 3-5 functionele vereisten -->

| ID | Vereiste | Prioriteit |
|----|----------|------------|
| REQ-1 | [Korte beschrijving] | Hoog |
| REQ-2 | [Korte beschrijving] | Medium |

### Functionaliteiten

<!-- Essentiële functionaliteiten van het systeem -->

- Functionaliteit 1: [Beschrijving]
- Functionaliteit 2: [Beschrijving]

## Kwaliteitsdoelen

**Doel**: De top 3 tot 5 kwaliteitseisen voor de architectuur, waarvan de vervulling bijzonder belangrijk is voor de belangrijkste stakeholders.

<!-- Gebaseerd op ISO 25010, prioriteer kwaliteiten zoals: -->
<!-- Prestaties, Beveiliging, Betrouwbaarheid, Onderhoudbaarheid, Bruikbaarheid, etc. -->

| Prioriteit | Kwaliteitsdoel | Motivatie |
|------------|----------------|-----------|
| 1 | [bijv. Prestaties] | [Waarom dit kritiek is] |
| 2 | [bijv. Beveiliging] | [Waarom dit kritiek is] |
| 3 | [bijv. Onderhoudbaarheid] | [Waarom dit kritiek is] |

## Stakeholders

**Doel**: Expliciet overzicht van de stakeholders van het systeem.

| Rol/Naam | Contact | Verwachtingen |
|----------|---------|---------------|
| Product Owner | [Naam/Email] | [Verwachtingen van de architectuur] |
| Ontwikkelteam | [Teamnaam] | [Wat ze moeten weten] |
| Operations | [Team/Persoon] | [Deployment- en operationele zorgen] |
| Eindgebruikers | [Type] | [Verwachtingen gebruikerservaring] |

## Succescriteria

<!-- Wat definieert succes voor dit systeem? -->

- [ ] Criterium 1
- [ ] Criterium 2
- [ ] Criterium 3
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `# 2. Beperkingen

## Technische Beperkingen

**Hardware-beperkingen**

| Beperking | Achtergrond/Motivatie |
|-----------|----------------------|
| [bijv. Cloud platform] | [Waarom deze beperking bestaat] |

**Software/Technologie-beperkingen**

| Beperking | Achtergrond/Motivatie |
|-----------|----------------------|
| [bijv. Java 17+ vereist] | [Reden voor beperking] |
| [bijv. PostgreSQL vereist] | [Waarom dit is gekozen] |

**Programmeerrichtlijnen**

- Programmeertaal: [Taal]
- Framework: [Framework en versie]
- Bibliotheken: [Verplichte of verboden bibliotheken]

## Organisatorische Beperkingen

**Organisatie en Structuur**

| Beperking | Achtergrond/Motivatie |
|-----------|----------------------|
| [bijv. Teamstructuur] | [Hoe dit de architectuur beïnvloedt] |
| [bijv. Agile methodologie] | [Impact op ontwikkelproces] |

**Resources**

- Budget: [Budgetbeperkingen]
- Tijd: [Tijdsbeperkingen]
- Team: [Teamgrootte en vaardigheden]

## Conventies

**Architectuur- en Ontwerpconventies**

- [bijv. Microservices architectuurpatroon]
- [bijv. RESTful API-ontwerp]
- [bijv. Domain-Driven Design]

**Coderingconventies**

- Codestijl: [Link naar stijlgids]
- Documentatie: [Documentatiestandaarden]
- Testen: [Testvereisten]

**Compliance-vereisten**

- [bijv. AVG-compliance]
- [bijv. Industriespecifieke regelgeving]
- [bijv. Toegankelijkheidsstandaarden]
`;
}

function getContextAndScopeTemplate(): string {
  return `# 3. Scope en Context

## Zakelijke Context

**Doel**: Toont de zakelijke omgeving van het systeem en de belangrijkste externe afhankelijkheden.

### Contextdiagram

\`\`\`
[Maak een diagram dat uw systeem en externe systemen/gebruikers toont]
U kunt gebruiken:
- Mermaid-diagrammen
- PlantUML
- ASCII-art
- Of verwijs naar een afbeelding in /images/
\`\`\`

### Externe Interfaces

| Extern Systeem | Interface | Doel |
|----------------|-----------|------|
| [Extern Systeem 1] | [API/Protocol] | [Welke gegevens/functies worden uitgewisseld] |
| [Gebruikerstype 1] | [UI/API] | [Hoe gebruikers interacteren] |

### Ondersteunde Bedrijfsprocessen

<!-- Welke bedrijfsprocessen ondersteunt dit systeem? -->

1. **Proces 1**: [Beschrijving]
   - Actoren: [Wie is betrokken]
   - Flow: [High-level flow]

2. **Proces 2**: [Beschrijving]

## Technische Context

**Doel**: Toont technische interfaces en kanalen tussen systeem en omgeving.

### Technische Interfaces

| Interface | Technologie | Protocol | Formaat |
|-----------|-------------|----------|---------|
| [API 1] | [REST API] | [HTTPS] | [JSON] |
| [Database] | [PostgreSQL] | [TCP/IP] | [SQL] |

### Kanalen en Transmissie

| Kanaal | Technologie | Beschrijving |
|--------|-------------|--------------|
| [Message Queue] | [RabbitMQ] | [Asynchrone communicatie tussen services] |

### Mapping: Zakelijk naar Technisch

| Zakelijke Context | Technische Realisatie |
|-------------------|----------------------|
| [Gebruikersinterface] | [React SPA via HTTPS] |
| [Extern Systeem A] | [REST API via HTTPS] |
`;
}

function getSolutionStrategyTemplate(): string {
  return `# 4. Oplossingsstrategie

**Doel**: Vat de fundamentele beslissingen en oplossingsstrategieën samen die de systeemarchitectuur vormgeven.

## Kernoplossingsbeslissingen

### Architectuurpatronen

| Patroon | Motivatie | Gevolgen |
|---------|-----------|----------|
| [bijv. Microservices] | [Waarom dit patroon is gekozen] | [Voordelen en afwegingen] |

### Technologiebeslissingen

| Component | Technologie | Reden |
|-----------|-------------|-------|
| Backend | [bijv. Node.js] | [Waarom dit is gekozen] |
| Frontend | [bijv. React] | [Redenen] |
| Database | [bijv. PostgreSQL] | [Redenen] |

### Top-Level Decompositie

<!-- Hoe is het systeem op het hoogste niveau gestructureerd? -->

\`\`\`
[High-level componentendiagram]
\`\`\`

Beschrijving:
- Component 1: [Doel en verantwoordelijkheid]
- Component 2: [Doel en verantwoordelijkheid]

## Realisatie van Kwaliteitsdoelen

### Mapping: Kwaliteitsdoelen naar Oplossingsbenaderingen

| Kwaliteitsdoel | Oplossingsbenadering |
|----------------|---------------------|
| [Prestaties] | [Cachingstrategie, asynchrone verwerking, CDN] |
| [Beveiliging] | [Authenticatie, autorisatie, encryptie] |
| [Schaalbaarheid] | [Horizontale schaling, load balancing] |

### Kernontwerp beslissingen

1. **Beslissing 1**: [bijv. Event-driven architectuur]
   - Reden: [Waarom deze benadering]
   - Impact: [Hoe het helpt kwaliteitsdoelen te bereiken]

2. **Beslissing 2**: [Beschrijving]
   - Reden: [Motivatie]
   - Impact: [Impact op kwaliteitsdoelen]

## Ontwikkelstrategie

- Ontwikkelbenadering: [Agile, Scrum, etc.]
- Deploymentstrategie: [CI/CD, Blue-Green, etc.]
- Teststrategie: [Unit, Integratie, E2E]
`;
}

function getBuildingBlockViewTemplate(): string {
  return `# 5. Bouwstenenweergave

**Doel**: Statische decompositie van het systeem in bouwstenen en hun relaties.

## Niveau 1: Systeemcontext

### Whitebox: Totaalsysteem

**Doel**: [Wat het systeem doet]

\`\`\`
[Componentendiagram met de belangrijkste bouwstenen]
\`\`\`

**Bevatte Bouwstenen**:

| Component | Verantwoordelijkheid |
|-----------|---------------------|
| [Component 1] | [Wat het doet] |
| [Component 2] | [Wat het doet] |

**Belangrijke Interfaces**:

| Interface | Beschrijving |
|-----------|--------------|
| [API 1] | [Doel en protocol] |

## Niveau 2: Componentdetails

### Component 1 (Whitebox)

**Doel**: [Gedetailleerd doel]

**Interfaces**:
- Invoer: [Wat het ontvangt]
- Uitvoer: [Wat het produceert]

**Interne Structuur**:

\`\`\`
[Diagram van interne modules/klassen]
\`\`\`

**Bevatte Elementen**:

| Element | Verantwoordelijkheid |
|---------|---------------------|
| [Module A] | [Doel] |
| [Module B] | [Doel] |

### Component 2 (Whitebox)

[Vergelijkbare structuur]

## Niveau 3: Detailweergaven

<!-- Alleen Niveau 3 opnemen voor componenten die aanvullende details nodig hebben -->

### Module A Details

[Gedetailleerde klassendiagrammen, pakketstructuur, etc.]
`;
}

function getRuntimeViewTemplate(): string {
  return `# 6. Runtime-weergave

**Doel**: Toont het gedrag en de interactie van bouwstenen tijdens runtime.

## Belangrijke Scenario's

### Scenario 1: [Naam, bijv. "Gebruikerslogin"]

**Beschrijving**: [Wat er in dit scenario gebeurt]

**Sequentiediagram**:

\`\`\`mermaid
sequenceDiagram
    participant Gebruiker
    participant Frontend
    participant API
    participant Database

    Gebruiker->>Frontend: Inloggegevens invoeren
    Frontend->>API: POST /login
    API->>Database: Inloggegevens valideren
    Database-->>API: Gebruikersgegevens
    API-->>Frontend: JWT-token
    Frontend-->>Gebruiker: Login succesvol
\`\`\`

**Stappen**:

1. Gebruiker voert inloggegevens in
2. Frontend stuurt loginverzoek
3. API valideert met database
4. Token wordt gegenereerd en teruggestuurd
5. Gebruiker is geauthenticeerd

### Scenario 2: [Naam]

[Vergelijkbare structuur]

## Gegevensstromen

### Stroom 1: [Naam]

**Doel**: [Welke gegevens waarheen stromen]

**Diagram**:

\`\`\`
[Gegevensstroomdiagram]
\`\`\`

**Beschrijving**:
- Stap 1: [Wat er gebeurt]
- Stap 2: [Wat er gebeurt]

## Toestandsautomaten

### Toestandsautomaat voor [Entiteit]

**Toestanden**:
- Toestand 1: [Beschrijving]
- Toestand 2: [Beschrijving]

**Overgangen**:

| Van | Gebeurtenis | Naar | Actie |
|-----|-------------|------|-------|
| [Toestand 1] | [Gebeurtenis] | [Toestand 2] | [Wat er gebeurt] |
`;
}

function getDeploymentViewTemplate(): string {
  return `# 7. Deployment-weergave

**Doel**: Beschrijft de technische infrastructuur en hoe software wordt gedistribueerd.

## Infrastructuuroverzicht

### Deploymentdiagram

\`\`\`
[Diagram met servers, containers, netwerken]
\`\`\`

## Omgevingen

### Productieomgeving

**Infrastructuur**:

| Component | Technologie | Configuratie |
|-----------|-------------|--------------|
| [Applicatieserver] | [AWS ECS] | [Specificaties] |
| [Database] | [RDS PostgreSQL] | [Specificaties] |
| [Cache] | [Redis] | [Specificaties] |

**Netwerk**:
- VPC: [Configuratie]
- Subnets: [Public/Private setup]
- Security Groups: [Regels]

### Stagingomgeving

[Vergelijkbare structuur]

### Ontwikkelomgeving

[Vergelijkbare structuur]

## Deploymentstrategie

### CI/CD Pipeline

1. **Build**: [Wat er gebeurt]
2. **Test**: [Geautomatiseerde tests]
3. **Deploy**: [Deploymentproces]

### Rollback-strategie

[Hoe deployments worden teruggedraaid]

## Schaalstrategie

### Horizontaal Schalen

| Component | Schalingstrigger | Max. Instanties |
|-----------|------------------|-----------------|
| [API-server] | [CPU > 70%] | [10] |

### Verticaal Schalen

[Wanneer en hoe verticaal te schalen]

## Monitoring en Operations

### Health Checks

| Component | Check | Drempel |
|-----------|-------|---------|
| [API] | [/health endpoint] | [Responstijd < 1s] |

### Logging

- Log-aggregatie: [ELK, CloudWatch, etc.]
- Log-retentie: [Beleid]

### Metrieken

- Belangrijke metrieken: [CPU, geheugen, aanvraagsnelheid]
- Alerting: [Alert-condities]
`;
}

function getConceptsTemplate(): string {
  return `# 8. Cross-cutting Concepten

**Doel**: Overkoepelende regelingen en oplossingsideeën die relevant zijn voor meerdere delen van het systeem.

## Domeinmodellen

### Kerndomeinconcepten

\`\`\`
[Domeinmodeldiagram of klassendiagram]
\`\`\`

**Belangrijke Entiteiten**:

| Entiteit | Verantwoordelijkheid | Relaties |
|----------|---------------------|----------|
| [Entiteit 1] | [Doel] | [Gerelateerde entiteiten] |

## Beveiliging

### Authenticatie

- Methode: [JWT, OAuth2, etc.]
- Implementatie: [Hoe het werkt]

### Autorisatie

- Model: [RBAC, ABAC, etc.]
- Rollen: [Lijst van rollen en rechten]

### Gegevensbescherming

- Encryptie at rest: [Hoe]
- Encryptie in transit: [TLS-versie]
- Omgang met gevoelige gegevens: [Benadering]

## Foutafhandeling

### Foutcategorieën

| Categorie | Afhandelingstrategie |
|-----------|---------------------|
| [Validatiefouten] | [400 met details retourneren] |
| [Systeemfouten] | [Loggen en 500 retourneren] |

### Foutresponsformaat

\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Leesbare boodschap",
    "details": {}
  }
}
\`\`\`

## Logging en Monitoring

### Loggingstrategie

- Log-levels: [DEBUG, INFO, WARN, ERROR]
- Gestructureerd loggen: [JSON-formaat]
- Correlatie-ID's: [Voor request-tracing]

### Monitoring

- APM: [Application Performance Monitoring tool]
- Metrieken: [Belangrijke zakelijke en technische metrieken]

## Configuratiebeheer

### Configuratiebronnen

1. Omgevingsvariabelen
2. Configuratiebestanden
3. Secret Management: [Vault, AWS Secrets Manager]

### Configuratie per Omgeving

| Instelling | Dev | Staging | Prod |
|------------|-----|---------|------|
| [Log-level] | [DEBUG] | [INFO] | [WARN] |

## Teststrategie

### Testniveaus

| Niveau | Dekking | Tools |
|--------|---------|-------|
| Unit Tests | [Doel %] | [Framework] |
| Integratietests | [Scope] | [Tools] |
| E2E-tests | [Belangrijke flows] | [Tools] |

### Testgegevensbeheer

[Hoe testgegevens worden aangemaakt en beheerd]

## Ontwikkelconcepten

### Code-organisatie

- Pakketstructuur: [Benadering]
- Naamgevingsconventies: [Standaarden]

### Build- en Dependency-management

- Build-tool: [Maven, Gradle, npm, etc.]
- Dependency-management: [Strategie]

## Operationele Concepten

### Backup en Recovery

- Backupfrequentie: [Dagelijks, per uur, etc.]
- Retentie: [Beleid]
- Recovery-procedure: [Stappen]

### Disaster Recovery

- RTO: [Recovery Time Objective]
- RPO: [Recovery Point Objective]
- DR-strategie: [Benadering]
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `# 9. Architectuurbeslissingen

**Doel**: Documenteert belangrijke, kostbare, kritieke of risicovolle architectuurbeslissingen inclusief motivatie.

## ADR-formaat

Elke beslissing volgt deze structuur:
- **Context**: Wat is het probleem dat we aanpakken?
- **Beslissing**: Wat we hebben besloten te doen
- **Gevolgen**: Wat hierdoor makkelijker of moeilijker wordt

## Beslissingslogboek

### ADR-001: [Beslissingsnaam]

**Datum**: [JJJJ-MM-DD]
**Status**: [Voorgesteld | Geaccepteerd | Verouderd | Vervangen]
**Beslissers**: [Namen]

**Context**:

[Beschrijf de krachten die spelen, technisch, politiek, sociaal en projectspecifiek. Deze krachten staan waarschijnlijk op gespannen voet met elkaar en moeten als zodanig worden benoemd.]

**Beslissing**:

[Beschrijf onze reactie op deze krachten. Hier nemen we onze beslissing.]

**Gevolgen**:

Positief:
- [Voordeel 1]
- [Voordeel 2]

Negatief:
- [Afweging 1]
- [Afweging 2]

Risico's:
- [Risico 1 en mitigatie]

### ADR-002: [Volgende beslissing]

[Vergelijkbare structuur]

## Beslissingscategorieën

### Structurele Beslissingen

| Beslissing | Motivatie | Datum |
|------------|-----------|-------|
| [Microservices vs Monolith] | [Waarom gekozen] | [Datum] |

### Technologiebeslissingen

| Component | Technologie | Overwogen Alternatief | Waarom Gekozen |
|-----------|-------------|----------------------|----------------|
| [Backend] | [Node.js] | [Python, Java] | [Redenen] |

### Procesbeslissingen

| Beslissing | Impact | Datum |
|------------|--------|-------|
| [Agile methodologie] | [Hoe het de architectuur beïnvloedt] | [Datum] |

## Verouderde Beslissingen

| Beslissing | Datum Verouderd | Reden | Vervangen door |
|------------|-----------------|-------|----------------|
| [Oude beslissing] | [Datum] | [Waarom verouderd] | [ADR-XXX] |
`;
}

function getQualityRequirementsTemplate(): string {
  return `# 10. Kwaliteitseisen

**Doel**: Definieert kwaliteitseisen met concrete scenario's.

## Kwaliteitsboom

### Top-Level Kwaliteitsdoelen

\`\`\`
Kwaliteit
├── Prestaties
│   ├── Responstijd
│   └── Doorvoer
├── Beveiliging
│   ├── Authenticatie
│   └── Gegevensbescherming
├── Betrouwbaarheid
│   ├── Beschikbaarheid
│   └── Fouttolerantie
└── Onderhoudbaarheid
    ├── Testbaarheid
    └── Wijzigbaarheid
\`\`\`

## Kwaliteitsscenario's

### Prestatiescenario's

**Scenario 1: Normale Belasting Responstijd**

| Aspect | Beschrijving |
|--------|--------------|
| Scenario | Gebruiker vraagt gegevens op onder normale belasting |
| Bron | Eindgebruiker |
| Stimulus | HTTP-verzoek aan API |
| Omgeving | Normale werking, 100 gelijktijdige gebruikers |
| Reactie | Systeem retourneert gegevens |
| Maatstaf | 95e percentiel responstijd < 200ms |

**Scenario 2: Piekbelasting Afhandeling**

| Aspect | Beschrijving |
|--------|--------------|
| Scenario | Systeem onder piekbelasting |
| Bron | Meerdere gebruikers |
| Stimulus | 1000 gelijktijdige verzoeken |
| Omgeving | Piekuren |
| Reactie | Systeem verwerkt alle verzoeken |
| Maatstaf | Geen verzoek faalt, responstijd < 1s |

### Beveiligingsscenario's

**Scenario 3: Ongeautoriseerde Toegangspoging**

| Aspect | Beschrijving |
|--------|--------------|
| Scenario | Ongeautoriseerde gebruiker probeert toegang tot beschermde resource |
| Bron | Externe aanvaller |
| Stimulus | HTTP-verzoek zonder geldig token |
| Omgeving | Normale werking |
| Reactie | Systeem weigert toegang |
| Maatstaf | Retourneert 401, logt poging, geen gegevens blootgesteld |

### Betrouwbaarheidsscenario's

**Scenario 4: Service-uitval Herstel**

| Aspect | Beschrijving |
|--------|--------------|
| Scenario | Databaseverbinding faalt |
| Bron | Infrastructuurstoring |
| Stimulus | Database wordt onbeschikbaar |
| Omgeving | Normale werking |
| Reactie | Systeem blijft werken met gecachte gegevens |
| Maatstaf | Service-degradatie < 5%, herstel < 30s |

### Onderhoudbaarheidsscenario's

**Scenario 5: Nieuwe Functionaliteit Toevoegen**

| Aspect | Beschrijving |
|--------|--------------|
| Scenario | Ontwikkelaar voegt nieuw API-eindpunt toe |
| Bron | Ontwikkelteam |
| Stimulus | Nieuwe vereiste |
| Omgeving | Ontwikkeling |
| Reactie | Functionaliteit wordt toegevoegd |
| Maatstaf | < 2 dagen, < 5 bestanden gewijzigd, tests slagen |

## Kwaliteitseisen Prioritering

| Kwaliteitsattribuut | Prioriteit | Doelmaatstaf |
|---------------------|------------|--------------|
| Beschikbaarheid | Hoog | 99,9% uptime |
| Responstijd | Hoog | < 200ms (p95) |
| Beveiliging | Kritiek | Nul datalekken |
| Onderhoudbaarheid | Medium | Testdekking > 80% |
| Bruikbaarheid | Medium | Gebruikerstaak succes > 95% |
`;
}

function getTechnicalRisksTemplate(): string {
  return `# 11. Risico's en Technische Schuld

**Doel**: Documenteert bekende problemen, risico's en technische schuld.

## Risico's

### Risicobeoordelingsmatrix

| Risico | Waarschijnlijkheid | Impact | Ernst | Status |
|--------|-------------------|--------|-------|--------|
| [Risico 1] | [Hoog/Medium/Laag] | [Hoog/Medium/Laag] | [Kritiek/Hoog/Medium/Laag] | [Open/Gemitigeerd] |

### Gedetailleerde Risico's

**Risico 1: [Risiconaam]**

- **Beschrijving**: [Wat is het risico]
- **Waarschijnlijkheid**: [Hoog/Medium/Laag]
- **Impact**: [Hoog/Medium/Laag - en wat er gebeurt]
- **Mitigatie**: [Wat we eraan doen]
- **Noodplan**: [Plan als het risico zich voordoet]
- **Eigenaar**: [Wie is verantwoordelijk]
- **Status**: [Open/Wordt gemitigeerd/Gesloten]

**Risico 2: [Titel]**

[Vergelijkbare structuur]

## Technische Schuld

### Schuldregistraties

| Item | Type | Impact | Inspanning | Prioriteit |
|------|------|--------|------------|------------|
| [Schuld 1] | [Code/Architectuur/Testing] | [Hoog/Medium/Laag] | [Dagen] | [1-5] |

### Gedetailleerde Schuldregistraties

**Schuld 1: [Titel]**

- **Beschrijving**: [Wat moet worden opgelost]
- **Waarom het bestaat**: [Hoe is dit gebeurd]
- **Impact**: [Welke problemen het veroorzaakt]
- **Voorgestelde oplossing**: [Hoe het op te lossen]
- **Inspanningsschatting**: [Benodigde tijd]
- **Prioriteit**: [Wanneer moeten we het oplossen]

### Schuldafbouwplan

| Kwartaal | Te Adresseren Schuld | Verwachte Impact |
|----------|---------------------|------------------|
| Q1 2024 | [Items 1, 2] | [Verbetering in X] |

## Bekende Problemen

### Openstaande Problemen

| Probleem | Ernst | Workaround | Doel Oplossingsdatum |
|----------|-------|------------|---------------------|
| [Probleem 1] | [Hoog/Medium/Laag] | [Indien beschikbaar] | [Datum] |

### Beperkingen

| Beperking | Impact | Motivatie | Toekomstplannen |
|-----------|--------|-----------|-----------------|
| [Beperking 1] | [Effect] | [Waarom het bestaat] | [Wanneer/of te adresseren] |

## Beveiligingskwetsbaarheden

### Bekende Kwetsbaarheden

| CVE | Component | Ernst | Status | Mitigatie |
|-----|-----------|-------|--------|-----------|
| [CVE-ID] | [Bibliotheek] | [Kritiek/Hoog/Medium] | [Open/Opgelost] | [Genomen maatregelen] |

## Prestatieproblemen

| Probleem | Impact | Workaround | Oplossingsplan |
|----------|--------|------------|----------------|
| [Probleem] | [Gebruikersimpact] | [Tijdelijke oplossing] | [Permanente oplossing] |
`;
}

function getGlossaryTemplate(): string {
  return `# 12. Woordenlijst

**Doel**: Definieert belangrijke zakelijke en technische termen om consistente terminologie te waarborgen.

## Zakelijke Termen

| Term | Definitie |
|------|-----------|
| [Zakelijke Term 1] | [Duidelijke, beknopte definitie] |
| [Zakelijke Term 2] | [Definitie] |

## Technische Termen

| Term | Definitie | Synoniemen |
|------|-----------|------------|
| [Technische Term 1] | [Definitie] | [Alternatieve namen] |
| [Technische Term 2] | [Definitie] | [Alternatieve namen] |

## Afkortingen en Acroniemen

| Afkorting | Volledige Naam | Context |
|-----------|----------------|---------|
| API | Application Programming Interface | [Wanneer/waar gebruikt] |
| SLA | Service Level Agreement | [Context] |
| JWT | JSON Web Token | [Gebruik] |

## Bedrijfsconcepten

| Concept | Beschrijving | Gerelateerde Termen |
|---------|--------------|---------------------|
| [Concept 1] | [Gedetailleerde uitleg] | [Gerelateerde concepten] |

## Systeemspecifieke Termen

| Term | Definitie | Voorbeeld |
|------|-----------|-----------|
| [Systeemterm 1] | [Wat het betekent in dit systeem] | [Gebruiksvoorbeeld] |

## Verouderde Termen

| Oude Term | Vervangen door | Reden |
|-----------|----------------|-------|
| [Oude term] | [Nieuwe term] | [Waarom gewijzigd] |

---

**Opmerking**: Houd deze woordenlijst up-to-date wanneer nieuwe termen verschijnen. Link vanuit andere delen van de documentatie naar deze sectie wanneer deze termen worden gebruikt.
`;
}

/**
 * Get the Dutch workflow guide
 */
export function getWorkflowGuide(): string {
  return `# arc42 Architectuur-Documentatie Workflow-gids

## Overzicht

Deze gids helpt u bij het documenteren van uw softwarearchitectuur met behulp van het arc42-template. Het arc42-template is een praktisch, bewezen template voor het documenteren van software- en systeemarchitecturen.

## Beschikbare Talen

Deze arc42 MCP Server ondersteunt meerdere talen voor documentatie:

| Code | Taal | Moedertaalnaam |
|------|------|----------------|
| EN | Engels | English |
| DE | Duits | Deutsch |
| CZ | Tsjechisch | Čeština |
| ES | Spaans | Español |
| FR | Frans | Français |
| IT | Italiaans | Italiano |
| NL | Nederlands | Nederlands |
| PT | Portugees | Português |
| RU | Russisch | Русский |
| UKR | Oekraïens | Українська |
| ZH | Chinees | 中文 |

## Aan de Slag

### Stap 1: Workspace Initialiseren

Gebruik de \`arc42-init\`-tool om uw documentatie-workspace aan te maken:

\`\`\`
arc42-init(projectName: "Mijn Project", language: "NL")
\`\`\`

U kunt een andere taal specificeren met de ISO-taalcode.

### Stap 2: Status Controleren

Gebruik \`arc42-status\` om de huidige status van uw documentatie te zien:

\`\`\`
arc42-status()
\`\`\`

### Stap 3: Sectie-templates Genereren

Gebruik \`generate-template\` om gedetailleerde templates voor elke sectie te krijgen:

\`\`\`
generate-template(section: "01_introduction_and_goals", language: "NL")
\`\`\`

## De 12 arc42-Secties

1. **Introductie en Doelen** - Begin hier! Definieer wat u bouwt en waarom.
2. **Beperkingen** - Wat mag u NIET doen?
3. **Scope en Context** - Wat is binnen en wat is buiten scope?
4. **Oplossingsstrategie** - High-level benadering om het probleem op te lossen.
5. **Bouwstenenweergave** - Statische structuur van uw systeem.
6. **Runtime-weergave** - Dynamisch gedrag en scenario's.
7. **Deployment-weergave** - Hoe wordt het gedeployed en beheerd?
8. **Cross-cutting Concepten** - Patronen die door het hele systeem worden gebruikt.
9. **Architectuurbeslissingen** - Belangrijke beslissingen en hun motivatie.
10. **Kwaliteitseisen** - Concrete kwaliteitsscenario's.
11. **Risico's en Technische Schuld** - Wat kan er misgaan?
12. **Woordenlijst** - Definieer uw termen.

## Best Practices

1. **Begin met Sectie 1** - Begrip van doelen is fundamenteel
2. **Houd het beknopt** - arc42 is pragmatisch, niet bureaucratisch
3. **Gebruik diagrammen** - Een plaatje zegt meer dan duizend woorden
4. **Documenteer beslissingen** - Uw toekomstige zelf zal u dankbaar zijn
5. **Itereer** - Architectuurdocumentatie is nooit "af"

## Beschikbare Tools

- \`arc42-init\` - Documentatie-workspace initialiseren
- \`arc42-status\` - Documentatiestatus controleren
- \`generate-template\` - Sectie-templates genereren
- \`update-section\` - Sectie-inhoud bijwerken
- \`get-section\` - Sectie-inhoud lezen
- \`arc42-workflow-guide\` - Deze gids weergeven

## Resources

- [arc42 Website](https://arc42.org/)
- [arc42 Documentatie](https://docs.arc42.org/)
- [arc42 Voorbeelden](https://arc42.org/examples)
`;
}

/**
 * Get the Dutch README content
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Project';
  return `# ${name} - Architectuur-Documentatie

Deze directory bevat de architectuurdocumentatie voor ${name}, gebaseerd op het arc42-template.

## Structuur

- \`sections/\` - Individuele sectie-markdown-bestanden (12 secties)
- \`images/\` - Diagrammen en afbeeldingen
- \`arc42-documentation.md\` - Gecombineerde hoofddocumentatie
- \`config.yaml\` - Configuratie

## De 12 arc42-Secties

1. **Introductie en Doelen** - Vereisten, kwaliteitsdoelen, stakeholders
2. **Beperkingen** - Technische en organisatorische beperkingen
3. **Scope en Context** - Zakelijke en technische context
4. **Oplossingsstrategie** - Fundamentele beslissingen en strategieën
5. **Bouwstenenweergave** - Statische decompositie
6. **Runtime-weergave** - Dynamisch gedrag
7. **Deployment-weergave** - Infrastructuur en deployment
8. **Cross-cutting Concepten** - Overkoepelende regelingen en benaderingen
9. **Architectuurbeslissingen** - Belangrijke beslissingen (ADR's)
10. **Kwaliteitseisen** - Kwaliteitsboom en scenario's
11. **Risico's en Technische Schuld** - Bekende problemen en risico's
12. **Woordenlijst** - Belangrijke termen

## Aan de Slag

1. Begin met Sectie 1: Introductie en Doelen
2. Werk iteratief door de secties
3. Gebruik diagrammen om concepten te illustreren
4. Focus op beslissingen, niet op implementatiedetails

## Documentatie Genereren

Gebruik de MCP-tools voor:
- Status controleren: \`arc42-status\`
- Templates genereren: \`generate-template\`
- Secties bijwerken: \`update-section\`

## Resources

- [arc42 Website](https://arc42.org/)
- [arc42 Documentatie](https://docs.arc42.org/)
- [arc42 Voorbeelden](https://arc42.org/examples)
`;
}
