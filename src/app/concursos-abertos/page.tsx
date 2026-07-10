import type { Metadata } from "next";
import { ConteudosListing } from "@/components/ConteudosListing";
import { PublicLayout } from "@/components/PublicLayout";

export const metadata: Metadata = {
  title: "Concursos abertos",
  description: "Concursos abertos publicados pelo O Concurseiro.",
};

export default function ConcursosAbertosPage() {
  return (
    <PublicLayout>
      <ConteudosListing
        title="Concursos abertos"
        description="Oportunidades cadastradas e publicadas pelo painel admin."
        tipo="CONCURSO_ABERTO"
        emptyTitle="Nenhum concurso publicado"
        emptyDescription="Os concursos publicados pelo painel admin aparecerão aqui."
        searchPlaceholder="Buscar concursos por cargo, órgão ou conteúdo"
      />
    </PublicLayout>
  );
}
