import { profile } from "@/data/profile";
import type { ContactFormValues } from "@/types";

/**
 * Contact form delivery.
 *
 * The form is ready for Formspree (https://formspree.io):
 *   1. Create a form there with ahmadsrour537@gmail.com as the recipient.
 *   2. Put its endpoint in NEXT_PUBLIC_FORMSPREE_ENDPOINT
 *      (e.g. https://formspree.io/f/abcdwxyz) in .env.local and on Vercel.
 *
 * A Formspree endpoint is a public form id, not a secret, so it is safe in
 * client code. Never put private API keys in NEXT_PUBLIC_* variables.
 *
 * Until an endpoint is set, the form does NOT pretend to send anything: it
 * opens the visitor's email app with the message pre-filled instead.
 */
const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ?? "";

export const isContactServiceConfigured = /^https:\/\/formspree\.io\/f\/[\w-]+$/.test(endpoint);

export type FieldErrors = Partial<Record<keyof ContactFormValues, true>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns the set of invalid fields (empty object when everything is valid). */
export function validateContact(values: ContactFormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = true;
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = true;
  if (values.subject.trim().length < 3) errors.subject = true;
  if (values.message.trim().length < 10) errors.message = true;
  return errors;
}

/** Sends the message through Formspree. Resolves to true on success. */
export async function sendContactMessage(values: ContactFormValues): Promise<boolean> {
  if (!isContactServiceConfigured) return false;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        _subject: values.subject.trim(),
        message: values.message.trim(),
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/** Builds a mailto: link with the message pre-filled. */
export function buildMailtoLink(values?: ContactFormValues): string {
  const address = `mailto:${profile.email}`;
  if (!values) return address;

  const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
  const query = `subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
  return `${address}?${query}`;
}
