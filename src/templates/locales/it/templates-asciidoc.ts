/**
 * Italian Templates - AsciiDoc Format
 *
 * Contains all arc42 section templates in Italian using AsciiDoc syntax.
 * Based on the official arc42 templates from vendor/arc42-template.
 *
 * @module templates/locales/it/templates-asciidoc
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Italian AsciiDoc template for a specific section
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
  return `= 1. Introduzione e obiettivi

== Panoramica dei requisiti

*Scopo*: Descrivere i requisiti rilevanti e le forze trainanti che gli architetti del software e il team di sviluppo devono considerare.

=== Requisiti chiave

// Elenca i 3-5 requisiti funzionali principali

[options="header",cols="1,3,1"]
|===
|ID |Requisito |Priorità
|REQ-1 |[Breve descrizione] |Alta
|REQ-2 |[Breve descrizione] |Media
|===

=== Funzionalità

// Funzionalità essenziali del sistema

* Funzionalità 1: [Descrizione]
* Funzionalità 2: [Descrizione]

== Obiettivi di qualità

*Scopo*: Definire i principali 3-5 obiettivi di qualità più importanti per gli stakeholder.

// Basato su ISO 25010, dare priorità a qualità come:
// Prestazioni, Sicurezza, Affidabilità, Manutenibilità, Usabilità, ecc.

[options="header",cols="1,2,3"]
|===
|Priorità |Obiettivo di qualità |Motivazione
|1 |[es. Prestazioni] |[Perché è critico]
|2 |[es. Sicurezza] |[Perché è critico]
|3 |[es. Manutenibilità] |[Perché è critico]
|===

== Stakeholder

*Scopo*: Identificare tutti coloro che dovrebbero conoscere l'architettura.

[options="header",cols="2,2,3"]
|===
|Ruolo/Nome |Contatto |Aspettative
|Product Owner |[Nome/Email] |[Cosa si aspettano dall'architettura]
|Team di Sviluppo |[Nome del team] |[Cosa devono sapere]
|Operations |[Team/Persona] |[Preoccupazioni su deployment e operazioni]
|Utenti Finali |[Tipo] |[Aspettative sull'esperienza utente]
|===

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-1/[Introduzione e Obiettivi] nella documentazione arc42.
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `= 2. Vincoli di architettura

*Scopo*: Documentare qualsiasi requisito che limiti gli architetti nella loro libertà di decisioni di progettazione e implementazione.

== Vincoli Tecnici

[options="header",cols="1,3"]
|===
|Vincolo |Spiegazione
|[es. Deve funzionare su Linux] |[Perché esiste questo vincolo]
|[es. Java 17 minimo] |[Requisito organizzativo]
|===

== Vincoli Organizzativi

[options="header",cols="1,3"]
|===
|Vincolo |Spiegazione
|[es. Dimensione del team: 5 sviluppatori] |[Impatto sull'architettura]
|[es. Timeline: 6 mesi] |[Vincoli di consegna]
|===

== Convenzioni

[options="header",cols="1,3"]
|===
|Convenzione |Spiegazione
|[es. Stile di codice: Google Java Style] |[Link alla guida di stile]
|[es. Documentazione: arc42] |[Requisiti di documentazione]
|===

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-2/[Vincoli di Architettura] nella documentazione arc42.
`;
}

function getContextAndScopeTemplate(): string {
  return `= 3. Ambito e contesto del sistema

*Scopo*: Delimita il sistema dai suoi partner di comunicazione (sistemi e utenti vicini).

== Contesto di Business

*Scopo*: Specifica tutti i partner di comunicazione (utenti, sistemi IT, ...) con spiegazioni di input e output specifici del dominio.

// Aggiungi qui un diagramma di contesto (PlantUML, Mermaid, o immagine)

[plantuml, business-context, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(user, "Utente", "Utente del sistema")
System(system, "Il Tuo Sistema", "Descrizione")
System_Ext(external, "Sistema Esterno", "Descrizione")

Rel(user, system, "Utilizza")
Rel(system, external, "Chiama")
@enduml
----

[options="header",cols="1,2,2"]
|===
|Partner |Input |Output
|[Nome Utente/Sistema] |[Cosa inviano] |[Cosa ricevono]
|===

== Contesto Tecnico

*Scopo*: Specifica i canali tecnici e i protocolli tra il sistema e il suo contesto.

// Infrastruttura tecnica con protocolli

[options="header",cols="1,1,2"]
|===
|Partner |Canale |Protocollo
|[Nome Sistema] |[es. REST API] |[es. HTTPS, JSON]
|[Nome Sistema] |[es. Coda Messaggi] |[es. AMQP]
|===

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-3/[Ambito e Contesto] nella documentazione arc42.
`;
}

function getSolutionStrategyTemplate(): string {
  return `= 4. Strategia della soluzione

*Scopo*: Riepilogo delle decisioni fondamentali e delle strategie di soluzione che modellano l'architettura del sistema.

== Decisioni Tecnologiche

[options="header",cols="1,2,2"]
|===
|Decisione |Scelta |Motivazione
|Linguaggio di Programmazione |[es. TypeScript] |[Perché questa scelta]
|Framework |[es. NestJS] |[Perché questa scelta]
|Database |[es. PostgreSQL] |[Perché questa scelta]
|===

== Scomposizione di Alto Livello

Descrivi la struttura di alto livello:

* [es. Architettura a livelli]
* [es. Microservizi]
* [es. Event-driven]

== Strategie per il Raggiungimento della Qualità

[options="header",cols="1,2"]
|===
|Obiettivo di Qualità |Strategia di Raggiungimento
|[Prestazioni] |[es. Caching, elaborazione asincrona]
|[Sicurezza] |[es. OAuth2, crittografia a riposo]
|[Manutenibilità] |[es. Clean architecture, test completi]
|===

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-4/[Strategia della Soluzione] nella documentazione arc42.
`;
}

function getBuildingBlockViewTemplate(): string {
  return `= 5. Building Block View

*Scopo*: Scomposizione statica del sistema in building block con le loro dipendenze.

== Livello 1: Sistema Complessivo

*Scopo*: La descrizione white box mostra la struttura interna del sistema complessivo.

=== Descrizione White Box

// Aggiungi qui un diagramma dei componenti

[plantuml, building-blocks-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Container(web, "Applicazione Web", "React", "Interfaccia utente")
Container(api, "Server API", "Node.js", "Logica di business")
ContainerDb(db, "Database", "PostgreSQL", "Archiviazione dati")

Rel(web, api, "Chiama", "REST/JSON")
Rel(api, db, "Legge/Scrive", "SQL")
@enduml
----

=== Building Block Contenuti

[options="header",cols="1,3"]
|===
|Building Block |Descrizione
|[Componente A] |[Responsabilità e scopo]
|[Componente B] |[Responsabilità e scopo]
|===

== Livello 2: [Nome Sottosistema]

*Scopo*: Scomporre i componenti principali in building block più piccoli.

=== White Box [Componente A]

// Descrivi la struttura interna del Componente A

[options="header",cols="1,3"]
|===
|Building Block |Descrizione
|[Sotto-componente A.1] |[Responsabilità]
|[Sotto-componente A.2] |[Responsabilità]
|===

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-5/[Building Block View] nella documentazione arc42.
`;
}

function getRuntimeViewTemplate(): string {
  return `= 6. Runtime View

*Scopo*: Documentare il comportamento e l'interazione dei building block durante l'esecuzione.

== Scenario 1: [es. Login Utente]

// Descrivi il comportamento runtime per uno scenario chiave

[plantuml, runtime-login, svg]
----
@startuml
actor Utente
participant "App Web" as Web
participant "Server API" as API
participant "Servizio Auth" as Auth
database "DB Utenti" as DB

Utente -> Web: Inserisce credenziali
Web -> API: POST /auth/login
API -> Auth: Valida credenziali
Auth -> DB: Query utente
DB --> Auth: Dati utente
Auth --> API: Token JWT
API --> Web: Successo + token
Web --> Utente: Dashboard
@enduml
----

=== Descrizione

. L'utente inserisce le credenziali nell'applicazione web
. L'app web invia la richiesta di login al server API
. L'API valida le credenziali tramite il servizio di autenticazione
. In caso di successo, viene restituito il token JWT

== Scenario 2: [es. Elaborazione Dati]

// Documenta un altro scenario runtime importante

=== Descrizione

[Descrivi i passaggi e le interazioni]

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-6/[Runtime View] nella documentazione arc42.
`;
}

function getDeploymentViewTemplate(): string {
  return `= 7. Deployment View

*Scopo*: Infrastruttura tecnica con ambienti, computer, processori, topologie.

== Livello Infrastruttura 1

*Scopo*: Panoramica dell'infrastruttura di deployment.

[plantuml, deployment-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

Deployment_Node(cloud, "Cloud Provider", "AWS/Azure/GCP") {
    Deployment_Node(web_tier, "Livello Web") {
        Container(web, "Server Web", "nginx", "File statici + reverse proxy")
    }
    Deployment_Node(app_tier, "Livello Applicazione") {
        Container(api, "Server API", "Node.js", "Logica di business")
    }
    Deployment_Node(data_tier, "Livello Dati") {
        ContainerDb(db, "Database", "PostgreSQL", "Storage primario")
    }
}
@enduml
----

=== Motivazione

[Perché è stata scelta questa architettura di deployment]

=== Caratteristiche di Qualità e Prestazioni

[Come questo deployment supporta gli obiettivi di qualità]

== Livello Infrastruttura 2

*Scopo*: Vista dettagliata di nodi di deployment specifici.

=== [Nome Nodo]

[options="header",cols="1,3"]
|===
|Aspetto |Descrizione
|Hardware |[es. 4 vCPU, 16GB RAM]
|Software |[es. Ubuntu 22.04, Docker 24.x]
|Rete |[es. VPC, security groups]
|===

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-7/[Deployment View] nella documentazione arc42.
`;
}

function getConceptsTemplate(): string {
  return `= 8. Concetti trasversali

*Scopo*: Normative generali e idee di soluzione rilevanti in più building block.

== Modello di Dominio

// Concetti fondamentali del dominio e le loro relazioni

[plantuml, domain-model, svg]
----
@startuml
class Utente {
  +id: UUID
  +email: String
  +nome: String
}
class Ordine {
  +id: UUID
  +stato: StatoOrdine
  +creatoA: DateTime
}
Utente "1" -- "*" Ordine : effettua
@enduml
----

== Concetto di Sicurezza

=== Autenticazione

[Descrivi l'approccio di autenticazione: JWT, OAuth2, ecc.]

=== Autorizzazione

[Descrivi l'approccio di autorizzazione: RBAC, ABAC, ecc.]

== Gestione Errori

[Descrivi come gli errori sono gestiti nel sistema]

* [es. Gestore errori globale]
* [es. Risposte di errore strutturate]
* [es. Strategia di logging degli errori]

== Logging e Monitoraggio

[options="header",cols="1,2"]
|===
|Aspetto |Approccio
|Logging |[es. Log JSON strutturati, stack ELK]
|Metriche |[es. Prometheus, Grafana]
|Tracing |[es. OpenTelemetry, Jaeger]
|===

== Strategia di Testing

[options="header",cols="1,2,1"]
|===
|Tipo |Ambito |Obiettivo Copertura
|Test Unitari |Funzioni/classi individuali |80%
|Test di Integrazione |Interazioni tra componenti |Percorsi chiave
|Test E2E |Percorsi utente completi |Flussi critici
|===

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-8/[Concetti Trasversali] nella documentazione arc42.
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `= 9. Decisioni di progettazione

*Scopo*: Documentare decisioni architetturali importanti, costose, su larga scala o rischiose.

== ADR-001: [Titolo Decisione]

=== Stato

[Proposto | Accettato | Deprecato | Sostituito]

=== Contesto

[Descrivi il problema che motiva questa decisione]

=== Decisione

[Descrivi la decisione presa]

=== Conseguenze

*Positive:*

* [Beneficio 1]
* [Beneficio 2]

*Negative:*

* [Svantaggio 1]
* [Svantaggio 2]

=== Alternative Considerate

[options="header",cols="1,2,2"]
|===
|Alternativa |Pro |Contro
|[Opzione A] |[Benefici] |[Svantaggi]
|[Opzione B] |[Benefici] |[Svantaggi]
|===

'''

== ADR-002: [Titolo Decisione]

// Usa lo stesso template per decisioni aggiuntive

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-9/[Decisioni di Architettura] nella documentazione arc42.
`;
}

function getQualityRequirementsTemplate(): string {
  return `= 10. Requisiti di Qualità

*Scopo*: Requisiti di qualità concreti con scenari per la valutazione.

== Albero di Qualità

// Rappresentazione visiva degli obiettivi di qualità e dei loro raffinamenti

[plantuml, quality-tree, svg]
----
@startmindmap
* Qualità
** Prestazioni
*** Tempo di Risposta
*** Throughput
** Sicurezza
*** Autenticazione
*** Autorizzazione
** Manutenibilità
*** Modularità
*** Testabilità
@endmindmap
----

== Scenari di Qualità

=== Scenari di Prestazioni

[options="header",cols="1,2,1,1"]
|===
|ID |Scenario |Risposta Attesa |Priorità
|PERF-1 |L'utente richiede la dashboard sotto carico normale |< 200ms |Alta
|PERF-2 |Il sistema gestisce 1000 utenti concorrenti |Nessun degrado |Media
|===

=== Scenari di Sicurezza

[options="header",cols="1,2,1,1"]
|===
|ID |Scenario |Comportamento Atteso |Priorità
|SEC-1 |Tentativo di login non valido |Blocco account dopo 5 tentativi |Alta
|SEC-2 |Accesso API non autorizzato |Risposta 401, audit loggato |Alta
|===

=== Scenari di Manutenibilità

[options="header",cols="1,2,1,1"]
|===
|ID |Scenario |Sforzo Atteso |Priorità
|MAINT-1 |Aggiunta nuovo tipo di entità |< 2 giorni di sviluppo |Media
|MAINT-2 |Aggiornamento versione dipendenza |< 4 ore inclusi test |Media
|===

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-10/[Requisiti di Qualità] nella documentazione arc42.
`;
}

function getTechnicalRisksTemplate(): string {
  return `= 11. Rischi e debiti tecnici

*Scopo*: Identificare e tracciare rischi tecnici noti e debiti tecnici accumulati.

== Rischi Tecnici

[options="header",cols="1,2,1,2"]
|===
|Rischio |Descrizione |Probabilità |Mitigazione
|[es. Guasto API di terze parti] |[Servizio esterno da cui dipendiamo] |Media |[Circuit breaker, fallback]
|[es. Perdita dati] |[Corruzione database] |Bassa |[Backup, replica]
|===

== Debito Tecnico

[options="header",cols="1,2,1,1"]
|===
|Elemento |Descrizione |Impatto |Priorità
|[es. Autenticazione legacy] |[Vecchio sistema auth da sostituire] |Alto |Media
|[es. Test mancanti] |[Copertura sotto target nel modulo X] |Medio |Bassa
|===

== Monitoraggio dei Rischi

[Descrivi come i rischi vengono monitorati e revisionati]

* [es. Riunioni settimanali di revisione rischi]
* [es. Allarmi di monitoraggio automatici]

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-11/[Rischi e Debito Tecnico] nella documentazione arc42.
`;
}

function getGlossaryTemplate(): string {
  return `= 12. Glossario

*Scopo*: Definire i termini importanti di dominio e tecnici utilizzati nella documentazione dell'architettura.

== Termini di Dominio

[options="header",cols="1,3"]
|===
|Termine |Definizione
|[Termine Dominio 1] |[Definizione chiara e concisa]
|[Termine Dominio 2] |[Definizione chiara e concisa]
|===

== Termini Tecnici

[options="header",cols="1,3"]
|===
|Termine |Definizione
|[Termine Tecnico 1] |[Definizione chiara e concisa]
|[Termine Tecnico 2] |[Definizione chiara e concisa]
|===

== Abbreviazioni

[options="header",cols="1,3"]
|===
|Abbreviazione |Significato
|API |Application Programming Interface
|JWT |JSON Web Token
|REST |Representational State Transfer
|===

.Ulteriori Informazioni
Vedi link:https://docs.arc42.org/section-12/[Glossario] nella documentazione arc42.
`;
}

/**
 * Get the Italian workflow guide in AsciiDoc format
 */
export function getWorkflowGuide(): string {
  return `= Guida al Flusso di Lavoro per la Documentazione dell'Architettura arc42

== Panoramica

Questa guida ti aiuta a documentare la tua architettura software utilizzando il template arc42. Il template arc42 è un modello pratico e collaudato per la documentazione di architetture software e di sistema.

== Lingue Disponibili

Questo Server MCP arc42 supporta più lingue per la documentazione:

[options="header",cols="1,2,2"]
|===
|Codice |Lingua |Nome Nativo
|EN |Inglese |English
|DE |Tedesco |Deutsch
|CZ |Ceco |Čeština
|ES |Spagnolo |Español
|FR |Francese |Français
|IT |Italiano |Italiano
|NL |Olandese |Nederlands
|PT |Portoghese |Português
|RU |Russo |Русский
|UKR |Ucraino |Українська
|ZH |Cinese |中文
|===

== Per Iniziare

=== Passo 1: Inizializza il Tuo Workspace

Usa lo strumento \`arc42-init\` per creare il tuo workspace di documentazione:

[source]
----
arc42-init(projectName: "Il Mio Progetto", language: "IT")
----

Puoi specificare una lingua diversa usando il codice lingua ISO.

=== Passo 2: Controlla lo Stato

Usa \`arc42-status\` per vedere lo stato attuale della tua documentazione:

[source]
----
arc42-status()
----

=== Passo 3: Genera i Template delle Sezioni

Usa \`generate-template\` per ottenere template dettagliati per ogni sezione:

[source]
----
generate-template(section: "01_introduction_and_goals", language: "IT")
----

== Le 12 Sezioni arc42

. *Introduzione e Obiettivi* - Inizia qui! Definisci cosa stai costruendo e perché.
. *Vincoli di Architettura* - Cosa NON sei autorizzato a fare?
. *Ambito e Contesto* - Cosa è dentro e cosa è fuori?
. *Strategia della Soluzione* - Approccio di alto livello per risolvere il problema.
. *Building Block View* - Struttura statica del tuo sistema.
. *Runtime View* - Comportamento dinamico e scenari.
. *Deployment View* - Come viene distribuito e operato?
. *Concetti Trasversali* - Pattern utilizzati in tutto il sistema.
. *Decisioni di Architettura* - Decisioni importanti e loro motivazioni.
. *Requisiti di Qualità* - Scenari di qualità concreti.
. *Rischi e Debito Tecnico* - Cosa potrebbe andare storto?
. *Glossario* - Definisci i tuoi termini.

== Migliori Pratiche

. *Inizia con la Sezione 1* - Comprendere gli obiettivi è fondamentale
. *Mantienilo conciso* - arc42 è pragmatico, non burocratico
. *Usa i diagrammi* - Un'immagine vale più di mille parole
. *Documenta le decisioni* - Il te stesso futuro ringrazierà il te stesso presente
. *Itera* - La documentazione dell'architettura non è mai "finita"

== Strumenti Disponibili

* \`arc42-init\` - Inizializza il workspace di documentazione
* \`arc42-status\` - Controlla lo stato della documentazione
* \`generate-template\` - Genera template delle sezioni
* \`update-section\` - Aggiorna il contenuto delle sezioni
* \`get-section\` - Leggi il contenuto delle sezioni
* \`arc42-workflow-guide\` - Mostra questa guida

== Risorse

* link:https://arc42.org/[Sito Web arc42]
* link:https://docs.arc42.org/[Documentazione arc42]
* link:https://arc42.org/examples[Esempi arc42]
`;
}

/**
 * Get the Italian README content in AsciiDoc format
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Progetto';
  return `= ${name} - Documentazione dell'Architettura

Questa directory contiene la documentazione dell'architettura per ${name}, seguendo il template arc42.

== Struttura

* \`sections/\` - File AsciiDoc delle singole sezioni (12 sezioni)
* \`images/\` - Diagrammi e immagini
* \`arc42-documentation.adoc\` - Documentazione principale combinata
* \`config.yaml\` - Configurazione

== Le 12 Sezioni arc42

. *Introduzione e Obiettivi* - Requisiti, obiettivi di qualità, stakeholder
. *Vincoli di Architettura* - Vincoli tecnici e organizzativi
. *Ambito e Contesto* - Contesto di business e tecnico
. *Strategia della Soluzione* - Decisioni e strategie fondamentali
. *Building Block View* - Scomposizione statica
. *Runtime View* - Comportamento dinamico
. *Deployment View* - Infrastruttura e deployment
. *Concetti Trasversali* - Normative e approcci generali
. *Decisioni di Architettura* - Decisioni importanti (ADR)
. *Requisiti di Qualità* - Albero di qualità e scenari
. *Rischi e Debito Tecnico* - Problemi e rischi noti
. *Glossario* - Termini importanti

== Per Iniziare

. Inizia con la Sezione 1: Introduzione e Obiettivi
. Procedi attraverso le sezioni in modo iterativo
. Usa i diagrammi per illustrare i concetti
. Concentrati sulle decisioni, non sui dettagli implementativi

== Generazione della Documentazione

Usa gli strumenti MCP per:

* Controllare lo stato: \`arc42-status\`
* Generare template: \`generate-template\`
* Aggiornare sezioni: \`update-section\`

== Risorse

* link:https://arc42.org/[Sito Web arc42]
* link:https://docs.arc42.org/[Documentazione arc42]
* link:https://arc42.org/examples[Esempi arc42]
`;
}
