import { education, isBlank } from "../data/content";
import { Section, Field, Todo } from "../components/ui";
import s from "./Education.module.css";

export function Education() {
  return (
    <Section id="education" index="07" title="Education">
      {isBlank(education) ? (
        <Todo field="education[]" />
      ) : (
        <ul className={s.list}>
          {education.map((e, i) => (
            <li key={`${e.school}-${i}`} className={s.item}>
              <h3 className={s.degree}>
                <Field value={e.degree} field={`education[${i}].degree`} />
              </h3>
              <p className={s.school}>
                <Field value={e.school} field={`education[${i}].school`} />
              </p>
              <p className={s.year}>
                <Field value={e.year} field={`education[${i}].year`} />
              </p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
