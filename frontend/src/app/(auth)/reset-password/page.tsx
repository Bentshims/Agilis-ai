import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-sm">
      <AuthForm
        title="Nouveau mot de passe"
        description="Choisissez un nouveau mot de passe sécurisé."
        fields={[
          { name: "password", label: "Nouveau mot de passe", type: "password", placeholder: "••••••••", required: true },
          { name: "confirmPassword", label: "Confirmer le mot de passe", type: "password", placeholder: "••••••••", required: true },
        ]}
        submitLabel="Réinitialiser"
        footer={
          <span>
            <Link href="/login" className="font-medium text-accent hover:text-accent/80 transition-colors">
              Retour à la connexion
            </Link>
          </span>
        }
      />
    </div>
  );
}
