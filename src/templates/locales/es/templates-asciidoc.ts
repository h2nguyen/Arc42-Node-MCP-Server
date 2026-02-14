/**
 * Spanish Templates - AsciiDoc Format
 *
 * Contains all arc42 section templates in Spanish using AsciiDoc syntax.
 * Based on the official arc42 templates from vendor/arc42-template.
 *
 * @module templates/locales/es/templates-asciidoc
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Spanish AsciiDoc template for a specific section
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
  return `= 1. Introduccion y Metas

== Vista de Requerimientos

*Proposito*: Descripcion de los requerimientos relevantes y las directrices que los arquitectos de software y el equipo de desarrollo deben considerar.

=== Requerimientos Clave

// Lista de los 3-5 principales requerimientos funcionales

[options="header",cols="1,3,1"]
|===
|ID |Requerimiento |Prioridad
|REQ-1 |[Descripcion breve] |Alta
|REQ-2 |[Descripcion breve] |Media
|===

=== Caracteristicas

// Caracteristicas esenciales del sistema

* Caracteristica 1: [Descripcion]
* Caracteristica 2: [Descripcion]

== Metas de Calidad

*Proposito*: Defina las 3-5 principales metas de calidad que son mas importantes para las partes interesadas.

// Basado en ISO 25010, priorice cualidades como:
// Rendimiento, Seguridad, Fiabilidad, Mantenibilidad, Usabilidad, etc.

[options="header",cols="1,2,3"]
|===
|Prioridad |Meta de Calidad |Motivacion
|1 |[ej., Rendimiento] |[Por que es critico]
|2 |[ej., Seguridad] |[Por que es critico]
|3 |[ej., Mantenibilidad] |[Por que es critico]
|===

== Partes Interesadas (Stakeholders)

*Proposito*: Identifique a todas las personas que deben conocer la arquitectura.

[options="header",cols="2,2,3"]
|===
|Rol/Nombre |Contacto |Expectativas
|Propietario del Producto |[Nombre/Email] |[Lo que esperan de la arquitectura]
|Equipo de Desarrollo |[Nombre del equipo] |[Lo que necesitan saber]
|Operaciones |[Equipo/Persona] |[Preocupaciones de despliegue y operaciones]
|Usuarios Finales |[Tipo] |[Expectativas de experiencia de usuario]
|===

.Informacion Adicional
Vea link:https://docs.arc42.org/section-1/[Introduccion y Metas] en la documentacion de arc42.
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `= 2. Restricciones de la Arquitectura

*Proposito*: Documente cualquier requerimiento que restrinja a los arquitectos en la libertad de diseno y decisiones de implementacion.

== Restricciones Tecnicas

[options="header",cols="1,3"]
|===
|Restriccion |Explicacion
|[ej., Debe ejecutarse en Linux] |[Por que existe esta restriccion]
|[ej., Java 17 minimo] |[Requerimiento organizacional]
|===

== Restricciones Organizacionales

[options="header",cols="1,3"]
|===
|Restriccion |Explicacion
|[ej., Tamano del equipo: 5 desarrolladores] |[Impacto en la arquitectura]
|[ej., Plazo: 6 meses] |[Restricciones de entrega]
|===

== Convenciones

[options="header",cols="1,3"]
|===
|Convencion |Explicacion
|[ej., Estilo de codigo: Google Java Style] |[Enlace a guia de estilo]
|[ej., Documentacion: arc42] |[Requerimientos de documentacion]
|===

.Informacion Adicional
Vea link:https://docs.arc42.org/section-2/[Restricciones de Arquitectura] en la documentacion de arc42.
`;
}

function getContextAndScopeTemplate(): string {
  return `= 3. Alcance y Contexto del Sistema

*Proposito*: Delimita el sistema de sus socios de comunicacion (sistemas vecinos y usuarios).

== Contexto de Negocio

*Proposito*: Especifique todos los socios de comunicacion (usuarios, sistemas IT, ...) con explicaciones de entradas y salidas especificas del dominio.

// Agregue un diagrama de contexto aqui (PlantUML, Mermaid, o imagen)

[plantuml, contexto-negocio, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(usuario, "Usuario", "Usuario del sistema")
System(sistema, "Su Sistema", "Descripcion")
System_Ext(externo, "Sistema Externo", "Descripcion")

Rel(usuario, sistema, "Usa")
Rel(sistema, externo, "Llama")
@enduml
----

[options="header",cols="1,2,2"]
|===
|Socio |Entrada |Salida
|[Nombre de Usuario/Sistema] |[Lo que envian] |[Lo que reciben]
|===

== Contexto Tecnico

*Proposito*: Especifique los canales tecnicos y protocolos entre el sistema y su contexto.

// Infraestructura tecnica con protocolos

[options="header",cols="1,1,2"]
|===
|Socio |Canal |Protocolo
|[Nombre del sistema] |[ej., API REST] |[ej., HTTPS, JSON]
|[Nombre del sistema] |[ej., Cola de Mensajes] |[ej., AMQP]
|===

.Informacion Adicional
Vea link:https://docs.arc42.org/section-3/[Alcance y Contexto] en la documentacion de arc42.
`;
}

function getSolutionStrategyTemplate(): string {
  return `= 4. Estrategia de Solucion

*Proposito*: Resumen de las decisiones fundamentales y estrategias de solucion que dan forma a la arquitectura del sistema.

== Decisiones Tecnologicas

[options="header",cols="1,2,2"]
|===
|Decision |Eleccion |Justificacion
|Lenguaje de Programacion |[ej., TypeScript] |[Por que esta eleccion]
|Framework |[ej., NestJS] |[Por que esta eleccion]
|Base de Datos |[ej., PostgreSQL] |[Por que esta eleccion]
|===

== Descomposicion de Alto Nivel

Describa la estructura de alto nivel:

* [ej., Arquitectura en capas]
* [ej., Microservicios]
* [ej., Orientada a eventos]

== Estrategias para Alcanzar Metas de Calidad

[options="header",cols="1,2"]
|===
|Meta de Calidad |Estrategia de Logro
|[Rendimiento] |[ej., Cache, procesamiento asincrono]
|[Seguridad] |[ej., OAuth2, cifrado en reposo]
|[Mantenibilidad] |[ej., Arquitectura limpia, pruebas exhaustivas]
|===

.Informacion Adicional
Vea link:https://docs.arc42.org/section-4/[Estrategia de Solucion] en la documentacion de arc42.
`;
}

function getBuildingBlockViewTemplate(): string {
  return `= 5. Vista de Bloques

*Proposito*: Descomposicion estatica del sistema en bloques de construccion con sus dependencias.

== Nivel 1: Sistema General

*Proposito*: La descripcion de caja blanca muestra la estructura interna del sistema general.

=== Descripcion de Caja Blanca

// Agregue un diagrama de componentes aqui

[plantuml, bloques-n1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Container(web, "Aplicacion Web", "React", "Interfaz de usuario")
Container(api, "Servidor API", "Node.js", "Logica de negocio")
ContainerDb(db, "Base de Datos", "PostgreSQL", "Almacenamiento de datos")

Rel(web, api, "Llama", "REST/JSON")
Rel(api, db, "Lee/Escribe", "SQL")
@enduml
----

=== Bloques de Construccion Contenidos

[options="header",cols="1,3"]
|===
|Bloque de Construccion |Descripcion
|[Componente A] |[Responsabilidad y proposito]
|[Componente B] |[Responsabilidad y proposito]
|===

== Nivel 2: [Nombre del Subsistema]

*Proposito*: Descomponga los componentes principales en bloques de construccion mas pequenos.

=== Caja Blanca [Componente A]

// Describa la estructura interna del Componente A

[options="header",cols="1,3"]
|===
|Bloque de Construccion |Descripcion
|[Sub-componente A.1] |[Responsabilidad]
|[Sub-componente A.2] |[Responsabilidad]
|===

.Informacion Adicional
Vea link:https://docs.arc42.org/section-5/[Vista de Bloques] en la documentacion de arc42.
`;
}

function getRuntimeViewTemplate(): string {
  return `= 6. Vista de Ejecucion

*Proposito*: Documente el comportamiento y la interaccion de los bloques de construccion durante la ejecucion.

== Escenario 1: [ej., Inicio de Sesion de Usuario]

// Describa el comportamiento en tiempo de ejecucion para un escenario clave

[plantuml, ejecucion-login, svg]
----
@startuml
actor Usuario
participant "App Web" as Web
participant "Servidor API" as API
participant "Servicio Auth" as Auth
database "BD Usuario" as DB

Usuario -> Web: Ingresa credenciales
Web -> API: POST /auth/login
API -> Auth: Validar credenciales
Auth -> DB: Consultar usuario
DB --> Auth: Datos del usuario
Auth --> API: Token JWT
API --> Web: Exito + token
Web --> Usuario: Panel de control
@enduml
----

=== Descripcion

. El usuario ingresa las credenciales en la aplicacion web
. La app web envia la solicitud de inicio de sesion al servidor API
. La API valida las credenciales contra el servicio de autenticacion
. En caso de exito, se devuelve el token JWT

== Escenario 2: [ej., Procesamiento de Datos]

// Documente otro escenario de ejecucion importante

=== Descripcion

[Describa los pasos e interacciones]

.Informacion Adicional
Vea link:https://docs.arc42.org/section-6/[Vista de Ejecucion] en la documentacion de arc42.
`;
}

function getDeploymentViewTemplate(): string {
  return `= 7. Vista de Despliegue

*Proposito*: Infraestructura tecnica con ambientes, computadoras, procesadores, topologias.

== Nivel de Infraestructura 1

*Proposito*: Vision general de la infraestructura de despliegue.

[plantuml, despliegue-n1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

Deployment_Node(nube, "Proveedor Cloud", "AWS/Azure/GCP") {
    Deployment_Node(capa_web, "Capa Web") {
        Container(web, "Servidor Web", "nginx", "Archivos estaticos + proxy inverso")
    }
    Deployment_Node(capa_app, "Capa de Aplicacion") {
        Container(api, "Servidor API", "Node.js", "Logica de negocio")
    }
    Deployment_Node(capa_datos, "Capa de Datos") {
        ContainerDb(db, "Base de Datos", "PostgreSQL", "Almacenamiento principal")
    }
}
@enduml
----

=== Motivacion

[Por que se eligio esta arquitectura de despliegue]

=== Caracteristicas de Calidad y Rendimiento

[Como este despliegue soporta las metas de calidad]

== Nivel de Infraestructura 2

*Proposito*: Vista detallada de nodos de despliegue especificos.

=== [Nombre del Nodo]

[options="header",cols="1,3"]
|===
|Aspecto |Descripcion
|Hardware |[ej., 4 vCPU, 16GB RAM]
|Software |[ej., Ubuntu 22.04, Docker 24.x]
|Red |[ej., VPC, grupos de seguridad]
|===

.Informacion Adicional
Vea link:https://docs.arc42.org/section-7/[Vista de Despliegue] en la documentacion de arc42.
`;
}

function getConceptsTemplate(): string {
  return `= 8. Conceptos Transversales

*Proposito*: Regulaciones generales e ideas de solucion relevantes en multiples bloques de construccion.

== Modelo de Dominio

// Conceptos principales del dominio y sus relaciones

[plantuml, modelo-dominio, svg]
----
@startuml
class Usuario {
  +id: UUID
  +email: String
  +nombre: String
}
class Pedido {
  +id: UUID
  +estado: EstadoPedido
  +creadoEn: DateTime
}
Usuario "1" -- "*" Pedido : realiza
@enduml
----

== Concepto de Seguridad

=== Autenticacion

[Describa el enfoque de autenticacion: JWT, OAuth2, etc.]

=== Autorizacion

[Describa el enfoque de autorizacion: RBAC, ABAC, etc.]

== Manejo de Errores

[Describa como se manejan los errores en el sistema]

* [ej., Manejador de errores global]
* [ej., Respuestas de error estructuradas]
* [ej., Estrategia de registro de errores]

== Registro y Monitoreo

[options="header",cols="1,2"]
|===
|Aspecto |Enfoque
|Registro |[ej., Logs JSON estructurados, stack ELK]
|Metricas |[ej., Prometheus, Grafana]
|Trazabilidad |[ej., OpenTelemetry, Jaeger]
|===

== Estrategia de Pruebas

[options="header",cols="1,2,1"]
|===
|Tipo |Alcance |Cobertura Objetivo
|Pruebas Unitarias |Funciones/clases individuales |80%
|Pruebas de Integracion |Interacciones de componentes |Rutas clave
|Pruebas E2E |Flujos completos de usuario |Flujos criticos
|===

.Informacion Adicional
Vea link:https://docs.arc42.org/section-8/[Conceptos Transversales] en la documentacion de arc42.
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `= 9. Decisiones de Arquitectura

*Proposito*: Documente las decisiones arquitectonicas importantes, costosas, a gran escala o riesgosas.

== ADR-001: [Titulo de la Decision]

=== Estado

[Propuesta | Aceptada | Obsoleta | Reemplazada]

=== Contexto

[Describa el problema que motiva esta decision]

=== Decision

[Describa la decision que se tomo]

=== Consecuencias

*Positivas:*

* [Beneficio 1]
* [Beneficio 2]

*Negativas:*

* [Desventaja 1]
* [Desventaja 2]

=== Alternativas Consideradas

[options="header",cols="1,2,2"]
|===
|Alternativa |Pros |Contras
|[Opcion A] |[Beneficios] |[Desventajas]
|[Opcion B] |[Beneficios] |[Desventajas]
|===

'''

== ADR-002: [Titulo de la Decision]

// Use la misma plantilla para decisiones adicionales

.Informacion Adicional
Vea link:https://docs.arc42.org/section-9/[Decisiones de Arquitectura] en la documentacion de arc42.
`;
}

function getQualityRequirementsTemplate(): string {
  return `= 10. Requerimientos de Calidad

*Proposito*: Requerimientos de calidad concretos con escenarios para evaluacion.

== Arbol de Calidad

// Representacion visual de las metas de calidad y sus refinamientos

[plantuml, arbol-calidad, svg]
----
@startmindmap
* Calidad
** Rendimiento
*** Tiempo de Respuesta
*** Capacidad
** Seguridad
*** Autenticacion
*** Autorizacion
** Mantenibilidad
*** Modularidad
*** Testeabilidad
@endmindmap
----

== Escenarios de Calidad

=== Escenarios de Rendimiento

[options="header",cols="1,2,1,1"]
|===
|ID |Escenario |Respuesta Esperada |Prioridad
|REND-1 |Usuario solicita panel bajo carga normal |< 200ms |Alta
|REND-2 |Sistema maneja 1000 usuarios concurrentes |Sin degradacion |Media
|===

=== Escenarios de Seguridad

[options="header",cols="1,2,1,1"]
|===
|ID |Escenario |Comportamiento Esperado |Prioridad
|SEG-1 |Intento de inicio de sesion invalido |Bloqueo de cuenta despues de 5 intentos |Alta
|SEG-2 |Acceso no autorizado a API |Respuesta 401, registrado en auditoria |Alta
|===

=== Escenarios de Mantenibilidad

[options="header",cols="1,2,1,1"]
|===
|ID |Escenario |Esfuerzo Esperado |Prioridad
|MANT-1 |Agregar nuevo tipo de entidad |< 2 dias de desarrollo |Media
|MANT-2 |Actualizar version de dependencia |< 4 horas incluyendo pruebas |Media
|===

.Informacion Adicional
Vea link:https://docs.arc42.org/section-10/[Requerimientos de Calidad] en la documentacion de arc42.
`;
}

function getTechnicalRisksTemplate(): string {
  return `= 11. Riesgos Tecnicos y Deuda Tecnica

*Proposito*: Identifique y rastree los riesgos tecnicos conocidos y la deuda tecnica acumulada.

== Riesgos Tecnicos

[options="header",cols="1,2,1,2"]
|===
|Riesgo |Descripcion |Probabilidad |Mitigacion
|[ej., Falla de API de terceros] |[Servicio externo del que dependemos] |Media |[Circuit breaker, fallback]
|[ej., Perdida de datos] |[Corrupcion de base de datos] |Baja |[Respaldos, replicacion]
|===

== Deuda Tecnica

[options="header",cols="1,2,1,1"]
|===
|Elemento |Descripcion |Impacto |Prioridad
|[ej., Autenticacion heredada] |[Sistema de auth antiguo necesita reemplazo] |Alto |Media
|[ej., Pruebas faltantes] |[Cobertura por debajo del objetivo en modulo X] |Medio |Baja
|===

== Monitoreo de Riesgos

[Describa como se monitorean y revisan los riesgos]

* [ej., Reuniones semanales de revision de riesgos]
* [ej., Alertas de monitoreo automatizado]

.Informacion Adicional
Vea link:https://docs.arc42.org/section-11/[Riesgos y Deuda Tecnica] en la documentacion de arc42.
`;
}

function getGlossaryTemplate(): string {
  return `= 12. Glosario

*Proposito*: Defina los terminos importantes del dominio y tecnicos utilizados en la documentacion de arquitectura.

== Terminos de Dominio

[options="header",cols="1,3"]
|===
|Termino |Definicion
|[Termino de Dominio 1] |[Definicion clara y concisa]
|[Termino de Dominio 2] |[Definicion clara y concisa]
|===

== Terminos Tecnicos

[options="header",cols="1,3"]
|===
|Termino |Definicion
|[Termino Tecnico 1] |[Definicion clara y concisa]
|[Termino Tecnico 2] |[Definicion clara y concisa]
|===

== Abreviaturas

[options="header",cols="1,3"]
|===
|Abreviatura |Significado
|API |Interfaz de Programacion de Aplicaciones
|JWT |JSON Web Token
|REST |Transferencia de Estado Representacional
|===

.Informacion Adicional
Vea link:https://docs.arc42.org/section-12/[Glosario] en la documentacion de arc42.
`;
}

/**
 * Get the Spanish workflow guide in AsciiDoc format
 */
export function getWorkflowGuide(): string {
  return `= Guia de Flujo de Trabajo para Documentacion de Arquitectura arc42

== Vision General

Esta guia le ayuda a documentar su arquitectura de software utilizando la plantilla arc42. La plantilla arc42 es una plantilla practica y probada para la documentacion de arquitecturas de software y sistemas.

== Idiomas Disponibles

Este servidor MCP de arc42 soporta multiples idiomas para la documentacion:

[options="header",cols="1,2,2"]
|===
|Codigo |Idioma |Nombre Nativo
|EN |Ingles |English
|DE |Aleman |Deutsch
|CZ |Checo |Cestina
|ES |Espanol |Espanol
|FR |Frances |Francais
|IT |Italiano |Italiano
|NL |Holandes |Nederlands
|PT |Portugues |Portugues
|RU |Ruso |Russkij
|UKR |Ucraniano |Ukrainska
|ZH |Chino |Zhongwen
|===

== Comenzando

=== Paso 1: Inicializar su Espacio de Trabajo

Use la herramienta \`arc42-init\` para crear su espacio de trabajo de documentacion:

[source]
----
arc42-init(projectName: "Mi Proyecto", language: "ES")
----

Puede especificar un idioma diferente usando el codigo de idioma ISO.

=== Paso 2: Verificar Estado

Use \`arc42-status\` para ver el estado actual de su documentacion:

[source]
----
arc42-status()
----

=== Paso 3: Generar Plantillas de Secciones

Use \`generate-template\` para obtener plantillas detalladas para cada seccion:

[source]
----
generate-template(section: "01_introduction_and_goals", language: "ES")
----

== Las 12 Secciones de arc42

. *Introduccion y Metas* - Comience aqui! Defina que esta construyendo y por que.
. *Restricciones de Arquitectura* - Que NO tiene permitido hacer?
. *Alcance y Contexto* - Que esta dentro y que esta fuera?
. *Estrategia de Solucion* - Enfoque de alto nivel para resolver el problema.
. *Vista de Bloques* - Estructura estatica de su sistema.
. *Vista de Ejecucion* - Comportamiento dinamico y escenarios.
. *Vista de Despliegue* - Como se despliega y opera?
. *Conceptos Transversales* - Patrones usados en todo el sistema.
. *Decisiones de Arquitectura* - Decisiones importantes y su justificacion.
. *Requerimientos de Calidad* - Escenarios de calidad concretos.
. *Riesgos y Deuda Tecnica* - Que podria salir mal?
. *Glosario* - Defina sus terminos.

== Mejores Practicas

. *Comience con la Seccion 1* - Entender las metas es fundamental
. *Mantengalo conciso* - arc42 es pragmatico, no burocratico
. *Use diagramas* - Una imagen vale mas que mil palabras
. *Documente las decisiones* - Su yo futuro le agradecera a su yo presente
. *Itere* - La documentacion de arquitectura nunca esta "terminada"

== Herramientas Disponibles

* \`arc42-init\` - Inicializar espacio de trabajo de documentacion
* \`arc42-status\` - Verificar estado de la documentacion
* \`generate-template\` - Generar plantillas de secciones
* \`update-section\` - Actualizar contenido de secciones
* \`get-section\` - Leer contenido de secciones
* \`arc42-workflow-guide\` - Mostrar esta guia

== Recursos

* link:https://arc42.org/[Sitio Web de arc42]
* link:https://docs.arc42.org/[Documentacion de arc42]
* link:https://arc42.org/examples[Ejemplos de arc42]
`;
}

/**
 * Get the Spanish README content in AsciiDoc format
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Proyecto';
  return `= ${name} - Documentacion de Arquitectura

Este directorio contiene la documentacion de arquitectura para ${name}, siguiendo la plantilla arc42.

== Estructura

* \`sections/\` - Archivos AsciiDoc de secciones individuales (12 secciones)
* \`images/\` - Diagramas e imagenes
* \`arc42-documentation.adoc\` - Documentacion principal combinada
* \`config.yaml\` - Configuracion

== Las 12 Secciones de arc42

. *Introduccion y Metas* - Requerimientos, metas de calidad, partes interesadas
. *Restricciones de Arquitectura* - Restricciones tecnicas y organizacionales
. *Alcance y Contexto* - Contexto de negocio y tecnico
. *Estrategia de Solucion* - Decisiones y estrategias fundamentales
. *Vista de Bloques* - Descomposicion estatica
. *Vista de Ejecucion* - Comportamiento dinamico
. *Vista de Despliegue* - Infraestructura y despliegue
. *Conceptos Transversales* - Regulaciones y enfoques generales
. *Decisiones de Arquitectura* - Decisiones importantes (ADRs)
. *Requerimientos de Calidad* - Arbol de calidad y escenarios
. *Riesgos y Deuda Tecnica* - Problemas y riesgos conocidos
. *Glosario* - Terminos importantes

== Comenzando

. Comience con la Seccion 1: Introduccion y Metas
. Trabaje las secciones de forma iterativa
. Use diagramas para ilustrar conceptos
. Mantengase enfocado en las decisiones, no en detalles de implementacion

== Generando Documentacion

Use las herramientas MCP para:

* Verificar estado: \`arc42-status\`
* Generar plantillas: \`generate-template\`
* Actualizar secciones: \`update-section\`

== Recursos

* link:https://arc42.org/[Sitio Web de arc42]
* link:https://docs.arc42.org/[Documentacion de arc42]
* link:https://arc42.org/examples[Ejemplos de arc42]
`;
}
