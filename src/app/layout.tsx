import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/600.css";
import "./globals.css";
import { profile } from "@/content/site";

const title = `${profile.name}, ${profile.role}`;

export const metadata: Metadata = {
  title,
  description: profile.intro,
  openGraph: {
    title,
    description: profile.intro,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
