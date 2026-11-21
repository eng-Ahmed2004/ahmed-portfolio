import { Fragment } from "react";

/** Runs of Arabic script (letters, marks, presentation forms). */
const ARABIC_RUN = /([؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+(?:\s+[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+)*)/;

/**
 * Renders text that may mix scripts, e.g. "Tilqaa – تلقاء". Arabic runs get
 * `lang="ar"`: screen readers pronounce them correctly, and the global
 * `:lang(ar)` rule keeps heading tracking off them so letters stay joined.
 * (The Arabic typeface comes from the shared font stack, not from this span.)
 */
export function BidiText({ children }: { children: string }) {
  const parts = children.split(ARABIC_RUN);
  if (parts.length === 1) return children;

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} lang="ar">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
