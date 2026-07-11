import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.summary } : {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);

  if (!project) notFound();

  const sections = [
    ["Overview", <p key="overview">{project.overview}</p>],
    [
      "Key Features",
      <ul key="features">
        {project.features.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>,
    ],
    ["My Role", <p key="role">{project.role}</p>],
    [
      "Technologies",
      <div className="tags case-tags" key="tech">
        {project.technologies.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>,
    ],
    ["Outcome", <p key="outcome">{project.outcome}</p>],
  ];

  return (
    <>
      <SiteHeader compact />
      <main id="main-content" className="case-study">
        <header className="case-hero">
          <Link href="/#projects" className="text-link">
            ← Back to projects
          </Link>
          <p>{project.type}</p>
          <h1>{project.name}</h1>
          <p className="case-summary">{project.summary}</p>
          <div
            className="case-preview"
            role="img"
            aria-label={project.media[0].alt}
          >
            <span>Project evidence</span>
            <strong>{project.media[0].caption}</strong>
          </div>
        </header>
        {sections.map(([title, content], i) => (
          <section className="case-section" key={String(title)}>
            <p>0{i + 1}</p>
            <div>
              <h2>{title}</h2>
              {content}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
