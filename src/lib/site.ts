/**
 * Canonical site URL, used for metadata, the sitemap, and robots.txt.
 *
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists. On Vercel the
 * production URL is picked up automatically when the variable is not set.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** Browser UI colours that match each theme's page background. */
export const themeColors = {
  dark: "#080b14",
  light: "#f5f7fb",
} as const;
