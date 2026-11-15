"use client";

import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { exploring } from "@/data/highlights";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/motion";

const pillVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

/** Three small bars that pulse like a live signal. */
function Signal({ offset }: { offset: number }) {
  return (
    <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className="h-full w-[3px] origin-bottom animate-signal rounded-full bg-accent-2"
          style={{ animationDelay: `${-(offset * 0.23 + bar * 0.28)}s` }}
        />
      ))}
    </span>
  );
}

export function Exploring() {
  const { dict, t } = useI18n();

  return (
    <Section id="exploring" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--aurora-1),transparent)]"
      />

      <div className="relative">
        <SectionHeading
          sectionId="exploring"
          index="07"
          eyebrow={dict.exploring.eyebrow}
          title={dict.exploring.title}
          description={dict.exploring.description}
          align="center"
        />

        <RevealGroup
          as="ul"
          stagger={0.09}
          className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3 sm:gap-4 lg:mt-14"
        >
          {exploring.map((item, index) => (
            <RevealItem as="li" key={item.id} variants={pillVariants}>
              <span className="glass group flex items-center gap-3.5 rounded-full py-3 ps-3 pe-6 transition-[transform,border-color] duration-500 ease-settle hover:-translate-y-1 hover:border-accent/50 sm:py-3.5">
                <span className="grid size-10 place-items-center rounded-full bg-accent/12 text-accent-text">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <span className="font-display text-base font-medium text-fg sm:text-lg">
                  {t(item.title)}
                </span>
                <Signal offset={index} />
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
