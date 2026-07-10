import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { CoverImage } from "./CoverImage";
import { formatDate, tipoToPath } from "@/services/conteudosService";
import type { ConteudoPortal } from "@/types/conteudos";
import styles from "./ConteudoCard.module.css";

export function ConteudoCard({ conteudo }: { conteudo: ConteudoPortal }) {
  return (
    <Card className={styles.card}>
      <CoverImage src={conteudo.imagemCapa} alt="" variant="card" />
      <div className={styles.body}>
        <div className={styles.meta}>
          <Badge>{conteudo.categoria || "Concurseiro"}</Badge>
          <span>{formatDate(conteudo.publicadoEm || conteudo.updatedAt)}</span>
        </div>
        <h3>{conteudo.titulo}</h3>
        <p>{conteudo.resumo}</p>
        <Button href={`${tipoToPath(conteudo.tipo)}/${conteudo.slug}`} variant="secondary">
          Ler conteúdo
        </Button>
      </div>
    </Card>
  );
}
