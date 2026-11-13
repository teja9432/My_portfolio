import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { usePortfolio } from "../../context/PortfolioContext";

const NAV_ITEMS = [
  { id: "hero", label: "Home", icon: "bi-house-door-fill", mobileIcon: "bi-house-door" },
  { id: "about", label: "About", icon: "bi-person-fill", mobileIcon: "bi-person" },
  { id: "internships", label: "Experience", icon: "bi-briefcase-fill", mobileIcon: "bi-briefcase" },
  { id: "skill", label: "Skills", icon: "bi-code-slash", mobileIcon: "bi-code-slash" },
  { id: "cert", label: "Certifications", icon: "bi-award-fill", mobileIcon: "bi-award" },
  { id: "proj", label: "Projects", icon: "bi-grid-fill", mobileIcon: "bi-grid" },
  { id: "contact", label: "Contact", icon: "bi-envelope-fill", mobileIcon: "bi-envelope" },
];

export const Navbar = () => {
  const { hero } = usePortfolio();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  // Track scroll + active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy
      const offsets = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveSection(closest.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <button className={styles.logo} onClick={() => scrollTo("hero")}>
            <span className={styles.logoIcon}>TR</span>
            <span className={styles.logoText}>{"Tejeswara Rao"}</span>
          </button>

          {/* Desktop Links */}
          <ul className={styles.desktopLinks}>
            {NAV_ITEMS.map(({ id, label, icon }) => (
              <li key={id}>
                <button
                  className={`${styles.navLink} ${activeSection === id ? styles.active : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  <i className={`bi ${icon} ${styles.navIcon}`} />
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Admin + Hamburger */}
          <div className={styles.rightActions}>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} />
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {menuOpen && (
          <div className={styles.drawer} ref={drawerRef}>
            {NAV_ITEMS.map(({ id, label, icon }) => (
              <button
                key={id}
                className={`${styles.drawerItem} ${activeSection === id ? styles.drawerItemActive : ""}`}
                onClick={() => scrollTo(id)}
              >
                <i className={`bi ${icon}`} />
                {label}
              </button>
            ))}

          </div>
        )}
      </nav>

      {/* ── MOBILE BOTTOM TAB BAR ── */}
      <nav className={styles.bottomNav}>
        {NAV_ITEMS.map(({ id, label, mobileIcon }) => (
          <button
            key={id}
            className={`${styles.bottomNavItem} ${activeSection === id ? styles.bottomNavActive : ""}`}
            onClick={() => scrollTo(id)}
          >
            <span className={styles.bottomNavIconWrap}>
              <i className={`bi ${activeSection === id ? mobileIcon + "-fill" : mobileIcon} ${styles.bottomNavIcon}`} />
              {activeSection === id && <span className={styles.bottomNavDot} />}
            </span>
            <span className={styles.bottomNavLabel}>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};
