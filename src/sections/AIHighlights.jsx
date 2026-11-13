import { aiSkills, aiCertifications, leadAIProject as p, isBlank, formatDate } from "../data/content";
import { Section, Field, Todo, AIBadge, ExtLink, Icon } from "../components/ui";
import s from "./AIHighlights.module.css";

export function AIHighlights() {
  return (
    <Section id="ai" index="02" title="AI highlights" className={s.band}>
      <div className={s.grid}>
        {p && (
          <article className={s.lead} aria-labelledby="ai-lead-title">
            <p className={s.kicker}>
              <AIBadge label="Lead AI project" />
            </p>
            <h3 id="ai-lead-title" className={s.leadTitle}>
              {p.name}
            </h3>
            <p className={s.leadLine}>
              <Field value={p.oneLiner} field={`projects["${p.name}"].oneLiner`} />
            </p>
            {isBlank(p.highlights) ? (
              <Todo field={`projects["${p.name}"].highlights`} />
            ) : (
              <ul className={s.bullets}>
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            <div className={s.leadFoot}>
              {isBlank(p.stack) ? (
                <Todo field={`projects["${p.name}"].stack`} />
              ) : (
                <ul className="tag-list" aria-label="Stack">
                  {p.stack.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {isBlank(p.url) ? (
                <Todo field={`projects["${p.name}"].url`} />
              ) : (
                <ExtLink href={p.url} className="btn btn-primary">
                  Visit {p.name} <Icon name="arrow" size={16} />
                </ExtLink>
              )}
            </div>
          </article>
        )}

        <div className={s.side}>
          <div className={s.panel}>
            <h3 className={s.panelTitle}>AI skills</h3>
            {isBlank(aiSkills) ? (
              <Todo field='skills["AI & ML"]' />
            ) : (
              <ul className="tag-list">
                {aiSkills.map((sk) => (
                  <li key={sk} className={s.aiTag}>
                    {sk}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={s.panel}>
            <h3 className={s.panelTitle}>AI certifications</h3>
            {isBlank(aiCertifications) ? (
              <Todo field="certifications[] with isAI: true" />
            ) : (
              <ul className={s.certs}>
                {aiCertifications.map((c) => (
                  <li key={c.name}>
                    <strong>{c.name}</strong>
                    <span>
                      {c.issuer}
                      {c.date && ` · ${formatDate(c.date)}`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
