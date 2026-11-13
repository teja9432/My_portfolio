import { homeMeta, useDocumentMeta } from "../seo/meta";

const meta = homeMeta();

export function Home() {
  useDocumentMeta(meta);
  return <></>;
}
