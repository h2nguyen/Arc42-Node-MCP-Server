/**
 * Italian Templates
 *
 * Contains all arc42 section templates in Italian.
 * Based on the official arc42 Italian template from vendor/arc42-template/IT/.
 *
 * @module templates/locales/it/templates
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Italian template for a specific section
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
  return `# 1. Introduzione e Obiettivi

## Descrizione dei Requisiti

**Scopo**: Descrive i requisiti essenziali e le forze trainanti che devono essere considerate nell'implementazione dell'architettura software e nello sviluppo del sistema.

### Requisiti Essenziali

<!-- Elenca i top 3-5 requisiti funzionali -->

| ID | Requisito | Priorita |
|----|-----------|----------|
| REQ-1 | [Breve descrizione] | Alta |
| REQ-2 | [Breve descrizione] | Media |

### Funzionalita

<!-- Funzionalita essenziali del sistema -->

- Funzionalita 1: [Descrizione]
- Funzionalita 2: [Descrizione]

## Obiettivi di Qualita

**Scopo**: I top-3 o top-5 obiettivi di qualita per l'architettura, il cui raggiungimento e di massima importanza per i principali stakeholder.

<!-- Basandosi su ISO 25010, dare priorita a qualita come: -->
<!-- Prestazioni, Sicurezza, Affidabilita, Manutenibilita, Usabilita, ecc. -->

| Priorita | Obiettivo di Qualita | Motivazione |
|----------|---------------------|-------------|
| 1 | [es. Prestazioni] | [Perche e critico] |
| 2 | [es. Sicurezza] | [Perche e critico] |
| 3 | [es. Manutenibilita] | [Perche e critico] |

## Stakeholder

**Scopo**: Panoramica esplicita degli stakeholder del sistema.

| Ruolo/Nome | Contatto | Aspettative |
|------------|----------|-------------|
| Product Owner | [Nome/Email] | [Aspettative riguardo l'architettura] |
| Team di Sviluppo | [Nome team] | [Cosa devono sapere] |
| Operations | [Team/Persona] | [Preoccupazioni di deployment e operations] |
| Utenti Finali | [Tipo] | [Aspettative sull'esperienza utente] |

## Criteri di Successo

<!-- Cosa definisce il successo di questo sistema? -->

- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `# 2. Vincoli dell'Architettura

## Vincoli Tecnici

**Vincoli Hardware**

| Vincolo | Contesto/Motivazione |
|---------|---------------------|
| [es. Piattaforma cloud] | [Perche esiste questo vincolo] |

**Vincoli Software/Tecnologia**

| Vincolo | Contesto/Motivazione |
|---------|---------------------|
| [es. Java 17+ richiesto] | [Motivo del vincolo] |
| [es. PostgreSQL richiesto] | [Perche e stato scelto] |

**Linee Guida di Programmazione**

- Linguaggio di programmazione: [Linguaggio]
- Framework: [Framework e versione]
- Librerie: [Librerie obbligatorie o vietate]

## Vincoli Organizzativi

**Organizzazione e Struttura**

| Vincolo | Contesto/Motivazione |
|---------|---------------------|
| [es. Struttura del team] | [Come influenza l'architettura] |
| [es. Metodologia Agile] | [Impatto sul processo di sviluppo] |

**Risorse**

- Budget: [Limitazioni di budget]
- Tempo: [Vincoli temporali]
- Team: [Dimensione e competenze del team]

## Convenzioni

**Convenzioni di Architettura e Design**

- [es. Pattern architetturale Microservices]
- [es. Design RESTful API]
- [es. Domain-Driven Design]

**Convenzioni di Codifica**

- Stile del codice: [Link alla guida di stile]
- Documentazione: [Standard di documentazione]
- Test: [Requisiti di testing]

**Requisiti di Conformita**

- [es. Conformita GDPR]
- [es. Regolamenti specifici del settore]
- [es. Standard di accessibilita]
`;
}

function getContextAndScopeTemplate(): string {
  return `# 3. Contesto e Ambito

## Contesto di Business

**Scopo**: Mostra l'ambiente di business del sistema e le principali dipendenze esterne.

### Diagramma di Contesto

\`\`\`
[Crea un diagramma che mostra il tuo sistema e sistemi/utenti esterni]
Puoi usare:
- Diagrammi Mermaid
- PlantUML
- ASCII art
- Oppure fai riferimento a un'immagine in /images/
\`\`\`

### Interfacce Esterne

| Sistema Esterno | Interfaccia | Scopo |
|-----------------|-------------|-------|
| [Sistema Esterno 1] | [API/Protocollo] | [Quali dati/funzioni vengono scambiati] |
| [Tipo Utente 1] | [UI/API] | [Come interagiscono gli utenti] |

### Processi di Business Supportati

<!-- Quali processi di business supporta questo sistema? -->

1. **Processo 1**: [Descrizione]
   - Attori: [Chi e coinvolto]
   - Flusso: [Flusso di alto livello]

2. **Processo 2**: [Descrizione]

## Contesto Tecnico

**Scopo**: Mostra le interfacce tecniche e i canali tra il sistema e il suo ambiente.

### Interfacce Tecniche

| Interfaccia | Tecnologia | Protocollo | Formato |
|-------------|------------|------------|---------|
| [API 1] | [REST API] | [HTTPS] | [JSON] |
| [Database] | [PostgreSQL] | [TCP/IP] | [SQL] |

### Canali e Trasmissione

| Canale | Tecnologia | Descrizione |
|--------|------------|-------------|
| [Coda Messaggi] | [RabbitMQ] | [Comunicazione asincrona tra servizi] |

### Mappatura: Business a Tecnico

| Contesto di Business | Realizzazione Tecnica |
|---------------------|----------------------|
| [Interfaccia Utente] | [React SPA via HTTPS] |
| [Sistema Esterno A] | [REST API via HTTPS] |
`;
}

function getSolutionStrategyTemplate(): string {
  return `# 4. Strategia di Soluzione

**Scopo**: Riassume le decisioni fondamentali e le strategie di soluzione che modellano l'architettura del sistema.

## Decisioni Chiave della Soluzione

### Pattern Architetturali

| Pattern | Motivazione | Conseguenze |
|---------|-------------|-------------|
| [es. Microservices] | [Perche e stato scelto questo pattern] | [Benefici e compromessi] |

### Decisioni Tecnologiche

| Componente | Tecnologia | Motivazione |
|------------|------------|-------------|
| Backend | [es. Node.js] | [Perche e stato scelto] |
| Frontend | [es. React] | [Motivazioni] |
| Database | [es. PostgreSQL] | [Motivazioni] |

### Decomposizione di Alto Livello

<!-- Come e strutturato il sistema al livello piu alto? -->

\`\`\`
[Diagramma dei componenti di alto livello]
\`\`\`

Descrizione:
- Componente 1: [Scopo e responsabilita]
- Componente 2: [Scopo e responsabilita]

## Raggiungimento degli Obiettivi di Qualita

### Mappatura: Obiettivi di Qualita agli Approcci

| Obiettivo di Qualita | Approccio alla Soluzione |
|---------------------|-------------------------|
| [Prestazioni] | [Strategia di caching, elaborazione asincrona, CDN] |
| [Sicurezza] | [Autenticazione, autorizzazione, crittografia] |
| [Scalabilita] | [Scaling orizzontale, load balancing] |

### Decisioni di Design Chiave

1. **Decisione 1**: [es. Architettura event-driven]
   - Motivazione: [Perche questo approccio]
   - Impatto: [Come aiuta a raggiungere gli obiettivi di qualita]

2. **Decisione 2**: [Descrizione]
   - Motivazione: [Ragionamento]
   - Impatto: [Impatto sugli obiettivi di qualita]

## Strategia di Sviluppo

- Approccio di sviluppo: [Agile, Scrum, ecc.]
- Strategia di deployment: [CI/CD, Blue-Green, ecc.]
- Strategia di test: [Unit, Integration, E2E]
`;
}

function getBuildingBlockViewTemplate(): string {
  return `# 5. Vista dei Building Block

**Scopo**: Decomposizione statica del sistema in building block e loro relazioni.

## Livello 1: Contesto del Sistema

### Whitebox: Sistema Complessivo

**Scopo**: [Cosa fa il sistema]

\`\`\`
[Diagramma dei componenti con i principali building block]
\`\`\`

**Building Block Contenuti**:

| Componente | Responsabilita |
|------------|----------------|
| [Componente 1] | [Cosa fa] |
| [Componente 2] | [Cosa fa] |

**Interfacce Importanti**:

| Interfaccia | Descrizione |
|-------------|-------------|
| [API 1] | [Scopo e protocollo] |

## Livello 2: Dettagli dei Componenti

### Componente 1 (Whitebox)

**Scopo**: [Scopo dettagliato]

**Interfacce**:
- Input: [Cosa riceve]
- Output: [Cosa produce]

**Struttura Interna**:

\`\`\`
[Diagramma dei moduli/classi interni]
\`\`\`

**Elementi Contenuti**:

| Elemento | Responsabilita |
|----------|----------------|
| [Modulo A] | [Scopo] |
| [Modulo B] | [Scopo] |

### Componente 2 (Whitebox)

[Struttura simile]

## Livello 3: Viste di Dettaglio

<!-- Includi il Livello 3 solo per componenti che necessitano di dettagli aggiuntivi -->

### Dettagli Modulo A

[Diagrammi di classe dettagliati, struttura dei pacchetti, ecc.]
`;
}

function getRuntimeViewTemplate(): string {
  return `# 6. Vista Runtime

**Scopo**: Mostra il comportamento e l'interazione dei building block durante l'esecuzione.

## Scenari Importanti

### Scenario 1: [Nome, es. "Login Utente"]

**Descrizione**: [Cosa succede in questo scenario]

**Diagramma di Sequenza**:

\`\`\`mermaid
sequenceDiagram
    participant Utente
    participant Frontend
    participant API
    participant Database

    Utente->>Frontend: Inserisce credenziali
    Frontend->>API: POST /login
    API->>Database: Valida credenziali
    Database-->>API: Dati utente
    API-->>Frontend: Token JWT
    Frontend-->>Utente: Login riuscito
\`\`\`

**Passi**:

1. L'utente inserisce le credenziali
2. Il frontend invia la richiesta di login
3. L'API valida con il database
4. Il token viene generato e restituito
5. L'utente e autenticato

### Scenario 2: [Nome]

[Struttura simile]

## Flusso Dati

### Flusso 1: [Nome]

**Scopo**: [Quali dati fluiscono e dove]

**Diagramma**:

\`\`\`
[Diagramma del flusso dati]
\`\`\`

**Descrizione**:
- Passo 1: [Cosa succede]
- Passo 2: [Cosa succede]

## Macchine a Stati

### Macchina a Stati per [Entita]

**Stati**:
- Stato 1: [Descrizione]
- Stato 2: [Descrizione]

**Transizioni**:

| Da | Evento | A | Azione |
|----|--------|---|--------|
| [Stato 1] | [Evento] | [Stato 2] | [Cosa succede] |
`;
}

function getDeploymentViewTemplate(): string {
  return `# 7. Vista di Deployment

**Scopo**: Descrive l'infrastruttura tecnica e come il software viene distribuito.

## Panoramica dell'Infrastruttura

### Diagramma di Deployment

\`\`\`
[Diagramma con server, container, reti]
\`\`\`

## Ambienti

### Ambiente di Produzione

**Infrastruttura**:

| Componente | Tecnologia | Configurazione |
|------------|------------|----------------|
| [Application Server] | [AWS ECS] | [Specifiche] |
| [Database] | [RDS PostgreSQL] | [Specifiche] |
| [Cache] | [Redis] | [Specifiche] |

**Rete**:
- VPC: [Configurazione]
- Subnet: [Setup pubblico/privato]
- Security Groups: [Regole]

### Ambiente di Staging

[Struttura simile]

### Ambiente di Sviluppo

[Struttura simile]

## Strategia di Deployment

### Pipeline CI/CD

1. **Build**: [Cosa succede]
2. **Test**: [Test automatizzati]
3. **Deploy**: [Processo di deployment]

### Strategia di Rollback

[Come vengono fatti i rollback dei deployment]

## Strategia di Scaling

### Scaling Orizzontale

| Componente | Trigger di Scaling | Max Istanze |
|------------|-------------------|-------------|
| [API Server] | [CPU > 70%] | [10] |

### Scaling Verticale

[Quando e come fare scaling verticale]

## Monitoring e Operazioni

### Health Check

| Componente | Controllo | Soglia |
|------------|-----------|--------|
| [API] | [Endpoint /health] | [Tempo di risposta < 1s] |

### Logging

- Aggregazione log: [ELK, CloudWatch, ecc.]
- Retention log: [Policy]

### Metriche

- Metriche chiave: [CPU, memoria, tasso richieste]
- Alerting: [Condizioni di alert]
`;
}

function getConceptsTemplate(): string {
  return `# 8. Concetti Trasversali

**Scopo**: Regole e idee di soluzione trasversali, rilevanti in piu parti del sistema.

## Modelli di Dominio

### Concetti Chiave del Dominio

\`\`\`
[Diagramma del modello di dominio o diagramma delle classi]
\`\`\`

**Entita Chiave**:

| Entita | Responsabilita | Relazioni |
|--------|----------------|-----------|
| [Entita 1] | [Scopo] | [Entita correlate] |

## Sicurezza

### Autenticazione

- Metodo: [JWT, OAuth2, ecc.]
- Implementazione: [Come funziona]

### Autorizzazione

- Modello: [RBAC, ABAC, ecc.]
- Ruoli: [Lista dei ruoli e permessi]

### Protezione dei Dati

- Crittografia at rest: [Come]
- Crittografia in transit: [Versione TLS]
- Gestione dati sensibili: [Approccio]

## Gestione degli Errori

### Categorie di Errori

| Categoria | Strategia di Gestione |
|-----------|----------------------|
| [Errori di validazione] | [Restituisci 400 con dettagli] |
| [Errori di sistema] | [Log e restituisci 500] |

### Formato Risposta Errore

\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Messaggio leggibile",
    "details": {}
  }
}
\`\`\`

## Logging e Monitoring

### Strategia di Logging

- Livelli di log: [DEBUG, INFO, WARN, ERROR]
- Logging strutturato: [Formato JSON]
- ID di correlazione: [Per il tracing delle richieste]

### Monitoring

- APM: [Tool di Application Performance Monitoring]
- Metriche: [Metriche chiave di business e tecniche]

## Gestione della Configurazione

### Fonti di Configurazione

1. Variabili d'ambiente
2. File di configurazione
3. Gestione dei segreti: [Vault, AWS Secrets Manager]

### Configurazione per Ambiente

| Impostazione | Dev | Staging | Prod |
|--------------|-----|---------|------|
| [Livello Log] | [DEBUG] | [INFO] | [WARN] |

## Strategia di Test

### Livelli di Test

| Livello | Copertura | Strumenti |
|---------|-----------|-----------|
| Unit Test | [Target %] | [Framework] |
| Test di Integrazione | [Ambito] | [Strumenti] |
| Test E2E | [Flussi chiave] | [Strumenti] |

### Gestione dei Dati di Test

[Come vengono creati e gestiti i dati di test]

## Concetti di Sviluppo

### Organizzazione del Codice

- Struttura dei pacchetti: [Approccio]
- Convenzioni di naming: [Standard]

### Build e Gestione Dipendenze

- Strumento di build: [Maven, Gradle, npm, ecc.]
- Gestione dipendenze: [Strategia]

## Concetti Operativi

### Backup e Recovery

- Frequenza backup: [Giornaliero, orario, ecc.]
- Retention: [Policy]
- Procedura di recovery: [Passi]

### Disaster Recovery

- RTO: [Recovery Time Objective]
- RPO: [Recovery Point Objective]
- Strategia DR: [Approccio]
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `# 9. Decisioni Architetturali

**Scopo**: Documenta decisioni architetturali importanti, costose, critiche o rischiose con le relative motivazioni.

## Formato ADR

Ogni decisione segue questa struttura:
- **Contesto**: Qual e il problema che stiamo affrontando?
- **Decisione**: Cosa abbiamo deciso di fare
- **Conseguenze**: Cosa diventa piu facile o piu difficile

## Registro delle Decisioni

### ADR-001: [Titolo Decisione]

**Data**: [AAAA-MM-GG]
**Stato**: [Proposta | Accettata | Deprecata | Sostituita]
**Decisori**: [Nomi]

**Contesto**:

[Descrivi le forze in gioco, tecniche, politiche, sociali e specifiche del progetto. Queste forze sono probabilmente in tensione e dovrebbero essere chiamate come tali.]

**Decisione**:

[Descrivi la nostra risposta a queste forze. Qui prendiamo la nostra decisione.]

**Conseguenze**:

Positive:
- [Beneficio 1]
- [Beneficio 2]

Negative:
- [Compromesso 1]
- [Compromesso 2]

Rischi:
- [Rischio 1 e mitigazione]

### ADR-002: [Altra Decisione]

[Struttura simile]

## Categorie di Decisioni

### Decisioni Strutturali

| Decisione | Motivazione | Data |
|-----------|-------------|------|
| [Microservices vs Monolith] | [Perche scelto] | [Data] |

### Decisioni Tecnologiche

| Componente | Tecnologia | Alternative Considerate | Perche Scelta |
|------------|------------|------------------------|---------------|
| [Backend] | [Node.js] | [Python, Java] | [Motivazioni] |

### Decisioni di Processo

| Decisione | Impatto | Data |
|-----------|---------|------|
| [Metodologia Agile] | [Come influenza l'architettura] | [Data] |

## Decisioni Deprecate

| Decisione | Data Deprecazione | Motivo | Sostituita Da |
|-----------|-------------------|--------|---------------|
| [Vecchia decisione] | [Data] | [Perche deprecata] | [ADR-XXX] |
`;
}

function getQualityRequirementsTemplate(): string {
  return `# 10. Requisiti di Qualita

**Scopo**: Definisce i requisiti di qualita con scenari concreti.

## Albero della Qualita

### Obiettivi di Qualita di Alto Livello

\`\`\`
Qualita
+-- Prestazioni
|   +-- Tempo di risposta
|   +-- Throughput
+-- Sicurezza
|   +-- Autenticazione
|   +-- Privacy dei dati
+-- Affidabilita
|   +-- Disponibilita
|   +-- Tolleranza ai guasti
+-- Manutenibilita
    +-- Testabilita
    +-- Modificabilita
\`\`\`

## Scenari di Qualita

### Scenari di Prestazioni

**Scenario 1: Tempo di Risposta a Carico Normale**

| Aspetto | Descrizione |
|---------|-------------|
| Scenario | L'utente richiede dati sotto carico normale |
| Sorgente | Utente finale |
| Stimolo | Richiesta HTTP all'API |
| Ambiente | Operazioni normali, 100 utenti concorrenti |
| Risposta | Il sistema restituisce i dati |
| Misura | 95esimo percentile tempo di risposta < 200ms |

**Scenario 2: Gestione del Carico di Picco**

| Aspetto | Descrizione |
|---------|-------------|
| Scenario | Sistema sotto carico di picco |
| Sorgente | Utenti multipli |
| Stimolo | 1000 richieste concorrenti |
| Ambiente | Ore di picco |
| Risposta | Il sistema elabora tutte le richieste |
| Misura | Nessuna richiesta fallisce, tempo di risposta < 1s |

### Scenari di Sicurezza

**Scenario 3: Tentativo di Accesso Non Autorizzato**

| Aspetto | Descrizione |
|---------|-------------|
| Scenario | Utente non autorizzato tenta di accedere a risorsa protetta |
| Sorgente | Attaccante esterno |
| Stimolo | Richiesta HTTP senza token valido |
| Ambiente | Operazioni normali |
| Risposta | Il sistema nega l'accesso |
| Misura | Restituisce 401, registra il tentativo, nessun dato esposto |

### Scenari di Affidabilita

**Scenario 4: Recupero da Guasto del Servizio**

| Aspetto | Descrizione |
|---------|-------------|
| Scenario | La connessione al database fallisce |
| Sorgente | Guasto dell'infrastruttura |
| Stimolo | Il database diventa non disponibile |
| Ambiente | Operazioni normali |
| Risposta | Il sistema continua a operare con dati in cache |
| Misura | Degradazione del servizio < 5%, recupero < 30s |

### Scenari di Manutenibilita

**Scenario 5: Aggiunta di Nuova Funzionalita**

| Aspetto | Descrizione |
|---------|-------------|
| Scenario | Lo sviluppatore aggiunge un nuovo endpoint API |
| Sorgente | Team di sviluppo |
| Stimolo | Nuovo requisito |
| Ambiente | Sviluppo |
| Risposta | La funzionalita viene aggiunta |
| Misura | < 2 giorni, < 5 file modificati, i test passano |

## Prioritizzazione dei Requisiti di Qualita

| Attributo di Qualita | Priorita | Target |
|---------------------|----------|--------|
| Disponibilita | Alta | 99.9% uptime |
| Tempo di risposta | Alta | < 200ms (p95) |
| Sicurezza | Critica | Zero violazioni dati |
| Manutenibilita | Media | Copertura test > 80% |
| Usabilita | Media | Successo task utente > 95% |
`;
}

function getTechnicalRisksTemplate(): string {
  return `# 11. Rischi e Debito Tecnico

**Scopo**: Documenta problemi noti, rischi e debito tecnico.

## Rischi

### Matrice di Valutazione dei Rischi

| Rischio | Probabilita | Impatto | Severita | Stato |
|---------|-------------|---------|----------|-------|
| [Rischio 1] | [Alta/Media/Bassa] | [Alta/Media/Bassa] | [Critica/Alta/Media/Bassa] | [Aperto/Mitigato] |

### Rischi Dettagliati

**Rischio 1: [Titolo del Rischio]**

- **Descrizione**: [Qual e il rischio]
- **Probabilita**: [Alta/Media/Bassa]
- **Impatto**: [Alta/Media/Bassa - e cosa succede]
- **Mitigazione**: [Cosa stiamo facendo al riguardo]
- **Piano di contingenza**: [Piano se il rischio si materializza]
- **Responsabile**: [Chi e responsabile]
- **Stato**: [Aperto/In mitigazione/Chiuso]

**Rischio 2: [Titolo]**

[Struttura simile]

## Debito Tecnico

### Registro del Debito

| Voce | Tipo | Impatto | Sforzo | Priorita |
|------|------|---------|--------|----------|
| [Debito 1] | [Codice/Architettura/Testing] | [Alta/Media/Bassa] | [Giorni] | [1-5] |

### Voci di Debito Dettagliate

**Debito 1: [Titolo]**

- **Descrizione**: [Cosa deve essere sistemato]
- **Perche esiste**: [Come e successo]
- **Impatto**: [Quali problemi causa]
- **Soluzione proposta**: [Come sistemarlo]
- **Stima dello sforzo**: [Tempo necessario]
- **Priorita**: [Quando dovremmo sistemarlo]

### Piano di Riduzione del Debito

| Trimestre | Debito da Affrontare | Impatto Atteso |
|-----------|---------------------|----------------|
| Q1 2024 | [Voci 1, 2] | [Miglioramento in X] |

## Problemi Noti

### Problemi Aperti

| Problema | Severita | Workaround | Data Target di Risoluzione |
|----------|----------|------------|---------------------------|
| [Problema 1] | [Alta/Media/Bassa] | [Se disponibile] | [Data] |

### Limitazioni

| Limitazione | Impatto | Motivazione | Piani Futuri |
|-------------|---------|-------------|--------------|
| [Limitazione 1] | [Effetto] | [Perche esiste] | [Quando/se affrontarla] |

## Vulnerabilita di Sicurezza

### Vulnerabilita Note

| CVE | Componente | Severita | Stato | Mitigazione |
|-----|------------|----------|-------|-------------|
| [CVE-ID] | [Libreria] | [Critica/Alta/Media] | [Aperta/Risolta] | [Azioni intraprese] |

## Problemi di Prestazioni

| Problema | Impatto | Workaround | Piano di Risoluzione |
|----------|---------|------------|---------------------|
| [Problema] | [Impatto sugli utenti] | [Soluzione temporanea] | [Soluzione permanente] |
`;
}

function getGlossaryTemplate(): string {
  return `# 12. Glossario

**Scopo**: Definisce termini importanti di business e tecnici per garantire una terminologia coerente.

## Termini di Business

| Termine | Definizione |
|---------|-------------|
| [Termine Business 1] | [Definizione chiara e concisa] |
| [Termine Business 2] | [Definizione] |

## Termini Tecnici

| Termine | Definizione | Sinonimi |
|---------|-------------|----------|
| [Termine Tecnico 1] | [Definizione] | [Nomi alternativi] |
| [Termine Tecnico 2] | [Definizione] | [Nomi alternativi] |

## Abbreviazioni e Acronimi

| Abbreviazione | Nome Completo | Contesto |
|---------------|---------------|----------|
| API | Application Programming Interface | [Quando/dove usato] |
| SLA | Service Level Agreement | [Contesto] |
| JWT | JSON Web Token | [Uso] |

## Concetti di Business

| Concetto | Descrizione | Termini Correlati |
|----------|-------------|-------------------|
| [Concetto 1] | [Spiegazione dettagliata] | [Concetti correlati] |

## Termini Specifici del Sistema

| Termine | Definizione | Esempio |
|---------|-------------|---------|
| [Termine Sistema 1] | [Cosa significa in questo sistema] | [Esempio di utilizzo] |

## Termini Deprecati

| Vecchio Termine | Sostituito Da | Motivo |
|-----------------|---------------|--------|
| [Vecchio termine] | [Nuovo termine] | [Perche cambiato] |

---

**Nota**: Mantieni questo glossario aggiornato man mano che emergono nuovi termini. Fai riferimento a questa sezione da altre parti della documentazione quando vengono usati questi termini.
`;
}

/**
 * Get the Italian workflow guide
 */
export function getWorkflowGuide(): string {
  return `# Guida al Workflow della Documentazione di Architettura arc42

## Panoramica

Questa guida ti aiuta a documentare la tua architettura software usando il template arc42. Il template arc42 e un template pratico e collaudato per documentare architetture software e di sistema.

## Lingue Disponibili

Questo arc42 MCP Server supporta piu lingue per la documentazione:

| Codice | Lingua | Nome Nativo |
|--------|--------|-------------|
| EN | Inglese | English |
| DE | Tedesco | Deutsch |
| CZ | Ceco | Cestina |
| ES | Spagnolo | Espanol |
| FR | Francese | Francais |
| IT | Italiano | Italiano |
| NL | Olandese | Nederlands |
| PT | Portoghese | Portugues |
| RU | Russo | Russkiy |
| UKR | Ucraino | Ukrayinska |
| ZH | Cinese | Zhongwen |

## Per Iniziare

### Passo 1: Inizializza il Workspace

Usa lo strumento \`arc42-init\` per creare il tuo workspace di documentazione:

\`\`\`
arc42-init(projectName: "Il Mio Progetto", language: "IT")
\`\`\`

Puoi specificare una lingua diversa usando il codice ISO della lingua.

### Passo 2: Controlla lo Stato

Usa \`arc42-status\` per vedere lo stato attuale della tua documentazione:

\`\`\`
arc42-status()
\`\`\`

### Passo 3: Genera Template per le Sezioni

Usa \`generate-template\` per ottenere template dettagliati per ogni sezione:

\`\`\`
generate-template(section: "01_introduction_and_goals", language: "IT")
\`\`\`

## Le 12 Sezioni arc42

1. **Introduzione e Obiettivi** - Inizia da qui! Definisci cosa stai costruendo e perche.
2. **Vincoli dell'Architettura** - Cosa NON puoi fare?
3. **Contesto e Ambito** - Cosa e dentro e cosa e fuori?
4. **Strategia di Soluzione** - Approccio di alto livello per risolvere il problema.
5. **Vista dei Building Block** - Struttura statica del tuo sistema.
6. **Vista Runtime** - Comportamento dinamico e scenari.
7. **Vista di Deployment** - Come viene deployato e operato?
8. **Concetti Trasversali** - Pattern usati in tutto il sistema.
9. **Decisioni Architetturali** - Decisioni importanti e le loro motivazioni.
10. **Requisiti di Qualita** - Scenari di qualita concreti.
11. **Rischi e Debito Tecnico** - Cosa potrebbe andare storto?
12. **Glossario** - Definisci i tuoi termini.

## Best Practice

1. **Inizia dalla Sezione 1** - Comprendere gli obiettivi e fondamentale
2. **Mantienilo conciso** - arc42 e pragmatico, non burocratico
3. **Usa diagrammi** - Un'immagine vale piu di mille parole
4. **Documenta le decisioni** - Il te stesso del futuro ti ringraziera
5. **Itera** - La documentazione dell'architettura non e mai "finita"

## Strumenti Disponibili

- \`arc42-init\` - Inizializza il workspace di documentazione
- \`arc42-status\` - Controlla lo stato della documentazione
- \`generate-template\` - Genera template per le sezioni
- \`update-section\` - Aggiorna il contenuto delle sezioni
- \`get-section\` - Leggi il contenuto delle sezioni
- \`arc42-workflow-guide\` - Mostra questa guida

## Risorse

- [Sito web arc42](https://arc42.org/)
- [Documentazione arc42](https://docs.arc42.org/)
- [Esempi arc42](https://arc42.org/examples)
`;
}

/**
 * Get the Italian README content
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Progetto';
  return `# ${name} - Documentazione dell'Architettura

Questa directory contiene la documentazione dell'architettura per ${name}, basata sul template arc42.

## Struttura

- \`sections/\` - File markdown delle singole sezioni (12 sezioni)
- \`images/\` - Diagrammi e immagini
- \`arc42-template.md\` - Documentazione principale combinata
- \`config.yaml\` - Configurazione

## Le 12 Sezioni arc42

1. **Introduzione e Obiettivi** - Requisiti, obiettivi di qualita, stakeholder
2. **Vincoli dell'Architettura** - Vincoli tecnici e organizzativi
3. **Contesto e Ambito** - Contesto di business e tecnico
4. **Strategia di Soluzione** - Decisioni e strategie fondamentali
5. **Vista dei Building Block** - Decomposizione statica
6. **Vista Runtime** - Comportamento dinamico
7. **Vista di Deployment** - Infrastruttura e deployment
8. **Concetti Trasversali** - Regole e approcci trasversali
9. **Decisioni Architetturali** - Decisioni importanti (ADR)
10. **Requisiti di Qualita** - Albero della qualita e scenari
11. **Rischi e Debito Tecnico** - Problemi noti e rischi
12. **Glossario** - Termini importanti

## Per Iniziare

1. Inizia dalla Sezione 1: Introduzione e Obiettivi
2. Lavora attraverso le sezioni iterativamente
3. Usa diagrammi per illustrare i concetti
4. Concentrati sulle decisioni, non sui dettagli implementativi

## Generare la Documentazione

Usa gli strumenti MCP per:
- Controllare lo stato: \`arc42-status\`
- Generare template: \`generate-template\`
- Aggiornare sezioni: \`update-section\`

## Risorse

- [Sito web arc42](https://arc42.org/)
- [Documentazione arc42](https://docs.arc42.org/)
- [Esempi arc42](https://arc42.org/examples)
`;
}
