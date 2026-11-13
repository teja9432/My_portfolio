import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { person } from "../data/content";
import { Icon } from "./ui";
import s from "./Header.module.css";

const NAV = [
  ["about", "About"],
  ["ai", "AI"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
];

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState(null); // unknown until mounted (SSR-safe)
  useEffect(() => setTheme(currentTheme()), []);

  const toggle = () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    setTheme(next);
  };

  const label = theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle theme";
  return (
    <button type="button" className={s.iconBtn} onClick={toggle} aria-label={label} title={label}>
      <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={s.header}>
      <div className={`container ${s.bar}`}>
        <Link to="/" className={s.brand} aria-label={`${person.shortName}, home`}>
          {person.shortName}
          <span className={s.dot} aria-hidden="true">.</span>
        </Link>

        <nav aria-label="Primary" className={s.nav}>
          <ul id="primary-nav" className={`${s.links} ${open ? s.open : ""}`}>
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a href={`/#${id}`} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <ThemeToggle />
          <button
            type="button"
            className={`${s.iconBtn} ${s.menuBtn}`}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
