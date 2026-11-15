/** Joins class names, skipping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Props for a link that opens in a new tab safely. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
