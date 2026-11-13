import React from "react";
import styles from "./Intern.module.css";
import { usePortfolio } from "../../context/PortfolioContext";

export const Intern = () => {
  const { internships = [] } = usePortfolio();

  const defaultInterns = [
    {
      id: "int1",
      role: "Java Developer Intern",
      company: "Tech Solutions Inc.",
      duration: "June 2023 - Aug 2023",
      description: "Developed and maintained REST APIs using Spring Boot and Oracle database. Participated in daily stand-ups and code reviews.",
      tech: ["Java", "Spring Boot", "Oracle SQL"]
    },
    {
      id: "int2",
      role: "Web Development Intern",
      company: "Creative Designs Agency",
      duration: "Jan 2023 - April 2023",
      description: "Collaborated with designers to build responsive landing pages using React.js and Bootstrap. Improved page load times by 20%.",
      tech: ["React Js", "Bootstrap", "CSS"]
    }
  ];

  const currentInterns = internships.length > 0 ? internships : defaultInterns;

  return (
    <section id="internships" className={`section ${styles.internSection}`}>
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-badge">
            <i className="bi bi-briefcase-fill" /> Experience
          </div>
          <h2 className="section-title">
            Professional <span>Internships</span>
          </h2>
          <p className="section-subtitle">
            Hands-on experience gained while working in various industrial environments.
          </p>
          <div className="section-divider" />
        </div>

        <div className={styles.grid}>
          {currentInterns.map((item, i) => (
            <div 
              key={item.id || i} 
              className={`${styles.card} reveal`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={styles.cardHead}>
                <div className={styles.icon}>
                  <i className="bi bi-building-check" />
                </div>
                <span className={styles.duration}>{item.duration}</span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.role}>{item.role}</h3>
                <div className={styles.company}>
                  <i className="bi bi-pin-map-fill" />
                  {item.company}
                </div>
                <p className={styles.desc}>{item.description}</p>
                <div className={styles.techStack}>
                  {(item.tech || []).map((t, idx) => (
                    <span key={idx} className={styles.techBadge}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
