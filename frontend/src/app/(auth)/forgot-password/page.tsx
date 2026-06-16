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
        schemaName="forgotPassword"
        submitLabel="Envoyer le lien"
        footer={
          <span>
            Vous vous souvenir ?{" "}
            <Link href="/signin" className="font-medium text-white hover:text-zinc-300 transition-colors">
              Se connecter
            </Link>
          </span>
        }
      />
    </div>
  );
}
