/**
 * German Templates
 *
 * Contains all arc42 section templates in German.
 * Based on the official arc42 German template from vendor/arc42-template/DE/.
 *
 * @module templates/locales/de/templates
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the German template for a specific section
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
  return `# 1. Einführung und Ziele

## Aufgabenstellung

**Zweck**: Beschreibt die wesentlichen Anforderungen und treibenden Kräfte, die bei der Umsetzung der Softwarearchitektur und Entwicklung des Systems berücksichtigt werden müssen.

### Wesentliche Anforderungen

<!-- Listen Sie die Top 3-5 funktionalen Anforderungen auf -->

| ID | Anforderung | Priorität |
|----|-------------|-----------|
| ANF-1 | [Kurzbeschreibung] | Hoch |
| ANF-2 | [Kurzbeschreibung] | Mittel |

### Features

<!-- Wesentliche Features des Systems -->

- Feature 1: [Beschreibung]
- Feature 2: [Beschreibung]

## Qualitätsziele

**Zweck**: Die Top-3 bis Top-5 der Qualitätsanforderungen für die Architektur, deren Erfüllung den maßgeblichen Stakeholdern besonders wichtig sind.

<!-- Basierend auf ISO 25010, priorisieren Sie Qualitäten wie: -->
<!-- Performanz, Sicherheit, Zuverlässigkeit, Wartbarkeit, Benutzbarkeit, etc. -->

| Priorität | Qualitätsziel | Motivation |
|-----------|---------------|------------|
| 1 | [z.B. Performanz] | [Warum dies kritisch ist] |
| 2 | [z.B. Sicherheit] | [Warum dies kritisch ist] |
| 3 | [z.B. Wartbarkeit] | [Warum dies kritisch ist] |

## Stakeholder

**Zweck**: Expliziter Überblick über die Stakeholder des Systems.

| Rolle/Name | Kontakt | Erwartungshaltung |
|------------|---------|-------------------|
| Product Owner | [Name/Email] | [Erwartungen an die Architektur] |
| Entwicklungsteam | [Teamname] | [Was sie wissen müssen] |
| Betrieb | [Team/Person] | [Deployment- und Betriebsbelange] |
| Endbenutzer | [Typ] | [Erwartungen an die Benutzererfahrung] |

## Erfolgskriterien

<!-- Was definiert den Erfolg dieses Systems? -->

- [ ] Kriterium 1
- [ ] Kriterium 2
- [ ] Kriterium 3
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `# 2. Randbedingungen

## Technische Randbedingungen

**Hardware-Randbedingungen**

| Randbedingung | Hintergrund/Motivation |
|---------------|------------------------|
| [z.B. Cloud-Plattform] | [Warum diese Randbedingung existiert] |

**Software/Technologie-Randbedingungen**

| Randbedingung | Hintergrund/Motivation |
|---------------|------------------------|
| [z.B. Java 17+ erforderlich] | [Grund für die Randbedingung] |
| [z.B. PostgreSQL erforderlich] | [Warum dies gewählt wurde] |

**Programmierrichtlinien**

- Programmiersprache: [Sprache]
- Framework: [Framework und Version]
- Bibliotheken: [Pflicht- oder verbotene Bibliotheken]

## Organisatorische Randbedingungen

**Organisation und Struktur**

| Randbedingung | Hintergrund/Motivation |
|---------------|------------------------|
| [z.B. Teamstruktur] | [Wie dies die Architektur beeinflusst] |
| [z.B. Agile Methodik] | [Auswirkungen auf den Entwicklungsprozess] |

**Ressourcen**

- Budget: [Budgetbeschränkungen]
- Zeit: [Zeitliche Randbedingungen]
- Team: [Teamgröße und -fähigkeiten]

## Konventionen

**Architektur- und Design-Konventionen**

- [z.B. Microservices-Architekturmuster]
- [z.B. RESTful API-Design]
- [z.B. Domain-Driven Design]

**Coding-Konventionen**

- Code-Stil: [Link zum Styleguide]
- Dokumentation: [Dokumentationsstandards]
- Tests: [Testanforderungen]

**Compliance-Anforderungen**

- [z.B. DSGVO-Konformität]
- [z.B. Branchenspezifische Vorschriften]
- [z.B. Barrierefreiheitsstandards]
`;
}

function getContextAndScopeTemplate(): string {
  return `# 3. Kontextabgrenzung

## Fachlicher Kontext

**Zweck**: Zeigt die fachliche Umgebung des Systems und die wichtigsten externen Abhängigkeiten.

### Kontextdiagramm

\`\`\`
[Erstellen Sie ein Diagramm, das Ihr System und externe Systeme/Benutzer zeigt]
Sie können verwenden:
- Mermaid-Diagramme
- PlantUML
- ASCII-Art
- Oder referenzieren Sie ein Bild in /images/
\`\`\`

### Externe Schnittstellen

| Externes System | Schnittstelle | Zweck |
|-----------------|---------------|-------|
| [Externes System 1] | [API/Protokoll] | [Welche Daten/Funktionen ausgetauscht werden] |
| [Benutzertyp 1] | [UI/API] | [Wie Benutzer interagieren] |

### Unterstützte Geschäftsprozesse

<!-- Welche Geschäftsprozesse unterstützt dieses System? -->

1. **Prozess 1**: [Beschreibung]
   - Akteure: [Wer ist beteiligt]
   - Ablauf: [High-Level Ablauf]

2. **Prozess 2**: [Beschreibung]

## Technischer Kontext

**Zweck**: Zeigt technische Schnittstellen und Kanäle zwischen System und Umgebung.

### Technische Schnittstellen

| Schnittstelle | Technologie | Protokoll | Format |
|---------------|-------------|-----------|--------|
| [API 1] | [REST API] | [HTTPS] | [JSON] |
| [Datenbank] | [PostgreSQL] | [TCP/IP] | [SQL] |

### Kanäle und Übertragung

| Kanal | Technologie | Beschreibung |
|-------|-------------|--------------|
| [Message Queue] | [RabbitMQ] | [Asynchrone Kommunikation zwischen Services] |

### Mapping: Fachlich auf Technisch

| Fachlicher Kontext | Technische Realisierung |
|--------------------|------------------------|
| [Benutzeroberfläche] | [React SPA über HTTPS] |
| [Externes System A] | [REST API über HTTPS] |
`;
}

function getSolutionStrategyTemplate(): string {
  return `# 4. Lösungsstrategie

**Zweck**: Fasst die grundlegenden Entscheidungen und Lösungsstrategien zusammen, die die Systemarchitektur prägen.

## Zentrale Lösungsentscheidungen

### Architekturmuster

| Muster | Motivation | Konsequenzen |
|--------|------------|--------------|
| [z.B. Microservices] | [Warum dieses Muster gewählt wurde] | [Vorteile und Kompromisse] |

### Technologieentscheidungen

| Komponente | Technologie | Grund |
|------------|-------------|-------|
| Backend | [z.B. Node.js] | [Warum dies gewählt wurde] |
| Frontend | [z.B. React] | [Gründe] |
| Datenbank | [z.B. PostgreSQL] | [Gründe] |

### Top-Level Zerlegung

<!-- Wie ist das System auf höchster Ebene strukturiert? -->

\`\`\`
[High-Level Komponentendiagramm]
\`\`\`

Beschreibung:
- Komponente 1: [Zweck und Verantwortlichkeit]
- Komponente 2: [Zweck und Verantwortlichkeit]

## Erreichen der Qualitätsziele

### Mapping: Qualitätsziele auf Lösungsansätze

| Qualitätsziel | Lösungsansatz |
|---------------|---------------|
| [Performanz] | [Caching-Strategie, asynchrone Verarbeitung, CDN] |
| [Sicherheit] | [Authentifizierung, Autorisierung, Verschlüsselung] |
| [Skalierbarkeit] | [Horizontale Skalierung, Load Balancing] |

### Zentrale Designentscheidungen

1. **Entscheidung 1**: [z.B. Event-driven Architektur]
   - Grund: [Warum dieser Ansatz]
   - Auswirkung: [Wie es hilft, Qualitätsziele zu erreichen]

2. **Entscheidung 2**: [Beschreibung]
   - Grund: [Begründung]
   - Auswirkung: [Auswirkungen auf Qualitätsziele]

## Entwicklungsstrategie

- Entwicklungsansatz: [Agil, Scrum, etc.]
- Deployment-Strategie: [CI/CD, Blue-Green, etc.]
- Teststrategie: [Unit, Integration, E2E]
`;
}

function getBuildingBlockViewTemplate(): string {
  return `# 5. Bausteinsicht

**Zweck**: Statische Zerlegung des Systems in Bausteine und deren Beziehungen.

## Ebene 1: Systemkontext

### Whitebox: Gesamtsystem

**Zweck**: [Was macht das System]

\`\`\`
[Komponentendiagramm mit den wichtigsten Bausteinen]
\`\`\`

**Enthaltene Bausteine**:

| Komponente | Verantwortlichkeit |
|------------|-------------------|
| [Komponente 1] | [Was sie tut] |
| [Komponente 2] | [Was sie tut] |

**Wichtige Schnittstellen**:

| Schnittstelle | Beschreibung |
|---------------|--------------|
| [API 1] | [Zweck und Protokoll] |

## Ebene 2: Komponentendetails

### Komponente 1 (Whitebox)

**Zweck**: [Detaillierter Zweck]

**Schnittstellen**:
- Eingabe: [Was sie empfängt]
- Ausgabe: [Was sie produziert]

**Interne Struktur**:

\`\`\`
[Diagramm der internen Module/Klassen]
\`\`\`

**Enthaltene Elemente**:

| Element | Verantwortlichkeit |
|---------|-------------------|
| [Modul A] | [Zweck] |
| [Modul B] | [Zweck] |

### Komponente 2 (Whitebox)

[Ähnliche Struktur]

## Ebene 3: Detailansichten

<!-- Nur Ebene 3 für Komponenten einbeziehen, die zusätzliche Details benötigen -->

### Modul A Details

[Detaillierte Klassendiagramme, Paketstruktur, etc.]
`;
}

function getRuntimeViewTemplate(): string {
  return `# 6. Laufzeitsicht

**Zweck**: Zeigt das Verhalten und die Interaktion der Bausteine zur Laufzeit.

## Wichtige Szenarien

### Szenario 1: [Name, z.B. "Benutzer-Login"]

**Beschreibung**: [Was in diesem Szenario passiert]

**Sequenzdiagramm**:

\`\`\`mermaid
sequenceDiagram
    participant Benutzer
    participant Frontend
    participant API
    participant Datenbank

    Benutzer->>Frontend: Anmeldedaten eingeben
    Frontend->>API: POST /login
    API->>Datenbank: Anmeldedaten validieren
    Datenbank-->>API: Benutzerdaten
    API-->>Frontend: JWT-Token
    Frontend-->>Benutzer: Anmeldung erfolgreich
\`\`\`

**Schritte**:

1. Benutzer gibt Anmeldedaten ein
2. Frontend sendet Login-Anfrage
3. API validiert mit Datenbank
4. Token wird generiert und zurückgegeben
5. Benutzer ist authentifiziert

### Szenario 2: [Name]

[Ähnliche Struktur]

## Datenfluss

### Fluss 1: [Name]

**Zweck**: [Welche Daten wohin fließen]

**Diagramm**:

\`\`\`
[Datenflussdiagramm]
\`\`\`

**Beschreibung**:
- Schritt 1: [Was passiert]
- Schritt 2: [Was passiert]

## Zustandsautomaten

### Zustandsautomat für [Entität]

**Zustände**:
- Zustand 1: [Beschreibung]
- Zustand 2: [Beschreibung]

**Übergänge**:

| Von | Ereignis | Nach | Aktion |
|-----|----------|------|--------|
| [Zustand 1] | [Ereignis] | [Zustand 2] | [Was passiert] |
`;
}

function getDeploymentViewTemplate(): string {
  return `# 7. Verteilungssicht

**Zweck**: Beschreibt die technische Infrastruktur und wie Software verteilt wird.

## Infrastrukturübersicht

### Verteilungsdiagramm

\`\`\`
[Diagramm mit Servern, Containern, Netzwerken]
\`\`\`

## Umgebungen

### Produktionsumgebung

**Infrastruktur**:

| Komponente | Technologie | Konfiguration |
|------------|-------------|---------------|
| [Anwendungsserver] | [AWS ECS] | [Spezifikationen] |
| [Datenbank] | [RDS PostgreSQL] | [Spezifikationen] |
| [Cache] | [Redis] | [Spezifikationen] |

**Netzwerk**:
- VPC: [Konfiguration]
- Subnetze: [Public/Private Setup]
- Security Groups: [Regeln]

### Staging-Umgebung

[Ähnliche Struktur]

### Entwicklungsumgebung

[Ähnliche Struktur]

## Deployment-Strategie

### CI/CD Pipeline

1. **Build**: [Was passiert]
2. **Test**: [Automatisierte Tests]
3. **Deploy**: [Deployment-Prozess]

### Rollback-Strategie

[Wie Deployments zurückgerollt werden]

## Skalierungsstrategie

### Horizontale Skalierung

| Komponente | Skalierungsauslöser | Max. Instanzen |
|------------|---------------------|----------------|
| [API-Server] | [CPU > 70%] | [10] |

### Vertikale Skalierung

[Wann und wie vertikal skaliert wird]

## Monitoring und Betrieb

### Health Checks

| Komponente | Prüfung | Schwellwert |
|------------|---------|-------------|
| [API] | [/health Endpunkt] | [Antwortzeit < 1s] |

### Logging

- Log-Aggregation: [ELK, CloudWatch, etc.]
- Log-Aufbewahrung: [Richtlinie]

### Metriken

- Wichtige Metriken: [CPU, Speicher, Anfragerate]
- Alerting: [Alert-Bedingungen]
`;
}

function getConceptsTemplate(): string {
  return `# 8. Querschnittliche Konzepte

**Zweck**: Übergreifende Regelungen und Lösungsideen, die in mehreren Teilen des Systems relevant sind.

## Domänenmodelle

### Zentrale Domänenkonzepte

\`\`\`
[Domänenmodell-Diagramm oder Klassendiagramm]
\`\`\`

**Wichtige Entitäten**:

| Entität | Verantwortlichkeit | Beziehungen |
|---------|-------------------|-------------|
| [Entität 1] | [Zweck] | [Verwandte Entitäten] |

## Sicherheit

### Authentifizierung

- Methode: [JWT, OAuth2, etc.]
- Implementierung: [Wie es funktioniert]

### Autorisierung

- Modell: [RBAC, ABAC, etc.]
- Rollen: [Liste der Rollen und Berechtigungen]

### Datenschutz

- Verschlüsselung at rest: [Wie]
- Verschlüsselung in transit: [TLS-Version]
- Umgang mit sensiblen Daten: [Ansatz]

## Fehlerbehandlung

### Fehlerkategorien

| Kategorie | Behandlungsstrategie |
|-----------|---------------------|
| [Validierungsfehler] | [400 mit Details zurückgeben] |
| [Systemfehler] | [Loggen und 500 zurückgeben] |

### Fehlerantwort-Format

\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Lesbare Nachricht",
    "details": {}
  }
}
\`\`\`

## Logging und Monitoring

### Logging-Strategie

- Log-Level: [DEBUG, INFO, WARN, ERROR]
- Strukturiertes Logging: [JSON-Format]
- Korrelations-IDs: [Für Request-Tracing]

### Monitoring

- APM: [Application Performance Monitoring Tool]
- Metriken: [Wichtige Geschäfts- und technische Metriken]

## Konfigurationsmanagement

### Konfigurationsquellen

1. Umgebungsvariablen
2. Konfigurationsdateien
3. Secret Management: [Vault, AWS Secrets Manager]

### Konfiguration nach Umgebung

| Einstellung | Dev | Staging | Prod |
|-------------|-----|---------|------|
| [Log-Level] | [DEBUG] | [INFO] | [WARN] |

## Teststrategie

### Testebenen

| Ebene | Abdeckung | Tools |
|-------|-----------|-------|
| Unit Tests | [Ziel %] | [Framework] |
| Integrationstests | [Umfang] | [Tools] |
| E2E-Tests | [Wichtige Flows] | [Tools] |

### Testdaten-Management

[Wie Testdaten erstellt und verwaltet werden]

## Entwicklungskonzepte

### Code-Organisation

- Paketstruktur: [Ansatz]
- Namenskonventionen: [Standards]

### Build- und Dependency-Management

- Build-Tool: [Maven, Gradle, npm, etc.]
- Dependency-Management: [Strategie]

## Betriebskonzepte

### Backup und Recovery

- Backup-Frequenz: [Täglich, stündlich, etc.]
- Aufbewahrung: [Richtlinie]
- Recovery-Prozedur: [Schritte]

### Disaster Recovery

- RTO: [Recovery Time Objective]
- RPO: [Recovery Point Objective]
- DR-Strategie: [Ansatz]
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `# 9. Architekturentscheidungen

**Zweck**: Dokumentiert wichtige, teure, kritische oder riskante Architekturentscheidungen einschließlich Begründung.

## ADR-Format

Jede Entscheidung folgt dieser Struktur:
- **Kontext**: Was ist das Problem, das wir angehen?
- **Entscheidung**: Was wir beschlossen haben zu tun
- **Konsequenzen**: Was dadurch einfacher oder schwieriger wird

## Entscheidungsprotokoll

### ADR-001: [Entscheidungstitel]

**Datum**: [JJJJ-MM-TT]
**Status**: [Vorgeschlagen | Akzeptiert | Veraltet | Abgelöst]
**Entscheider**: [Namen]

**Kontext**:

[Beschreiben Sie die wirkenden Kräfte, technisch, politisch, sozial und projektspezifisch. Diese Kräfte stehen wahrscheinlich in Spannung zueinander und sollten als solche benannt werden.]

**Entscheidung**:

[Beschreiben Sie unsere Reaktion auf diese Kräfte. Hier treffen wir unsere Entscheidung.]

**Konsequenzen**:

Positiv:
- [Vorteil 1]
- [Vorteil 2]

Negativ:
- [Kompromiss 1]
- [Kompromiss 2]

Risiken:
- [Risiko 1 und Mitigation]

### ADR-002: [Weitere Entscheidung]

[Ähnliche Struktur]

## Entscheidungskategorien

### Strukturelle Entscheidungen

| Entscheidung | Begründung | Datum |
|--------------|------------|-------|
| [Microservices vs Monolith] | [Warum gewählt] | [Datum] |

### Technologieentscheidungen

| Komponente | Technologie | Betrachtete Alternative | Warum gewählt |
|------------|-------------|------------------------|---------------|
| [Backend] | [Node.js] | [Python, Java] | [Gründe] |

### Prozessentscheidungen

| Entscheidung | Auswirkung | Datum |
|--------------|------------|-------|
| [Agile Methodik] | [Wie es die Architektur beeinflusst] | [Datum] |

## Veraltete Entscheidungen

| Entscheidung | Datum veraltet | Grund | Abgelöst durch |
|--------------|----------------|-------|----------------|
| [Alte Entscheidung] | [Datum] | [Warum veraltet] | [ADR-XXX] |
`;
}

function getQualityRequirementsTemplate(): string {
  return `# 10. Qualitätsanforderungen

**Zweck**: Definiert Qualitätsanforderungen mit konkreten Szenarien.

## Qualitätsbaum

### Top-Level Qualitätsziele

\`\`\`
Qualität
├── Performanz
│   ├── Antwortzeit
│   └── Durchsatz
├── Sicherheit
│   ├── Authentifizierung
│   └── Datenschutz
├── Zuverlässigkeit
│   ├── Verfügbarkeit
│   └── Fehlertoleranz
└── Wartbarkeit
    ├── Testbarkeit
    └── Modifizierbarkeit
\`\`\`

## Qualitätsszenarien

### Performanz-Szenarien

**Szenario 1: Normale Last Antwortzeit**

| Aspekt | Beschreibung |
|--------|--------------|
| Szenario | Benutzer fragt Daten unter normaler Last ab |
| Quelle | Endbenutzer |
| Stimulus | HTTP-Anfrage an API |
| Umgebung | Normaler Betrieb, 100 gleichzeitige Benutzer |
| Antwort | System gibt Daten zurück |
| Maß | 95. Perzentil Antwortzeit < 200ms |

**Szenario 2: Spitzenlast-Handling**

| Aspekt | Beschreibung |
|--------|--------------|
| Szenario | System unter Spitzenlast |
| Quelle | Mehrere Benutzer |
| Stimulus | 1000 gleichzeitige Anfragen |
| Umgebung | Spitzenzeiten |
| Antwort | System verarbeitet alle Anfragen |
| Maß | Keine Anfrage schlägt fehl, Antwortzeit < 1s |

### Sicherheits-Szenarien

**Szenario 3: Unberechtigter Zugriffsversuch**

| Aspekt | Beschreibung |
|--------|--------------|
| Szenario | Unberechtigter Benutzer versucht auf geschützte Ressource zuzugreifen |
| Quelle | Externer Angreifer |
| Stimulus | HTTP-Anfrage ohne gültiges Token |
| Umgebung | Normaler Betrieb |
| Antwort | System verweigert Zugriff |
| Maß | Gibt 401 zurück, protokolliert Versuch, keine Daten exponiert |

### Zuverlässigkeits-Szenarien

**Szenario 4: Service-Ausfall Recovery**

| Aspekt | Beschreibung |
|--------|--------------|
| Szenario | Datenbankverbindung schlägt fehl |
| Quelle | Infrastrukturausfall |
| Stimulus | Datenbank wird nicht verfügbar |
| Umgebung | Normaler Betrieb |
| Antwort | System arbeitet mit gecachten Daten weiter |
| Maß | Service-Degradation < 5%, Recovery < 30s |

### Wartbarkeits-Szenarien

**Szenario 5: Neues Feature hinzufügen**

| Aspekt | Beschreibung |
|--------|--------------|
| Szenario | Entwickler fügt neuen API-Endpunkt hinzu |
| Quelle | Entwicklungsteam |
| Stimulus | Neue Anforderung |
| Umgebung | Entwicklung |
| Antwort | Feature wird hinzugefügt |
| Maß | < 2 Tage, < 5 Dateien modifiziert, Tests bestehen |

## Qualitätsanforderungen Priorisierung

| Qualitätsattribut | Priorität | Zielmaß |
|-------------------|-----------|---------|
| Verfügbarkeit | Hoch | 99,9% Uptime |
| Antwortzeit | Hoch | < 200ms (p95) |
| Sicherheit | Kritisch | Null Datenverletzungen |
| Wartbarkeit | Mittel | Testabdeckung > 80% |
| Benutzbarkeit | Mittel | Benutzeraufgaben-Erfolg > 95% |
`;
}

function getTechnicalRisksTemplate(): string {
  return `# 11. Risiken und technische Schulden

**Zweck**: Dokumentiert bekannte Probleme, Risiken und technische Schulden.

## Risiken

### Risikobewertungsmatrix

| Risiko | Wahrscheinlichkeit | Auswirkung | Schwere | Status |
|--------|-------------------|------------|---------|--------|
| [Risiko 1] | [Hoch/Mittel/Niedrig] | [Hoch/Mittel/Niedrig] | [Kritisch/Hoch/Mittel/Niedrig] | [Offen/Gemildert] |

### Detaillierte Risiken

**Risiko 1: [Risikotitel]**

- **Beschreibung**: [Was ist das Risiko]
- **Wahrscheinlichkeit**: [Hoch/Mittel/Niedrig]
- **Auswirkung**: [Hoch/Mittel/Niedrig - und was passiert]
- **Mitigation**: [Was wir dagegen tun]
- **Notfallplan**: [Plan falls Risiko eintritt]
- **Verantwortlicher**: [Wer ist verantwortlich]
- **Status**: [Offen/Wird gemildert/Geschlossen]

**Risiko 2: [Titel]**

[Ähnliche Struktur]

## Technische Schulden

### Schulden-Einträge

| Eintrag | Typ | Auswirkung | Aufwand | Priorität |
|---------|-----|------------|---------|-----------|
| [Schuld 1] | [Code/Architektur/Testing] | [Hoch/Mittel/Niedrig] | [Tage] | [1-5] |

### Detaillierte Schulden-Einträge

**Schuld 1: [Titel]**

- **Beschreibung**: [Was muss behoben werden]
- **Warum es existiert**: [Wie ist das passiert]
- **Auswirkung**: [Welche Probleme verursacht es]
- **Vorgeschlagene Lösung**: [Wie es zu beheben ist]
- **Aufwandsschätzung**: [Benötigte Zeit]
- **Priorität**: [Wann sollten wir es beheben]

### Schuldenabbauplan

| Quartal | Zu adressierende Schulden | Erwartete Auswirkung |
|---------|---------------------------|---------------------|
| Q1 2024 | [Einträge 1, 2] | [Verbesserung in X] |

## Bekannte Probleme

### Offene Probleme

| Problem | Schwere | Workaround | Ziel-Behebungsdatum |
|---------|---------|------------|---------------------|
| [Problem 1] | [Hoch/Mittel/Niedrig] | [Falls vorhanden] | [Datum] |

### Einschränkungen

| Einschränkung | Auswirkung | Begründung | Zukunftspläne |
|---------------|------------|------------|---------------|
| [Einschränkung 1] | [Effekt] | [Warum sie existiert] | [Wann/ob zu adressieren] |

## Sicherheitslücken

### Bekannte Schwachstellen

| CVE | Komponente | Schwere | Status | Mitigation |
|-----|------------|---------|--------|------------|
| [CVE-ID] | [Bibliothek] | [Kritisch/Hoch/Mittel] | [Offen/Behoben] | [Ergriffene Maßnahmen] |

## Performanz-Probleme

| Problem | Auswirkung | Workaround | Lösungsplan |
|---------|------------|------------|-------------|
| [Problem] | [Auswirkung auf Benutzer] | [Temporäre Lösung] | [Permanente Lösung] |
`;
}

function getGlossaryTemplate(): string {
  return `# 12. Glossar

**Zweck**: Definiert wichtige fachliche und technische Begriffe, um einheitliche Terminologie sicherzustellen.

## Fachliche Begriffe

| Begriff | Definition |
|---------|------------|
| [Fachbegriff 1] | [Klare, präzise Definition] |
| [Fachbegriff 2] | [Definition] |

## Technische Begriffe

| Begriff | Definition | Synonyme |
|---------|------------|----------|
| [Technischer Begriff 1] | [Definition] | [Alternative Namen] |
| [Technischer Begriff 2] | [Definition] | [Alternative Namen] |

## Abkürzungen und Akronyme

| Abkürzung | Vollständiger Name | Kontext |
|-----------|-------------------|---------|
| API | Application Programming Interface | [Wann/wo verwendet] |
| SLA | Service Level Agreement | [Kontext] |
| JWT | JSON Web Token | [Verwendung] |

## Geschäftskonzepte

| Konzept | Beschreibung | Verwandte Begriffe |
|---------|--------------|-------------------|
| [Konzept 1] | [Detaillierte Erklärung] | [Verwandte Konzepte] |

## Systemspezifische Begriffe

| Begriff | Definition | Beispiel |
|---------|------------|----------|
| [Systembegriff 1] | [Was es in diesem System bedeutet] | [Verwendungsbeispiel] |

## Veraltete Begriffe

| Alter Begriff | Ersetzt durch | Grund |
|---------------|---------------|-------|
| [Alter Begriff] | [Neuer Begriff] | [Warum geändert] |

---

**Hinweis**: Halten Sie dieses Glossar aktuell, wenn neue Begriffe auftauchen. Verlinken Sie aus anderen Teilen der Dokumentation auf diesen Abschnitt, wenn diese Begriffe verwendet werden.
`;
}

/**
 * Get the German workflow guide
 */
export function getWorkflowGuide(): string {
  return `# arc42 Architektur-Dokumentation Workflow-Leitfaden

## Übersicht

Dieser Leitfaden hilft Ihnen, Ihre Softwarearchitektur mit dem arc42-Template zu dokumentieren. Das arc42-Template ist ein praktisches, bewährtes Template für die Dokumentation von Software- und Systemarchitekturen.

## Verfügbare Sprachen

Dieser arc42 MCP Server unterstützt mehrere Sprachen für die Dokumentation:

| Code | Sprache | Nativname |
|------|---------|-----------|
| EN | Englisch | English |
| DE | Deutsch | Deutsch |
| CZ | Tschechisch | Čeština |
| ES | Spanisch | Español |
| FR | Französisch | Français |
| IT | Italienisch | Italiano |
| NL | Niederländisch | Nederlands |
| PT | Portugiesisch | Português |
| RU | Russisch | Русский |
| UKR | Ukrainisch | Українська |
| ZH | Chinesisch | 中文 |

## Erste Schritte

### Schritt 1: Workspace initialisieren

Verwenden Sie das \`arc42-init\`-Tool, um Ihren Dokumentations-Workspace zu erstellen:

\`\`\`
arc42-init(projectName: "Mein Projekt", language: "DE")
\`\`\`

Sie können eine andere Sprache mit dem ISO-Sprachcode angeben.

### Schritt 2: Status prüfen

Verwenden Sie \`arc42-status\`, um den aktuellen Stand Ihrer Dokumentation zu sehen:

\`\`\`
arc42-status()
\`\`\`

### Schritt 3: Abschnitts-Templates generieren

Verwenden Sie \`generate-template\`, um detaillierte Templates für jeden Abschnitt zu erhalten:

\`\`\`
generate-template(section: "01_introduction_and_goals", language: "DE")
\`\`\`

## Die 12 arc42-Abschnitte

1. **Einführung und Ziele** - Beginnen Sie hier! Definieren Sie, was Sie bauen und warum.
2. **Randbedingungen** - Was dürfen Sie NICHT tun?
3. **Kontextabgrenzung** - Was ist drin und was ist draußen?
4. **Lösungsstrategie** - High-Level Ansatz zur Problemlösung.
5. **Bausteinsicht** - Statische Struktur Ihres Systems.
6. **Laufzeitsicht** - Dynamisches Verhalten und Szenarien.
7. **Verteilungssicht** - Wie wird es deployed und betrieben?
8. **Querschnittliche Konzepte** - Muster, die im gesamten System verwendet werden.
9. **Architekturentscheidungen** - Wichtige Entscheidungen und ihre Begründung.
10. **Qualitätsanforderungen** - Konkrete Qualitätsszenarien.
11. **Risiken und technische Schulden** - Was könnte schiefgehen?
12. **Glossar** - Definieren Sie Ihre Begriffe.

## Best Practices

1. **Beginnen Sie mit Abschnitt 1** - Das Verständnis der Ziele ist fundamental
2. **Halten Sie es kurz** - arc42 ist pragmatisch, nicht bürokratisch
3. **Verwenden Sie Diagramme** - Ein Bild sagt mehr als tausend Worte
4. **Dokumentieren Sie Entscheidungen** - Ihr zukünftiges Ich wird Ihnen danken
5. **Iterieren Sie** - Architekturdokumentation ist nie "fertig"

## Verfügbare Tools

- \`arc42-init\` - Dokumentations-Workspace initialisieren
- \`arc42-status\` - Dokumentationsstatus prüfen
- \`generate-template\` - Abschnitts-Templates generieren
- \`update-section\` - Abschnittsinhalte aktualisieren
- \`get-section\` - Abschnittsinhalte lesen
- \`arc42-workflow-guide\` - Diesen Leitfaden anzeigen

## Ressourcen

- [arc42 Website](https://arc42.org/)
- [arc42 Dokumentation](https://docs.arc42.org/)
- [arc42 Beispiele](https://arc42.org/examples)
`;
}

/**
 * Get the German README content
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Projekt';
  return `# ${name} - Architektur-Dokumentation

Dieses Verzeichnis enthält die Architekturdokumentation für ${name}, basierend auf dem arc42-Template.

## Struktur

- \`sections/\` - Einzelne Abschnitts-Markdown-Dateien (12 Abschnitte)
- \`images/\` - Diagramme und Bilder
- \`arc42-template.md\` - Kombinierte Hauptdokumentation
- \`config.yaml\` - Konfiguration

## Die 12 arc42-Abschnitte

1. **Einführung und Ziele** - Anforderungen, Qualitätsziele, Stakeholder
2. **Randbedingungen** - Technische und organisatorische Randbedingungen
3. **Kontextabgrenzung** - Fachlicher und technischer Kontext
4. **Lösungsstrategie** - Grundlegende Entscheidungen und Strategien
5. **Bausteinsicht** - Statische Zerlegung
6. **Laufzeitsicht** - Dynamisches Verhalten
7. **Verteilungssicht** - Infrastruktur und Deployment
8. **Querschnittliche Konzepte** - Übergreifende Regelungen und Ansätze
9. **Architekturentscheidungen** - Wichtige Entscheidungen (ADRs)
10. **Qualitätsanforderungen** - Qualitätsbaum und Szenarien
11. **Risiken und technische Schulden** - Bekannte Probleme und Risiken
12. **Glossar** - Wichtige Begriffe

## Erste Schritte

1. Beginnen Sie mit Abschnitt 1: Einführung und Ziele
2. Arbeiten Sie die Abschnitte iterativ durch
3. Verwenden Sie Diagramme zur Veranschaulichung von Konzepten
4. Konzentrieren Sie sich auf Entscheidungen, nicht auf Implementierungsdetails

## Dokumentation generieren

Verwenden Sie die MCP-Tools für:
- Status prüfen: \`arc42-status\`
- Templates generieren: \`generate-template\`
- Abschnitte aktualisieren: \`update-section\`

## Ressourcen

- [arc42 Website](https://arc42.org/)
- [arc42 Dokumentation](https://docs.arc42.org/)
- [arc42 Beispiele](https://arc42.org/examples)
`;
}
