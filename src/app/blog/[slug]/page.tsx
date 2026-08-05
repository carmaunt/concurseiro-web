import type { Metadata } from "next";
import { ConteudoArticle } from "@/components/ConteudoArticle";
import { buscarConteudoPublicado } from "@/services/conteudosService";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const conteudo = await buscarConteudoPublicado("BLOG", slug);
  const title = conteudo?.seoTitulo || conteudo?.titulo || "Blog";
  const description = conteudo?.seoDescricao || conteudo?.resumo || "Post do blog O Concurseiro.";
  const baseUrl = (process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000").replace(/\/$/, "");
  const url = `${baseUrl}/blog/${encodeURIComponent(slug)}`;
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

export default async function BlogDetalhePage({ params }: PageProps) {
  const { slug } = await params;
  return <ConteudoArticle tipo="BLOG" slug={slug} />;
}
