import type { Certification, Localized } from "@/types";

const anthropic: Localized = { en: "Anthropic", ar: "Anthropic" };

/**
 * Certifications.
 *
 * `verifyUrl` is the public page that verifies the credential. When it is set,
 * the whole card becomes a link to that page; without it the card is static.
 * Only add real, working verification links.
 *
 * Optional: `image: "/images/certifications/<file>.jpg"` shows a certificate
 * thumbnail instead of the badge icon.
 */
export const certifications: readonly Certification[] = [
  {
    id: "ai-fluency",
    name: { en: "AI Fluency", ar: "AI Fluency" },
    issuer: anthropic,
    topic: { en: "AI literacy", ar: "الثقافة في الذكاء الاصطناعي" },
    verifyUrl: "https://verify.skilljar.com/c/peg2uzy2smsj",
  },
  {
    id: "ai-fluency-framework",
    name: {
      en: "AI Fluency: Framework & Foundations",
      ar: "AI Fluency: Framework & Foundations",
    },
    issuer: anthropic,
    topic: { en: "AI literacy", ar: "الثقافة في الذكاء الاصطناعي" },
    verifyUrl: "https://verify.skilljar.com/c/3osu9tbwigm7",
  },
  {
    id: "claude-101",
    name: { en: "Claude 101", ar: "Claude 101" },
    issuer: anthropic,
    topic: { en: "Generative AI", ar: "الذكاء الاصطناعي التوليدي" },
    verifyUrl: "https://verify.skilljar.com/c/gpkjp996d37p",
  },
  {
    id: "building-with-claude-api",
    name: { en: "Building with Claude API", ar: "Building with Claude API" },
    issuer: anthropic,
    topic: { en: "AI development", ar: "تطوير تطبيقات الذكاء الاصطناعي" },
    verifyUrl: "https://verify.skilljar.com/c/ty255fbzwj87",
  },
  {
    id: "claude-code-101",
    name: { en: "Claude Code 101", ar: "Claude Code 101" },
    issuer: anthropic,
    topic: { en: "AI-assisted development", ar: "التطوير بمساعدة الذكاء الاصطناعي" },
    verifyUrl: "https://verify.skilljar.com/c/5j2c5wfrpcpi",
  },
  {
    id: "intro-langchain-python",
    name: {
      en: "Introduction to LangChain – Python",
      ar: "Introduction to LangChain – Python",
    },
    // The certificate is hosted on LangChain Academy.
    issuer: { en: "LangChain Academy", ar: "LangChain Academy" },
    topic: { en: "LLM frameworks", ar: "أطر عمل النماذج اللغوية" },
    verifyUrl: "https://academy.langchain.com/certificates/dgvh2xuljf",
  },
  {
    id: "ai-tools-for-the-workplace",
    name: { en: "AI Tools for the Workplace", ar: "AI Tools for the Workplace" },
    issuer: {
      en: "UC Santa Cruz (Coursera)",
      ar: "جامعة كاليفورنيا سانتا كروز (Coursera)",
    },
    topic: { en: "AI at work", ar: "الذكاء الاصطناعي في بيئة العمل" },
    verifyUrl: "https://coursera.org/share/fee5191df4290384e03950825f7e29d0",
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
