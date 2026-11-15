"use client";

import { AnimatePresence, m } from "framer-motion";
import { Mail } from "lucide-react";
import { useEffect } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { IconLink } from "@/components/ui/Button";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/motion";
import { cn, externalLinkProps } from "@/lib/utils";
import type { SectionId } from "@/types";

interface MobileMenuProps {
  open: boolean;
  active: SectionId;
  onClose: () => void;
}

/** Full-screen navigation for small screens. */
export function MobileMenu({ open, active, onClose }: MobileMenuProps) {
  const { dict, t } = useI18n();

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const main = document.getElementById("main");
    const footer = document.getElementById("site-footer");
    const previousOverflow = root.style.overflow;

    // Lock the page behind the menu and take it out of the tab order.
    root.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    // Close if the viewport grows to the desktop layout.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpoint = () => {
      if (desktop.matches) onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          id="mobile-menu"
          key="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-glass-strong backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <nav
            aria-label={dict.a11y.mobileNav}
            className="container-page flex flex-1 flex-col justify-center overflow-y-auto pt-24 pb-6"
          >
            <m.ul
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
              }}
            >
              {navigation.map((item, index) => (
                <m.li
                  key={item.id}
                  className="border-b border-line"
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={onClose}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 py-4 font-display text-2xl font-medium transition-colors duration-300",
                      active === item.id ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    <span dir="ltr" className="w-7 font-mono text-xs text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {t(item.label)}
                  </a>
                </m.li>
              ))}
            </m.ul>
          </nav>

          <m.div
            className="container-page flex items-center gap-3 pb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          >
            <IconLink href={profile.socials.github} label={dict.a11y.github} {...externalLinkProps}>
              <GitHubIcon className="size-5" />
            </IconLink>
            <IconLink
              href={profile.socials.linkedin}
              label={dict.a11y.linkedin}
              {...externalLinkProps}
            >
              <LinkedInIcon className="size-5" />
            </IconLink>
            <IconLink href={`mailto:${profile.email}`} label={dict.contact.emailMe}>
              <Mail aria-hidden="true" strokeWidth={1.7} className="size-5" />
            </IconLink>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
