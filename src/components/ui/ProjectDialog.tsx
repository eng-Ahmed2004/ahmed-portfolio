"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, ExternalLink, Lock, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { BidiText } from "@/components/ui/BidiText";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/motion";
import { externalLinkProps } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectDialogProps {
  /** The project to show, or null when the dialog is closed. */
  project: Project | null;
  onClose: () => void;
}

/**
 * Project details in a native modal <dialog>, which provides the focus
 * trap, Escape handling, and focus restoration. Framer Motion animates the
 * panel; the element is only closed once the exit animation has finished.
 */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;

    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        // Escape: run the exit animation instead of closing instantly.
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0"
    >
      <AnimatePresence onExitComplete={() => dialogRef.current?.close()}>
        {project ? (
          <m.div
            key={project.slug}
            className="flex size-full items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <div
              aria-hidden="true"
              onClick={onClose}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            />
            <m.div
              className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-lift sm:max-h-[88dvh] sm:rounded-3xl"
              initial={{ y: 28, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <DialogContent project={project} onClose={onClose} />
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  );
}

function DialogContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const { dict, t } = useI18n();
  const labels = dict.projects;
  const title = t(project.title);
  const screenshots = project.screenshots ?? [];
  const hasLinks = Boolean(project.links.github || project.links.live || project.privateRepo);

  return (
    <>
      <header className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-7">
        <div>
          <p className="font-mono text-xs text-fg-muted">{t(project.context)}</p>
          <h2
            id="project-dialog-title"
            className="heading-display mt-2 text-2xl text-fg sm:text-3xl"
          >
            <BidiText>{title}</BidiText>
          </h2>
          {project.badge ? (
            <p className="mt-3">
              <Chip className="border-accent-2/40 text-accent-2-text">{t(project.badge)}</Chip>
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.a11y.close}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-fg-soft transition-[background-color,color,transform] duration-300 ease-settle hover:bg-surface-hover hover:text-fg active:scale-90"
        >
          <X aria-hidden="true" strokeWidth={1.7} className="size-5" />
        </button>
      </header>

      <div className="overflow-y-auto overscroll-contain">
        {screenshots.length > 0 ? (
          <section aria-label={labels.screens} className="border-b border-line bg-bg-elevated">
            <ul className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 py-7 sm:px-7">
              {screenshots.map((shot) => (
                <li key={shot.src} className="w-40 shrink-0 snap-center sm:w-48">
                  <PhoneMockup
                    src={shot.src}
                    alt={t(shot.alt)}
                    width={shot.width}
                    height={shot.height}
                    sizes="200px"
                  />
                </li>
              ))}
            </ul>
            {project.slug === "tilqaa" ? (
              <p className="px-5 pb-5 text-xs text-fg-muted sm:px-7">{labels.screensNote}</p>
            ) : null}
          </section>
        ) : (
          <div className="group relative aspect-[21/8] border-b border-line">
            <ProjectCover project={project} alt={title} sizes="(min-width: 768px) 768px, 100vw" />
          </div>
        )}

        <div className="space-y-9 p-5 sm:p-7">
          <p className="text-base text-fg-soft sm:text-lg">{t(project.description)}</p>

          <div className="grid gap-9 sm:grid-cols-2">
            <DetailList title={labels.role} items={project.role.map((item) => t(item))} />
            {project.highlights && project.highlights.length > 0 ? (
              <DetailList
                title={labels.highlights[project.highlightsKind ?? "features"]}
                items={project.highlights.map((item) => t(item))}
              />
            ) : null}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-fg">{labels.technologies}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <Chip>
                    <span dir="ltr">{technology}</span>
                  </Chip>
                </li>
              ))}
            </ul>
          </div>

          {hasLinks ? (
            <div className="flex flex-wrap items-center gap-3 border-t border-line pt-7">
              {project.links.github ? (
                <Button href={project.links.github} variant="secondary" {...externalLinkProps}>
                  <GitHubIcon className="size-[1.1rem]" />
                  {labels.sourceCode}
                  <span className="sr-only">{dict.a11y.newTab}</span>
                </Button>
              ) : null}
              {project.links.live ? (
                <Button href={project.links.live} {...externalLinkProps}>
                  {labels.liveDemo}
                  <ExternalLink aria-hidden="true" strokeWidth={1.8} className="size-[1.1rem]" />
                  <span className="sr-only">{dict.a11y.newTab}</span>
                </Button>
              ) : null}
              {project.privateRepo ? (
                <p className="inline-flex items-center gap-2 text-sm text-fg-muted">
                  <Lock aria-hidden="true" strokeWidth={1.7} className="size-4" />
                  {labels.privateRepo}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

function DetailList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-fg">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-fg-soft">
            <Check
              aria-hidden="true"
              strokeWidth={2}
              className="mt-1 size-4 shrink-0 text-accent-2-text"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
