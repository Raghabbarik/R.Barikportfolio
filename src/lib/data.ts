
import type { NavLink, Service, Skill, Project, About, ContactDetail } from "@/lib/definitions";
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
  Users
} from "lucide-react";

export const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#clients", label: "Clients" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export const skills: Skill[] = [
  { id: "full-stack-dev", name: "Full-Stack Web Development", level: 90, icon: Code },
  { id: "ui-ux-design", name: "UI/UX Design", level: 95, icon: Palette },
  { id: "web-design", name: "Web Design", level: 88, icon: Globe },
  { id: "template-design", name: "Template Design", level: 82, icon: LayoutTemplate },
];

export const services: Service[] = [
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Wireframing, prototyping, and user-centric design.",
    icon: PenTool,
  },
  {
    id: "web-design",
    title: "Web Design",
    description: "Responsive and modern website layouts.",
    icon: Monitor,
  },
  {
    id: "full-stack-dev",
    title: "Full-Stack Development",
    description: "Frontend + backend development.",
    icon: Server,
  },
  {
    id: "template-design",
    title: "Template Design",
    description: "Custom templates for photos, videos, and web use.",
    icon: LayoutTemplate,
  },
];

export const projects: Project[] = [];

export const about: About = {
  tagline: "About Me",
  title: "A little bit about me",
  description: "My name is Raghab Barik. I am a full-stack web developer and UI/UX designer currently pursuing my B.Tech (2nd year) at Nalanda Institute of Technology, Bhubaneswar. Alongside my studies, I also work with Stoup as a website developer.",
  education: {
      degree: "B.Tech, 2nd Year",
      institution: "Nalanda Institute of Technology, Bhubaneswar"
  },
  experience: {
      role: "Website Developer",
      company: "at Stoup"
  },
  profileImageUrl: "https://i.postimg.cc/8zQ8J3vW/image.png",
  profileImageHint: "man standing",
  aboutImageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb2RlJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzYzNjQ5NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  aboutImageHint: "code abstract",
}

export const contactDetails: ContactDetail[] = [
  {
    id: "email",
    iconName: "Mail",
    text: "rraghabbarik@gmail.com",
    href: "mailto:rraghabbarik@gmail.com",
  },
  { id: "phone", iconName: "Phone", text: "7205376243", href: "tel:7205376243" },
  {
    id: "instagram",
    iconName: "Instagram",
    text: "@mr_raghab_786",
    href: "https://www.instagram.com/mr_raghab_786",
  },
  {
    id: "linkedin",
    iconName: "Linkedin",
    text: "Raghab Barik",
    href: "https://www.linkedin.com/in/raghab-barik-raghab-barik-b44692337",
  },
  { id: "map-pin", iconName: "MapPin", text: "Chandaka, Bhubaneswar", href: "#" },
];
