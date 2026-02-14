/**
 * French Templates - AsciiDoc Format
 *
 * Contains all arc42 section templates in French using AsciiDoc syntax.
 * Based on the official arc42 templates from vendor/arc42-template.
 *
 * @module templates/locales/fr/templates-asciidoc
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the French AsciiDoc template for a specific section
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
  return `= 1. Introduction et Objectifs

== Aperçu des spécifications

*Objectif* : Décrit les spécifications importantes et les facteurs déterminants que les architectes logiciels et l'équipe de développement doivent prendre en compte.

=== Spécifications clés

// Listez les 3 à 5 principales exigences fonctionnelles

[options="header",cols="1,3,1"]
|===
|ID |Spécification |Priorité
|SPEC-1 |[Brève description] |Haute
|SPEC-2 |[Brève description] |Moyenne
|===

=== Caractéristiques essentielles

// Caractéristiques essentielles du système

* Caractéristique 1 : [Description]
* Caractéristique 2 : [Description]

== Objectifs de Qualité

*Objectif* : Définir les 3 à 5 principaux objectifs de qualité pour l'architecture dont la réalisation est de la plus haute importance pour les principales parties prenantes.

// Basé sur la norme ISO 25010, priorisez les qualités telles que :
// Performance, Sécurité, Fiabilité, Maintenabilité, Utilisabilité, etc.

[options="header",cols="1,2,3"]
|===
|Priorité |Objectif de qualité |Motivation
|1 |[ex. Performance] |[Pourquoi c'est critique]
|2 |[ex. Sécurité] |[Pourquoi c'est critique]
|3 |[ex. Maintenabilité] |[Pourquoi c'est critique]
|===

== Parties prenantes

*Objectif* : Identifier toutes les personnes qui doivent connaître l'architecture.

[options="header",cols="2,2,3"]
|===
|Rôle/Nom |Contact |Attentes
|Product Owner |[Nom/Email] |[Ce qu'il attend de l'architecture]
|Équipe de développement |[Nom de l'équipe] |[Ce qu'ils doivent savoir]
|Opérations |[Équipe/Personne] |[Préoccupations de déploiement et d'exploitation]
|Utilisateurs finaux |[Type] |[Attentes en matière d'expérience utilisateur]
|===

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-1/[Introduction and Goals] dans la documentation arc42.
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `= 2. Contraintes d'Architecture

*Objectif* : Documenter toute spécification qui limite la liberté des architectes dans leurs décisions de conception et de mise en œuvre.

== Contraintes techniques

[options="header",cols="1,3"]
|===
|Contrainte |Explication
|[ex. Doit fonctionner sous Linux] |[Pourquoi cette contrainte existe]
|[ex. Java 17 minimum] |[Exigence organisationnelle]
|===

== Contraintes organisationnelles

[options="header",cols="1,3"]
|===
|Contrainte |Explication
|[ex. Taille de l'équipe : 5 développeurs] |[Impact sur l'architecture]
|[ex. Délai : 6 mois] |[Contraintes de livraison]
|===

== Conventions

[options="header",cols="1,3"]
|===
|Convention |Explication
|[ex. Style de code : Google Java Style] |[Lien vers le guide de style]
|[ex. Documentation : arc42] |[Exigences de documentation]
|===

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-2/[Architecture Constraints] dans la documentation arc42.
`;
}

function getContextAndScopeTemplate(): string {
  return `= 3. Contexte et périmètre

*Objectif* : Délimiter votre système de ses partenaires de communication (systèmes voisins et utilisateurs).

== Contexte métier

*Objectif* : Spécifier tous les partenaires de communication (utilisateurs, systèmes informatiques, ...) avec des explications sur les entrées et sorties spécifiques au domaine.

// Ajoutez un diagramme de contexte ici (PlantUML, Mermaid, ou image)

[plantuml, business-context, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(user, "Utilisateur", "Utilisateur du système")
System(system, "Votre Système", "Description")
System_Ext(external, "Système Externe", "Description")

Rel(user, system, "Utilise")
Rel(system, external, "Appelle")
@enduml
----

[options="header",cols="1,2,2"]
|===
|Partenaire |Entrée |Sortie
|[Nom utilisateur/système] |[Ce qu'ils envoient] |[Ce qu'ils reçoivent]
|===

== Contexte Technique

*Objectif* : Spécifier les canaux et protocoles techniques entre le système et son contexte.

// Infrastructure technique avec protocoles

[options="header",cols="1,1,2"]
|===
|Partenaire |Canal |Protocole
|[Nom du système] |[ex. API REST] |[ex. HTTPS, JSON]
|[Nom du système] |[ex. File de messages] |[ex. AMQP]
|===

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-3/[Context and Scope] dans la documentation arc42.
`;
}

function getSolutionStrategyTemplate(): string {
  return `= 4. Stratégie de solution

*Objectif* : Résumé des décisions fondamentales et des stratégies de solution qui façonnent l'architecture.

== Décisions technologiques

[options="header",cols="1,2,2"]
|===
|Décision |Choix |Justification
|Langage de programmation |[ex. TypeScript] |[Pourquoi ce choix]
|Framework |[ex. NestJS] |[Pourquoi ce choix]
|Base de données |[ex. PostgreSQL] |[Pourquoi ce choix]
|===

== Décomposition de haut niveau

Décrivez la structure de haut niveau :

* [ex. Architecture en couches]
* [ex. Microservices]
* [ex. Architecture événementielle]

== Stratégies d'atteinte des objectifs de qualité

[options="header",cols="1,2"]
|===
|Objectif de qualité |Stratégie d'atteinte
|[Performance] |[ex. Cache, traitement asynchrone]
|[Sécurité] |[ex. OAuth2, chiffrement au repos]
|[Maintenabilité] |[ex. Architecture propre, tests complets]
|===

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-4/[Solution Strategy] dans la documentation arc42.
`;
}

function getBuildingBlockViewTemplate(): string {
  return `= 5. Vue en Briques

*Objectif* : Décomposition statique du système en briques avec leurs dépendances.

== Niveau 1 : Système global Boîte blanche

*Objectif* : La description en boîte blanche montre la structure interne du système global.

=== Description Boîte blanche

// Ajoutez un diagramme de composants ici

[plantuml, building-blocks-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Container(web, "Application Web", "React", "Interface utilisateur")
Container(api, "Serveur API", "Node.js", "Logique métier")
ContainerDb(db, "Base de données", "PostgreSQL", "Stockage de données")

Rel(web, api, "Appelle", "REST/JSON")
Rel(api, db, "Lit/Écrit", "SQL")
@enduml
----

=== Briques contenues

[options="header",cols="1,3"]
|===
|Brique |Description
|[Composant A] |[Responsabilité et objectif]
|[Composant B] |[Responsabilité et objectif]
|===

== Niveau 2 : [Nom du sous-système]

*Objectif* : Décomposer les composants principaux en briques plus petites.

=== Boîte blanche [Composant A]

// Décrivez la structure interne du Composant A

[options="header",cols="1,3"]
|===
|Brique |Description
|[Sous-composant A.1] |[Responsabilité]
|[Sous-composant A.2] |[Responsabilité]
|===

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-5/[Building Block View] dans la documentation arc42.
`;
}

function getRuntimeViewTemplate(): string {
  return `= 6. Vue Exécution

*Objectif* : Documenter le comportement et les interactions des briques pendant l'exécution.

== Scénario 1 : [ex. Connexion utilisateur]

// Décrivez le comportement à l'exécution pour un scénario clé

[plantuml, runtime-login, svg]
----
@startuml
actor Utilisateur
participant "Application Web" as Web
participant "Serveur API" as API
participant "Service Auth" as Auth
database "Base Utilisateurs" as DB

Utilisateur -> Web: Saisir identifiants
Web -> API: POST /auth/login
API -> Auth: Valider identifiants
Auth -> DB: Requête utilisateur
DB --> Auth: Données utilisateur
Auth --> API: Token JWT
API --> Web: Succès + token
Web --> Utilisateur: Tableau de bord
@enduml
----

=== Description

. L'utilisateur saisit ses identifiants dans l'application web
. L'application web envoie une requête de connexion au serveur API
. L'API valide les identifiants auprès du service d'authentification
. En cas de succès, un token JWT est retourné

== Scénario 2 : [ex. Traitement de données]

// Documentez un autre scénario d'exécution important

=== Description

[Décrivez les étapes et les interactions]

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-6/[Runtime View] dans la documentation arc42.
`;
}

function getDeploymentViewTemplate(): string {
  return `= 7. Vue Déploiement

*Objectif* : Infrastructure technique avec environnements, ordinateurs, processeurs, topologies.

== Infrastructure Niveau 1

*Objectif* : Aperçu de l'infrastructure de déploiement.

[plantuml, deployment-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

Deployment_Node(cloud, "Fournisseur Cloud", "AWS/Azure/GCP") {
    Deployment_Node(web_tier, "Niveau Web") {
        Container(web, "Serveur Web", "nginx", "Fichiers statiques + proxy inverse")
    }
    Deployment_Node(app_tier, "Niveau Application") {
        Container(api, "Serveur API", "Node.js", "Logique métier")
    }
    Deployment_Node(data_tier, "Niveau Données") {
        ContainerDb(db, "Base de données", "PostgreSQL", "Stockage principal")
    }
}
@enduml
----

=== Motivation

[Pourquoi cette architecture de déploiement a été choisie]

=== Caractéristiques de qualité et de performance

[Comment ce déploiement soutient les objectifs de qualité]

== Infrastructure Niveau 2

*Objectif* : Vue détaillée des nœuds de déploiement spécifiques.

=== [Nom du nœud]

[options="header",cols="1,3"]
|===
|Aspect |Description
|Matériel |[ex. 4 vCPU, 16 Go RAM]
|Logiciel |[ex. Ubuntu 22.04, Docker 24.x]
|Réseau |[ex. VPC, groupes de sécurité]
|===

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-7/[Deployment View] dans la documentation arc42.
`;
}

function getConceptsTemplate(): string {
  return `= 8. Concepts transversaux

*Objectif* : Réglementations générales et idées de solutions pertinentes dans plusieurs briques.

== Modèle de domaine

// Concepts de domaine principaux et leurs relations

[plantuml, domain-model, svg]
----
@startuml
class Utilisateur {
  +id: UUID
  +email: String
  +nom: String
}
class Commande {
  +id: UUID
  +statut: StatutCommande
  +dateCreation: DateTime
}
Utilisateur "1" -- "*" Commande : passe
@enduml
----

== Concept de sécurité

=== Authentification

[Décrivez l'approche d'authentification : JWT, OAuth2, etc.]

=== Autorisation

[Décrivez l'approche d'autorisation : RBAC, ABAC, etc.]

== Gestion des erreurs

[Décrivez comment les erreurs sont gérées dans tout le système]

* [ex. Gestionnaire d'erreurs global]
* [ex. Réponses d'erreur structurées]
* [ex. Stratégie de journalisation des erreurs]

== Journalisation et surveillance

[options="header",cols="1,2"]
|===
|Aspect |Approche
|Journalisation |[ex. Logs JSON structurés, pile ELK]
|Métriques |[ex. Prometheus, Grafana]
|Traçage |[ex. OpenTelemetry, Jaeger]
|===

== Stratégie de test

[options="header",cols="1,2,1"]
|===
|Type |Portée |Couverture cible
|Tests unitaires |Fonctions/classes individuelles |80%
|Tests d'intégration |Interactions de composants |Chemins clés
|Tests E2E |Parcours utilisateur complets |Flux critiques
|===

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-8/[Cross-cutting Concepts] dans la documentation arc42.
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `= 9. Décisions d'architecture

*Objectif* : Documenter les décisions architecturales importantes, coûteuses, à grande échelle ou risquées.

== ADR-001 : [Titre de la décision]

=== Statut

[Proposé | Accepté | Obsolète | Remplacé]

=== Contexte

[Décrivez le problème motivant cette décision]

=== Décision

[Décrivez la décision qui a été prise]

=== Conséquences

*Positives :*

* [Avantage 1]
* [Avantage 2]

*Négatives :*

* [Inconvénient 1]
* [Inconvénient 2]

=== Alternatives considérées

[options="header",cols="1,2,2"]
|===
|Alternative |Avantages |Inconvénients
|[Option A] |[Bénéfices] |[Désavantages]
|[Option B] |[Bénéfices] |[Désavantages]
|===

'''

== ADR-002 : [Titre de la décision]

// Utilisez le même modèle pour les décisions supplémentaires

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-9/[Architecture Decisions] dans la documentation arc42.
`;
}

function getQualityRequirementsTemplate(): string {
  return `= 10. Critères de qualité

*Objectif* : Exigences de qualité concrètes avec des scénarios pour l'évaluation.

== Exigences de qualité - Vue d'ensemble

// Représentation visuelle des objectifs de qualité et de leurs raffinements

[plantuml, quality-tree, svg]
----
@startmindmap
* Qualité
** Performance
*** Temps de réponse
*** Débit
** Sécurité
*** Authentification
*** Autorisation
** Maintenabilité
*** Modularité
*** Testabilité
@endmindmap
----

== Scénarios Qualité

=== Scénarios de performance

[options="header",cols="1,2,1,1"]
|===
|ID |Scénario |Réponse attendue |Priorité
|PERF-1 |L'utilisateur demande le tableau de bord en charge normale |< 200ms |Haute
|PERF-2 |Le système gère 1000 utilisateurs simultanés |Pas de dégradation |Moyenne
|===

=== Scénarios de sécurité

[options="header",cols="1,2,1,1"]
|===
|ID |Scénario |Comportement attendu |Priorité
|SEC-1 |Tentative de connexion invalide |Verrouillage du compte après 5 tentatives |Haute
|SEC-2 |Accès API non autorisé |Réponse 401, audit enregistré |Haute
|===

=== Scénarios de maintenabilité

[options="header",cols="1,2,1,1"]
|===
|ID |Scénario |Effort attendu |Priorité
|MAINT-1 |Ajouter un nouveau type d'entité |< 2 jours de développement |Moyenne
|MAINT-2 |Mettre à jour une version de dépendance |< 4 heures tests inclus |Moyenne
|===

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-10/[Quality Requirements] dans la documentation arc42.
`;
}

function getTechnicalRisksTemplate(): string {
  return `= 11. Risques et Dettes techniques

*Objectif* : Identifier et suivre les risques techniques connus et les dettes techniques accumulées.

== Risques techniques

[options="header",cols="1,2,1,2"]
|===
|Risque |Description |Probabilité |Atténuation
|[ex. Défaillance API tierce] |[Service externe dont nous dépendons] |Moyenne |[Circuit breaker, solution de repli]
|[ex. Perte de données] |[Corruption de base de données] |Faible |[Sauvegardes, réplication]
|===

== Dettes techniques

[options="header",cols="1,2,1,1"]
|===
|Élément |Description |Impact |Priorité
|[ex. Authentification legacy] |[Ancien système auth à remplacer] |Élevé |Moyenne
|[ex. Tests manquants] |[Couverture sous la cible dans module X] |Moyen |Faible
|===

== Surveillance des risques

[Décrivez comment les risques sont surveillés et revus]

* [ex. Réunions hebdomadaires de revue des risques]
* [ex. Alertes de surveillance automatisées]

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-11/[Risks and Technical Debt] dans la documentation arc42.
`;
}

function getGlossaryTemplate(): string {
  return `= 12. Glossaire

*Objectif* : Définir les termes importants du domaine et techniques utilisés dans la documentation d'architecture.

== Termes du domaine

[options="header",cols="1,3"]
|===
|Terme |Définition
|[Terme du domaine 1] |[Définition claire et concise]
|[Terme du domaine 2] |[Définition claire et concise]
|===

== Termes techniques

[options="header",cols="1,3"]
|===
|Terme |Définition
|[Terme technique 1] |[Définition claire et concise]
|[Terme technique 2] |[Définition claire et concise]
|===

== Abréviations

[options="header",cols="1,3"]
|===
|Abréviation |Signification
|API |Application Programming Interface (Interface de programmation d'application)
|JWT |JSON Web Token (Jeton Web JSON)
|REST |Representational State Transfer (Transfert d'état représentatif)
|===

.Informations supplémentaires
Voir link:https://docs.arc42.org/section-12/[Glossary] dans la documentation arc42.
`;
}

/**
 * Get the French workflow guide in AsciiDoc format
 */
export function getWorkflowGuide(): string {
  return `= Guide de flux de travail pour la documentation d'architecture arc42

== Aperçu

Ce guide vous aide à documenter votre architecture logicielle en utilisant le modèle arc42. Le modèle arc42 est un modèle pratique et éprouvé pour la documentation des architectures logicielles et système.

== Langues disponibles

Ce serveur MCP arc42 prend en charge plusieurs langues pour la documentation :

[options="header",cols="1,2,2"]
|===
|Code |Langue |Nom natif
|EN |Anglais |English
|DE |Allemand |Deutsch
|CZ |Tchèque |Čeština
|ES |Espagnol |Español
|FR |Français |Français
|IT |Italien |Italiano
|NL |Néerlandais |Nederlands
|PT |Portugais |Português
|RU |Russe |Русский
|UKR |Ukrainien |Українська
|ZH |Chinois |中文
|===

== Pour commencer

=== Étape 1 : Initialiser votre espace de travail

Utilisez l'outil \`arc42-init\` pour créer votre espace de travail de documentation :

[source]
----
arc42-init(projectName: "Mon Projet", language: "FR")
----

Vous pouvez spécifier une langue différente en utilisant le code de langue ISO.

=== Étape 2 : Vérifier le statut

Utilisez \`arc42-status\` pour voir l'état actuel de votre documentation :

[source]
----
arc42-status()
----

=== Étape 3 : Générer des modèles de section

Utilisez \`generate-template\` pour obtenir des modèles détaillés pour chaque section :

[source]
----
generate-template(section: "01_introduction_and_goals", language: "FR")
----

== Les 12 sections arc42

. *Introduction et Objectifs* - Commencez ici ! Définissez ce que vous construisez et pourquoi.
. *Contraintes d'architecture* - Qu'est-ce que vous n'êtes PAS autorisé à faire ?
. *Contexte et périmètre* - Qu'est-ce qui est inclus et qu'est-ce qui est exclu ?
. *Stratégie de solution* - Approche de haut niveau pour résoudre le problème.
. *Vue en briques* - Structure statique de votre système.
. *Vue exécution* - Comportement dynamique et scénarios.
. *Vue déploiement* - Comment est-il déployé et exploité ?
. *Concepts transversaux* - Modèles utilisés dans tout le système.
. *Décisions d'architecture* - Décisions importantes et leur justification.
. *Critères de qualité* - Scénarios de qualité concrets.
. *Risques et dettes techniques* - Qu'est-ce qui pourrait mal tourner ?
. *Glossaire* - Définissez vos termes.

== Bonnes pratiques

. *Commencez par la section 1* - Comprendre les objectifs est fondamental
. *Soyez concis* - arc42 est pragmatique, pas bureaucratique
. *Utilisez des diagrammes* - Une image vaut mille mots
. *Documentez les décisions* - Votre futur vous remerciera votre présent vous
. *Itérez* - La documentation d'architecture n'est jamais "terminée"

== Outils disponibles

* \`arc42-init\` - Initialiser l'espace de travail de documentation
* \`arc42-status\` - Vérifier le statut de la documentation
* \`generate-template\` - Générer des modèles de section
* \`update-section\` - Mettre à jour le contenu d'une section
* \`get-section\` - Lire le contenu d'une section
* \`arc42-workflow-guide\` - Afficher ce guide

== Ressources

* link:https://arc42.org/[Site web arc42]
* link:https://docs.arc42.org/[Documentation arc42]
* link:https://arc42.org/examples[Exemples arc42]
`;
}

/**
 * Get the French README content in AsciiDoc format
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Projet';
  return `= ${name} - Documentation d'Architecture

Ce répertoire contient la documentation d'architecture pour ${name}, suivant le modèle arc42.

== Structure

* \`sections/\` - Fichiers AsciiDoc des sections individuelles (12 sections)
* \`images/\` - Diagrammes et images
* \`arc42-documentation.adoc\` - Documentation combinée principale
* \`config.yaml\` - Configuration

== Les 12 sections arc42

. *Introduction et Objectifs* - Spécifications, objectifs de qualité, parties prenantes
. *Contraintes d'architecture* - Contraintes techniques et organisationnelles
. *Contexte et périmètre* - Contexte métier et technique
. *Stratégie de solution* - Décisions et stratégies fondamentales
. *Vue en briques* - Décomposition statique
. *Vue exécution* - Comportement dynamique
. *Vue déploiement* - Infrastructure et déploiement
. *Concepts transversaux* - Réglementations et approches globales
. *Décisions d'architecture* - Décisions importantes (ADR)
. *Critères de qualité* - Arbre de qualité et scénarios
. *Risques et dettes techniques* - Problèmes et risques connus
. *Glossaire* - Termes importants

== Pour commencer

. Commencez par la Section 1 : Introduction et Objectifs
. Travaillez les sections de manière itérative
. Utilisez des diagrammes pour illustrer les concepts
. Concentrez-vous sur les décisions, pas sur les détails d'implémentation

== Génération de la documentation

Utilisez les outils MCP pour :

* Vérifier le statut : \`arc42-status\`
* Générer des modèles : \`generate-template\`
* Mettre à jour les sections : \`update-section\`

== Ressources

* link:https://arc42.org/[Site web arc42]
* link:https://docs.arc42.org/[Documentation arc42]
* link:https://arc42.org/examples[Exemples arc42]
`;
}
