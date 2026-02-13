/**
 * Portuguese Templates
 *
 * Contains all arc42 section templates in Portuguese.
 * Based on the official arc42 Portuguese template from vendor/arc42-template/PT/.
 *
 * @module templates/locales/pt/templates
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Portuguese template for a specific section
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
  return `# 1. Introdução e Objetivos

## Visão Geral dos Requisitos

**Propósito**: Descreve os requisitos essenciais e as forças motrizes que devem ser consideradas na implementação da arquitetura de software e no desenvolvimento do sistema.

### Requisitos Essenciais

<!-- Liste os 3-5 principais requisitos funcionais -->

| ID | Requisito | Prioridade |
|----|-----------|------------|
| REQ-1 | [Breve descrição] | Alta |
| REQ-2 | [Breve descrição] | Média |

### Funcionalidades

<!-- Funcionalidades essenciais do sistema -->

- Funcionalidade 1: [Descrição]
- Funcionalidade 2: [Descrição]

## Objetivos de Qualidade

**Propósito**: Os 3 a 5 principais objetivos de qualidade para a arquitetura, cuja realização é de suma importância para os principais stakeholders.

<!-- Baseado na ISO 25010, priorize qualidades como: -->
<!-- Desempenho, Segurança, Confiabilidade, Manutenibilidade, Usabilidade, etc. -->

| Prioridade | Objetivo de Qualidade | Motivação |
|------------|----------------------|-----------|
| 1 | [ex: Desempenho] | [Por que isto é crítico] |
| 2 | [ex: Segurança] | [Por que isto é crítico] |
| 3 | [ex: Manutenibilidade] | [Por que isto é crítico] |

## Stakeholders

**Propósito**: Visão geral explícita dos stakeholders do sistema.

| Papel/Nome | Contato | Expectativas |
|------------|---------|--------------|
| Product Owner | [Nome/Email] | [Expectativas sobre a arquitetura] |
| Equipe de Desenvolvimento | [Nome da equipe] | [O que precisam saber] |
| Operações | [Equipe/Pessoa] | [Preocupações de deployment e operação] |
| Usuários Finais | [Tipo] | [Expectativas de experiência do usuário] |

## Critérios de Sucesso

<!-- O que define o sucesso deste sistema? -->

- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `# 2. Restrições da Arquitetura

## Restrições Técnicas

**Restrições de Hardware**

| Restrição | Contexto/Motivação |
|-----------|-------------------|
| [ex: Plataforma Cloud] | [Por que esta restrição existe] |

**Restrições de Software/Tecnologia**

| Restrição | Contexto/Motivação |
|-----------|-------------------|
| [ex: Java 17+ obrigatório] | [Razão para a restrição] |
| [ex: PostgreSQL obrigatório] | [Por que foi escolhido] |

**Diretrizes de Programação**

- Linguagem de programação: [Linguagem]
- Framework: [Framework e versão]
- Bibliotecas: [Bibliotecas obrigatórias ou proibidas]

## Restrições Organizacionais

**Organização e Estrutura**

| Restrição | Contexto/Motivação |
|-----------|-------------------|
| [ex: Estrutura da equipe] | [Como isto afeta a arquitetura] |
| [ex: Metodologia ágil] | [Impactos no processo de desenvolvimento] |

**Recursos**

- Orçamento: [Restrições orçamentárias]
- Tempo: [Restrições temporais]
- Equipe: [Tamanho e competências da equipe]

## Convenções

**Convenções de Arquitetura e Design**

- [ex: Padrão de arquitetura de microsserviços]
- [ex: Design de API RESTful]
- [ex: Domain-Driven Design]

**Convenções de Codificação**

- Estilo de código: [Link para guia de estilo]
- Documentação: [Padrões de documentação]
- Testes: [Requisitos de testes]

**Requisitos de Conformidade**

- [ex: Conformidade com LGPD/GDPR]
- [ex: Regulamentações específicas do setor]
- [ex: Padrões de acessibilidade]
`;
}

function getContextAndScopeTemplate(): string {
  return `# 3. Contexto e Escopo

## Contexto de Negócio

**Propósito**: Mostra o ambiente de negócio do sistema e as principais dependências externas.

### Diagrama de Contexto

\`\`\`
[Crie um diagrama mostrando seu sistema e sistemas/usuários externos]
Você pode usar:
- Diagramas Mermaid
- PlantUML
- ASCII art
- Ou referenciar uma imagem em /images/
\`\`\`

### Interfaces Externas

| Sistema Externo | Interface | Propósito |
|-----------------|-----------|-----------|
| [Sistema Externo 1] | [API/Protocolo] | [Quais dados/funções são trocados] |
| [Tipo de Usuário 1] | [UI/API] | [Como os usuários interagem] |

### Processos de Negócio Suportados

<!-- Quais processos de negócio este sistema suporta? -->

1. **Processo 1**: [Descrição]
   - Atores: [Quem está envolvido]
   - Fluxo: [Fluxo de alto nível]

2. **Processo 2**: [Descrição]

## Contexto Técnico

**Propósito**: Mostra interfaces técnicas e canais entre o sistema e o ambiente.

### Interfaces Técnicas

| Interface | Tecnologia | Protocolo | Formato |
|-----------|------------|-----------|---------|
| [API 1] | [REST API] | [HTTPS] | [JSON] |
| [Banco de Dados] | [PostgreSQL] | [TCP/IP] | [SQL] |

### Canais e Transmissão

| Canal | Tecnologia | Descrição |
|-------|------------|-----------|
| [Fila de Mensagens] | [RabbitMQ] | [Comunicação assíncrona entre serviços] |

### Mapeamento: Negócio para Técnico

| Contexto de Negócio | Realização Técnica |
|---------------------|-------------------|
| [Interface do Usuário] | [React SPA via HTTPS] |
| [Sistema Externo A] | [REST API via HTTPS] |
`;
}

function getSolutionStrategyTemplate(): string {
  return `# 4. Estratégia de Solução

**Propósito**: Resume as decisões fundamentais e estratégias de solução que moldam a arquitetura do sistema.

## Decisões Fundamentais de Solução

### Padrões Arquiteturais

| Padrão | Motivação | Consequências |
|--------|-----------|---------------|
| [ex: Microsserviços] | [Por que este padrão foi escolhido] | [Benefícios e trade-offs] |

### Decisões Tecnológicas

| Componente | Tecnologia | Razão |
|------------|------------|-------|
| Backend | [ex: Node.js] | [Por que foi escolhido] |
| Frontend | [ex: React] | [Razões] |
| Banco de Dados | [ex: PostgreSQL] | [Razões] |

### Decomposição de Alto Nível

<!-- Como o sistema está estruturado no mais alto nível? -->

\`\`\`
[Diagrama de componentes de alto nível]
\`\`\`

Descrição:
- Componente 1: [Propósito e responsabilidade]
- Componente 2: [Propósito e responsabilidade]

## Alcançando os Objetivos de Qualidade

### Mapeamento: Objetivos de Qualidade para Abordagens

| Objetivo de Qualidade | Abordagem de Solução |
|----------------------|---------------------|
| [Desempenho] | [Estratégia de cache, processamento assíncrono, CDN] |
| [Segurança] | [Autenticação, autorização, criptografia] |
| [Escalabilidade] | [Escalonamento horizontal, balanceamento de carga] |

### Decisões Chave de Design

1. **Decisão 1**: [ex: Arquitetura orientada a eventos]
   - Razão: [Por que esta abordagem]
   - Impacto: [Como ajuda a alcançar objetivos de qualidade]

2. **Decisão 2**: [Descrição]
   - Razão: [Justificativa]
   - Impacto: [Efeitos nos objetivos de qualidade]

## Estratégia de Desenvolvimento

- Abordagem de desenvolvimento: [Ágil, Scrum, etc.]
- Estratégia de deployment: [CI/CD, Blue-Green, etc.]
- Estratégia de testes: [Unit, Integration, E2E]
`;
}

function getBuildingBlockViewTemplate(): string {
  return `# 5. Visão de Building Blocks

**Propósito**: Decomposição estática do sistema em building blocks e suas relações.

## Nível 1: Contexto do Sistema

### Whitebox: Sistema Geral

**Propósito**: [O que o sistema faz]

\`\`\`
[Diagrama de componentes com os principais building blocks]
\`\`\`

**Building Blocks Contidos**:

| Componente | Responsabilidade |
|------------|-----------------|
| [Componente 1] | [O que faz] |
| [Componente 2] | [O que faz] |

**Interfaces Importantes**:

| Interface | Descrição |
|-----------|-----------|
| [API 1] | [Propósito e protocolo] |

## Nível 2: Detalhes dos Componentes

### Componente 1 (Whitebox)

**Propósito**: [Propósito detalhado]

**Interfaces**:
- Entrada: [O que recebe]
- Saída: [O que produz]

**Estrutura Interna**:

\`\`\`
[Diagrama de módulos/classes internos]
\`\`\`

**Elementos Contidos**:

| Elemento | Responsabilidade |
|----------|-----------------|
| [Módulo A] | [Propósito] |
| [Módulo B] | [Propósito] |

### Componente 2 (Whitebox)

[Estrutura similar]

## Nível 3: Visões Detalhadas

<!-- Inclua apenas Nível 3 para componentes que precisam de detalhes adicionais -->

### Detalhes do Módulo A

[Diagramas de classes detalhados, estrutura de pacotes, etc.]
`;
}

function getRuntimeViewTemplate(): string {
  return `# 6. Visão de Runtime

**Propósito**: Mostra o comportamento e interação dos building blocks em tempo de execução.

## Cenários Importantes

### Cenário 1: [Nome, ex: "Login de Usuário"]

**Descrição**: [O que acontece neste cenário]

**Diagrama de Sequência**:

\`\`\`mermaid
sequenceDiagram
    participant Usuario
    participant Frontend
    participant API
    participant BancoDados

    Usuario->>Frontend: Inserir credenciais
    Frontend->>API: POST /login
    API->>BancoDados: Validar credenciais
    BancoDados-->>API: Dados do usuário
    API-->>Frontend: Token JWT
    Frontend-->>Usuario: Login bem-sucedido
\`\`\`

**Passos**:

1. Usuário insere credenciais
2. Frontend envia requisição de login
3. API valida com banco de dados
4. Token é gerado e retornado
5. Usuário está autenticado

### Cenário 2: [Nome]

[Estrutura similar]

## Fluxo de Dados

### Fluxo 1: [Nome]

**Propósito**: [Quais dados fluem para onde]

**Diagrama**:

\`\`\`
[Diagrama de fluxo de dados]
\`\`\`

**Descrição**:
- Passo 1: [O que acontece]
- Passo 2: [O que acontece]

## Máquinas de Estado

### Máquina de Estado para [Entidade]

**Estados**:
- Estado 1: [Descrição]
- Estado 2: [Descrição]

**Transições**:

| De | Evento | Para | Ação |
|----|--------|------|------|
| [Estado 1] | [Evento] | [Estado 2] | [O que acontece] |
`;
}

function getDeploymentViewTemplate(): string {
  return `# 7. Visão de Implantação

**Propósito**: Descreve a infraestrutura técnica e como o software é distribuído.

## Visão Geral da Infraestrutura

### Diagrama de Implantação

\`\`\`
[Diagrama com servidores, containers, redes]
\`\`\`

## Ambientes

### Ambiente de Produção

**Infraestrutura**:

| Componente | Tecnologia | Configuração |
|------------|------------|--------------|
| [Servidor de Aplicação] | [AWS ECS] | [Especificações] |
| [Banco de Dados] | [RDS PostgreSQL] | [Especificações] |
| [Cache] | [Redis] | [Especificações] |

**Rede**:
- VPC: [Configuração]
- Sub-redes: [Setup Público/Privado]
- Security Groups: [Regras]

### Ambiente de Staging

[Estrutura similar]

### Ambiente de Desenvolvimento

[Estrutura similar]

## Estratégia de Deployment

### Pipeline CI/CD

1. **Build**: [O que acontece]
2. **Test**: [Testes automatizados]
3. **Deploy**: [Processo de deployment]

### Estratégia de Rollback

[Como deployments são revertidos]

## Estratégia de Escalabilidade

### Escalabilidade Horizontal

| Componente | Gatilho de Escala | Máx. Instâncias |
|------------|-------------------|-----------------|
| [Servidor API] | [CPU > 70%] | [10] |

### Escalabilidade Vertical

[Quando e como escalar verticalmente]

## Monitoramento e Operações

### Health Checks

| Componente | Verificação | Limiar |
|------------|-------------|--------|
| [API] | [endpoint /health] | [Tempo de resposta < 1s] |

### Logging

- Agregação de logs: [ELK, CloudWatch, etc.]
- Retenção de logs: [Política]

### Métricas

- Métricas chave: [CPU, Memória, Taxa de requisições]
- Alertas: [Condições de alerta]
`;
}

function getConceptsTemplate(): string {
  return `# 8. Conceitos Transversais

**Propósito**: Regras e abordagens transversais relevantes em múltiplas partes do sistema.

## Modelos de Domínio

### Conceitos Centrais do Domínio

\`\`\`
[Diagrama de modelo de domínio ou diagrama de classes]
\`\`\`

**Entidades Importantes**:

| Entidade | Responsabilidade | Relacionamentos |
|----------|-----------------|-----------------|
| [Entidade 1] | [Propósito] | [Entidades relacionadas] |

## Segurança

### Autenticação

- Método: [JWT, OAuth2, etc.]
- Implementação: [Como funciona]

### Autorização

- Modelo: [RBAC, ABAC, etc.]
- Papéis: [Lista de papéis e permissões]

### Proteção de Dados

- Criptografia em repouso: [Como]
- Criptografia em trânsito: [Versão TLS]
- Tratamento de dados sensíveis: [Abordagem]

## Tratamento de Erros

### Categorias de Erros

| Categoria | Estratégia de Tratamento |
|-----------|-------------------------|
| [Erros de validação] | [Retornar 400 com detalhes] |
| [Erros de sistema] | [Logar e retornar 500] |

### Formato de Resposta de Erro

\`\`\`json
{
  "error": {
    "code": "CODIGO_ERRO",
    "message": "Mensagem legível",
    "details": {}
  }
}
\`\`\`

## Logging e Monitoramento

### Estratégia de Logging

- Níveis de log: [DEBUG, INFO, WARN, ERROR]
- Logging estruturado: [Formato JSON]
- IDs de correlação: [Para rastreamento de requisições]

### Monitoramento

- APM: [Ferramenta de monitoramento de desempenho de aplicação]
- Métricas: [Métricas de negócio e técnicas importantes]

## Gerenciamento de Configuração

### Fontes de Configuração

1. Variáveis de ambiente
2. Arquivos de configuração
3. Gerenciamento de segredos: [Vault, AWS Secrets Manager]

### Configuração por Ambiente

| Configuração | Dev | Staging | Prod |
|--------------|-----|---------|------|
| [Nível de log] | [DEBUG] | [INFO] | [WARN] |

## Estratégia de Testes

### Níveis de Teste

| Nível | Cobertura | Ferramentas |
|-------|-----------|-------------|
| Testes unitários | [Meta %] | [Framework] |
| Testes de integração | [Escopo] | [Ferramentas] |
| Testes E2E | [Fluxos principais] | [Ferramentas] |

### Gerenciamento de Dados de Teste

[Como dados de teste são criados e gerenciados]

## Conceitos de Desenvolvimento

### Organização do Código

- Estrutura de pacotes: [Abordagem]
- Convenções de nomenclatura: [Padrões]

### Build e Gerenciamento de Dependências

- Ferramenta de build: [Maven, Gradle, npm, etc.]
- Gerenciamento de dependências: [Estratégia]

## Conceitos Operacionais

### Backup e Recuperação

- Frequência de backup: [Diária, horária, etc.]
- Retenção: [Política]
- Procedimento de recuperação: [Passos]

### Recuperação de Desastres

- RTO: [Recovery Time Objective]
- RPO: [Recovery Point Objective]
- Estratégia de DR: [Abordagem]
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `# 9. Decisões de Arquitetura

**Propósito**: Documenta decisões arquiteturais importantes, custosas, críticas ou arriscadas, incluindo justificativas.

## Formato ADR

Cada decisão segue esta estrutura:
- **Contexto**: Qual é o problema que estamos enfrentando?
- **Decisão**: O que decidimos fazer
- **Consequências**: O que se torna mais fácil ou mais difícil

## Registro de Decisões

### ADR-001: [Título da Decisão]

**Data**: [AAAA-MM-DD]
**Status**: [Proposta | Aceita | Obsoleta | Substituída]
**Decisores**: [Nomes]

**Contexto**:

[Descreva as forças em jogo, técnicas, políticas, sociais e específicas do projeto. Essas forças provavelmente estão em tensão e devem ser identificadas como tal.]

**Decisão**:

[Descreva nossa resposta a essas forças. Aqui é onde tomamos nossa decisão.]

**Consequências**:

Positivas:
- [Benefício 1]
- [Benefício 2]

Negativas:
- [Trade-off 1]
- [Trade-off 2]

Riscos:
- [Risco 1 e mitigação]

### ADR-002: [Outra Decisão]

[Estrutura similar]

## Categorias de Decisões

### Decisões Estruturais

| Decisão | Justificativa | Data |
|---------|---------------|------|
| [Microsserviços vs Monolito] | [Por que foi escolhido] | [Data] |

### Decisões Tecnológicas

| Componente | Tecnologia | Alternativa Considerada | Por que Escolhida |
|------------|------------|------------------------|-------------------|
| [Backend] | [Node.js] | [Python, Java] | [Razões] |

### Decisões de Processo

| Decisão | Impacto | Data |
|---------|---------|------|
| [Metodologia ágil] | [Como afeta a arquitetura] | [Data] |

## Decisões Obsoletas

| Decisão | Data Obsoleta | Razão | Substituída por |
|---------|---------------|-------|-----------------|
| [Decisão antiga] | [Data] | [Por que obsoleta] | [ADR-XXX] |
`;
}

function getQualityRequirementsTemplate(): string {
  return `# 10. Requisitos de Qualidade

**Propósito**: Define requisitos de qualidade com cenários concretos.

## Árvore de Qualidade

### Objetivos de Qualidade de Alto Nível

\`\`\`
Qualidade
├── Desempenho
│   ├── Tempo de Resposta
│   └── Throughput
├── Segurança
│   ├── Autenticação
│   └── Proteção de Dados
├── Confiabilidade
│   ├── Disponibilidade
│   └── Tolerância a Falhas
└── Manutenibilidade
    ├── Testabilidade
    └── Modificabilidade
\`\`\`

## Cenários de Qualidade

### Cenários de Desempenho

**Cenário 1: Tempo de Resposta em Carga Normal**

| Aspecto | Descrição |
|---------|-----------|
| Cenário | Usuário consulta dados sob carga normal |
| Fonte | Usuário final |
| Estímulo | Requisição HTTP para API |
| Ambiente | Operação normal, 100 usuários simultâneos |
| Resposta | Sistema retorna dados |
| Medida | Percentil 95 tempo de resposta < 200ms |

**Cenário 2: Tratamento de Carga de Pico**

| Aspecto | Descrição |
|---------|-----------|
| Cenário | Sistema sob carga de pico |
| Fonte | Múltiplos usuários |
| Estímulo | 1000 requisições simultâneas |
| Ambiente | Horários de pico |
| Resposta | Sistema processa todas as requisições |
| Medida | Nenhuma requisição falha, tempo de resposta < 1s |

### Cenários de Segurança

**Cenário 3: Tentativa de Acesso Não Autorizado**

| Aspecto | Descrição |
|---------|-----------|
| Cenário | Usuário não autorizado tenta acessar recurso protegido |
| Fonte | Atacante externo |
| Estímulo | Requisição HTTP sem token válido |
| Ambiente | Operação normal |
| Resposta | Sistema nega acesso |
| Medida | Retorna 401, registra tentativa, nenhum dado exposto |

### Cenários de Confiabilidade

**Cenário 4: Recuperação de Falha de Serviço**

| Aspecto | Descrição |
|---------|-----------|
| Cenário | Conexão com banco de dados falha |
| Fonte | Falha de infraestrutura |
| Estímulo | Banco de dados fica indisponível |
| Ambiente | Operação normal |
| Resposta | Sistema continua com dados em cache |
| Medida | Degradação de serviço < 5%, recuperação < 30s |

### Cenários de Manutenibilidade

**Cenário 5: Adicionar Nova Funcionalidade**

| Aspecto | Descrição |
|---------|-----------|
| Cenário | Desenvolvedor adiciona novo endpoint de API |
| Fonte | Equipe de desenvolvimento |
| Estímulo | Novo requisito |
| Ambiente | Desenvolvimento |
| Resposta | Funcionalidade é adicionada |
| Medida | < 2 dias, < 5 arquivos modificados, testes passam |

## Priorização de Requisitos de Qualidade

| Atributo de Qualidade | Prioridade | Meta |
|----------------------|------------|------|
| Disponibilidade | Alta | 99.9% uptime |
| Tempo de Resposta | Alta | < 200ms (p95) |
| Segurança | Crítica | Zero violações de dados |
| Manutenibilidade | Média | Cobertura de testes > 80% |
| Usabilidade | Média | Sucesso de tarefas do usuário > 95% |
`;
}

function getTechnicalRisksTemplate(): string {
  return `# 11. Riscos e Dívida Técnica

**Propósito**: Documenta problemas conhecidos, riscos e dívida técnica.

## Riscos

### Matriz de Avaliação de Riscos

| Risco | Probabilidade | Impacto | Severidade | Status |
|-------|---------------|---------|------------|--------|
| [Risco 1] | [Alta/Média/Baixa] | [Alto/Médio/Baixo] | [Crítica/Alta/Média/Baixa] | [Aberto/Mitigado] |

### Riscos Detalhados

**Risco 1: [Título do Risco]**

- **Descrição**: [Qual é o risco]
- **Probabilidade**: [Alta/Média/Baixa]
- **Impacto**: [Alto/Médio/Baixo - e o que acontece]
- **Mitigação**: [O que estamos fazendo sobre isso]
- **Plano de Contingência**: [Plano se o risco se materializar]
- **Responsável**: [Quem é responsável]
- **Status**: [Aberto/Em mitigação/Fechado]

**Risco 2: [Título]**

[Estrutura similar]

## Dívida Técnica

### Entradas de Dívida

| Entrada | Tipo | Impacto | Esforço | Prioridade |
|---------|------|---------|---------|------------|
| [Dívida 1] | [Código/Arquitetura/Testes] | [Alto/Médio/Baixo] | [Dias] | [1-5] |

### Entradas de Dívida Detalhadas

**Dívida 1: [Título]**

- **Descrição**: [O que precisa ser corrigido]
- **Por que existe**: [Como isso aconteceu]
- **Impacto**: [Quais problemas causa]
- **Solução Proposta**: [Como corrigir]
- **Estimativa de Esforço**: [Tempo necessário]
- **Prioridade**: [Quando devemos corrigir]

### Plano de Pagamento de Dívida

| Trimestre | Dívida a Endereçar | Impacto Esperado |
|-----------|-------------------|------------------|
| Q1 2024 | [Entradas 1, 2] | [Melhoria em X] |

## Problemas Conhecidos

### Problemas Abertos

| Problema | Severidade | Solução Alternativa | Data Alvo de Correção |
|----------|------------|--------------------|-----------------------|
| [Problema 1] | [Alta/Média/Baixa] | [Se houver] | [Data] |

### Limitações

| Limitação | Impacto | Justificativa | Planos Futuros |
|-----------|---------|---------------|----------------|
| [Limitação 1] | [Efeito] | [Por que existe] | [Quando/se endereçar] |

## Vulnerabilidades de Segurança

### Vulnerabilidades Conhecidas

| CVE | Componente | Severidade | Status | Mitigação |
|-----|------------|------------|--------|-----------|
| [CVE-ID] | [Biblioteca] | [Crítica/Alta/Média] | [Aberto/Corrigido] | [Ações tomadas] |

## Problemas de Desempenho

| Problema | Impacto | Solução Alternativa | Plano de Resolução |
|----------|---------|--------------------|--------------------|
| [Problema] | [Impacto no usuário] | [Solução temporária] | [Solução permanente] |
`;
}

function getGlossaryTemplate(): string {
  return `# 12. Glossário

**Propósito**: Define termos importantes de negócio e técnicos para garantir terminologia consistente.

## Termos de Negócio

| Termo | Definição |
|-------|-----------|
| [Termo de negócio 1] | [Definição clara e precisa] |
| [Termo de negócio 2] | [Definição] |

## Termos Técnicos

| Termo | Definição | Sinônimos |
|-------|-----------|-----------|
| [Termo técnico 1] | [Definição] | [Nomes alternativos] |
| [Termo técnico 2] | [Definição] | [Nomes alternativos] |

## Abreviações e Acrônimos

| Abreviação | Nome Completo | Contexto |
|------------|---------------|----------|
| API | Application Programming Interface | [Quando/onde usado] |
| SLA | Service Level Agreement | [Contexto] |
| JWT | JSON Web Token | [Uso] |

## Conceitos de Negócio

| Conceito | Descrição | Termos Relacionados |
|----------|-----------|---------------------|
| [Conceito 1] | [Explicação detalhada] | [Conceitos relacionados] |

## Termos Específicos do Sistema

| Termo | Definição | Exemplo |
|-------|-----------|---------|
| [Termo do sistema 1] | [O que significa neste sistema] | [Exemplo de uso] |

## Termos Obsoletos

| Termo Antigo | Substituído por | Razão |
|--------------|-----------------|-------|
| [Termo antigo] | [Novo termo] | [Por que mudou] |

---

**Nota**: Mantenha este glossário atualizado conforme novos termos surgirem. Faça referência a esta seção de outras partes da documentação quando esses termos forem usados.
`;
}

/**
 * Get the Portuguese workflow guide
 */
export function getWorkflowGuide(): string {
  return `# Guia de Workflow de Documentação de Arquitetura arc42

## Visão Geral

Este guia ajuda você a documentar sua arquitetura de software usando o template arc42. O template arc42 é um modelo prático e comprovado para documentação de arquitetura de software e sistemas.

## Idiomas Disponíveis

Este servidor MCP arc42 suporta múltiplos idiomas para documentação:

| Código | Idioma | Nome Nativo |
|--------|--------|-------------|
| EN | Inglês | English |
| DE | Alemão | Deutsch |
| CZ | Tcheco | Čeština |
| ES | Espanhol | Español |
| FR | Francês | Français |
| IT | Italiano | Italiano |
| NL | Holandês | Nederlands |
| PT | Português | Português |
| RU | Russo | Русский |
| UKR | Ucraniano | Українська |
| ZH | Chinês | 中文 |

## Começando

### Passo 1: Inicializar o Workspace

Use a ferramenta \`arc42-init\` para criar seu workspace de documentação:

\`\`\`
arc42-init(projectName: "Meu Projeto", language: "PT")
\`\`\`

Você pode especificar um idioma diferente usando o código de idioma ISO.

### Passo 2: Verificar Status

Use \`arc42-status\` para ver o estado atual da sua documentação:

\`\`\`
arc42-status()
\`\`\`

### Passo 3: Gerar Templates de Seção

Use \`generate-template\` para obter templates detalhados para cada seção:

\`\`\`
generate-template(section: "01_introduction_and_goals", language: "PT")
\`\`\`

## As 12 Seções arc42

1. **Introdução e Objetivos** - Comece aqui! Defina o que você está construindo e por quê.
2. **Restrições da Arquitetura** - O que você NÃO pode fazer?
3. **Contexto e Escopo** - O que está dentro e o que está fora?
4. **Estratégia de Solução** - Abordagem de alto nível para resolver o problema.
5. **Visão de Building Blocks** - Estrutura estática do seu sistema.
6. **Visão de Runtime** - Comportamento dinâmico e cenários.
7. **Visão de Implantação** - Como é implantado e operado?
8. **Conceitos Transversais** - Padrões usados em todo o sistema.
9. **Decisões de Arquitetura** - Decisões importantes e suas justificativas.
10. **Requisitos de Qualidade** - Cenários concretos de qualidade.
11. **Riscos e Dívida Técnica** - O que pode dar errado?
12. **Glossário** - Defina seus termos.

## Melhores Práticas

1. **Comece pela Seção 1** - Entender os objetivos é fundamental
2. **Mantenha conciso** - arc42 é pragmático, não burocrático
3. **Use diagramas** - Uma imagem vale mais que mil palavras
4. **Documente decisões** - Seu eu futuro agradecerá
5. **Itere** - Documentação de arquitetura nunca está "terminada"

## Ferramentas Disponíveis

- \`arc42-init\` - Inicializar workspace de documentação
- \`arc42-status\` - Verificar status da documentação
- \`generate-template\` - Gerar templates de seção
- \`update-section\` - Atualizar conteúdo de seção
- \`get-section\` - Ler conteúdo de seção
- \`arc42-workflow-guide\` - Mostrar este guia

## Recursos

- [Website arc42](https://arc42.org/)
- [Documentação arc42](https://docs.arc42.org/)
- [Exemplos arc42](https://arc42.org/examples)
`;
}

/**
 * Get the Portuguese README content
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Projeto';
  return `# ${name} - Documentação de Arquitetura

Este diretório contém a documentação de arquitetura para ${name}, baseada no template arc42.

## Estrutura

- \`sections/\` - Arquivos markdown de seções individuais (12 seções)
- \`images/\` - Diagramas e imagens
- \`arc42-documentation.md\` - Documentação principal combinada
- \`config.yaml\` - Configuração

## As 12 Seções arc42

1. **Introdução e Objetivos** - Requisitos, objetivos de qualidade, stakeholders
2. **Restrições da Arquitetura** - Restrições técnicas e organizacionais
3. **Contexto e Escopo** - Contexto de negócio e técnico
4. **Estratégia de Solução** - Decisões e estratégias fundamentais
5. **Visão de Building Blocks** - Decomposição estática
6. **Visão de Runtime** - Comportamento dinâmico
7. **Visão de Implantação** - Infraestrutura e deployment
8. **Conceitos Transversais** - Regras e abordagens transversais
9. **Decisões de Arquitetura** - Decisões importantes (ADRs)
10. **Requisitos de Qualidade** - Árvore de qualidade e cenários
11. **Riscos e Dívida Técnica** - Problemas conhecidos e riscos
12. **Glossário** - Termos importantes

## Começando

1. Comece pela Seção 1: Introdução e Objetivos
2. Trabalhe as seções iterativamente
3. Use diagramas para ilustrar conceitos
4. Foque em decisões, não em detalhes de implementação

## Gerando Documentação

Use as ferramentas MCP para:
- Verificar status: \`arc42-status\`
- Gerar templates: \`generate-template\`
- Atualizar seções: \`update-section\`

## Recursos

- [Website arc42](https://arc42.org/)
- [Documentação arc42](https://docs.arc42.org/)
- [Exemplos arc42](https://arc42.org/examples)
`;
}
