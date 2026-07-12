import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "./Badge";
import { CoverImage } from "./CoverImage";
import { EditorialCompactCard } from "./EditorialCards";
import { PublicLayout } from "./PublicLayout";
import { buscarConteudoPublicado, formatDate, listarConteudosPublicos, tipoToPath } from "@/services/conteudosService";
import { excludeContent, normalizeContent, splitTags, tipoLabel } from "@/services/editorial";
import type { ConteudoTipo } from "@/types/conteudos";
import styles from "./ConteudoArticle.module.css";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const strong = part.match(/^\*\*([^*]+)\*\*$/);
    if (strong) return <strong key={index}>{strong[1]}</strong>;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = safeHref(link[2]);
      if (!href) return link[1];

      return (
        <a key={index} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {link[1]}
        </a>
      );
    }

    return part;
  });
}

function safeHref(value: string) {
  const href = value.trim();
  if (href.startsWith("/") && !href.startsWith("//")) return href;

  try {
    const protocol = new URL(href).protocol;
    return protocol === "https:" || protocol === "http:" || protocol === "mailto:" ? href : null;
  } catch {
    return null;
  }
}

function renderContent(content: string, id: number) {
  const blocks = normalizeContent(content).split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  return blocks.map((block, index) => {
    const key = `${id}-${index}`;

    if (block.startsWith("### ")) return <h3 key={key}>{renderInline(block.slice(4))}</h3>;
    if (block.startsWith("## ")) return <h2 key={key}>{renderInline(block.slice(3))}</h2>;
    if (block.startsWith("> ")) return <blockquote key={key}>{renderInline(block.replace(/^>\s?/gm, ""))}</blockquote>;

    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length > 1 && lines.every((line) => /^[-*]\s+/.test(line))) {
      return (
        <ul key={key}>
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>{renderInline(line.replace(/^[-*]\s+/, ""))}</li>
          ))}
        </ul>
      );
    }

    return <p key={key}>{renderInline(block)}</p>;
  });
}

export async function ConteudoArticle({ tipo, slug }: { tipo: ConteudoTipo; slug: string }) {
  const [conteudo, relacionadosBase] = await Promise.all([
    buscarConteudoPublicado(tipo, slug),
    listarConteudosPublicos(tipo, 4),
  ]);

  if (!conteudo) notFound();

  const tags = splitTags(conteudo.tags);
  const relacionados = excludeContent(relacionadosBase, conteudo).slice(0, 3);
  const tipoPath = tipoToPath(tipo);
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";
  const articleUrl = `${baseUrl}${tipoPath}/${encodeURIComponent(conteudo.slug)}`;
  const blocosConteudo = renderContent(conteudo.conteudo, conteudo.id);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": tipo === "NOTICIA" ? "NewsArticle" : "Article",
    headline: conteudo.seoTitulo || conteudo.titulo,
    description: conteudo.seoDescricao || conteudo.resumo,
    datePublished: conteudo.publicadoEm || conteudo.createdAt,
    dateModified: conteudo.updatedAt,
    mainEntityOfPage: articleUrl,
    author: { "@type": "Organization", name: conteudo.autorNome || "O Concurseiro" },
    publisher: { "@type": "Organization", name: "O Concurseiro", url: baseUrl },
    image: conteudo.imagemCapa ? [conteudo.imagemCapa] : undefined,
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: baseUrl },
      { "@type": "ListItem", position: 2, name: tipoLabel(tipo), item: `${baseUrl}${tipoPath}` },
      { "@type": "ListItem", position: 3, name: conteudo.titulo, item: articleUrl },
    ],
  };

  return (
    <PublicLayout>
      <article className={`container section ${styles.article}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }}
        />
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href={tipoPath}>{tipoLabel(tipo)}</Link>
          <span>/</span>
          <strong>{conteudo.titulo}</strong>
        </nav>

        <div className={styles.header}>
          <div className={styles.kicker}>
            <Badge>{conteudo.categoria || tipoLabel(conteudo.tipo)}</Badge>
            <span>{tipoLabel(conteudo.tipo)}</span>
          </div>
          <h1>{conteudo.titulo}</h1>
          <p>{conteudo.resumo}</p>
          <time dateTime={conteudo.publicadoEm || conteudo.updatedAt}>
            {formatDate(conteudo.publicadoEm || conteudo.updatedAt)}
          </time>
        </div>

        <CoverImage src={conteudo.imagemCapa} alt={conteudo.imagemCapaAlt || conteudo.titulo} priority variant="article" />

        <div className={styles.byline}>
          <span>Por {conteudo.autorNome || "O Concurseiro"}</span>
          {conteudo.revisadoPor ? <span>Revisado por {conteudo.revisadoPor}</span> : null}
        </div>

        <div className={styles.content}>
          {blocosConteudo.slice(0, 3)}
          {tipo === "BLOG" && conteudo.imagemSecundaria ? (
            <div className={styles.inlineImage}>
              <CoverImage src={conteudo.imagemSecundaria} alt={conteudo.imagemSecundariaAlt || "Imagem complementar do artigo"} variant="article" />
            </div>
          ) : null}
          {blocosConteudo.slice(3)}
        </div>

        {conteudo.fontesOficiais?.length ? (
          <section className={styles.sources} aria-label="Fontes oficiais">
            <h2>Fontes oficiais</h2>
            <ul>{conteudo.fontesOficiais.map((fonte) => <li key={fonte.url}><a href={fonte.url} target="_blank" rel="noreferrer">{fonte.nome}</a></li>)}</ul>
          </section>
        ) : null}

        {tags.length > 0 ? (
          <div className={styles.tags} aria-label="Tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
      </article>

      {relacionados.length > 0 ? (
        <section className={`container section ${styles.related}`}>
          <div className="sectionHeader">
            <div>
              <h2>Leia também</h2>
              <p>Outros conteúdos publicados nesta seção.</p>
            </div>
          </div>
          <div className={styles.relatedGrid}>
            {relacionados.map((item) => (
              <EditorialCompactCard key={item.id} conteudo={item} />
            ))}
          </div>
        </section>
      ) : null}
    </PublicLayout>
  );
}
