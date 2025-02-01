import React from 'react'
import styles from "./About.module.css";
export const About = () => {
  return (
     <section id="about" className={styles.container}>
        <div className={styles.contentleft}></div>
        <div className={styles.contentRight}>
            <h1 className={styles.righttitle}>About me</h1>
            <h2 className={styles.righttitle1}>let me introduce my self</h2>
            <p className={styles.description}>👋 Hello! I'm Tejeswara Rao, an Computer Science Engineer with a strong passion for innovation and technology. Pursuing a Bachelor's degree from Raghu Enginnering college, I am a proficient software developer specializing in Java, Spring, Springboot and MicroServices, HTML, CSS, JavaScript,React Js, Bootstrap, and SQL. My successful track record in building web applications, coupled with expertise in version control using GIT, reflects my commitment to continuous learning and good problem-solving skills.

              With a focus on making a meaningful impact in web development . I am excited about the opportunity to contribute to a team's success and stay current with industry trends. Confident in my skills and commitment to continuous learning, I am eager to discuss how I can bring my analytical thinking and problem-solving expertise to positively influence your projects.</p>
              <p className={styles.contact}> Let's connect and explore how I can contribute to the growth and success of your team.</p>
              
        </div>
        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />

     </section>
  )
}

