import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EditorialCard, EditorialCompactCard, EditorialFeaturedCard } from "@/components/EditorialCards";
import { PublicLayout } from "@/components/PublicLayout";
import { listarConteudosPublicos, listarDestaques } from "@/services/conteudosService";
import { excludeContent, pluralizePublications } from "@/services/editorial";
import type { ConteudoPortal, ConteudoTipo } from "@/types/conteudos";
import styles from "./page.module.css";

const feedSections: Array<{ title: string; tipo: ConteudoTipo; empty: string }> = [
  { title: "Últimas notícias", tipo: "NOTICIA", empty: "Nenhuma notícia publicada" },
  { title: "Dicas de estudo", tipo: "BLOG", empty: "Nenhum post publicado" },
  { title: "Concursos em destaque", tipo: "CONCURSO_ABERTO", empty: "Nenhum concurso publicado" },
  { title: "Editais previstos", tipo: "EDITAL_PREVISTO", empty: "Nenhum edital publicado" },
];

export const metadata: Metadata = {
  title: "O Concurseiro",
  description: "Portal do estudante com notícias, concursos, editais e questões para preparação prática.",
};

function FeedBlock({ title, conteudos, empty }: { title: string; conteudos: ConteudoPortal[]; empty: string }) {
  return (
    <section className={styles.feedBlock}>
      <div className={styles.feedTitle}>
        <h2>{title}</h2>
        <span>{conteudos.length > 0 ? pluralizePublications(conteudos.length) : "Sem publicações"}</span>
      </div>

      {conteudos.length === 0 ? (
        <Card className={styles.feedCard}>
          <h3 className={styles.cardTitle}>{empty}</h3>
          <p className="muted">
            Novas publicações aparecem aqui assim que forem publicadas pelo painel admin.
          </p>
        </Card>
      ) : (
        <div className="grid">
          {conteudos.map((conteudo) => (
            <EditorialCard key={conteudo.id} conteudo={conteudo} />
          ))}
        </div>
      )}
    </section>
  );
}

export default async function Home() {
  const [destaques, ...feeds] = await Promise.all([
    listarDestaques(1),
    ...feedSections.map((section) => listarConteudosPublicos(section.tipo, 3)),
  ]);
  const destaque = destaques[0];
  const feedsSemDestaque = feeds.map((feed) => excludeContent(feed, destaque));
  const compactos = feedsSemDestaque.flat().slice(0, 4);

  return (
    <PublicLayout>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <Badge>Portal do estudante</Badge>
            <h1>O Concurseiro</h1>
            <p className={styles.lead}>Sua aprovação começa aqui</p>
            <p>
              Acompanhe conteúdos, descubra concursos e avance pela resolução de questões
              com uma experiência conectada ao app.
            </p>
            <div className={styles.heroActions}>
              <Button href="/questoes">Resolver questões</Button>
              <Button href="/baixar-app" variant="secondary">
                Baixar app
              </Button>
            </div>
          </div>
          {destaque ? (
            <EditorialFeaturedCard conteudo={destaque} />
          ) : (
            <Card className={styles.highlight}>
              <Badge>Conteúdo em destaque</Badge>
              <h2>Nenhum destaque publicado</h2>
              <p>
                Marque um conteúdo publicado como destaque no painel admin para ocupar este espaço.
              </p>
            </Card>
          )}
        </div>
      </section>

      <section className="container section">
        <div className="sectionHeader">
          <div>
            <h2>Feed editorial</h2>
            <p>Conteúdos para acompanhar concursos e organizar seus estudos.</p>
          </div>
        </div>
        <div className={styles.feedGrid}>
          {feedSections.map((section, index) => (
            <FeedBlock
              key={section.tipo}
              title={section.title}
              conteudos={feedsSemDestaque[index] ?? []}
              empty={destaque?.tipo === section.tipo ? "Sem outras publicações por enquanto" : section.empty}
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
