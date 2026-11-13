import React, { useState } from "react";
import styles from "./Certification.module.css";
import { usePortfolio } from "../../context/PortfolioContext";
import edx from "../../assets/Certificates/edx1.png";
import java from "../../assets/Certificates/java_hack.png";
import nptel from "../../assets/Certificates/nptel.png";

const fallbackImages = [nptel, java, edx];

export const Certification = () => {
  const { certifications = [] } = usePortfolio();
  const [lightbox, setLightbox] = useState(null);

  const certs = (certifications || []).map((c, i) => ({
    ...c,
    image: c.image || fallbackImages[i % fallbackImages.length],
  }));

  return (
    <section id="cert" className={`section ${styles.certs}`}>
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-badge">
            <i className="bi bi-award-fill" /> Certifications
          </div>
          <h2 className="section-title">
            My <span>Certifications</span>
          </h2>
          <p className="section-subtitle">
            Credentials that demonstrate my commitment to continuous learning.
          </p>
          <div className="section-divider" />
        </div>

        <div className={styles.grid}>
          {certs.map((cert, i) => (
            <div
              key={cert.id || i}
              className={`${styles.card} reveal`}
              style={{ transitionDelay: `${i * 120}ms` }}
              onClick={() => setLightbox(cert)}
            >
              <div className={styles.imageWrap}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className={styles.certImg}
                  onError={(e) => { e.target.src = fallbackImages[i % fallbackImages.length]; }}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <div className={styles.certMeta}>
                  <i className="bi bi-building" />
                  <span>{cert.issuer}</span>
                </div>
                <span className="badge badge-primary">Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>
              <i className="bi bi-x-lg" />
            </button>
            <img src={lightbox.image} alt={lightbox.title} className={styles.lightboxImg} />
            <div className={styles.lightboxInfo}>
              <h3>{lightbox.title}</h3>
              <p>{lightbox.issuer}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
