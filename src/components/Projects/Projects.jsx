import React from 'react'
import styles from './Projects.module.css'
import proj from './proj'
export const Projects = () => {
  return (
    <section className={styles.container} id="proj">
        <h1 className={styles.title}>My Projects</h1>
        <div className={styles.projects}>
           
              {
                proj.map((project, index) => {
                  return <div className={styles.project} key={"_"+index}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    
                    <p className={styles.projectDescription}>{project.description}</p>
                    <span className={styles.technologies}>Technologies Used</span>
                    <ul className={styles.projectTechnologies}>
                      {
                        project.technologies_used.map((technology, index) => {
                          return <li key={"_"+index}>{technology}</li>
                })
              }
              </ul>
              </div>
                })
              }

            

        </div>
         <div className={styles.topBlur} />
         <div className={styles.bottomBlur} />
         
    </section>
  )
}
