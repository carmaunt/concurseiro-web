import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage } from "@/components/InstitutionalPage";

const supportEmail = "carmaunt@gmail.com";
const deletionSubject = "Exclusão de conta — O Concurseiro";

export const metadata: Metadata = {
  title: "Exclusão de conta e dados",
  description:
    "Saiba como excluir sua conta do aplicativo O Concurseiro e quais dados são removidos.",
  alternates: { canonical: "/exclusao-de-conta" },
};

export default function ExclusaoDeContaPage() {
  const emailLink = `mailto:${supportEmail}?subject=${encodeURIComponent(deletionSubject)}`;

  return (
    <InstitutionalPage
      eyebrow="Controle da conta"
      title="Exclusão de conta e dados"
      description="Esta página explica como excluir uma conta criada no aplicativo O Concurseiro, desenvolvido e operado pelo O Concurseiro."
      updatedAt="31 de julho de 2026"
    >
      <div className="callout">
        <p>
          A exclusão é permanente. Depois de concluída, a conta e o histórico associado não podem
          ser recuperados.
        </p>
      </div>

      <h2>Opção 1: excluir diretamente no aplicativo</h2>
      <ol>
        <li>Entre na conta que deseja excluir.</li>
        <li>Na tela inicial, abra <strong>Privacidade e dados</strong>.</li>
        <li>Toque em <strong>Excluir minha conta</strong>.</li>
        <li>Leia o aviso e confirme em <strong>Excluir definitivamente</strong>.</li>
      </ol>
      <p>
        O aplicativo confirma a identidade da conta antes da operação. Quando o servidor conclui o
        apagamento, a sessão é encerrada e o progresso daquela conta armazenado no aparelho também é
        removido.
      </p>

      <h2>Opção 2: solicitar sem acesso ao aplicativo</h2>
      <p>
        Envie uma mensagem para <a href={emailLink}>{supportEmail}</a>, preferencialmente a partir do
        e-mail usado no login, com o assunto <strong>“{deletionSubject}”</strong>. Informe apenas o
        e-mail da conta e confirme expressamente que deseja excluí-la. Nunca envie senha, token,
        código de acesso ou documento pessoal.
      </p>
      <p>
        Podemos solicitar uma confirmação adicional de titularidade. Solicitações confirmadas por
        e-mail são processadas em até 30 dias.
      </p>

      <h2>Dados excluídos</h2>
      <p>Ao concluir a exclusão, são removidos dos sistemas ativos:</p>
      <ul>
        <li>perfil da conta, incluindo nome, e-mail e identificadores de autenticação;</li>
        <li>credenciais de acesso e sessões de atualização armazenadas pelo serviço;</li>
        <li>histórico de respostas, acertos, erros e progresso vinculado à conta;</li>
        <li>comentários que estejam tecnicamente vinculados à conta;</li>
        <li>eventos de uso e diagnóstico vinculados à conta no backend do O Concurseiro.</li>
      </ul>

      <h2>Dados que podem permanecer</h2>
      <p>
        Métricas agregadas ou registros que já não permitam identificar a conta podem permanecer.
        Registros mínimos também podem ser preservados somente quando necessários para cumprir uma
        obrigação legal, prevenir fraude ou exercer direitos, pelo prazo exigido para essa finalidade.
        Eles não serão usados para publicidade ou para recriar o perfil excluído.
      </p>
      <p>
        Dados tratados diretamente por serviços Google também seguem os controles e prazos do
        respectivo fornecedor. Consulte a nossa <Link href="/privacidade">Política de Privacidade</Link>
        e a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Política de Privacidade do Google
        </a>.
      </p>

      <h2>Precisa de ajuda?</h2>
      <p>
        Use o canal de <Link href="/contato">Contato e suporte</Link>. Para sua segurança, pedidos
        feitos por terceiros ou sem confirmação de titularidade não serão executados.
      </p>
    </InstitutionalPage>
  );
}
