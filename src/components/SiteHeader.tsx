"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const links = ["Home", "About", "Skills", "Projects", "Contact"];

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className={`site-header ${compact ? "site-header--compact" : ""}`}>
      <Link className="monogram" href="/" aria-label="Aw Sheng You, home">ASY<span>temporary mark</span></Link>
      <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      <nav id="site-nav" className={open ? "nav-open" : ""} aria-label="Main navigation">
        {links.map((label) => <Link key={label} onClick={() => setOpen(false)} href={label === "Home" ? "/#home" : `/#${label.toLowerCase()}`}>{label}</Link>)}
        <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          <span aria-hidden="true">{theme === "light" ? "◐" : "◑"}</span> {theme === "light" ? "Dark" : "Light"}
        </button>
      </nav>
    </header>
  );
}
