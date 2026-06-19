import { z } from "zod";

const passwordSchema = z
  .string()
  .min(12, "Minimum 12 caractères")
  .regex(/[a-z]/, "Doit contenir une minuscule")
  .regex(/[A-Z]/, "Doit contenir une majuscule")
  .regex(/[0-9]/, "Doit contenir un chiffre")
  .regex(/[^A-Za-z0-9]/, "Doit contenir un caractère spécial");

export const signinSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères").max(100),
  email: z.string().email("Email invalide"),
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Minimum 8 caractères"),
    confirmPassword: z.string().min(1, "Confirmation requise"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type SigninData = z.infer<typeof signinSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
