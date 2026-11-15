import type { NavItem } from "@/types";

/** Order here is the order in the navbar, mobile menu, and footer. */
export const navigation: readonly NavItem[] = [
  { id: "home", label: { en: "Home", ar: "الرئيسية" } },
  { id: "about", label: { en: "About", ar: "نبذة" } },
  { id: "skills", label: { en: "Skills", ar: "المهارات" } },
  { id: "projects", label: { en: "Projects", ar: "المشاريع" } },
  { id: "experience", label: { en: "Experience", ar: "الخبرات" } },
  { id: "certifications", label: { en: "Certifications", ar: "الشهادات" } },
  { id: "contact", label: { en: "Contact", ar: "تواصل" } },
];
