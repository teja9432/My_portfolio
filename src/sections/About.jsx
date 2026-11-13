import { person, summary, education, isBlank } from "../data/content";
import { Section, Field } from "../components/ui";
import s from "./About.module.css";

export function About() {
  const edu = education[0];
  return (
    <Section id="about" index="01" title="About">
      <div className={s.grid}>
        <p className={s.summary}>
          <Field value={summary} field="summary (short bio from LinkedIn)" />
        </p>
        <dl className={s.facts}>
          <div>
            <dt>Location</dt>
            <dd>
              <Field value={person.location} field="person.location" />
            </dd>
          </div>
          {person.openToWork != null && (
            <div>
              <dt>Status</dt>
              <dd>{person.openToWork ? "Open to work" : "Not currently looking"}</dd>
            </div>
          )}
          {edu && !isBlank(edu.school) && (
            <div>
              <dt>Education</dt>
              <dd>{edu.school}</dd>
            </div>
          )}
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
