import type { Metadata } from "next";
import { Unbounded, Vazirmatn, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "@/components/cursor-glow";
import { site } from "@/lib/site";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${unbounded.variable} ${vazirmatn.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <div className="noise-overlay pointer-events-none fixed inset-0 z-50" />
        <div className="glow-follow pointer-events-none fixed inset-0 z-0" />
        <div className="relative z-10">{children}</div>
        <CursorGlow />
      </body>
    </html>
  );
}
