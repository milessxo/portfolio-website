/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Action = "idle" | "about" | "skills" | "projects" | "contact";
const frameWidth = 136;
const frameHeight = 181;

const actions: Record<Action, { src: string; frameMs: number; label: string }> = {
  idle: { src: "/sprites/idle.png", frameMs: 280, label: "tired idle" },
  about: { src: "/sprites/about.png", frameMs: 240, label: "melancholy thinking" },
  skills: { src: "/sprites/skills.png", frameMs: 210, label: "guarded presenting" },
  projects: { src: "/sprites/projects.png", frameMs: 170, label: "irritated project gesture" },
  contact: { src: "/sprites/contact.png", frameMs: 230, label: "sad wave" },
};

export function PixelCharacter() {
  const reduced = useReducedMotion();
  const [action, setAction] = useState<Action>("idle");

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = innerHeight * .5;
      const candidates: Array<{ action: Action; id: string }> = [
        { action: "idle", id: "home" }, { action: "about", id: "about" },
        { action: "skills", id: "skills" }, { action: "skills", id: "certifications" },
        { action: "projects", id: "projects" }, { action: "contact", id: "contact" },
      ];
      let closest: { action: Action; distance: number } = { action: "idle", distance: Infinity };
      for (const candidate of candidates) {
        const element = document.getElementById(candidate.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        const distance = rect.top <= center && rect.bottom >= center ? 0 : Math.min(Math.abs(rect.top - center), Math.abs(rect.bottom - center));
        if (distance < closest.distance) closest = { action: candidate.action, distance };
      }
      setAction(closest.action);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    update();
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [reduced]);

  const current = actions[action];
  return (
    <div className={`pixel-guide pixel-guide--${action} ${reduced ? "pixel-guide--still" : ""}`} aria-hidden="true" data-action={current.label}>
      <div className="pixel-shadow" />
      <div className="sprite-window" data-frame-width={frameWidth} data-frame-height={frameHeight}>
        <img key={action} className="sprite-strip" src={current.src} alt="" style={{ animationDuration: `${current.frameMs * 4}ms` }} />
      </div>
    </div>
  );
}
