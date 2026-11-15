import type { Transition, Variants } from "framer-motion";

/** One easing curve for the whole site: quick start, long gentle settle. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = { duration: 0.7, ease: EASE };

/** Fade in while rising slightly. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** `fadeUp` that waits `delay` seconds first. */
export function fadeUpDelayed(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { ...baseTransition, delay } },
  };
}

/** Plain fade, for elements that should not move. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Fade in while scaling up a touch — used for imagery. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

/** `fade` that waits `delay` seconds first. */
export function fadeDelayed(delay: number): Variants {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6, ease: EASE, delay } },
  };
}

/** `scaleIn` that waits `delay` seconds first. */
export function scaleInDelayed(delay: number): Variants {
  return {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE, delay } },
  };
}

/** Parent variant that reveals its children one after another. */
export function staggerContainer(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

/** Shared viewport settings for scroll-triggered reveals. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
