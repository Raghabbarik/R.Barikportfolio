export type NavLink = {
  href: string;
  label: string;
};

export type Skill = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Service = {
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
  liveDemoUrl?: string;
};
