"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { api, ApiError } from "@/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(data: Record<string, unknown>) {
    setLoading(true);
    setError("");
    try {
      await api.signup(data as { email: string; password: string; name?: string });
      router.push("/onboarding");
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <AuthForm
        title="Créer un compte"
        description="Commencez avec votre espace de travail gratuit."
        fields={[
          { name: "name", label: "Nom complet", placeholder: "Jean Dupont", required: true },
          { name: "email", label: "Email", type: "email", placeholder: "vous@entreprise.com", required: true },
          { name: "password", label: "Mot de passe", type: "password", placeholder: "••••••••", required: true },
        ]}
        schemaName="signup"
        submitLabel="Créer mon compte"
        onSubmit={handleSignup}
        loading={loading}
        error={error}
        footer={
          <span>
            Déjà un compte ?{" "}
            <Link href="/signin" className="font-medium text-white hover:text-zinc-300 transition-colors">
              Se connecter
            </Link>
          </span>
        }
      />
    </div>
  );
}
