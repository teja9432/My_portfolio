import React from 'react'
import styles from './Contact.module.css'
import { Navbar } from '../Navbar/Navbar'
export const Contact = () => {
  return (
    <section className={styles.container}>
        <h1 className={styles.title}>Contact Me</h1>
       <div className={styles.content}><div className={styles.left}>
            <h2>Contact Information</h2>
            <ul className={styles.connect}>
                <li>
                    Email:&nbsp;&nbsp;
                    <a href="mailto:karukolatejeswararao@gmail.com">karukolatejeswararao@gmail.com</a>
                </li>
                <li>
                    Phone:&nbsp;&nbsp;9381475014
                </li>

            </ul>

        



        </div>
        <div className={styles.right}>
        <h2>Social Media</h2>
           <ul className={styles.connect}>
            <li>
                GitHub:&nbsp;&nbsp;
                <a href="https://github.com/teja9432">Github</a>
            </li>
            <li>
             Linkedin:&nbsp;&nbsp;
                <a href="https://www.linkedin.com/in/tejeswararao/">Linkedin</a>
                </li>
                <li>
             Whatsapp:&nbsp;&nbsp;
                <a href="whatsapp://send?phone=+919381475014">Whatsapp</a>
                </li>
                <li>
             Instagram:&nbsp;&nbsp;
                <a href="https://www.instagram.com/_teja_1432__/">Instagram</a>
                </li>
           </ul>
        </div></div>
            </section>
    
  )
}
