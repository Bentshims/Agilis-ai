import { AuthForm } from "@/components/auth/auth-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import Link from "next/link";

export default function RegisterPage() {
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
        submitLabel="Créer mon compte"
        footer={
          <span>
            Déjà un compte ?{" "}
            <Link href="/login" className="font-medium text-accent hover:text-accent/80 transition-colors">
              Se connecter
            </Link>
          </span>
        }
      />
      <OAuthButtons />
    </div>
  );
}
