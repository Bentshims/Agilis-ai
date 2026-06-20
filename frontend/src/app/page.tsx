"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import HeroScene from "@/components/hero-scene";
import HeroMockup from "@/components/hero-mockup";

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  }, []);
  const handleLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);
  return { ref, tilt, handleMove, handleLeave };
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, tilt, handleMove, handleLeave } = useTilt();
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative h-full w-full rounded-2xl border border-border/20 bg-card/40 backdrop-blur-xl transition-colors duration-500 hover:border-border/40"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl shine-effect" />
        <div className="pointer-events-none absolute -inset-px rounded-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
        </div>
        <div className="relative h-full p-8">{children}</div>
      </motion.div>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
    </motion.div>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  const Comp = href.startsWith("#") ? "a" : Link;
  return (
    <Comp
      href={href}
      className={`text-sm transition-colors ${active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </Comp>
  );
}

const FAQ_ITEMS = [
  {
    q: "Qu'est-ce qu'Agilis AI ?",
    a: "Agilis AI est une plateforme d'agents IA spécialisés qui automatisent vos tâches métier en continu, 24/7.",
  },
  {
    q: "Comment fonctionne un agent IA ?",
    a: "Chaque agent est configuré avec des prompts et des outils dédiés à un métier spécifique. Il exécute les tâches en arrière-plan et vous notifie des résultats en temps réel.",
  },
  {
    q: "Puis-je essayer gratuitement ?",
    a: "Oui, notre formule Gratuite vous permet de tester la plateforme avec 1 agent et 10 tâches par mois, sans carte bancaire.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Absolument. Nous utilisons un chiffrement de bout en bout et sommes conformes RGPD. Vos données ne sont jamais utilisées pour entraîner des modèles publics.",
  },
  {
    q: "Puis-je résilier à tout moment ?",
    a: "Oui, vous pouvez résilier votre abonnement à tout moment. Les données restent accessibles pendant 30 jours après résiliation.",
  },
];

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "29",
    period: "/mois",
    desc: "Pour les petites équipes qui débutent",
    tasks: "100 tâches/mois",
    agents: "3 agents",
    members: "3 membres",
    support: "Support email",
    popular: false,
  },
  {
    name: "Pro",
    price: "99",
    period: "/mois",
    desc: "Pour les équipes en pleine croissance",
    tasks: "500 tâches/mois",
    agents: "10 agents",
    members: "10 membres",
    support: "Support prioritaire",
    popular: true,
  },
  {
    name: "Business",
    price: "249",
    period: "/mois",
    desc: "Pour les organisations à grand volume",
    tasks: "2000 tâches/mois",
    agents: "25 agents",
    members: "25 membres",
    support: "Support dédié 24/7",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    period: "",
    desc: "Pour les besoins sur mesure",
    tasks: "Tâches illimitées",
    agents: "Agents illimités",
    members: "Membres illimités",
    support: "Support concierge",
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Sophie Laurent",
    role: "CMO, TechCorp",
    content: "Agilis AI nous a fait gagner 15h par semaine sur la gestion de contenu. Nos agents Marketing tournent 24/7 sans intervention.",
  },
  {
    name: "Thomas Mercier",
    role: "CTO, Finstart",
    content: "L'agent Finance a réduit notre temps de reporting de 80%. L'automatisation est devenue un pilier de notre stratégie.",
  },
  {
    name: "Claire Dubois",
    role: "Head of Support, ScaleUp",
    content: "Notre taux de résolution au premier contact est passé de 60% à 95% grâce à l'agent Support. Nos clients sont ravis.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="fixed top-0 z-50 w-full border-b border-border/10 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/agilis-dark-theme-logo.png" alt="Agilis AI" className="hidden h-10 w-auto dark:block" />
            <img src="/agilis-light-theme-logo.png" alt="Agilis AI" className="h-10 w-auto dark:hidden" />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink href="#features">Fonctionnalités</NavLink>
            <NavLink href="#how-it-works">Comment ça marche</NavLink>
            <NavLink href="#agents">Agents</NavLink>
            <NavLink href="#pricing">Tarifs</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/signin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Connexion
            </Link>
            <Button variant="default" size="sm" className="h-9 px-4 text-sm bg-emerald text-black hover:bg-emerald/80" asChild>
              <Link href="/signup">Essai gratuit</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ───── 1. HERO ───── */}
        <section ref={heroRef} className="relative min-h-dvh overflow-hidden pt-24 pb-16 lg:pt-28">
          <HeroScene />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
            <svg viewBox="0 0 1440 900" width="1440" height="900" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <pattern id="heroGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="1440" height="900" fill="url(#heroGrid)" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8rem)] max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row lg:gap-16">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-emerald/60" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-emerald">Plateforme IA</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
              >
                <span className="text-foreground">L&apos;IA agentique</span>
                <br />
                <span className="text-foreground/80">au service de votre entreprise</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground lg:text-base"
              >
                Des agents IA spécialisés travaillent 24/7 pour automatiser vos tâches métier. Marketing, Finance, Support — en continu.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <Button variant="default" size="default" className="h-10 px-6 text-sm bg-emerald text-black hover:bg-emerald/80" asChild>
                  <Link href="/signup">Commencer gratuitement</Link>
                </Button>
                <Button variant="outline" size="default" className="h-10 px-5 text-sm" asChild>
                  <Link href="#features">En savoir plus</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full max-w-lg lg:max-w-none"
            >
              <HeroMockup />
            </motion.div>
          </div>
        </section>

        {/* ───── 2. LOGOS CLIENTS ───── */}
        <section className="border-t border-border/10 py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <p className="mb-10 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Ils nous font confiance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 grayscale">
              {["TechCorp", "Finstart", "ScaleUp", "Neuralis", "Cloudly", "Datawise"].map((name) => (
                <div key={name} className="flex h-8 items-center">
                  <span className="text-lg font-bold tracking-tight text-foreground/60">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── 3. FEATURES ───── */}
        <section id="features" className="relative overflow-hidden border-t border-border/10 py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 opacity-10">
              <svg viewBox="0 0 300 300" width="300" height="300">
                <defs>
                  <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="300" height="300" fill="url(#grid)" />
              </svg>
            </div>
            <SectionHeading title="Fonctionnalités" subtitle="Tout ce dont vous avez besoin pour déployer et gérer vos agents IA." />
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Agents spécialisés",
                  desc: "Créez des agents experts par métier avec des configurations et prompts dédiés à vos processus. Chaque agent maîtrise son domaine.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  ),
                  wide: true,
                },
                {
                  title: "Exécution asynchrone",
                  desc: "Les tâches sont traitées en arrière-plan avec des résultats disponibles en temps réel. Vos agents travaillent 24/7.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                  ),
                },
                {
                  title: "Multi-entreprise",
                  desc: "Espaces de travail séparés avec gestion fine des rôles, équipes et permissions pour chaque organisation.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  ),
                },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={f.wide ? "md:col-span-2" : ""}
                >
                  <TiltCard>
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-foreground/80">
                        {f.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── 4. PRODUCT TOUR ───── */}
        <section className="relative overflow-hidden border-t border-border/10 py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionHeading title="Voyez-le en action" subtitle="Une interface conçue pour la clarté et l'efficacité." />
            <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {[
                  {
                    title: "Dashboard temps réel",
                    desc: "Visualisez l'activité de vos agents en un coup d'œil. Statistiques, exécutions récentes, et alertes en direct.",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18" />
                        <path d="M9 21V9" />
                      </svg>
                    ),
                  },
                  {
                    title: "Configuration intuitive",
                    desc: "Créez et personnalisez vos agents avec des templates prêts à l'emploi. Pas de code requis.",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    ),
                  },
                  {
                    title: "Suivi en continu",
                    desc: "Les tâches s'exécutent en arrière-plan 24/7. Recevez des notifications dès qu'un résultat est prêt.",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <div key={item.title} className="group flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.05] text-foreground/80">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-white/5 blur-sm" />
                <div className="overflow-hidden rounded-2xl border border-border/20 bg-card shadow-2xl shadow-white/[0.03] transition-all duration-500 hover:border-white/20">
                  <div className="flex items-center gap-1.5 border-b border-border/10 px-5 py-3">
                    <span className="size-2.5 rounded-full bg-red-500/60" />
                    <span className="size-2.5 rounded-full bg-yellow-500/60" />
                    <span className="size-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 text-foreground/80">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-foreground">Agent Marketing</span>
                          <div className="flex items-center gap-1.5">
                            <span className="size-1 rounded-full bg-green-500" />
                            <span className="text-[10px] text-muted-foreground">Actif</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        47 tâches aujourd'hui
                      </div>
                    </div>

                    <div className="mb-4 space-y-1.5">
                      {[
                        { label: "Statut", value: "Planification...", pct: 65 },
                        { label: "Création contenu", value: "Terminé", pct: 100 },
                        { label: "Publication", value: "En attente", pct: 0 },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center gap-3">
                          <span className="w-24 text-[10px] text-muted-foreground">{s.label}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${s.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              className={`h-full rounded-full ${s.pct === 100 ? "bg-green-500" : s.pct > 0 ? "bg-foreground/80" : "bg-white/10"}`}
                            />
                          </div>
                          <span className="w-14 text-right text-[10px] text-muted-foreground">{s.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg border border-border/10 bg-white/[0.02] p-3">
                      <span className="text-[10px] font-medium text-foreground">Dernières actions</span>
                      <div className="mt-2 space-y-1.5">
                        {[
                          "Brief campagne Q3 généré",
                          "Visuels validés (12/12)",
                          "Planning éditorial mis à jour",
                        ].map((action, i) => (
                          <motion.div
                            key={action}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-2.5 text-green-500">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span className="text-[10px] text-foreground/60">{action}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── 5. HOW IT WORKS ───── */}
        <section id="how-it-works" className="relative overflow-hidden border-t border-border/10 py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <SectionHeading title="Comment ça marche" subtitle="3 étapes pour automatiser vos processus métier avec l'IA." />
            <div className="mt-16 relative">
              <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-white/20 via-border/20 to-transparent hidden md:block" />
              <div className="pointer-events-none absolute -right-32 -top-32 opacity-20">
                <svg viewBox="0 0 200 200" width="200" height="200" className="text-foreground/20">
                  <defs>
                    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="200" height="200" fill="url(#dots)" />
                </svg>
              </div>

              <div className="space-y-12">
                {[
                  { step: "01", title: "Configurez vos agents", desc: "Définissez les objectifs, les sources de données et les actions de chaque agent via notre interface intuitive.", gradient: "from-white/[0.08] to-transparent" },
                  { step: "02", title: "Déployez en un clic", desc: "Lancez vos agents instantanément. Ils commencent à travailler en arrière-plan sans surveillance humaine.", gradient: "from-white/[0.06] to-transparent" },
                  { step: "03", title: "Suivez les résultats", desc: "Consultez les rapports en temps réel, ajustez les stratégies et optimisez les performances de vos agents.", gradient: "from-white/[0.05] to-transparent" },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex gap-6 md:gap-10"
                  >
                    <div className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-2xl border border-emerald/20 bg-card shadow-lg">
                      <span className="text-lg font-bold text-emerald">{item.step}</span>
                    </div>
                    <div className={`relative flex-1 rounded-2xl border border-border/10 bg-gradient-to-br ${item.gradient} p-6 backdrop-blur-sm`}>
                      <div className="absolute -left-1 top-8 size-2 rounded-full bg-emerald hidden md:block animate-ping-subtle shadow-[0_0_6px_1px_oklch(0.7_0.2_160/0.5)]" />
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── 5. AGENTS ───── */}
        <section id="agents" className="relative overflow-hidden border-t border-border/10 py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="pointer-events-none absolute -right-20 top-0 opacity-10">
              <svg viewBox="0 0 200 200" width="200" height="200" fill="none" stroke="oklch(0.7 0.2 160)" strokeWidth="0.5" className="opacity-20">
                <circle cx="100" cy="100" r="80" />
                <circle cx="100" cy="100" r="60" />
                <circle cx="100" cy="100" r="40" />
                <circle cx="100" cy="100" r="20" />
                <line x1="20" y1="100" x2="180" y2="100" />
                <line x1="100" y1="20" x2="100" y2="180" />
              </svg>
            </div>
            <SectionHeading title="Agents disponibles" subtitle="Des agents pré-configurés pour les besoins les plus courants." />
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Marketing",
                  desc: "Création de contenu, publications réseaux sociaux, newsletters, campagnes emailing.",
                  icon: (
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  ),
                  stats: "24/7",
                },
                {
                  name: "Finance",
                  desc: "Analyse financière, reporting automatisé, budget prévisionnel, détection d'anomalies.",
                  icon: (
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  ),
                  stats: "99.9%",
                },
                {
                  name: "Support",
                  desc: "Réponses automatiques, gestion des tickets, base de connaissances, escalade intelligente.",
                  icon: (
                    <>
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </>
                  ),
                  stats: "95%",
                },
                {
                  name: "Dev",
                  desc: "Revue de code, déploiement continu, monitoring d'infrastructure, détection d'incidents.",
                  icon: (
                    <>
                      <path d="M16 18l6-6-6-6" />
                      <path d="M8 6l-6 6 6 6" />
                    </>
                  ),
                  stats: "24/7",
                },
              ].map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <div className="group relative">
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-transparent blur-sm" />
                    <div className="relative overflow-hidden rounded-2xl border border-border/20 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/[0.1]">
                      <div className="pointer-events-none absolute inset-0 shine-effect" />
                      <div className="pointer-events-none absolute -right-12 -top-12">
                        <div className="h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />
                      </div>
                      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      <div className="relative p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex size-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05]">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5 text-foreground/80">
                            {agent.icon}
                          </svg>
                        </div>
                        <span className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {agent.stats}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground/80 transition-colors">{agent.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{agent.desc}</p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {["Automatisation", "Temps réel", "IA"].map((tag) => (
                          <span key={tag} className="rounded-full bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-muted-foreground">{tag}</span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-xs font-medium text-foreground/40 group-hover:text-foreground/80 transition-colors">
                        <span>En savoir plus</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3 transition-transform group-hover:translate-x-0.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── 6. TESTIMONIALS ───── */}
        <section className="relative overflow-hidden border-t border-border/10 py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title="Ils nous font confiance" subtitle="Découvrez ce que nos clients disent de leur expérience avec Agilis AI." />
            <div className="relative mt-16 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}
              >
                  {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="w-full shrink-0 px-4">
                    <div className="group relative mx-auto max-w-xl">
                      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-white/10" />
                      <div className="relative rounded-2xl border border-border/20 bg-card/40 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-white/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-6 size-8 text-emerald/30">
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                      </svg>
                      <p className="text-base leading-relaxed text-foreground/80">{t.content}</p>
                      <div className="mt-8">
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`size-2 rounded-full transition-all duration-300 ${
                      i === testimonialIdx ? "w-6 bg-foreground" : "bg-foreground/20 hover:bg-foreground/40"
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── 7. PRICING ───── */}
        <section id="pricing" className="relative overflow-hidden border-t border-border/10 py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionHeading title="Tarifs simples et transparents" subtitle="Commencez gratuitement, évoluez selon vos besoins." />
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PRICING_PLANS.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative rounded-2xl border p-6 transition-all duration-500 ${
                    plan.popular
                      ? "border-foreground/30 bg-card/60 shadow-2xl shadow-black/[0.1]"
                      : "border-border/20 bg-card/30 hover:-translate-y-1 hover:border-border/40 hover:bg-card/50 hover:shadow-2xl hover:shadow-black/[0.08]"
                  }`}
                >
                  {plan.popular && (
                    <>
                      <div className="pointer-events-none absolute -inset-[1px] rounded-2xl">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 animate-pulse" />
                      </div>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="inline-flex items-center rounded-full bg-emerald px-3 py-1 text-xs font-medium text-black shadow-lg shadow-emerald/20">
                          Le plus populaire
                        </span>
                      </div>
                      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.08]" />
                      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </>
                  )}
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-foreground">{plan.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{plan.desc}</p>
                    <p className="mt-6">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      {plan.period && <span className="text-xs text-muted-foreground">{plan.period}</span>}
                    </p>
                    <ul className="mt-8 flex flex-col gap-3 text-left">
                      {[plan.tasks, plan.agents, plan.members, plan.support].map((feat) => (
                        <li key={feat} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 shrink-0 text-foreground/40">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                      className={`mt-8 h-10 w-full text-sm ${plan.popular ? "bg-emerald text-black hover:bg-emerald/80" : ""}`}
                      asChild
                    >
                      <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>
                        {plan.name === "Enterprise" ? "Nous contacter" : "Commencer"}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── 8. FAQ ───── */}
        <section className="border-t border-border/10 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <SectionHeading title="Questions fréquentes" subtitle="Tout ce que vous devez savoir sur Agilis AI." />
            <div className="mt-16 space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="overflow-hidden rounded-xl border border-border/20 bg-card/20 backdrop-blur-sm"
                >
                  <button
                    onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/[0.02]"
                  >
                    <span>{item.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`size-4 shrink-0 text-foreground/40 transition-transform duration-300 ${activeFAQ === i ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeFAQ === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── 9. CTA FINAL ───── */}
        <section className="relative overflow-hidden border-t border-border/10 py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 -top-32 h-[400px] w-[400px] animate-glow-pulse rounded-full bg-white/[0.04] blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] animate-glow-pulse rounded-full bg-white/[0.04] blur-3xl" style={{ animationDelay: "-3s" }} />
            <div className="absolute right-20 top-10 opacity-[0.04]">
              <svg viewBox="0 0 400 400" width="400" height="400" fill="none" stroke="currentColor" strokeWidth="0.5">
                <rect x="50" y="50" width="300" height="300" rx="20" />
                <rect x="100" y="100" width="200" height="200" rx="10" />
                <circle cx="200" cy="200" r="50" />
                <path d="M200 150L250 200 200 250 150 200Z" />
              </svg>
            </div>
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/20 bg-card/40 backdrop-blur-sm">
                <img src="/agilis-dark-theme-logo.png" alt="Agilis AI" className="hidden h-8 w-auto dark:block" />
                <img src="/agilis-light-theme-logo.png" alt="Agilis AI" className="h-8 w-auto dark:hidden" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Prêt à automatiser votre entreprise ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                Rejoignez les entreprises qui utilisent déjà Agilis AI pour décupler leur productivité.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button variant="default" size="lg" className="h-12 px-8 text-sm bg-emerald text-black hover:bg-emerald/80" asChild>
                  <Link href="/signup">Commencer gratuitement</Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 text-sm" asChild>
                  <Link href="/signin">Se connecter</Link>
                </Button>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 text-foreground/40">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Sans carte bancaire
                </span>
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 text-foreground/40">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Configuration rapide
                </span>
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 text-foreground/40">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Support prioritaire
                </span>
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 text-foreground/40">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Conforme RGPD
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ───── 10. FOOTER ───── */}
      <footer className="border-t border-border/10">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2.5">
              <img src="/agilis-dark-theme-logo.png" alt="Agilis AI" className="hidden h-6 w-auto dark:block" />
              <img src="/agilis-light-theme-logo.png" alt="Agilis AI" className="h-6 w-auto dark:hidden" />
            </div>
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Agilis AI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
