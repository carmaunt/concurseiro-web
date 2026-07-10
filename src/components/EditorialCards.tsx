import Link from "next/link";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { CoverImage } from "./CoverImage";
import { ctaLabel, tipoLabel } from "@/services/editorial";
import { formatDate, tipoToPath } from "@/services/conteudosService";
import type { ConteudoPortal } from "@/types/conteudos";
import styles from "./EditorialCards.module.css";

function hrefFor(conteudo: ConteudoPortal) {
  return `${tipoToPath(conteudo.tipo)}/${conteudo.slug}`;
}

function Meta({ conteudo, showType = false }: { conteudo: ConteudoPortal; showType?: boolean }) {
  return (
    <div className={styles.meta}>
      <span>
        <Badge>{conteudo.categoria || tipoLabel(conteudo.tipo)}</Badge>
        {showType ? <em>{tipoLabel(conteudo.tipo)}</em> : null}
      </span>
      <time dateTime={conteudo.publicadoEm || conteudo.updatedAt}>
        {formatDate(conteudo.publicadoEm || conteudo.updatedAt)}
      </time>
    </div>
  );
}

export function EditorialFeaturedCard({ conteudo }: { conteudo: ConteudoPortal }) {
  return (
    <Card className={styles.featured}>
      <Link href={hrefFor(conteudo)} aria-label={conteudo.titulo}>
        <CoverImage src={conteudo.imagemCapa} alt="" priority variant="featured" />
      </Link>
      <div className={styles.featuredBody}>
        <Meta conteudo={conteudo} showType />
        <h2>
          <Link href={hrefFor(conteudo)}>{conteudo.titulo}</Link>
        </h2>
        <p>{conteudo.resumo}</p>
        <Button href={hrefFor(conteudo)}>{ctaLabel(conteudo.tipo)}</Button>
      </div>
    </Card>
  );
}

export function EditorialCard({ conteudo }: { conteudo: ConteudoPortal }) {
  return (
    <Card className={styles.card}>
      <Link href={hrefFor(conteudo)} aria-label={conteudo.titulo}>
        <CoverImage src={conteudo.imagemCapa} alt="" variant="card" />
      </Link>
      <div className={styles.body}>
        <Meta conteudo={conteudo} />
        <h3>
          <Link href={hrefFor(conteudo)}>{conteudo.titulo}</Link>
        </h3>
        <p>{conteudo.resumo}</p>
        <Button href={hrefFor(conteudo)} variant="secondary">
          {ctaLabel(conteudo.tipo)}
        </Button>
      </div>
    </Card>
  );
}

export function EditorialCompactCard({ conteudo }: { conteudo: ConteudoPortal }) {
  return (
    <Link className={styles.compact} href={hrefFor(conteudo)}>
      <CoverImage src={conteudo.imagemCapa} alt="" variant="compact" />
      <span>
        <small>{conteudo.categoria || tipoLabel(conteudo.tipo)} · {formatDate(conteudo.publicadoEm || conteudo.updatedAt)}</small>
        <strong>{conteudo.titulo}</strong>
      </span>
    </Link>
  );
}

export function EditorialListItem({ conteudo }: { conteudo: ConteudoPortal }) {
  return (
    <Link className={styles.listItem} href={hrefFor(conteudo)}>
      <div>
        <small>{conteudo.categoria || tipoLabel(conteudo.tipo)} · {formatDate(conteudo.publicadoEm || conteudo.updatedAt)}</small>
        <strong>{conteudo.titulo}</strong>
        <p>{conteudo.resumo}</p>
      </div>
      <span>{ctaLabel(conteudo.tipo)}</span>
    </Link>
  );
}
