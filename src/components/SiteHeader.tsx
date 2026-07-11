"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PixelThemeSwitch } from "./PixelThemeSwitch";

const links = [
  "Home",
  "About",
  "Skills",
  "Certifications",
  "Projects",
  "Contact",
];

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className={`site-header ${compact ? "site-header--compact" : ""}`}>
      <Link className="monogram" href="/" aria-label="Aw Sheng You, home">
        ASY<span>Design + development</span>
      </Link>
      <nav
        id="site-nav"
        className={open ? "nav-open" : ""}
        aria-label="Main navigation"
      >
        {links.map((label) => (
          <Link
            key={label}
            onClick={() => setOpen(false)}
            href={label === "Home" ? "/#home" : `/#${label.toLowerCase()}`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-controls">
        <PixelThemeSwitch />
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
