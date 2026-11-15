"use client";

import { CalendarDays, GraduationCap, MapPin, UserRound } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useI18n } from "@/i18n/I18nProvider";
import type { IconName } from "@/types";

/** Icons for the focus items, in the same order as `dict.about.focus`. */
const focusIcons: readonly IconName[] = ["graduationCap", "smartphone", "brain", "sparkles", "users"];

export function About() {
  const { dict } = useI18n();
  const { about } = dict;

  return (
    <Section id="about">
      <SectionHeading sectionId="about" index="01" eyebrow={about.eyebrow} title={about.title} />

      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="border-s-2 border-accent ps-6 font-display text-xl leading-relaxed font-light text-fg sm:text-2xl sm:leading-relaxed">
            {about.lead}
          </p>
        </Reveal>

        <RevealGroup className="space-y-5 text-base text-fg-muted sm:text-lg lg:col-span-7">
          {about.paragraphs.map((paragraph) => (
            <RevealItem as="p" key={paragraph}>
              {paragraph}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <RevealGroup
        as="ul"
        className="mt-16 grid gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5"
      >
        {about.focus.map((item, index) => (
          <RevealItem as="li" key={item.title}>
            <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-accent-text">
              <Icon name={focusIcons[index] ?? "sparkles"} className="size-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-fg">{item.title}</h3>
            <p className="mt-2 text-sm text-fg-muted">{item.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Education />
    </Section>
  );
}

/**
 * Education panel.
 * Privacy: the GPA / academic average is intentionally never shown.
 */
function Education() {
  const { dict } = useI18n();
  const { education } = dict;

  const facts = [
    { icon: MapPin, label: education.locationLabel, value: education.location },
    { icon: CalendarDays, label: education.graduationLabel, value: education.graduation },
    { icon: UserRound, label: education.statusLabel, value: education.status },
  ];

  return (
    <Reveal id="education" className="mt-16 scroll-mt-28 lg:mt-20">
      <article
        aria-labelledby="education-title"
        className="relative overflow-hidden rounded-3xl border border-line bg-surface"
      >
        <div aria-hidden="true" className="bg-brand-gradient absolute inset-x-0 top-0 h-px" />
        <div
          aria-hidden="true"
          className="absolute -end-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,var(--aurora-1),transparent)]"
        />

        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start lg:col-span-7">
            <span className="bg-brand-gradient grid size-14 shrink-0 place-items-center rounded-2xl text-on-accent shadow-glow">
              <GraduationCap aria-hidden="true" strokeWidth={1.6} className="size-7" />
            </span>
            <div>
              <p className="eyebrow">{education.eyebrow}</p>
              <h3
                id="education-title"
                className="heading-display mt-3 text-2xl text-fg sm:text-3xl"
              >
                {education.university}
              </h3>
              <p className="mt-3 text-base text-fg-soft sm:text-lg">{education.degree}</p>
            </div>
          </div>

          <dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:border-t-0 lg:border-s lg:ps-12 lg:pt-0">
            {facts.map(({ icon: FactIcon, label, value }) => (
              <div key={label} className="flex items-start gap-3.5">
                <FactIcon
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className="mt-0.5 size-[1.15rem] shrink-0 text-accent-text"
                />
                <div>
                  <dt className="text-xs text-fg-muted">{label}</dt>
                  <dd className="mt-0.5 font-medium text-fg">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </Reveal>
  );
}
