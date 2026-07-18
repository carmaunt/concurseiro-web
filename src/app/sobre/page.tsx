import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage } from "@/components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o propósito e os recursos do O Concurseiro.",
};

export default function SobrePage() {
  return (
    <InstitutionalPage
      eyebrow="Sobre o produto"
      title="Estudo com mais direção"
      description="O O Concurseiro reúne questões, acompanhamento de desempenho e conteúdo útil para tornar a preparação mais objetiva."
    >
      <h2>Por que o O Concurseiro existe</h2>
      <p>
        Preparar-se para concursos envolve muito conteúdo e decisões diárias: o que estudar,
        quais questões resolver e onde concentrar o próximo esforço. O Concurseiro foi criado
        para organizar esse processo e tornar os erros uma fonte prática de orientação.
      </p>

      <h2>O que você encontra</h2>
      <ul>
        <li>questões organizadas por disciplina, assunto, banca e instituição;</li>
        <li>resultado e explicação após cada resposta, quando disponíveis;</li>
        <li>histórico e visão de desempenho para usuários cadastrados;</li>
        <li>notícias, editais, concursos e conteúdos de orientação;</li>
        <li>experiência integrada entre o portal e o aplicativo Android.</li>
      </ul>

      <h2>Nosso compromisso</h2>
      <p>
        Buscamos apresentar informações de forma clara, indicar fontes oficiais no conteúdo
        editorial e evoluir o produto a partir de necessidades reais de quem estuda. O portal não
        substitui editais, diários oficiais nem orientações dos órgãos responsáveis.
      </p>

      <div className="callout">
        <p>
          Quer conhecer o produto antes de criar uma conta? <Link href="/experimentar">Resolva a amostra gratuita</Link>.
        </p>
      </div>
    </InstitutionalPage>
  );
}
