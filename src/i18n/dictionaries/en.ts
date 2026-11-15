/**
 * English UI copy. `ar.ts` must have exactly the same shape —
 * TypeScript enforces it through the `Dictionary` type.
 */
const en = {
  meta: {
    title: "Ahmed Srour — Flutter Developer & Smart Systems Engineering Student",
    description:
      "Portfolio of Ahmed Moeen Khalil Srour, a final-year Smart Systems and Computer Engineering student at Al-Aqsa University, Flutter developer, and AI enthusiast based in Gaza, Palestine.",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    footerNav: "Footer navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "التبديل إلى العربية",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    github: "Ahmed Srour on GitHub",
    linkedin: "Ahmed Srour on LinkedIn",
    newTab: "(opens in a new tab)",
    close: "Close",
    backToTop: "Back to top",
    homeLink: "Ahmed Srour — back to top",
  },
  languageToggle: {
    /** Name of the language the button switches TO. */
    label: "العربية",
    short: "ع",
  },
  hero: {
    status: "Open to Opportunities",
    roles: [
      "Flutter Developer",
      "Smart Systems Engineering Student",
      "AI Enthusiast",
      "Software Developer",
    ],
    rolesLabel: "Roles",
    titles: [
      "Smart Systems & Computer Engineering Student",
      "Flutter Developer",
      "AI Enthusiast",
    ],
    tagline:
      "Building meaningful digital experiences through technology, creativity, and intelligent solutions.",
    intro:
      "I am a final-year Smart Systems and Computer Engineering student passionate about software development, mobile applications, and artificial intelligence. I enjoy transforming ideas into practical digital solutions and continuously exploring emerging technologies.",
    downloadCv: "Download CV",
    viewProjects: "View Projects",
    portraitAlt: "Portrait of Ahmed Srour smiling, wearing a GDG on Campus lanyard",
    chipCommunityLabel: "Community",
    chipCommunityValue: "GDG on Campus",
    chipLocationLabel: "Based in",
    scrollHint: "Scroll to explore",
  },
  about: {
    eyebrow: "About",
    title: "Turning ideas into practical digital solutions.",
    lead: "I am Ahmed Moeen Khalil Srour, a final-year Smart Systems and Computer Engineering student at Al-Aqsa University, with a strong academic background and a passion for software development and emerging technologies.",
    paragraphs: [
      "My primary focus is Flutter development and building cross-platform mobile applications. I also have a growing interest in Artificial Intelligence, Data Science, and intelligent systems.",
      "Throughout my academic journey, I have worked on practical projects, explored modern development tools, and collaborated with others to transform ideas into meaningful digital solutions.",
      "Beyond development, I am actively involved in the tech community through GDG on Campus – Al-Aqsa University, where I contribute to technical activities and collaborative initiatives.",
      "My goal is to continuously grow as a software engineer, contribute to impactful projects, and build technology that makes a difference.",
    ],
    focus: [
      {
        title: "Academic background",
        text: "Final-year Smart Systems and Computer Engineering student at Al-Aqsa University.",
      },
      {
        title: "Development focus",
        text: "Flutter and cross-platform mobile applications.",
      },
      {
        title: "Technical interests",
        text: "Artificial Intelligence, Data Science, and intelligent systems.",
      },
      {
        title: "AI & emerging tech",
        text: "Exploring modern development tools and AI-assisted workflows.",
      },
      {
        title: "Community",
        text: "Active in GDG on Campus – Al-Aqsa University.",
      },
    ],
  },
  education: {
    eyebrow: "Education",
    university: "Al-Aqsa University",
    degree: "Bachelor's Degree in Smart Systems and Computer Engineering",
    locationLabel: "Location",
    location: "Gaza, Palestine",
    graduationLabel: "Expected graduation",
    graduation: "2027",
    statusLabel: "Academic status",
    status: "Final-Year Student",
  },
  skills: {
    eyebrow: "Skills",
    title: "The tools I build with.",
    description:
      "A practical toolkit spanning mobile development, everyday engineering tools, and emerging AI technologies.",
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work and explorations.",
    description:
      "From a job-discovery platform to data notebooks and community work — what I have been building and learning.",
    featured: "Featured project",
    role: "My role",
    technologies: "Technologies",
    viewDetails: "View details",
    sourceCode: "Source code",
    liveDemo: "Live demo",
    privateRepo: "Private repository",
    highlights: {
      features: "Key features",
      activities: "Activities",
      focus: "What it covers",
    },
    screens: "App screens",
    screensNote: "Screens from the Tilqaa app design in Figma.",
    filterLabel: "Filter projects",
    filters: {
      all: "All",
      mobile: "Mobile",
      "ai-data": "AI & Data",
      web: "Web",
      community: "Community",
    },
    moreTitle: "More on GitHub",
    moreText: "Coursework, experiments, and work in progress live on my GitHub profile.",
    moreCta: "Visit GitHub",
  },
  experience: {
    eyebrow: "Experience",
    title: "Experience and community.",
    description: "Where I contribute, collaborate, and share what I learn.",
    current: "Current",
  },
  certifications: {
    eyebrow: "Certifications",
    title: "Learning, on the record.",
    description: "Courses and credentials completed along the way.",
    verify: "Verify credential",
  },
  achievements: {
    eyebrow: "Achievements",
    title: "Highlights along the way.",
  },
  exploring: {
    eyebrow: "Currently exploring",
    title: "What I am learning next.",
    description: "The areas I am investing my curiosity in right now.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something meaningful.",
    description:
      "Have an opportunity, a project idea, or a question? I would be glad to hear from you.",
    emailLabel: "Email",
    emailMe: "Email me",
    copy: "Copy email address",
    copied: "Copied",
    copyFailed: "Copy failed — select the address instead",
    elsewhere: "Elsewhere",
    form: {
      title: "Send a message",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      subjectPlaceholder: "What is this about?",
      message: "Message",
      messagePlaceholder: "Write your message…",
      submit: "Send message",
      submitMailto: "Open in email app",
      sending: "Sending…",
      required: "Required",
      errors: {
        name: "Please enter your name (at least 2 characters).",
        email: "Please enter a valid email address.",
        subject: "Please add a subject (at least 3 characters).",
        message: "Please write a message of at least 10 characters.",
        summary: "Please fix the highlighted fields and try again.",
      },
      success: "Thank you — your message has been sent. I will get back to you soon.",
      failure:
        "The message could not be sent. Please try again, or email me directly using the address on this page.",
      mailtoNotice:
        "This form is not connected to an email service yet. Sending opens your email app with the message ready to go.",
      mailtoOpened:
        "Your email app should now be open with the message filled in. If nothing happened, please email me directly.",
    },
  },
  footer: {
    tagline: "Building meaningful digital experiences.",
    rights: "All rights reserved.",
  },
  notFound: {
    title: "This page could not be found.",
    text: "The link may be broken, or the page may have moved.",
    back: "Back to the homepage",
  },
};

export default en;
export type Dictionary = typeof en;
