"use client";

import { ArrowUpRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { certifications } from "@/data/certifications";
import { useI18n } from "@/i18n/I18nProvider";
import { fade } from "@/lib/motion";
import { cn, externalLinkProps } from "@/lib/utils";

export function Certifications() {
  const { dict, t } = useI18n();

  return (
    <Section id="certifications">
      <SectionHeading
        sectionId="certifications"
        index="05"
        eyebrow={dict.certifications.eyebrow}
        title={dict.certifications.title}
        description={dict.certifications.description}
      />

      {/* A hairline grid: the 1px gaps reveal the line colour behind the cells. */}
      <RevealGroup
        as="ul"
        stagger={0.06}
        amount={0.1}
        className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:mt-16"
      >
        {certifications.map((certification, index) => (
          <RevealItem
            as="li"
            key={certification.id}
            variants={fade}
            className={cn(
              "group relative flex items-start gap-5 bg-bg p-6 transition-colors duration-500 hover:bg-surface sm:p-8 md:last:odd:col-span-2",
              // Linked cards show the keyboard focus ring around the whole card.
              certification.verifyUrl &&
                "has-[a:focus-visible]:bg-surface has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-2 has-[a:focus-visible]:outline-accent",
            )}
          >
            {certification.image ? (
              <Image
                src={certification.image}
                alt=""
                width={96}
                height={72}
                className="h-[4.5rem] w-24 shrink-0 rounded-xl border border-line object-cover"
              />
            ) : (
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent-text transition-[border-color,transform] duration-500 ease-settle group-hover:-translate-y-0.5 group-hover:border-accent/50">
                <BadgeCheck aria-hidden="true" strokeWidth={1.6} className="size-5" />
              </span>
            )}

            <div className="min-w-0 flex-1">
              <p dir="ltr" className="font-mono text-xs text-fg-muted rtl:text-end">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-fg">
                {t(certification.name)}
              </h3>
              <p className="mt-1.5 text-sm text-fg-muted">
                {certification.issuer ? (
                  <>
                    <span className="font-medium text-fg-soft">{t(certification.issuer)}</span>
                    <span aria-hidden="true" className="mx-2">
                      ·
                    </span>
                  </>
                ) : null}
                {t(certification.topic)}
              </p>

              {certification.verifyUrl ? (
                // Stretched link: the ::after layer covers the whole card, so
                // clicking anywhere on it opens the certificate page.
                <a
                  href={certification.verifyUrl}
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent-text transition-colors duration-300 group-hover:text-fg after:absolute after:inset-0 focus-visible:outline-none"
                  {...externalLinkProps}
                >
                  {dict.certifications.verify}
                  <span className="sr-only">
                    {" — "}
                    {t(certification.name)} {dict.a11y.newTab}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="size-4 transition-transform duration-300 ease-settle group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                  />
                </a>
              ) : null}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
