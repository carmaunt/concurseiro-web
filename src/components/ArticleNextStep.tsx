import Link from "next/link";
import { Button } from "./Button";
import { tipoLabel } from "@/services/editorial";
import { tipoToPath } from "@/services/conteudosService";
import type { ConteudoPortal, ConteudoTipo, TaxonomiaResumo } from "@/types/conteudos";
import styles from "./ArticleNextStep.module.css";

type CtaContent = {
  title: string;
  description: (topic: string) => string;
  primaryLabel: string;
};

const ctaByType: Record<ConteudoTipo, CtaContent> = {
  NOTICIA: {
    title: "Transforme informação em prática",
    description: (topic) =>
      `Agora que você se atualizou sobre “${topic}”, faça um diagnóstico rápido e descubra como está seu ritmo de resolução.`,
    primaryLabel: "Praticar 5 questões grátis",
  },
  BLOG: {
    title: "Aplique o que acabou de aprender",
    description: (topic) =>
      `Leve as orientações de “${topic}” para a prática e use o resultado para decidir seu próximo estudo.`,
    primaryLabel: "Testar meu nível grátis",
  },
  CONCURSO_ABERTO: {
    title: "Dê o primeiro passo para esta oportunidade",
    description: (topic) =>
      `Se “${topic}” está no seu radar, comece medindo seu desempenho em uma sessão curta de questões.`,
    primaryLabel: "Começar diagnóstico grátis",
  },
  EDITAL_PREVISTO: {
    title: "Comece antes da publicação do edital",
    description: (topic) =>
      `Enquanto acompanha “${topic}”, antecipe sua preparação com uma primeira sessão de prática.`,
    primaryLabel: "Começar a praticar grátis",
  },
};

const fallbackRelatedLabels: Record<ConteudoTipo, string> = {
  NOTICIA: "Ver mais notícias",
  BLOG: "Ver mais artigos",
  CONCURSO_ABERTO: "Ver outros concursos abertos",
  EDITAL_PREVISTO: "Ver outros editais previstos",
};

function firstTaxonomy(conteudo: ConteudoPortal): { taxonomy: TaxonomiaResumo; kind: "tag" | "category" } | null {
  if (conteudo.category?.nome && conteudo.category.slug) {
    return { taxonomy: conteudo.category, kind: "category" };
  }
  const firstTag = Array.isArray(conteudo.tags) ? conteudo.tags[0] : undefined;
  if (firstTag?.nome && firstTag.slug) return { taxonomy: firstTag, kind: "tag" };
  return null;
}

export function ArticleNextStep({ conteudo }: { conteudo: ConteudoPortal }) {
  const config = ctaByType[conteudo.tipo];
  const taxonomy = firstTaxonomy(conteudo);
  const topic = taxonomy?.taxonomy.nome || conteudo.categoria?.trim() || tipoLabel(conteudo.tipo).toLowerCase();
  const listingPath = tipoToPath(conteudo.tipo);
  const sampleParams = new URLSearchParams({
    origem: "conteudo",
    tipo: conteudo.tipo.toLowerCase(),
    conteudo: conteudo.slug,
  });
  const relatedParams = taxonomy
    ? new URLSearchParams({ [taxonomy.kind]: taxonomy.taxonomy.slug })
    : null;
  const headingId = `proximo-passo-${conteudo.id}`;

  return (
    <section className={styles.section} aria-labelledby={headingId} data-testid="article-next-step">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Seu próximo passo</p>
        <h2 id={headingId}>{config.title}</h2>
        <p className={styles.description}>{config.description(topic)}</p>
        <p className={styles.disclosure}>
          A amostra reúne 5 questões variadas do acervo, não exige cadastro e mostra a correção após cada resposta.
        </p>
      </div>

      <div className={styles.actions}>
        <Button href={`/experimentar?${sampleParams.toString()}`}>{config.primaryLabel}</Button>
        <Link
          className={styles.relatedLink}
          href={relatedParams ? `${listingPath}?${relatedParams.toString()}` : listingPath}
        >
          {taxonomy ? `Ver mais sobre ${taxonomy.taxonomy.nome}` : fallbackRelatedLabels[conteudo.tipo]}
        </Link>
      </div>
    </section>
  );
}
