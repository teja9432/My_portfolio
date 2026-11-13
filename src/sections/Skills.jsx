import { skills, isBlank } from "../data/content";
import { Section, Todo, AIBadge } from "../components/ui";
import s from "./Skills.module.css";

export function Skills() {
  // AI & ML always leads.
  const groups = [...skills].sort((a, b) => Number(b.isAI) - Number(a.isAI));
  return (
    <Section id="skills" index="03" title="Skills">
      <div className={s.grid}>
        {groups.map((g) => (
          <div key={g.category} className={`${s.group} ${g.isAI ? s.ai : ""}`}>
            <h3 className={s.heading}>
              {g.category}
              {g.isAI && <AIBadge />}
            </h3>
            {isBlank(g.items) ? (
              <Todo field={`skills["${g.category}"]`} />
            ) : (
              <ul className="tag-list">
                {g.items.map((item) => (
                  <li key={item} className={g.isAI ? s.aiTag : "tag"}>
                    {g.isAI && <span className="visually-hidden">AI skill: </span>}
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
