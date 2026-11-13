import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { usePortfolio } from "../../context/PortfolioContext";
import meImg from "../../assets/me.jpeg";

const TYPEWRITER_SPEED = 80;
const ERASE_SPEED = 40;
const PAUSE_MS = 1800;

export const Hero = () => {
  const { hero } = usePortfolio();
  const titles = hero?.titles?.length ? hero.titles : ["Full Stack Developer", "Java Engineer", "React Developer"];
  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pause | erasing

  useEffect(() => {
    let timeout;
    const current = titles[titleIndex];

    if (phase === "typing") {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), TYPEWRITER_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("pause"), PAUSE_MS);
      }
    } else if (phase === "pause") {
      setPhase("erasing");
    } else if (phase === "erasing") {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), ERASE_SPEED);
      } else {
        setTitleIndex((i) => (i + 1) % titles.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, titleIndex, titles]);

  const scrollToProjects = () => {
    document.getElementById("proj")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const bgImage = hero?.bgImage || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

  return (
    <section id="hero" className={styles.hero}>
      {/* Background Image & Overlay */}
      <img src={bgImage} alt="Background" className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      {/* Background grid pattern */}
      <div className={styles.gridBg} />
      <div className={styles.gradientOrb} />

      <div className={styles.inner}>
        {/* Left: Text */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for opportunities
          </div>

          <h1 className={styles.name}>
            Hi, I'm <br />
            <span className={styles.nameHighlight}>{hero?.name || "Tejeswara Rao"}</span>
          </h1>

          <div className={styles.typewriterRow}>
            <span className={styles.typewriterPrefix}>I'm a </span>
            <span className={styles.typewriterText}>{displayText}</span>
            <span className={styles.cursor} />
          </div>

          <p className={styles.bio}>
            {hero?.bio || "I'm a passionate Full Stack Developer with a knack for turning ideas into reality. I build dynamic, user-friendly web applications from start to finish."}
          </p>

          <div className={styles.ctaRow}>
            <button className={`btn btn-primary ${styles.ctaBtn}`} onClick={scrollToProjects}>
              <i className="bi bi-grid-fill" />
              View Projects
            </button>
            <button className={`btn btn-outline ${styles.ctaBtn}`} onClick={scrollToContact}>
              <i className="bi bi-chat-dots" />
              Get In Touch
            </button>
          </div>

          {/* Stats */}
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>3+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>8+</span>
              <span className={styles.statLabel}>Technologies</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>3+</span>
              <span className={styles.statLabel}>Certifications</span>
            </div>
          </div>
        </div>

        {/* Right: Photo */}
        <div className={styles.photoWrap}>
          <div className={styles.photoBgRing} />
          <div className={styles.photoCard}>
            <img
              src={hero?.photo || meImg}
              alt={hero?.name || "Tejeswara Rao"}
              className={styles.photo}
              onError={(e) => { e.target.src = meImg; }}
            />
          </div>

          {/* Floating chips */}
          <div className={`${styles.chip} ${styles.chipTop}`}>
            <i className="bi bi-code-slash" />
            <span>Full Stack Dev</span>
          </div>
          <div className={`${styles.chip} ${styles.chipBottom}`}>
            <i className="bi bi-star-fill" />
            <span>Open to Work</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button className={styles.scrollIndicator} onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
        <i className="bi bi-chevron-double-down" />
      </button>
    </section>
  );
};
