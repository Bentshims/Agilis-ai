"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  onSubmit?: (e: React.FormEvent) => void;
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
  onSubmit,
  loading,
  error,
  footer,
  className,
}: AuthFormProps) {
  return (
    <Card className={cn("w-full max-w-sm border-none bg-transparent shadow-none", className)}>
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(e);
          }}
          className="flex flex-col gap-4"
        >
          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}

          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <Label htmlFor={field.name} className="text-xs font-medium text-foreground">
                {field.label}
                {field.required && <span className="ml-0.5 text-destructive">*</span>}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                required={field.required}
                className="h-9 rounded-lg border-border bg-muted/50 px-3 text-sm transition-colors focus-visible:border-accent focus-visible:ring-accent/20"
              />
            </div>
          ))}

          <Button
            type="submit"
            className="mt-2 h-9 w-full rounded-lg bg-accent text-accent-foreground text-sm font-medium shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-accent/30 active:scale-[0.98]"
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
          <div className="mt-4 text-center text-xs text-muted-foreground">{footer}</div>
        )}
      </CardContent>
    </Card>
  );
}
