// Renders every route to static HTML after the client + SSR builds,
// then writes sitemap.xml and robots.txt. Run via `npm run build`.
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");

const template = await readFile(resolve(dist, "index.html"), "utf8");
const { render, routes, site } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);

const pages = routes();
for (const r of pages) {
  const html = template.replace("<!--app-head-->", r.head).replace("<!--app-html-->", render(r.url));
  const out = resolve(dist, r.file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`prerendered ${r.url} -> ${r.file}`);
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((r) => r.sitemap)
  .map((r) => `  <url><loc>${new URL(r.url, site.url).href}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
await writeFile(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
await writeFile(
  resolve(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site.url).href}\n`
);
console.log("wrote sitemap.xml, robots.txt");

await rm(ssrDir, { recursive: true, force: true });
