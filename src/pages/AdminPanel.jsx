import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { usePortfolio } from "../context/PortfolioContext";
import styles from "./AdminPanel.module.css";
import { AdminHero } from "./sections/AdminHero";
import { AdminSkills } from "./sections/AdminSkills";
import { AdminCerts } from "./sections/AdminCerts";
import { AdminProjects } from "./sections/AdminProjects";
import { AdminContact } from "./sections/AdminContact";
import { AdminAbout } from "./sections/AdminAbout";
import { AdminInterns } from "./sections/AdminInterns";

const NAV_ITEMS = [
  { id: "hero",     label: "Hero",       icon: "bi-house-fill" },
  { id: "about",    label: "About",      icon: "bi-person-fill" },
  { id: "interns",  label: "Experience", icon: "bi-briefcase-fill" },
  { id: "skills",   label: "Skills",     icon: "bi-code-slash" },
  { id: "certs",    label: "Certs",      icon: "bi-award-fill" },
  { id: "projects", label: "Projects",   icon: "bi-grid-fill" },
  { id: "contact",  label: "Contact",    icon: "bi-envelope-fill" },
];

const SECTION_MAP = {
  hero:     <AdminHero />,
  about:    <AdminAbout />,
  interns:  <AdminInterns />,
  skills:   <AdminSkills />,
  certs:    <AdminCerts />,
  projects: <AdminProjects />,
  contact:  <AdminContact />,
};

export const AdminPanel = ({ onLogout }) => {
  const { syncStatus } = usePortfolio();
  const [active, setActive] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch {
      // ignore if firebase not configured
    }
    onLogout();
  };

  return (
    <div className={styles.layout}>
      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarTop}>
          <div className={styles.sideLogo}>
            <div className={styles.sideLogoIcon}>TR</div>
            <div>
              <div className={styles.sideLogoName}>Portfolio</div>
              <div className={styles.sideLogoSub}>Admin Panel</div>
            </div>
          </div>

          <nav className={styles.sideNav}>
            {NAV_ITEMS.map(({ id, label, icon }) => (
              <button
                key={id}
                className={`${styles.sideNavItem} ${active === id ? styles.sideNavActive : ""}`}
                onClick={() => { setActive(id); setSidebarOpen(false); }}
              >
                <i className={`bi ${icon}`} />
                <span>{label}</span>
                {active === id && <span className={styles.activeIndicator} />}
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.sidebarBottom}>
          <a href="/" className={styles.viewPortfolio}>
            <i className="bi bi-eye-fill" />
            <span>View Portfolio</span>
          </a>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="bi bi-box-arrow-right" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main Content ── */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topBar}>
          <button className={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className={`bi ${sidebarOpen ? "bi-x-lg" : "bi-list"}`} />
          </button>
          <div className={styles.topBarTitle}>
            <i className={`bi ${NAV_ITEMS.find((n) => n.id === active)?.icon}`} />
            {NAV_ITEMS.find((n) => n.id === active)?.label} Editor
          </div>
          <div className={styles.topBarRight}>
            <div className={`${styles.statusBadge} ${styles[syncStatus]}`}>
              <div className={styles.statusDot} />
              <span>{syncStatus === 'online' ? 'Cloud Connected' : syncStatus === 'local-only' ? 'Working Locally' : 'Connecting...'}</span>
            </div>
            <a href="/" className={styles.previewBtn}>
              <i className="bi bi-eye" /> Preview
            </a>
          </div>
        </header>

        {syncStatus === 'local-only' && (
          <div className={styles.syncWarning}>
            <i className="bi bi-exclamation-triangle-fill" />
            <span>
              <strong>Limited Sync:</strong> Changes are currently saved only to your local browser because Firebase permissions are blocked.
              Please check your Firestore rules to enable cloud synchronization.
            </span>
          </div>
        )}

        {/* Section content */}
        <div className={styles.content}>
          {SECTION_MAP[active]}
        </div>
      </div>
    </div>
  );
};
