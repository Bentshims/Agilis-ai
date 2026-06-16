"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { signinSchema, signupSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/auth-schemas";

const schemas = {
  signin: signinSchema,
  signup: signupSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
} as const;

type SchemaName = keyof typeof schemas;

interface AuthField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

interface AuthFormProps {
  title: string;
  description?: string;
  fields: AuthField[];
  submitLabel: string;
  schemaName: SchemaName;
  onSubmit?: (data: Record<string, unknown>) => void;
  loading?: boolean;
  error?: string;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthForm({
  title,
  description,
  fields,
  submitLabel,
  schemaName,
  onSubmit,
  loading,
  error,
  footer,
  className,
}: AuthFormProps) {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemas[schemaName] as any),
  });

  function toggleVisibility(fieldName: string) {
    setVisible((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  }

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div className="px-0">
        <h2 className="text-2xl font-semibold tracking-[0.06em] text-white uppercase">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-zinc-400">{description}</p>
        )}
      </div>
      <div className="mt-6">
        <form
          onSubmit={handleSubmit((data) => onSubmit?.(data))}
          className="flex flex-col gap-4"
        >
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}

          {fields.map((field) => {
            const isPassword = field.type === "password";
            const isVisible = visible[field.name];
            const fieldError = errors[field.name]?.message as string | undefined;

            return (
              <div key={field.name} className="flex flex-col gap-1.5">
                <Label
                  htmlFor={field.name}
                  className="text-xs font-medium text-zinc-300 uppercase tracking-[0.08em]"
                >
                  {field.label}
                  {field.required && <span className="ml-0.5 text-red-400">*</span>}
                </Label>
                <div className="relative">
                  <Input
                    id={field.name}
                    {...register(field.name)}
                    type={isPassword ? (isVisible ? "text" : "password") : field.type ?? "text"}
                    placeholder={field.placeholder}
                    className={cn(
                      "h-9 w-full bg-white/5 px-3 pr-9 text-sm text-white placeholder-zinc-500 transition-colors focus-visible:ring-0",
                      fieldError
                        ? "border-red-500/50 focus-visible:border-red-500/70"
                        : "border-white/10 focus-visible:border-white/30"
                    )}
                  />
                  {isPassword && (
                    <button
                      type="button"
                      onClick={() => toggleVisibility(field.name)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center size-6 text-zinc-500 hover:text-zinc-300 transition-colors"
                      tabIndex={-1}
                    >
                      {isVisible ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                <AnimatePresence mode="wait">
                  {fieldError && (
                    <motion.p
                      key={field.name}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="text-xs text-red-400"
                    >
                      {fieldError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <Button
            type="submit"
            className="mt-2 h-9 w-full bg-white text-sm font-bold text-black uppercase tracking-[0.08em] shadow-lg shadow-white/10 transition-all hover:bg-zinc-200 active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="size-3.5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Chargement...
              </span>
            ) : (
              submitLabel
            )}
          </Button>
        </form>

        {footer && (
          <div className="mt-4 text-center text-xs tracking-[0.06em] text-zinc-500">{footer}</div>
        )}
      </div>
    </div>
  );
}
