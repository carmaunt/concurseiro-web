import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage } from "@/components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Política Editorial",
  description: "Conheça os critérios de fontes, publicação, atualização e correção de conteúdo do O Concurseiro.",
};

export default function PoliticaEditorialPage() {
  return (
    <InstitutionalPage
      eyebrow="Conteúdo confiável"
      title="Política Editorial"
      description="Estes critérios orientam a produção, a revisão, a atualização e a correção das publicações do O Concurseiro."
      updatedAt="16 de julho de 2026"
    >
      <h2>1. Objetivo editorial</h2>
      <p>
        Publicamos informações e orientações que ajudem concurseiros a entender oportunidades,
        organizar estudos e tomar decisões com base em dados verificáveis. Clareza e utilidade vêm
        antes de volume ou sensacionalismo.
      </p>

      <h2>2. Hierarquia de fontes</h2>
      <p>Quando uma informação depende de confirmação externa, priorizamos:</p>
      <ol>
        <li>editais, retificações, diários oficiais e páginas do órgão responsável;</li>
        <li>sites e comunicados oficiais da banca organizadora;</li>
        <li>legislação, atos administrativos e bases públicas pertinentes;</li>
        <li>fontes secundárias identificadas, apenas como complemento ou contexto.</li>
      </ol>
      <p>
        Rumores e estimativas devem ser apresentados como tais, nunca como fatos confirmados.
      </p>

      <h2>3. Publicação e transparência</h2>
      <ul>
        <li>títulos devem representar o conteúdo sem prometer mais do que a fonte sustenta;</li>
        <li>datas, órgão, banca, vagas e prazos devem ser conferidos antes da publicação;</li>
        <li>fontes oficiais relevantes devem aparecer de forma acessível na publicação;</li>
        <li>conteúdo informativo, análise e material promocional devem ser distinguíveis;</li>
        <li>conflitos de interesse ou relações comerciais relevantes devem ser informados.</li>
      </ul>

      <h2>4. Atualizações e correções</h2>
      <p>
        Conteúdos sujeitos a mudança podem ser atualizados quando surgirem edital, retificação ou
        novo comunicado oficial. Erros factuais confirmados devem ser corrigidos com agilidade e,
        quando a alteração mudar materialmente a compreensão da publicação, a atualização deve ser
        sinalizada no próprio conteúdo.
      </p>

      <h2>5. Questões e materiais de estudo</h2>
      <p>
        Questões, gabaritos e explicações devem preservar fidelidade ao material de origem e indicar
        adaptações quando existirem. Uma explicação deve justificar a resposta e evitar afirmações
        sem apoio normativo, técnico ou bibliográfico quando esse apoio for necessário.
      </p>

      <h2>6. Independência e linguagem</h2>
      <p>
        A cobertura não deve favorecer órgão, banca, curso ou anunciante por interesse comercial.
        Usamos linguagem direta, respeitosa e inclusiva, evitando alarmismo, falsas garantias de
        aprovação e urgência artificial.
      </p>

      <h2>7. Solicitação de correção</h2>
      <p>
        Qualquer leitor pode apontar uma divergência pelo canal de{" "}
        <Link href="/contato">Contato e suporte</Link>. Informe o endereço da publicação, o trecho
        questionado e, se possível, a fonte oficial correspondente.
      </p>
    </InstitutionalPage>
  );
}
