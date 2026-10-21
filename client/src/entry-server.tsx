import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";

export function renderRoute(path: string) {
  const rendered = renderToStaticMarkup(<App ssrPath={path} />);
  const metadata = rendered.match(/^(?:(?:<link\b[^>]*\/?>|<meta\b[^>]*\/?>|<title\b[^>]*>[\s\S]*?<\/title>|<script\b[^>]*>[\s\S]*?<\/script>))+/);

  if (!metadata) {
    throw new Error(`Route metadata was not generated for ${path}`);
  }

  return {
    appHtml: rendered.slice(metadata[0].length),
    head: metadata[0],
  };
}
