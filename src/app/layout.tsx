import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { profile } from "@/data/profile";
import en from "@/i18n/dictionaries/en";
import { bootScript } from "@/lib/preferences";
import { siteUrl, themeColors } from "@/lib/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Listed first in every font stack (see globals.css). Its files only cover
// Arabic code points, so Latin text falls through to the Latin faces. The
// automatic Arial-based fallback must stay off: it would catch Latin text
// before the Latin faces get a chance.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

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
      className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable} ${plexArabic.variable}`}
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
