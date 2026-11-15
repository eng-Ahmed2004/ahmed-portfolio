"use client";

import { useReducedMotion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: readonly string[];
  className?: string;
}

/**
 * Rotating typed text with a blinking caret. The animated text is hidden
 * from assistive technology; screen readers get the full list once instead.
 */
export function Typewriter({ words, className }: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const text = useTypewriter(words, { instant: Boolean(reduceMotion) });

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="ms-1 inline-block h-[1.15em] w-[2px] shrink-0 animate-caret rounded-full bg-accent"
      />
    </span>
  );
}
