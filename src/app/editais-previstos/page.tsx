import type { Metadata } from "next";
import { ConteudosListing } from "@/components/ConteudosListing";
import { PublicLayout } from "@/components/PublicLayout";

export const metadata: Metadata = {
  title: "Editais previstos",
  description: "Editais previstos acompanhados pelo O Concurseiro.",
};

export default function EditaisPrevistosPage() {
  return (
    <PublicLayout>
      <ConteudosListing
        title="Editais previstos"
        description="Previsões editoriais cadastradas e publicadas pelo painel admin."
        tipo="EDITAL_PREVISTO"
        emptyTitle="Nenhum edital previsto publicado"
        emptyDescription="Os editais previstos publicados pelo painel admin aparecerão aqui."
        searchPlaceholder="Buscar editais previstos por área, órgão ou conteúdo"
      />
    </PublicLayout>
  );
}
