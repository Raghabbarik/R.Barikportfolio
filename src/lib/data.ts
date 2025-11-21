import type { NavLink, Service, Skill, Project } from "@/lib/definitions";
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
} from "lucide-react";

export const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export const skills: Skill[] = [
  { name: "Full-Stack Web Development", level: 90, icon: Code },
  { name: "UI/UX Design", level: 85, icon: Palette },
  { name: "Web Design", level: 88, icon: Globe },
  { name: "Template Design", level: 82, icon: LayoutTemplate },
];

export const services: Service[] = [
  {
    title: "UI/UX Design",
    description: "Wireframing, prototyping, and user-centric design.",
    icon: PenTool,
  },
  {
    title: "Web Design",
    description: "Responsive and modern website layouts.",
    icon: Monitor,
  },
  {
    title: "Full-Stack Development",
    description: "Frontend + backend development.",
    icon: Server,
  },
  {
    title: "Template Design",
    description: "Custom templates for photos, videos, and web use.",
    icon: LayoutTemplate,
  },
];

export const projects: Project[] = [
  {
    id: "wonderlight-adventure",
    title: "Wonderlight Adventure — Startup Website",
    description:
      "A modern website developed for the Wonderlight Adventure startup. My design approach focused on creating an immersive and visually appealing experience that captures the spirit of adventure. The site is fully responsive, ensuring a seamless experience across all devices.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    imageUrl: "wonderlight-project",
    imageHint: "adventure website",
    liveDemoUrl: "#",
  },
];

export const contactDetails = [
  {
    icon: Mail,
    text: "rraghabbarik@gmail.com",
    href: "mailto:rraghabbarik@gmail.com",
  },
  { icon: Phone, text: "7205376243", href: "tel:7205376243" },
  {
    icon: Instagram,
    text: "@mr_raghab_786",
    href: "https://www.instagram.com/mr_raghab_786",
  },
  {
    icon: Linkedin,
    text: "Raghab Barik",
    href: "https://www.linkedin.com/in/raghab-barik-raghab-barik-b44692337",
  },
  { icon: MapPin, text: "Chandaka, Bhubaneswar", href: "#" },
];
