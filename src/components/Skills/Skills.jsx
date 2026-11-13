import React, { useState, useEffect, useRef } from "react";
import styles from "./Skills.module.css";
import { usePortfolio } from "../../context/PortfolioContext";

const SkillBar = ({ title, level }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.skillItem} ref={ref}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{title}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ width: animated ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const { skills: contextSkills = [], skillsSettings } = usePortfolio();
  const [activeTab, setActiveTab] = useState("technical");

  const bgImage = skillsSettings?.bgImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop";

  // Load from context but fallback to defaults if the database is empty
  const defaultSkills = [
    { title: "Java", level: 85, category: "technical" },
    { title: "Spring Boot", level: 80, category: "technical" },
    { title: "React Js", level: 80, category: "technical" },
    { title: "HTML", level: 93, category: "technical" },
    { title: "CSS", level: 80, category: "technical" },
    { title: "JavaScript", level: 75, category: "technical" },
    { title: "Team Working", level: 90, category: "professional" },
    { title: "Communication", level: 80, category: "professional" },
  ];

  const currentSkills = contextSkills.length > 0 ? contextSkills : defaultSkills;

  const technical = currentSkills.filter((s) => s.category === "technical");
  const professional = currentSkills.filter((s) => s.category === "professional");

  const displaySkills = activeTab === "technical" ? technical : professional;

  return (
    <section id="skill" className={`section ${styles.skills}`}>
      {/* Background Image & Overlay */}
      <img src={bgImage} alt="Background" className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-badge">
            <i className="bi bi-code-slash" /> Skills
          </div>
          <h2 className="section-title">
            My <span>Expertise</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "technical" ? styles.active : ""}`}
            onClick={() => setActiveTab("technical")}
          >
            <i className="bi bi-cpu-fill" /> Technical Skills
          </button>
          <button
            className={`${styles.tab} ${activeTab === "professional" ? styles.active : ""}`}
            onClick={() => setActiveTab("professional")}
          >
            <i className="bi bi-people-fill" /> Professional Skills
          </button>
        </div>

        <div className={styles.skillsGrid}>
          {displaySkills.map((skill, i) => (
            <div key={skill.id || i} className={`reveal reveal-delay-${Math.min((i % 4 + 1) * 100, 400)}`}>
              <SkillBar title={skill.title} level={skill.level} />
            </div>
          ))}
        </div>

        {/* Tech stack icons */}
        {activeTab === "technical" && (
          <div className={`${styles.techStack} reveal`}>
            {[
              { name: "Java", icon: "bi-filetype-java", color: "#E76F00" },
              { name: "React", icon: "bi-react", color: "#61DAFB" },
              { name: "HTML", icon: "bi-filetype-html", color: "#E34F26" },
              { name: "CSS", icon: "bi-filetype-css", color: "#1572B6" },
              { name: "JS", icon: "bi-filetype-js", color: "#F7DF1E" },
              { name: "Git", icon: "bi-git", color: "#F05032" },
            ].map(({ name, icon, color }) => (
              <div key={name} className={styles.techIcon}>
                <i className={`bi ${icon}`} style={{ color }} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
