import { PageTransition } from "@/components/auth/page-transition";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black">
      {/* Logo top-left */}
      <div className="absolute left-8 top-8 z-10 h-12">
        <img src="/logo-dark.png" alt="Agilis AI" className="h-full w-auto object-contain" />
      </div>

      {/* Top-right bubble */}
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[700px] w-[700px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Bottom-left bubble */}
      <div
        className="pointer-events-none absolute -bottom-48 -left-48 h-[700px] w-[700px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Centered form with page transitions */}
      <PageTransition>
        {children}
      </PageTransition>
    </div>
  );
}
