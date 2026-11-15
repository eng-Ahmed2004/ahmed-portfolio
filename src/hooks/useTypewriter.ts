"use client";

import { useEffect, useState } from "react";

interface TypewriterOptions {
  /** Milliseconds per typed character. */
  typeSpeed?: number;
  /** Milliseconds per deleted character. */
  deleteSpeed?: number;
  /** Pause once a word is fully typed. */
  holdTime?: number;
  /** When true the words swap whole instead of being typed. */
  instant?: boolean;
}

/**
 * Types each word, pauses, deletes it, then moves to the next one.
 * Works on Unicode code points so Arabic diacritics are never split.
 *
 * The first word is shown in full straight away, so the text is never
 * empty on first render. To restart with a new word list (for example
 * after a language switch), remount the component with a `key`.
 */
export function useTypewriter(
  words: readonly string[],
  { typeSpeed = 68, deleteSpeed = 34, holdTime = 1700, instant = false }: TypewriterOptions = {},
): string {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    if (words.length < 2) return;

    let timer: ReturnType<typeof setTimeout>;
    let wordIndex = 0;

    if (instant) {
      const swap = () => {
        wordIndex = (wordIndex + 1) % words.length;
        setText(words[wordIndex]);
        timer = setTimeout(swap, holdTime + 1300);
      };
      timer = setTimeout(swap, holdTime + 1300);
      return () => clearTimeout(timer);
    }

    let chars = Array.from(words[0]);
    let count = chars.length;
    let deleting = true;

    const tick = () => {
      if (deleting) {
        count -= 1;
        setText(chars.slice(0, count).join(""));
        if (count === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          chars = Array.from(words[wordIndex]);
          timer = setTimeout(tick, 360);
        } else {
          timer = setTimeout(tick, deleteSpeed);
        }
        return;
      }

      count += 1;
      setText(chars.slice(0, count).join(""));
      if (count === chars.length) {
        deleting = true;
        timer = setTimeout(tick, holdTime);
      } else {
        timer = setTimeout(tick, typeSpeed);
      }
    };

    timer = setTimeout(tick, holdTime);
    return () => clearTimeout(timer);
  }, [words, typeSpeed, deleteSpeed, holdTime, instant]);

  return text;
}
