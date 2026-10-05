import type { APIRoute } from "astro";

/**
 * robots.txt, built at deploy time. Same switch as Seo's robots meta:
 * only `PUBLIC_SITE_ENV=production` allows crawling; previews block all.
 * The sitemap line needs `site` (PUBLIC_SITE_URL).
 */
export const GET: APIRoute = ({ site }) => {
  const isProd = import.meta.env["PUBLIC_SITE_ENV"] === "production";
  const lines = isProd
    ? ["User-agent: *", "Allow: /", "Disallow: /studio", "Disallow: /dev/", "Disallow: /api/"]
    : ["User-agent: *", "Disallow: /"];
  if (isProd && site) lines.push("", `Sitemap: ${new URL("sitemap-index.xml", site).href}`);
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
