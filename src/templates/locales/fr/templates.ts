/**
 * French Templates
 *
 * Contains all arc42 section templates in French.
 * Based on the official arc42 French template from vendor/arc42-template/FR/.
 *
 * @module templates/locales/fr/templates
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the French template for a specific section
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
  return `# 1. Introduction et Objectifs

## Aperçu des spécifications

**Objectif**: Décrit les spécifications importantes et les facteurs déterminants que les architectes logiciels et l'équipe de développement doivent prendre en compte.

### Spécifications essentielles

<!-- Listez les 3 à 5 principales exigences fonctionnelles -->

| ID | Exigence | Priorité |
|----|----------|----------|
| EXI-1 | [Brève description] | Haute |
| EXI-2 | [Brève description] | Moyenne |

### Fonctionnalités

<!-- Fonctionnalités essentielles du système -->

- Fonctionnalité 1 : [Description]
- Fonctionnalité 2 : [Description]

## Objectifs de Qualité

**Objectif**: Les trois à cinq principaux objectifs de qualité pour l'architecture dont la réalisation est de la plus haute importance pour les principales parties prenantes.

<!-- Basé sur ISO 25010, priorisez les qualités telles que : -->
<!-- Performance, Sécurité, Fiabilité, Maintenabilité, Utilisabilité, etc. -->

| Priorité | Objectif de Qualité | Motivation |
|----------|---------------------|------------|
| 1 | [ex. Performance] | [Pourquoi c'est critique] |
| 2 | [ex. Sécurité] | [Pourquoi c'est critique] |
| 3 | [ex. Maintenabilité] | [Pourquoi c'est critique] |

## Parties prenantes

**Objectif**: Aperçu explicite des parties prenantes du système.

| Rôle/Nom | Contact | Attentes |
|----------|---------|----------|
| Product Owner | [Nom/Email] | [Attentes vis-à-vis de l'architecture] |
| Équipe de développement | [Nom de l'équipe] | [Ce qu'ils doivent savoir] |
| Opérations | [Équipe/Personne] | [Préoccupations de déploiement et d'exploitation] |
| Utilisateurs finaux | [Type] | [Attentes d'expérience utilisateur] |

## Critères de succès

<!-- Qu'est-ce qui définit le succès de ce système ? -->

- [ ] Critère 1
- [ ] Critère 2
- [ ] Critère 3
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `# 2. Contraintes Architecturales

## Contraintes Techniques

**Contraintes Matérielles**

| Contrainte | Contexte/Motivation |
|------------|---------------------|
| [ex. Plateforme cloud] | [Pourquoi cette contrainte existe] |

**Contraintes Logicielles/Technologiques**

| Contrainte | Contexte/Motivation |
|------------|---------------------|
| [ex. Java 17+ requis] | [Raison de la contrainte] |
| [ex. PostgreSQL requis] | [Pourquoi cela a été choisi] |

**Directives de Programmation**

- Langage de programmation : [Langage]
- Framework : [Framework et version]
- Bibliothèques : [Bibliothèques obligatoires ou interdites]

## Contraintes Organisationnelles

**Organisation et Structure**

| Contrainte | Contexte/Motivation |
|------------|---------------------|
| [ex. Structure d'équipe] | [Comment cela impacte l'architecture] |
| [ex. Méthodologie Agile] | [Impact sur le processus de développement] |

**Ressources**

- Budget : [Limitations budgétaires]
- Délais : [Contraintes temporelles]
- Équipe : [Taille et compétences de l'équipe]

## Conventions

**Conventions d'Architecture et de Conception**

- [ex. Pattern d'architecture microservices]
- [ex. Conception d'API RESTful]
- [ex. Domain-Driven Design]

**Conventions de Code**

- Style de code : [Lien vers le guide de style]
- Documentation : [Standards de documentation]
- Tests : [Exigences de tests]

**Exigences de Conformité**

- [ex. Conformité RGPD]
- [ex. Réglementations spécifiques au secteur]
- [ex. Standards d'accessibilité]
`;
}

function getContextAndScopeTemplate(): string {
  return `# 3. Portée et Contexte

## Contexte Métier

**Objectif**: Montre l'environnement métier du système et les dépendances externes clés.

### Diagramme de Contexte

\`\`\`
[Créez un diagramme montrant votre système et les systèmes/utilisateurs externes]
Vous pouvez utiliser :
- Diagrammes Mermaid
- PlantUML
- ASCII art
- Ou référencer une image dans /images/
\`\`\`

### Interfaces Externes

| Système Externe | Interface | Objectif |
|-----------------|-----------|----------|
| [Système externe 1] | [API/Protocole] | [Quelles données/fonctions sont échangées] |
| [Type d'utilisateur 1] | [UI/API] | [Comment les utilisateurs interagissent] |

### Processus Métier Supportés

<!-- Quels processus métier ce système supporte-t-il ? -->

1. **Processus 1** : [Description]
   - Acteurs : [Qui est impliqué]
   - Flux : [Flux de haut niveau]

2. **Processus 2** : [Description]

## Contexte Technique

**Objectif**: Montre les interfaces techniques et les canaux entre le système et son environnement.

### Interfaces Techniques

| Interface | Technologie | Protocole | Format |
|-----------|-------------|-----------|--------|
| [API 1] | [API REST] | [HTTPS] | [JSON] |
| [Base de données] | [PostgreSQL] | [TCP/IP] | [SQL] |

### Canaux et Transmission

| Canal | Technologie | Description |
|-------|-------------|-------------|
| [File de messages] | [RabbitMQ] | [Communication asynchrone entre services] |

### Mapping : Métier vers Technique

| Contexte Métier | Réalisation Technique |
|-----------------|----------------------|
| [Interface utilisateur] | [SPA React via HTTPS] |
| [Système externe A] | [API REST via HTTPS] |
`;
}

function getSolutionStrategyTemplate(): string {
  return `# 4. Stratégie de Solution

**Objectif**: Résume les décisions fondamentales et les stratégies de solution qui façonnent l'architecture du système.

## Décisions de Solution Clés

### Patterns d'Architecture

| Pattern | Motivation | Conséquences |
|---------|------------|--------------|
| [ex. Microservices] | [Pourquoi ce pattern a été choisi] | [Avantages et compromis] |

### Décisions Technologiques

| Composant | Technologie | Raison |
|-----------|-------------|--------|
| Backend | [ex. Node.js] | [Pourquoi cela a été choisi] |
| Frontend | [ex. React] | [Raisons] |
| Base de données | [ex. PostgreSQL] | [Raisons] |

### Décomposition de Haut Niveau

<!-- Comment le système est-il structuré au plus haut niveau ? -->

\`\`\`
[Diagramme de composants de haut niveau]
\`\`\`

Description :
- Composant 1 : [Objectif et responsabilité]
- Composant 2 : [Objectif et responsabilité]

## Atteinte des Objectifs de Qualité

### Mapping : Objectifs de Qualité vers Approches de Solution

| Objectif de Qualité | Approche de Solution |
|---------------------|---------------------|
| [Performance] | [Stratégie de cache, traitement asynchrone, CDN] |
| [Sécurité] | [Authentification, autorisation, chiffrement] |
| [Scalabilité] | [Scalabilité horizontale, équilibrage de charge] |

### Décisions de Conception Clés

1. **Décision 1** : [ex. Architecture événementielle]
   - Raison : [Pourquoi cette approche]
   - Impact : [Comment cela aide à atteindre les objectifs de qualité]

2. **Décision 2** : [Description]
   - Raison : [Justification]
   - Impact : [Impact sur les objectifs de qualité]

## Stratégie de Développement

- Approche de développement : [Agile, Scrum, etc.]
- Stratégie de déploiement : [CI/CD, Blue-Green, etc.]
- Stratégie de test : [Unitaire, Intégration, E2E]
`;
}

function getBuildingBlockViewTemplate(): string {
  return `# 5. Vue des Blocs de Construction

**Objectif**: Décomposition statique du système en blocs de construction et leurs relations.

## Niveau 1 : Contexte du Système

### Boîte Blanche : Système Global

**Objectif** : [Ce que fait le système]

\`\`\`
[Diagramme de composants avec les principaux blocs de construction]
\`\`\`

**Blocs de Construction Contenus** :

| Composant | Responsabilité |
|-----------|----------------|
| [Composant 1] | [Ce qu'il fait] |
| [Composant 2] | [Ce qu'il fait] |

**Interfaces Importantes** :

| Interface | Description |
|-----------|-------------|
| [API 1] | [Objectif et protocole] |

## Niveau 2 : Détails des Composants

### Composant 1 (Boîte Blanche)

**Objectif** : [Objectif détaillé]

**Interfaces** :
- Entrée : [Ce qu'il reçoit]
- Sortie : [Ce qu'il produit]

**Structure Interne** :

\`\`\`
[Diagramme des modules/classes internes]
\`\`\`

**Éléments Contenus** :

| Élément | Responsabilité |
|---------|----------------|
| [Module A] | [Objectif] |
| [Module B] | [Objectif] |

### Composant 2 (Boîte Blanche)

[Structure similaire]

## Niveau 3 : Vues Détaillées

<!-- N'inclure le niveau 3 que pour les composants nécessitant des détails supplémentaires -->

### Détails du Module A

[Diagrammes de classes détaillés, structure de packages, etc.]
`;
}

function getRuntimeViewTemplate(): string {
  return `# 6. Vue d'Exécution

**Objectif**: Montre le comportement et l'interaction des blocs de construction à l'exécution.

## Scénarios Importants

### Scénario 1 : [Nom, ex. "Connexion Utilisateur"]

**Description** : [Ce qui se passe dans ce scénario]

**Diagramme de Séquence** :

\`\`\`mermaid
sequenceDiagram
    participant Utilisateur
    participant Frontend
    participant API
    participant BaseDeDonnees

    Utilisateur->>Frontend: Saisir les identifiants
    Frontend->>API: POST /login
    API->>BaseDeDonnees: Valider les identifiants
    BaseDeDonnees-->>API: Données utilisateur
    API-->>Frontend: Token JWT
    Frontend-->>Utilisateur: Connexion réussie
\`\`\`

**Étapes** :

1. L'utilisateur saisit ses identifiants
2. Le frontend envoie la requête de connexion
3. L'API valide avec la base de données
4. Le token est généré et retourné
5. L'utilisateur est authentifié

### Scénario 2 : [Nom]

[Structure similaire]

## Flux de Données

### Flux 1 : [Nom]

**Objectif** : [Quelles données circulent où]

**Diagramme** :

\`\`\`
[Diagramme de flux de données]
\`\`\`

**Description** :
- Étape 1 : [Ce qui se passe]
- Étape 2 : [Ce qui se passe]

## Machines à États

### Machine à États pour [Entité]

**États** :
- État 1 : [Description]
- État 2 : [Description]

**Transitions** :

| De | Événement | Vers | Action |
|----|-----------|------|--------|
| [État 1] | [Événement] | [État 2] | [Ce qui se passe] |
`;
}

function getDeploymentViewTemplate(): string {
  return `# 7. Vue de Déploiement

**Objectif**: Décrit l'infrastructure technique et comment le logiciel est distribué.

## Aperçu de l'Infrastructure

### Diagramme de Déploiement

\`\`\`
[Diagramme montrant les serveurs, conteneurs, réseaux]
\`\`\`

## Environnements

### Environnement de Production

**Infrastructure** :

| Composant | Technologie | Configuration |
|-----------|-------------|---------------|
| [Serveur d'application] | [AWS ECS] | [Spécifications] |
| [Base de données] | [RDS PostgreSQL] | [Spécifications] |
| [Cache] | [Redis] | [Spécifications] |

**Réseau** :
- VPC : [Configuration]
- Sous-réseaux : [Configuration Public/Privé]
- Groupes de sécurité : [Règles]

### Environnement de Staging

[Structure similaire]

### Environnement de Développement

[Structure similaire]

## Stratégie de Déploiement

### Pipeline CI/CD

1. **Build** : [Ce qui se passe]
2. **Test** : [Tests automatisés]
3. **Déploiement** : [Processus de déploiement]

### Stratégie de Rollback

[Comment les déploiements sont annulés]

## Stratégie de Scalabilité

### Scalabilité Horizontale

| Composant | Déclencheur de Scaling | Instances Max |
|-----------|------------------------|---------------|
| [Serveur API] | [CPU > 70%] | [10] |

### Scalabilité Verticale

[Quand et comment scaler verticalement]

## Monitoring et Opérations

### Health Checks

| Composant | Vérification | Seuil |
|-----------|--------------|-------|
| [API] | [Endpoint /health] | [Temps de réponse < 1s] |

### Logging

- Agrégation de logs : [ELK, CloudWatch, etc.]
- Rétention des logs : [Politique]

### Métriques

- Métriques clés : [CPU, mémoire, taux de requêtes]
- Alertes : [Conditions d'alerte]
`;
}

function getConceptsTemplate(): string {
  return `# 8. Concepts Transversaux

**Objectif**: Règles et idées de solution transversales pertinentes dans plusieurs parties du système.

## Modèles de Domaine

### Concepts de Domaine Clés

\`\`\`
[Diagramme de modèle de domaine ou diagramme de classes]
\`\`\`

**Entités Importantes** :

| Entité | Responsabilité | Relations |
|--------|----------------|-----------|
| [Entité 1] | [Objectif] | [Entités liées] |

## Sécurité

### Authentification

- Méthode : [JWT, OAuth2, etc.]
- Implémentation : [Comment ça fonctionne]

### Autorisation

- Modèle : [RBAC, ABAC, etc.]
- Rôles : [Liste des rôles et permissions]

### Protection des Données

- Chiffrement au repos : [Comment]
- Chiffrement en transit : [Version TLS]
- Gestion des données sensibles : [Approche]

## Gestion des Erreurs

### Catégories d'Erreurs

| Catégorie | Stratégie de Gestion |
|-----------|---------------------|
| [Erreurs de validation] | [Retourner 400 avec détails] |
| [Erreurs système] | [Logger et retourner 500] |

### Format de Réponse d'Erreur

\`\`\`json
{
  "error": {
    "code": "CODE_ERREUR",
    "message": "Message lisible",
    "details": {}
  }
}
\`\`\`

## Logging et Monitoring

### Stratégie de Logging

- Niveaux de log : [DEBUG, INFO, WARN, ERROR]
- Logging structuré : [Format JSON]
- IDs de corrélation : [Pour le traçage des requêtes]

### Monitoring

- APM : [Outil de monitoring de performance applicative]
- Métriques : [Métriques métier et techniques clés]

## Gestion de Configuration

### Sources de Configuration

1. Variables d'environnement
2. Fichiers de configuration
3. Gestion des secrets : [Vault, AWS Secrets Manager]

### Configuration par Environnement

| Paramètre | Dev | Staging | Prod |
|-----------|-----|---------|------|
| [Niveau de log] | [DEBUG] | [INFO] | [WARN] |

## Stratégie de Test

### Niveaux de Test

| Niveau | Couverture | Outils |
|--------|------------|--------|
| Tests unitaires | [% cible] | [Framework] |
| Tests d'intégration | [Portée] | [Outils] |
| Tests E2E | [Flux clés] | [Outils] |

### Gestion des Données de Test

[Comment les données de test sont créées et gérées]

## Concepts de Développement

### Organisation du Code

- Structure des packages : [Approche]
- Conventions de nommage : [Standards]

### Build et Gestion des Dépendances

- Outil de build : [Maven, Gradle, npm, etc.]
- Gestion des dépendances : [Stratégie]

## Concepts d'Exploitation

### Sauvegarde et Récupération

- Fréquence de sauvegarde : [Quotidienne, horaire, etc.]
- Rétention : [Politique]
- Procédure de récupération : [Étapes]

### Reprise après Sinistre

- RTO : [Recovery Time Objective]
- RPO : [Recovery Point Objective]
- Stratégie DR : [Approche]
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `# 9. Décisions d'Architecture

**Objectif**: Documente les décisions d'architecture importantes, coûteuses, critiques ou risquées avec leur justification.

## Format ADR

Chaque décision suit cette structure :
- **Contexte** : Quel est le problème que nous adressons ?
- **Décision** : Ce que nous avons décidé de faire
- **Conséquences** : Ce qui devient plus facile ou plus difficile

## Journal des Décisions

### ADR-001 : [Titre de la Décision]

**Date** : [AAAA-MM-JJ]
**Statut** : [Proposé | Accepté | Obsolète | Remplacé]
**Décideurs** : [Noms]

**Contexte** :

[Décrivez les forces en présence, techniques, politiques, sociales et spécifiques au projet. Ces forces sont probablement en tension et doivent être nommées comme telles.]

**Décision** :

[Décrivez notre réponse à ces forces. C'est ici que nous prenons notre décision.]

**Conséquences** :

Positives :
- [Avantage 1]
- [Avantage 2]

Négatives :
- [Compromis 1]
- [Compromis 2]

Risques :
- [Risque 1 et atténuation]

### ADR-002 : [Autre Décision]

[Structure similaire]

## Catégories de Décisions

### Décisions Structurelles

| Décision | Justification | Date |
|----------|---------------|------|
| [Microservices vs Monolithe] | [Pourquoi choisi] | [Date] |

### Décisions Technologiques

| Composant | Technologie | Alternatives Considérées | Pourquoi Choisi |
|-----------|-------------|--------------------------|-----------------|
| [Backend] | [Node.js] | [Python, Java] | [Raisons] |

### Décisions de Processus

| Décision | Impact | Date |
|----------|--------|------|
| [Méthodologie Agile] | [Comment cela influence l'architecture] | [Date] |

## Décisions Obsolètes

| Décision | Date d'Obsolescence | Raison | Remplacé Par |
|----------|---------------------|--------|--------------|
| [Ancienne décision] | [Date] | [Pourquoi obsolète] | [ADR-XXX] |
`;
}

function getQualityRequirementsTemplate(): string {
  return `# 10. Exigences de Qualité

**Objectif**: Définit les exigences de qualité avec des scénarios concrets.

## Arbre de Qualité

### Objectifs de Qualité de Haut Niveau

\`\`\`
Qualité
├── Performance
│   ├── Temps de réponse
│   └── Débit
├── Sécurité
│   ├── Authentification
│   └── Protection des données
├── Fiabilité
│   ├── Disponibilité
│   └── Tolérance aux pannes
└── Maintenabilité
    ├── Testabilité
    └── Modifiabilité
\`\`\`

## Scénarios de Qualité

### Scénarios de Performance

**Scénario 1 : Temps de Réponse en Charge Normale**

| Aspect | Description |
|--------|-------------|
| Scénario | L'utilisateur interroge des données en charge normale |
| Source | Utilisateur final |
| Stimulus | Requête HTTP vers l'API |
| Environnement | Fonctionnement normal, 100 utilisateurs simultanés |
| Réponse | Le système retourne les données |
| Mesure | 95e percentile temps de réponse < 200ms |

**Scénario 2 : Gestion de la Charge de Pointe**

| Aspect | Description |
|--------|-------------|
| Scénario | Système sous charge de pointe |
| Source | Plusieurs utilisateurs |
| Stimulus | 1000 requêtes simultanées |
| Environnement | Heures de pointe |
| Réponse | Le système traite toutes les requêtes |
| Mesure | Aucune requête n'échoue, temps de réponse < 1s |

### Scénarios de Sécurité

**Scénario 3 : Tentative d'Accès Non Autorisé**

| Aspect | Description |
|--------|-------------|
| Scénario | Un utilisateur non autorisé tente d'accéder à une ressource protégée |
| Source | Attaquant externe |
| Stimulus | Requête HTTP sans token valide |
| Environnement | Fonctionnement normal |
| Réponse | Le système refuse l'accès |
| Mesure | Retourne 401, enregistre la tentative, aucune donnée exposée |

### Scénarios de Fiabilité

**Scénario 4 : Récupération après Panne de Service**

| Aspect | Description |
|--------|-------------|
| Scénario | La connexion à la base de données échoue |
| Source | Panne d'infrastructure |
| Stimulus | La base de données devient indisponible |
| Environnement | Fonctionnement normal |
| Réponse | Le système continue avec les données en cache |
| Mesure | Dégradation du service < 5%, récupération < 30s |

### Scénarios de Maintenabilité

**Scénario 5 : Ajout d'une Nouvelle Fonctionnalité**

| Aspect | Description |
|--------|-------------|
| Scénario | Un développeur ajoute un nouvel endpoint API |
| Source | Équipe de développement |
| Stimulus | Nouvelle exigence |
| Environnement | Développement |
| Réponse | La fonctionnalité est ajoutée |
| Mesure | < 2 jours, < 5 fichiers modifiés, tests réussis |

## Priorisation des Exigences de Qualité

| Attribut de Qualité | Priorité | Mesure Cible |
|---------------------|----------|--------------|
| Disponibilité | Haute | 99,9% uptime |
| Temps de réponse | Haute | < 200ms (p95) |
| Sécurité | Critique | Zéro violation de données |
| Maintenabilité | Moyenne | Couverture de tests > 80% |
| Utilisabilité | Moyenne | Taux de succès des tâches utilisateur > 95% |
`;
}

function getTechnicalRisksTemplate(): string {
  return `# 11. Risques et Dette Technique

**Objectif**: Documente les problèmes connus, les risques et la dette technique.

## Risques

### Matrice d'Évaluation des Risques

| Risque | Probabilité | Impact | Sévérité | Statut |
|--------|-------------|--------|----------|--------|
| [Risque 1] | [Haute/Moyenne/Basse] | [Haute/Moyenne/Basse] | [Critique/Haute/Moyenne/Basse] | [Ouvert/Atténué] |

### Risques Détaillés

**Risque 1 : [Titre du Risque]**

- **Description** : [Quel est le risque]
- **Probabilité** : [Haute/Moyenne/Basse]
- **Impact** : [Haute/Moyenne/Basse - et ce qui se passe]
- **Atténuation** : [Ce que nous faisons à ce sujet]
- **Plan de contingence** : [Plan si le risque survient]
- **Responsable** : [Qui est responsable]
- **Statut** : [Ouvert/En cours d'atténuation/Fermé]

**Risque 2 : [Titre]**

[Structure similaire]

## Dette Technique

### Entrées de Dette

| Entrée | Type | Impact | Effort | Priorité |
|--------|------|--------|--------|----------|
| [Dette 1] | [Code/Architecture/Test] | [Haute/Moyenne/Basse] | [Jours] | [1-5] |

### Entrées de Dette Détaillées

**Dette 1 : [Titre]**

- **Description** : [Ce qui doit être corrigé]
- **Pourquoi elle existe** : [Comment c'est arrivé]
- **Impact** : [Quels problèmes cela cause]
- **Solution proposée** : [Comment le corriger]
- **Estimation de l'effort** : [Temps nécessaire]
- **Priorité** : [Quand devons-nous le corriger]

### Plan de Remboursement de la Dette

| Trimestre | Dette à Traiter | Impact Attendu |
|-----------|-----------------|----------------|
| T1 2024 | [Entrées 1, 2] | [Amélioration de X] |

## Problèmes Connus

### Problèmes Ouverts

| Problème | Sévérité | Solution de Contournement | Date de Correction Cible |
|----------|----------|---------------------------|--------------------------|
| [Problème 1] | [Haute/Moyenne/Basse] | [Si disponible] | [Date] |

### Limitations

| Limitation | Impact | Justification | Plans Futurs |
|------------|--------|---------------|--------------|
| [Limitation 1] | [Effet] | [Pourquoi elle existe] | [Quand/si à traiter] |

## Vulnérabilités de Sécurité

### Vulnérabilités Connues

| CVE | Composant | Sévérité | Statut | Atténuation |
|-----|-----------|----------|--------|-------------|
| [CVE-ID] | [Bibliothèque] | [Critique/Haute/Moyenne] | [Ouvert/Corrigé] | [Actions prises] |

## Problèmes de Performance

| Problème | Impact | Solution de Contournement | Plan de Correction |
|----------|--------|---------------------------|-------------------|
| [Problème] | [Impact utilisateur] | [Solution temporaire] | [Solution permanente] |
`;
}

function getGlossaryTemplate(): string {
  return `# 12. Glossaire

**Objectif**: Définit les termes métier et techniques importants pour assurer une terminologie cohérente.

## Termes Métier

| Terme | Définition |
|-------|------------|
| [Terme métier 1] | [Définition claire et précise] |
| [Terme métier 2] | [Définition] |

## Termes Techniques

| Terme | Définition | Synonymes |
|-------|------------|-----------|
| [Terme technique 1] | [Définition] | [Noms alternatifs] |
| [Terme technique 2] | [Définition] | [Noms alternatifs] |

## Abréviations et Acronymes

| Abréviation | Nom Complet | Contexte |
|-------------|-------------|----------|
| API | Application Programming Interface | [Quand/où utilisé] |
| SLA | Service Level Agreement | [Contexte] |
| JWT | JSON Web Token | [Utilisation] |

## Concepts Métier

| Concept | Description | Termes Liés |
|---------|-------------|-------------|
| [Concept 1] | [Explication détaillée] | [Concepts liés] |

## Termes Spécifiques au Système

| Terme | Définition | Exemple |
|-------|------------|---------|
| [Terme système 1] | [Ce que cela signifie dans ce système] | [Exemple d'utilisation] |

## Termes Obsolètes

| Ancien Terme | Remplacé Par | Raison |
|--------------|--------------|--------|
| [Ancien terme] | [Nouveau terme] | [Pourquoi changé] |

---

**Note** : Gardez ce glossaire à jour à mesure que de nouveaux termes apparaissent. Faites des liens vers cette section depuis d'autres parties de la documentation lorsque ces termes sont utilisés.
`;
}

/**
 * Get the French workflow guide
 */
export function getWorkflowGuide(): string {
  return `# Guide du Workflow de Documentation d'Architecture arc42

## Aperçu

Ce guide vous aide à documenter votre architecture logicielle en utilisant le template arc42. Le template arc42 est un modèle pratique et éprouvé pour documenter les architectures logicielles et systèmes.

## Langues Disponibles

Ce serveur MCP arc42 supporte plusieurs langues pour la documentation :

| Code | Langue | Nom Natif |
|------|--------|-----------|
| EN | Anglais | English |
| DE | Allemand | Deutsch |
| CZ | Tchèque | Čeština |
| ES | Espagnol | Español |
| FR | Français | Français |
| IT | Italien | Italiano |
| NL | Néerlandais | Nederlands |
| PT | Portugais | Português |
| RU | Russe | Русский |
| UKR | Ukrainien | Українська |
| ZH | Chinois | 中文 |

## Pour Commencer

### Étape 1 : Initialiser l'Espace de Travail

Utilisez l'outil \`arc42-init\` pour créer votre espace de documentation :

\`\`\`
arc42-init(projectName: "Mon Projet", language: "FR")
\`\`\`

Vous pouvez spécifier une langue différente avec le code de langue ISO.

### Étape 2 : Vérifier le Statut

Utilisez \`arc42-status\` pour voir l'état actuel de votre documentation :

\`\`\`
arc42-status()
\`\`\`

### Étape 3 : Générer les Templates de Section

Utilisez \`generate-template\` pour obtenir des templates détaillés pour chaque section :

\`\`\`
generate-template(section: "01_introduction_and_goals", language: "FR")
\`\`\`

## Les 12 Sections arc42

1. **Introduction et Objectifs** - Commencez ici ! Définissez ce que vous construisez et pourquoi.
2. **Contraintes Architecturales** - Qu'est-ce que vous ne pouvez PAS faire ?
3. **Portée et Contexte** - Qu'est-ce qui est dedans et qu'est-ce qui est dehors ?
4. **Stratégie de Solution** - Approche de haut niveau pour résoudre le problème.
5. **Vue des Blocs de Construction** - Structure statique de votre système.
6. **Vue d'Exécution** - Comportement dynamique et scénarios.
7. **Vue de Déploiement** - Comment c'est déployé et opéré ?
8. **Concepts Transversaux** - Patterns utilisés dans tout le système.
9. **Décisions d'Architecture** - Décisions importantes et leur justification.
10. **Exigences de Qualité** - Scénarios de qualité concrets.
11. **Risques et Dette Technique** - Qu'est-ce qui pourrait mal tourner ?
12. **Glossaire** - Définissez vos termes.

## Bonnes Pratiques

1. **Commencez par la Section 1** - Comprendre les objectifs est fondamental
2. **Restez concis** - arc42 est pragmatique, pas bureaucratique
3. **Utilisez des diagrammes** - Une image vaut mille mots
4. **Documentez les décisions** - Votre futur vous vous remerciera
5. **Itérez** - La documentation d'architecture n'est jamais "terminée"

## Outils Disponibles

- \`arc42-init\` - Initialiser l'espace de documentation
- \`arc42-status\` - Vérifier le statut de la documentation
- \`generate-template\` - Générer les templates de section
- \`update-section\` - Mettre à jour le contenu des sections
- \`get-section\` - Lire le contenu des sections
- \`arc42-workflow-guide\` - Afficher ce guide

## Ressources

- [Site Web arc42](https://arc42.org/)
- [Documentation arc42](https://docs.arc42.org/)
- [Exemples arc42](https://arc42.org/examples)
`;
}

/**
 * Get the French README content
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || 'Projet';
  return `# ${name} - Documentation d'Architecture

Ce répertoire contient la documentation d'architecture pour ${name}, basée sur le template arc42.

## Structure

- \`sections/\` - Fichiers markdown des sections individuelles (12 sections)
- \`images/\` - Diagrammes et images
- \`arc42-template.md\` - Documentation principale combinée
- \`config.yaml\` - Configuration

## Les 12 Sections arc42

1. **Introduction et Objectifs** - Spécifications, objectifs de qualité, parties prenantes
2. **Contraintes Architecturales** - Contraintes techniques et organisationnelles
3. **Portée et Contexte** - Contexte métier et technique
4. **Stratégie de Solution** - Décisions et stratégies fondamentales
5. **Vue des Blocs de Construction** - Décomposition statique
6. **Vue d'Exécution** - Comportement dynamique
7. **Vue de Déploiement** - Infrastructure et déploiement
8. **Concepts Transversaux** - Règles et approches transversales
9. **Décisions d'Architecture** - Décisions importantes (ADRs)
10. **Exigences de Qualité** - Arbre de qualité et scénarios
11. **Risques et Dette Technique** - Problèmes connus et risques
12. **Glossaire** - Termes importants

## Pour Commencer

1. Commencez par la Section 1 : Introduction et Objectifs
2. Parcourez les sections de manière itérative
3. Utilisez des diagrammes pour illustrer les concepts
4. Concentrez-vous sur les décisions, pas sur les détails d'implémentation

## Générer la Documentation

Utilisez les outils MCP pour :
- Vérifier le statut : \`arc42-status\`
- Générer les templates : \`generate-template\`
- Mettre à jour les sections : \`update-section\`

## Ressources

- [Site Web arc42](https://arc42.org/)
- [Documentation arc42](https://docs.arc42.org/)
- [Exemples arc42](https://arc42.org/examples)
`;
}
