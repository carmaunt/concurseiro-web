import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage } from "@/components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Entenda como o O Concurseiro trata dados pessoais no portal e no aplicativo Android.",
};

export default function PrivacidadePage() {
  return (
    <InstitutionalPage
      eyebrow="Transparência"
      title="Política de Privacidade"
      description="Esta política explica quais informações podem ser tratadas no portal e no aplicativo Android O Concurseiro, para quais finalidades e quais escolhas estão disponíveis ao usuário."
      updatedAt="16 de julho de 2026"
    >
      <h2>1. Informações tratadas</h2>
      <p>Conforme os recursos utilizados, podemos tratar:</p>
      <ul>
        <li>nome, e-mail, identificador da conta e informações de autenticação;</li>
        <li>dados básicos autorizados pelo usuário ao entrar com uma conta Google;</li>
        <li>respostas, comentários, progresso de estudo e preferências de uso;</li>
        <li>interações com telas e recursos, de forma vinculada ou anônima conforme o contexto;</li>
        <li>origem da visita, clique para a loja e identificador aleatório de atribuição da instalação, sem nome ou e-mail;</li>
        <li>informações técnicas sobre dispositivo, navegador, desempenho, falhas e travamentos;</li>
        <li>cookies e identificadores necessários para autenticação, segurança e funcionamento.</li>
      </ul>

      <h2>2. Finalidades</h2>
      <p>Essas informações podem ser utilizadas para:</p>
      <ul>
        <li>criar e proteger a conta, autenticar o usuário e manter sua sessão;</li>
        <li>salvar respostas e apresentar histórico, progresso e desempenho;</li>
        <li>oferecer questões, comentários e demais funcionalidades solicitadas;</li>
        <li>detectar abuso, proteger o serviço e solucionar problemas técnicos;</li>
        <li>entender o uso agregado do produto e aprimorar a experiência.</li>
      </ul>

      <h2>3. Serviços de terceiros</h2>
      <p>
        O aplicativo utiliza serviços Google/Firebase, incluindo Firebase Authentication,
        Firebase Analytics e Firebase Crashlytics. O portal e a API também dependem de provedores
        de hospedagem e infraestrutura necessários à entrega e à segurança do serviço. Esses
        provedores podem tratar dados conforme suas próprias políticas e as instruções aplicáveis
        à prestação do serviço.
      </p>
      <p>
        Consulte a{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Política de Privacidade do Google
        </a>.
      </p>

      <h2>4. Compartilhamento e venda</h2>
      <p>
        O O Concurseiro não vende dados pessoais. Informações podem ser processadas por fornecedores
        indispensáveis ao funcionamento, à autenticação, à análise de estabilidade e à hospedagem,
        ou compartilhadas quando houver obrigação legal ou necessidade de proteger direitos e a
        segurança do serviço.
      </p>

      <h2>5. Armazenamento e segurança</h2>
      <p>
        São adotadas medidas técnicas compatíveis com o serviço, como comunicação por HTTPS,
        controles de autenticação e restrição de acesso. Nenhum sistema é totalmente imune a riscos;
        o usuário também deve proteger suas credenciais, conta Google e dispositivo.
      </p>

      <h2>6. Retenção</h2>
      <p>
        Os dados são mantidos pelo período necessário para oferecer os recursos solicitados, manter
        a segurança, solucionar problemas e cumprir obrigações aplicáveis. Alguns registros podem
        ser preservados temporariamente após uma solicitação de exclusão quando isso for necessário
        para prevenção de abuso, exercício de direitos ou cumprimento legal.
      </p>

      <h2>7. Direitos e escolhas</h2>
      <p>
        O usuário pode solicitar informações, correção ou exclusão de dados pelo canal indicado em{" "}
        <Link href="/contato">Contato e suporte</Link>. Para uma solicitação sobre conta, pode ser
        necessário confirmar a titularidade do e-mail usado no login.
      </p>

      <h2>8. Crianças e adolescentes</h2>
      <p>
        O serviço não é direcionado a crianças menores de 13 anos. Caso seja identificado tratamento
        indevido de dados de criança, o responsável pode solicitar análise e remoção pelo canal de contato.
      </p>

      <h2>9. Links externos</h2>
      <p>
        Publicações podem apontar para sites oficiais ou de terceiros. O tratamento de dados nesses
        endereços é regido pelas políticas dos respectivos responsáveis.
      </p>

      <h2>10. Atualizações desta política</h2>
      <p>
        Esta página pode ser atualizada para refletir mudanças no produto ou nas práticas de
        tratamento. A data da versão vigente aparece no início do documento.
      </p>

      <h2>11. Contato</h2>
      <p>
        Dúvidas e solicitações relacionadas à privacidade podem ser enviadas para{" "}
        <a href="mailto:carmaunt@gmail.com">carmaunt@gmail.com</a>.
      </p>
    </InstitutionalPage>
  );
}
