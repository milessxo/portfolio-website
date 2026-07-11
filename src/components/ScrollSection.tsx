"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ScrollSectionProps = {
  id: string;
  index: string;
  className?: string;
  side: "left" | "right";
  labelledBy: string;
  children: React.ReactNode;
};

export function ScrollSection({ id, index, className = "", side, labelledBy, children }: ScrollSectionProps) {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const direction = side === "left" ? -1 : 1;
  const x = useTransform(scrollYProgress, [0, 0.12, 0.76, 0.9, 1], reduced ? [0, 0, 0, 0, 0] : [direction * 130, 0, 0, direction * -150, direction * -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.09, 0.78, 0.9, 1], reduced ? [1, 1, 1, 1, 1] : [0, 1, 1, 0, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.16, 0.76, 0.9], reduced ? [0, 0, 0, 0] : [58, 0, 0, -38]);
  const sceneX = useTransform(scrollYProgress, [0, 0.16, 0.72, 0.9, 1], reduced ? [0, 0, 0, 0, 0] : [direction * -110, 0, 0, direction * 170, direction * 230]);
  const sceneY = useTransform(scrollYProgress, [0, 0.72, 0.9, 1], reduced ? [0, 0, 0, 0] : [70, 0, -100, -180]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.18, 0.74, 0.92, 1], reduced ? [1, 1, 1, 1, 1] : [0.72, 1, 1, 1.3, 1.5]);
  const sceneRotate = useTransform(scrollYProgress, [0, 0.74, 1], reduced ? [0, 0, 0] : [direction * -8, 0, direction * 16]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.97, 1], reduced ? [0.5, 0.5, 0.5, 0.5, 0.5] : [0, 0.52, 0.52, 0.12, 0]);

  return (
    <section ref={section} id={id} className={`scroll-stage scroll-stage--${side} ${className}`} aria-labelledby={labelledBy}>
      <motion.div className="scroll-scene" aria-hidden="true" style={{ x: sceneX, y: sceneY, scale: sceneScale, rotate: sceneRotate, opacity: sceneOpacity }}>
        <span>{index}</span>
        <i />
        <i />
        <i />
      </motion.div>
      <motion.div className="scroll-panel" style={{ x, opacity }}>
        <motion.div className="scroll-panel__content" style={{ y: headingY }}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
