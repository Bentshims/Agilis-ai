"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { api, ApiError } from "@/lib/api";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignin(data: Record<string, unknown>) {
    setLoading(true);
    setError("");
    try {
      await api.signin(data as { email: string; password: string });
      router.push("/");
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <AuthForm
        title="Connexion"
        description="Connectez-vous pour accéder à votre espace de travail."
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "vous@entreprise.com", required: true },
          { name: "password", label: "Mot de passe", type: "password", placeholder: "••••••••", required: true },
        ]}
        schemaName="signin"
        submitLabel="Se connecter"
        onSubmit={handleSignin}
        loading={loading}
        error={error}
        footer={
          <span>
            Pas encore de compte ?{" "}
            <Link href="/signup" className="font-medium text-white hover:text-zinc-300 transition-colors">
              Créer un compte
            </Link>
            <span className="mx-2">·</span>
            <Link href="/forgot-password" className="font-medium text-white hover:text-zinc-300 transition-colors">
              Mot de passe oublié
            </Link>
          </span>
        }
      />
    </div>
  );
}
