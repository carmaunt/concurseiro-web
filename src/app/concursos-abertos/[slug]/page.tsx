import type { Metadata } from "next";
import { ConteudoArticle } from "@/components/ConteudoArticle";
import { buscarConteudoPublicado } from "@/services/conteudosService";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const conteudo = await buscarConteudoPublicado("CONCURSO_ABERTO", slug);
  const title = conteudo?.seoTitulo || conteudo?.titulo || "Concurso aberto";
  const description = conteudo?.seoDescricao || conteudo?.resumo || "Concurso aberto no O Concurseiro.";
  const baseUrl = (process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000").replace(/\/$/, "");
  const url = `${baseUrl}/concursos-abertos/${encodeURIComponent(slug)}`;
  const image = conteudo?.imagemCapa
    ? [{ url: conteudo.imagemCapa, alt: conteudo.imagemCapaAlt || conteudo.titulo }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: conteudo?.publicadoEm || conteudo?.createdAt,
      modifiedTime: conteudo?.updatedAt,
      authors: [conteudo?.autorNome || "O Concurseiro"],
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: conteudo?.imagemCapa ? [conteudo.imagemCapa] : undefined,
    },
  };
}

export default async function ConcursoAbertoDetalhePage({ params }: PageProps) {
  const { slug } = await params;
  return <ConteudoArticle tipo="CONCURSO_ABERTO" slug={slug} />;
}
