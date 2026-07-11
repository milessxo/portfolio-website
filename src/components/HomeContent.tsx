import Link from "next/link";
import { certifications } from "@/content/certifications";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { ScrollSection } from "@/components/ScrollSection";

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
          <p className="eyebrow">Hello, I&apos;m</p>
          <h1 id="hero-title">
            <span>Aw Sheng</span>
            <span>You.</span>
          </h1>
          <p className="hero-role">
            Digital Designer <span>&amp;</span> Developer
          </p>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-chips" aria-label="Specialisms">
            <span>Web</span>
            <span>Apps</span>
            <span>Digital design</span>
          </div>
          <div className="hero-details" aria-label="Profile highlights">
            <p>Singapore based</p>
            <p>Year 3 at Republic Polytechnic</p>
          </div>
          <div className="hero-actions">
            <a className="button button--solid" href="#projects">
              View projects
            </a>
            <a className="text-link" href="#about">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <ScrollSection
        id="about"
        index="01"
        className="about content-section"
        side="left"
        labelledBy="about-title"
      >
        <div className="about-copy">
          <Heading eyebrow="01 - About">
            A designer who likes making the final thing too.
          </Heading>
          <p>{profile.about}</p>
          <div className="about-facts" aria-label="About highlights">
            <div className="about-fact">
              <strong>Focus</strong>
              <span>Design and development, together.</span>
            </div>
            <div className="about-fact">
              <strong>Studying</strong>
              <span>Diploma in Digital Design &amp; Development.</span>
            </div>
            <div className="about-fact">
              <strong>Interested in</strong>
              <span>Websites, apps, and interactive experiences.</span>
            </div>
          </div>
          <span
            className="button button--outline placeholder-button"
            aria-label="Resume PDF coming soon"
          >
            Resume coming soon
          </span>
          <small>Add the final resume PDF before release.</small>
        </div>
        <div className="about-visual" aria-hidden="true">
          <div className="fog-orbit">
            <span>creative</span>
            <span>technical</span>
            <span>curious</span>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection
        id="skills"
        index="02"
        className="content-section"
        side="right"
        labelledBy="skills-title"
      >
        <Heading eyebrow="02 - Skills">Tools I think and build with.</Heading>
        <p className="section-intro section-intro--tight">
          A mix of interface, frontend, backend, and design tools that let me
          move from concept to working product.
        </p>
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
      </ScrollSection>

      <ScrollSection
        id="certifications"
        index="03"
        className="content-section"
        side="left"
        labelledBy="cert-title"
      >
        <Heading eyebrow="03 - Certifications">
          Learning, made visible.
        </Heading>
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
      </ScrollSection>

      <ScrollSection
        id="projects"
        index="04"
        className="content-section projects"
        side="right"
        labelledBy="projects-title"
      >
        <Heading eyebrow="04 - Selected work">Projects with purpose.</Heading>
        <p className="section-intro">
          Two builds where design choices meet practical engineering and the
          product logic had to hold up too.
        </p>
        <div className="project-list">
          {projects.map((project, i) => (
            <article
              className={`project-card ${i % 2 === 1 ? "project-card--reverse" : ""}`}
              key={project.slug}
              data-project-index={i}
            >
              <div className="mascot-grip mascot-grip--left" aria-hidden="true" />
              <div className="mascot-grip mascot-grip--right" aria-hidden="true" />
              <div
                className={`project-preview project-preview--${i + 1}`}
                role="img"
                aria-label={project.media[0].alt}
              >
                <span className="preview-index">0{i + 1}</span>
                <div className="preview-window">
                  <div className="preview-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <strong>{project.name}</strong>
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
      </ScrollSection>

      <ScrollSection
        id="contact"
        index="05"
        className="contact content-section"
        side="left"
        labelledBy="contact-title"
      >
        <p className="eyebrow">05 - Contact</p>
        <div className="contact-layout">
          <div>
            <h2 id="contact-title">
              Have a project, opportunity, or idea in mind? <em>Let&apos;s connect.</em>
            </h2>
            <p className="contact-copy">
              I&apos;m open to conversations around design, frontend development,
              and collaborative digital work.
            </p>
          </div>
          <div className="contact-panel">
            <p>Best way to reach me</p>
            <div className="contact-links" aria-label="Contact links">
              <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title={profile.email}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3V5Zm2 2v.7l7 5.1 7-5.1V7H5Zm14 10V10.2l-7 5-7-5V17h14Z" /></svg>
                <span className="sr-only">Email</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.4H3.2V19h3.3V8.4ZM4.8 3A1.9 1.9 0 1 0 4.8 6.8 1.9 1.9 0 0 0 4.8 3Zm7 5.4H8.6V19h3.3v-5.2c0-1.4.3-2.8 2.1-2.8 1.8 0 1.8 1.7 1.8 2.9V19h3.3v-5.8c0-2.9-.6-5.1-4-5.1-1.6 0-2.7.9-3.2 1.7h-.1V8.4Z" /></svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </ScrollSection>
    </>
  );
}
