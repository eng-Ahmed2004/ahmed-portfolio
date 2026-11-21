"use client";

import { m } from "framer-motion";
import { ArrowRight, Download, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { HeroBackdrop } from "@/components/animations/HeroBackdrop";
import { Typewriter } from "@/components/animations/Typewriter";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Button, IconLink } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";
import { fadeDelayed, fadeUp, scaleInDelayed, staggerContainer } from "@/lib/motion";
import { externalLinkProps } from "@/lib/utils";
import portrait from "../../../public/images/ahmed-srour.jpg";

export function Hero() {
  const { dict, t, locale } = useI18n();
  const [firstLine, secondLine] = t(profile.nameLines);
  // Show the name in the other script as a quiet second line.
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      <HeroBackdrop />

      <div className="container-page grid flex-1 items-center gap-14 pb-14 lg:grid-cols-12 lg:gap-10 lg:pb-16">
        <m.div
          className="lg:col-span-7"
          variants={staggerContainer(0.09, 0.05)}
          initial="hidden"
          animate="show"
        >
          <m.p
            variants={fadeUp}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 ps-3 pe-4 text-xs font-medium text-fg-soft sm:text-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-success" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {dict.hero.status}
          </m.p>

          <m.h1
            id="hero-title"
            variants={fadeUp}
            className="heading-display mt-7 text-[clamp(2.5rem,8.2vw,5.25rem)] text-fg"
          >
            <span className="block">{firstLine}</span>
            <span className="text-gradient block pb-[0.14em]">{secondLine}</span>
          </m.h1>

          <m.p variants={fadeUp} className="mt-2 text-base text-fg-muted sm:text-lg">
            <span
              lang={otherLocale}
              dir={otherLocale === "ar" ? "rtl" : "ltr"}
            >
              {profile.name[otherLocale]}
            </span>
          </m.p>

          <m.p
            variants={fadeUp}
            className="mt-7 flex h-8 items-center gap-3 text-[clamp(0.85rem,4vw,1.2rem)] font-medium text-accent-text"
          >
            <span aria-hidden="true" className="bg-brand-gradient hidden h-px w-9 sm:block" />
            {/* Keyed by language so the animation restarts with the new words. */}
            <Typewriter key={locale} words={dict.hero.roles} />
          </m.p>

          <m.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-xl leading-snug font-light text-fg sm:text-2xl"
          >
            {dict.hero.tagline}
          </m.p>

          <m.p variants={fadeUp} className="mt-5 max-w-xl text-base text-fg-muted">
            {dict.hero.intro}
          </m.p>

          <m.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={profile.cv.href} download={profile.cv.fileName}>
              <Download aria-hidden="true" strokeWidth={1.8} className="size-[1.1rem]" />
              {dict.hero.downloadCv}
            </Button>
            <Button href="#projects" variant="secondary">
              {dict.hero.viewProjects}
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.8}
                className="size-[1.1rem] transition-transform duration-300 ease-settle group-hover/btn:translate-x-1 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-1"
              />
            </Button>

            <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-line-strong sm:block" />

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
          </m.div>
        </m.div>

        <m.div
          className="lg:col-span-5"
          variants={scaleInDelayed(0.2)}
          initial="hidden"
          animate="show"
        >
          <Portrait />
        </m.div>
      </div>

      <m.div
        className="container-page pb-8"
        variants={fadeDelayed(0.9)}
        initial="hidden"
        animate="show"
      >
        <div className="divider-fade" />
        <div className="mt-5 flex items-center justify-between gap-8">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.7rem] font-medium tracking-[0.12em] text-fg-muted uppercase sm:text-xs rtl:text-xs rtl:normal-case sm:rtl:text-sm">
            {dict.hero.titles.map((title, index) => (
              <li key={title} className="flex items-center gap-4">
                {index > 0 ? (
                  <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                ) : null}
                {title}
              </li>
            ))}
          </ul>

          <a
            href="#about"
            className="hidden shrink-0 items-center gap-3 text-xs font-medium tracking-[0.12em] text-fg-muted uppercase transition-colors duration-300 hover:text-fg lg:inline-flex"
          >
            {dict.hero.scrollHint}
            <span aria-hidden="true" className="relative h-8 w-px overflow-hidden bg-line-strong">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-hint bg-accent" />
            </span>
          </a>
        </div>
      </m.div>
    </section>
  );
}

/** Arched portrait with two floating context chips. */
function Portrait() {
  const { dict, t } = useI18n();

  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[25rem]">
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--aurora-1),transparent)]"
      />

      {/* Gradient hairline frame around an arched image. */}
      <div className="rounded-t-[20rem] rounded-b-[2rem] bg-[linear-gradient(165deg,var(--accent),transparent_38%,transparent_62%,var(--accent-2))] p-px shadow-lift">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[20rem] rounded-b-[calc(2rem-1px)] bg-surface">
          <Image
            src={portrait}
            alt={dict.hero.portraitAlt}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 25rem, (min-width: 640px) 22rem, 19rem"
            className="object-cover object-[50%_22%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(8_11_20/0.5),transparent_42%)]"
          />
        </div>
      </div>

      <div className="glass absolute -start-3 top-[42%] flex animate-float items-center gap-3 rounded-2xl py-2.5 ps-2.5 pe-4 shadow-soft sm:-start-8">
        <span className="grid size-9 place-items-center rounded-xl bg-accent/15 text-accent-text">
          <Users aria-hidden="true" strokeWidth={1.7} className="size-[1.1rem]" />
        </span>
        <span className="leading-tight">
          <span className="block text-[0.7rem] text-fg-muted">{dict.hero.chipCommunityLabel}</span>
          <span dir="ltr" className="block text-sm font-semibold text-fg">
            {dict.hero.chipCommunityValue}
          </span>
        </span>
      </div>

      <div className="glass absolute -end-3 bottom-9 flex animate-float-slow items-center gap-3 rounded-2xl py-2.5 ps-2.5 pe-4 shadow-soft sm:-end-7">
        <span className="grid size-9 place-items-center rounded-xl bg-accent-2/15 text-accent-2-text">
          <MapPin aria-hidden="true" strokeWidth={1.7} className="size-[1.1rem]" />
        </span>
        <span className="leading-tight">
          <span className="block text-[0.7rem] text-fg-muted">{dict.hero.chipLocationLabel}</span>
          <span className="block text-sm font-semibold text-fg">{t(profile.location)}</span>
        </span>
      </div>
    </div>
  );
}
