import type { Metadata } from "next";
import { ConteudoArticle } from "@/components/ConteudoArticle";
import { buscarConteudoPublicado } from "@/services/conteudosService";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const conteudo = await buscarConteudoPublicado("NOTICIA", slug);
  const title = conteudo?.seoTitulo || conteudo?.titulo || "Notícia";
  const description = conteudo?.seoDescricao || conteudo?.resumo || "Notícia do O Concurseiro.";
  const url = `${process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000"}/noticias/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: conteudo?.imagemCapa ? [{ url: conteudo.imagemCapa }] : undefined,
    },
  };
}

export default async function NoticiaDetalhePage({ params }: PageProps) {
  const { slug } = await params;
  return <ConteudoArticle tipo="NOTICIA" slug={slug} />;
}
