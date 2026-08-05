import type { Metadata } from "next";
import { ConteudosListing } from "@/components/ConteudosListing";
import { PublicLayout } from "@/components/PublicLayout";
import { listarConteudosPublicosPage, listarTaxonomiasPublicas } from "@/services/conteudosService";
import { parseEditorialUrlParams, type EditorialUrlSearchParams } from "@/services/editorial";

const title = "Editais previstos de concursos públicos";
const description = "Acompanhe concursos autorizados, com comissão ou banca definida, sempre com evidência oficial e situação atualizada.";

type PageProps = { searchParams: Promise<EditorialUrlSearchParams> };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { shouldNoIndex } = parseEditorialUrlParams(await searchParams);

  return {
    title,
    description,
    alternates: { canonical: "/editais-previstos" },
    robots: shouldNoIndex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: "/editais-previstos", type: "website" },
  };
}

export default async function EditaisPrevistosPage({ searchParams }: PageProps) {
  const filters = parseEditorialUrlParams(await searchParams);
  const [initialData, initialTaxonomies] = await Promise.all([
    listarConteudosPublicosPage({
      tipo: "EDITAL_PREVISTO",
      search: filters.search,
      category: filters.category,
      tag: filters.tag,
      page: filters.pageIndex,
      size: 9,
    }),
    listarTaxonomiasPublicas("EDITAL_PREVISTO"),
  ]);

  return (
    <PublicLayout>
      <ConteudosListing
        title="Editais previstos"
        description="Acompanhe concursos com evidência oficial e veja o que já está confirmado e o que ainda depende de definição."
        tipo="EDITAL_PREVISTO"
        emptyTitle="Nenhum edital previsto publicado"
        emptyDescription="Novas previsões sustentadas por fontes oficiais aparecerão aqui."
        searchPlaceholder="Buscar por órgão, área, banca ou carreira"
        initialData={initialData}
        initialTaxonomies={initialTaxonomies}
      />
    </PublicLayout>
  );
}
