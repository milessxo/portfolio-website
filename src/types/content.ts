export type ProjectMedia = {
  type: "image" | "video" | "gif" | "diagram";
  src?: string;
  alt: string;
  caption: string;
  placeholder: boolean;
};

export type Project = {
  slug: string;
  name: string;
  type: string;
  summary: string;
  role: string;
  technologies: string[];
  overview: string;
  features: string[];
  outcome: string;
  media: ProjectMedia[];
  repositoryUrl?: string;
  demoUrl?: string;
};

export type Skill = { name: string; category: string; glyph: string };

export type Certification = {
  title: string;
  issuer: string;
  thumbnail?: string;
  url?: string;
};
