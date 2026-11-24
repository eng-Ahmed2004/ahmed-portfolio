import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Lexend, Readex_Pro, Unbounded } from "next/font/google";
import type { CSSProperties } from "react";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { profile } from "@/data/profile";
import en from "@/i18n/dictionaries/en";
import { bootScript } from "@/lib/preferences";
import { siteUrl, themeColors } from "@/lib/site";

// Typography: Lexend (English text) + Readex Pro (Arabic text) form ONE
// font-family stack (`--font-sans` in globals.css). Lexend has no Arabic
// glyphs, so every Arabic character falls through to Readex Pro on its own;
// the two are designed as a pair. Unbounded is the wide display face for big
// headings and JetBrains Mono is for small labels — both fall through to
// Readex Pro for Arabic as well.
//
// Weights are listed explicitly because next/font cannot limit a variable
// font to a range. Google serves ONE variable file per font, so listing five
// weights does not mean five downloads.

// Body and UI text. Preloaded: it is on screen immediately.
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Arabic text. Not preloaded: English visitors never need it, and the browser
// fetches it on demand the first time Arabic text is rendered.
const readexPro = Readex_Pro({
  variable: "--font-readex",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

// Display headings (the name, section titles).
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Small uppercase labels, index numbers and dates.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/**
 * next/font describes each font as "Name, Name Fallback", where the Fallback
 * face is a local Arial that claims EVERY code point (this is emitted even
 * with `adjustFontFallback: false`). Using those stacks as-is would put an
 * Arial fallback ahead of Readex Pro, so Arabic text would render in Arial.
 * Only the real face name (the first entry) is exposed here, and globals.css
 * builds the combined stacks from these names.
 */
const faceName = (font: { style: { fontFamily: string } }) =>
  font.style.fontFamily.split(",")[0].trim();

const fontFaces = {
  "--face-lexend": faceName(lexend),
  "--face-readex": faceName(readexPro),
  "--face-unbounded": faceName(unbounded),
  "--face-mono": faceName(jetbrainsMono),
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
      className={`${lexend.variable} ${readexPro.variable} ${unbounded.variable} ${jetbrainsMono.variable}`}
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
