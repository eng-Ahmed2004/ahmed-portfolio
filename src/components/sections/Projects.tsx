"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { FeaturedProject } from "@/components/ui/FeaturedProject";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
import { Section, SectionHeading } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { featuredProject, otherProjects } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/motion";
import { cn, externalLinkProps } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types";

type Filter = "all" | ProjectCategory;

/** Only categories that actually have projects get a filter button. */
const categoryOrder: readonly ProjectCategory[] = ["mobile", "ai-data", "web", "community"];
const filters: readonly Filter[] = [
  "all",
  ...categoryOrder.filter((category) =>
    otherProjects.some((project) => project.category === category),
  ),
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function Projects() {
  const { dict } = useI18n();
  const labels = dict.projects;
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? otherProjects
        : otherProjects.filter((project) => project.category === filter),
    [filter],
  );

  const open = useCallback((project: Project) => setSelected(project), []);
  const close = useCallback(() => setSelected(null), []);

  return (
    <Section id="projects">
      <SectionHeading
        sectionId="projects"
        index="03"
        eyebrow={labels.eyebrow}
        title={labels.title}
        description={labels.description}
      />

      {featuredProject ? (
        <div className="mt-12 lg:mt-16">
          <FeaturedProject project={featuredProject} onOpen={open} />
        </div>
      ) : null}

      <Reveal className="mt-14 lg:mt-20">
        <div
          role="group"
          aria-label={labels.filterLabel}
          className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {filters.map((item) => {
            const isActive = item === filter;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(item)}
                className={cn(
                  "h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-300 ease-settle active:scale-95",
                  isActive
                    ? "border-transparent bg-fg text-bg"
                    : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {labels.filters[item]}
              </button>
            );
          })}
        </div>
      </Reveal>

      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={filter}
          className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          exit="exit"
          viewport={{ once: true, amount: 0.05 }}
        >
          {visible.map((project) => (
            <m.li key={project.slug} variants={cardVariants}>
              <ProjectCard project={project} onOpen={open} />
            </m.li>
          ))}

          <m.li variants={cardVariants}>
            <a
              href={profile.socials.github}
              className="group relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-line-strong p-7 transition-[border-color,background-color,transform] duration-500 ease-settle hover:-translate-y-1.5 hover:border-accent/60 hover:bg-surface sm:p-8"
              {...externalLinkProps}
            >
              <span className="grid size-12 place-items-center rounded-2xl border border-line bg-surface text-fg">
                <GitHubIcon className="size-5" />
              </span>
              <span className="mt-10 block">
                <span className="block font-display text-2xl font-semibold text-fg">
                  {labels.moreTitle}
                </span>
                <span className="mt-3 block max-w-sm text-sm text-fg-muted">{labels.moreText}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-text">
                  {labels.moreCta}
                  <span className="sr-only">{dict.a11y.newTab}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="size-4 transition-transform duration-300 ease-settle group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                  />
                </span>
              </span>
            </a>
          </m.li>
        </m.ul>
      </AnimatePresence>

      <ProjectDialog project={selected} onClose={close} />
    </Section>
  );
}
