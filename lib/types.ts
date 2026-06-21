// Shared content contract. Both the project grid (UI) and the chatbot corpus
// read from this shape, so a fact is written once and stays consistent.

export interface ProjectLink {
  label: string;
  href: string;
}

/** Strongest form of evidence a project can show — drives the card badge. */
export type ProjectProof = "live-demo" | "public-repo" | "case-study";

export interface Project {
  /** url-safe id, also used for optional /projects/[slug] pages */
  slug: string;
  title: string;
  /** one-line positioning shown under the title */
  tagline: string;
  /** 1–2 sentence summary on the card */
  blurb: string;
  /** longer paragraph; feeds the chatbot corpus */
  writeup: string;
  /** stack tags, most relevant first */
  tech: string[];
  /** verified bullet points (metrics / achievements) — no unverified facts */
  highlights: string[];
  /** repo, live demo, etc. Only verified, live links. */
  links: ProjectLink[];
  proof: ProjectProof;
  featured: boolean;
  /** ascending display order; strongest project first */
  order: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SiteProfile {
  name: string;
  headline: string;
  subline: string;
  bio: string;
  location: string;
  education: string;
  targetRoles: string[];
  skills: string[];
  contact: {
    email: string;
    github: string;
    githubUrl: string;
    linkedinUrl: string;
    resumeUrl: string;
  };
}
