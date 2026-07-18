import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage } from "@/components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Conheça as condições de uso do portal e do aplicativo Android O Concurseiro.",
};

export default function TermosPage() {
  return (
    <InstitutionalPage
      eyebrow="Regras do serviço"
      title="Termos de Uso"
      description="Estas condições organizam o uso do portal e do aplicativo Android O Concurseiro."
      updatedAt="16 de julho de 2026"
    >
      <h2>1. Aceitação</h2>
      <p>
        Ao acessar ou utilizar O Concurseiro, você declara que leu e concorda com estes termos e
        com a <Link href="/privacidade">Política de Privacidade</Link>. Se não concordar, não utilize
        os recursos que dependem dessa aceitação.
      </p>

      <h2>2. Finalidade do produto</h2>
      <p>
        O Concurseiro oferece ferramentas de apoio ao estudo, questões, acompanhamento de
        desempenho e conteúdo editorial. O serviço não garante aprovação nem substitui editais,
        comunicados, diários oficiais ou orientações dos órgãos organizadores.
      </p>

      <h2>3. Conta e credenciais</h2>
      <ul>
        <li>forneça informações corretas e mantenha seus dados atualizados;</li>
        <li>proteja sua senha e não compartilhe credenciais ou sessões de acesso;</li>
        <li>comunique suspeitas de acesso indevido pelo canal de suporte;</li>
        <li>não crie contas para fraudar limites, métricas ou mecanismos de segurança.</li>
      </ul>

      <h2>4. Uso aceitável</h2>
      <p>Não é permitido:</p>
      <ul>
        <li>tentar acessar áreas, contas ou dados sem autorização;</li>
        <li>automatizar coleta massiva, copiar bases ou sobrecarregar deliberadamente o serviço;</li>
        <li>publicar conteúdo ilegal, ofensivo, enganoso ou que viole direitos de terceiros;</li>
        <li>interferir na segurança, integridade ou funcionamento do portal, app ou API.</li>
      </ul>

      <h2>5. Questões e conteúdo editorial</h2>
      <p>
        Enunciados, explicações e publicações são apresentados para fins educacionais. Embora sejam
        adotados critérios de revisão e fontes oficiais quando aplicáveis, materiais podem exigir
        correção ou atualização. Divergências podem ser comunicadas conforme a{" "}
        <Link href="/politica-editorial">Política Editorial</Link>.
      </p>

      <h2>6. Conteúdo enviado por usuários</h2>
      <p>
        O usuário é responsável pelo que publica em comentários e outros espaços interativos. O
        conteúdo pode ser moderado ou removido quando contrariar estes termos, a legislação ou a
        segurança da comunidade.
      </p>

      <h2>7. Propriedade intelectual</h2>
      <p>
        A identidade visual, o software, a organização do serviço e os materiais próprios são
        protegidos pelas normas aplicáveis. Conteúdos de terceiros permanecem sujeitos aos direitos
        de seus respectivos titulares e às permissões correspondentes.
      </p>

      <h2>8. Disponibilidade e alterações</h2>
      <p>
        Recursos podem ser corrigidos, atualizados, interrompidos ou descontinuados para manutenção,
        segurança ou evolução do produto. Buscamos preservar a continuidade, mas não prometemos
        disponibilidade ininterrupta.
      </p>

      <h2>9. Restrição de acesso</h2>
      <p>
        O acesso pode ser limitado ou suspenso em caso de abuso, fraude, risco à segurança ou
        violação destes termos, observadas as circunstâncias do caso.
      </p>

      <h2>10. Atualizações e contato</h2>
      <p>
        Os termos podem ser atualizados e a data da versão vigente será informada nesta página.
        Dúvidas podem ser enviadas pelo canal de <Link href="/contato">Contato e suporte</Link>.
      </p>
    </InstitutionalPage>
  );
}
