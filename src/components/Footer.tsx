import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <strong>O Concurseiro</strong>
          <p>Estudo prático, questões e acompanhamento de evolução.</p>
        </div>
        <nav aria-label="Links do rodapé">
          <Link href="/noticias">Notícias</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/concursos-abertos">Concursos abertos</Link>
          <Link href="/editais-previstos">Editais previstos</Link>
        </nav>
      </div>
    </footer>
  );
}
