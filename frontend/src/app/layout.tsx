import type { Metadata } from "next";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.toggle(
                  'dark',
                  localStorage.getItem('theme') === 'dark' ||
                    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
                );
              } catch (e) {}
            `,
          }}
        />
        <link rel="icon" href="/favicon-dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-white.png" media="(prefers-color-scheme: light)" />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
