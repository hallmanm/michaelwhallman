import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.scss";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Engineering Manager & Experimentation Leader`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Engineering Manager",
    "Engineering Director",
    "Head of Experimentation",
    "A/B Testing",
    "CRO",
    "Conversion Rate Optimization",
    "Growth Engineering",
    "Experimentation Platform",
    "Personalization",
    "ecommerce engineering",
    "Michael Hallman",
    "Michael W. Hallman",
  ],
  openGraph: {
    title: `${siteConfig.name} — Engineering Manager & Experimentation Leader`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Engineering Manager & Experimentation Leader`,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
