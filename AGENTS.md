# Agilis AI - Guide pour Agents IA

## Stack
- **Frontend:** Next.js 16 + shadcn/ui + Tailwind CSS
- **Backend:** NestJS 11 + Prisma ORM
- **Database:** PostgreSQL
- **Queue:** BullMQ + Redis
- **Payment:** Stripe
- **Monorepo:** Turborepo + pnpm

## Structure du Projet
```
Agilis-ai/
├── frontend/          # Next.js App Router
├── backend/           # NestJS API
│   ├── prisma/        # Schéma DB
│   └── src/
│       ├── auth/
│       ├── users/
│       ├── organizations/
│       ├── agents/
│       ├── tasks/
│       ├── payments/
│       └── common/
├── packages/shared/   # Types partagés
└── docs/
    └── CAHIER_DES_CHARGES.md  # Spec complète
```

## Commandes
- `pnpm dev` - Lancer tout le projet
- `pnpm build` - Build production
- `cd backend && npx prisma migrate dev` - Migration DB
- `cd backend && npx prisma studio` - Explorer DB

## Règles
- TypeScript strict
- NestJS modular (modules, controllers, services)
- Prisma pour toutes les requêtes DB
- shadcn/ui pour tous les composants
- Stripe pour les paiements
- BullMQ pour les tâches background
- Ne pas exposer les clés API côté client
- Toujours valider les inputs avec class-validator

Voir `docs/CAHIER_DES_CHARGES.md` pour les specs détaillées.
