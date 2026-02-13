/**
 * Spanish Templates
 *
 * Contains all arc42 section templates in Spanish.
 * Based on the official arc42 Spanish template from vendor/arc42-template/ES/.
 *
 * @module templates/locales/es/templates
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Spanish template for a specific section
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
  return `# 1. Introducción y Metas

## Vista de Requerimientos

**Propósito**: Describe los requerimientos relevantes y las directrices que los arquitectos de software y el equipo de desarrollo deben considerar.

### Requerimientos Esenciales

<!-- Liste los 3-5 requerimientos funcionales principales -->

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| REQ-1 | [Descripción breve] | Alta |
| REQ-2 | [Descripción breve] | Media |

### Características

<!-- Características esenciales del sistema -->

- Característica 1: [Descripción]
- Característica 2: [Descripción]

## Metas de Calidad

**Propósito**: Las tres a cinco metas de calidad principales para la arquitectura, cuyo cumplimiento es de la mayor importancia para las principales partes interesadas.

<!-- Basado en ISO 25010, priorice cualidades como: -->
<!-- Rendimiento, Seguridad, Fiabilidad, Mantenibilidad, Usabilidad, etc. -->

| Prioridad | Meta de Calidad | Motivación |
|-----------|-----------------|------------|
| 1 | [ej. Rendimiento] | [Por qué es crítico] |
| 2 | [ej. Seguridad] | [Por qué es crítico] |
| 3 | [ej. Mantenibilidad] | [Por qué es crítico] |

## Partes Interesadas (Stakeholders)

**Propósito**: Vista detallada de las partes interesadas del sistema.

| Rol/Nombre | Contacto | Expectativas |
|------------|----------|--------------|
| Product Owner | [Nombre/Email] | [Expectativas respecto a la arquitectura] |
| Equipo de Desarrollo | [Nombre del equipo] | [Qué necesitan saber] |
| Operaciones | [Equipo/Persona] | [Aspectos de despliegue y operación] |
| Usuarios Finales | [Tipo] | [Expectativas de experiencia de usuario] |

## Criterios de Éxito

<!-- ¿Qué define el éxito de este sistema? -->

- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `# 2. Restricciones de la Arquitectura

## Restricciones Técnicas

**Restricciones de Hardware**

| Restricción | Contexto/Motivación |
|-------------|---------------------|
| [ej. Plataforma en la nube] | [Por qué existe esta restricción] |

**Restricciones de Software/Tecnología**

| Restricción | Contexto/Motivación |
|-------------|---------------------|
| [ej. Java 17+ requerido] | [Razón de la restricción] |
| [ej. PostgreSQL requerido] | [Por qué fue elegido] |

**Directrices de Programación**

- Lenguaje de programación: [Lenguaje]
- Framework: [Framework y versión]
- Bibliotecas: [Bibliotecas obligatorias o prohibidas]

## Restricciones Organizacionales

**Organización y Estructura**

| Restricción | Contexto/Motivación |
|-------------|---------------------|
| [ej. Estructura del equipo] | [Cómo afecta la arquitectura] |
| [ej. Metodología ágil] | [Impacto en el proceso de desarrollo] |

**Recursos**

- Presupuesto: [Restricciones presupuestarias]
- Tiempo: [Restricciones de cronograma]
- Equipo: [Tamaño y habilidades del equipo]

## Convenciones

**Convenciones de Arquitectura y Diseño**

- [ej. Patrón de arquitectura de microservicios]
- [ej. Diseño de API RESTful]
- [ej. Diseño dirigido por dominio (DDD)]

**Convenciones de Codificación**

- Estilo de código: [Enlace a guía de estilo]
- Documentación: [Estándares de documentación]
- Pruebas: [Requisitos de pruebas]

**Requisitos de Cumplimiento**

- [ej. Cumplimiento GDPR]
- [ej. Regulaciones específicas de la industria]
- [ej. Estándares de accesibilidad]
`;
}

function getContextAndScopeTemplate(): string {
  return `# 3. Alcance y Contexto del Sistema

## Contexto de Negocio

**Propósito**: Muestra el entorno de negocio del sistema y las principales dependencias externas.

### Diagrama de Contexto

\`\`\`
[Cree un diagrama mostrando su sistema y sistemas/usuarios externos]
Puede usar:
- Diagramas Mermaid
- PlantUML
- Arte ASCII
- O referenciar una imagen en /images/
\`\`\`

### Interfaces Externas

| Sistema Externo | Interfaz | Propósito |
|-----------------|----------|-----------|
| [Sistema externo 1] | [API/Protocolo] | [Qué datos/funciones se intercambian] |
| [Tipo de usuario 1] | [UI/API] | [Cómo interactúan los usuarios] |

### Procesos de Negocio Soportados

<!-- ¿Qué procesos de negocio soporta este sistema? -->

1. **Proceso 1**: [Descripción]
   - Actores: [Quién está involucrado]
   - Flujo: [Flujo de alto nivel]

2. **Proceso 2**: [Descripción]

## Contexto Técnico

**Propósito**: Muestra las interfaces técnicas y canales entre el sistema y su entorno.

### Interfaces Técnicas

| Interfaz | Tecnología | Protocolo | Formato |
|----------|------------|-----------|---------|
| [API 1] | [API REST] | [HTTPS] | [JSON] |
| [Base de datos] | [PostgreSQL] | [TCP/IP] | [SQL] |

### Canales y Transmisión

| Canal | Tecnología | Descripción |
|-------|------------|-------------|
| [Cola de mensajes] | [RabbitMQ] | [Comunicación asíncrona entre servicios] |

### Mapeo: Negocio a Técnico

| Contexto de Negocio | Realización Técnica |
|---------------------|---------------------|
| [Interfaz de usuario] | [React SPA sobre HTTPS] |
| [Sistema externo A] | [API REST sobre HTTPS] |
`;
}

function getSolutionStrategyTemplate(): string {
  return `# 4. Estrategia de Solución

**Propósito**: Resume las decisiones fundamentales y estrategias de solución que dan forma a la arquitectura del sistema.

## Decisiones Clave de Solución

### Patrones de Arquitectura

| Patrón | Motivación | Consecuencias |
|--------|------------|---------------|
| [ej. Microservicios] | [Por qué se eligió este patrón] | [Beneficios y compromisos] |

### Decisiones Tecnológicas

| Componente | Tecnología | Razón |
|------------|------------|-------|
| Backend | [ej. Node.js] | [Por qué fue elegido] |
| Frontend | [ej. React] | [Razones] |
| Base de datos | [ej. PostgreSQL] | [Razones] |

### Descomposición de Alto Nivel

<!-- ¿Cómo está estructurado el sistema en el nivel más alto? -->

\`\`\`
[Diagrama de componentes de alto nivel]
\`\`\`

Descripción:
- Componente 1: [Propósito y responsabilidad]
- Componente 2: [Propósito y responsabilidad]

## Logro de Metas de Calidad

### Mapeo: Metas de Calidad a Enfoques de Solución

| Meta de Calidad | Enfoque de Solución |
|-----------------|---------------------|
| [Rendimiento] | [Estrategia de caché, procesamiento asíncrono, CDN] |
| [Seguridad] | [Autenticación, autorización, encriptación] |
| [Escalabilidad] | [Escalamiento horizontal, balanceo de carga] |

### Decisiones Clave de Diseño

1. **Decisión 1**: [ej. Arquitectura dirigida por eventos]
   - Razón: [Por qué este enfoque]
   - Impacto: [Cómo ayuda a lograr las metas de calidad]

2. **Decisión 2**: [Descripción]
   - Razón: [Justificación]
   - Impacto: [Impacto en las metas de calidad]

## Estrategia de Desarrollo

- Enfoque de desarrollo: [Ágil, Scrum, etc.]
- Estrategia de despliegue: [CI/CD, Blue-Green, etc.]
- Estrategia de pruebas: [Unitarias, Integración, E2E]
`;
}

function getBuildingBlockViewTemplate(): string {
  return `# 5. Vista de Bloques

**Propósito**: Descomposición estática del sistema en bloques de construcción y sus relaciones.

## Nivel 1: Contexto del Sistema

### Caja Blanca: Sistema General

**Propósito**: [Qué hace el sistema]

\`\`\`
[Diagrama de componentes con los principales bloques de construcción]
\`\`\`

**Bloques de Construcción Contenidos**:

| Componente | Responsabilidad |
|------------|-----------------|
| [Componente 1] | [Qué hace] |
| [Componente 2] | [Qué hace] |

**Interfaces Importantes**:

| Interfaz | Descripción |
|----------|-------------|
| [API 1] | [Propósito y protocolo] |

## Nivel 2: Detalles de Componentes

### Componente 1 (Caja Blanca)

**Propósito**: [Propósito detallado]

**Interfaces**:
- Entrada: [Qué recibe]
- Salida: [Qué produce]

**Estructura Interna**:

\`\`\`
[Diagrama de módulos/clases internas]
\`\`\`

**Elementos Contenidos**:

| Elemento | Responsabilidad |
|----------|-----------------|
| [Módulo A] | [Propósito] |
| [Módulo B] | [Propósito] |

### Componente 2 (Caja Blanca)

[Estructura similar]

## Nivel 3: Vistas de Detalle

<!-- Solo incluir Nivel 3 para componentes que necesitan detalle adicional -->

### Detalles del Módulo A

[Diagramas detallados de clases, estructura de paquetes, etc.]
`;
}

function getRuntimeViewTemplate(): string {
  return `# 6. Vista de Ejecución

**Propósito**: Muestra el comportamiento e interacción de los bloques de construcción en tiempo de ejecución.

## Escenarios Importantes

### Escenario 1: [Nombre, ej. "Inicio de Sesión de Usuario"]

**Descripción**: [Qué sucede en este escenario]

**Diagrama de Secuencia**:

\`\`\`mermaid
sequenceDiagram
    participant Usuario
    participant Frontend
    participant API
    participant BaseDeDatos

    Usuario->>Frontend: Ingresar credenciales
    Frontend->>API: POST /login
    API->>BaseDeDatos: Validar credenciales
    BaseDeDatos-->>API: Datos del usuario
    API-->>Frontend: Token JWT
    Frontend-->>Usuario: Inicio de sesión exitoso
\`\`\`

**Pasos**:

1. El usuario ingresa sus credenciales
2. El frontend envía la solicitud de inicio de sesión
3. La API valida con la base de datos
4. Se genera y retorna el token
5. El usuario está autenticado

### Escenario 2: [Nombre]

[Estructura similar]

## Flujo de Datos

### Flujo 1: [Nombre]

**Propósito**: [Qué datos fluyen hacia dónde]

**Diagrama**:

\`\`\`
[Diagrama de flujo de datos]
\`\`\`

**Descripción**:
- Paso 1: [Qué sucede]
- Paso 2: [Qué sucede]

## Máquinas de Estado

### Máquina de Estado para [Entidad]

**Estados**:
- Estado 1: [Descripción]
- Estado 2: [Descripción]

**Transiciones**:

| Desde | Evento | Hacia | Acción |
|-------|--------|-------|--------|
| [Estado 1] | [Evento] | [Estado 2] | [Qué sucede] |
`;
}

function getDeploymentViewTemplate(): string {
  return `# 7. Vista de Despliegue

**Propósito**: Describe la infraestructura técnica y cómo se distribuye el software.

## Visión General de Infraestructura

### Diagrama de Despliegue

\`\`\`
[Diagrama con servidores, contenedores, redes]
\`\`\`

## Entornos

### Entorno de Producción

**Infraestructura**:

| Componente | Tecnología | Configuración |
|------------|------------|---------------|
| [Servidor de aplicaciones] | [AWS ECS] | [Especificaciones] |
| [Base de datos] | [RDS PostgreSQL] | [Especificaciones] |
| [Caché] | [Redis] | [Especificaciones] |

**Red**:
- VPC: [Configuración]
- Subredes: [Configuración público/privado]
- Grupos de Seguridad: [Reglas]

### Entorno de Staging

[Estructura similar]

### Entorno de Desarrollo

[Estructura similar]

## Estrategia de Despliegue

### Pipeline CI/CD

1. **Build**: [Qué sucede]
2. **Pruebas**: [Pruebas automatizadas]
3. **Despliegue**: [Proceso de despliegue]

### Estrategia de Rollback

[Cómo se revierten los despliegues]

## Estrategia de Escalamiento

### Escalamiento Horizontal

| Componente | Disparador de Escalamiento | Máx. Instancias |
|------------|---------------------------|-----------------|
| [Servidor API] | [CPU > 70%] | [10] |

### Escalamiento Vertical

[Cuándo y cómo escalar verticalmente]

## Monitoreo y Operaciones

### Health Checks

| Componente | Verificación | Umbral |
|------------|--------------|--------|
| [API] | [Endpoint /health] | [Tiempo de respuesta < 1s] |

### Logging

- Agregación de logs: [ELK, CloudWatch, etc.]
- Retención de logs: [Política]

### Métricas

- Métricas clave: [CPU, Memoria, Tasa de solicitudes]
- Alertas: [Condiciones de alerta]
`;
}

function getConceptsTemplate(): string {
  return `# 8. Conceptos Transversales

**Propósito**: Regulaciones y soluciones generales que son relevantes en múltiples partes del sistema.

## Modelos de Dominio

### Conceptos Centrales del Dominio

\`\`\`
[Diagrama de modelo de dominio o diagrama de clases]
\`\`\`

**Entidades Clave**:

| Entidad | Responsabilidad | Relaciones |
|---------|-----------------|------------|
| [Entidad 1] | [Propósito] | [Entidades relacionadas] |

## Seguridad

### Autenticación

- Método: [JWT, OAuth2, etc.]
- Implementación: [Cómo funciona]

### Autorización

- Modelo: [RBAC, ABAC, etc.]
- Roles: [Lista de roles y permisos]

### Protección de Datos

- Encriptación en reposo: [Cómo]
- Encriptación en tránsito: [Versión TLS]
- Manejo de datos sensibles: [Enfoque]

## Manejo de Errores

### Categorías de Errores

| Categoría | Estrategia de Manejo |
|-----------|---------------------|
| [Errores de validación] | [Retornar 400 con detalles] |
| [Errores del sistema] | [Registrar y retornar 500] |

### Formato de Respuesta de Error

\`\`\`json
{
  "error": {
    "code": "CODIGO_ERROR",
    "message": "Mensaje legible",
    "details": {}
  }
}
\`\`\`

## Logging y Monitoreo

### Estrategia de Logging

- Niveles de log: [DEBUG, INFO, WARN, ERROR]
- Logging estructurado: [Formato JSON]
- IDs de correlación: [Para trazabilidad de solicitudes]

### Monitoreo

- APM: [Herramienta de monitoreo de rendimiento de aplicaciones]
- Métricas: [Métricas clave de negocio y técnicas]

## Gestión de Configuración

### Fuentes de Configuración

1. Variables de entorno
2. Archivos de configuración
3. Gestión de secretos: [Vault, AWS Secrets Manager]

### Configuración por Entorno

| Configuración | Dev | Staging | Prod |
|---------------|-----|---------|------|
| [Nivel de log] | [DEBUG] | [INFO] | [WARN] |

## Estrategia de Pruebas

### Niveles de Pruebas

| Nivel | Cobertura | Herramientas |
|-------|-----------|--------------|
| Pruebas unitarias | [Objetivo %] | [Framework] |
| Pruebas de integración | [Alcance] | [Herramientas] |
| Pruebas E2E | [Flujos clave] | [Herramientas] |

### Gestión de Datos de Prueba

[Cómo se crean y gestionan los datos de prueba]

## Conceptos de Desarrollo

### Organización del Código

- Estructura de paquetes: [Enfoque]
- Convenciones de nomenclatura: [Estándares]

### Build y Gestión de Dependencias

- Herramienta de build: [Maven, Gradle, npm, etc.]
- Gestión de dependencias: [Estrategia]

## Conceptos de Operación

### Backup y Recuperación

- Frecuencia de backup: [Diario, por hora, etc.]
- Retención: [Política]
- Procedimiento de recuperación: [Pasos]

### Recuperación ante Desastres

- RTO: [Objetivo de tiempo de recuperación]
- RPO: [Objetivo de punto de recuperación]
- Estrategia DR: [Enfoque]
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `# 9. Decisiones de Diseño

**Propósito**: Documenta decisiones arquitectónicas importantes, costosas, críticas o riesgosas incluyendo su justificación.

## Formato ADR

Cada decisión sigue esta estructura:
- **Contexto**: ¿Cuál es el problema que estamos abordando?
- **Decisión**: Qué decidimos hacer
- **Consecuencias**: Qué se vuelve más fácil o más difícil

## Registro de Decisiones

### ADR-001: [Título de la Decisión]

**Fecha**: [AAAA-MM-DD]
**Estado**: [Propuesta | Aceptada | Obsoleta | Reemplazada]
**Decisores**: [Nombres]

**Contexto**:

[Describe las fuerzas en juego, técnicas, políticas, sociales y específicas del proyecto. Es probable que estas fuerzas estén en tensión y deben ser identificadas como tales.]

**Decisión**:

[Describe nuestra respuesta a estas fuerzas. Aquí tomamos nuestra decisión.]

**Consecuencias**:

Positivas:
- [Beneficio 1]
- [Beneficio 2]

Negativas:
- [Compromiso 1]
- [Compromiso 2]

Riesgos:
- [Riesgo 1 y mitigación]

### ADR-002: [Otra Decisión]

[Estructura similar]

## Categorías de Decisiones

### Decisiones Estructurales

| Decisión | Justificación | Fecha |
|----------|---------------|-------|
| [Microservicios vs Monolito] | [Por qué se eligió] | [Fecha] |

### Decisiones Tecnológicas

| Componente | Tecnología | Alternativas Consideradas | Por qué se Eligió |
|------------|------------|--------------------------|-------------------|
| [Backend] | [Node.js] | [Python, Java] | [Razones] |

### Decisiones de Proceso

| Decisión | Impacto | Fecha |
|----------|---------|-------|
| [Metodología ágil] | [Cómo afecta la arquitectura] | [Fecha] |

## Decisiones Obsoletas

| Decisión | Fecha de Obsolescencia | Razón | Reemplazada Por |
|----------|------------------------|-------|-----------------|
| [Decisión antigua] | [Fecha] | [Por qué obsoleta] | [ADR-XXX] |
`;
}

function getQualityRequirementsTemplate(): string {
  return `# 10. Requerimientos de Calidad

**Propósito**: Define los requerimientos de calidad con escenarios concretos.

## Árbol de Calidad

### Metas de Calidad de Alto Nivel

\`\`\`
Calidad
├── Rendimiento
│   ├── Tiempo de Respuesta
│   └── Throughput
├── Seguridad
│   ├── Autenticación
│   └── Protección de Datos
├── Fiabilidad
│   ├── Disponibilidad
│   └── Tolerancia a Fallos
└── Mantenibilidad
    ├── Testeabilidad
    └── Modificabilidad
\`\`\`

## Escenarios de Calidad

### Escenarios de Rendimiento

**Escenario 1: Tiempo de Respuesta en Carga Normal**

| Aspecto | Descripción |
|---------|-------------|
| Escenario | Usuario consulta datos bajo carga normal |
| Fuente | Usuario final |
| Estímulo | Solicitud HTTP a la API |
| Entorno | Operación normal, 100 usuarios concurrentes |
| Respuesta | El sistema retorna datos |
| Medida | Tiempo de respuesta percentil 95 < 200ms |

**Escenario 2: Manejo de Carga Pico**

| Aspecto | Descripción |
|---------|-------------|
| Escenario | Sistema bajo carga pico |
| Fuente | Múltiples usuarios |
| Estímulo | 1000 solicitudes concurrentes |
| Entorno | Horas pico |
| Respuesta | El sistema procesa todas las solicitudes |
| Medida | Ninguna solicitud falla, tiempo de respuesta < 1s |

### Escenarios de Seguridad

**Escenario 3: Intento de Acceso No Autorizado**

| Aspecto | Descripción |
|---------|-------------|
| Escenario | Usuario no autorizado intenta acceder a recurso protegido |
| Fuente | Atacante externo |
| Estímulo | Solicitud HTTP sin token válido |
| Entorno | Operación normal |
| Respuesta | El sistema deniega el acceso |
| Medida | Retorna 401, registra el intento, no se exponen datos |

### Escenarios de Fiabilidad

**Escenario 4: Recuperación de Fallo de Servicio**

| Aspecto | Descripción |
|---------|-------------|
| Escenario | La conexión a la base de datos falla |
| Fuente | Fallo de infraestructura |
| Estímulo | La base de datos no está disponible |
| Entorno | Operación normal |
| Respuesta | El sistema continúa funcionando con datos en caché |
| Medida | Degradación del servicio < 5%, recuperación < 30s |

### Escenarios de Mantenibilidad

**Escenario 5: Agregar Nueva Funcionalidad**

| Aspecto | Descripción |
|---------|-------------|
| Escenario | Desarrollador agrega nuevo endpoint de API |
| Fuente | Equipo de desarrollo |
| Estímulo | Nuevo requerimiento |
| Entorno | Desarrollo |
| Respuesta | La funcionalidad se agrega |
| Medida | < 2 días, < 5 archivos modificados, las pruebas pasan |

## Priorización de Requerimientos de Calidad

| Atributo de Calidad | Prioridad | Objetivo |
|---------------------|-----------|----------|
| Disponibilidad | Alta | 99.9% uptime |
| Tiempo de Respuesta | Alta | < 200ms (p95) |
| Seguridad | Crítica | Cero brechas de datos |
| Mantenibilidad | Media | Cobertura de pruebas > 80% |
| Usabilidad | Media | Éxito en tareas de usuario > 95% |
`;
}

function getTechnicalRisksTemplate(): string {
  return `# 11. Riesgos y Deuda Técnica

**Propósito**: Documenta problemas conocidos, riesgos y deuda técnica.

## Riesgos

### Matriz de Evaluación de Riesgos

| Riesgo | Probabilidad | Impacto | Severidad | Estado |
|--------|--------------|---------|-----------|--------|
| [Riesgo 1] | [Alta/Media/Baja] | [Alto/Medio/Bajo] | [Crítica/Alta/Media/Baja] | [Abierto/Mitigado] |

### Riesgos Detallados

**Riesgo 1: [Título del Riesgo]**

- **Descripción**: [Cuál es el riesgo]
- **Probabilidad**: [Alta/Media/Baja]
- **Impacto**: [Alto/Medio/Bajo - y qué sucede]
- **Mitigación**: [Qué estamos haciendo al respecto]
- **Plan de Contingencia**: [Plan si el riesgo ocurre]
- **Responsable**: [Quién es responsable]
- **Estado**: [Abierto/En mitigación/Cerrado]

**Riesgo 2: [Título]**

[Estructura similar]

## Deuda Técnica

### Entradas de Deuda

| Entrada | Tipo | Impacto | Esfuerzo | Prioridad |
|---------|------|---------|----------|-----------|
| [Deuda 1] | [Código/Arquitectura/Pruebas] | [Alto/Medio/Bajo] | [Días] | [1-5] |

### Entradas de Deuda Detalladas

**Deuda 1: [Título]**

- **Descripción**: [Qué necesita ser arreglado]
- **Por qué existe**: [Cómo sucedió]
- **Impacto**: [Qué problemas causa]
- **Solución Propuesta**: [Cómo arreglarlo]
- **Estimación de Esfuerzo**: [Tiempo requerido]
- **Prioridad**: [Cuándo deberíamos arreglarlo]

### Plan de Reducción de Deuda

| Trimestre | Deuda a Abordar | Impacto Esperado |
|-----------|-----------------|------------------|
| Q1 2024 | [Entradas 1, 2] | [Mejora en X] |

## Problemas Conocidos

### Problemas Abiertos

| Problema | Severidad | Solución Alternativa | Fecha Objetivo de Corrección |
|----------|-----------|---------------------|------------------------------|
| [Problema 1] | [Alta/Media/Baja] | [Si existe] | [Fecha] |

### Limitaciones

| Limitación | Impacto | Justificación | Planes Futuros |
|------------|---------|---------------|----------------|
| [Limitación 1] | [Efecto] | [Por qué existe] | [Cuándo/Si se abordará] |

## Vulnerabilidades de Seguridad

### Vulnerabilidades Conocidas

| CVE | Componente | Severidad | Estado | Mitigación |
|-----|------------|-----------|--------|------------|
| [CVE-ID] | [Biblioteca] | [Crítica/Alta/Media] | [Abierta/Corregida] | [Acciones tomadas] |

## Problemas de Rendimiento

| Problema | Impacto | Solución Alternativa | Plan de Resolución |
|----------|---------|---------------------|-------------------|
| [Problema] | [Efecto en usuarios] | [Solución temporal] | [Solución permanente] |
`;
}

function getGlossaryTemplate(): string {
  return `# 12. Glosario

**Propósito**: Define los términos técnicos y de dominio más importantes para asegurar una terminología uniforme.

## Términos de Dominio

| Término | Definición |
|---------|------------|
| [Término de dominio 1] | [Definición clara y precisa] |
| [Término de dominio 2] | [Definición] |

## Términos Técnicos

| Término | Definición | Sinónimos |
|---------|------------|-----------|
| [Término técnico 1] | [Definición] | [Nombres alternativos] |
| [Término técnico 2] | [Definición] | [Nombres alternativos] |

## Abreviaturas y Acrónimos

| Abreviatura | Nombre Completo | Contexto |
|-------------|-----------------|----------|
| API | Application Programming Interface | [Cuándo/dónde se usa] |
| SLA | Service Level Agreement | [Contexto] |
| JWT | JSON Web Token | [Uso] |

## Conceptos de Negocio

| Concepto | Descripción | Términos Relacionados |
|----------|-------------|----------------------|
| [Concepto 1] | [Explicación detallada] | [Conceptos relacionados] |

## Términos Específicos del Sistema

| Término | Definición | Ejemplo |
|---------|------------|---------|
| [Término del sistema 1] | [Qué significa en este sistema] | [Ejemplo de uso] |

## Términos Obsoletos

| Término Antiguo | Reemplazado Por | Razón |
|-----------------|-----------------|-------|
| [Término antiguo] | [Término nuevo] | [Por qué cambió] |

---

**Nota**: Mantenga este glosario actualizado a medida que surjan nuevos términos. Enlace a esta sección desde otras partes de la documentación cuando se utilicen estos términos.
`;
}

/**
 * Get the Spanish workflow guide
 */
export function getWorkflowGuide(): string {
  return `# Guía de Flujo de Trabajo para Documentación de Arquitectura arc42

## Visión General

Esta guía le ayuda a documentar su arquitectura de software utilizando la plantilla arc42. La plantilla arc42 es una plantilla práctica y comprobada para la documentación de arquitecturas de software y sistemas.

## Idiomas Disponibles

Este servidor MCP arc42 soporta múltiples idiomas para la documentación:

| Código | Idioma | Nombre Nativo |
|--------|--------|---------------|
| EN | Inglés | English |
| DE | Alemán | Deutsch |
| CZ | Checo | Čeština |
| ES | Español | Español |
| FR | Francés | Français |
| IT | Italiano | Italiano |
| NL | Neerlandés | Nederlands |
| PT | Portugués | Português |
| RU | Ruso | Русский |
| UKR | Ucraniano | Українська |
| ZH | Chino | 中文 |

## Primeros Pasos

### Paso 1: Inicializar el Espacio de Trabajo

Use la herramienta \`arc42-init\` para crear su espacio de trabajo de documentación:

\`\`\`
arc42-init(projectName: "Mi Proyecto", language: "ES")
\`\`\`

Puede especificar un idioma diferente usando el código de idioma ISO.

### Paso 2: Verificar el Estado

Use \`arc42-status\` para ver el estado actual de su documentación:

\`\`\`
arc42-status()
\`\`\`

### Paso 3: Generar Plantillas de Secciones

Use \`generate-template\` para obtener plantillas detalladas para cada sección:

\`\`\`
generate-template(section: "01_introduction_and_goals", language: "ES")
\`\`\`

## Las 12 Secciones de arc42

1. **Introducción y Metas** - ¡Comience aquí! Defina qué está construyendo y por qué.
2. **Restricciones de la Arquitectura** - ¿Qué NO puede hacer?
3. **Alcance y Contexto del Sistema** - ¿Qué está dentro y qué está fuera?
4. **Estrategia de Solución** - Enfoque de alto nivel para resolver el problema.
5. **Vista de Bloques** - Estructura estática de su sistema.
6. **Vista de Ejecución** - Comportamiento dinámico y escenarios.
7. **Vista de Despliegue** - ¿Cómo se despliega y opera?
8. **Conceptos Transversales** - Patrones utilizados en todo el sistema.
9. **Decisiones de Diseño** - Decisiones importantes y su justificación.
10. **Requerimientos de Calidad** - Escenarios concretos de calidad.
11. **Riesgos y Deuda Técnica** - ¿Qué podría salir mal?
12. **Glosario** - Defina sus términos.

## Mejores Prácticas

1. **Comience con la Sección 1** - Entender las metas es fundamental
2. **Manténgalo breve** - arc42 es pragmático, no burocrático
3. **Use diagramas** - Una imagen vale más que mil palabras
4. **Documente las decisiones** - Su yo futuro se lo agradecerá
5. **Itere** - La documentación de arquitectura nunca está "terminada"

## Herramientas Disponibles

- \`arc42-init\` - Inicializar espacio de trabajo de documentación
- \`arc42-status\` - Verificar estado de documentación
- \`generate-template\` - Generar plantillas de secciones
- \`update-section\` - Actualizar contenido de secciones
- \`get-section\` - Leer contenido de secciones
- \`arc42-workflow-guide\` - Mostrar esta guía

## Recursos

- [Sitio web de arc42](https://arc42.org/)
- [Documentación de arc42](https://docs.arc42.org/)
- [Ejemplos de arc42](https://arc42.org/examples)
`;
}

/**
 * Get the Spanish README content
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Proyecto';
  return `# ${name} - Documentación de Arquitectura

Este directorio contiene la documentación de arquitectura para ${name}, basada en la plantilla arc42.

## Estructura

- \`sections/\` - Archivos markdown de secciones individuales (12 secciones)
- \`images/\` - Diagramas e imágenes
- \`arc42-template.md\` - Documentación principal combinada
- \`config.yaml\` - Configuración

## Las 12 Secciones de arc42

1. **Introducción y Metas** - Requerimientos, metas de calidad, partes interesadas
2. **Restricciones de la Arquitectura** - Restricciones técnicas y organizacionales
3. **Alcance y Contexto del Sistema** - Contexto de negocio y técnico
4. **Estrategia de Solución** - Decisiones y estrategias fundamentales
5. **Vista de Bloques** - Descomposición estática
6. **Vista de Ejecución** - Comportamiento dinámico
7. **Vista de Despliegue** - Infraestructura y despliegue
8. **Conceptos Transversales** - Regulaciones y enfoques generales
9. **Decisiones de Diseño** - Decisiones importantes (ADRs)
10. **Requerimientos de Calidad** - Árbol de calidad y escenarios
11. **Riesgos y Deuda Técnica** - Problemas conocidos y riesgos
12. **Glosario** - Términos importantes

## Primeros Pasos

1. Comience con la Sección 1: Introducción y Metas
2. Trabaje las secciones de forma iterativa
3. Use diagramas para ilustrar conceptos
4. Enfóquese en las decisiones, no en los detalles de implementación

## Generar Documentación

Use las herramientas MCP para:
- Verificar estado: \`arc42-status\`
- Generar plantillas: \`generate-template\`
- Actualizar secciones: \`update-section\`

## Recursos

- [Sitio web de arc42](https://arc42.org/)
- [Documentación de arc42](https://docs.arc42.org/)
- [Ejemplos de arc42](https://arc42.org/examples)
`;
}
