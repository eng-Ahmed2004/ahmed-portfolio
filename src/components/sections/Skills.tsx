"use client";

import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { skillCategories } from "@/data/skills";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/motion";

/** Chips rise in one after another, a little quicker than section content. */
const chipVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

export function Skills() {
  const { dict, t } = useI18n();

  return (
    <Section id="skills" elevated>
      <SectionHeading
        sectionId="skills"
        index="02"
        eyebrow={dict.skills.eyebrow}
        title={dict.skills.title}
        description={dict.skills.description}
      />

      <div className="mt-12 border-t border-line lg:mt-16">
        {skillCategories.map((category, index) => (
          <RevealGroup
            key={category.id}
            stagger={0.045}
            className="group grid gap-6 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
          >
            <RevealItem className="flex items-center gap-4 md:col-span-4 md:items-start">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent-text transition-[border-color,color,transform] duration-500 ease-settle group-hover:-translate-y-0.5 group-hover:border-accent/50">
                <Icon name={category.icon} className="size-5" />
              </span>
              <div>
                <p dir="ltr" className="text-xs font-medium tabular-nums text-fg-muted rtl:text-end">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-fg">{t(category.title)}</h3>
              </div>
            </RevealItem>

            <ul className="flex flex-wrap content-start gap-2.5 md:col-span-8">
              {category.skills.map((skill) => (
                <RevealItem as="li" key={skill.en} variants={chipVariants}>
                  {/* dir="auto" keeps names such as ".NET" intact in Arabic. */}
                  <span
                    dir="auto"
                    className="inline-flex items-center rounded-full border border-line bg-surface px-4 py-2 text-sm text-fg-soft transition-[border-color,color,transform,background-color] duration-300 ease-settle hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface-hover hover:text-fg"
                  >
                    {t(skill)}
                  </span>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        ))}
      </div>
    </Section>
  );
}
