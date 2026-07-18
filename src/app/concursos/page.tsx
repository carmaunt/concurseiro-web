import type { Metadata } from "next";
import Link from "next/link";
import { PublicLayout } from "@/components/PublicLayout";
import {
  CONTEST_GUIDE_DIMENSIONS,
  contestGuideDimensionInfo,
  contestGuideHref,
  getAllContestGuides,
  getContestGuides,
} from "@/services/contestGuides";
import styles from "./GuideDirectory.module.css";

export const metadata: Metadata = {
  title: "Guias de concursos por área, estado, banca e escolaridade",
  description: "Encontre guias permanentes de concursos por área profissional, estado, banca organizadora e nível de escolaridade.",
  alternates: { canonical: "/concursos" },
  openGraph: {
    title: "Guias de concursos por perfil",
    description: "Um ponto de partida organizado para encontrar editais, entender requisitos e planejar os estudos.",
    url: "/concursos",
  },
};

export default function ContestGuideDirectoryPage() {
  const total = getAllContestGuides().length;

  return (
    <PublicLayout>
      <div className="container section">
        <nav className={styles.breadcrumbs} aria-label="Navegação estrutural">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span>Guias de concursos</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>{total} guias permanentes</span>
          <h1>Encontre concursos pelo seu perfil de estudo</h1>
          <p>
            Navegue por área profissional, estado, banca ou escolaridade. Cada guia explica o que conferir
            no edital, como começar a preparação e reúne publicações relacionadas quando elas existem.
          </p>
          <nav className={styles.quickLinks} aria-label="Categorias dos guias">
            {CONTEST_GUIDE_DIMENSIONS.map((dimension) => (
              <a key={dimension} href={`#${dimension}`}>{contestGuideDimensionInfo[dimension].label}</a>
            ))}
          </nav>
        </header>

        {CONTEST_GUIDE_DIMENSIONS.map((dimension) => {
          const info = contestGuideDimensionInfo[dimension];
          return (
            <section key={dimension} id={dimension} className={styles.dimensionSection}>
              <div className={styles.sectionHeading}>
                <h2>{info.title}</h2>
                <p>{info.description}</p>
              </div>
              <div className={styles.directoryGrid}>
                {getContestGuides(dimension).map((guide) => (
                  <Link key={guide.slug} className={styles.directoryCard} href={contestGuideHref(guide)}>
                    <strong>{guide.name}</strong>
                    <p>{guide.summary}</p>
                    <span>Ver guia →</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <aside className={styles.editorialNote}>
          <strong>Informação sem promessa de vaga</strong>
          Os guias são páginas de orientação. A existência de concurso, as vagas, os requisitos e as datas
          só são tratados como confirmados quando constam em fonte oficial ou no edital da seleção.
        </aside>
      </div>
    </PublicLayout>
  );
}
