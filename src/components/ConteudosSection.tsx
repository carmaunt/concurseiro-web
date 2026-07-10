import { EditorialCard, EditorialListItem } from "./EditorialCards";
import { EmptyState } from "./EmptyState";
import { listarConteudosPublicos } from "@/services/conteudosService";
import { pluralizePublications } from "@/services/editorial";
import type { ConteudoTipo } from "@/types/conteudos";
import styles from "./ConteudosSection.module.css";

export async function ConteudosSection({
  title,
  description,
  tipo,
  emptyTitle,
}: {
  title: string;
  description: string;
  tipo: ConteudoTipo;
  emptyTitle: string;
}) {
  const conteudos = await listarConteudosPublicos(tipo, 9);
  const [principal, ...restantes] = conteudos;

  return (
    <section className="container section">
      <div className="sectionHeader">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {conteudos.length > 0 ? <span className={styles.count}>{pluralizePublications(conteudos.length)}</span> : null}
      </div>

      {conteudos.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description="Quando houver conteúdos publicados pelo painel admin, eles aparecerão automaticamente nesta seção."
        />
      ) : (
        <>
          {principal ? (
            <div className={styles.featuredGrid}>
              <EditorialCard conteudo={principal} />
            </div>
          ) : null}
          {restantes.length > 0 ? (
            <div className={styles.list}>
              {restantes.map((conteudo) => (
                <EditorialListItem key={conteudo.id} conteudo={conteudo} />
              ))}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
