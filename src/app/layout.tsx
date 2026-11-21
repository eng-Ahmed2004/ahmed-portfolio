import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import type { CSSProperties } from "react";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { profile } from "@/data/profile";
import en from "@/i18n/dictionaries/en";
import { bootScript } from "@/lib/preferences";
import { siteUrl, themeColors } from "@/lib/site";

// The site uses exactly two typefaces, combined into ONE font-family stack
// (`--font-sans` in globals.css): Inter first, then IBM Plex Sans Arabic.
// Inter only contains Latin glyphs, so every Arabic character falls through
// to IBM Plex Sans Arabic automatically — no per-language switching needed.

// Weights 300–700, the only ones the design uses. (next/font cannot limit a
// variable font to a weight range, so the five weights are listed explicitly
// instead of downloading the full 100–900 variable file.) All five appear
// above the fold, so they are preloaded.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Same weights. Not preloaded: English visitors never need it, and the
// browser fetches it on demand the first time Arabic text is rendered.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

/**
 * next/font describes each font as "Name, Name Fallback", where the Fallback
 * face is a local Arial that claims EVERY code point (this is emitted even
 * with `adjustFontFallback: false`). Using that stack as-is would put the
 * Arial fallback ahead of IBM Plex Sans Arabic, so Arabic text would render
 * in Arial. Only the real face name (the first entry) is exposed here, and
 * globals.css builds the combined stack from those two names.
 */
const faceName = (font: { style: { fontFamily: string } }) =>
  font.style.fontFamily.split(",")[0].trim();

const fontFaces = {
  "--face-latin": faceName(inter),
  "--face-arabic": faceName(plexArabic),
} as CSSProperties;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: en.meta.title,
  description: en.meta.description,
  applicationName: "Ahmed Srour — Portfolio",
  authors: [{ name: profile.name.en, url: profile.socials.github }],
  creator: profile.name.en,
  keywords: [
    "Ahmed Srour",
    "Ahmed Moeen Khalil Srour",
    "أحمد سرور",
    "Flutter Developer",
    "Mobile Application Developer",
    "Smart Systems and Computer Engineering",
    "Al-Aqsa University",
    "AI Enthusiast",
    "Software Developer",
    "Gaza",
    "Palestine",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Ahmed Srour",
    title: en.meta.title,
    description: en.meta.description,
    locale: "en_US",
    alternateLocale: ["ar_PS"],
    firstName: "Ahmed",
    lastName: "Srour",
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: themeColors.dark,
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

/** Structured data for search engines. Privacy: no GPA / academic average. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name.en,
  alternateName: [profile.shortName.en, profile.name.ar],
  url: siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: "Flutter Developer",
  description: en.meta.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gaza",
    addressCountry: "PS",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Al-Aqsa University",
  },
  knowsAbout: [
    "Flutter",
    "Dart",
    "Mobile Application Development",
    "Artificial Intelligence",
    "Software Development",
  ],
  sameAs: [profile.socials.github, profile.socials.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="dark"
      className={`${inter.variable} ${plexArabic.variable}`}
      style={fontFaces}
      // The boot script may change lang/dir/theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {/* Motion sets inline opacity before hydration; without JS, show everything. */}
        <noscript>
          <style>{`[style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
