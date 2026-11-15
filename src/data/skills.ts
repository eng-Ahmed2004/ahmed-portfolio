import type { Localized, SkillCategory } from "@/types";

/** Technology names stay the same in both languages. */
const same = (name: string): Localized => ({ en: name, ar: name });

/**
 * Skills grouped by category. No proficiency percentages on purpose —
 * they would be arbitrary.
 */
export const skillCategories: readonly SkillCategory[] = [
  {
    id: "languages",
    icon: "code",
    title: { en: "Programming Languages", ar: "لغات البرمجة" },
    skills: [same("Dart"), same("Python"), same("Java")],
  },
  {
    id: "development",
    icon: "smartphone",
    title: { en: "Development", ar: "التطوير" },
    skills: [
      same("Flutter"),
      same(".NET"),
      { en: "Mobile Application Development", ar: "تطوير تطبيقات الهاتف" },
      { en: "REST API Integration", ar: "التكامل مع REST API" },
      same("SQLite"),
    ],
  },
  {
    id: "tools",
    icon: "wrench",
    title: { en: "Tools & Technologies", ar: "الأدوات والتقنيات" },
    skills: [
      same("Git"),
      same("GitHub"),
      same("Docker"),
      same("Linux"),
      same("Android Studio"),
      same("Visual Studio Code"),
      same("Postman"),
      same("Figma"),
    ],
  },
  {
    id: "ai",
    icon: "sparkles",
    title: { en: "AI & Emerging Technologies", ar: "الذكاء الاصطناعي والتقنيات الناشئة" },
    skills: [
      { en: "Generative AI", ar: "الذكاء الاصطناعي التوليدي" },
      same("Claude API"),
      same("LangChain"),
      { en: "AI-assisted Development", ar: "التطوير بمساعدة الذكاء الاصطناعي" },
      { en: "Artificial Intelligence Fundamentals", ar: "أساسيات الذكاء الاصطناعي" },
    ],
  },
  {
    id: "professional",
    icon: "users",
    title: { en: "Professional Skills", ar: "المهارات المهنية" },
    skills: [
      { en: "Problem Solving", ar: "حل المشكلات" },
      { en: "Team Collaboration", ar: "العمل الجماعي" },
      { en: "Technical Communication", ar: "التواصل التقني" },
      { en: "Research", ar: "البحث" },
      { en: "Continuous Learning", ar: "التعلّم المستمر" },
    ],
  },
];
