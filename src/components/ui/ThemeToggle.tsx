"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

/**
 * Dark/light switch. Both icons are always rendered and CSS picks one from
 * the <html data-theme> attribute, so the right icon shows before hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { dict } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? dict.a11y.switchToLight : dict.a11y.switchToDark}
      className={cn(
        "relative grid size-11 shrink-0 place-items-center rounded-full text-fg-soft",
        "transition-[background-color,color,transform] duration-300 ease-settle",
        "hover:bg-surface-hover hover:text-fg active:scale-90",
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        strokeWidth={1.7}
        className="absolute size-[1.15rem] transition-[opacity,transform] duration-500 ease-settle light:scale-50 light:-rotate-90 light:opacity-0"
      />
      <Moon
        aria-hidden="true"
        strokeWidth={1.7}
        className="absolute size-[1.15rem] scale-50 rotate-90 opacity-0 transition-[opacity,transform] duration-500 ease-settle light:scale-100 light:rotate-0 light:opacity-100"
      />
    </button>
  );
}
