import React, { useState } from "react";
import styles from "./Projects.module.css";
import { usePortfolio } from "../../context/PortfolioContext";

export const Projects = () => {
  const { projects = [] } = usePortfolio();
  const [filter, setFilter] = useState("all");

  const allTech = [...new Set((projects || []).flatMap((p) => p.tech || []))];
  const displayed = filter === "all" ? (projects || []) : (projects || []).filter((p) => (p.tech || []).includes(filter));

  return (
    <section id="proj" className={`section ${styles.projects}`}>
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-badge">
            <i className="bi bi-grid-fill" /> Projects
          </div>
          <h2 className="section-title">
            My <span>Projects</span>
          </h2>
          <p className="section-subtitle">Things I've built — from idea to deployment.</p>
          <div className="section-divider" />
        </div>

        {/* Filter chips */}
        <div className={styles.filters}>
          <button
            className={`${styles.filterChip} ${filter === "all" ? styles.active : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          {allTech.slice(0, 6).map((t) => (
            <button
              key={t}
              className={`${styles.filterChip} ${filter === t ? styles.active : ""}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {displayed.map((project, i) => (
            <div
              key={project.id || i}
              className={`${styles.card} ${project.featured ? styles.featured : ""} reveal`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {project.featured && (
                <div className={styles.featuredBadge}>
                  <i className="bi bi-star-fill" /> Featured
                </div>
              )}

              {/* Card header */}
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  <i className="bi bi-code-square" />
                </div>
                <div className={styles.cardLinks}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className={styles.cardLink} title="GitHub">
                      <i className="bi bi-github" />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className={styles.cardLink} title="Live Demo">
                      <i className="bi bi-box-arrow-up-right" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.desc}>{project.description}</p>

              {/* Tech badges */}
              <div className={styles.techRow}>
                {(project.tech || []).map((t) => (
                  <span key={t} className={styles.techBadge}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {displayed.length === 0 && (
          <div className={styles.empty}>
            <i className="bi bi-inbox" />
            <p>No projects match this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};
