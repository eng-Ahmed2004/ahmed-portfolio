import Image from "next/image";
import { useId } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { CoverPattern, Project } from "@/types";

interface ProjectCoverProps {
  project: Project;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * Cover art for a project. Uses the first real screenshot when there is
 * one; otherwise draws an abstract cover from the project's `cover`
 * settings, so no placeholder image files are needed.
 */
export function ProjectCover({
  project,
  alt,
  className,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: ProjectCoverProps) {
  const screenshot = project.screenshots?.[0];

  if (screenshot) {
    return (
      <div className={cn("absolute inset-0 bg-surface-hover", className)}>
        <Image
          src={screenshot.src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("absolute inset-0 overflow-hidden bg-surface-hover", className)}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_30%,var(--surface)),var(--surface)_52%,color-mix(in_srgb,var(--accent-2)_26%,var(--surface)))]"
        style={{ filter: `hue-rotate(${project.cover.hue}deg)` }}
      />
      <Pattern pattern={project.cover.pattern} />
      <div className="absolute inset-0 grid place-items-center">
        <span className="glass grid size-16 place-items-center rounded-2xl text-accent-text shadow-soft transition-transform duration-700 ease-settle group-hover:scale-110">
          <Icon name={project.cover.icon} className="size-7" />
        </span>
      </div>
    </div>
  );
}

/** Decorative line art; inherits its colour from the text colour. */
function Pattern({ pattern }: { pattern: CoverPattern }) {
  const id = useId();
  const common = {
    "aria-hidden": true,
    className: "absolute inset-0 size-full text-fg opacity-[0.11]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
  } as const;

  switch (pattern) {
    case "grid":
      return (
        <svg {...common}>
          <defs>
            <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} stroke="none" />
        </svg>
      );
    case "dots":
      return (
        <svg {...common}>
          <defs>
            <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.3" fill="currentColor" stroke="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} stroke="none" />
        </svg>
      );
    case "rings":
      return (
        <svg {...common} viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
          {[40, 80, 120, 160, 200, 240, 280].map((radius) => (
            <circle key={radius} cx="330" cy="200" r={radius} />
          ))}
        </svg>
      );
    case "waves":
      return (
        <svg {...common} viewBox="0 0 400 225" preserveAspectRatio="none">
          {[30, 62, 94, 126, 158, 190].map((y) => (
            <path key={y} d={`M0 ${y} C 70 ${y - 26}, 130 ${y + 26}, 200 ${y} S 330 ${y - 26}, 400 ${y}`} />
          ))}
        </svg>
      );
    case "nodes":
      return (
        <svg {...common} viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
          <path d="M40 60 120 30 210 90 300 40 370 110M40 60 90 150 210 90 280 180 370 110M90 150 180 200 280 180M120 30 210 90" />
          {[
            [40, 60],
            [120, 30],
            [210, 90],
            [300, 40],
            [370, 110],
            [90, 150],
            [280, 180],
            [180, 200],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" stroke="none" />
          ))}
        </svg>
      );
  }
}
