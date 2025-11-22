import type { LucideIcon } from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
  icon: React.ComponentType<{ className?: string }>;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageHint: string;
  liveDemoUrl: string;
};

export type About = {
    tagline: string;
    title: string;
    description: string;
    education: {
        degree: string;
        institution: string;
    };
    experience: {
        role: string;
        company: string;
    };
    profileImageUrl: string;
    profileImageHint: string;
    aboutImageUrl: string;
    aboutImageHint: string;
};

export type ContactDetail = {
  id: string;
  iconName: string;
  text: string;
  href: string;
}

export type IconMap = {
  [key: string]: LucideIcon;
};
