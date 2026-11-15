import { ParticleField } from "@/components/animations/ParticleField";

/**
 * Hero background: two slow gradient glows, a faint engineering grid, and
 * a light particle field. Everything is decorative and non-interactive.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute start-[-18%] top-[-22%] size-[78vmin] animate-aurora-a rounded-full bg-[radial-gradient(closest-side,var(--aurora-1),transparent)] will-change-transform" />
      <div className="absolute end-[-20%] top-[6%] size-[88vmin] animate-aurora-b rounded-full bg-[radial-gradient(closest-side,var(--aurora-2),transparent)] will-change-transform" />
      <div className="bg-grid-fade absolute inset-0" />
      <ParticleField className="absolute inset-0 size-full" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-bg to-transparent" />
    </div>
  );
}
