import React from "react";
import styles from "./Contact.module.css";
import { usePortfolio } from "../../context/PortfolioContext";

const SocialCard = ({ icon, label, value, href, color }) => (
  <a href={href} target="_blank" rel="noreferrer" className={styles.socialCard}>
    <div className={styles.socialIcon} style={{ background: color + "18", color }}>
      <i className={`bi ${icon}`} />
    </div>
    <div>
      <div className={styles.socialLabel}>{label}</div>
      <div className={styles.socialValue}>{value}</div>
    </div>
    <i className="bi bi-arrow-up-right" style={{ marginLeft: "auto", color: "var(--color-text-muted)", fontSize: 14 }} />
  </a>
);

export const Contact = () => {
  const { contact } = usePortfolio();

  const socials = [
    {
      icon: "bi-github",
      label: "GitHub",
      value: "teja9432",
      href: contact?.github || "https://github.com/teja9432",
      color: "#0F172A",
    },
    {
      icon: "bi-linkedin",
      label: "LinkedIn",
      value: "tejeswararao",
      href: contact?.linkedin || "https://linkedin.com/in/tejeswararao",
      color: "#0A66C2",
    },
    {
      icon: "bi-instagram",
      label: "Instagram",
      value: "@_teja_1432__",
      href: contact?.instagram || "https://instagram.com/_teja_1432__",
      color: "#E1306C",
    },
    {
      icon: "bi-whatsapp",
      label: "WhatsApp",
      value: contact?.phone || "9381475014",
      href: contact?.whatsapp || `https://wa.me/91${contact?.phone || "9381475014"}`,
      color: "#25D366",
    },
  ];

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-badge">
            <i className="bi bi-envelope-fill" /> Contact
          </div>
          <h2 className="section-title">
            Let's <span>Connect</span>
          </h2>
          <p className="section-subtitle">
            I'm always open to discussing new projects, opportunities, or just a friendly chat.
          </p>
          <div className="section-divider" />
        </div>

        <div className={styles.grid}>
          {/* Left: Contact info */}
          <div className={styles.infoBlock}>
            <div className={`${styles.infoCard} reveal-left`}>
              <div className={styles.infoHeader}>
                <div className={styles.infoIconWrap}>
                  <i className="bi bi-person-lines-fill" />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>Direct Contact</h3>
                  <p className={styles.infoSub}>Reach out directly</p>
                </div>
              </div>
              <div className={styles.directLinks}>
                <a href={`mailto:${contact?.email || "karukolatejeswararao@gmail.com"}`} className={styles.directLink}>
                  <div className={styles.directIcon}>
                    <i className="bi bi-envelope-fill" />
                  </div>
                  <div>
                    <div className={styles.directLabel}>Email</div>
                    <div className={styles.directValue}>{contact?.email || "karukolatejeswararao@gmail.com"}</div>
                  </div>
                </a>
                <a href={`tel:${contact?.phone || "9381475014"}`} className={styles.directLink}>
                  <div className={styles.directIcon}>
                    <i className="bi bi-telephone-fill" />
                  </div>
                  <div>
                    <div className={styles.directLabel}>Phone</div>
                    <div className={styles.directValue}>{contact?.phone || "9381475014"}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Social links */}
          <div className={`${styles.socialBlock} reveal-right`}>
            <h3 className={styles.socialTitle}>Social Profiles</h3>
            <div className={styles.socialGrid}>
              {socials.map((s) => (
                <SocialCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`${styles.footer} reveal`}>
          <p>© {new Date().getFullYear()} Tejeswara Rao · Built with React & Firebase</p>
        </div>
      </div>
    </section>
  );
};
