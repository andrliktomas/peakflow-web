import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";
import "./ui.css";

// Self-hosted at build time by next/font — no render-blocking request to
// fonts.googleapis.com, which the prototype still had in its <head>.
const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — datová analytika a AI automatizace pro B2B`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: site.name,
    title: `${site.name} — datová analytika a AI automatizace pro B2B`,
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={`${outfit.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
