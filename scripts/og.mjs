// Generates public/og.png (1200x630) and public/apple-touch-icon.png from the data file.
// Run `npm run og` after changing name/headline. Output is committed so builds don't
// depend on system fonts.
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(await readFile(resolve(root, "portfolio-data/portfolio.json"), "utf8"));
const { name, headline } = data.person;
const host = new URL(data.site.url).host;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0f0f12"/>
  <rect x="80" y="96" width="72" height="8" fill="#ff7a33"/>
  <text x="80" y="300" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#f2f1ee">${esc(name)}</text>
  <text x="80" y="380" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="44" fill="#ff8a4c">${esc(headline || "")}</text>
  <text x="80" y="540" font-family="Consolas, monospace" font-size="26" fill="#a8a8b3">${esc(host)}</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(resolve(root, "public/og.png"));

const icon = await readFile(resolve(root, "public/favicon.svg"));
await sharp(icon, { density: 400 }).resize(180, 180).png().toFile(resolve(root, "public/apple-touch-icon.png"));
console.log("wrote public/og.png, public/apple-touch-icon.png");
