import portraitSrcset from "../assets/portrait.jpg?w=280;420;600&format=webp&quality=78&as=srcset";
import portrait from "../assets/portrait.jpg?w=420&format=webp&quality=78&as=metadata";
import { person, isBlank } from "../data/content";
import { Field, Icon, ExtLink, Todo } from "../components/ui";
import s from "./Hero.module.css";

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <p className={s.eyebrow}>
            <Field value={person.headline} field="person.headline" />
            {person.openToWork === true && <span className={s.status}>Open to work</span>}
          </p>
          <h1 id="hero-title" className={s.name}>
            {person.name}
          </h1>
          <p className={s.value}>
            <Field value={person.valueProp} field="person.valueProp (one-line value proposition)" />
          </p>
          <div className={s.ctas}>
            <a href="#projects" className="btn btn-primary">
              View projects <Icon name="arrow" size={16} />
            </a>
            {isBlank(person.resumeUrl) ? (
              <span className={s.todoCta}>
                <span className="btn" aria-disabled="true">
                  <Icon name="download" size={16} /> Download resume
                </span>
                <Todo field="person.resumeUrl" />
              </span>
            ) : (
              <ExtLink href={person.resumeUrl} className="btn">
                <Icon name="download" size={16} /> Download resume
              </ExtLink>
            )}
            <a href="#contact" className="btn">
              Contact
            </a>
          </div>
        </div>
        <div className={s.photoWrap}>
          <img
            className={s.photo}
            src={portrait.src}
            srcSet={portraitSrcset}
            sizes="(max-width: 760px) 150px, 360px"
            width={portrait.width}
            height={portrait.height}
            alt={`Portrait of ${person.name}`}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
