import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { EditorialCard } from "@/components/EditorialCards";
import { PublicLayout } from "@/components/PublicLayout";
import { listarConteudosPublicos } from "@/services/conteudosService";
import styles from "./questoes-de-concursos.module.css";

const pageTitle = "Questões de concursos grátis para praticar";
const pageDescription =
  "Resolva questões de concursos, confira a correção e acompanhe acertos, erros e evolução por disciplina. Experimente 5 questões grátis, sem cadastro.";

const boardGuides = [
  { href: "/concursos/bancas/cebraspe", name: "Cebraspe", detail: "Confira formato, pontuação e como organizar o treino." },
  { href: "/concursos/bancas/fgv", name: "FGV", detail: "Pratique leitura de enunciados e análise de alternativas." },
  { href: "/concursos/bancas/fcc", name: "FCC", detail: "Selecione provas comparáveis ao cargo e à área." },
  { href: "/concursos/bancas/vunesp", name: "Vunesp", detail: "Ajuste questões, tempo e revisão ao edital vigente." },
];

const faqs = [
  {
    question: "O O Concurseiro é gratuito?",
    answer: "Sim. Atualmente a conta e a experiência de estudo são gratuitas, sem assinatura paga escondida depois do cadastro.",
  },
  {
    question: "Preciso criar uma conta para testar as questões?",
    answer: "Não. A amostra pública permite responder cinco questões variadas, ver a correção e conhecer a experiência antes do cadastro.",
  },
  {
    question: "Quais filtros estão disponíveis?",
    answer: "Com uma conta gratuita, você pode filtrar por palavra-chave, disciplina, assunto, subassunto, banca, órgão, ano e outros dados disponíveis no acervo.",
  },
  {
    question: "Quando o gabarito aparece?",
    answer: "Na amostra, o gabarito e a explicação disponível aparecem depois que você envia sua alternativa, para preservar a tentativa real.",
  },
  {
    question: "Resolver questões garante aprovação?",
    answer: "Não. Questões ajudam a diagnosticar lacunas, praticar e acompanhar a evolução, mas nenhum aplicativo ou método pode garantir aprovação.",
  },
];

export const revalidate = 300;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/questoes-de-concursos" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/questoes-de-concursos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default async function QuestoesDeConcursosPage() {
  const articles = await listarConteudosPublicos("BLOG", 3);
  const baseUrl = (process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000").replace(/\/$/, "");
  const pageUrl = `${baseUrl}/questoes-de-concursos`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@type": "Thing", name: "Questões de concursos públicos" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Questões de concursos", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumbs} aria-label="Navegação estrutural">
              <Link href="/">Início</Link>
              <span aria-hidden="true">/</span>
              <span>Questões de concursos</span>
            </nav>
            <Badge>Prática gratuita</Badge>
            <h1>Questões de concursos para praticar e medir seu desempenho</h1>
            <p className={styles.lead}>
              Resolva questões, confira a correção e use seus acertos e erros para decidir o que estudar em seguida.
            </p>
            <p className={styles.supportingCopy}>
              Comece com cinco questões variadas sem cadastro. Depois, crie uma conta gratuita para usar filtros,
              guardar o histórico e acompanhar sua evolução por disciplina.
            </p>
            <div className={styles.heroActions}>
              <Button href="/experimentar?origem=pagina_pilar">Resolver 5 questões grátis</Button>
              <Button href="/cadastro?origem=pagina_pilar" variant="secondary">Criar conta gratuita</Button>
            </div>
            <ul className={styles.trustList} aria-label="Condições da experiência">
              <li>Sem cartão</li>
              <li>Sem assinatura</li>
              <li>Correção após a resposta</li>
            </ul>
          </div>

          <aside className={styles.preview} aria-label="Como funciona a prática de questões">
            <div className={styles.previewTop}>
              <span>Questão de exemplo</span>
              <strong>01/05</strong>
            </div>
            <div className={styles.previewMeta}>
              <span>Direito Administrativo</span>
              <span>Cebraspe</span>
            </div>
            <p className={styles.previewQuestion}>Você escolhe uma alternativa antes de ver o resultado.</p>
            <div className={styles.previewOptions} aria-hidden="true">
              <span><b>A</b> Analise o enunciado e marque sua resposta</span>
              <span><b>B</b> Envie para conferir o gabarito</span>
              <span><b>C</b> Use o erro para orientar a revisão</span>
            </div>
            <div className={styles.previewResult}>
              <span aria-hidden="true">✓</span>
              <p><strong>Correção com contexto</strong>O resultado vira uma próxima ação de estudo.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="como-funciona">
        <div className={styles.sectionHeading}>
          <Badge>Método simples</Badge>
          <h2 id="como-funciona">Transforme cada resposta em uma decisão de estudo</h2>
          <p>Fazer muitas questões sem analisar os erros produz volume. O objetivo aqui é produzir direção.</p>
        </div>
        <ol className={styles.steps}>
          <li>
            <span>01</span>
            <h3>Escolha o recorte</h3>
            <p>Filtre o acervo por disciplina, assunto, banca, órgão, ano ou palavra-chave.</p>
          </li>
          <li>
            <span>02</span>
            <h3>Responda antes de conferir</h3>
            <p>Registre sua alternativa e veja a correção somente depois da tentativa.</p>
          </li>
          <li>
            <span>03</span>
            <h3>Leia o seu desempenho</h3>
            <p>Compare acertos e erros por disciplina para identificar onde a revisão é mais necessária.</p>
          </li>
        </ol>
      </section>

      <section className={styles.filterBand}>
        <div className={`container ${styles.filterLayout}`}>
          <div>
            <Badge>Filtros de estudo</Badge>
            <h2>Encontre questões compatíveis com o seu objetivo</h2>
            <p>
              Um bom filtro reduz ruído sem esconder lacunas. Comece amplo, observe o resultado e refine o treino aos poucos.
            </p>
            <Button href="/experimentar?origem=pagina_pilar_filtros" variant="secondary">Conhecer a experiência</Button>
          </div>
          <div className={styles.filterChips} aria-label="Filtros disponíveis na conta gratuita">
            {[
              "Palavra-chave", "Disciplina", "Assunto", "Subassunto", "Banca", "Órgão", "Cargo", "Ano", "Nível", "Modalidade",
            ].map((filter) => <span key={filter}>{filter}</span>)}
          </div>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="bancas-title">
        <div className={styles.sectionHeading}>
          <Badge>Por banca</Badge>
          <h2 id="bancas-title">Entenda a organizadora antes de montar o treino</h2>
          <p>O edital vigente sempre prevalece. Os guias ajudam a escolher provas comparáveis e observar regras de correção.</p>
        </div>
        <div className={styles.boardGrid}>
          {boardGuides.map((board) => (
            <Link key={board.href} className={styles.boardCard} href={board.href}>
              <span>Guia de banca</span>
              <strong>{board.name}</strong>
              <p>{board.detail}</p>
              <em>Ver guia →</em>
            </Link>
          ))}
        </div>
        <Link className={styles.allGuidesLink} href="/concursos#bancas">Ver todos os guias de bancas</Link>
      </section>

      <section className={styles.methodBand}>
        <div className={`container ${styles.methodLayout}`}>
          <div className={styles.methodCopy}>
            <Badge>Estudo por questões</Badge>
            <h2>Não conte apenas quantas questões fez</h2>
            <p>
              Classifique por que errou: conteúdo, interpretação, distração ou estratégia. Depois, escolha uma ação pequena
              e verificável para a próxima sessão.
            </p>
          </div>
          <div className={styles.errorTable} role="table" aria-label="Erro e próxima ação de estudo">
            <div role="row"><strong role="columnheader">Tipo de erro</strong><strong role="columnheader">Próxima ação</strong></div>
            <div role="row"><span role="cell">Conteúdo</span><span role="cell">Rever a regra e testar outra questão</span></div>
            <div role="row"><span role="cell">Interpretação</span><span role="cell">Reescrever o comando antes de responder</span></div>
            <div role="row"><span role="cell">Distração</span><span role="cell">Identificar o sinal ignorado no enunciado</span></div>
            <div role="row"><span role="cell">Estratégia</span><span role="cell">Ajustar tempo, ordem ou critério de resposta</span></div>
          </div>
        </div>
      </section>

      {articles.length > 0 ? (
        <section className={`container ${styles.section}`} aria-labelledby="artigos-title">
          <div className={styles.sectionHeading}>
            <Badge>Aprenda e pratique</Badge>
            <h2 id="artigos-title">Artigos para melhorar sua rotina de questões</h2>
            <p>Orientações publicadas e revisadas para transformar teoria, edital e erros em uma rotina possível.</p>
          </div>
          <div className={styles.articleGrid}>
            {articles.map((article) => <EditorialCard key={article.id} conteudo={article} />)}
          </div>
          <Link className={styles.allGuidesLink} href="/blog">Ver todos os artigos</Link>
        </section>
      ) : null}

      <section className={`container ${styles.section}`} aria-labelledby="faq-title">
        <div className={styles.sectionHeading}>
          <Badge>Dúvidas frequentes</Badge>
          <h2 id="faq-title">Antes de começar</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div key={faq.question} className={styles.faqItem}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={`container ${styles.finalCtaInner}`}>
          <div>
            <Badge>Comece agora</Badge>
            <h2>Resolva primeiro. Decida o próximo estudo depois.</h2>
            <p>Cinco questões variadas, sem cadastro e com correção após cada resposta.</p>
          </div>
          <Button href="/experimentar?origem=pagina_pilar_final" variant="secondary">Resolver questões grátis</Button>
        </div>
      </section>
    </PublicLayout>
  );
}
