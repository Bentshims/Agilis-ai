import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agilis AI - Intelligent Agent Platform",
  description:
    "Déléguez vos tâches métier à des agents IA spécialisés qui travaillent en autonomie 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/agilis-dark-theme-favicon.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/agilis-light-theme-favicon.png" media="(prefers-color-scheme: light)" />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
