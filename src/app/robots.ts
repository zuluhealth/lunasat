import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/access", "/invite", "/partner-login", "/portal"],
    },
    sitemap: "https://lunasat.com/sitemap.xml",
    host: "https://lunasat.com",
  };
}
