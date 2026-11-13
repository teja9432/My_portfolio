// Verifies every project URL in the data file returns HTTP 200. `npm run check:urls`
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../portfolio-data/portfolio.json", import.meta.url), "utf8"));
let failed = false;
for (const p of data.projects) {
  if (!p.url) {
    console.log(`SKIP  ${p.name} (no url in data)`);
    continue;
  }
  try {
    const res = await fetch(p.url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    console.log(`${res.status === 200 ? "OK  " : "FAIL"}  ${res.status}  ${p.url}`);
    if (res.status !== 200) failed = true;
  } catch (e) {
    console.log(`FAIL  ${e.name}  ${p.url}`);
    failed = true;
  }
}
process.exit(failed ? 1 : 0);
