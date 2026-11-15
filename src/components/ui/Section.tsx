import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Slightly raised background, used to give the page a rhythm. */
  elevated?: boolean;
}

export function Section({ id, children, className, elevated = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative py-20 sm:py-24 lg:py-32",
        elevated && "border-y border-line bg-bg-elevated",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  /** Id of the parent section; the heading id is derived from it. */
  sectionId: string;
  /** Two-digit position marker, e.g. "01". */
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}

export function SectionHeading({
  sectionId,
  index,
  eyebrow,
  title,
  description,
  align = "start",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={cn("max-w-2xl", centered && "mx-auto text-center")}>
      <p className={cn("eyebrow flex items-center gap-3", centered && "justify-center")}>
        <span className="text-fg-muted" dir="ltr">
          {index}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        <span>{eyebrow}</span>
      </p>
      <h2
        id={`${sectionId}-title`}
        className="heading-display mt-5 text-3xl text-fg sm:text-4xl lg:text-[2.9rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base text-fg-muted sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
