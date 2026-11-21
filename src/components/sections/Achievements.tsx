"use client";

import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { achievements } from "@/data/highlights";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Achievements.
 * Privacy: the GPA / academic average is intentionally never shown.
 */
export function Achievements() {
  const { dict, t } = useI18n();

  return (
    <Section id="achievements" elevated>
      <SectionHeading
        sectionId="achievements"
        index="06"
        eyebrow={dict.achievements.eyebrow}
        title={dict.achievements.title}
      />

      <RevealGroup
        as="ul"
        stagger={0.1}
        className="mt-12 grid gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-0"
      >
        {achievements.map((achievement, index) => (
          <RevealItem
            as="li"
            key={achievement.id}
            className="group relative lg:border-s lg:border-line lg:px-8 lg:first:border-s-0 lg:first:ps-0 lg:last:pe-0"
          >
            <div className="flex items-center justify-between">
              <span className="bg-brand-gradient inline-grid size-14 rounded-2xl p-px">
                <span className="grid size-full place-items-center rounded-[calc(1rem-1px)] bg-bg-elevated text-accent-text transition-colors duration-500 group-hover:bg-surface">
                  <Icon name={achievement.icon} className="size-6" />
                </span>
              </span>
              <span dir="ltr" className="text-xs font-medium tabular-nums text-fg-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-fg">{t(achievement.title)}</h3>
            <p className="mt-3 text-sm text-fg-muted">{t(achievement.description)}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
