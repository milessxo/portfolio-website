import Link from "next/link";
import { certifications } from "@/content/certifications";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";

function Heading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  const id = eyebrow.includes("About")
    ? "about-title"
    : eyebrow.includes("Skills")
      ? "skills-title"
      : eyebrow.includes("Certifications")
        ? "cert-title"
        : "projects-title";
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2 id={id}>{children}</h2>
    </div>
  );
}

export function HomeContent() {
  return (
    <>
      <section
        id="home"
        className="hero section-shell"
        aria-labelledby="hero-title"
      >
        <div className="hero-copy">
          <p className="eyebrow">Hello, I’m</p>
          <h1 id="hero-title">
            Aw Sheng
            <br />
            You.
          </h1>
          <p className="hero-role">
            Digital Designer <span>&amp;</span> Developer
          </p>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-chips" aria-label="Specialisms"><span>Web</span><span>Apps</span><span>Digital design</span></div>
          <div className="hero-actions">
            <a className="button button--solid" href="#projects">
              View projects
            </a>
            <a className="text-link" href="#about">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <p className="hero-note">
          An original temporary mascot guides the experience.
        </p>
      </section>

      <section
        id="about"
        className="about section-shell content-section"
        aria-labelledby="about-title"
      >
        <div className="about-copy">
          <Heading eyebrow="01 — About">A little bit about me.</Heading>
          <p>{profile.about}</p>
          <span
            className="button button--outline placeholder-button"
            aria-label="Resume PDF coming soon"
          >
            Resume coming soon
          </span>
          <small>
            Add the final resume PDF before release.
          </small>
        </div>
        <div className="about-visual" aria-hidden="true">
          <div className="fog-orbit">
            <span>creative</span>
            <span>technical</span>
            <span>curious</span>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="section-shell content-section"
        aria-labelledby="skills-title"
      >
        <Heading eyebrow="02 — Skills">Tools I think and build with.</Heading>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <article
              className="skill-card"
              key={skill.name}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span aria-hidden="true">{skill.glyph}</span>
              <div>
                <h3>{skill.name}</h3>
                <p>{skill.category}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="certifications"
        className="section-shell content-section"
        aria-labelledby="cert-title"
      >
        <Heading eyebrow="03 — Certifications">Learning, made visible.</Heading>
        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <article className="cert-card" key={cert.title}>
              <div
                className="cert-thumb"
                role="img"
                aria-label={`${cert.title} certificate thumbnail placeholder`}
              >
                <span>0{i + 1}</span>
                <small>Certificate preview</small>
              </div>
              <div>
                <p>{cert.issuer}</p>
                <h3>{cert.title}</h3>
                <span
                  className="placeholder-label"
                  aria-label="Certificate link coming soon"
                >
                  Link coming soon
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="projects"
        className="section-shell content-section projects"
        aria-labelledby="projects-title"
      >
        <Heading eyebrow="04 — Selected work">Projects with purpose.</Heading>
        <p className="section-intro">
          Two builds where design choices meet practical engineering.
        </p>
        <div className="project-list">
          {projects.map((project, i) => (
            <article className="project-card" key={project.slug}>
              <div
                className={`project-preview project-preview--${i + 1}`}
                role="img"
                aria-label={project.media[0].alt}
              >
                <span className="preview-index">0{i + 1}</span>
                <div className="preview-window">
                  <i />
                  <i />
                  <i />
                  <p>{project.media[0].caption}</p>
                </div>
              </div>
              <div className="project-info">
                <p className="project-type">{project.type}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="tags" aria-label="Technologies">
                  {project.technologies.slice(0, 5).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <p className="project-role">
                  <strong>My role</strong>
                  {project.role}
                </p>
                <Link
                  className="button button--solid"
                  href={`/projects/${project.slug}`}
                >
                  View project <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="contact section-shell content-section"
        aria-labelledby="contact-title"
      >
        <p className="eyebrow">05 — Contact</p>
        <h2 id="contact-title">
          Have a project, opportunity, or idea in mind? <em>Let’s connect.</em>
        </h2>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>
            {profile.email}
            <span aria-hidden="true">↗</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn<span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
