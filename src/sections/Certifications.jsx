import { certifications, isBlank, formatDate } from "../data/content";
import { Section, Todo, AIBadge, ExtLink, Icon } from "../components/ui";
import s from "./Certifications.module.css";

export function Certifications() {
  // AI-related certifications first.
  const certs = [...certifications].sort((a, b) => Number(b.isAI) - Number(a.isAI));
  return (
    <Section id="certifications" index="06" title="Certifications">
      <ul className={s.grid}>
        {certs.map((c) => (
          <li key={c.name} className={`${s.card} ${c.isAI ? s.ai : ""}`}>
            {c.thumb && (
              <img
                className={s.thumb}
                src={c.thumb.src}
                width={c.thumb.width}
                height={c.thumb.height}
                alt=""
                loading="lazy"
                decoding="async"
              />
            )}
            <div className={s.body}>
              {c.isAI && <AIBadge />}
              <h3 className={s.name}>{c.name}</h3>
              <p className={s.meta}>
                {c.issuer}
                {!isBlank(c.date) && (
                  <>
                    {" · "}
                    <time dateTime={c.date}>{formatDate(c.date)}</time>
                  </>
                )}
              </p>
              <div className={s.links}>
                {!isBlank(c.credentialUrl) ? (
                  <ExtLink href={c.credentialUrl}>
                    Verify credential <Icon name="arrow" size={14} />
                    <span className="visually-hidden">: {c.name}</span>
                  </ExtLink>
                ) : (
                  <>
                    {c.full && (
                      <ExtLink href={c.full}>
                        View certificate <Icon name="arrow" size={14} />
                        <span className="visually-hidden">: {c.name}</span>
                      </ExtLink>
                    )}
                    <Todo field={`certifications[${certifications.indexOf(c)}].credentialUrl`} />
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
