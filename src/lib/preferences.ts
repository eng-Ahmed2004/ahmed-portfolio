import {
  STORAGE_KEYS,
  defaultLocale,
  defaultTheme,
  directions,
  isLocale,
  isTheme,
} from "@/i18n/config";
import { themeColors } from "@/lib/site";
import type { Locale, Theme } from "@/types";

/**
 * A tiny external store for the two user preferences (language and theme).
 *
 * The <html> element is the source of truth: an inline script in the root
 * layout applies the saved values before first paint, and React reads them
 * through `useSyncExternalStore`, which avoids hydration mismatches.
 */

type Listener = () => void;
const listeners = new Set<Listener>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function persist(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The
    // preference still applies for this visit.
  }
}

export function readLocale(): Locale {
  const value = document.documentElement.lang;
  return isLocale(value) ? value : defaultLocale;
}

export function readTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : defaultTheme;
}

export const readServerLocale = (): Locale => defaultLocale;
export const readServerTheme = (): Theme => defaultTheme;

export function applyLocale(locale: Locale): void {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = directions[locale];
  persist(STORAGE_KEYS.locale, locale);
  emit();
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColors[theme]);
  persist(STORAGE_KEYS.theme, theme);
  emit();
}

/**
 * Inline script for <head>. Runs before first paint so a returning visitor
 * never sees the wrong theme or text direction.
 */
export const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${JSON.stringify(
  STORAGE_KEYS.theme,
)});if(t!=="light"&&t!=="dark")t=${JSON.stringify(
  defaultTheme,
)};d.dataset.theme=t;d.style.colorScheme=t;if(localStorage.getItem(${JSON.stringify(
  STORAGE_KEYS.locale,
)})==="ar"){d.lang="ar";d.dir="rtl";d.classList.add("i18n-pending");setTimeout(function(){d.classList.remove("i18n-pending")},2500)}}catch(e){}})();`;
