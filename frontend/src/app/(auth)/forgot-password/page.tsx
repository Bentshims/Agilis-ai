"use client";

import { useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleForgotPassword(_data: Record<string, unknown>) {
    setLoading(true);
    setError("");
    try {
      // TODO: implement forgot-password endpoint
      setSuccess("Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.");
    } catch (e) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <AuthForm
        title="Mot de passe oublié"
        description="Recevez un lien pour réinitialiser votre mot de passe."
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "vous@entreprise.com", required: true },
        ]}
        schemaName="forgotPassword"
        submitLabel="Envoyer le lien"
        onSubmit={handleForgotPassword}
        loading={loading}
        error={error}
        success={success}
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
