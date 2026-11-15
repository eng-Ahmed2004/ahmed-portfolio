"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";

/**
 * Client-side providers for the whole app.
 * - LazyMotion keeps the animation bundle small (use `m.*`, not `motion.*`).
 * - `reducedMotion="user"` drops transform animations for visitors who ask
 *   their system for less motion, keeping simple fades.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </I18nProvider>
  );
}
