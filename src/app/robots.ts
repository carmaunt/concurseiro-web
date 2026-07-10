import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/noticias", "/blog", "/concursos-abertos", "/editais-previstos", "/baixar-app"],
        disallow: ["/dashboard", "/questoes", "/login", "/cadastro"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
