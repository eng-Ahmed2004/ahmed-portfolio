"use client";

import { ArrowRight, ExternalLink, Lock } from "lucide-react";
import { BidiText } from "@/components/ui/BidiText";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Chip } from "@/components/ui/Chip";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { useI18n } from "@/i18n/I18nProvider";
import { externalLinkProps } from "@/lib/utils";
import type { Project } from "@/types";

const VISIBLE_TECH = 4;

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { dict, t } = useI18n();
  const labels = dict.projects;
  const title = t(project.title);
  const hiddenTech = project.technologies.length - VISIBLE_TECH;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-[transform,box-shadow,border-color] duration-500 ease-settle hover:-translate-y-1.5 hover:border-line-strong hover:shadow-lift">
      <div className="relative aspect-[2/1] overflow-hidden">
        <ProjectCover
          project={project}
          alt={title}
          className="transition-transform duration-700 ease-settle group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent"
        />
        <div className="absolute start-4 top-4 flex flex-wrap gap-2">
          <span className="glass rounded-full px-3 py-1 text-xs font-medium text-fg">
            {labels.filters[project.category]}
          </span>
          {project.badge ? (
            <span className="glass rounded-full px-3 py-1 text-xs font-medium text-accent-2-text">
              {t(project.badge)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs text-fg-muted">{t(project.context)}</p>
        <h3 className="mt-2 text-xl font-semibold text-fg">
          <BidiText>{title}</BidiText>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm text-fg-muted">{t(project.description)}</p>

        <p className="mt-5 text-sm text-fg-soft">
          <span className="text-fg-muted">{labels.role}: </span>
          {project.role
            .slice(0, 2)
            .map((item) => t(item))
            .join(" · ")}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={labels.technologies}>
          {project.technologies.slice(0, VISIBLE_TECH).map((technology) => (
            <li key={technology}>
              <Chip>
                <span dir="ltr">{technology}</span>
              </Chip>
            </li>
          ))}
          {hiddenTech > 0 ? (
            <li>
              <Chip className="text-fg-muted">
                <span dir="ltr">+{hiddenTech}</span>
              </Chip>
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/link -ms-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-medium text-accent-text transition-colors duration-300 hover:text-fg"
          >
            {labels.viewDetails}
            <span className="sr-only">: {title}</span>
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.8}
              className="size-4 transition-transform duration-300 ease-settle group-hover/link:translate-x-1 rtl:-scale-x-100 rtl:group-hover/link:-translate-x-1"
            />
          </button>

          <div className="flex items-center gap-1">
            {project.links.github ? (
              <a
                href={project.links.github}
                aria-label={`${labels.sourceCode}: ${title} ${dict.a11y.newTab}`}
                className="grid size-11 place-items-center rounded-full text-fg-muted transition-[color,background-color,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:bg-surface-hover hover:text-fg"
                {...externalLinkProps}
              >
                <GitHubIcon className="size-[1.15rem]" />
              </a>
            ) : null}
            {project.links.live ? (
              <a
                href={project.links.live}
                aria-label={`${labels.liveDemo}: ${title} ${dict.a11y.newTab}`}
                className="grid size-11 place-items-center rounded-full text-fg-muted transition-[color,background-color,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:bg-surface-hover hover:text-fg"
                {...externalLinkProps}
              >
                <ExternalLink aria-hidden="true" strokeWidth={1.7} className="size-[1.15rem]" />
              </a>
            ) : null}
            {project.privateRepo ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
                <Lock aria-hidden="true" strokeWidth={1.7} className="size-3.5" />
                {labels.privateRepo}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
