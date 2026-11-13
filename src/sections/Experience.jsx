import { experience, isBlank, formatDate } from "../data/content";
import { Section, Field, Todo } from "../components/ui";
import s from "./Experience.module.css";

export function Experience() {
  return (
    <Section id="experience" index="05" title="Experience">
      {isBlank(experience) ? (
        <Todo field="experience[]" />
      ) : (
        <ol className={s.timeline}>
          {experience.map((e, i) => (
            <li key={`${e.company}-${e.start}`} className={s.item}>
              <p className={s.dates}>
                <Field value={formatDate(e.start)} field={`experience[${i}].start`} /> –{" "}
                <Field value={formatDate(e.end)} field={`experience[${i}].end`} />
              </p>
              <h3 className={s.role}>
                <Field value={e.role} field={`experience[${i}].role`} />
              </h3>
              <p className={s.company}>
                <Field value={e.company} field={`experience[${i}].company`} />
                {e.type && ` · ${e.type}`}
              </p>
              {e.location && <p className={s.location}>{e.location}</p>}
              {isBlank(e.highlights) ? (
                <Todo field={`experience[${i}].highlights`} />
              ) : (
                <ul className={s.bullets}>
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
