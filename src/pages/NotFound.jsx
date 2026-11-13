import { Link } from "react-router-dom";
import { notFoundMeta, useDocumentMeta } from "../seo/meta";
import s from "./Page.module.css";

const meta = notFoundMeta();

export function NotFound() {
  useDocumentMeta(meta);
  return (
    <div className={`container ${s.page}`}>
      <p className={s.eyebrow}>404</p>
      <h1 className={s.title}>Page not found</h1>
      <p className={s.lede}>The page you’re looking for doesn’t exist or has moved.</p>
      <p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </p>
    </div>
  );
}
