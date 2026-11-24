"use client";

import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { experience } from "@/data/experience";
import { useI18n } from "@/i18n/I18nProvider";

export function Experience() {
  const { dict, t } = useI18n();

  return (
    <Section id="experience" elevated>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              sectionId="experience"
              index="04"
              eyebrow={dict.experience.eyebrow}
              title={dict.experience.title}
              description={dict.experience.description}
            />
          </div>
        </div>

        <RevealGroup as="ol" stagger={0.14} amount={0.1} className="lg:col-span-8">
          {experience.map((item, index) => {
            const isLast = index === experience.length - 1;
            return (
              <RevealItem as="li" key={item.id} className="group relative ps-16 pb-12 last:pb-0 sm:ps-20">
                {/* Timeline rail and node */}
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="absolute start-[1.4375rem] top-14 bottom-2 w-px bg-line-strong sm:start-[1.6875rem]"
                  />
                ) : null}
                <span className="absolute start-0 top-0 grid size-12 place-items-center rounded-full border border-line bg-surface text-accent-text transition-[border-color,transform] duration-500 ease-settle group-hover:scale-105 group-hover:border-accent/60 sm:size-14">
                  <Icon name={item.icon} className="size-5 sm:size-6" />
                </span>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="font-mono text-xs text-accent-text sm:text-sm">{t(item.period)}</p>
                  {item.current ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 px-2.5 py-0.5 text-xs font-medium text-success">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
                      {dict.experience.current}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-2.5 text-xl font-semibold text-fg sm:text-2xl">{t(item.title)}</h3>
                <p className="mt-1 text-sm text-fg-soft sm:text-base">{t(item.organization)}</p>

                {item.highlight ? (
                  <p className="mt-4 border-s-2 border-accent ps-4 text-base font-medium text-fg sm:text-lg">
                    {t(item.highlight)}
                  </p>
                ) : null}

                <p className="mt-4 max-w-2xl text-sm text-fg-muted sm:text-base">
                  {t(item.description)}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag.en}>
                      <Chip>{t(tag)}</Chip>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
