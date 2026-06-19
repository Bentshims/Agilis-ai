"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  { num: 1, label: "Workspace" },
  { num: 2, label: "Équipe" },
  { num: 3, label: "Prêt" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [workspaceId, setWorkspaceId] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [inviteError, setInviteError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    api
      .getMe()
      .then((user) => {
        if (!user.members?.length) {
          router.push("/signup");
          return;
        }
        const ws = user.members[0].workspace;
        setWorkspaceId(ws.id);
        setWorkspaceName(ws.name);
      })
      .catch(() => router.push("/signup"))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleWorkspaceSubmit() {
    if (!workspaceName.trim() || workspaceName.trim().length < 2) {
      setError("Le nom du workspace doit contenir au moins 2 caractères");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await api.updateWorkspace(workspaceId, {
        name: workspaceName.trim(),
        description: description.trim() || undefined,
      });
      setStep(2);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Une erreur est survenue");
    } finally {
      setSaving(false);
    }
  }

  function handleAddEmail() {
    const email = inviteEmail.trim();
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInviteError("Email invalide");
      return;
    }
    if (invitedEmails.includes(email)) {
      setInviteError("Cet email est déjà ajouté");
      return;
    }
    setInvitedEmails((prev) => [...prev, email]);
    setInviteEmail("");
    setInviteError("");
  }

  function handleRemoveEmail(email: string) {
    setInvitedEmails((prev) => prev.filter((e) => e !== email));
  }

  async function handleInviteSubmit() {
    if (invitedEmails.length === 0) {
      setStep(3);
      return;
    }
    setSaving(true);
    setError("");
    try {
      for (const email of invitedEmails) {
        await api.inviteMember(workspaceId, email);
      }
      setSuccessMsg(`${invitedEmails.length} membre(s) invité(s) avec succès`);
      setStep(3);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Une erreur est survenue");
    } finally {
      setSaving(false);
    }
  }

  function handleFinish() {
    router.push("/dashboard");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <svg className="size-5 animate-spin text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                step === s.num
                  ? "bg-white text-black"
                  : step > s.num
                    ? "bg-green-500/20 text-green-400"
                    : "bg-white/10 text-zinc-500"
              )}
            >
              {step > s.num ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                s.num
              )}
            </div>
            <span
              className={cn(
                "text-xs font-medium hidden sm:inline",
                step === s.num ? "text-white" : "text-zinc-500"
              )}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-px w-8 transition-colors",
                  step > s.num ? "bg-green-500/50" : "bg-white/10"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Workspace */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold tracking-[0.06em] text-white uppercase">
              Configurez votre espace
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Donnez un nom à votre espace de travail
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ws-name" className="text-xs font-medium text-zinc-300 uppercase tracking-[0.08em]">
                Nom du workspace <span className="ml-0.5 text-red-400">*</span>
              </Label>
              <Input
                id="ws-name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Mon entreprise"
                className="h-9 w-full bg-white/5 px-3 text-sm text-white placeholder-zinc-500 border-white/10 focus-visible:border-white/30 focus-visible:ring-0"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ws-desc" className="text-xs font-medium text-zinc-300 uppercase tracking-[0.08em]">
                Description <span className="text-zinc-500">(optionnelle)</span>
              </Label>
              <Input
                id="ws-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Notre équipe marketing..."
                className="h-9 w-full bg-white/5 px-3 text-sm text-white placeholder-zinc-500 border-white/10 focus-visible:border-white/30 focus-visible:ring-0"
              />
            </div>
          </div>

          <Button
            onClick={handleWorkspaceSubmit}
            disabled={saving}
            className="mt-2 h-9 w-full bg-white text-sm font-bold text-black uppercase tracking-[0.08em] shadow-lg shadow-white/10 transition-all hover:bg-zinc-200 active:scale-[0.98]"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="size-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Sauvegarde...
              </span>
            ) : (
              "Continuer"
            )}
          </Button>
        </div>
      )}

      {/* Step 2: Invite members */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold tracking-[0.06em] text-white uppercase">
              Invitez votre équipe
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Ajoutez les membres de votre équipe
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                value={inviteEmail}
                onChange={(e) => { setInviteEmail(e.target.value); setInviteError(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddEmail(); } }}
                placeholder="email@entreprise.com"
                className="h-9 flex-1 bg-white/5 px-3 text-sm text-white placeholder-zinc-500 border-white/10 focus-visible:border-white/30 focus-visible:ring-0"
              />
              <Button
                type="button"
                onClick={handleAddEmail}
                variant="outline"
                className="h-9 shrink-0 border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-white/10"
              >
                Ajouter
              </Button>
            </div>
            {inviteError && (
              <p className="text-xs text-red-400">{inviteError}</p>
            )}

            {invitedEmails.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-1">
                {invitedEmails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                  >
                    <span className="text-sm text-zinc-300">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setStep(3)}
              variant="outline"
              className="h-9 flex-1 border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-white/10"
            >
              Passer
            </Button>
            <Button
              onClick={handleInviteSubmit}
              disabled={saving}
              className="h-9 flex-1 bg-white text-sm font-bold text-black uppercase tracking-[0.08em] shadow-lg shadow-white/10 transition-all hover:bg-zinc-200 active:scale-[0.98]"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <svg className="size-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Envoi...
                </span>
              ) : (
                "Continuer"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Ready */}
      {step === 3 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-500/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-8 text-green-400">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-[0.06em] text-white uppercase">
              Tout est prêt !
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Votre espace de travail est configuré.
              {successMsg && <span className="block mt-1 text-green-400">{successMsg}</span>}
            </p>
          </div>

          <Button
            onClick={handleFinish}
            className="mt-4 h-9 w-full max-w-xs bg-white text-sm font-bold text-black uppercase tracking-[0.08em] shadow-lg shadow-white/10 transition-all hover:bg-zinc-200 active:scale-[0.98]"
          >
            Accéder au dashboard
          </Button>
        </div>
      )}
    </div>
  );
}
