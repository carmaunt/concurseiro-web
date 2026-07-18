import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage } from "@/components/InstitutionalPage";

const supportEmail = "carmaunt@gmail.com";

export const metadata: Metadata = {
  title: "Contato e suporte",
  description: "Fale com o suporte do O Concurseiro sobre sua conta, privacidade, conteúdo ou problemas técnicos.",
};

export default function ContatoPage() {
  return (
    <InstitutionalPage
      eyebrow="Ajuda"
      title="Contato e suporte"
      description="Use o canal abaixo para dúvidas sobre conta, privacidade, conteúdo editorial ou funcionamento do produto."
      updatedAt="16 de julho de 2026"
    >
      <h2>Canal de atendimento</h2>
      <p>
        Envie um e-mail para <a href={`mailto:${supportEmail}`}>{supportEmail}</a>. Para facilitar a
        identificação, informe no assunto se o contato é sobre suporte, privacidade, correção
        editorial ou exclusão de conta.
      </p>

      <h2>Problemas técnicos</h2>
      <p>Ao relatar um erro, inclua apenas as informações necessárias:</p>
      <ul>
        <li>se ocorreu no portal ou no aplicativo Android;</li>
        <li>a tela e a ação que provocaram o problema;</li>
        <li>uma descrição do resultado esperado e do resultado observado;</li>
        <li>modelo do aparelho e versão do Android, quando o erro estiver no app.</li>
      </ul>
      <p>Não envie senha, código de acesso, token ou documento pessoal.</p>

      <h2>Privacidade e exclusão de conta</h2>
      <p>
        Para solicitar acesso, correção ou exclusão de dados, escreva pelo mesmo canal usando o
        assunto <strong>“Privacidade — O Concurseiro”</strong>. Para excluir a conta, informe o
        e-mail usado no login e confirme expressamente a solicitação. Consulte também nossa{" "}
        <Link href="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>Correções editoriais</h2>
      <p>
        Indique o endereço da publicação, o trecho que precisa de revisão e, se possível, a fonte
        oficial que sustenta a correção. O processo editorial está descrito na{" "}
        <Link href="/politica-editorial">Política Editorial</Link>.
      </p>
    </InstitutionalPage>
  );
}
