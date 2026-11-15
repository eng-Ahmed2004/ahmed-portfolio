import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap select-none " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-settle " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-on-accent shadow-glow hover:-translate-y-0.5 hover:brightness-110",
  secondary:
    "glass text-fg hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-hover",
  ghost: "text-fg-soft hover:bg-surface-hover hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm sm:text-[0.95rem]",
};

interface SharedProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

/** Renders an <a> when `href` is given, otherwise a <button>. */
export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

/** Round icon-only link, used for social profiles. */
export function IconLink({
  label,
  className,
  children,
  ...rest
}: { label: string; className?: string; children: ReactNode } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children" | "aria-label"
>) {
  return (
    <a
      aria-label={label}
      className={cn(
        "glass grid size-12 shrink-0 place-items-center rounded-full text-fg-soft",
        "transition-[transform,color,border-color,background-color] duration-300 ease-settle",
        "hover:-translate-y-0.5 hover:border-line-strong hover:text-fg active:scale-95",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
