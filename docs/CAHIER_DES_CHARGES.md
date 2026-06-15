# Cahier des Charges - Agilis AI

## Plateforme SaaS Agentic B2B

---

## 1. Présentation du Projet

### 1.1 Vision

**Agilis AI** est une plateforme SaaS B2B qui permet aux entreprises de déléguer des tâches métier à des **agents IA spécialisés** qui travaillent en autonomie 24/7, même lorsque l'utilisateur est déconnecté.

### 1.2 Objectifs

- Créer des agents IA spécialisés par métier (Marketing, Finance, RH, etc.)
- Exécution asynchrone en arrière-plan (jobs queue)
- Facturation basée sur l'usage ou abonnement mensuel
- Interface web intuitive pour configurer, lancer et suivre les tâches
- Multi-tenant (B2B) avec espaces de travail par entreprise

### 1.3 Public Cible

- PME/TPE : 5-50 employés, besoin d'automatisation sans embaucher
- Agences : marketing, communication, gestion de contenu
- Startups : équipes réduites, besoin de scaling rapide

---

## 2. Stack Technique

### 2.1 Architecture Globale

```
┌──────────────────────────────────────────────────────┐
│                     Frontend                          │
│              Next.js 16 + shadcn/ui                   │
│              App Router, Server Actions               │
├──────────────────────────────────────────────────────┤
│                     Backend API                        │
│              NestJS + Prisma ORM                      │
│              REST API / WebSocket                      │
├──────────────────────────────────────────────────────┤
│                   Background Workers                   │
│              BullMQ + Redis                            │
│              Exécution agents asynchrone               │
├──────────────────────────────────────────────────────┤
│                    Base de Données                     │
│              PostgreSQL (Supabase / RDS)               │
│              Redis (Cache + Queue)                     │
└──────────────────────────────────────────────────────┘
```

### 2.2 Détail des Technologies

| Couche | Technologie | Version | Justification |
|--------|-------------|---------|---------------|
| Frontend | Next.js | 16 | SSR, App Router, Server Actions, SEO |
| UI | shadcn/ui + Tailwind CSS | 4 | Composants accessibles, customisable |
| Backend | NestJS | 11 | Architecture modulaire, DI, Guards |
| ORM | Prisma | 6 | Type-safe, migrations, DX |
| Base de données | PostgreSQL | 16 | Robuste, performant, JSON support |
| Queue | BullMQ + Redis | 4+ | Jobs background, retry, scheduling |
| Paiement | Stripe | 17 | Checkout, webhooks, abonnements |
| Auth | NextAuth.js + NestJS JWT | - | Session frontend, JWT backend |
| Hébergement | Railway / Docker VPS | - | Scaling simple |
| Monorepo | Turborepo | 2 | Partage de code, builds optimisés |
| Langage | TypeScript | 5.9 | Full-stack type-safe |
| Package Manager | pnpm | 10 | Performant, workspaces |

---

## 3. Modules et Fonctionnalités

### 3.1 Module Authentification

- Inscription / Connexion (email + mot de passe)
- Google OAuth (optionnel)
- Gestion de profil
- Reset de mot de passe
- Rôles : Admin, Member, Viewer

### 3.2 Module Organisation (Workspace)

- Création d'organisation
- Invitation de membres par email
- Gestion des rôles au sein de l'organisation
- Quotas par abonnement (nombre d'agents, tâches/mois)

### 3.3 Module Agents

- **Catalogue d'agents prêts à l'emploi**
  - Agent Marketing : création de contenu, publications réseaux sociaux
  - Agent Finance : analyse financière, reporting, budget
  - (Futur) Agent RH, Agent Ventes, Agent Support
- Configuration de chaque agent (prompt, modèle, outils)
- Activation / désactivation

### 3.4 Module Tâches

- Création de tâche avec instructions
- Attribution à un agent spécifique
- Exécution en arrière-plan (BullMQ)
- Suivi en temps réel (statut, logs, étapes)
- Historique des résultats
- Annulation / reprise

### 3.5 Module Dashboard

- Vue d'ensemble de l'activité
- Statistiques : tâches exécutées, temps moyen, crédits consommés
- Graphiques d'utilisation
- Notifications en temps réel

### 3.6 Module Paiement (Stripe)

- Abonnements mensuels (Starter, Pro, Enterprise)
- Facturation basée sur le volume de tâches
- Portail client Stripe pour gérer le paiement
- Webhooks : subscription created, updated, canceled, invoice paid
- Période d'essai gratuite (14 jours)

### 3.7 Module Agent Marketing (Premier Agent)

**Capacités :**
- Rédaction d'articles de blog
- Création de posts LinkedIn / Twitter / Instagram
- Génération de newsletters
- Planification de contenu éditorial
- Analyse de tendances
- Gestion de marque (ton, voix, charte éditoriale)

**Outils intégrés :**
- Appel à l'API DeepSeek pour la génération
- Template de messages par plateforme
- Historique et versionning du contenu

---

## 4. Schéma de la Base de Données

### 4.1 Tables Principales

```prisma
enum Role {
  ADMIN
  MEMBER
  VIEWER
}

enum AgentType {
  MARKETING
  FINANCE
  CUSTOM
}

enum TaskStatus {
  PENDING
  QUEUED
  RUNNING
  COMPLETED
  FAILED
  CANCELLED
}

model Organization {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  logo      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  members      Member[]
  agents       Agent[]
  tasks        Task[]
  invitations  Invitation[]
  subscription Subscription?
}

model User {
  id                String   @id @default(uuid())
  email             String   @unique
  name              String?
  passwordHash      String
  image             String?
  emailVerified     Boolean  @default(false)
  stripeCustomerId  String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  members Member[]
  tasks   Task[]
}

model Member {
  id             String   @id @default(uuid())
  organizationId String
  userId         String
  role           Role     @default(MEMBER)
  createdAt      DateTime @default(now())

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([organizationId, userId])
}

model Invitation {
  id             String    @id @default(uuid())
  organizationId String
  email          String
  role           Role      @default(MEMBER)
  token          String    @unique
  acceptedAt     DateTime?
  expiresAt      DateTime
  createdAt      DateTime  @default(now())

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@unique([organizationId, email])
}

model Agent {
  id             String    @id @default(uuid())
  organizationId String
  name           String
  type           AgentType
  description    String?
  provider       String    @default("deepseek")
  model          String    @default("deepseek-chat")
  systemPrompt   String?
  tools          String[]
  config         Json?
  isActive       Boolean   @default(true)
  createdBy      String
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  createdByUser  User         @relation(fields: [createdBy], references: [id])
  tasks          Task[]
}

model Task {
  id             String     @id @default(uuid())
  organizationId String
  agentId        String
  userId         String
  title          String
  instructions   String
  status         TaskStatus @default(PENDING)
  input          Json?
  output         Json?
  error          String?
  logs           Json?
  startedAt      DateTime?
  completedAt    DateTime?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  agent        Agent        @relation(fields: [agentId], references: [id], onDelete: Cascade)
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Subscription {
  id                 String    @id @default(uuid())
  organizationId     String    @unique
  stripeSubId        String?   @unique
  stripePriceId      String?
  status             String    @default("inactive")
  plan               String    @default("starter")
  tasksIncluded      Int       @default(100)
  tasksUsed          Int       @default(0)
  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  trialEndsAt        DateTime?
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
}
```

---

## 5. Architecture API (NestJS)

### 5.1 Structure des Modules

```
backend/src/
├── main.ts
├── app.module.ts
├── common/
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   └── roles.decorator.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── dto/
│       └── pagination.dto.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── strategies/
│       └── jwt.strategy.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   └── users.service.ts
├── organizations/
│   ├── organizations.module.ts
│   ├── organizations.controller.ts
│   └── organizations.service.ts
├── agents/
│   ├── agents.module.ts
│   ├── agents.controller.ts
│   └── agents.service.ts
├── tasks/
│   ├── tasks.module.ts
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── processors/
│       └── task.processor.ts   (BullMQ Worker)
├── subscription/
│   ├── subscription.module.ts
│   ├── subscription.controller.ts
│   └── subscription.service.ts
├── payments/
│   ├── payments.module.ts
│   ├── payments.controller.ts
│   ├── payments.service.ts
│   └── webhooks/
│       └── stripe.webhook.ts
└── agents/
    └── marketing/
        ├── marketing-agent.service.ts
        └── prompts/
            ├── blog-post.prompt.ts
            ├── social-media.prompt.ts
            └── newsletter.prompt.ts
```

### 5.2 Endpoints Principaux

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
GET    /api/auth/me

GET    /api/organizations
POST   /api/organizations
GET    /api/organizations/:id
PATCH  /api/organizations/:id
POST   /api/organizations/:id/members
DELETE /api/organizations/:id/members/:memberId

GET    /api/agents
POST   /api/agents
GET    /api/agents/:id
PATCH  /api/agents/:id
DELETE /api/agents/:id

GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
DELETE /api/tasks/:id
POST   /api/tasks/:id/cancel

GET    /api/subscription
POST   /api/subscription/checkout
POST   /api/subscription/portal
POST   /api/webhooks/stripe

GET    /api/dashboard/stats
```

---

## 6. Architecture des Agents

### 6.1 Flux d'Exécution

```
1. Utilisateur crée une tâche
   ↓
2. NestJS reçoit la requête → validation
   ↓
3. Sauvegarde en DB (status: "pending")
   ↓
4. BullMQ ajoute un job dans la queue
   ↓
5. Worker NestJS récupère le job
   ↓
6. Met à jour status → "running"
   ↓
7. Appelle l'IA (DeepSeek / autre provider)
   ↓
8. Traite la réponse (génération, analyse, etc.)
   ↓
9. Sauvegarde le résultat en DB
   ↓
10. Met à jour status → "completed"
   ↓
11. Notification temps réel (WebSocket / SSE)
```

### 6.2 Agent Marketing - Détail

**Configuration par défaut :**
- Modèle : `deepseek-chat`
- Température : 0.7
- Max tokens : 4096

**Types de tâches supportées :**
1. `blog-post` : Rédaction d'article de blog complet
2. `social-post` : Post LinkedIn/Twitter/Instagram
3. `newsletter` : Newsletter email
4. `content-calendar` : Calendrier éditorial
5. `brand-guide` : Guide de ton et voix

**Structure d'une tâche Marketing :**
```typescript
interface MarketingTaskInput {
  type: 'blog-post' | 'social-post' | 'newsletter' | 'content-calendar' | 'brand-guide';
  topic: string;
  keywords?: string[];
  tone?: 'professional' | 'casual' | 'humorous' | 'formal';
  targetAudience?: string;
  platform?: 'linkedin' | 'twitter' | 'instagram' | 'blog' | 'email';
  wordCount?: number;
  brandVoice?: string;
  references?: string[];
}
```

---

## 7. Système de Paiement (Stripe)

### 7.1 Plans Tarifaires

| Plan | Prix | Tâches/mois | Agents | Membres |
|------|------|-------------|--------|---------|
| Gratuit | 0€ | 10 | 1 | 1 |
| Starter | 29€ | 100 | 3 | 3 |
| Pro | 99€ | 500 | 10 | 10 |
| Enterprise | Sur devis | Illimité | Illimité | Illimité |

### 7.2 Flux Stripe

```
1. Utilisateur clique "S'abonner"
   ↓
2. NestJS crée un Stripe Checkout Session
   ↓
3. Redirection vers Stripe Checkout
   ↓
4. Paiement confirmé → Redirect vers /dashboard
   ↓
5. Stripe Webhook → subscription.created
   ↓
6. NestJS met à jour la Subscription en DB
   ↓
7. Activation du compte
   ↓
8. Gestion via Stripe Customer Portal
```

### 7.3 Webhooks Stripe

```typescript
// Webhooks à implémenter
'customer.subscription.created'
'customer.subscription.updated'
'customer.subscription.deleted'
'invoice.payment_succeeded'
'invoice.payment_failed'
'checkout.session.completed'
```

---

## 8. UX / UI

### 8.1 Pages de l'Application

| Route | Page |
|-------|------|
| `/` | Landing page |
| `/login` | Connexion |
| `/register` | Inscription |
| `/dashboard` | Dashboard principal |
| `/agents` | Liste des agents |
| `/agents/new` | Configuration d'un agent |
| `/agents/:id` | Détail d'un agent |
| `/tasks` | Liste des tâches |
| `/tasks/:id` | Détail d'une tâche |
| `/settings` | Paramètres organisation |
| `/settings/billing` | Facturation |
| `/settings/members` | Gestion des membres |

### 8.2 Composants UI (shadcn/ui)

- Sidebar navigation
- Cards pour les agents/tasks
- Dialog/Sheet pour la configuration
- Table pour la liste des tâches
- Tabs pour les sections
- Badges pour les statuts
- Charts pour le dashboard
- Toast/Sonner pour les notifications
- Progress bar pour l'exécution

---

## 9. Sécurité

### 9.1 Mesures Implementées

- Hash des mots de passe (bcrypt)
- JWT avec refresh tokens
- Rate limiting (nestjs/throttler)
- Guards d'authentification et de rôles
- Validation des inputs (class-validator)
- CORS configuré
- HSTS, CSRF (si nécessaire)
- Stripe Webhooks signés
- API keys non exposées côté client

### 9.2 Données Sensibles

- Clés API des providers stockées en base chiffrée
- Stripe secret key en variable d'environnement
- Aucune donnée client envoyée à des tiers non autorisés

---

## 10. Déploiement

### 10.1 Infrastructure (Hetzner / Railway)

- Docker Compose pour le déploiement
- PostgreSQL : service managé ou Docker
- Redis : service managé ou Docker
- Backend NestJS : Node.js process
- Frontend Next.js : Node.js process
- Nginx : reverse proxy

### 10.2 CI/CD (GitHub Actions)

- Lint + Type check sur chaque PR
- Build et test automatisés
- Déploiement automatique sur merge main
- Migration Prisma automatique

---

## 11. Roadmap

### Phase 1 - MVP (3-4 mois)
- [x] Monorepo Turborepo + Next.js + NestJS
- [x] Prisma + PostgreSQL
- [ ] Authentification complète
- [ ] CRUD Agents + configuration
- [ ] CRUD Tâches + exécution background
- [ ] Agent Marketing (version basique)
- [ ] Stripe (abonnement simple)
- [ ] Dashboard basique
- [ ] Déploiement

### Phase 2 - Amélioration (2-3 mois)
- [ ] Agent Marketing (version complète)
- [ ] Gestion d'équipe / membres
- [ ] Notifications en temps réel (WebSocket)
- [ ] Statistiques avancées
- [ ] Templates d'agents prédéfinis
- [ ] Tests E2E

### Phase 3 - Scale (3-4 mois)
- [ ] Agent Finance
- [ ] Intégrations (Slack, Notion, Google Drive)
- [ ] API publique
- [ ] MCP Protocol support
- [ ] Webhooks sortants
- [ ] Marketplaces d'agents

---

## 12. Règles de Contribution

- Branche `main` protégée
- PR obligatoires pour toute modification
- Convention de nommage : `kebab-case` pour les fichiers
- Typescript strict mode
- ESLint + Prettier
- Tests unitaires pour les services
- Documentation des API avec JSDoc

---

*Document créé le 14 Juin 2026*
*Dernière mise à jour : 14 Juin 2026*
