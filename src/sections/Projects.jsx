import { Link } from "react-router-dom";
import { projects, isBlank } from "../data/content";
import { Section, Field, Todo, AIBadge, ExtLink, Icon } from "../components/ui";
import s from "./Projects.module.css";

function ProjectCard({ p }) {
  const titleId = `project-${p.slug}`;
  return (
    <li className={`${s.card} ${p.isAI ? s.ai : ""}`}>
      <article aria-labelledby={titleId} className={s.inner}>
        <div className={s.top}>
          <h3 id={titleId} className={s.name}>
            {p.name}
          </h3>
          {p.isAI && <AIBadge />}
        </div>
        <p className={s.line}>
          <Field value={p.oneLiner} field={`projects["${p.name}"].oneLiner`} />
        </p>
        {isBlank(p.stack) ? (
          <Todo field={`projects["${p.name}"].stack`} />
        ) : (
          <ul className="tag-list" aria-label={`${p.name} stack`}>
            {p.stack.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className={s.links}>
          {isBlank(p.url) ? (
            <Todo field={`projects["${p.name}"].url`} />
          ) : (
            <ExtLink href={p.url} className={s.live}>
              Live site <Icon name="arrow" size={16} />
              <span className="visually-hidden">: {p.name}</span>
            </ExtLink>
          )}
          {p.hasCaseStudy && (
            <Link to={`/projects/${p.slug}/`} className={s.study}>
              Case study<span className="visually-hidden">: {p.name}</span>
            </Link>
          )}
        </div>
      </article>
    </li>
  );
}

export function Projects() {
  return (
    <Section id="projects" index="04" title="Projects" intro="Live apps I’ve built and shipped.">
      <ul className={s.grid}>
        {projects.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </ul>
    </Section>
  );
}
