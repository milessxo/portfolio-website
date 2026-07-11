import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "discord-bot",
    name: "Multifunctional Discord Bot",
    type: "Individual project",
    summary:
      "A configurable community bot that connects Discord with livestream and game data.",
    role:
      "Independent developer - product design, bot logic, API integrations, data modelling, and supporting web services.",
    technologies: [
      "JavaScript",
      "Node.js",
      "Discord.js",
      "MongoDB",
      "Mongoose",
      "Express",
      "Twitch API",
      "Valorant API",
    ],
    overview:
      "A multifunctional Discord bot designed to bring community management, streaming updates, and player data into one cohesive server experience.",
    features: [
      "Slash commands",
      "Automated welcome messages",
      "Interactive role verification",
      "Configurable server features",
      "Twitch livestream notifications",
      "Valorant IGN registration",
      "Rank and match-record checking",
      "User-linked game data storage",
    ],
    outcome:
      "Project evidence and a verified outcome statement are being prepared. No performance claims have been added without supporting data.",
    media: [
      {
        type: "image",
        alt: "Discord bot interface preview placeholder",
        caption: "Discord screenshots and command examples coming soon",
        placeholder: true,
      },
    ],
  },
  {
    slug: "study-buddy",
    name: "Study Buddy",
    type: "Two-person project",
    summary:
      "A full-stack platform for creating, finding, and managing collaborative study sessions.",
    role:
      "Full-stack developer. Work was shared across the React frontend, Node.js and Express backend, and MySQL database.",
    technologies: ["React", "Node.js", "Express", "MySQL", "REST API"],
    overview:
      "Study Buddy helps students organize study sessions by module while keeping ownership and protected actions clear throughout the experience.",
    features: [
      "User registration and login",
      "Create, view, edit, and delete study sessions",
      "Module filtering",
      "Host information",
      "Ownership checks",
      "Protected create, edit, and delete actions",
      "REST API integration",
      "Deployment support",
    ],
    outcome:
      "Final screenshots, deployment links, and an evidence-based outcome statement are coming soon.",
    media: [
      {
        type: "image",
        alt: "Study Buddy application preview placeholder",
        caption: "Application mock-ups coming soon",
        placeholder: true,
      },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
