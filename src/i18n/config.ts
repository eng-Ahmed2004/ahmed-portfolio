import type { Direction, Locale, Theme } from "@/types";
import en, { type Dictionary } from "./dictionaries/en";
import ar from "./dictionaries/ar";

export const locales: readonly Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";
export const defaultTheme: Theme = "dark";

export const directions: Record<Locale, Direction> = { en: "ltr", ar: "rtl" };

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

/** localStorage keys — also read by the inline boot script in the layout. */
export const STORAGE_KEYS = {
  locale: "as-portfolio:locale",
  theme: "as-portfolio:theme",
} as const;

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ar";
}

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

export type { Dictionary };
