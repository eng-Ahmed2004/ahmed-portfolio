export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";
export type Theme = "dark" | "light";

/** A value that exists once per supported language. */
export type Localized<T = string> = Readonly<Record<Locale, T>>;

/** Sections that appear in the main navigation. */
export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "certifications"
  | "contact";

export interface NavItem {
  id: SectionId;
  label: Localized;
}

/** Keys of the icon registry in `components/ui/Icon.tsx`. */
export type IconName =
  | "award"
  | "barChart"
  | "bookOpen"
  | "bot"
  | "brain"
  | "briefcase"
  | "code"
  | "compass"
  | "cpu"
  | "database"
  | "graduationCap"
  | "handshake"
  | "layers"
  | "lightbulb"
  | "mic"
  | "rocket"
  | "smartphone"
  | "sparkles"
  | "stethoscope"
  | "users"
  | "wrench";

export interface SkillCategory {
  id: string;
  title: Localized;
  icon: IconName;
  skills: readonly Localized[];
}

export type ProjectCategory = "mobile" | "ai-data" | "web" | "community";

/** Decorative pattern used on a project cover when no screenshot exists. */
export type CoverPattern = "grid" | "rings" | "dots" | "waves" | "nodes";

export interface ProjectImage {
  src: string;
  alt: Localized;
  width: number;
  height: number;
}

export interface ProjectLinks {
  /** Public repository URL. Leave undefined when there is none. */
  github?: string;
  /** Public live demo URL. Leave undefined when there is none. */
  live?: string;
}

export interface Project {
  slug: string;
  featured?: boolean;
  category: ProjectCategory;
  title: Localized;
  /** Short context line, e.g. organisation and year. */
  context: Localized;
  /** Optional small label, e.g. "Technical explorations". */
  badge?: Localized;
  description: Localized;
  /** What Ahmed did on the project. */
  role: readonly Localized[];
  /** Features, activities, or focus areas. */
  highlights?: readonly Localized[];
  highlightsKind?: "features" | "activities" | "focus";
  technologies: readonly string[];
  links: ProjectLinks;
  /** True when the source exists but the repository is not public. */
  privateRepo?: boolean;
  cover: {
    icon: IconName;
    pattern: CoverPattern;
    /** Hue rotation of the cover gradient, in degrees. Keep it between -40 and 10 to stay in the blue–cyan brand range. */
    hue: number;
  };
  /** Real screenshots, when available. */
  screenshots?: readonly ProjectImage[];
}

export interface ExperienceItem {
  id: string;
  icon: IconName;
  title: Localized;
  organization: Localized;
  period: Localized;
  /** Optional highlighted line, e.g. a session title. */
  highlight?: Localized;
  description: Localized;
  tags: readonly Localized[];
  current?: boolean;
}

export interface Certification {
  id: string;
  name: Localized;
  /** Issuing organisation. Omit when it has not been confirmed. */
  issuer?: Localized;
  /** Topic label shown alongside the issuer. */
  topic: Localized;
  /** Add when a certificate image is available (path under /public). */
  image?: string;
  /** Add only a real, working verification URL. */
  verifyUrl?: string;
}

export interface Achievement {
  id: string;
  icon: IconName;
  title: Localized;
  description: Localized;
}

export interface ExploringItem {
  id: string;
  icon: IconName;
  title: Localized;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
