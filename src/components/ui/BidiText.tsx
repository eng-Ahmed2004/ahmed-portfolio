import { Fragment } from "react";

/** Runs of Arabic script (letters, marks, presentation forms). */
const ARABIC_RUN = /([؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+(?:\s+[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+)*)/;

/**
 * Renders text that may mix scripts, e.g. "Tilqaa – تلقاء". Arabic runs get
 * `lang="ar"` and the Arabic typeface, so they look right inside English
 * copy and are announced correctly by screen readers.
 */
export function BidiText({ children }: { children: string }) {
  const parts = children.split(ARABIC_RUN);
  if (parts.length === 1) return children;

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} lang="ar" className="font-arabic">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
