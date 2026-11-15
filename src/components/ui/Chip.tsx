import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small pill for technologies and tags. Technology names stay left-to-right. */
export function Chip({
  children,
  className,
  size = "sm",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-bg/60 text-fg-soft",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
