import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EditorialCard, EditorialCompactCard, EditorialFeaturedCard } from "@/components/EditorialCards";
import { PublicLayout } from "@/components/PublicLayout";
import { ProductProof } from "@/components/ProductProof";
import { listarConteudosPublicos, listarDestaques } from "@/services/conteudosService";
import type { ConteudoPortal, ConteudoTipo } from "@/types/conteudos";
import styles from "./page.module.css";

const feedSections: Array<{ title: string; tipo: ConteudoTipo; empty: string }> = [
  { title: "Últimas notícias", tipo: "NOTICIA", empty: "Nenhuma notícia publicada" },
  { title: "Dicas de estudo", tipo: "BLOG", empty: "Nenhum post publicado" },
  { title: "Concursos em destaque", tipo: "CONCURSO_ABERTO", empty: "Nenhum concurso publicado" },
  { title: "Editais previstos", tipo: "EDITAL_PREVISTO", empty: "Nenhum edital publicado" },
];

export const metadata: Metadata = {
  title: "Questões e desempenho para concursos",
  description:
    "Filtre questões de concursos e acompanhe acertos, erros e evolução por disciplina para estudar com mais direção.",
};

function FeedBlock({ title, conteudos, empty }: { title: string; conteudos: ConteudoPortal[]; empty: string }) {
  return (
    <section className={styles.feedBlock}>
      <div className={styles.feedTitle}>
        <h2>{title}</h2>
        <span>{conteudos.length > 0 ? "Mais recente" : "Sem publicações"}</span>
      </div>

      {conteudos.length === 0 ? (
        <Card className={styles.feedCard}>
          <h3 className={styles.cardTitle}>{empty}</h3>
          <p className="muted">
            Novas publicações aparecem aqui assim que forem publicadas pelo painel admin.
          </p>
        </Card>
      ) : (
        <div className={styles.sectionCard}>
          {conteudos.map((conteudo) => (
            <EditorialCard key={conteudo.id} conteudo={conteudo} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductOverview() {
  return (
    <aside className={styles.productOverview} aria-label="Visão geral da área de estudos">
      <div className={styles.productOverviewHeader}>
        <Badge>Área de estudos</Badge>
        <span>Uma rotina conectada</span>
      </div>
      <h2>Pratique, confira o resultado e acompanhe sua evolução</h2>
      <ol className={styles.studyFlow}>
        <li>
          <span>01</span>
          <div>
            <strong>Encontre as questões certas</strong>
            <p>Filtre por disciplina, assunto, banca, órgão e ano.</p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <strong>Responda com contexto</strong>
            <p>Veja o resultado e continue sua sessão de estudo.</p>
          </div>
        </li>
        <li>
          <span>03</span>
          <div>
            <strong>Entenda seu desempenho</strong>
            <p>Acompanhe acertos, erros e evolução por disciplina.</p>
          </div>
        </li>
      </ol>
      <div className={styles.productOverviewFooter}>
        <span>Questões</span>
        <span>Resultados</span>
        <span>Evolução</span>
      </div>
    </aside>
  );
}

export default async function Home() {
  const [destaques, ...feeds] = await Promise.all([
    listarDestaques(1),
    ...feedSections.map((section) => listarConteudosPublicos(section.tipo, 1)),
  ]);
  const destaque = destaques[0];
  const compactos = feeds.flat().slice(0, 4);

  return (
    <PublicLayout>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <Badge>Questões e desempenho</Badge>
            <h1>Descubra onde você mais erra e estude com mais direção</h1>
            <p className={styles.lead}>Questões filtradas e evolução por disciplina, em um só lugar.</p>
            <p>
              Escolha disciplina, assunto, banca, órgão ou ano. Depois, acompanhe seus acertos
              e erros para decidir o que praticar em seguida.
            </p>
            <div className={styles.heroActions}>
              <Button href="/experimentar">Testar questões grátis</Button>
              <Button href="/baixar-app" variant="secondary">
                Baixar app
              </Button>
            </div>
          </div>
          <ProductOverview />
        </div>
      </section>

      <section className={`container ${styles.productSection}`} aria-labelledby="produto-title">
        <div className={styles.productSectionHeading}>
          <Badge>Produto de estudo</Badge>
          <h2 id="produto-title">Tudo o que você acompanha vira uma próxima ação</h2>
          <p>
            O portal ajuda a descobrir oportunidades. A área de estudos transforma essa informação
            em prática com questões e acompanhamento de desempenho.
          </p>
        </div>
        <div className={styles.productBenefits}>
          <Card className={styles.productBenefit}>
            <span aria-hidden="true">01</span>
            <h3>Descubra</h3>
            <p>Encontre concursos, editais e orientações para definir onde concentrar seus estudos.</p>
          </Card>
          <Card className={styles.productBenefit}>
            <span aria-hidden="true">02</span>
            <h3>Pratique</h3>
            <p>Resolva questões com filtros e avance em uma rotina conectada ao seu objetivo.</p>
          </Card>
          <Card className={styles.productBenefit}>
            <span aria-hidden="true">03</span>
            <h3>Acompanhe</h3>
            <p>Use seu histórico de acertos e erros para identificar as disciplinas que pedem atenção.</p>
          </Card>
        </div>
      </section>

      <ProductProof />

      <section className="container section">
        <div className="sectionHeader">
          <div>
            <h2>Conteúdo para orientar sua preparação</h2>
            <p>Notícias e guias entram depois do produto e ajudam você a escolher o próximo passo.</p>
          </div>
        </div>
        {destaque ? (
          <div className={styles.editorialHighlight}>
            <EditorialFeaturedCard conteudo={destaque} />
          </div>
        ) : null}
        <div className={styles.feedGrid}>
          {feedSections.map((section, index) => (
            <FeedBlock
              key={section.tipo}
              title={section.title}
              conteudos={feeds[index] ?? []}
              empty={section.empty}
            />
          ))}
        </div>
      </section>

      {compactos.length > 0 ? (
        <section className="container section">
          <div className="sectionHeader">
            <div>
              <h2>Para ler agora</h2>
              <p>Conteúdos recentes para continuar navegando pelo portal.</p>
            </div>
          </div>
          <div className={styles.compactGrid}>
            {compactos.map((conteudo) => (
              <EditorialCompactCard key={`compact-${conteudo.id}`} conteudo={conteudo} />
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.appBand}>
        <div className={`container ${styles.appBandInner}`}>
          <div>
            <Badge>Estudo prático</Badge>
            <h2>Continue pelo app quando sair do navegador</h2>
            <p>
              A web concentra descoberta, leitura e acesso rápido. O app segue como espaço
              natural para estudo recorrente e acompanhamento diário.
            </p>
          </div>
          <Button href="/baixar-app" variant="secondary">
            Baixar app
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
