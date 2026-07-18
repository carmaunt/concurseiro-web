import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { EditorialCard } from "@/components/EditorialCards";
import { PublicLayout } from "@/components/PublicLayout";
import { listarConteudosRelacionados } from "@/services/conteudosService";
import {
  contestGuideDimensionInfo,
  contestGuideHref,
  getAllContestGuides,
  getContestGuide,
  getContestGuides,
} from "@/services/contestGuides";
import styles from "../../GuideDirectory.module.css";

type PageProps = {
  params: Promise<{ dimension: string; slug: string }>;
};

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllContestGuides().map(({ dimension, slug }) => ({ dimension, slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { dimension, slug } = await params;
  const guide = getContestGuide(dimension, slug);
  if (!guide) return {};

  const url = contestGuideHref(guide);
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "website",
      url,
    },
  };
}

export default async function ContestGuidePage({ params }: PageProps) {
  const { dimension, slug } = await params;
  const guide = getContestGuide(dimension, slug);
  if (!guide) notFound();

  const dimensionInfo = contestGuideDimensionInfo[guide.dimension];
  const relatedContent = await listarConteudosRelacionados(guide.searchTerm);
  const siblingGuides = getContestGuides(guide.dimension)
    .filter((candidate) => candidate.slug !== guide.slug)
    .slice(0, 6);
  const baseUrl = (process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000").replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}${contestGuideHref(guide)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: guide.title,
        description: guide.description,
        url: canonicalUrl,
        isPartOf: { "@type": "WebSite", name: "O Concurseiro", url: baseUrl },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Guias de concursos", item: `${baseUrl}/concursos` },
          { "@type": "ListItem", position: 3, name: guide.name, item: canonicalUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <PublicLayout>
      <article className="container section">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />

        <nav className={styles.breadcrumbs} aria-label="Navegação estrutural">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/concursos">Guias de concursos</Link>
          <span aria-hidden="true">/</span>
          <span>{guide.name}</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>{dimensionInfo.label}</span>
          <h1>{guide.title}</h1>
          <p>{guide.intro}</p>
          <div className={styles.facts} aria-label="Resumo do guia">
            {guide.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <small>{fact.label}</small>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <Button href="/experimentar">Testar questões grátis</Button>
            <Button href={`/concursos-abertos?search=${encodeURIComponent(guide.searchTerm)}`} variant="secondary">
              Buscar concursos publicados
            </Button>
          </div>
        </header>

        <div className={styles.contentGrid}>
          <section className={styles.contentSection}>
            <h2>O que conferir antes de se inscrever</h2>
            <ul>
              {guide.watchItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section className={styles.contentSection}>
            <h2>Como transformar o edital em estudo</h2>
            <ul>
              {guide.studyItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        </div>

        <section className={styles.relatedSection}>
          <h2>Publicações relacionadas a {guide.name}</h2>
          <p>Resultados publicados no portal e encontrados pelo tema deste guia.</p>
          {relatedContent.length > 0 ? (
            <div className={styles.articleGrid}>
              {relatedContent.map((content) => <EditorialCard key={content.id} conteudo={content} />)}
            </div>
          ) : (
            <div className={styles.emptyRelated}>
              Ainda não há publicação editorial associada a este tema. O guia permanece disponível e esta
              seção será preenchida automaticamente quando um conteúdo relacionado for publicado.
            </div>
          )}
        </section>

        <section className={styles.faqSection}>
          <h2>Perguntas frequentes</h2>
          <div className={styles.faqList}>
            {guide.faq.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.relatedSection}>
          <h2>Continue navegando por {dimensionInfo.label.toLowerCase()}</h2>
          <div className={styles.relatedGuides}>
            {siblingGuides.map((candidate) => (
              <Link key={candidate.slug} href={contestGuideHref(candidate)}>{candidate.name}</Link>
            ))}
            <Link href="/concursos">Ver todos os guias</Link>
          </div>
        </section>

        <aside className={styles.cta}>
          <div>
            <h2>Leve o conteúdo do edital para a prática</h2>
            <p>Resolva uma amostra gratuita antes de criar conta e conheça o formato de estudo.</p>
          </div>
          <Button href="/experimentar" variant="secondary">Responder questões</Button>
        </aside>
      </article>
    </PublicLayout>
  );
}
