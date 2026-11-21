# Ahmed Srour — Portfolio

Personal portfolio of Ahmed Moeen Khalil Srour: bilingual (English / Arabic), dark and light themes, built with Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other scripts: `npm run build` (production build), `npm run start` (serve the build), `npm run lint`.

## Where things live

```
src/
  app/            layout, page, global styles, sitemap, robots, icon, Open Graph image
  components/
    layout/       Navbar, MobileMenu, Footer, Providers
    sections/     Hero, About, Skills, Projects, Experience, Certifications,
                  Achievements, Exploring, Contact
    ui/           Button, Chip, Icon, ProjectCard, ProjectDialog, PhoneMockup, …
    animations/   Reveal, Typewriter, ParticleField, HeroBackdrop
  data/           profile, navigation, skills, projects, experience,
                  certifications, highlights (achievements + currently exploring)
  i18n/           dictionaries (en.ts, ar.ts), config, I18nProvider
  hooks/          useTheme, useActiveSection, useTypewriter, useCopyToClipboard
  lib/            motion presets, preferences store, contact, site URL, utils
  types/          shared TypeScript types
public/
  images/         portrait and project screenshots
  cv/             downloadable CV
```

Content is separate from presentation: edit the files in `src/data` and `src/i18n/dictionaries`; components never need to change for a content update.

## Updating content

| To change… | Edit |
| --- | --- |
| Name, email, social links, CV path | `src/data/profile.ts` |
| Hero, About, Education, Contact copy, all UI labels | `src/i18n/dictionaries/en.ts` and `ar.ts` (same shape — TypeScript checks it) |
| Skills | `src/data/skills.ts` |
| Projects | `src/data/projects.ts` |
| Experience timeline | `src/data/experience.ts` |
| Certifications | `src/data/certifications.ts` |
| Achievements, Currently Exploring | `src/data/highlights.ts` |
| Navigation items | `src/data/navigation.ts` |
| Colours, fonts, spacing tokens | `src/app/globals.css` |

Every text value has an `en` and an `ar` version.

### Add a project

Append an object to the array in `src/data/projects.ts`. It appears in the grid, the filter, and the details dialog automatically.

- Add `links.github` / `links.live` only for real, public URLs.
- For screenshots, put images in `public/images/projects/<slug>/` and list them under `screenshots`. Without screenshots, a cover is generated from the `cover` settings.
- The first project with `featured: true` gets the large showcase.

### Add certificate proof

In `src/data/certifications.ts`, add `image: "/images/certifications/<file>.jpg"` and/or `verifyUrl: "https://…"` to an entry. The image and the "Verify credential" link only render when they exist.

### Replace the CV

Replace `public/cv/Ahmed-Srour-CV.pdf` (keep the file name, or update `cv` in `src/data/profile.ts`).

### Replace the portrait

Replace `public/images/ahmed-srour.jpg`. A portrait-orientation photo works best.

## Contact form

Until an email service is connected, the form validates the input and then opens the visitor's email app with the message pre-filled. It never pretends to have sent anything.

To send messages directly, connect [Formspree](https://formspree.io):

1. Create a form there with `ahmadsrour537@gmail.com` as the recipient.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to the form endpoint.
3. Add the same variable in the Vercel project settings.

A Formspree endpoint is a public form id, not a secret. Never put private API keys in `NEXT_PUBLIC_*` variables — they are shipped to the browser.

## Deploying to Vercel

1. Push the project to a GitHub repository.
2. Import it at https://vercel.com/new — the defaults work, no configuration needed.
3. Optional environment variables:
   - `NEXT_PUBLIC_SITE_URL` — the final address (for example a custom domain). Used for canonical URLs, the sitemap, and social cards. On Vercel the production URL is used automatically when this is not set.
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` — see above.

## Privacy rule

The university GPA / academic average must never appear on this site — not in the Education or Achievements sections, not in metadata or structured data, and not in the downloadable CV in `public/cv`. Keep it that way when updating content.

## Notes

- Fonts: Inter (English) and IBM Plex Sans Arabic (Arabic), loaded with `next/font/google` in `src/app/layout.tsx` at weights 300–700 and combined into the single `--font-sans` stack in `src/app/globals.css`. Inter has no Arabic glyphs, so each language picks its own font automatically. Arabic text is never letter-spaced (`:lang(ar)` rule), and the typewriter reveals Arabic word by word so the connected letters never break apart.
- Language and theme choices are saved in `localStorage` and applied before first paint, so there is no flash on reload.
- Animations respect the system "reduce motion" setting.
- `AGENTS.md` is generated by Next.js for AI coding tools; it can stay in the repository.
