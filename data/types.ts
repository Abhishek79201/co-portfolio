export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  accent: 'violet' | 'pink' | 'cyan' | 'lime' | 'orange';
  tech: string[];
  type: 'client' | 'co-built' | 'internal';
  hasCaseStudy: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  email: string;
  photo?: string;
  skills: string[];
}

export interface CaseStudySection {
  heading: string;
  content: string;
}

export interface CaseStudy {
  slug: string;
  projectSlug: string;
  title: string;
  tagline: string;
  challenge: CaseStudySection;
  techStack: {
    category: string;
    items: string[];
  }[];
  architecture: CaseStudySection;
  results: CaseStudySection;
  team: string[];
}
