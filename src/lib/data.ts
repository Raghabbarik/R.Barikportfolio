
import type { NavLink, Service, Skill, Project, About, ContactDetail, Certificate, Thought, Companion } from "@/lib/definitions";
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
  Users,
  Award,
  Heart
} from "lucide-react";

export const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#companions", label: "Companions" },
  { href: "#services", label: "Services" },
  { href: "#clients", label: "Clients" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#certificates", label: "Certificates" },
  { href: "#thoughts", label: "Thoughts" },
  { href: "#contact", label: "Contact" },
];

export const skills: Skill[] = [
  { id: "full-stack-dev", name: "Full-Stack Web Development", level: 90, icon: Code },
  { id: "ui-ux-design", name: "UI/UX Design", level: 95, icon: Palette },
  { id: "web-design", name: "Web Design", level: 88, icon: Globe },
  { id: "template-design", name: "Template Design", level: 82, icon: LayoutTemplate },
];

export const companions: Companion[] = [
  {
    id: "bhavya-bavisi",
    name: "Bhavya Bavisi",
    role: "AI | Backend Developer",
    description: "AI-ML Engineer designing intelligent systems that solve real problems, efficiently and elegantly.",
    imageUrl: "https://picsum.photos/seed/companion1/200/200",
    imageHint: "man portrait",
    profileUrl: "#"
  },
  {
    id: "prapti-mehta",
    name: "Prapti Mehta",
    role: "Frontend + UI Designer",
    description: "Crafting intelligent systems, decoding data, and solving real-world problems with purpose.",
    imageUrl: "https://picsum.photos/seed/companion2/200/200",
    imageHint: "woman portrait",
    profileUrl: "#"
  }
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

export const certificates: Certificate[] = [
    {
      id: "flipkart-2022",
      title: "Flipkart Hackathon",
      issuer: "Flipkart",
      year: "2022",
      imageUrl: "https://picsum.photos/seed/cert1/600/400",
      imageHint: "certificate participation",
      category: "technical",
    },
    {
      id: "solution-challenge-2023",
      title: "Solution Challenge",
      issuer: "Google Developers",
      year: "2023",
      imageUrl: "https://picsum.photos/seed/cert2/600/400",
      imageHint: "certificate achievement",
      category: "technical",
    },
    {
      id: "adira-2025",
      title: "ADira",
      issuer: "SCET AI Club",
      year: "2025",
      imageUrl: "https://picsum.photos/seed/cert3/600/400",
      imageHint: "certificate presentation",
      category: "other",
    },
];

export const thoughts: Thought[] = [
    {
        id: "why-i-love-building-ai-projects",
        title: "Why I Love Building AI Projects",
        excerpt: "Working on AI-based systems like mammogram cancer detection has taught me how impactful technology can be when applied to healthcare. Combining deep learning with real-world problems is my favorite way to innovate.",
        imageUrl: "https://picsum.photos/seed/thought1/800/450",
        imageHint: "AI abstract",
        date: "2025-11-20",
        readTime: 5,
        href: "#"
    },
    {
        id: "the-beauty-of-simple-code",
        title: "The Beauty of Simple Code",
        excerpt: "Clean code isn't just about fewer lines — it's about clarity. Elegance in code feels like poetry to me — each function should have rhythm and purpose.",
        imageUrl: "https://picsum.photos/seed/thought2/800/450",
        imageHint: "code simple",
        date: "2025-11-15",
        readTime: 7,
        href: "#"
    }
];

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
  resumeUrl: "",
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
    id: "github",
    iconName: "Github",
    text: "raghab-barik",
    href: "https://github.com/raghab-barik",
  },
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
    href: "https://www.linkedin.com/in/raghab-barik-b44692337",
  },
  { id: "map-pin", iconName: "MapPin", text: "Chandaka, Bhubaneswar", href: "#" },
];
