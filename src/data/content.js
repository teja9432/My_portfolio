// Single entry point for all site content. Everything comes from
// portfolio-data/portfolio.json — nothing here should add facts.
import raw from "../../portfolio-data/portfolio.json";

const certThumbs = import.meta.glob("../assets/certificates/*.png", {
  eager: true,
  query: { w: 480, format: "webp", quality: 70, as: "metadata" },
  import: "default",
});
const certFull = import.meta.glob("../assets/certificates/*.png", {
  eager: true,
  query: { w: 1400, format: "webp", quality: 80 },
  import: "default",
});

export const isBlank = (v) =>
  v == null ||
  (typeof v === "string" && v.trim() === "") ||
  (Array.isArray(v) && v.length === 0);

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-04" -> "Apr 2024", "2024-05-14" -> "May 14, 2024", "present" -> "Present" */
export function formatDate(d) {
  if (isBlank(d)) return "";
  if (/^present$/i.test(d)) return "Present";
  const [y, m, day] = d.split("-");
  if (!m) return y;
  const mon = MONTHS[Number(m) - 1];
  return day ? `${mon} ${Number(day)}, ${y}` : `${mon} ${y}`;
}

const imageFor = (glob, file) =>
  file ? glob[`../assets/certificates/${file}`] ?? null : null;

export const site = raw.site;
export const person = raw.person;
export const summary = raw.summary;
export const education = raw.education;

export const skills = Object.entries(raw.skills).map(([category, items]) => ({
  category,
  items,
  isAI: category === "AI & ML",
}));
export const aiSkills = skills.find((g) => g.isAI)?.items ?? [];

export const experience = raw.experience;

export const certifications = raw.certifications.map((c) => ({
  ...c,
  thumb: imageFor(certThumbs, c.image),
  full: imageFor(certFull, c.image),
}));
export const aiCertifications = certifications.filter((c) => c.isAI);

export const projects = raw.projects.map((p) => {
  const cs = p.caseStudy ?? {};
  return {
    ...p,
    slug: slugify(p.name),
    hasCaseStudy: Object.values(cs).some((v) => !isBlank(v)),
  };
});
export const leadAIProject =
  projects.find((p) => p.name.startsWith("Televoro")) ?? projects.find((p) => p.isAI) ?? null;
export const getProject = (slug) => projects.find((p) => p.slug === slug) ?? null;
