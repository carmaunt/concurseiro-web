import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { ConteudoArticle } from "@/components/ConteudoArticle";
import { canonicalContentSlug, contentLookupSlugs } from "@/services/contentAliases";
import { buscarConteudoPublicadoComFallback } from "@/services/conteudosService";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = canonicalContentSlug("NOTICIA", slug);
  const conteudo = await buscarConteudoPublicadoComFallback("NOTICIA", contentLookupSlugs("NOTICIA", slug));
  const title = conteudo?.seoTitulo || conteudo?.titulo || "Notícia";
  const description = conteudo?.seoDescricao || conteudo?.resumo || "Notícia do O Concurseiro.";
  const baseUrl = (process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000").replace(/\/$/, "");
  const url = `${baseUrl}/noticias/${encodeURIComponent(canonicalSlug)}`;
  const image = conteudo?.imagemCapa ? [{ url: conteudo.imagemCapa, alt: conteudo.imagemCapaAlt || conteudo.titulo }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
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

export default async function NoticiaDetalhePage({ params }: PageProps) {
  const { slug } = await params;
  const canonicalSlug = canonicalContentSlug("NOTICIA", slug);

  if (canonicalSlug !== slug) {
    permanentRedirect(`/noticias/${encodeURIComponent(canonicalSlug)}`);
  }

  return <ConteudoArticle tipo="NOTICIA" slug={canonicalSlug} />;
}
