"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function OpeningSequence() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("asy-opening-seen")) return;
    const finish = () => { sessionStorage.setItem("asy-opening-seen", "true"); setVisible(false); };
    const reveal = window.setTimeout(() => setVisible(true), 0);
    const timer = window.setTimeout(finish, reduced ? 150 : 2400);
    const escape = (event: KeyboardEvent) => event.key === "Escape" && finish();
    window.addEventListener("keydown", escape);
    return () => { clearTimeout(reveal); clearTimeout(timer); window.removeEventListener("keydown", escape); };
  }, [reduced]);

  const dismiss = () => { sessionStorage.setItem("asy-opening-seen", "true"); setVisible(false); };
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="opening" role="dialog" aria-label="Website introduction" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0.1 : 0.5 }}>
          <div className="opening-fog" aria-hidden="true" />
          <motion.img className="opening-pixel-character" src="/images/hirono-pixel-transparent.png" alt="" aria-hidden="true" initial={{ opacity: 0, y: 50, scale: .86 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .25, duration: reduced ? .1 : 1.2 }} />
          <motion.div className="opening-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 1 }}><strong>ASY</strong><span>Aw Sheng You</span></motion.div>
          <button onClick={dismiss}>Skip introduction</button>
          <div className="opening-progress" aria-label="Loading introduction"><span /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
