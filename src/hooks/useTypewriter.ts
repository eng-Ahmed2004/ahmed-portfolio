"use client";

import { useEffect, useState } from "react";

interface TypewriterOptions {
  /** Milliseconds per typed letter (Latin text). */
  typeSpeed?: number;
  /** Milliseconds per deleted letter (Latin text). */
  deleteSpeed?: number;
  /** Milliseconds per typed word (Arabic text). */
  wordTypeSpeed?: number;
  /** Milliseconds per deleted word (Arabic text). */
  wordDeleteSpeed?: number;
  /** Pause once a phrase is fully typed. */
  holdTime?: number;
  /** When true the phrases swap whole instead of being typed. */
  instant?: boolean;
}

const ARABIC_SCRIPT = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

let segmenter: Intl.Segmenter | null | undefined;

/** Grapheme clusters, so an accent or mark is never separated from its letter. */
function graphemes(text: string): string[] {
  if (segmenter === undefined) {
    segmenter =
      typeof Intl !== "undefined" && "Segmenter" in Intl
        ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
        : null;
  }
  return segmenter ? Array.from(segmenter.segment(text), (part) => part.segment) : Array.from(text);
}

interface Parsed {
  /** The pieces that are revealed one at a time. */
  units: string[];
  /** True when the pieces are whole words rather than single letters. */
  byWord: boolean;
}

/**
 * Splits a phrase into the pieces the typewriter reveals.
 *
 * Arabic is revealed WORD by word, never letter by letter: a half-typed
 * Arabic word shows the wrong letter shapes (each new letter changes how the
 * previous one joins), so the connected script would visibly break apart
 * while typing. A whole word is always correctly joined.
 */
function parse(text: string): Parsed {
  if (ARABIC_SCRIPT.test(text)) {
    // A word keeps its trailing space, so a space never takes a step of its own.
    return { units: text.match(/\S+\s*/g) ?? [text], byWord: true };
  }
  return { units: graphemes(text), byWord: false };
}

/**
 * Types each phrase, pauses, deletes it, then moves to the next one.
 *
 * The first phrase is shown in full straight away, so the text is never
 * empty on first render. To restart with a new phrase list (for example
 * after a language switch), remount the component with a `key`.
 */
export function useTypewriter(
  words: readonly string[],
  {
    typeSpeed = 68,
    deleteSpeed = 34,
    wordTypeSpeed = 240,
    wordDeleteSpeed = 130,
    holdTime = 1700,
    instant = false,
  }: TypewriterOptions = {},
): string {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    if (words.length < 2) return;

    let timer: ReturnType<typeof setTimeout>;
    let index = 0;

    if (instant) {
      const swap = () => {
        index = (index + 1) % words.length;
        setText(words[index]);
        timer = setTimeout(swap, holdTime + 1300);
      };
      timer = setTimeout(swap, holdTime + 1300);
      return () => clearTimeout(timer);
    }

    const parsed = words.map(parse);
    let { units, byWord } = parsed[0];
    let count = units.length;
    let deleting = true;

    const show = () => setText(units.slice(0, count).join(""));

    const tick = () => {
      if (deleting) {
        count -= 1;
        show();
        if (count === 0) {
          deleting = false;
          index = (index + 1) % words.length;
          ({ units, byWord } = parsed[index]);
          timer = setTimeout(tick, 360);
        } else {
          timer = setTimeout(tick, byWord ? wordDeleteSpeed : deleteSpeed);
        }
        return;
      }

      count += 1;
      show();
      if (count === units.length) {
        deleting = true;
        timer = setTimeout(tick, holdTime);
      } else {
        timer = setTimeout(tick, byWord ? wordTypeSpeed : typeSpeed);
      }
    };

    timer = setTimeout(tick, holdTime);
    return () => clearTimeout(timer);
  }, [words, typeSpeed, deleteSpeed, wordTypeSpeed, wordDeleteSpeed, holdTime, instant]);

  return text;
}
