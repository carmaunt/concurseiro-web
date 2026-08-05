import type { Metadata } from "next";
import { ConteudosListing } from "@/components/ConteudosListing";
import { PublicLayout } from "@/components/PublicLayout";
import { listarConteudosPublicosPage, listarTaxonomiasPublicas } from "@/services/conteudosService";
import { parseEditorialUrlParams, type EditorialUrlSearchParams } from "@/services/editorial";

const title = "Concursos abertos: editais e inscrições";
const description = "Consulte concursos com inscrições abertas, cargos, prazos e fontes oficiais antes de se candidatar.";

type PageProps = { searchParams: Promise<EditorialUrlSearchParams> };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { shouldNoIndex } = parseEditorialUrlParams(await searchParams);

  return {
    title,
    description,
    alternates: { canonical: "/concursos-abertos" },
    robots: shouldNoIndex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: "/concursos-abertos", type: "website" },
  };
}

export default async function ConcursosAbertosPage({ searchParams }: PageProps) {
  const filters = parseEditorialUrlParams(await searchParams);
  const [initialData, initialTaxonomies] = await Promise.all([
    listarConteudosPublicosPage({
      tipo: "CONCURSO_ABERTO",
      search: filters.search,
      category: filters.category,
      tag: filters.tag,
      page: filters.pageIndex,
      size: 9,
    }),
    listarTaxonomiasPublicas("CONCURSO_ABERTO"),
  ]);

  return (
    <PublicLayout>
      <ConteudosListing
        title="Concursos com inscrições abertas"
        description="Consulte oportunidades publicadas, confirme os prazos e abra sempre o edital e a página oficial da banca."
        tipo="CONCURSO_ABERTO"
        emptyTitle="Nenhum concurso aberto publicado"
        emptyDescription="Novas oportunidades verificadas aparecerão aqui quando houver inscrições vigentes."
        searchPlaceholder="Buscar por cargo, órgão, banca ou estado"
        initialData={initialData}
        initialTaxonomies={initialTaxonomies}
      />
    </PublicLayout>
  );
}
