import React from "react";
import styles from "./About.module.css";
import { usePortfolio } from "../../context/PortfolioContext";

export const About = () => {
  const { about } = usePortfolio();

  // Hard fallback to ensure section is never blank
  const currentAbout = about?.description ? about : {
    description: "👋 Hello! I'm Tejeswara Rao, a Computer Science Engineer with a strong passion for innovation and technology. Pursuing a Bachelor's degree from Raghu Engineering College, I am a proficient software developer specializing in Java, Spring, Spring Boot, Microservices, HTML, CSS, JavaScript, React Js, Bootstrap, and SQL.",
    stats: [
      { label: "Projects", value: "3+" },
      { label: "Certifications", value: "3+" },
      { label: "Technologies", value: "8+" },
    ]
  };

  const stats = currentAbout.stats;

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="section-inner">
        {/* Section header */}
        <div className="section-header reveal">
          <div className="section-badge">
            <i className="bi bi-person-fill" /> About Me
          </div>
          <h2 className="section-title">
            Who <span>I Am</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className={styles.grid}>
          {/* Left: Info card */}
          <div className={`${styles.card} reveal-left`}>
            <div className={styles.cardInner}>
              <div className={styles.avatarRow}>
                <div className={styles.avatar}>TR</div>
                <div>
                  <h3 className={styles.cardName}>Tejeswara Rao</h3>
                  <p className={styles.cardRole}>Full Stack Developer</p>
                </div>
              </div>

              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <i className="bi bi-mortarboard-fill" /> Education
                  </span>
                  <span className={styles.infoValue}>B.Tech CSE — Raghu Engineering College</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <i className="bi bi-geo-alt-fill" /> Location
                  </span>
                  <span className={styles.infoValue}>Andhra Pradesh, India</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <i className="bi bi-briefcase-fill" /> Status
                  </span>
                  <span className={`${styles.infoValue} ${styles.available}`}>
                    <span className={styles.dot} /> Available for work
                  </span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <i className="bi bi-code-square" /> Role
                  </span>
                  <span className={styles.infoValue}>Full Stack Developer</span>
                </li>
              </ul>

              {/* Stats */}
              <div className={styles.statsGrid}>
                {stats.map((stat, i) => (
                  <div className={styles.statBox} key={i}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Description */}
          <div className={`${styles.textBlock} reveal-right`}>
            <h3 className={styles.textTitle}>Let me introduce myself</h3>
            <p className={styles.description}>
              {about?.description ||
                "👋 Hello! I'm Tejeswara Rao, a Computer Science Engineer with a strong passion for innovation and technology. Pursuing a Bachelor's degree from Raghu Engineering College, I am a proficient software developer specializing in Java, Spring, Spring Boot, Microservices, HTML, CSS, JavaScript, React Js, Bootstrap, and SQL."}
            </p>
            <p className={styles.description} style={{ marginTop: 16 }}>
              With a focus on making a meaningful impact in web development, I am excited about the opportunity to contribute to a team's success and stay current with industry trends.
            </p>

            <div className={styles.techTags}>
              {["Java", "Spring Boot", "React Js", "JavaScript", "Oracle DB", "Git"].map((t) => (
                <span key={t} className={`badge badge-primary ${styles.tag}`}>{t}</span>
              ))}
            </div>

            <div className={styles.ctaRow}>
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <i className="bi bi-envelope-fill" /> Get In Touch
              </a>
              <a
                href="https://github.com/teja9432"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <i className="bi bi-github" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
