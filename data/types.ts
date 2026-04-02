export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  liveUrl?: string;  // set only for verified-live URLs; undefined = dead link (no clickable card)
  accent: 'violet' | 'pink' | 'cyan' | 'lime' | 'orange';
  tech: string[];
  type: 'client' | 'co-built' | 'internal' | 'oss';
  hasCaseStudy: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  email: string;
  telephone?: string;
  photo?: string;
  skills: string[];
}

export interface TechRationaleItem {
  technology: string;
  problem: string;
  solution: string;
}

export interface ImplementationHighlight {
  title: string;
  detail: string;
}

export interface ResultMetric {
  metric: string;       // short label, e.g. "Match Quality"
  description: string;  // qualitative impact statement (per D-03)
}

export interface TeamContribution {
  name: string;         // matches TeamMember.name exactly
  contribution: string; // per-person sentence about their role on this project
}

export interface PatternSpotlight {
  dbName: string;       // "DynamoDB" | "MongoDB" — project-specific primary DB
  body: string;         // 2-3 sentences explaining how Redis + OpenSearch + DB pattern is applied in this project
}

export interface CaseStudy {
  slug: string;
  projectSlug: string;                     // links to projects.ts via Project.slug
  title: string;
  tagline: string;
  challenge: string;                       // prose string, 2-3 paragraphs (per UI-SPEC Section 02)
  patternSpotlight: PatternSpotlight;
  architectureDiagram: string;             // key: 'gleemeet' | 'careerbox' | 'zorova' — resolved to component via diagramMap in page
  techRationale: TechRationaleItem[];      // exactly 3 items (one per column in 3-col grid)
  implementationHighlights: ImplementationHighlight[];  // 3-5 items
  results: ResultMetric[];                 // 2-4 items (per CASE-07, D-03: qualitative only)
  team: TeamContribution[];                // per-person contribution (per CASE-09)
}
