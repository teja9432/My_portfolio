
import React from "react";

import styles from "./Home.module.css";

import me from "../../assets/me.jpeg";

export const Home = () => {
  return (
    <section className={styles.container} id="meter">
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Tejeswara Rao</h1>
        <p className={styles.description}>
        I'm a passionate Full Stack Developer with a knack for turning ideas into reality. My journey in coding has equipped me with the skills to create dynamic, user-friendly web applications from start to finish.

        </p>
       
      </div>
      <img
        src={me}
        alt=" me"
        className={styles.meImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
