import {
  Award,
  BookOpen,
  Bot,
  Brain,
  Briefcase,
  ChartColumn,
  Code,
  Compass,
  Cpu,
  Database,
  GraduationCap,
  Handshake,
  Layers,
  Lightbulb,
  Mic,
  Rocket,
  Smartphone,
  Sparkles,
  Stethoscope,
  Users,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/types";

/**
 * Maps the icon keys used in data files to Lucide components, so data
 * stays plain and serialisable. Add a key to `IconName` and an entry here
 * to make a new icon available.
 */
const registry: Record<IconName, LucideIcon> = {
  award: Award,
  barChart: ChartColumn,
  bookOpen: BookOpen,
  bot: Bot,
  brain: Brain,
  briefcase: Briefcase,
  code: Code,
  compass: Compass,
  cpu: Cpu,
  database: Database,
  graduationCap: GraduationCap,
  handshake: Handshake,
  layers: Layers,
  lightbulb: Lightbulb,
  mic: Mic,
  rocket: Rocket,
  smartphone: Smartphone,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  users: Users,
  wrench: Wrench,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = registry[name];
  return <Component aria-hidden="true" strokeWidth={1.6} {...props} />;
}
