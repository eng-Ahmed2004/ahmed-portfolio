import { flushSync } from "react-dom";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

/**
 * Runs a DOM-changing update inside a View Transition when the browser
 * supports it, so theme and language switches cross-fade instead of
 * snapping. Falls back to a plain update, and skips the animation for
 * visitors who prefer reduced motion.
 */
export function withViewTransition(update: () => void): void {
  const doc = document as ViewTransitionDocument;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || typeof doc.startViewTransition !== "function") {
    update();
    return;
  }

  // flushSync makes React commit before the browser captures the new state.
  doc.startViewTransition(() => flushSync(update));
}
