import type { Metadata } from "next";
import { ConteudosListing } from "@/components/ConteudosListing";
import { PublicLayout } from "@/components/PublicLayout";
import { listarConteudosPublicosPage, listarTaxonomiasPublicas } from "@/services/conteudosService";
import { parseEditorialUrlParams, type EditorialUrlSearchParams } from "@/services/editorial";

const title = "Notícias de concursos públicos";
const description = "Editais, autorizações, bancas, inscrições e mudanças relevantes em concursos, com fontes oficiais e orientação ao candidato.";

type PageProps = { searchParams: Promise<EditorialUrlSearchParams> };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { shouldNoIndex } = parseEditorialUrlParams(await searchParams);

  return {
    title,
    description,
    alternates: { canonical: "/noticias" },
    robots: shouldNoIndex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: "/noticias", type: "website" },
  };
}

export default async function NoticiasPage({ searchParams }: PageProps) {
  const filters = parseEditorialUrlParams(await searchParams);
  const [initialData, initialTaxonomies] = await Promise.all([
    listarConteudosPublicosPage({
      tipo: "NOTICIA",
      search: filters.search,
      category: filters.category,
      tag: filters.tag,
      page: filters.pageIndex,
      size: 9,
    }),
    listarTaxonomiasPublicas("NOTICIA"),
  ]);

  return (
    <PublicLayout>
      <ConteudosListing
        title="Notícias de concursos"
        description="Acompanhe fatos confirmados, prazos e mudanças que podem afetar sua inscrição ou preparação."
        tipo="NOTICIA"
        emptyTitle="Nenhuma notícia publicada"
        emptyDescription="Novas informações verificadas aparecerão aqui assim que forem publicadas."
        searchPlaceholder="Buscar por concurso, órgão, banca ou cargo"
        initialData={initialData}
        initialTaxonomies={initialTaxonomies}
      />
    </PublicLayout>
  );
}
