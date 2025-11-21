
import {
  Code,
  PenTool,
  Monitor,
  LayoutTemplate,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  MapPin,
  Palette,
  Server,
  Globe,
  Briefcase,
  GraduationCap,
  PlusCircle,
  LucideIcon
} from "lucide-react";
import type { IconMap } from "./definitions";

const iconMap: IconMap = {
  Code,
  PenTool,
  Monitor,
  LayoutTemplate,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  MapPin,
  Palette,
  Server,
  Globe,
  Briefcase,
  GraduationCap,
  PlusCircle,
  // Add skill names to map to icons
  "Full-Stack Web Development": Code,
  "UI/UX Design": Palette,
  "Web Design": Globe,
  "Template Design": LayoutTemplate,
  // Add service titles to map to icons
  "Full-Stack Development": Server,
};

export const getIcon = (name: string): LucideIcon => {
  return iconMap[name] || Monitor; // Return a default icon
};

export const iconNames = Object.keys(iconMap);
