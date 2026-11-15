import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** `sizes` hint for responsive loading. */
  sizes: string;
  className?: string;
}

/**
 * A screenshot inside a simple phone frame drawn with CSS. All dimensions
 * are relative, so the frame scales with whatever width it is given.
 */
export function PhoneMockup({ src, alt, width, height, sizes, className }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        // No `position` here on purpose: callers decide (absolute, relative, …).
        "rounded-[13.5%/6.4%] bg-device p-[2.8%] shadow-lift ring-1 ring-white/10",
        className,
      )}
    >
      <div
        className="relative overflow-hidden rounded-[11.5%/5.3%] bg-white"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="size-full object-cover object-top"
        />
        {/* Dynamic island */}
        <span
          aria-hidden="true"
          className="absolute top-[1.25%] left-1/2 h-[2.7%] w-[29%] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </div>
  );
}
