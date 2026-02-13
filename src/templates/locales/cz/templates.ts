/**
 * Czech Templates
 * @module templates/locales/cz/templates
 */

import type { Arc42Section } from '../../../types.js';

export function getTemplate(section: Arc42Section): string {
  const templates: Record<Arc42Section, () => string> = {
    '01_introduction_and_goals': () => `# 1. Úvod a cíle

## Přehled požadavků

**Účel**: Popsat relevantní požadavky a hnací síly, které musí architekti a vývojový tým zvážit.

### Klíčové požadavky

| ID | Požadavek | Priorita |
|----|-----------|----------|
| REQ-1 | [Stručný popis] | Vysoká |
| REQ-2 | [Stručný popis] | Střední |

## Cíle kvality

| Priorita | Cíl kvality | Motivace |
|----------|-------------|----------|
| 1 | [např. Výkon] | [Proč je to kritické] |
| 2 | [např. Bezpečnost] | [Proč je to kritické] |

## Zainteresované strany

| Role/Jméno | Kontakt | Očekávání |
|------------|---------|-----------|
| Vlastník produktu | [Jméno/Email] | [Očekávání od architektury] |
| Vývojový tým | [Název týmu] | [Co potřebují vědět] |
`,
    '02_architecture_constraints': () => `# 2. Omezení architektury

## Technická omezení

| Omezení | Pozadí/Motivace |
|---------|-----------------|
| [např. Cloud platforma] | [Proč toto omezení existuje] |

## Organizační omezení

| Omezení | Pozadí/Motivace |
|---------|-----------------|
| [např. Struktura týmu] | [Jak to ovlivňuje architekturu] |

## Konvence

- [např. Mikroservisní architektura]
- [např. RESTful API design]
`,
    '03_context_and_scope': () => `# 3. Kontext a rozsah

## Obchodní kontext

### Diagram kontextu

\`\`\`
[Vytvořte diagram zobrazující váš systém a externí systémy/uživatele]
\`\`\`

### Externí rozhraní

| Externí entita | Rozhraní | Účel |
|----------------|----------|------|
| [Externí systém 1] | [API/Protokol] | [Jaká data/funkce se vyměňují] |

## Technický kontext

| Rozhraní | Technologie | Protokol | Formát |
|----------|-------------|----------|--------|
| [API 1] | [REST API] | [HTTPS] | [JSON] |
`,
    '04_solution_strategy': () => `# 4. Strategie řešení

## Klíčová rozhodnutí

### Architektonické vzory

| Vzor | Motivace | Důsledky |
|------|----------|----------|
| [např. Mikroservisy] | [Proč byl tento vzor zvolen] | [Výhody a kompromisy] |

### Technologická rozhodnutí

| Komponenta | Technologie | Důvod |
|------------|-------------|-------|
| Backend | [např. Node.js] | [Proč bylo zvoleno] |
| Frontend | [např. React] | [Důvody] |
`,
    '05_building_block_view': () => `# 5. Pohled stavebních bloků

## Úroveň 1: Kontext systému

### Whitebox: Celkový systém

\`\`\`
[Diagram komponent s hlavními stavebními bloky]
\`\`\`

| Komponenta | Zodpovědnost |
|------------|--------------|
| [Komponenta 1] | [Co dělá] |
| [Komponenta 2] | [Co dělá] |
`,
    '06_runtime_view': () => `# 6. Pohled běhu

## Klíčové scénáře

### Scénář 1: [Název]

**Popis**: [Co se děje v tomto scénáři]

\`\`\`mermaid
sequenceDiagram
    participant Uživatel
    participant Frontend
    participant API
    participant Databáze
\`\`\`
`,
    '07_deployment_view': () => `# 7. Pohled nasazení

## Přehled infrastruktury

\`\`\`
[Diagram zobrazující servery, kontejnery, sítě]
\`\`\`

## Prostředí

### Produkční prostředí

| Komponenta | Technologie | Konfigurace |
|------------|-------------|-------------|
| [Aplikační server] | [AWS ECS] | [Specifikace] |
`,
    '08_concepts': () => `# 8. Průřezové koncepty

## Doménové modely

### Klíčové entity

| Entita | Zodpovědnost | Vztahy |
|--------|--------------|--------|
| [Entita 1] | [Účel] | [Související entity] |

## Bezpečnost

### Autentizace
- Metoda: [JWT, OAuth2, atd.]

### Autorizace
- Model: [RBAC, ABAC, atd.]
`,
    '09_architecture_decisions': () => `# 9. Architektonická rozhodnutí

## Formát ADR

- **Kontext**: Jaký problém řešíme?
- **Rozhodnutí**: Co jsme se rozhodli udělat
- **Důsledky**: Co se stane jednodušším nebo těžším

### ADR-001: [Název rozhodnutí]

**Datum**: [RRRR-MM-DD]
**Status**: [Navrženo | Přijato | Zastaralé]

**Kontext**: [Popis problému]

**Rozhodnutí**: [Co jsme se rozhodli]

**Důsledky**:
- Pozitivní: [Výhoda 1]
- Negativní: [Kompromis 1]
`,
    '10_quality_requirements': () => `# 10. Požadavky na kvalitu

## Strom kvality

\`\`\`
Kvalita
├── Výkon
├── Bezpečnost
├── Spolehlivost
└── Udržovatelnost
\`\`\`

## Scénáře kvality

| Aspekt | Popis |
|--------|-------|
| Scénář | Uživatel požaduje data při normální zátěži |
| Měřítko | 95. percentil doby odezvy < 200ms |
`,
    '11_technical_risks': () => `# 11. Rizika a technický dluh

## Rizika

| Riziko | Pravděpodobnost | Dopad | Status |
|--------|-----------------|-------|--------|
| [Riziko 1] | [Vysoká/Střední/Nízká] | [Vysoký/Střední/Nízký] | [Otevřeno/Zmírněno] |

## Technický dluh

| Položka | Typ | Dopad | Priorita |
|---------|-----|-------|----------|
| [Dluh 1] | [Kód/Architektura] | [Vysoký/Střední/Nízký] | [1-5] |
`,
    '12_glossary': () => `# 12. Slovník

## Obchodní pojmy

| Pojem | Definice |
|-------|----------|
| [Obchodní pojem 1] | [Jasná, stručná definice] |

## Technické pojmy

| Pojem | Definice | Synonyma |
|-------|----------|----------|
| [Technický pojem 1] | [Definice] | [Alternativní názvy] |
`
  };
  return templates[section]();
}

export function getWorkflowGuide(): string {
  return `# Průvodce dokumentací architektury arc42

## Přehled

Tento průvodce vám pomůže dokumentovat architekturu softwaru pomocí šablony arc42.

## 12 sekcí arc42

1. **Úvod a cíle** - Definujte, co stavíte a proč
2. **Omezení architektury** - Co nesmíte dělat?
3. **Kontext a rozsah** - Co je uvnitř a co venku?
4. **Strategie řešení** - Vysokoúrovňový přístup
5. **Pohled stavebních bloků** - Statická struktura
6. **Pohled běhu** - Dynamické chování
7. **Pohled nasazení** - Infrastruktura
8. **Průřezové koncepty** - Vzory používané v celém systému
9. **Architektonická rozhodnutí** - Důležitá rozhodnutí
10. **Požadavky na kvalitu** - Scénáře kvality
11. **Rizika a technický dluh** - Co se může pokazit?
12. **Slovník** - Definice pojmů

## Zdroje

- [arc42 Web](https://arc42.org/)
`;
}

export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Projekt';
  return `# ${name} - Dokumentace architektury

Tento adresář obsahuje dokumentaci architektury pro ${name}, založenou na šabloně arc42.

## Struktura

- \`sections/\` - Jednotlivé markdown soubory sekcí (12 sekcí)
- \`images/\` - Diagramy a obrázky
- \`config.yaml\` - Konfigurace

## Začínáme

1. Začněte sekcí 1: Úvod a cíle
2. Procházejte sekce iterativně
3. Používejte diagramy pro ilustraci konceptů
`;
}
