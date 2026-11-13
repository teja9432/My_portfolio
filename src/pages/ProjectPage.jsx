import { Link, useParams } from "react-router-dom";
import { getProject, isBlank } from "../data/content";
import { projectMeta, useDocumentMeta } from "../seo/meta";
import { AIBadge, ExtLink, Field, Icon } from "../components/ui";
import { NotFound } from "./NotFound";
import s from "./Page.module.css";

function CaseStudy({ project }) {
  const p = project;
  const meta = projectMeta(p);
  useDocumentMeta(meta);
  const field = (k) => `projects["${p.name}"].caseStudy.${k}`;

  return (
    <article className={`container ${s.page}`}>
      <p>
        <Link to="/#projects" className={s.back}>
          <Icon name="back" size={16} /> All projects
        </Link>
      </p>
      <p className={s.eyebrow}>
        Case study {p.isAI && <AIBadge />}
      </p>
      <h1 className={s.title}>{p.name}</h1>
      <p className={s.lede}>
        <Field value={p.oneLiner} field={`projects["${p.name}"].oneLiner`} />
      </p>

      <div className={s.cta}>
        {isBlank(p.url) ? (
          <Field value="" field={`projects["${p.name}"].url`} />
        ) : (
          <ExtLink href={p.url} className="btn btn-primary">
            Visit live site <Icon name="arrow" size={16} />
          </ExtLink>
        )}
      </div>

      <dl className={s.study}>
        <div>
          <dt>Problem</dt>
          <dd>
            <Field value={p.caseStudy?.problem} field={field("problem")} />
          </dd>
        </div>
        <div>
          <dt>What I built</dt>
          <dd>
            <Field value={p.caseStudy?.built} field={field("built")} />
            {!isBlank(p.highlights) && (
              <ul className={s.bullets}>
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>
            {isBlank(p.stack) ? (
              <Field value="" field={`projects["${p.name}"].stack`} />
            ) : (
              <ul className="tag-list">
                {p.stack.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
        <div>
          <dt>Outcome</dt>
          <dd>
            <Field value={p.caseStudy?.outcome} field={field("outcome")} />
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project || !project.hasCaseStudy) return <NotFound />;
  return <CaseStudy project={project} />;
}
