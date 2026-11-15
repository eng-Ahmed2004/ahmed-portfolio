import type { Localized } from "@/types";

/**
 * Core identity and contact details.
 * Privacy: the university GPA / academic average must never be added here
 * or anywhere else in the site.
 */
export const profile = {
  name: {
    en: "Ahmed Moeen Khalil Srour",
    ar: "أحمد معين خليل سرور",
  } satisfies Localized,
  /** The name split over two lines for the hero heading. */
  nameLines: {
    en: ["Ahmed Moeen", "Khalil Srour"],
    ar: ["أحمد معين", "خليل سرور"],
  } satisfies Localized<readonly [string, string]>,
  shortName: {
    en: "Ahmed Srour",
    ar: "أحمد سرور",
  } satisfies Localized,
  initials: "AS",
  email: "ahmadsrour537@gmail.com",
  location: {
    en: "Gaza, Palestine",
    ar: "غزة، فلسطين",
  } satisfies Localized,
  socials: {
    github: "https://github.com/eng-Ahmed2004",
    linkedin: "https://www.linkedin.com/in/ahmed-srour-335844405/",
  },
  /** Replace the file in /public/cv to update the downloadable CV. */
  cv: {
    href: "/cv/Ahmed-Srour-CV.pdf",
    fileName: "Ahmed-Srour-CV.pdf",
  },
} as const;
