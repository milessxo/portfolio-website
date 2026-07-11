"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PixelThemeSwitch } from "./PixelThemeSwitch";

export function OpeningSequence() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setReady(true), reduced ? 40 : 2150);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduced]);

  useEffect(() => {
    if (!ready || !visible) return;
    const dismissOnWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > 6) setVisible(false);
    };
    const dismissOnKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) setVisible(false);
      if (event.key === "Escape") setVisible(false);
    };
    const dismissOnTouch = () => setVisible(false);
    window.addEventListener("wheel", dismissOnWheel, { passive: true });
    window.addEventListener("keydown", dismissOnKey);
    window.addEventListener("touchmove", dismissOnTouch, { passive: true });
    return () => {
      window.removeEventListener("wheel", dismissOnWheel);
      window.removeEventListener("keydown", dismissOnKey);
      window.removeEventListener("touchmove", dismissOnTouch);
    };
  }, [ready, visible]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    }
  }, [ready, visible]);

  const dismiss = () => ready && setVisible(false);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className={`opening ${ready ? "opening--ready" : ""}`} role="dialog" aria-label="Website introduction" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: reduced ? 0.1 : 0.85, ease: [0.22, 1, 0.36, 1] }}>
          <div className="opening-fog opening-fog--back" aria-hidden="true" />
          <div className="opening-fog opening-fog--front" aria-hidden="true" />
          <div className="opening-fog-tunnel" aria-hidden="true">
            <i /><i /><i /><i /><i /><i />
          </div>
          <PixelThemeSwitch className="opening-theme-switch" />
          <motion.div
            className="opening-stage"
            initial={reduced ? false : { scale: 0.42, opacity: 0.08, filter: "blur(18px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: reduced ? 0.1 : 2, ease: [0.12, 0.72, 0.18, 1] }}
          >
            <motion.div
              className="opening-pixel-character"
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0.08, scale: 0.62, y: 90 }}
              animate={{ opacity: 1, scale: 1.06, y: 0 }}
              exit={{ x: "30vw", y: "-5vh", opacity: 0, transition: { duration: reduced ? .1 : .68, delay: 0 } }}
              transition={{ delay: reduced ? 0 : .16, duration: reduced ? .1 : 1.84, ease: [0.12, 0.72, 0.18, 1] }}
            >
              <span />
            </motion.div>
            <motion.div className="opening-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 1.45, duration: reduced ? .1 : .55, ease: [0.22, 1, 0.36, 1] }}>
              <p>Welcome to the fog.</p>
              <h1>Let&apos;s make something <em>thoughtful.</em></h1>
              <span>Portfolio of Aw Sheng You</span>
            </motion.div>
          </motion.div>
          <button className="opening-scroll" onClick={dismiss} disabled={!ready} aria-label="Enter portfolio">
            <span>Enter portfolio</span>
            <i aria-hidden="true">↓</i>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
