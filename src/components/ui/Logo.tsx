import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/** The "AS" monogram. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("bg-brand-gradient inline-grid size-10 shrink-0 rounded-xl p-px", className)}
    >
      <span
        dir="ltr"
        className="grid size-full place-items-center rounded-[calc(0.75rem-1px)] bg-bg font-display text-xs font-bold text-fg"
      >
        {profile.initials}
      </span>
    </span>
  );
}
