import { useEffect } from "react";
import {
  site,
  person,
  summary,
  skills,
  education,
  certifications,
  projects,
  isBlank,
} from "../data/content";

const abs = (path) => new URL(path, site.url).href;

export function homeMeta() {
  const projectNames = projects.map((p) => p.name.replace(/\s*\(.*\)/, "")).join(", ");
  const description = !isBlank(summary)
    ? summary
    : `${person.name}, ${person.headline}. Portfolio of live projects including ${projectNames}.`;
  return {
    path: "/",
    title: `${person.name} · ${person.headline}`,
    description: description.slice(0, 160),
    jsonLd: personJsonLd(),
  };
}

export function projectMeta(p) {
  const base = isBlank(p.oneLiner) ? `${p.name}, a project by ${person.name}.` : p.oneLiner;
  return {
    path: `/projects/${p.slug}/`,
    title: `${p.name}: case study · ${person.name}`,
    description: base.slice(0, 160),
    jsonLd: null,
  };
}

export function notFoundMeta() {
  return {
    path: "/404",
    title: `Page not found · ${person.name}`,
    description: "This page doesn't exist.",
    jsonLd: null,
    noindex: true,
  };
}

export function personJsonLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: abs("/"),
    image: abs("/og.png"),
    jobTitle: person.headline || undefined,
    email: person.email ? `mailto:${person.email}` : undefined,
    sameAs: [person.linkedin, person.github].filter(Boolean),
    knowsAbout: skills.flatMap((g) => g.items),
    alumniOf: education
      .filter((e) => !isBlank(e.school))
      .map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.issuer },
      ...(c.credentialUrl ? { url: c.credentialUrl } : {}),
    })),
  };
  if (!isBlank(person.location)) ld.address = { "@type": "PostalAddress", addressLocality: person.location };
  if (!isBlank(summary)) ld.description = summary;
  return JSON.parse(JSON.stringify(ld)); // drops undefined keys
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Full <head> markup for a route. Used by the prerender script. */
export function headTags(meta) {
  const url = abs(meta.path);
  const image = abs("/og.png");
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    meta.noindex ? `<meta name="robots" content="noindex">` : `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${meta.path === "/" ? "profile" : "article"}">`,
    `<meta property="og:site_name" content="${esc(person.name)}">`,
    `<meta property="og:locale" content="${site.locale}">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(`${person.name}, ${person.headline}`)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
  ];
  if (meta.jsonLd) {
    const json = JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  return tags.join("\n    ");
}

/** Keeps title/description right during client-side navigation. */
export function useDocumentMeta(meta) {
  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [meta.title, meta.description]);
}
