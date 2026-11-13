import { person } from "../data/content";
import { Section, ExtLink, Icon } from "../components/ui";
import s from "./Contact.module.css";

export function Contact() {
  return (
    <Section
      id="contact"
      index="08"
      title="Get in touch"
      intro="The fastest way to reach me is email."
    >
      <a href={`mailto:${person.email}`} className={s.email}>
        <Icon name="mail" size={28} />
        <span>{person.email}</span>
      </a>
      <ul className={s.socials}>
        {person.linkedin && (
          <li>
            <ExtLink href={person.linkedin} className="btn">
              <Icon name="linkedin" /> LinkedIn
            </ExtLink>
          </li>
        )}
        {person.github && (
          <li>
            <ExtLink href={person.github} className="btn">
              <Icon name="github" /> GitHub
            </ExtLink>
          </li>
        )}
      </ul>
    </Section>
  );
}
