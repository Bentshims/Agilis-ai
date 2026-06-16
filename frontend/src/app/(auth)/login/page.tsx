import { AuthForm } from "@/components/auth/auth-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <AuthForm
        title="Connexion"
        description="Connectez-vous pour accéder à votre espace de travail."
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "vous@entreprise.com", required: true },
          { name: "password", label: "Mot de passe", type: "password", placeholder: "••••••••", required: true },
        ]}
        submitLabel="Se connecter"
        footer={
          <span>
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-medium text-accent hover:text-accent/80 transition-colors">
              Créer un compte
            </Link>
            <span className="mx-2">·</span>
            <Link href="/forgot-password" className="font-medium text-accent hover:text-accent/80 transition-colors">
              Mot de passe oublié
            </Link>
          </span>
        }
      />
      <OAuthButtons />
    </div>
  );
}
