import type { Metadata } from "next";
import { ConteudosListing } from "@/components/ConteudosListing";
import { PublicLayout } from "@/components/PublicLayout";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Notícias sobre concursos públicos publicadas pelo O Concurseiro.",
};

export default function NoticiasPage() {
  return (
    <PublicLayout>
      <ConteudosListing
        title="Notícias"
        description="Atualizações e informações sobre concursos publicadas pelo painel admin."
        tipo="NOTICIA"
        emptyTitle="Nenhuma notícia publicada"
        emptyDescription="As notícias publicadas pelo painel admin aparecerão aqui."
        searchPlaceholder="Buscar notícias por título, resumo ou conteúdo"
      />
    </PublicLayout>
  );
}
