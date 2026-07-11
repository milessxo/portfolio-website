"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Action = "idle" | "about" | "skills" | "projects" | "contact";

const actions: Record<Action, { src: string; frameMs: number; label: string }> = {
  idle: { src: "/sprites/idle.png", frameMs: 280, label: "tired idle" },
  about: { src: "/sprites/about.png", frameMs: 240, label: "melancholy thinking" },
  skills: { src: "/sprites/skills.png", frameMs: 210, label: "guarded presenting" },
  projects: { src: "/sprites/projects.png", frameMs: 170, label: "irritated project gesture" },
  contact: { src: "/sprites/contact.png", frameMs: 230, label: "sad wave" },
};

type Pose = { action: Action; x: number; y: number; facing: "left" | "right" };

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function PixelCharacter() {
  const reduced = useReducedMotion();
  const guide = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<number | undefined>(undefined);
  const [action, setAction] = useState<Action>("idle");
  const [scrolling, setScrolling] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [frame, setFrame] = useState(0);
  const [facing, setFacing] = useState<"left" | "right">("left");

  useEffect(() => {
    if (reduced) return;
    let request = 0;
    let previousY = window.scrollY;

    const update = () => {
      request = 0;
      const mobile = innerWidth < 680;
      const spriteWidth = mobile ? 272 : 408;
      const scrollCenter = scrollY + innerHeight * 0.52;
      const sections = ["home", "about", "skills", "certifications", "projects", "contact"]
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));

      const anchors: Pose[] = [
        { action: "idle", x: innerWidth - spriteWidth - (mobile ? -52 : 48), y: mobile ? 190 : innerHeight * 0.16, facing: "left" },
        { action: "about", x: mobile ? innerWidth - 220 : innerWidth * 0.62, y: mobile ? innerHeight * 0.46 : innerHeight * 0.24, facing: "left" },
        { action: "skills", x: mobile ? -92 : 28, y: mobile ? innerHeight * 0.42 : innerHeight * 0.33, facing: "right" },
        { action: "skills", x: mobile ? innerWidth - 190 : innerWidth - spriteWidth - 22, y: mobile ? innerHeight * 0.48 : innerHeight * 0.35, facing: "left" },
        { action: "projects", x: mobile ? innerWidth - 208 : innerWidth * 0.64, y: mobile ? innerHeight * 0.47 : innerHeight * 0.36, facing: "left" },
        { action: "contact", x: mobile ? -74 : 36, y: mobile ? innerHeight * 0.18 : innerHeight * 0.11, facing: "right" },
      ];

      let fromIndex = sections.findIndex((section) => scrollCenter < section.offsetTop + section.offsetHeight);
      if (fromIndex < 0) fromIndex = sections.length - 1;
      const toIndex = Math.min(anchors.length - 1, fromIndex + 1);
      const activeSection = sections[fromIndex];
      const localProgress = activeSection
        ? clamp((scrollCenter - activeSection.offsetTop) / Math.max(1, activeSection.offsetHeight))
        : 0;
      const transitionStart = activeSection?.classList.contains("scroll-stage") ? 0.74 : 0.72;
      const progress = fromIndex === toIndex ? 0 : clamp((localProgress - transitionStart) / (0.96 - transitionStart));
      const eased = progress * progress * (3 - 2 * progress);
      const from = anchors[fromIndex];
      const to = anchors[toIndex];
      const x = Math.round(from.x + (to.x - from.x) * eased);
      const y = Math.round(from.y + (to.y - from.y) * eased + Math.sin(progress * Math.PI) * -28);

      guide.current?.style.setProperty("--mascot-x", `${x}px`);
      guide.current?.style.setProperty("--mascot-y", `${y}px`);
      setAction(progress > 0.52 ? to.action : from.action);
      setFacing(progress > 0.52 ? to.facing : from.facing);
      setFrame(Math.min(3, Math.floor(progress * 4)));
      setTransitioning(progress > 0 && progress < 1);

      const projectCards = Array.from(document.querySelectorAll<HTMLElement>("[data-project-index]"));
      const activeCard = projectCards.findIndex((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top < innerHeight * 0.72 && rect.bottom > innerHeight * 0.32;
      });
      document.documentElement.dataset.mascotCard = activeCard >= 0 ? String(activeCard) : "none";

      if (activeCard >= 0) {
        const activeRect = projectCards[activeCard].getBoundingClientRect();
        const projectX = activeCard === 0
          ? (mobile ? innerWidth - 208 : innerWidth - spriteWidth - 26)
          : (mobile ? -64 : 28);
        const projectY = Math.round(clamp(
          activeRect.top > innerHeight * 0.18
            ? activeRect.top - 76
            : activeRect.bottom - spriteWidth * 0.54,
          innerHeight * 0.14,
          innerHeight * 0.48,
        ));
        guide.current?.style.setProperty("--mascot-x", `${projectX}px`);
        guide.current?.style.setProperty("--mascot-y", `${projectY}px`);
        setFacing(activeCard === 0 ? "left" : "right");
      }

      const footer = document.querySelector("footer");
      const footerTop = footer?.getBoundingClientRect().top ?? innerHeight * 2;
      const footerFade = clamp((footerTop - innerHeight * 0.35) / (innerHeight * 0.38));
      guide.current?.style.setProperty("--mascot-opacity", String(footerFade));
      previousY = scrollY;
    };

    const onScroll = () => {
      if (window.scrollY !== previousY) {
        setScrolling(true);
        window.clearTimeout(idleTimer.current);
        idleTimer.current = window.setTimeout(() => setScrolling(false), 170);
      }
      if (!request) request = requestAnimationFrame(update);
    };

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (request) cancelAnimationFrame(request);
      window.clearTimeout(idleTimer.current);
      delete document.documentElement.dataset.mascotCard;
    };
  }, [reduced]);

  const current = actions[action];
  const position = `${frame * 33.3333}% 0`;

  return (
    <div
      ref={guide}
      className={`pixel-guide pixel-guide--${action} pixel-guide--facing-${facing} ${scrolling ? "pixel-guide--scrolling" : ""} ${transitioning ? "pixel-guide--transitioning" : "pixel-guide--idle"} ${reduced ? "pixel-guide--still" : ""}`}
      aria-hidden="true"
      data-action={current.label}
    >
      <div className="pixel-shadow" />
      <div className="sprite-window">
        <div
          key={action}
          className="sprite-strip"
          style={{
            backgroundImage: `url(${current.src})`,
            backgroundPosition: transitioning ? position : undefined,
            animationDuration: `${current.frameMs * 4}ms`,
          }}
        />
      </div>
    </div>
  );
}
