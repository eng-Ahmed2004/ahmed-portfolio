"use client";

import { useCallback, useSyncExternalStore } from "react";
import { applyTheme, readServerTheme, readTheme, subscribe } from "@/lib/preferences";
import { withViewTransition } from "@/lib/view-transition";
import type { Theme } from "@/types";

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const theme = useSyncExternalStore(subscribe, readTheme, readServerTheme);

  const toggleTheme = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    withViewTransition(() => applyTheme(next));
  }, []);

  return { theme, toggleTheme };
}
