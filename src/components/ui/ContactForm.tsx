"use client";

import { CircleAlert, CircleCheck, Info, LoaderCircle, Send } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";
import {
  buildMailtoLink,
  isContactServiceConfigured,
  sendContactMessage,
  validateContact,
  type FieldErrors,
} from "@/lib/contact";
import { cn } from "@/lib/utils";
import type { ContactFormValues } from "@/types";

type Status = "idle" | "sending" | "success" | "error" | "mailto";
type FieldName = keyof ContactFormValues;

const emptyValues: ContactFormValues = { name: "", email: "", subject: "", message: "" };
const fieldOrder: readonly FieldName[] = ["name", "email", "subject", "message"];

const inputClasses =
  "w-full rounded-2xl border bg-bg/60 px-4 py-3 text-base text-fg placeholder:text-fg-muted/70 " +
  "transition-[border-color,box-shadow,background-color] duration-300 " +
  "focus:border-accent focus:bg-bg focus:outline-none focus:ring-4 focus:ring-accent/15";

export function ContactForm() {
  const { dict } = useI18n();
  const copy = dict.contact.form;
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<ContactFormValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };

  const validateField = (field: FieldName) => {
    const result = validateContact(values);
    setErrors((current) => ({ ...current, [field]: result[field] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const result = validateContact(values);
    setErrors(result);
    const firstInvalid = fieldOrder.find((field) => result[field]);
    if (firstInvalid) {
      setStatus("idle");
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Spam trap: real visitors never fill the hidden field.
    const honeypot = new FormData(event.currentTarget).get("company");
    if (typeof honeypot === "string" && honeypot.length > 0) return;

    if (!isContactServiceConfigured) {
      // No email service yet — hand the message to the visitor's email app.
      window.location.href = buildMailtoLink(values);
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    const sent = await sendContactMessage(values);
    if (sent) {
      setValues(emptyValues);
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const field = (name: FieldName) => {
    const invalid = Boolean(errors[name]);
    return {
      id: `${formId}-${name}`,
      name,
      value: values[name],
      required: true,
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? `${formId}-${name}-error` : undefined,
      onBlur: () => {
        if (values[name]) validateField(name);
      },
      className: cn(inputClasses, invalid ? "border-danger" : "border-line"),
    };
  };

  const errorMessage = (name: FieldName) =>
    errors[name] ? (
      <p
        id={`${formId}-${name}-error`}
        className="mt-2 flex items-start gap-1.5 text-sm text-danger"
      >
        <CircleAlert aria-hidden="true" strokeWidth={1.8} className="mt-0.5 size-4 shrink-0" />
        {copy.errors[name]}
      </p>
    ) : null;

  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${formId}-title`}
      className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-9"
    >
      <div aria-hidden="true" className="bg-brand-gradient absolute inset-x-0 top-0 h-px" />

      <h3 id={`${formId}-title`} className="text-xl font-semibold text-fg">
        {copy.title}
      </h3>

      {!isContactServiceConfigured ? (
        <p className="mt-4 flex items-start gap-2.5 rounded-2xl border border-line bg-bg/60 p-4 text-sm text-fg-muted">
          <Info aria-hidden="true" strokeWidth={1.7} className="mt-0.5 size-4 shrink-0 text-accent-text" />
          {copy.mailtoNotice}
        </p>
      ) : null}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="mb-2 block text-sm font-medium text-fg-soft">
            {copy.name}
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            onChange={(event) => update("name", event.target.value)}
            {...field("name")}
          />
          {errorMessage("name")}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="mb-2 block text-sm font-medium text-fg-soft">
            {copy.email}
          </label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            placeholder={copy.emailPlaceholder}
            onChange={(event) => update("email", event.target.value)}
            {...field("email")}
            className={cn(field("email").className, "rtl:text-end")}
          />
          {errorMessage("email")}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${formId}-subject`}
            className="mb-2 block text-sm font-medium text-fg-soft"
          >
            {copy.subject}
          </label>
          <input
            type="text"
            placeholder={copy.subjectPlaceholder}
            onChange={(event) => update("subject", event.target.value)}
            {...field("subject")}
          />
          {errorMessage("subject")}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${formId}-message`}
            className="mb-2 block text-sm font-medium text-fg-soft"
          >
            {copy.message}
          </label>
          <textarea
            rows={5}
            placeholder={copy.messagePlaceholder}
            onChange={(event) => update("message", event.target.value)}
            {...field("message")}
            className={cn(field("message").className, "min-h-36 resize-y")}
          />
          {errorMessage("message")}
        </div>

        {/* Honeypot — hidden from people and assistive technology. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor={`${formId}-company`}>Company</label>
          <input id={`${formId}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={sending} className="w-full sm:w-auto">
          {sending ? (
            <LoaderCircle aria-hidden="true" strokeWidth={1.8} className="size-[1.1rem] animate-spin" />
          ) : (
            <Send
              aria-hidden="true"
              strokeWidth={1.8}
              className="size-[1.1rem] transition-transform duration-300 ease-settle group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100"
            />
          )}
          {sending ? copy.sending : isContactServiceConfigured ? copy.submit : copy.submitMailto}
        </Button>

        {/* Live region: announces the outcome to screen readers. */}
        <div role="status" aria-live="polite" className="min-h-6 flex-1 text-sm">
          {status === "success" ? (
            <p className="flex items-start gap-2 text-success">
              <CircleCheck aria-hidden="true" strokeWidth={1.8} className="mt-0.5 size-4 shrink-0" />
              {copy.success}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="flex items-start gap-2 text-danger">
              <CircleAlert aria-hidden="true" strokeWidth={1.8} className="mt-0.5 size-4 shrink-0" />
              {copy.failure}
            </p>
          ) : null}
          {status === "mailto" ? (
            <p className="flex items-start gap-2 text-fg-soft">
              <Info aria-hidden="true" strokeWidth={1.8} className="mt-0.5 size-4 shrink-0 text-accent-text" />
              {copy.mailtoOpened}
            </p>
          ) : null}
          {status === "idle" && Object.values(errors).some(Boolean) ? (
            <p className="flex items-start gap-2 text-danger">
              <CircleAlert aria-hidden="true" strokeWidth={1.8} className="mt-0.5 size-4 shrink-0" />
              {copy.errors.summary}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
