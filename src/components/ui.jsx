import { isBlank } from "../data/content";
import s from "./ui.module.css";

/** Visible placeholder for content missing from portfolio-data/portfolio.json. */
export function Todo({ field }) {
  return <span className="todo">TODO: {field}</span>;
}

/** Renders the value, or a TODO marker naming the missing data field. */
export function Field({ value, field }) {
  return isBlank(value) ? <Todo field={field} /> : value;
}

export function Section({ id, index, title, intro, children, className = "" }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${s.section} ${className}`}>
      <div className="container">
        <header className={s.head}>
          {index && (
            <span className={s.index} aria-hidden="true">
              {index}
            </span>
          )}
          <h2 id={`${id}-title`} className={s.title}>
            {title}
          </h2>
          {intro && <p className={s.intro}>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

const paths = {
  arrow: "M7 17 17 7M9 7h8v8",
  github:
    "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  download: "M12 3v12m0 0-5-5m5 5 5-5M4 20h16",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.66 5.66 1.41 1.41M4.93 4.93l1.41 1.41m0 11.32-1.41 1.41M19.07 4.93l-1.41 1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z",
  spark: "M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4L12 2Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  back: "M19 12H5m0 0 6-6m-6 6 6 6",
};
const filled = new Set(["github", "linkedin", "spark"]);

export function Icon({ name, size = 18 }) {
  const fill = filled.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export function AIBadge({ label = "AI" }) {
  return (
    <span className="ai-badge">
      <Icon name="spark" size={11} />
      {label}
    </span>
  );
}

/** External link that opens in a new tab and says so to screen readers. */
export function ExtLink({ href, children, className }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
