/**
 * German Templates - AsciiDoc Format
 *
 * Contains all arc42 section templates in German using AsciiDoc syntax.
 * Based on the official arc42 templates from vendor/arc42-template/DE/adoc.
 *
 * @module templates/locales/de/templates-asciidoc
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the German AsciiDoc template for a specific section
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
  return `= 1. Einfuehrung und Ziele

== Aufgabenstellung

*Inhalt*: Kurzbeschreibung der fachlichen Aufgabenstellung, treibenden Kraefte, Extrakt (oder Abstract) der Anforderungen.
Verweis auf (hoffentlich vorliegende) Anforderungsdokumente (mit Versionsbezeichnungen und Ablageorten).

*Motivation*: Aus Sicht der spaeteren Nutzung ist die Unterstuetzung einer fachlichen Aufgabe oder Verbesserung der Qualitaet der eigentliche Beweggrund, ein neues System zu schaffen oder ein bestehendes zu modifizieren.

=== Wesentliche Anforderungen

// Listen Sie die Top 3-5 funktionalen Anforderungen auf

[options="header",cols="1,3,1"]
|===
|ID |Anforderung |Prioritaet
|ANF-1 |[Kurze Beschreibung] |Hoch
|ANF-2 |[Kurze Beschreibung] |Mittel
|===

=== Features

// Wesentliche Features des Systems

* Feature 1: [Beschreibung]
* Feature 2: [Beschreibung]

== Qualitaetsziele

*Inhalt*: Die Top-3 bis Top-5 der Qualitaetsanforderungen fuer die Architektur, deren Erfuellung oder Einhaltung den massgeblichen Stakeholdern besonders wichtig sind.
Gemeint sind hier wirklich Qualitaetsziele, die nicht unbedingt mit den Zielen des Projekts uebereinstimmen.

// Basierend auf ISO 25010, priorisieren Sie Qualitaeten wie:
// Performance, Sicherheit, Zuverlaessigkeit, Wartbarkeit, Benutzbarkeit, etc.

[options="header",cols="1,2,3"]
|===
|Prioritaet |Qualitaetsziel |Motivation
|1 |[z.B. Performance] |[Warum dies kritisch ist]
|2 |[z.B. Sicherheit] |[Warum dies kritisch ist]
|3 |[z.B. Wartbarkeit] |[Warum dies kritisch ist]
|===

== Stakeholder

*Inhalt*: Expliziter Ueberblick ueber die Stakeholder des Systems - ueber alle Personen, Rollen oder Organisationen -, die die Architektur kennen sollten oder von der Architektur ueberzeugt werden muessen, mit der Architektur oder dem Code arbeiten, die Dokumentation der Architektur fuer ihre eigene Arbeit benoetigen, oder Entscheidungen ueber das System und dessen Entwicklung treffen.

[options="header",cols="1,1,2"]
|===
|Rolle |Kontakt |Erwartungshaltung
|Product Owner |[Name/Email] |[Was sie von der Architektur erwarten]
|Entwicklungsteam |[Teamname] |[Was sie wissen muessen]
|Betrieb |[Team/Person] |[Deployment- und Betriebsbelange]
|Endbenutzer |[Typ] |[User-Experience-Erwartungen]
|===

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-1/[Einfuehrung und Ziele] in der arc42 Dokumentation.
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `= 2. Randbedingungen

*Inhalt*: Randbedingungen und Vorgaben, die ihre Freiheiten bezueglich Entwurf, Implementierung oder Ihres Entwicklungsprozesses einschraenken.
Diese Randbedingungen gelten manchmal organisations- oder firmenweit ueber die Grenzen einzelner Systeme hinweg.

*Motivation*: Fuer eine tragfaehige Architektur sollten Sie genau wissen, wo Ihre Freiheitsgrade bezueglich der Entwurfsentscheidungen liegen und wo Sie Randbedingungen beachten muessen.

== Technische Randbedingungen

[options="header",cols="1,3"]
|===
|Randbedingung |Erlaeuterung
|[z.B. Muss auf Linux laufen] |[Warum diese Einschraenkung existiert]
|[z.B. Java 17 minimum] |[Organisatorische Anforderung]
|===

== Organisatorische Randbedingungen

[options="header",cols="1,3"]
|===
|Randbedingung |Erlaeuterung
|[z.B. Teamgroesse: 5 Entwickler] |[Auswirkung auf die Architektur]
|[z.B. Zeitrahmen: 6 Monate] |[Liefereinschraenkungen]
|===

== Konventionen

[options="header",cols="1,3"]
|===
|Konvention |Erlaeuterung
|[z.B. Code-Stil: Google Java Style] |[Link zur Style-Guide]
|[z.B. Dokumentation: arc42] |[Dokumentationsanforderungen]
|===

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-2/[Randbedingungen] in der arc42 Dokumentation.
`;
}

function getContextAndScopeTemplate(): string {
  return `= 3. Kontextabgrenzung

*Inhalt*: Die Kontextabgrenzung grenzt das System gegen alle Kommunikationspartner (Nachbarsysteme und Benutzerrollen) ab.
Sie legt damit die externen Schnittstellen fest und zeigt damit auch die Verantwortlichkeit (Scope) Ihres Systems.

== Fachlicher Kontext

*Inhalt*: Festlegung *aller* Kommunikationsbeziehungen (Nutzer, IT-Systeme, ...) mit Erklaerung der fachlichen Ein- und Ausgabedaten oder Schnittstellen.

// Fuegen Sie hier ein Kontextdiagramm ein (PlantUML, Mermaid, oder Bild)

[plantuml, fachlicher-kontext, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(benutzer, "Benutzer", "Systembenutzer")
System(system, "Ihr System", "Beschreibung")
System_Ext(extern, "Externes System", "Beschreibung")

Rel(benutzer, system, "Nutzt")
Rel(system, extern, "Ruft auf")
@enduml
----

[options="header",cols="1,2,2"]
|===
|Kommunikationsbeziehung |Eingabe |Ausgabe
|[Benutzer/Systemname] |[Was sie senden] |[Was sie empfangen]
|===

== Technischer Kontext

*Inhalt*: Technische Schnittstellen (Kanaele, Uebertragungsmedien) zwischen dem System und seiner Umwelt.

// Technische Infrastruktur mit Protokollen

[options="header",cols="1,1,2"]
|===
|Partner |Kanal |Protokoll
|[Systemname] |[z.B. REST API] |[z.B. HTTPS, JSON]
|[Systemname] |[z.B. Message Queue] |[z.B. AMQP]
|===

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-3/[Kontextabgrenzung] in der arc42 Dokumentation.
`;
}

function getSolutionStrategyTemplate(): string {
  return `= 4. Loesungsstrategie

*Inhalt*: Kurzer Ueberblick ueber die grundlegenden Entscheidungen und Loesungsansaetze, die Entwurf und Implementierung des Systems praegen.

Hierzu gehoeren:

* Technologieentscheidungen
* Entscheidungen ueber die Top-Level-Zerlegung des Systems
* Entscheidungen zur Erreichung der wichtigsten Qualitaetsanforderungen
* Relevante organisatorische Entscheidungen

== Technologieentscheidungen

[options="header",cols="1,2,2"]
|===
|Entscheidung |Wahl |Begruendung
|Programmiersprache |[z.B. TypeScript] |[Warum diese Wahl]
|Framework |[z.B. NestJS] |[Warum diese Wahl]
|Datenbank |[z.B. PostgreSQL] |[Warum diese Wahl]
|===

== Top-Level-Zerlegung

Beschreiben Sie die High-Level-Struktur:

* [z.B. Schichtenarchitektur]
* [z.B. Microservices]
* [z.B. Event-driven]

== Strategien zur Erreichung der Qualitaetsziele

[options="header",cols="1,2"]
|===
|Qualitaetsziel |Erreichungsstrategie
|[Performance] |[z.B. Caching, asynchrone Verarbeitung]
|[Sicherheit] |[z.B. OAuth2, Verschluesselung]
|[Wartbarkeit] |[z.B. Clean Architecture, umfassende Tests]
|===

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-4/[Loesungsstrategie] in der arc42 Dokumentation.
`;
}

function getBuildingBlockViewTemplate(): string {
  return `= 5. Bausteinsicht

*Inhalt*: Die Bausteinsicht zeigt die statische Zerlegung des Systems in Bausteine (Module, Komponenten, Subsysteme, Klassen, Schnittstellen, Pakete, Bibliotheken, Frameworks, Schichten, Partitionen, Tiers, Funktionen, Makros, Operationen, Datenstrukturen, ...) sowie deren Abhaengigkeiten.

Diese Sicht sollte in jeder Architekturdokumentation vorhanden sein.
In der Analogie zum Hausbau bildet die Bausteinsicht den _Grundrissplan_.

== Ebene 1: Whitebox Gesamtsystem

*Inhalt*: Die Whitebox-Beschreibung zeigt die interne Struktur des Gesamtsystems.

=== Whitebox-Beschreibung

// Fuegen Sie hier ein Komponentendiagramm ein

[plantuml, bausteine-e1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Container(web, "Webanwendung", "React", "Benutzeroberflaeche")
Container(api, "API Server", "Node.js", "Geschaeftslogik")
ContainerDb(db, "Datenbank", "PostgreSQL", "Datenspeicherung")

Rel(web, api, "Ruft auf", "REST/JSON")
Rel(api, db, "Liest/Schreibt", "SQL")
@enduml
----

=== Enthaltene Bausteine

[options="header",cols="1,3"]
|===
|Baustein |Beschreibung
|[Komponente A] |[Verantwortung und Zweck]
|[Komponente B] |[Verantwortung und Zweck]
|===

==== <Name Blackbox 1>

_<Zweck/Verantwortung>_

_<Schnittstelle(n)>_

_<(Optional) Qualitaets-/Leistungsmerkmale>_

==== <Name Blackbox 2>

_<Blackbox-Template>_

== Ebene 2

*Inhalt*: Beschreiben Sie den inneren Aufbau (einiger) Bausteine aus Ebene 1 als Whitebox.

=== Whitebox _<Baustein 1>_

[options="header",cols="1,3"]
|===
|Baustein |Beschreibung
|[Sub-Komponente A.1] |[Verantwortung]
|[Sub-Komponente A.2] |[Verantwortung]
|===

=== Whitebox _<Baustein 2>_

_<Whitebox-Template>_

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-5/[Bausteinsicht] in der arc42 Dokumentation.
`;
}

function getRuntimeViewTemplate(): string {
  return `= 6. Laufzeitsicht

*Inhalt*: Diese Sicht erklaert konkrete Ablaeufe und Beziehungen zwischen Bausteinen in Form von Szenarien aus den folgenden Bereichen:

* Wichtige Ablaeufe oder _Features_: Wie fuehren die Bausteine der Architektur die wichtigsten Ablaeufe durch?
* Interaktionen an kritischen externen Schnittstellen: Wie arbeiten Bausteine mit Nutzern und Nachbarsystemen zusammen?
* Betrieb und Administration: Inbetriebnahme, Start, Stop.
* Fehler- und Ausnahmeszenarien

== Szenario 1: [z.B. Benutzeranmeldung]

// Beschreiben Sie das Laufzeitverhalten fuer ein wichtiges Szenario

[plantuml, laufzeit-anmeldung, svg]
----
@startuml
actor Benutzer
participant "Webanwendung" as Web
participant "API Server" as API
participant "Auth-Service" as Auth
database "Benutzer-DB" as DB

Benutzer -> Web: Anmeldedaten eingeben
Web -> API: POST /auth/login
API -> Auth: Anmeldedaten validieren
Auth -> DB: Benutzer abfragen
DB --> Auth: Benutzerdaten
Auth --> API: JWT Token
API --> Web: Erfolg + Token
Web --> Benutzer: Dashboard
@enduml
----

=== Beschreibung

. Benutzer gibt Anmeldedaten in der Webanwendung ein
. Webanwendung sendet Login-Anfrage an API Server
. API validiert Anmeldedaten gegen Auth-Service
. Bei Erfolg wird JWT Token zurueckgegeben

== Szenario 2: [z.B. Datenverarbeitung]

// Dokumentieren Sie ein weiteres wichtiges Laufzeitszenario

=== Beschreibung

[Beschreiben Sie die Schritte und Interaktionen]

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-6/[Laufzeitsicht] in der arc42 Dokumentation.
`;
}

function getDeploymentViewTemplate(): string {
  return `= 7. Verteilungssicht

*Inhalt*: Die Verteilungssicht beschreibt die technische Infrastruktur, auf der Ihr System ausgefuehrt wird, mit Infrastrukturelementen wie Standorten, Umgebungen, Rechnern, Prozessoren, Kanaelen und Netztopologien sowie sonstigen Bestandteilen, und die Abbildung von (Software-)Bausteinen auf diese Infrastruktur.

== Infrastruktur Ebene 1

*Inhalt*: Ueberblick ueber die Deployment-Infrastruktur.

[plantuml, verteilung-e1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

Deployment_Node(cloud, "Cloud Provider", "AWS/Azure/GCP") {
    Deployment_Node(web_tier, "Web Tier") {
        Container(web, "Web Server", "nginx", "Statische Dateien + Reverse Proxy")
    }
    Deployment_Node(app_tier, "Application Tier") {
        Container(api, "API Server", "Node.js", "Geschaeftslogik")
    }
    Deployment_Node(data_tier, "Data Tier") {
        ContainerDb(db, "Datenbank", "PostgreSQL", "Primaerspeicher")
    }
}
@enduml
----

=== Begruendung

[Warum diese Deployment-Architektur gewaehlt wurde]

=== Qualitaets- und/oder Leistungsmerkmale

[Wie dieses Deployment die Qualitaetsziele unterstuetzt]

=== Zuordnung von Bausteinen zu Infrastruktur

[Beschreibung der Zuordnung]

== Infrastruktur Ebene 2

*Inhalt*: Detaillierte Ansicht spezifischer Deployment-Knoten.

=== [Knotenname]

[options="header",cols="1,3"]
|===
|Aspekt |Beschreibung
|Hardware |[z.B. 4 vCPU, 16GB RAM]
|Software |[z.B. Ubuntu 22.04, Docker 24.x]
|Netzwerk |[z.B. VPC, Security Groups]
|===

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-7/[Verteilungssicht] in der arc42 Dokumentation.
`;
}

function getConceptsTemplate(): string {
  return `= 8. Querschnittliche Konzepte

*Inhalt*: Dieser Abschnitt beschreibt uebergreifende, prinzipielle Regelungen und Loesungsansaetze, die an mehreren Stellen (=_querschnittlich_) relevant sind.

Solche Konzepte betreffen oft mehrere Bausteine.

== Domaenenmodell

// Kern-Domaenenkonzepte und ihre Beziehungen

[plantuml, domaenenmodell, svg]
----
@startuml
class Benutzer {
  +id: UUID
  +email: String
  +name: String
}
class Bestellung {
  +id: UUID
  +status: BestellStatus
  +erstelltAm: DateTime
}
Benutzer "1" -- "*" Bestellung : erteilt
@enduml
----

== Sicherheitskonzept

=== Authentifizierung

[Beschreiben Sie den Authentifizierungsansatz: JWT, OAuth2, etc.]

=== Autorisierung

[Beschreiben Sie den Autorisierungsansatz: RBAC, ABAC, etc.]

== Fehlerbehandlung

[Beschreiben Sie, wie Fehler systemweit behandelt werden]

* [z.B. Globaler Error Handler]
* [z.B. Strukturierte Fehlerantworten]
* [z.B. Fehlerprotokollierungsstrategie]

== Logging und Monitoring

[options="header",cols="1,2"]
|===
|Aspekt |Ansatz
|Logging |[z.B. Strukturierte JSON Logs, ELK Stack]
|Metriken |[z.B. Prometheus, Grafana]
|Tracing |[z.B. OpenTelemetry, Jaeger]
|===

== Teststrategie

[options="header",cols="1,2,1"]
|===
|Typ |Umfang |Abdeckungsziel
|Unit Tests |Einzelne Funktionen/Klassen |80%
|Integrationstests |Komponenteninteraktionen |Wichtige Pfade
|E2E Tests |Vollstaendige User Journeys |Kritische Ablaeufe
|===

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-8/[Querschnittliche Konzepte] in der arc42 Dokumentation.
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `= 9. Architekturentscheidungen

*Inhalt*: Wichtige, teure, grosse oder riskante Architektur- oder Entwurfsentscheidungen inklusive der jeweiligen Begruendungen.
Mit "Entscheidungen" meinen wir hier die Auswahl einer von mehreren Alternativen unter vorgegebenen Kriterien.

== ADR-001: [Entscheidungstitel]

=== Status

[Vorgeschlagen | Akzeptiert | Veraltet | Ersetzt]

=== Kontext

[Beschreiben Sie das Problem, das diese Entscheidung motiviert]

=== Entscheidung

[Beschreiben Sie die getroffene Entscheidung]

=== Konsequenzen

*Positiv:*

* [Vorteil 1]
* [Vorteil 2]

*Negativ:*

* [Nachteil 1]
* [Nachteil 2]

=== Betrachtete Alternativen

[options="header",cols="1,2,2"]
|===
|Alternative |Vorteile |Nachteile
|[Option A] |[Vorteile] |[Nachteile]
|[Option B] |[Vorteile] |[Nachteile]
|===

'''

== ADR-002: [Entscheidungstitel]

// Verwenden Sie dasselbe Template fuer weitere Entscheidungen

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-9/[Architekturentscheidungen] in der arc42 Dokumentation.
`;
}

function getQualityRequirementsTemplate(): string {
  return `= 10. Qualitaetsanforderungen

*Inhalt*: Dieser Abschnitt enthaelt alle relevanten Qualitaetsanforderungen.
Die wichtigsten davon haben Sie bereits in Abschnitt 1.2 (Qualitaetsziele) hervorgehoben.

== Uebersicht der Qualitaetsanforderungen

// Visuelle Darstellung der Qualitaetsziele und ihrer Verfeinerungen

[plantuml, qualitaetsbaum, svg]
----
@startmindmap
* Qualitaet
** Performance
*** Antwortzeit
*** Durchsatz
** Sicherheit
*** Authentifizierung
*** Autorisierung
** Wartbarkeit
*** Modularitaet
*** Testbarkeit
@endmindmap
----

== Qualitaetsszenarien

=== Performance-Szenarien

[options="header",cols="1,2,1,1"]
|===
|ID |Szenario |Erwartete Antwort |Prioritaet
|PERF-1 |Benutzer fordert Dashboard unter normaler Last an |< 200ms |Hoch
|PERF-2 |System verarbeitet 1000 gleichzeitige Benutzer |Keine Verschlechterung |Mittel
|===

=== Sicherheits-Szenarien

[options="header",cols="1,2,1,1"]
|===
|ID |Szenario |Erwartetes Verhalten |Prioritaet
|SEC-1 |Ungueltiger Anmeldeversuch |Kontosperre nach 5 Versuchen |Hoch
|SEC-2 |Unautorisierter API-Zugriff |401 Antwort, Audit protokolliert |Hoch
|===

=== Wartbarkeits-Szenarien

[options="header",cols="1,2,1,1"]
|===
|ID |Szenario |Erwarteter Aufwand |Prioritaet
|MAINT-1 |Neuen Entity-Typ hinzufuegen |< 2 Tage Entwicklung |Mittel
|MAINT-2 |Abhaengigkeitsversion aktualisieren |< 4 Stunden inkl. Tests |Mittel
|===

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-10/[Qualitaetsanforderungen] in der arc42 Dokumentation.
`;
}

function getTechnicalRisksTemplate(): string {
  return `= 11. Risiken und technische Schulden

*Inhalt*: Eine nach Prioritaeten geordnete Liste der erkannten Architekturrisiken und/oder technischen Schulden.

"Risikomanagement ist Projektmanagement fuer Erwachsene."
-- Tim Lister, Atlantic Systems Guild

== Technische Risiken

[options="header",cols="1,2,1,2"]
|===
|Risiko |Beschreibung |Wahrscheinlichkeit |Massnahme
|[z.B. Ausfall externer API] |[Externer Service, von dem wir abhaengen] |Mittel |[Circuit Breaker, Fallback]
|[z.B. Datenverlust] |[Datenbankkorruption] |Niedrig |[Backups, Replikation]
|===

== Technische Schulden

[options="header",cols="1,2,1,1"]
|===
|Element |Beschreibung |Auswirkung |Prioritaet
|[z.B. Legacy-Authentifizierung] |[Altes Auth-System muss ersetzt werden] |Hoch |Mittel
|[z.B. Fehlende Tests] |[Abdeckung unter Ziel in Modul X] |Mittel |Niedrig
|===

== Risiko-Monitoring

[Beschreiben Sie, wie Risiken ueberwacht und ueberprueft werden]

* [z.B. Woechentliche Risiko-Review-Meetings]
* [z.B. Automatisierte Monitoring-Alarme]

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-11/[Risiken und technische Schulden] in der arc42 Dokumentation.
`;
}

function getGlossaryTemplate(): string {
  return `= 12. Glossar

*Inhalt*: Die wesentlichen fachlichen und technischen Begriffe, die Stakeholder im Zusammenhang mit dem System verwenden.

Nutzen Sie das Glossar ebenfalls als Uebersetzungsreferenz, falls Sie in mehrsprachigen Teams arbeiten.

== Fachliche Begriffe

[options="header",cols="1,3"]
|===
|Begriff |Definition
|[Fachbegriff 1] |[Klare, praegnante Definition]
|[Fachbegriff 2] |[Klare, praegnante Definition]
|===

== Technische Begriffe

[options="header",cols="1,3"]
|===
|Begriff |Definition
|[Technischer Begriff 1] |[Klare, praegnante Definition]
|[Technischer Begriff 2] |[Klare, praegnante Definition]
|===

== Abkuerzungen

[options="header",cols="1,3"]
|===
|Abkuerzung |Bedeutung
|API |Application Programming Interface
|JWT |JSON Web Token
|REST |Representational State Transfer
|===

.Weiterfuehrende Informationen
Siehe https://docs.arc42.org/section-12/[Glossar] in der arc42 Dokumentation.
`;
}

/**
 * Get the German workflow guide in AsciiDoc format
 */
export function getWorkflowGuide(): string {
  return `= arc42 Architektur-Dokumentation Workflow-Leitfaden

== Uebersicht

Dieser Leitfaden hilft Ihnen, Ihre Softwarearchitektur mit dem arc42-Template zu dokumentieren. Das arc42-Template ist ein praktisches, bewaehrtes Template fuer die Dokumentation von Software- und Systemarchitekturen.

== Verfuegbare Sprachen

Dieser arc42 MCP Server unterstuetzt mehrere Sprachen fuer die Dokumentation:

[options="header",cols="1,2,2"]
|===
|Code |Sprache |Nativname
|EN |Englisch |English
|DE |Deutsch |Deutsch
|CZ |Tschechisch |Čeština
|ES |Spanisch |Español
|FR |Franzoesisch |Français
|IT |Italienisch |Italiano
|NL |Niederlaendisch |Nederlands
|PT |Portugiesisch |Português
|RU |Russisch |Русский
|UKR |Ukrainisch |Українська
|ZH |Chinesisch |中文
|===

== Erste Schritte

=== Schritt 1: Workspace initialisieren

Verwenden Sie das \`arc42-init\`-Tool, um Ihren Dokumentations-Workspace zu erstellen:

[source]
----
arc42-init(projectName: "Mein Projekt", language: "DE")
----

Sie koennen eine andere Sprache mit dem ISO-Sprachcode angeben.

=== Schritt 2: Status pruefen

Verwenden Sie \`arc42-status\`, um den aktuellen Stand Ihrer Dokumentation zu sehen:

[source]
----
arc42-status()
----

=== Schritt 3: Abschnitts-Templates generieren

Verwenden Sie \`generate-template\`, um detaillierte Templates fuer jeden Abschnitt zu erhalten:

[source]
----
generate-template(section: "01_introduction_and_goals", language: "DE")
----

== Die 12 arc42-Abschnitte

. *Einfuehrung und Ziele* - Beginnen Sie hier! Definieren Sie, was Sie bauen und warum.
. *Randbedingungen* - Was duerfen Sie NICHT tun?
. *Kontextabgrenzung* - Was ist drin und was ist draussen?
. *Loesungsstrategie* - High-Level Ansatz zur Problemloesung.
. *Bausteinsicht* - Statische Struktur Ihres Systems.
. *Laufzeitsicht* - Dynamisches Verhalten und Szenarien.
. *Verteilungssicht* - Wie wird es deployed und betrieben?
. *Querschnittliche Konzepte* - Muster, die im gesamten System verwendet werden.
. *Architekturentscheidungen* - Wichtige Entscheidungen und ihre Begruendung.
. *Qualitaetsanforderungen* - Konkrete Qualitaetsszenarien.
. *Risiken und technische Schulden* - Was koennte schiefgehen?
. *Glossar* - Definieren Sie Ihre Begriffe.

== Best Practices

. *Beginnen Sie mit Abschnitt 1* - Das Verstaendnis der Ziele ist fundamental
. *Halten Sie es kurz* - arc42 ist pragmatisch, nicht buerokratisch
. *Verwenden Sie Diagramme* - Ein Bild sagt mehr als tausend Worte
. *Dokumentieren Sie Entscheidungen* - Ihr zukuenftiges Ich wird Ihnen danken
. *Iterieren Sie* - Architekturdokumentation ist nie "fertig"

== Verfuegbare Tools

* \`arc42-init\` - Dokumentations-Workspace initialisieren
* \`arc42-status\` - Dokumentationsstatus pruefen
* \`generate-template\` - Abschnitts-Templates generieren
* \`update-section\` - Abschnittsinhalte aktualisieren
* \`get-section\` - Abschnittsinhalte lesen
* \`arc42-workflow-guide\` - Diesen Leitfaden anzeigen

== Ressourcen

* link:https://arc42.org/[arc42 Website]
* link:https://docs.arc42.org/[arc42 Dokumentation]
* link:https://arc42.org/examples[arc42 Beispiele]
`;
}

/**
 * Get the German README content in AsciiDoc format
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Projekt';
  return `= ${name} - Architektur-Dokumentation

Dieses Verzeichnis enthaelt die Architekturdokumentation fuer ${name}, basierend auf dem arc42-Template.

== Struktur

* \`sections/\` - Einzelne Abschnitts-AsciiDoc-Dateien (12 Abschnitte)
* \`images/\` - Diagramme und Bilder
* \`arc42-documentation.adoc\` - Kombinierte Hauptdokumentation
* \`config.yaml\` - Konfiguration

== Die 12 arc42-Abschnitte

. *Einfuehrung und Ziele* - Anforderungen, Qualitaetsziele, Stakeholder
. *Randbedingungen* - Technische und organisatorische Randbedingungen
. *Kontextabgrenzung* - Fachlicher und technischer Kontext
. *Loesungsstrategie* - Grundlegende Entscheidungen und Strategien
. *Bausteinsicht* - Statische Zerlegung
. *Laufzeitsicht* - Dynamisches Verhalten
. *Verteilungssicht* - Infrastruktur und Deployment
. *Querschnittliche Konzepte* - Uebergreifende Regelungen und Ansaetze
. *Architekturentscheidungen* - Wichtige Entscheidungen (ADRs)
. *Qualitaetsanforderungen* - Qualitaetsbaum und Szenarien
. *Risiken und technische Schulden* - Bekannte Probleme und Risiken
. *Glossar* - Wichtige Begriffe

== Erste Schritte

. Beginnen Sie mit Abschnitt 1: Einfuehrung und Ziele
. Arbeiten Sie die Abschnitte iterativ durch
. Verwenden Sie Diagramme zur Veranschaulichung von Konzepten
. Konzentrieren Sie sich auf Entscheidungen, nicht auf Implementierungsdetails

== Dokumentation generieren

Verwenden Sie die MCP-Tools fuer:

* Status pruefen: \`arc42-status\`
* Templates generieren: \`generate-template\`
* Abschnitte aktualisieren: \`update-section\`

== Ressourcen

* link:https://arc42.org/[arc42 Website]
* link:https://docs.arc42.org/[arc42 Dokumentation]
* link:https://arc42.org/examples[arc42 Beispiele]
`;
}
