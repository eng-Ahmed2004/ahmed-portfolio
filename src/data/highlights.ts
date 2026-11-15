import type { Achievement, ExploringItem } from "@/types";

/**
 * Achievements. Only items supported by supplied information belong here.
 * Privacy: never mention the university GPA or academic average.
 */
export const achievements: readonly Achievement[] = [
  {
    id: "academic-excellence",
    icon: "graduationCap",
    title: { en: "Academic Excellence", ar: "التميّز الأكاديمي" },
    description: {
      en: "A strong academic record throughout the Smart Systems and Computer Engineering programme at Al-Aqsa University.",
      ar: "سجل أكاديمي متميّز طوال دراستي في تخصص هندسة الأنظمة الذكية والحاسوب بجامعة الأقصى.",
    },
  },
  {
    id: "community-contributions",
    icon: "users",
    title: { en: "Technical Community Contributions", ar: "المساهمة في المجتمع التقني" },
    description: {
      en: "Contributing to technical activities and initiatives as a Technical Team Member at GDG on Campus – Al-Aqsa University.",
      ar: "أساهم في الأنشطة والمبادرات التقنية كعضو في الفريق التقني لـ GDG on Campus – جامعة الأقصى.",
    },
  },
  {
    id: "technical-session",
    icon: "mic",
    title: { en: "Technical Session Presentation", ar: "تقديم جلسة تقنية" },
    description: {
      en: "Presented “Git & GitHub: From Code to Collaboration”, a practical session introducing students to version control.",
      ar: "قدّمت جلسة «Git & GitHub: From Code to Collaboration»، وهي جلسة عملية عرّفت الطلبة بالتحكم في النسخ.",
    },
  },
  {
    id: "collaborative-projects",
    icon: "handshake",
    title: { en: "Participation in Collaborative Projects", ar: "المشاركة في مشاريع تعاونية" },
    description: {
      en: "Working with a project team on the Tilqaa platform with Taqat Foundation.",
      ar: "أعمل ضمن فريق المشروع على منصة تلقاء مع مؤسسة طاقات.",
    },
  },
];

/** What Ahmed is learning right now. */
export const exploring: readonly ExploringItem[] = [
  { id: "ai", icon: "brain", title: { en: "Artificial Intelligence", ar: "الذكاء الاصطناعي" } },
  { id: "data-science", icon: "barChart", title: { en: "Data Science", ar: "علم البيانات" } },
  {
    id: "advanced-flutter",
    icon: "smartphone",
    title: { en: "Advanced Flutter Development", ar: "تطوير Flutter المتقدّم" },
  },
  { id: "intelligent-systems", icon: "cpu", title: { en: "Intelligent Systems", ar: "الأنظمة الذكية" } },
  {
    id: "ai-powered-apps",
    icon: "bot",
    title: { en: "AI-powered Applications", ar: "التطبيقات المدعومة بالذكاء الاصطناعي" },
  },
];
