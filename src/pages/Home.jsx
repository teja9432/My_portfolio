import { homeMeta, useDocumentMeta } from "../seo/meta";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { AIHighlights } from "../sections/AIHighlights";
import { Skills } from "../sections/Skills";
import { Projects } from "../sections/Projects";
import { Experience } from "../sections/Experience";
import { Certifications } from "../sections/Certifications";
import { Education } from "../sections/Education";
import { Contact } from "../sections/Contact";

const meta = homeMeta();

export function Home() {
  useDocumentMeta(meta);
  return (
    <>
      <Hero />
      <About />
      <AIHighlights />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Education />
      <Contact />
    </>
  );
}
