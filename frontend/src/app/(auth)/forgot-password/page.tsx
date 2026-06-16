import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm">
      <AuthForm
        title="Mot de passe oublié"
        description="Recevez un lien pour réinitialiser votre mot de passe."
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "vous@entreprise.com", required: true },
        ]}
        submitLabel="Envoyer le lien"
        footer={
          <span>
            Vous vous souvenir ?{" "}
            <Link href="/login" className="font-medium text-accent hover:text-accent/80 transition-colors">
              Se connecter
            </Link>
          </span>
        }
      />
    </div>
  );
}
