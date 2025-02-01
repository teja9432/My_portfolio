import React from 'react'
import styles from "./Skills.module.css"
import skillsData from '../../data/skill.json';
import Meter from '../Meter/Meter';
import profSkill from '../../data/professional.json';


export const Skills = () => {
  return (
   <section id="skill" className={styles.container}>
    <h1 className={styles.title}>My Skills</h1>
    <div className={styles.content}>
    <div className={styles.left}>
        <h1 className={styles.lefttittle}>Technical Skills</h1>
        <ul> {skillsData.map((skill, index) => 
          ( <li className={styles.skill}key={"_"+index}>{skill.title}
           <Meter per={skill.max} width="70%"/>
           <span className={styles.skillValue}>{skill.max}</span>
          </li> ))}
         </ul>
    </div>
    <div className={styles.right}>
       <h1 className={styles.righttittle}> Professional Skills</h1>
       <ol className={styles.profSkills}>
        {
          profSkill.map((skill,index)=>{
          return <li className={styles.profSkill} key={"_"+index}>{skill.title}</li>

          })
        }
       </ol>
       
    </div>
    
    </div>
    <div className={styles.topBlur} />
    <div className={styles.bottomBlur} />
   
   </section>
  )
}
