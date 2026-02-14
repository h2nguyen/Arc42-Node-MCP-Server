/**
 * Czech Templates - AsciiDoc Format
 *
 * Contains all arc42 section templates in Czech using AsciiDoc syntax.
 * Based on the official arc42 templates from vendor/arc42-template.
 *
 * @module templates/locales/cz/templates-asciidoc
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Czech AsciiDoc template for a specific section
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
  return `= 1. Uvod a cile

== Prehled pozadavku

*Ucel*: Shrnuje klicove pozadavky a omezeni, se kterymi musi softwarovi architekti i vyvojovy tym pocitat.

=== Klicove pozadavky

// Uvedte 3-5 hlavnich funkcnich pozadavku

[options="header",cols="1,3,1"]
|===
|ID |Pozadavek |Priorita
|REQ-1 |[Strucny popis] |Vysoka
|REQ-2 |[Strucny popis] |Stredni
|===

=== Funkce

// Zakladni vlastnosti systemu

* Funkce 1: [Popis]
* Funkce 2: [Popis]

== Kvalitativni cile

*Ucel*: Definujte 3-5 nejdulezitejsich kvalitativnich cilu, ktere jsou pro zainteresovane strany nejdulezitejsi.

// Na zaklade ISO 25010 uprednostnete kvality jako:
// Vykon, Bezpecnost, Spolehlivost, Udrzovatelnost, Pouzitelnost atd.

[options="header",cols="1,2,3"]
|===
|Priorita |Kvalitativni cil |Motivace
|1 |[napr. Vykon] |[Proc je to kriticke]
|2 |[napr. Bezpecnost] |[Proc je to kriticke]
|3 |[napr. Udrzovatelnost] |[Proc je to kriticke]
|===

== Strany zainteresovane na systemu (stakeholder)

*Ucel*: Identifikujte vsechny, kteri by meli architekturu znat.

[options="header",cols="2,2,3"]
|===
|Role/Jmeno |Kontakt |Ocekavani
|Product Owner |[Jmeno/Email] |[Co ocekavaji od architektury]
|Vyvojovy tym |[Nazev tymu] |[Co potrebuji vedet]
|Provoz |[Tym/Osoba] |[Pozadavky na nasazeni a provoz]
|Koncoví uzivatele |[Typ] |[Ocekavani uzivatelskeho rozhrani]
|===

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-1/[Uvod a cile] v dokumentaci arc42.
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `= 2. Omezeni na realizaci systemu

*Ucel*: Dokumentujte vsechny pozadavky, ktere architekty omezuji v jejich svobode navrhovani a implementace.

== Technicka omezeni

[options="header",cols="1,3"]
|===
|Omezeni |Vysvetleni
|[napr. Musi bezet na Linuxu] |[Proc toto omezeni existuje]
|[napr. Java 17 minimum] |[Organizacni pozadavek]
|===

== Organizacni omezeni

[options="header",cols="1,3"]
|===
|Omezeni |Vysvetleni
|[napr. Velikost tymu: 5 vyvojaru] |[Dopad na architekturu]
|[napr. Casovy ramec: 6 mesicu] |[Omezeni dodani]
|===

== Konvence

[options="header",cols="1,3"]
|===
|Konvence |Vysvetleni
|[napr. Styl kodu: Google Java Style] |[Odkaz na pruvodce stylem]
|[napr. Dokumentace: arc42] |[Pozadavky na dokumentaci]
|===

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-2/[Omezeni architektury] v dokumentaci arc42.
`;
}

function getContextAndScopeTemplate(): string {
  return `= 3. Vymezeni a rozsah systemu

*Ucel*: Vymezuje vas system od jeho komunikacnich partneru (sousedni systemy a uzivatele).

== Firemni kontext

*Ucel*: Specifikuje vsechny komunikacni partnery systemu (uzivatele, IT systemy, ...) s vysvetlenim domenove specifickych vstupu a vystupu.

// Vlozte kontextovy diagram (PlantUML, Mermaid nebo obrazek)

[plantuml, business-context, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(user, "Uzivatel", "Uzivatel systemu")
System(system, "Vas system", "Popis")
System_Ext(external, "Externi system", "Popis")

Rel(user, system, "Pouziva")
Rel(system, external, "Vola")
@enduml
----

[options="header",cols="1,2,2"]
|===
|Partner |Vstup |Vystup
|[Jmeno uzivatele/systemu] |[Co posilaji] |[Co prijimaji]
|===

== Technicky kontext

*Ucel*: Specifikuje technicke kanaly a protokoly mezi systemem a jeho kontextem.

// Technicka infrastruktura s protokoly

[options="header",cols="1,1,2"]
|===
|Partner |Kanal |Protokol
|[Nazev systemu] |[napr. REST API] |[napr. HTTPS, JSON]
|[Nazev systemu] |[napr. Fronta zprav] |[napr. AMQP]
|===

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-3/[Kontext a rozsah] v dokumentaci arc42.
`;
}

function getSolutionStrategyTemplate(): string {
  return `= 4. Strategie reseni

*Ucel*: Shrnuti zasadnich rozhodnuti a strategii reseni, ktere utvareji architekturu.

== Technologicka rozhodnuti

[options="header",cols="1,2,2"]
|===
|Rozhodnuti |Volba |Zduvodneni
|Programovaci jazyk |[napr. TypeScript] |[Proc tato volba]
|Framework |[napr. NestJS] |[Proc tato volba]
|Databaze |[napr. PostgreSQL] |[Proc tata volba]
|===

== Dekompozice nejvyssi urovne

Popiste strukturu na vysoke urovni:

* [napr. Vrstvena architektura]
* [napr. Mikrosluzby]
* [napr. Rizena udalostmi]

== Strategie dosazeni kvality

[options="header",cols="1,2"]
|===
|Kvalitativni cil |Strategie dosazeni
|[Vykon] |[napr. Cache, asynchronni zpracovani]
|[Bezpecnost] |[napr. OAuth2, sifrovani v klidu]
|[Udrzovatelnost] |[napr. Cista architektura, komplexni testy]
|===

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-4/[Strategie reseni] v dokumentaci arc42.
`;
}

function getBuildingBlockViewTemplate(): string {
  return `= 5. Perspektiva stavebnich bloku

*Ucel*: Staticka dekompozice systemu na stavebni bloky s jejich zavislostmi.

== Uroven 1: Cely system

*Ucel*: Popis white-box ukazuje vnitrni strukturu celeho systemu.

=== Popis white-box

// Vlozte diagram komponent

[plantuml, building-blocks-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Container(web, "Webova aplikace", "React", "Uzivatelske rozhrani")
Container(api, "API Server", "Node.js", "Obchodni logika")
ContainerDb(db, "Databaze", "PostgreSQL", "Uloziste dat")

Rel(web, api, "Vola", "REST/JSON")
Rel(api, db, "Cte/Zapisuje", "SQL")
@enduml
----

=== Obsazene stavebni bloky

[options="header",cols="1,3"]
|===
|Stavebni blok |Popis
|[Komponenta A] |[Odpovednost a ucel]
|[Komponenta B] |[Odpovednost a ucel]
|===

== Uroven 2: [Nazev subsystemu]

*Ucel*: Rozklad hlavnich komponent na mensi stavebni bloky.

=== White-box [Komponenta A]

// Popiste vnitrni strukturu Komponenty A

[options="header",cols="1,3"]
|===
|Stavebni blok |Popis
|[Sub-komponenta A.1] |[Odpovednost]
|[Sub-komponenta A.2] |[Odpovednost]
|===

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-5/[Perspektiva stavebnich bloku] v dokumentaci arc42.
`;
}

function getRuntimeViewTemplate(): string {
  return `= 6. Perspektiva chovani za behu (runtime)

*Ucel*: Dokumentujte chovani a interakce stavebnich bloku za behu.

== Scenar 1: [napr. Prihlaseni uzivatele]

// Popiste chovani za behu pro klicovy scenar

[plantuml, runtime-login, svg]
----
@startuml
actor Uzivatel
participant "Webova aplikace" as Web
participant "API Server" as API
participant "Autentizacni sluzba" as Auth
database "Uzivatelska DB" as DB

Uzivatel -> Web: Zadani udaju
Web -> API: POST /auth/login
API -> Auth: Overeni udaju
Auth -> DB: Dotaz na uzivatele
DB --> Auth: Data uzivatele
Auth --> API: JWT token
API --> Web: Uspech + token
Web --> Uzivatel: Dashboard
@enduml
----

=== Popis

. Uzivatel zada prihlasovaci udaje do webove aplikace
. Webova aplikace odesle pozadavek na prihlaseni na API server
. API overi udaje vuci autentizacni sluzbe
. Pri uspechu je vracen JWT token

== Scenar 2: [napr. Zpracovani dat]

// Zdokumentujte dalsi dulezity scenar za behu

=== Popis

[Popiste kroky a interakce]

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-6/[Perspektiva runtime] v dokumentaci arc42.
`;
}

function getDeploymentViewTemplate(): string {
  return `= 7. Perspektiva nasazeni softwaru (deployment)

*Ucel*: Technicka infrastruktura s prostredimi, pocitaci, procesory, topologiemi.

== Uroven infrastruktury 1

*Ucel*: Prehled infrastruktury nasazeni.

[plantuml, deployment-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

Deployment_Node(cloud, "Cloudovy poskytovatel", "AWS/Azure/GCP") {
    Deployment_Node(web_tier, "Webova vrstva") {
        Container(web, "Webovy server", "nginx", "Staticke soubory + reverzni proxy")
    }
    Deployment_Node(app_tier, "Aplikacni vrstva") {
        Container(api, "API Server", "Node.js", "Obchodni logika")
    }
    Deployment_Node(data_tier, "Datova vrstva") {
        ContainerDb(db, "Databaze", "PostgreSQL", "Primarni uloziste")
    }
}
@enduml
----

=== Motivace

[Proc byla zvolena tato architektura nasazeni]

=== Kvalitativni a vykonnostni vlastnosti

[Jak toto nasazeni podporuje kvalitativni cile]

== Uroven infrastruktury 2

*Ucel*: Podrobny pohled na konkretni uzly nasazeni.

=== [Nazev uzlu]

[options="header",cols="1,3"]
|===
|Aspekt |Popis
|Hardware |[napr. 4 vCPU, 16GB RAM]
|Software |[napr. Ubuntu 22.04, Docker 24.x]
|Sit |[napr. VPC, bezpecnostni skupiny]
|===

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-7/[Perspektiva nasazeni] v dokumentaci arc42.
`;
}

function getConceptsTemplate(): string {
  return `= 8. Prurezove (cross-cutting) koncepty

*Ucel*: Presahujici principy a reseni relevantni pro vice casti systemu.

== Domenovy model

// Zakladni domenove koncepty a jejich vztahy

[plantuml, domain-model, svg]
----
@startuml
class Uzivatel {
  +id: UUID
  +email: String
  +jmeno: String
}
class Objednavka {
  +id: UUID
  +stav: StavObjednavky
  +vytvoreno: DateTime
}
Uzivatel "1" -- "*" Objednavka : vytvari
@enduml
----

== Koncept bezpecnosti

=== Autentizace

[Popiste pristup k autentizaci: JWT, OAuth2, atd.]

=== Autorizace

[Popiste pristup k autorizaci: RBAC, ABAC, atd.]

== Zpracovani chyb

[Popiste, jak jsou chyby zpracovavany v celem systemu]

* [napr. Globalni handler chyb]
* [napr. Strukturovane odpovedi na chyby]
* [napr. Strategie logovani chyb]

== Logovani a monitoring

[options="header",cols="1,2"]
|===
|Aspekt |Pristup
|Logovani |[napr. Strukturovane JSON logy, ELK stack]
|Metriky |[napr. Prometheus, Grafana]
|Trasovani |[napr. OpenTelemetry, Jaeger]
|===

== Strategie testovani

[options="header",cols="1,2,1"]
|===
|Typ |Rozsah |Cilove pokryti
|Unit testy |Jednotlive funkce/tridy |80%
|Integracni testy |Interakce komponent |Klicove cesty
|E2E testy |Cele uzivatelske cesty |Kriticke toky
|===

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-8/[Prurezove koncepty] v dokumentaci arc42.
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `= 9. Rozhodnuti o architekture

*Ucel*: Dokumentujte dulezita, draha, rozsahla nebo riskantni architektonicka rozhodnuti.

== ADR-001: [Nazev rozhodnuti]

=== Stav

[Navrzeno | Prijato | Zastarale | Nahrazeno]

=== Kontext

[Popiste problem motivujici toto rozhodnuti]

=== Rozhodnuti

[Popiste rozhodnuti, ktere bylo ucineno]

=== Dusledky

*Pozitivni:*

* [Vyhoda 1]
* [Vyhoda 2]

*Negativni:*

* [Nevyhoda 1]
* [Nevyhoda 2]

=== Zvazene alternativy

[options="header",cols="1,2,2"]
|===
|Alternativa |Vyhody |Nevyhody
|[Moznost A] |[Vyhody] |[Nevyhody]
|[Moznost B] |[Vyhody] |[Nevyhody]
|===

'''

== ADR-002: [Nazev rozhodnuti]

// Pouzijte stejnou sablonu pro dalsi rozhodnuti

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-9/[Rozhodnuti o architekture] v dokumentaci arc42.
`;
}

function getQualityRequirementsTemplate(): string {
  return `= 10. Pozadavky na kvalitu

*Ucel*: Konkretni pozadavky na kvalitu se scenari pro vyhodnoceni.

== Prehled pozadavku na kvalitu

// Vizualni reprezentace kvalitativnich cilu a jejich upresneni

[plantuml, quality-tree, svg]
----
@startmindmap
* Kvalita
** Vykon
*** Doba odezvy
*** Propustnost
** Bezpecnost
*** Autentizace
*** Autorizace
** Udrzovatelnost
*** Modularita
*** Testovatelnost
@endmindmap
----

== Scenare kvality

=== Scenare vykonu

[options="header",cols="1,2,1,1"]
|===
|ID |Scenar |Ocekavana odezva |Priorita
|PERF-1 |Uzivatel pozaduje dashboard pri normalni zatezi |< 200ms |Vysoka
|PERF-2 |System zvladne 1000 soucastnych uzivatelu |Zadna degradace |Stredni
|===

=== Scenare bezpecnosti

[options="header",cols="1,2,1,1"]
|===
|ID |Scenar |Ocekavane chovani |Priorita
|SEC-1 |Neplatny pokus o prihlaseni |Zamknuti uctu po 5 pokusech |Vysoka
|SEC-2 |Neautorizovany pristup k API |401 odpoved, auditni log |Vysoka
|===

=== Scenare udrzovatelnosti

[options="header",cols="1,2,1,1"]
|===
|ID |Scenar |Ocekavana narocnost |Priorita
|MAINT-1 |Pridani noveho typu entity |< 2 dny vyvoje |Stredni
|MAINT-2 |Aktualizace verze zavislosti |< 4 hodiny vcetne testu |Stredni
|===

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-10/[Pozadavky na kvalitu] v dokumentaci arc42.
`;
}

function getTechnicalRisksTemplate(): string {
  return `= 11. Rizika a technicke dluhy

*Ucel*: Identifikujte a sledujte znama technicka rizika a nahromadeny technicky dluh.

== Technicka rizika

[options="header",cols="1,2,1,2"]
|===
|Riziko |Popis |Pravdepodobnost |Zmírneni
|[napr. Vypadek API tretí strany] |[Externi sluzba, na ktere zavisime] |Stredni |[Circuit breaker, fallback]
|[napr. Ztrata dat] |[Poskozeni databaze] |Nizka |[Zalohy, replikace]
|===

== Technicky dluh

[options="header",cols="1,2,1,1"]
|===
|Polozka |Popis |Dopad |Priorita
|[napr. Zastarala autentizace] |[Stary autentizacni system potrebuje nahrazeni] |Vysoky |Stredni
|[napr. Chybejici testy] |[Pokryti pod cilem v modulu X] |Stredni |Nizka
|===

== Monitoring rizik

[Popiste, jak jsou rizika monitorovana a kontrolovana]

* [napr. Tydenni schuzky k rizikum]
* [napr. Automatizovane monitorovaci upozorneni]

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-11/[Rizika a technicky dluh] v dokumentaci arc42.
`;
}

function getGlossaryTemplate(): string {
  return `= 12. Slovnik pojmu

*Ucel*: Definujte dulezite domenove a technicke terminy pouzivane v dokumentaci architektury.

== Domenove terminy

[options="header",cols="1,3"]
|===
|Termin |Definice
|[Domenovy termin 1] |[Jasna, strucna definice]
|[Domenovy termin 2] |[Jasna, strucna definice]
|===

== Technicke terminy

[options="header",cols="1,3"]
|===
|Termin |Definice
|[Technicky termin 1] |[Jasna, strucna definice]
|[Technicky termin 2] |[Jasna, strucna definice]
|===

== Zkratky

[options="header",cols="1,3"]
|===
|Zkratka |Vyznam
|API |Application Programming Interface (Rozhrani pro programovani aplikaci)
|JWT |JSON Web Token
|REST |Representational State Transfer
|===

.Dalsi informace
Viz odkaz:https://docs.arc42.org/section-12/[Slovnik pojmu] v dokumentaci arc42.
`;
}

/**
 * Get the Czech workflow guide in AsciiDoc format
 */
export function getWorkflowGuide(): string {
  return `= Pruvodce pracovnim postupem dokumentace architektury arc42

== Prehled

Tento pruvodce vam pomaha dokumentovat vasi softwarovou architekturu pomoci sablony arc42. Sablona arc42 je prakticka, overena sablona pro dokumentaci softwarovych a systemovych architektur.

== Dostupne jazyky

Tento arc42 MCP Server podporuje vice jazyku pro dokumentaci:

[options="header",cols="1,2,2"]
|===
|Kod |Jazyk |Nazev v narodnim jazyce
|EN |Anglictina |English
|DE |Nemcina |Deutsch
|CZ |Cestina |Cestina
|ES |Spanelstina |Espanol
|FR |Francouzstina |Francais
|IT |Italstina |Italiano
|NL |Holandstina |Nederlands
|PT |Portugalstina |Portugues
|RU |Rustina |Russkij
|UKR |Ukrajinstina |Ukrajinska
|ZH |Cinstina |Zhongwen
|===

== Zacatek prace

=== Krok 1: Inicializace pracovniho prostoru

Pouzijte nastroj \`arc42-init\` k vytvoreni pracovniho prostoru pro dokumentaci:

[source]
----
arc42-init(projectName: "Muj projekt", language: "CZ")
----

Muzete specifikovat jiny jazyk pomoci ISO kodu jazyka.

=== Krok 2: Kontrola stavu

Pouzijte \`arc42-status\` pro zobrazeni aktualniho stavu vasi dokumentace:

[source]
----
arc42-status()
----

=== Krok 3: Generovani sablon sekci

Pouzijte \`generate-template\` pro ziskani podrobnych sablon pro kazdou sekci:

[source]
----
generate-template(section: "01_introduction_and_goals", language: "CZ")
----

== 12 sekci arc42

. *Uvod a cile* - Zacnete zde! Definujte, co stavite a proc.
. *Omezeni architektury* - Co NESMITE delat?
. *Kontext a rozsah* - Co je uvnitr a co venku?
. *Strategie reseni* - Pristup na vysoke urovni k reseni problemu.
. *Perspektiva stavebnich bloku* - Staticka struktura vaseho systemu.
. *Perspektiva runtime* - Dynamicke chovani a scenare.
. *Perspektiva nasazeni* - Jak je system nasazen a provozovan?
. *Prurezove koncepty* - Vzory pouzivane napric systemem.
. *Rozhodnuti o architekture* - Dulezita rozhodnuti a jejich zduvodneni.
. *Pozadavky na kvalitu* - Konkretni scenare kvality.
. *Rizika a technicky dluh* - Co se muze pokazit?
. *Slovnik pojmu* - Definujte sve terminy.

== Osvedcene postupy

. *Zacnete sekci 1* - Pochopeni cilu je zakladni
. *Budte strucni* - arc42 je pragmaticky, ne byrokraticky
. *Pouzivejte diagramy* - Obrazek vydá za tisic slov
. *Dokumentujte rozhodnuti* - Budouci vy podekujete soucasnemu vam
. *Iterujte* - Dokumentace architektury neni nikdy "hotova"

== Dostupne nastroje

* \`arc42-init\` - Inicializace pracovniho prostoru dokumentace
* \`arc42-status\` - Kontrola stavu dokumentace
* \`generate-template\` - Generovani sablon sekci
* \`update-section\` - Aktualizace obsahu sekce
* \`get-section\` - Cteni obsahu sekce
* \`arc42-workflow-guide\` - Zobrazeni tohoto pruvodce

== Zdroje

* odkaz:https://arc42.org/[Webove stranky arc42]
* odkaz:https://docs.arc42.org/[Dokumentace arc42]
* odkaz:https://arc42.org/examples[Priklady arc42]
`;
}

/**
 * Get the Czech README content in AsciiDoc format
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Projekt';
  return `= ${name} - Dokumentace architektury

Tento adresar obsahuje dokumentaci architektury pro ${name}, nasledujici sablonu arc42.

== Struktura

* \`sections/\` - Jednotlive AsciiDoc soubory sekci (12 sekci)
* \`images/\` - Diagramy a obrazky
* \`arc42-documentation.adoc\` - Hlavni kombinovana dokumentace
* \`config.yaml\` - Konfigurace

== 12 sekci arc42

. *Uvod a cile* - Pozadavky, kvalitativni cile, zainteresovane strany
. *Omezeni architektury* - Technicka a organizacni omezeni
. *Kontext a rozsah* - Obchodni a technicky kontext
. *Strategie reseni* - Zakladni rozhodnuti a strategie
. *Perspektiva stavebnich bloku* - Staticka dekompozice
. *Perspektiva runtime* - Dynamicke chovani
. *Perspektiva nasazeni* - Infrastruktura a nasazeni
. *Prurezove koncepty* - Celkove predpisy a pristupy
. *Rozhodnuti o architekture* - Dulezita rozhodnuti (ADR)
. *Pozadavky na kvalitu* - Strom kvality a scenare
. *Rizika a technicky dluh* - Zname problemy a rizika
. *Slovnik pojmu* - Dulezite terminy

== Zacatek prace

. Zacnete sekci 1: Uvod a cile
. Pracujte na sekcich iterativne
. Pouzivejte diagramy k ilustraci konceptu
. Zameřte se na rozhodnuti, ne na detaily implementace

== Generovani dokumentace

Pouzijte MCP nastroje pro:

* Kontrolu stavu: \`arc42-status\`
* Generovani sablon: \`generate-template\`
* Aktualizaci sekci: \`update-section\`

== Zdroje

* odkaz:https://arc42.org/[Webove stranky arc42]
* odkaz:https://docs.arc42.org/[Dokumentace arc42]
* odkaz:https://arc42.org/examples[Priklady arc42]
`;
}
