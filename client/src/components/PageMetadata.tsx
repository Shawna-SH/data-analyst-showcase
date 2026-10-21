import { useEffect } from "react";

const SITE_URL = "https://ruipushi.com";
const DEFAULT_IMAGE = "/opengraph.jpg";

type PageMetadataProps = {
  title: string;
  description: string;
  path: string;
  type?: "article" | "website";
  image?: string;
  structuredData?: Record<string, unknown>;
  noIndex?: boolean;
};

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function updateTag(tagName: string, selector: string, attributes: Record<string, string>, textContent?: string) {
  let element = document.head.querySelector(selector) as HTMLElement | null;
  if (!element) {
    element = document.createElement(tagName);
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => element!.setAttribute(name, value));
  if (textContent !== undefined) {
    element.textContent = textContent;
  }
}

export function PageMetadata({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_IMAGE,
  structuredData,
  noIndex = false,
}: PageMetadataProps) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  useEffect(() => {
    updateTag("title", 'title[data-page-metadata="title"]', { "data-page-metadata": "title" }, title);
    updateTag("meta", 'meta[data-page-metadata="description"]', { "data-page-metadata": "description", name: "description", content: description });
    updateTag("link", 'link[data-page-metadata="canonical"]', { "data-page-metadata": "canonical", rel: "canonical", href: canonical });
    updateTag("meta", 'meta[data-page-metadata="og-title"]', { "data-page-metadata": "og-title", property: "og:title", content: title });
    updateTag("meta", 'meta[data-page-metadata="og-description"]', { "data-page-metadata": "og-description", property: "og:description", content: description });
    updateTag("meta", 'meta[data-page-metadata="og-type"]', { "data-page-metadata": "og-type", property: "og:type", content: type });
    updateTag("meta", 'meta[data-page-metadata="og-url"]', { "data-page-metadata": "og-url", property: "og:url", content: canonical });
    updateTag("meta", 'meta[data-page-metadata="og-image"]', { "data-page-metadata": "og-image", property: "og:image", content: imageUrl });
    updateTag("meta", 'meta[data-page-metadata="twitter-card"]', { "data-page-metadata": "twitter-card", name: "twitter:card", content: "summary_large_image" });
    updateTag("meta", 'meta[data-page-metadata="twitter-title"]', { "data-page-metadata": "twitter-title", name: "twitter:title", content: title });
    updateTag("meta", 'meta[data-page-metadata="twitter-description"]', { "data-page-metadata": "twitter-description", name: "twitter:description", content: description });
    updateTag("meta", 'meta[data-page-metadata="twitter-image"]', { "data-page-metadata": "twitter-image", name: "twitter:image", content: imageUrl });

    const robotsSelector = 'meta[data-page-metadata="robots"]';
    if (noIndex) {
      updateTag("meta", robotsSelector, { "data-page-metadata": "robots", name: "robots", content: "noindex,follow" });
    } else {
      document.head.querySelector(robotsSelector)?.remove();
    }

    const structuredDataSelector = 'script[data-page-metadata="structured-data"]';
    if (structuredData) {
      updateTag("script", structuredDataSelector, { "data-page-metadata": "structured-data", type: "application/ld+json" }, JSON.stringify(structuredData));
    } else {
      document.head.querySelector(structuredDataSelector)?.remove();
    }
  }, [canonical, description, imageUrl, noIndex, structuredData, title, type]);

  if (typeof window !== "undefined") {
    return null;
  }

  return (
    <>
      <title data-page-metadata="title">{title}</title>
      <meta data-page-metadata="description" name="description" content={description} />
      <link data-page-metadata="canonical" rel="canonical" href={canonical} />
      <meta data-page-metadata="og-title" property="og:title" content={title} />
      <meta data-page-metadata="og-description" property="og:description" content={description} />
      <meta data-page-metadata="og-type" property="og:type" content={type} />
      <meta data-page-metadata="og-url" property="og:url" content={canonical} />
      <meta data-page-metadata="og-image" property="og:image" content={imageUrl} />
      <meta data-page-metadata="twitter-card" name="twitter:card" content="summary_large_image" />
      <meta data-page-metadata="twitter-title" name="twitter:title" content={title} />
      <meta data-page-metadata="twitter-description" name="twitter:description" content={description} />
      <meta data-page-metadata="twitter-image" name="twitter:image" content={imageUrl} />
      {noIndex && <meta data-page-metadata="robots" name="robots" content="noindex,follow" />}
      {structuredData && <script data-page-metadata="structured-data" type="application/ld+json">{JSON.stringify(structuredData)}</script>}
    </>
  );
}
