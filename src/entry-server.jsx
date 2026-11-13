import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { projects, site } from "./data/content";
import { homeMeta, projectMeta, notFoundMeta, headTags } from "./seo/meta";

export { site };

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}

/** Every page to prerender, with its output file and head markup. */
export function routes() {
  return [
    { url: "/", file: "index.html", head: headTags(homeMeta()), sitemap: true },
    ...projects
      .filter((p) => p.hasCaseStudy)
      .map((p) => ({
        url: `/projects/${p.slug}/`,
        file: `projects/${p.slug}/index.html`,
        head: headTags(projectMeta(p)),
        sitemap: true,
      })),
    { url: "/404", file: "404.html", head: headTags(notFoundMeta()), sitemap: false },
  ];
}
