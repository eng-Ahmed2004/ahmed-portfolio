"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, fadeUpDelayed, staggerContainer, viewportOnce } from "@/lib/motion";

type BlockTag = "div" | "ul" | "ol" | "dl";
type ItemTag = "div" | "li" | "p" | "article";

const blocks = { div: m.div, ul: m.ul, ol: m.ol, dl: m.dl } as const;
const items = { div: m.div, li: m.li, p: m.p, article: m.article } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Seconds to wait before the default fade-up starts. */
  delay?: number;
  /** Custom variants; when given, `delay` is ignored. */
  variants?: Variants;
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ children, className, id, delay = 0, variants }: RevealProps) {
  return (
    <m.div
      id={id}
      className={className}
      variants={variants ?? (delay > 0 ? fadeUpDelayed(delay) : fadeUp)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </m.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: BlockTag;
  /** Seconds between each child. */
  stagger?: number;
  delay?: number;
  /** Fraction of the group that must be visible before it reveals. */
  amount?: number;
}

/** Reveals its <RevealItem> children one after another. */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
  amount = viewportOnce.amount,
}: RevealGroupProps) {
  const Component = blocks[as];
  return (
    <Component
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Component>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
  variants?: Variants;
}

/** A child of <RevealGroup>; inherits the group's timing. */
export function RevealItem({ children, className, as = "div", variants = fadeUp }: RevealItemProps) {
  const Component = items[as];
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
