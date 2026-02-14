/**
 * Portuguese Templates - AsciiDoc Format
 *
 * Contains all arc42 section templates in Portuguese using AsciiDoc syntax.
 * Based on the official arc42 templates from vendor/arc42-template.
 *
 * @module templates/locales/pt/templates-asciidoc
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Portuguese AsciiDoc template for a specific section
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
  return `= 1. Introdução e Objetivos

== Visão Geral dos Requisitos

*Propósito*: Descreve os requisitos relevantes e as forças motrizes que os arquitetos de software e a equipe de desenvolvimento devem considerar.

=== Requisitos Chave

// Liste os 3-5 principais requisitos funcionais

[options="header",cols="1,3,1"]
|===
|ID |Requisito |Prioridade
|REQ-1 |[Breve descrição] |Alta
|REQ-2 |[Breve descrição] |Média
|===

=== Funcionalidades

// Funcionalidades essenciais do sistema

* Funcionalidade 1: [Descrição]
* Funcionalidade 2: [Descrição]

== Objetivos de Qualidade

*Propósito*: Define os 3-5 principais objetivos de qualidade que são mais importantes para as partes interessadas.

// Com base na ISO 25010, priorize qualidades como:
// Desempenho, Segurança, Confiabilidade, Manutenibilidade, Usabilidade, etc.

[options="header",cols="1,2,3"]
|===
|Prioridade |Objetivo de Qualidade |Motivação
|1 |[ex., Desempenho] |[Por que isso é crítico]
|2 |[ex., Segurança] |[Por que isso é crítico]
|3 |[ex., Manutenibilidade] |[Por que isso é crítico]
|===

== Partes Interessadas

*Propósito*: Identifique todos que devem conhecer a arquitetura.

[options="header",cols="2,2,3"]
|===
|Função/Nome |Contato |Expectativas
|Product Owner |[Nome/Email] |[O que esperam da arquitetura]
|Equipe de Desenvolvimento |[Nome da equipe] |[O que precisam saber]
|Operações |[Equipe/Pessoa] |[Preocupações de implantação e operações]
|Usuários Finais |[Tipo] |[Expectativas de experiência do usuário]
|===

.Mais Informações
Consulte link:https://docs.arc42.org/section-1/[Introduction and Goals] na documentação do arc42.
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `= 2. Restrições Arquiteturais

*Propósito*: Documente quaisquer requisitos que restrinjam os arquitetos em sua liberdade de decisões de design e implementação.

== Restrições Técnicas

[options="header",cols="1,3"]
|===
|Restrição |Explicação
|[ex., Deve rodar em Linux] |[Por que essa restrição existe]
|[ex., Java 17 mínimo] |[Requisito organizacional]
|===

== Restrições Organizacionais

[options="header",cols="1,3"]
|===
|Restrição |Explicação
|[ex., Tamanho da equipe: 5 desenvolvedores] |[Impacto na arquitetura]
|[ex., Prazo: 6 meses] |[Restrições de entrega]
|===

== Convenções

[options="header",cols="1,3"]
|===
|Convenção |Explicação
|[ex., Estilo de código: Google Java Style] |[Link para guia de estilo]
|[ex., Documentação: arc42] |[Requisitos de documentação]
|===

.Mais Informações
Consulte link:https://docs.arc42.org/section-2/[Architecture Constraints] na documentação do arc42.
`;
}

function getContextAndScopeTemplate(): string {
  return `= 3. Contexto e Escopo

*Propósito*: Delimita seu sistema de seus parceiros de comunicação (sistemas vizinhos e usuários).

== Contexto Negocial

*Propósito*: Especifique todos os parceiros de comunicação (usuários, sistemas de TI, ...) com explicações de entradas e saídas específicas do domínio.

// Adicione um diagrama de contexto aqui (PlantUML, Mermaid, ou imagem)

[plantuml, business-context, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(user, "Usuário", "Usuário do sistema")
System(system, "Seu Sistema", "Descrição")
System_Ext(external, "Sistema Externo", "Descrição")

Rel(user, system, "Usa")
Rel(system, external, "Chama")
@enduml
----

[options="header",cols="1,2,2"]
|===
|Parceiro |Entrada |Saída
|[Nome do Usuário/Sistema] |[O que enviam] |[O que recebem]
|===

== Contexto Técnico

*Propósito*: Especifique os canais técnicos e protocolos entre o sistema e seu contexto.

// Infraestrutura técnica com protocolos

[options="header",cols="1,1,2"]
|===
|Parceiro |Canal |Protocolo
|[Nome do Sistema] |[ex., API REST] |[ex., HTTPS, JSON]
|[Nome do Sistema] |[ex., Fila de Mensagens] |[ex., AMQP]
|===

.Mais Informações
Consulte link:https://docs.arc42.org/section-3/[Context and Scope] na documentação do arc42.
`;
}

function getSolutionStrategyTemplate(): string {
  return `= 4. Estratégia de Solução

*Propósito*: Resumo das decisões fundamentais e estratégias de solução que moldam a arquitetura.

== Decisões de Tecnologia

[options="header",cols="1,2,2"]
|===
|Decisão |Escolha |Justificativa
|Linguagem de Programação |[ex., TypeScript] |[Por que essa escolha]
|Framework |[ex., NestJS] |[Por que essa escolha]
|Banco de Dados |[ex., PostgreSQL] |[Por que essa escolha]
|===

== Decomposição de Alto Nível

Descreva a estrutura de alto nível:

* [ex., Arquitetura em camadas]
* [ex., Microsserviços]
* [ex., Orientado a eventos]

== Estratégias de Alcance de Qualidade

[options="header",cols="1,2"]
|===
|Objetivo de Qualidade |Estratégia de Alcance
|[Desempenho] |[ex., Cache, processamento assíncrono]
|[Segurança] |[ex., OAuth2, criptografia em repouso]
|[Manutenibilidade] |[ex., Arquitetura limpa, testes abrangentes]
|===

.Mais Informações
Consulte link:https://docs.arc42.org/section-4/[Solution Strategy] na documentação do arc42.
`;
}

function getBuildingBlockViewTemplate(): string {
  return `= 5. Visão de Blocos de Construção

*Propósito*: Decomposição estática do sistema em blocos de construção com suas dependências.

== Nível 1: Sistema Geral

*Propósito*: A descrição de caixa branca mostra a estrutura interna do sistema geral.

=== Descrição de Caixa Branca

// Adicione um diagrama de componentes aqui

[plantuml, building-blocks-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Container(web, "Aplicação Web", "React", "Interface do usuário")
Container(api, "Servidor API", "Node.js", "Lógica de negócios")
ContainerDb(db, "Banco de Dados", "PostgreSQL", "Armazenamento de dados")

Rel(web, api, "Chama", "REST/JSON")
Rel(api, db, "Lê/Escreve", "SQL")
@enduml
----

=== Blocos de Construção Contidos

[options="header",cols="1,3"]
|===
|Bloco de Construção |Descrição
|[Componente A] |[Responsabilidade e propósito]
|[Componente B] |[Responsabilidade e propósito]
|===

== Nível 2: [Nome do Subsistema]

*Propósito*: Decomponha os componentes principais em blocos de construção menores.

=== Caixa Branca [Componente A]

// Descreva a estrutura interna do Componente A

[options="header",cols="1,3"]
|===
|Bloco de Construção |Descrição
|[Subcomponente A.1] |[Responsabilidade]
|[Subcomponente A.2] |[Responsabilidade]
|===

.Mais Informações
Consulte link:https://docs.arc42.org/section-5/[Building Block View] na documentação do arc42.
`;
}

function getRuntimeViewTemplate(): string {
  return `= 6. Visão de Tempo de Execução

*Propósito*: Documente o comportamento e a interação dos blocos de construção durante o tempo de execução.

== Cenário 1: [ex., Login de Usuário]

// Descreva o comportamento em tempo de execução para um cenário chave

[plantuml, runtime-login, svg]
----
@startuml
actor Usuário
participant "App Web" as Web
participant "Servidor API" as API
participant "Serviço de Auth" as Auth
database "BD Usuário" as DB

Usuário -> Web: Inserir credenciais
Web -> API: POST /auth/login
API -> Auth: Validar credenciais
Auth -> DB: Consultar usuário
DB --> Auth: Dados do usuário
Auth --> API: Token JWT
API --> Web: Sucesso + token
Web --> Usuário: Dashboard
@enduml
----

=== Descrição

. Usuário insere credenciais na aplicação web
. App web envia requisição de login para o servidor API
. API valida credenciais contra o serviço de autenticação
. Em caso de sucesso, token JWT é retornado

== Cenário 2: [ex., Processamento de Dados]

// Documente outro cenário importante de tempo de execução

=== Descrição

[Descreva os passos e interações]

.Mais Informações
Consulte link:https://docs.arc42.org/section-6/[Runtime View] na documentação do arc42.
`;
}

function getDeploymentViewTemplate(): string {
  return `= 7. Visão de Implantação

*Propósito*: Infraestrutura técnica com ambientes, computadores, processadores, topologias.

== Nível de Infraestrutura 1

*Propósito*: Visão geral da infraestrutura de implantação.

[plantuml, deployment-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

Deployment_Node(cloud, "Provedor de Nuvem", "AWS/Azure/GCP") {
    Deployment_Node(web_tier, "Camada Web") {
        Container(web, "Servidor Web", "nginx", "Arquivos estáticos + proxy reverso")
    }
    Deployment_Node(app_tier, "Camada de Aplicação") {
        Container(api, "Servidor API", "Node.js", "Lógica de negócios")
    }
    Deployment_Node(data_tier, "Camada de Dados") {
        ContainerDb(db, "Banco de Dados", "PostgreSQL", "Armazenamento primário")
    }
}
@enduml
----

=== Motivação

[Por que essa arquitetura de implantação foi escolhida]

=== Características de Qualidade e Desempenho

[Como essa implantação suporta os objetivos de qualidade]

== Nível de Infraestrutura 2

*Propósito*: Visão detalhada de nós de implantação específicos.

=== [Nome do Nó]

[options="header",cols="1,3"]
|===
|Aspecto |Descrição
|Hardware |[ex., 4 vCPU, 16GB RAM]
|Software |[ex., Ubuntu 22.04, Docker 24.x]
|Rede |[ex., VPC, grupos de segurança]
|===

.Mais Informações
Consulte link:https://docs.arc42.org/section-7/[Deployment View] na documentação do arc42.
`;
}

function getConceptsTemplate(): string {
  return `= 8. Conceitos Transversais

*Propósito*: Regulamentações gerais e ideias de solução relevantes em vários blocos de construção.

== Modelo de Domínio

// Conceitos centrais do domínio e seus relacionamentos

[plantuml, domain-model, svg]
----
@startuml
class Usuario {
  +id: UUID
  +email: String
  +nome: String
}
class Pedido {
  +id: UUID
  +status: StatusPedido
  +criadoEm: DateTime
}
Usuario "1" -- "*" Pedido : realiza
@enduml
----

== Conceito de Segurança

=== Autenticação

[Descreva a abordagem de autenticação: JWT, OAuth2, etc.]

=== Autorização

[Descreva a abordagem de autorização: RBAC, ABAC, etc.]

== Tratamento de Erros

[Descreva como os erros são tratados em todo o sistema]

* [ex., Manipulador global de erros]
* [ex., Respostas de erro estruturadas]
* [ex., Estratégia de registro de erros]

== Logging e Monitoramento

[options="header",cols="1,2"]
|===
|Aspecto |Abordagem
|Logging |[ex., Logs JSON estruturados, stack ELK]
|Métricas |[ex., Prometheus, Grafana]
|Rastreamento |[ex., OpenTelemetry, Jaeger]
|===

== Estratégia de Testes

[options="header",cols="1,2,1"]
|===
|Tipo |Escopo |Meta de Cobertura
|Testes Unitários |Funções/classes individuais |80%
|Testes de Integração |Interações de componentes |Caminhos chave
|Testes E2E |Jornadas completas do usuário |Fluxos críticos
|===

.Mais Informações
Consulte link:https://docs.arc42.org/section-8/[Cross-cutting Concepts] na documentação do arc42.
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `= 9. Decisões Arquiteturais

*Propósito*: Documente decisões arquiteturais importantes, caras, de grande escala ou arriscadas.

== ADR-001: [Título da Decisão]

=== Status

[Proposta | Aceita | Obsoleta | Substituída]

=== Contexto

[Descreva o problema que motiva esta decisão]

=== Decisão

[Descreva a decisão que foi tomada]

=== Consequências

*Positivas:*

* [Benefício 1]
* [Benefício 2]

*Negativas:*

* [Desvantagem 1]
* [Desvantagem 2]

=== Alternativas Consideradas

[options="header",cols="1,2,2"]
|===
|Alternativa |Prós |Contras
|[Opção A] |[Benefícios] |[Desvantagens]
|[Opção B] |[Benefícios] |[Desvantagens]
|===

'''

== ADR-002: [Título da Decisão]

// Use o mesmo modelo para decisões adicionais

.Mais Informações
Consulte link:https://docs.arc42.org/section-9/[Architecture Decisions] na documentação do arc42.
`;
}

function getQualityRequirementsTemplate(): string {
  return `= 10. Requisitos de Qualidade

*Propósito*: Requisitos de qualidade concretos com cenários para avaliação.

== Árvore de Qualidade

// Representação visual dos objetivos de qualidade e seus refinamentos

[plantuml, quality-tree, svg]
----
@startmindmap
* Qualidade
** Desempenho
*** Tempo de Resposta
*** Throughput
** Segurança
*** Autenticação
*** Autorização
** Manutenibilidade
*** Modularidade
*** Testabilidade
@endmindmap
----

== Cenários de Qualidade

=== Cenários de Desempenho

[options="header",cols="1,2,1,1"]
|===
|ID |Cenário |Resposta Esperada |Prioridade
|PERF-1 |Usuário solicita dashboard sob carga normal |< 200ms |Alta
|PERF-2 |Sistema lida com 1000 usuários simultâneos |Sem degradação |Média
|===

=== Cenários de Segurança

[options="header",cols="1,2,1,1"]
|===
|ID |Cenário |Comportamento Esperado |Prioridade
|SEC-1 |Tentativa de login inválida |Bloqueio de conta após 5 tentativas |Alta
|SEC-2 |Acesso não autorizado à API |Resposta 401, log de auditoria |Alta
|===

=== Cenários de Manutenibilidade

[options="header",cols="1,2,1,1"]
|===
|ID |Cenário |Esforço Esperado |Prioridade
|MAINT-1 |Adicionar novo tipo de entidade |< 2 dias de desenvolvimento |Média
|MAINT-2 |Atualizar versão de dependência |< 4 horas incluindo testes |Média
|===

.Mais Informações
Consulte link:https://docs.arc42.org/section-10/[Quality Requirements] na documentação do arc42.
`;
}

function getTechnicalRisksTemplate(): string {
  return `= 11. Riscos e Débitos Técnicos

*Propósito*: Identifique e rastreie riscos técnicos conhecidos e débitos técnicos acumulados.

== Riscos Técnicos

[options="header",cols="1,2,1,2"]
|===
|Risco |Descrição |Probabilidade |Mitigação
|[ex., Falha de API de terceiros] |[Serviço externo do qual dependemos] |Média |[Circuit breaker, fallback]
|[ex., Perda de dados] |[Corrupção de banco de dados] |Baixa |[Backups, replicação]
|===

== Débitos Técnicos

[options="header",cols="1,2,1,1"]
|===
|Item |Descrição |Impacto |Prioridade
|[ex., Autenticação legada] |[Sistema de auth antigo precisa substituição] |Alto |Média
|[ex., Testes faltando] |[Cobertura abaixo da meta no módulo X] |Médio |Baixa
|===

== Monitoramento de Riscos

[Descreva como os riscos são monitorados e revisados]

* [ex., Reuniões semanais de revisão de riscos]
* [ex., Alertas de monitoramento automatizado]

.Mais Informações
Consulte link:https://docs.arc42.org/section-11/[Risks and Technical Debt] na documentação do arc42.
`;
}

function getGlossaryTemplate(): string {
  return `= 12. Glossário

*Propósito*: Defina termos importantes de domínio e técnicos usados na documentação de arquitetura.

== Termos de Domínio

[options="header",cols="1,3"]
|===
|Termo |Definição
|[Termo de Domínio 1] |[Definição clara e concisa]
|[Termo de Domínio 2] |[Definição clara e concisa]
|===

== Termos Técnicos

[options="header",cols="1,3"]
|===
|Termo |Definição
|[Termo Técnico 1] |[Definição clara e concisa]
|[Termo Técnico 2] |[Definição clara e concisa]
|===

== Abreviações

[options="header",cols="1,3"]
|===
|Abreviação |Significado
|API |Interface de Programação de Aplicações
|JWT |JSON Web Token
|REST |Transferência de Estado Representacional
|===

.Mais Informações
Consulte link:https://docs.arc42.org/section-12/[Glossary] na documentação do arc42.
`;
}

/**
 * Get the Portuguese workflow guide in AsciiDoc format
 */
export function getWorkflowGuide(): string {
  return `= Guia de Fluxo de Trabalho para Documentação de Arquitetura arc42

== Visão Geral

Este guia ajuda você a documentar a arquitetura do seu software usando o modelo arc42. O modelo arc42 é um modelo prático e comprovado para documentação de arquiteturas de software e sistemas.

== Idiomas Disponíveis

Este Servidor MCP arc42 suporta múltiplos idiomas para documentação:

[options="header",cols="1,2,2"]
|===
|Código |Idioma |Nome Nativo
|EN |Inglês |English
|DE |Alemão |Deutsch
|CZ |Tcheco |Čeština
|ES |Espanhol |Español
|FR |Francês |Français
|IT |Italiano |Italiano
|NL |Holandês |Nederlands
|PT |Português |Português
|RU |Russo |Русский
|UKR |Ucraniano |Українська
|ZH |Chinês |中文
|===

== Começando

=== Passo 1: Inicialize Seu Workspace

Use a ferramenta \`arc42-init\` para criar seu workspace de documentação:

[source]
----
arc42-init(projectName: "Meu Projeto", language: "PT")
----

Você pode especificar um idioma diferente usando o código de idioma ISO.

=== Passo 2: Verifique o Status

Use \`arc42-status\` para ver o estado atual da sua documentação:

[source]
----
arc42-status()
----

=== Passo 3: Gere Templates de Seção

Use \`generate-template\` para obter templates detalhados para cada seção:

[source]
----
generate-template(section: "01_introduction_and_goals", language: "PT")
----

== As 12 Seções do arc42

. *Introdução e Objetivos* - Comece aqui! Defina o que você está construindo e por quê.
. *Restrições Arquiteturais* - O que você NÃO pode fazer?
. *Contexto e Escopo* - O que está dentro e o que está fora?
. *Estratégia de Solução* - Abordagem de alto nível para resolver o problema.
. *Visão de Blocos de Construção* - Estrutura estática do seu sistema.
. *Visão de Tempo de Execução* - Comportamento dinâmico e cenários.
. *Visão de Implantação* - Como é implantado e operado?
. *Conceitos Transversais* - Padrões usados em todo o sistema.
. *Decisões Arquiteturais* - Decisões importantes e sua justificativa.
. *Requisitos de Qualidade* - Cenários concretos de qualidade.
. *Riscos e Débitos Técnicos* - O que pode dar errado?
. *Glossário* - Defina seus termos.

== Melhores Práticas

. *Comece pela Seção 1* - Entender os objetivos é fundamental
. *Seja conciso* - arc42 é pragmático, não burocrático
. *Use diagramas* - Uma imagem vale mais que mil palavras
. *Documente decisões* - O você do futuro agradecerá ao você do presente
. *Itere* - Documentação de arquitetura nunca está "pronta"

== Ferramentas Disponíveis

* \`arc42-init\` - Inicializar workspace de documentação
* \`arc42-status\` - Verificar status da documentação
* \`generate-template\` - Gerar templates de seção
* \`update-section\` - Atualizar conteúdo da seção
* \`get-section\` - Ler conteúdo da seção
* \`arc42-workflow-guide\` - Mostrar este guia

== Recursos

* link:https://arc42.org/[Site do arc42]
* link:https://docs.arc42.org/[Documentação do arc42]
* link:https://arc42.org/examples[Exemplos do arc42]
`;
}

/**
 * Get the Portuguese README content in AsciiDoc format
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Projeto';
  return `= ${name} - Documentação de Arquitetura

Este diretório contém a documentação de arquitetura para ${name}, seguindo o modelo arc42.

== Estrutura

* \`sections/\` - Arquivos AsciiDoc de seções individuais (12 seções)
* \`images/\` - Diagramas e imagens
* \`arc42-documentation.adoc\` - Documentação principal combinada
* \`config.yaml\` - Configuração

== As 12 Seções do arc42

. *Introdução e Objetivos* - Requisitos, objetivos de qualidade, partes interessadas
. *Restrições Arquiteturais* - Restrições técnicas e organizacionais
. *Contexto e Escopo* - Contexto de negócios e técnico
. *Estratégia de Solução* - Decisões e estratégias fundamentais
. *Visão de Blocos de Construção* - Decomposição estática
. *Visão de Tempo de Execução* - Comportamento dinâmico
. *Visão de Implantação* - Infraestrutura e implantação
. *Conceitos Transversais* - Regulamentações e abordagens gerais
. *Decisões Arquiteturais* - Decisões importantes (ADRs)
. *Requisitos de Qualidade* - Árvore de qualidade e cenários
. *Riscos e Débitos Técnicos* - Problemas e riscos conhecidos
. *Glossário* - Termos importantes

== Começando

. Comece pela Seção 1: Introdução e Objetivos
. Trabalhe nas seções iterativamente
. Use diagramas para ilustrar conceitos
. Mantenha o foco em decisões, não em detalhes de implementação

== Gerando Documentação

Use as ferramentas MCP para:

* Verificar status: \`arc42-status\`
* Gerar templates: \`generate-template\`
* Atualizar seções: \`update-section\`

== Recursos

* link:https://arc42.org/[Site do arc42]
* link:https://docs.arc42.org/[Documentação do arc42]
* link:https://arc42.org/examples[Exemplos do arc42]
`;
}
