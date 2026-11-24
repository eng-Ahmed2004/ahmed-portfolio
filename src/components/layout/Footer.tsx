"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Logo } from "@/components/ui/Logo";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";
import { externalLinkProps } from "@/lib/utils";

/** Set at build time in next.config.ts, so it never goes stale after a deploy. */
const year = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

const iconLinkClasses =
  "grid size-11 place-items-center rounded-full text-fg-muted transition-[color,background-color,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:bg-surface-hover hover:text-fg";

export function Footer() {
  const { dict, t } = useI18n();

  return (
    <footer id="site-footer" className="border-t border-line">
      <div className="container-page py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <a href="#home" aria-label={dict.a11y.homeLink} className="inline-flex items-center gap-3">
              <Logo />
              <span className="font-display text-sm font-semibold text-fg">{t(profile.shortName)}</span>
            </a>
            <p className="mt-4 text-sm text-fg-muted">{dict.footer.tagline}</p>
          </div>

          <nav aria-label={dict.a11y.footerNav}>
            <ul className="flex flex-wrap gap-x-7 gap-y-1">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-11 items-center text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
                  >
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-fg-muted">
            © <span dir="ltr">{year}</span> {t(profile.name)}. {dict.footer.rights}
          </p>

          <div className="-ms-2.5 flex items-center gap-1 sm:ms-0">
            <a href={profile.socials.github} aria-label={dict.a11y.github} className={iconLinkClasses} {...externalLinkProps}>
              <GitHubIcon className="size-[1.15rem]" />
            </a>
            <a href={profile.socials.linkedin} aria-label={dict.a11y.linkedin} className={iconLinkClasses} {...externalLinkProps}>
              <LinkedInIcon className="size-[1.15rem]" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label={dict.contact.emailMe} className={iconLinkClasses}>
              <Mail aria-hidden="true" strokeWidth={1.7} className="size-[1.15rem]" />
            </a>
            <span aria-hidden="true" className="mx-2 h-5 w-px bg-line-strong" />
            <a href="#home" aria-label={dict.a11y.backToTop} className={iconLinkClasses}>
              <ArrowUp aria-hidden="true" strokeWidth={1.7} className="size-[1.15rem]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
