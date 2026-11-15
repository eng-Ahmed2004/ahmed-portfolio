"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { withViewTransition } from "@/lib/view-transition";

/** Switches between English (LTR) and Arabic (RTL). */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, dict, toggleLocale } = useI18n();
  const targetLocale = locale === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      onClick={() => withViewTransition(toggleLocale)}
      aria-label={dict.a11y.switchLanguage}
      lang={targetLocale}
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-medium text-fg-soft",
        "transition-[background-color,color,transform] duration-300 ease-settle",
        "hover:bg-surface-hover hover:text-fg active:scale-95",
        targetLocale === "ar" && "font-arabic",
        className,
      )}
    >
      <Languages aria-hidden="true" strokeWidth={1.7} className="size-[1.15rem]" />
      <span className="hidden sm:inline">{dict.languageToggle.label}</span>
      <span className="sm:hidden">{dict.languageToggle.short}</span>
    </button>
  );
}
