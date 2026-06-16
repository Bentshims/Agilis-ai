import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-accent shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-4.5 text-accent-foreground"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">Agilis AI</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Fonctionnalités
            </Link>
            <Link href="#agents" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Agents
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Tarifs
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-accent/30"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative flex min-h-dvh items-center justify-center overflow-hidden pt-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-48 -top-48 h-[36rem] w-[36rem] rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute -bottom-48 -right-48 h-[36rem] w-[36rem] rounded-full bg-accent/3 blur-3xl" />
            <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent">
              <span className="flex size-2 rounded-full bg-accent animate-pulse" />
              Plateforme IA Agentic B2B
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              L&apos;intelligence artificielle
              <br />
              <span className="text-accent">au service de votre entreprise</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Créez des agents IA spécialisés qui travaillent 24/7 pour automatiser
              vos tâches métier. Marketing, Finance, Support — vos agents opèrent
              en continu, même quand vous êtes déconnecté.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-8 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-accent/30 active:scale-[0.98]"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="#features"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-8 text-sm font-medium text-foreground transition-all hover:bg-muted"
              >
                Voir les fonctionnalités
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border/40 pt-12 text-center">
              <div>
                <p className="text-3xl font-bold text-foreground">3+</p>
                <p className="mt-1 text-sm text-muted-foreground">Agents spécialisés</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">24/7</p>
                <p className="mt-1 text-sm text-muted-foreground">Exécution continue</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="mt-1 text-sm text-muted-foreground">Automatisé</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-border/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Tout ce dont vous avez besoin
              </h2>
              <p className="mt-4 text-muted-foreground">
                Une plateforme complète pour déployer et gérer vos agents IA.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Agents spécialisés",
                  desc: "Créez des agents experts par métier avec des configurations et prompts dédiés.",
                  icon: (
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  ),
                },
                {
                  title: "Exécution asynchrone",
                  desc: "Les tâches sont traitées en arrière-plan. Résultats disponibles en temps réel.",
                  icon: (
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  ),
                },
                {
                  title: "Multi-entreprise",
                  desc: "Espaces de travail séparés avec gestion des rôles et des équipes.",
                  icon: (
                    <>
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </>
                  ),
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
                  </div>
                  <div className="relative">
                    <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent/10">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="size-5 text-accent"
                      >
                        {feature.icon}
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="agents" className="border-t border-border/40 bg-muted/30 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Agents disponibles
              </h2>
              <p className="mt-4 text-muted-foreground">
                Des agents pré-configurés pour les besoins les plus courants.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Marketing",
                  desc: "Création de contenu, publications réseaux sociaux, newsletters",
                  color: "accent",
                  gradient: "from-accent/20 via-accent/5 to-transparent",
                },
                {
                  name: "Finance",
                  desc: "Analyse financière, reporting, budget, prévisions",
                  color: "blue-500",
                  gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
                },
                {
                  name: "Support",
                  desc: "Réponses automatiques, tickets, base de connaissances",
                  color: "emerald-500",
                  gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
                },
              ].map((agent) => (
                <div
                  key={agent.name}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6 transition-all hover:shadow-lg"
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
                  <div className="relative">
                    <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="size-5 text-accent"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{agent.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {agent.desc}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                        En savoir plus
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="size-3"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-t border-border/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Tarifs simples et transparents
              </h2>
              <p className="mt-4 text-muted-foreground">
                Commencez gratuitement, évoluez selon vos besoins.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "29€",
                  tasks: "100 tâches/mois",
                  agents: "3 agents",
                  members: "3 membres",
                  popular: false,
                },
                {
                  name: "Pro",
                  price: "99€",
                  tasks: "500 tâches/mois",
                  agents: "10 agents",
                  members: "10 membres",
                  popular: true,
                },
                {
                  name: "Gratuit",
                  price: "0€",
                  tasks: "10 tâches/mois",
                  agents: "1 agent",
                  members: "1 membre",
                  popular: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-8 transition-all ${
                    plan.popular
                      ? "border-accent bg-card shadow-xl shadow-accent/10"
                      : "border-border/40 bg-card hover:border-accent/30 hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground shadow-lg">
                        Le plus populaire
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                    <p className="mt-4">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">/mois</span>
                    </p>
                    <ul className="mt-8 flex flex-col gap-3 text-left">
                      {[plan.tasks, plan.agents, plan.members].map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="size-4 shrink-0 text-accent"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/register"
                      className={`mt-8 inline-flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium transition-all ${
                        plan.popular
                          ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90"
                          : "border border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {plan.price === "0€" ? "Commencer" : "S&apos;abonner"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-12">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Agilis AI. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
