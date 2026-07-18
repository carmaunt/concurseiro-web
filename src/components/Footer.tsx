import Link from "next/link";
import styles from "./Footer.module.css";

const productLinks = [
  { href: "/experimentar", label: "Testar questões" },
  { href: "/cadastro", label: "Criar conta" },
  { href: "/baixar-app", label: "Baixar app" },
];

const contentLinks = [
  { href: "/concursos", label: "Guias por perfil" },
  { href: "/noticias", label: "Notícias" },
  { href: "/blog", label: "Blog" },
  { href: "/concursos-abertos", label: "Concursos abertos" },
  { href: "/editais-previstos", label: "Editais previstos" },
];

const institutionalLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato e suporte" },
  { href: "/privacidade", label: "Política de Privacidade" },
  { href: "/termos", label: "Termos de Uso" },
  { href: "/politica-editorial", label: "Política Editorial" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <strong>O Concurseiro</strong>
          <p>Estudo prático, questões e acompanhamento de evolução.</p>
        </div>

        <nav className={styles.links} aria-label="Links do rodapé">
          <div className={styles.linkGroup}>
            <strong>Produto</strong>
            {productLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.linkGroup}>
            <strong>Conteúdo</strong>
            {contentLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.linkGroup}>
            <strong>Institucional</strong>
            {institutionalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className={`container ${styles.legalLine}`}>
        <span>© 2026 O Concurseiro.</span>
        <span>Informação para estudar com mais direção.</span>
      </div>
    </footer>
  );
}
