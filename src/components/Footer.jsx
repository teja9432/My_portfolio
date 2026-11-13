import { person } from "../data/content";
import s from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <p>
          © {new Date().getFullYear()} {person.name}
        </p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
