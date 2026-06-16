export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col lg:flex-row">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-[#2a241f] to-primary p-8 lg:p-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/25">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5 text-accent-foreground"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-primary-foreground">
              Agilis AI
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl">
            L&apos;IA qui travaille
            <span className="block text-accent">pour vous, 24/7</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
            Créez des agents IA spécialisés pour automatiser vos tâches métier.
            Marketing, Finance, Support — vos agents travaillent en continu,
            même quand vous dormez.
          </p>

          <div className="mt-8 flex flex-col gap-3 border-t border-primary-foreground/10 pt-8">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-3 text-accent"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm text-primary-foreground/60">
                Agents spécialisés par métier
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-3 text-accent"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm text-primary-foreground/60">
                Exécution asynchrone en arrière-plan
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-3 text-accent"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm text-primary-foreground/60">
                Résultats en temps réel, notifications instantanées
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center bg-background p-8 lg:p-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
        {children}
      </div>
    </div>
  );
}
