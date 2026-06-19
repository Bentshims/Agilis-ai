"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { api, ApiError } from "@/lib/api";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleResetPassword(data: Record<string, unknown>) {
    if (!token) {
      setError("Lien de réinitialisation invalide ou expiré.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // TODO: implement reset-password endpoint
      router.push("/signin");
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <AuthForm
        title="Nouveau mot de passe"
        description="Choisissez un nouveau mot de passe sécurisé."
        fields={[
          { name: "password", label: "Nouveau mot de passe", type: "password", placeholder: "••••••••", required: true },
          { name: "confirmPassword", label: "Confirmer le mot de passe", type: "password", placeholder: "••••••••", required: true },
        ]}
        schemaName="resetPassword"
        submitLabel="Réinitialiser"
        onSubmit={handleResetPassword}
        loading={loading}
        error={error}
        footer={
          <span>
            <Link href="/signin" className="font-medium text-white hover:text-zinc-300 transition-colors">
              Retour à la connexion
            </Link>
          </span>
        }
      />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
