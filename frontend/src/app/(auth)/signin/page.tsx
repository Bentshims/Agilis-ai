import { AuthForm } from "@/components/auth/auth-form";
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
        schemaName="signin"
        submitLabel="Se connecter"
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
