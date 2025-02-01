import React, { useState } from "react";
import styles from "./Navbar.module.css";

// Adjust this part to proper import syntax
import closeIcon from "../../assets/close1.png";
import menuIcon from "../../assets/menu1.png";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar} id="nav">
      <a className={styles.title} href="/">
       TejeswaraRao Karukola
      </a>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={menuOpen ? closeIcon : menuIcon}
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skill">Skills</a>
          </li>
          <li>
            <a href="#cert">Certifications</a>
          </li>
          <li>
            <a href="#proj">Projects</a>
          </li>
         
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
