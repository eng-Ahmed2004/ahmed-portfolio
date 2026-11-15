import type { Certification, Localized } from "@/types";

const anthropic: Localized = { en: "Anthropic", ar: "Anthropic" };

/**
 * Certifications.
 *
 * To attach proof later, add to an entry:
 *   image: "/images/certifications/<file>.jpg"
 *   verifyUrl: "https://…"   (only a real, working verification link)
 * The UI shows the image and the "Verify" link only when they exist.
 */
export const certifications: readonly Certification[] = [
  {
    id: "ai-fluency",
    name: { en: "AI Fluency", ar: "AI Fluency" },
    issuer: anthropic,
    topic: { en: "AI literacy", ar: "الثقافة في الذكاء الاصطناعي" },
  },
  {
    id: "ai-fluency-framework",
    name: {
      en: "AI Fluency: Framework & Foundations",
      ar: "AI Fluency: Framework & Foundations",
    },
    issuer: anthropic,
    topic: { en: "AI literacy", ar: "الثقافة في الذكاء الاصطناعي" },
  },
  {
    id: "claude-101",
    name: { en: "Claude 101", ar: "Claude 101" },
    issuer: anthropic,
    topic: { en: "Generative AI", ar: "الذكاء الاصطناعي التوليدي" },
  },
  {
    id: "building-with-claude-api",
    name: { en: "Building with Claude API", ar: "Building with Claude API" },
    issuer: anthropic,
    topic: { en: "AI development", ar: "تطوير تطبيقات الذكاء الاصطناعي" },
  },
  {
    id: "claude-code-101",
    name: { en: "Claude Code 101", ar: "Claude Code 101" },
    issuer: anthropic,
    topic: { en: "AI-assisted development", ar: "التطوير بمساعدة الذكاء الاصطناعي" },
  },
  {
    id: "intro-langchain-python",
    name: {
      en: "Introduction to LangChain – Python",
      ar: "Introduction to LangChain – Python",
    },
    // Issuer intentionally left out until it is confirmed.
    topic: { en: "LLM frameworks", ar: "أطر عمل النماذج اللغوية" },
  },
  {
    id: "icdl",
    name: { en: "ICDL", ar: "ICDL" },
    topic: {
      en: "International Computer Driving Licence",
      ar: "الرخصة الدولية لقيادة الحاسوب",
    },
  },
];
