"use client";

import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { Section, SectionHeading } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useI18n } from "@/i18n/I18nProvider";
import { buildMailtoLink } from "@/lib/contact";
import { externalLinkProps } from "@/lib/utils";

const socials = [
  { id: "github", name: "GitHub", href: profile.socials.github, handle: "eng-Ahmed2004", Icon: GitHubIcon },
  { id: "linkedin", name: "LinkedIn", href: profile.socials.linkedin, handle: "Ahmed Srour", Icon: LinkedInIcon },
] as const;

export function Contact() {
  const { dict } = useI18n();
  const copy = dict.contact;
  const { state, copy: copyEmail } = useCopyToClipboard();

  return (
    <Section id="contact" elevated>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            sectionId="contact"
            index="08"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />

          <Reveal delay={0.1} className="mt-10">
            <p className="text-sm text-fg-muted">{copy.emailLabel}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <a
                href={buildMailtoLink()}
                dir="ltr"
                className="text-lg font-medium break-all text-fg underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent sm:text-2xl"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={() => copyEmail(profile.email)}
                aria-label={copy.copy}
                className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-fg-soft transition-[background-color,color,border-color,transform] duration-300 ease-settle hover:border-line-strong hover:bg-surface-hover hover:text-fg active:scale-90"
              >
                {state === "copied" ? (
                  <Check aria-hidden="true" strokeWidth={2} className="size-[1.1rem] text-success" />
                ) : (
                  <Copy aria-hidden="true" strokeWidth={1.7} className="size-[1.1rem]" />
                )}
              </button>
              <span role="status" aria-live="polite" className="text-sm">
                {state === "copied" ? <span className="text-success">{copy.copied}</span> : null}
                {state === "failed" ? <span className="text-danger">{copy.copyFailed}</span> : null}
              </span>
            </div>

            <div className="mt-7">
              <Button href={buildMailtoLink()}>
                <Mail aria-hidden="true" strokeWidth={1.8} className="size-[1.1rem]" />
                {copy.emailMe}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-12">
            <p className="text-sm text-fg-muted">{copy.elsewhere}</p>
            <ul className="mt-3 border-t border-line">
              {socials.map(({ id, name, href, handle, Icon }) => (
                <li key={id} className="border-b border-line">
                  <a
                    href={href}
                    className="group flex min-h-16 items-center gap-4 py-3 transition-colors duration-300"
                    {...externalLinkProps}
                  >
                    <Icon className="size-5 shrink-0 text-fg-muted transition-colors duration-300 group-hover:text-fg" />
                    <span className="flex-1">
                      <span className="block font-medium text-fg">{name}</span>
                      <span dir="ltr" className="block text-sm text-fg-muted rtl:text-end">
                        {handle}
                      </span>
                    </span>
                    <span className="sr-only">{dict.a11y.newTab}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.7}
                      className="size-5 text-fg-muted transition-[transform,color] duration-300 ease-settle group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-text rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
