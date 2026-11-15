"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

const sectionIds: readonly SectionId[] = navigation.map((item) => item.id);

export function Navbar() {
  const { dict, t, locale } = useI18n();
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="bg-brand-gradient sr-only rounded-full px-5 py-2.5 text-sm font-medium text-on-accent focus-visible:not-sr-only focus-visible:absolute focus-visible:start-4 focus-visible:top-4 focus-visible:z-[60]"
      >
        {dict.a11y.skipToContent}
      </a>

      <ScrollProgress />

      <div className="container-page pt-3">
        <div
          className={cn(
            "relative z-50 flex h-14 items-center justify-between gap-2 rounded-2xl border ps-2.5 pe-1.5",
            "transition-[background-color,border-color,box-shadow] duration-500 ease-settle",
            scrolled || menuOpen
              ? "glass shadow-soft"
              : "border-transparent bg-transparent",
          )}
        >
          <a
            href="#home"
            onClick={closeMenu}
            aria-label={dict.a11y.homeLink}
            className="group flex items-center gap-3 rounded-xl"
          >
            <Logo className="transition-transform duration-500 ease-settle group-hover:rotate-[-6deg] group-hover:scale-105" />
            <span className="hidden font-display text-sm font-semibold text-fg sm:block">
              {t(profile.shortName)}
            </span>
          </a>

          <DesktopNav active={active} label={dict.a11y.mainNav} locale={locale} />

          <div className="flex items-center gap-0.5">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
              className="grid size-11 place-items-center rounded-full text-fg-soft transition-[background-color,color,transform] duration-300 ease-settle hover:bg-surface-hover hover:text-fg active:scale-90 lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" strokeWidth={1.7} className="size-5" />
              ) : (
                <Menu aria-hidden="true" strokeWidth={1.7} className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} active={active} onClose={closeMenu} />
    </header>
  );
}

/** Thin reading-progress line across the very top of the page. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-brand-gradient absolute inset-x-0 top-0 z-[55] h-0.5 origin-left rtl:origin-right"
    />
  );
}

interface IndicatorBox {
  left: number;
  width: number;
}

/** Desktop links with a pill that slides to the active section. */
function DesktopNav({
  active,
  label,
  locale,
}: {
  active: SectionId;
  label: string;
  locale: string;
}) {
  const { t } = useI18n();
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef(new Map<SectionId, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState<IndicatorBox | null>(null);

  const measure = useCallback(() => {
    const link = linkRefs.current.get(active);
    if (!link) return;
    setIndicator({ left: link.offsetLeft, width: link.offsetWidth });
  }, [active]);

  // Re-measure when the active link, language, fonts, or layout width change.
  useEffect(() => {
    measure();
    const list = listRef.current;
    if (!list) return;

    const observer = new ResizeObserver(measure);
    observer.observe(list);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => observer.disconnect();
  }, [measure, locale]);

  const links = useMemo(
    () =>
      navigation.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            ref={(element) => {
              if (element) linkRefs.current.set(item.id, element);
              else linkRefs.current.delete(item.id);
            }}
            aria-current={active === item.id ? "true" : undefined}
            className={cn(
              "relative z-10 block rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
              active === item.id ? "text-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            {t(item.label)}
          </a>
        </li>
      )),
    [active, t],
  );

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul ref={listRef} className="relative flex items-center">
        {indicator ? (
          <m.li
            aria-hidden="true"
            role="presentation"
            className="absolute inset-y-0 left-0 rounded-full border border-line bg-surface-hover/80"
            initial={false}
            animate={{ x: indicator.left, width: indicator.width }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        ) : null}
        {links}
      </ul>
    </nav>
  );
}
