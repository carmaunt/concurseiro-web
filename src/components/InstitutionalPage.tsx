import type { ReactNode } from "react";
import { PublicLayout } from "./PublicLayout";
import styles from "./InstitutionalPage.module.css";

type InstitutionalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt?: string;
  children: ReactNode;
};

export function InstitutionalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  children,
}: InstitutionalPageProps) {
  return (
    <PublicLayout>
      <section className={`container ${styles.shell}`}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.description}>{description}</p>
          {updatedAt ? <p className={styles.updated}>Última atualização: {updatedAt}</p> : null}
        </header>

        <article className={styles.article}>{children}</article>
      </section>
    </PublicLayout>
  );
}
