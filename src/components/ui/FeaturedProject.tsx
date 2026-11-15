"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { BidiText } from "@/components/ui/BidiText";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { useI18n } from "@/i18n/I18nProvider";
import type { Project } from "@/types";

interface FeaturedProjectProps {
  project: Project;
  onOpen: (project: Project) => void;
}

/** The large showcase for the featured project. */
export function FeaturedProject({ project, onOpen }: FeaturedProjectProps) {
  const { dict, t } = useI18n();
  const labels = dict.projects;
  const title = t(project.title);
  const [center, left, right] = project.screenshots ?? [];

  return (
    <Reveal>
      <article
        aria-labelledby={`project-${project.slug}`}
        className="group relative overflow-hidden rounded-[2rem] border border-line bg-surface"
      >
        {/* Backdrop: brand glows and a faint grid, all decorative. */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute -end-32 -top-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--aurora-2),transparent)]" />
          <div className="absolute -start-40 -bottom-48 size-[32rem] rounded-full bg-[radial-gradient(closest-side,var(--aurora-1),transparent)]" />
          <div className="bg-grid-fade absolute inset-0" />
          <div className="bg-brand-gradient absolute inset-x-0 top-0 h-px" />
        </div>

        <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-14">
          <div className="lg:col-span-6">
            <p className="eyebrow flex items-center gap-2.5">
              <Sparkles aria-hidden="true" strokeWidth={1.7} className="size-4" />
              {labels.featured}
            </p>

            <h3
              id={`project-${project.slug}`}
              className="heading-display mt-5 text-3xl text-fg sm:text-4xl lg:text-5xl"
            >
              <BidiText>{title}</BidiText>
            </h3>
            <p className="mt-3 font-mono text-xs text-fg-muted sm:text-sm">{t(project.context)}</p>

            <p className="mt-6 text-base text-fg-soft sm:text-lg">{t(project.description)}</p>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-fg">{labels.role}</h4>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {project.role.map((item) => (
                  <li key={item.en} className="flex items-start gap-2.5 text-sm text-fg-soft">
                    <Check
                      aria-hidden="true"
                      strokeWidth={2}
                      className="mt-1 size-4 shrink-0 text-accent-2-text"
                    />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label={labels.technologies}>
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <Chip>
                    <span dir="ltr">{technology}</span>
                  </Chip>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button onClick={() => onOpen(project)}>
                {labels.viewDetails}
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="size-[1.1rem] transition-transform duration-300 ease-settle group-hover/btn:translate-x-1 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-1"
                />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            {center ? (
              // A fan of three phones. Positions are physical on purpose so
              // the composition stays symmetrical in both directions.
              <div dir="ltr" className="relative mx-auto flex w-full max-w-md items-center justify-center py-4">
                {left ? (
                  <PhoneMockup
                    src={left.src}
                    alt={t(left.alt)}
                    width={left.width}
                    height={left.height}
                    sizes="(min-width: 1024px) 190px, 34vw"
                    className="absolute left-0 w-[40%] -rotate-6 opacity-90 transition-transform duration-700 ease-settle group-hover:-translate-x-2 group-hover:-rotate-[8deg]"
                  />
                ) : null}
                {right ? (
                  <PhoneMockup
                    src={right.src}
                    alt={t(right.alt)}
                    width={right.width}
                    height={right.height}
                    sizes="(min-width: 1024px) 190px, 34vw"
                    className="absolute right-0 w-[40%] rotate-6 opacity-90 transition-transform duration-700 ease-settle group-hover:translate-x-2 group-hover:rotate-[8deg]"
                  />
                ) : null}
                <PhoneMockup
                  src={center.src}
                  alt={t(center.alt)}
                  width={center.width}
                  height={center.height}
                  sizes="(min-width: 1024px) 240px, 46vw"
                  className="relative z-10 w-[50%] transition-transform duration-700 ease-settle group-hover:-translate-y-2"
                />
              </div>
            ) : (
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line">
                <ProjectCover project={project} alt={title} />
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
