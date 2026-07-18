import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

/**
 * Meta
 * @description HTML meta tags manager using react-helmet-async for SEO and social sharing
 *
 * @param title - Page title
 * @param description - Page description for meta and Open Graph tags
 * @param keywords - Comma-separated keywords for the meta tag
 * @param author - Content author name
 * @param banner - Path to the social sharing banner image
 * @param favicon - Path to the favicon image
 * @param url - Canonical URL path for the page
 * @returns Helmet component that injects title, meta, and Open Graph tags into the document head
 *
 * @example
 * <Meta title="My Page" description="Page description" url="/my-page" />
 */
const Meta: React.FC<{
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  banner?: string;
  favicon?: string;
  url: string;
}> = ({
  title,
  description,
  keywords,
  author,
  banner,
  favicon,
  url
}) => {
  const [ localData, setLocalData ] = useState<Record<string, string>>(null);

  useEffect(() => {
    setLocalData({
      title,
      description,
      keywords,
      author,
      banner,
      favicon,
      url
    });
  }, [
    title,
    description,
    keywords,
    author,
    banner,
    favicon,
    url
  ]);

  return (
    <Helmet>
      <title>{localData?.title || "ioy.app"}</title>
      <link rel="icon" href={(localData?.favicon && `https://ioy.app${localData?.favicon}`) || "/favicon.ico"} type="image/x-icon" />
      <meta name="robots" content="index, follow" />
      <meta name="description" content={localData?.description} />
      <meta name="keywords" content={localData?.keywords || "gamedev,indiedev,games,game,web,webplatform,webgames,html"} />
      <meta name="author" content={localData?.author || "ioy.app"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://ioy.app${localData?.url}`} />
      <meta property="og:title" content={localData?.title || "ioy.app"} />
      <meta property="og:description" content={localData?.description} />
      <meta property="og:image" content={(localData?.banner && `https://ioy.app${localData?.banner}`) || "https://ioy.app/resources/banner.png"} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://ioy.app${localData?.url}`} />
      <meta property="twitter:title" content={localData?.title || "ioy.app"} />
      <meta property="twitter:description" content={localData?.description} />
      <meta property="twitter:image" content={(localData?.banner && `https://ioy.app${localData?.banner}`) || "https://ioy.app/resources/banner.png"} />
    </Helmet>
  );
}

export default Meta;