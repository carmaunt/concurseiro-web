import type { Metadata } from "next";
import { ConteudosListing } from "@/components/ConteudosListing";
import { PublicLayout } from "@/components/PublicLayout";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dicas de estudo e orientação para preparação de concursos.",
};

export default function BlogPage() {
  return (
    <PublicLayout>
      <ConteudosListing
        title="Blog"
        description="Artigos e dicas de estudo publicados pelo painel admin."
        tipo="BLOG"
        emptyTitle="Nenhum post publicado"
        emptyDescription="Os artigos publicados pelo painel admin aparecerão aqui."
        searchPlaceholder="Buscar artigos por tema, título ou conteúdo"
      />
    </PublicLayout>
  );
}
