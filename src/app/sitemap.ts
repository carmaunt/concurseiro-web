import type { MetadataRoute } from "next";
import { canonicalContentSlug } from "@/services/contentAliases";
import { listarConteudosParaSitemap, tipoToPath } from "@/services/conteudosService";
import { getContestGuideSitemapPaths } from "@/services/contestGuides";
import type { ConteudoTipo } from "@/types/conteudos";

const publicRoutes = [
  "",
  "/noticias",
  "/blog",
  "/concursos-abertos",
  "/editais-previstos",
  "/baixar-app",
  "/sobre",
  "/contato",
  "/privacidade",
  "/termos",
  "/politica-editorial",
];

const contentTypes: ConteudoTipo[] = ["NOTICIA", "BLOG", "CONCURSO_ABERTO", "EDITAL_PREVISTO"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000").replace(/\/$/, "");

  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const contentByType = await Promise.all(contentTypes.map(listarConteudosParaSitemap));
  const contentEntries: MetadataRoute.Sitemap = contentByType.flat().map((content) => ({
    url: `${baseUrl}${tipoToPath(content.tipo)}/${encodeURIComponent(canonicalContentSlug(content.tipo, content.slug))}`,
    lastModified: new Date(content.updatedAt || content.publicadoEm || content.createdAt),
    changeFrequency: content.tipo === "NOTICIA" ? "daily" : "weekly",
    priority: content.destaque ? 0.9 : 0.6,
  }));

  const guideEntries: MetadataRoute.Sitemap = getContestGuideSitemapPaths().map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "/concursos" ? 0.8 : 0.65,
  }));

  return [...staticEntries, ...guideEntries, ...contentEntries];
}
