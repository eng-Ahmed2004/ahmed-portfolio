"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dictionaries, directions, type Dictionary } from "@/i18n/config";
import { applyLocale, readLocale, readServerLocale, subscribe } from "@/lib/preferences";
import type { Direction, Locale, Localized } from "@/types";

interface I18nContextValue {
  locale: Locale;
  dir: Direction;
  /** UI copy for the active language. */
  dict: Dictionary;
  /** Picks the active language out of a localized value. */
  t: <T>(value: Localized<T>) => T;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, readServerLocale);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: directions[locale],
      dict: dictionaries[locale],
      t: (localized) => localized[locale],
      setLocale: applyLocale,
      toggleLocale: () => applyLocale(locale === "en" ? "ar" : "en"),
    }),
    [locale],
  );

  useEffect(() => {
    // Keep the tab title in the active language. The framework can re-insert
    // its own <title> after hydration, so watch <head> and re-apply.
    const title = dictionaries[locale].meta.title;
    const applyTitle = () => {
      if (document.title !== title) document.title = title;
    };
    applyTitle();
    const observer = new MutationObserver(applyTitle);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });

    // The boot script hides the page for returning Arabic visitors until the
    // Arabic content is on screen; reveal it now.
    const frame = requestAnimationFrame(() => {
      document.documentElement.classList.remove("i18n-pending");
    });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside <I18nProvider>.");
  }
  return context;
}
