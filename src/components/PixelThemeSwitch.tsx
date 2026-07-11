"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useTheme } from "./ThemeProvider";

type SwitchPhase = "to-dark" | "to-light" | null;

export function PixelThemeSwitch({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<SwitchPhase>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDark = theme === "dark";
  const next = theme === "light" ? "dark" : "light";

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleToggle = () => {
    if (phase) return;
    if (!reducedMotion) {
      setPhase(isDark ? "to-light" : "to-dark");
      timerRef.current = setTimeout(() => setPhase(null), 100);
    }
    toggle();
  };

  return (
    <button
      type="button"
      className={`pixel-theme-switch pixel-theme-switch--${isDark ? "dark" : "light"}${phase ? ` pixel-theme-switch--${phase}` : ""} ${className}`.trim()}
      onClick={handleToggle}
      aria-label={`Switch to ${next} mode`}
      aria-pressed={isDark}
      title={`Switch to ${next} mode`}
    >
      <span className="pixel-switch-sprite" aria-hidden="true" />
      <span className="sr-only">{theme} mode</span>
    </button>
  );
}
