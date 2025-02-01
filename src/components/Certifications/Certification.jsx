import React from 'react'
import styles from './Certification.module.css'
import edx from '../../assets/Certificates/edx1.png'
import java from '../../assets/Certificates/java_hack.png'
import nptel from '../../assets/Certificates/nptel.png'
export const Certification = () => {
  return (
    <section className={styles.container} id="cert">
        <h1 className={styles.title}>My Certifications</h1>
        <div className={styles.certificates}>
            <img src={nptel} alt="loading"/>
            <img src={java} alt="loading"/>
            <img src={edx} alt="loading"/>
            
            

        </div>

    </section>
  )
}
