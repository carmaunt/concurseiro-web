import type { Metadata } from "next";
import { ConteudosListing } from "@/components/ConteudosListing";
import { PublicLayout } from "@/components/PublicLayout";
import { listarConteudosPublicosPage, listarTaxonomiasPublicas } from "@/services/conteudosService";
import { parseEditorialUrlParams, type EditorialUrlSearchParams } from "@/services/editorial";

const title = "Como estudar para concursos: artigos e métodos";
const description = "Artigos sobre estudo por questões, revisão, bancas, disciplinas e planejamento para concursos públicos.";

type PageProps = { searchParams: Promise<EditorialUrlSearchParams> };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { shouldNoIndex } = parseEditorialUrlParams(await searchParams);

  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    robots: shouldNoIndex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: "/blog", type: "website" },
  };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const filters = parseEditorialUrlParams(await searchParams);
  const [initialData, initialTaxonomies] = await Promise.all([
    listarConteudosPublicosPage({
      tipo: "BLOG",
      search: filters.search,
      category: filters.category,
      tag: filters.tag,
      page: filters.pageIndex,
      size: 9,
    }),
    listarTaxonomiasPublicas("BLOG"),
  ]);

  return (
    <PublicLayout>
      <ConteudosListing
        title="Artigos para estudar com mais direção"
        description="Métodos de estudo, revisão, bancas e disciplinas para transformar teoria e erros em uma próxima ação."
        tipo="BLOG"
        emptyTitle="Nenhum artigo publicado"
        emptyDescription="Novos guias de estudo aparecerão aqui assim que forem publicados."
        searchPlaceholder="Buscar por método, banca, disciplina ou assunto"
        initialData={initialData}
        initialTaxonomies={initialTaxonomies}
      />
    </PublicLayout>
  );
}
