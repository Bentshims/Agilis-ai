import { AuthForm } from "@/components/auth/auth-form";
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
        schemaName="signup"
        submitLabel="Créer mon compte"
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
