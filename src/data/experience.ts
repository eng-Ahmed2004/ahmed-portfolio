import type { ExperienceItem } from "@/types";

/** Experience and community involvement, shown as a timeline. */
export const experience: readonly ExperienceItem[] = [
  {
    id: "gdg-technical-team",
    icon: "users",
    current: true,
    title: { en: "Technical Team Member", ar: "عضو الفريق التقني" },
    organization: {
      en: "GDG on Campus – Al-Aqsa University",
      ar: "GDG on Campus – جامعة الأقصى",
    },
    period: { en: "2026 – Present", ar: "2026 – الآن" },
    description: {
      en: "Contributing to technical initiatives, community activities, and collaborative learning experiences.",
      ar: "أساهم في المبادرات التقنية والأنشطة المجتمعية وتجارب التعلّم التعاوني.",
    },
    tags: [
      { en: "Community", ar: "مجتمع تقني" },
      { en: "Technical initiatives", ar: "مبادرات تقنية" },
      { en: "Collaborative learning", ar: "تعلّم تعاوني" },
    ],
  },
  {
    id: "ieee-student-member",
    icon: "cpu",
    current: true,
    title: { en: "IEEE Student Member", ar: "عضو طلابي في IEEE" },
    // "IEEE Palestine Subsection" is the unit's official English name.
    organization: { en: "IEEE Palestine Subsection", ar: "IEEE – فرع فلسطين" },
    // No start date yet: add `period` here once it is known.
    description: {
      en: "An active member taking part in technical activities and professional development programs.",
      ar: "عضو فاعل يشارك في الأنشطة التقنية وبرامج التطوير المهني.",
    },
    tags: [
      { en: "Technical activities", ar: "أنشطة تقنية" },
      { en: "Professional development", ar: "تطوير مهني" },
    ],
  },
  {
    id: "git-github-session",
    icon: "mic",
    title: { en: "Technical Session Presenter", ar: "مقدّم جلسة تقنية" },
    organization: {
      en: "GDG on Campus – Al-Aqsa University",
      ar: "GDG on Campus – جامعة الأقصى",
    },
    period: { en: "November 2026", ar: "نوفمبر 2026" },
    highlight: {
      en: "“Git & GitHub: From Code to Collaboration”",
      // The session title is a proper name, so it stays in its original language.
      ar: "«Git & GitHub: From Code to Collaboration»",
    },
    description: {
      en: "Delivered a practical technical session introducing students to version control, Git, GitHub repositories, branching, commits, and pull requests.",
      ar: "قدّمت جلسة تقنية عملية عرّفت الطلبة بأنظمة التحكم في النسخ وGit ومستودعات GitHub والفروع والـ commits وطلبات الدمج (Pull Requests).",
    },
    tags: [
      { en: "Git", ar: "Git" },
      { en: "GitHub", ar: "GitHub" },
      { en: "Version control", ar: "التحكم في النسخ" },
      { en: "Public speaking", ar: "تقديم وإلقاء" },
    ],
  },
  {
    id: "tilqaa-taqat",
    icon: "rocket",
    title: { en: "Tilqaa Project", ar: "مشروع تلقاء" },
    organization: { en: "Taqat Foundation", ar: "مؤسسة طاقات" },
    period: { en: "2026", ar: "2026" },
    description: {
      en: "Participating in the development of a digital platform and collaborating with the project team on mobile application development and AI-assisted workflows.",
      ar: "أشارك في تطوير منصة رقمية وأتعاون مع فريق المشروع في تطوير تطبيق الهاتف وسير العمل المدعوم بالذكاء الاصطناعي.",
    },
    tags: [
      { en: "Flutter", ar: "Flutter" },
      { en: "Mobile development", ar: "تطوير تطبيقات الهاتف" },
      { en: "AI-assisted workflows", ar: "سير عمل مدعوم بالذكاء الاصطناعي" },
    ],
  },
];
