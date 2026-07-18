import Image from "next/image";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { AttributedStoreLink } from "./AttributedStoreLink";
import { GOOGLE_PLAY_URL } from "@/services/store";
import styles from "./ProductProof.module.css";

const screenshots = [
  {
    src: "/app-screenshots/painel-desempenho.png",
    alt: "Tela real do app O Concurseiro com desempenho dos últimos sete dias e radar de disciplinas",
    title: "Desempenho por disciplina",
    description: "Acertos, erros e aproveitamento ficam visíveis no painel.",
  },
  {
    src: "/app-screenshots/resolucao-questao.png",
    alt: "Tela real do app O Concurseiro exibindo uma questão de Direito Administrativo",
    title: "Resolução objetiva",
    description: "Enunciado, alternativas, comentários e navegação na mesma sessão.",
  },
  {
    src: "/app-screenshots/filtros-questoes.png",
    alt: "Tela real do app O Concurseiro com filtros por disciplina, assunto, banca e ano",
    title: "Filtros simples e avançados",
    description: "Refine a prática por palavra-chave, disciplina, assunto, banca e ano.",
  },
];

const reviews = [
  { author: "jclm mauricio", quote: "Excelente aplicativo!" },
  { author: "Debora santos andrade", quote: "Interface organizada, intuitiva e fácil de usar." },
  { author: "Eve Rodrigues", quote: "Tem me ajudado bastante nos estudos." },
];

const comparisonRows = [
  {
    feature: "Notícias, concursos e editais",
    publicPortal: "Disponível",
    freeAccount: "Disponível",
    androidApp: "Acesso pelo portal",
  },
  {
    feature: "Resolver questões",
    publicPortal: "Após entrar",
    freeAccount: "Sem limite diário",
    androidApp: "5 por dia sem login; sem limite após entrar",
  },
  {
    feature: "Filtros de questões",
    publicPortal: "Após entrar",
    freeAccount: "Disponível",
    androidApp: "Disponível",
  },
  {
    feature: "Histórico e desempenho",
    publicPortal: "Após entrar",
    freeAccount: "Disponível",
    androidApp: "Disponível",
  },
  {
    feature: "Comentários nas questões",
    publicPortal: "Após entrar",
    freeAccount: "Disponível",
    androidApp: "Disponível",
  },
];

const faqs = [
  {
    question: "O Concurseiro é gratuito?",
    answer:
      "Sim. Atualmente há um único acesso gratuito e não existe assinatura paga. A conta libera questões, filtros, histórico, comentários e acompanhamento de desempenho.",
  },
  {
    question: "Preciso criar uma conta para testar?",
    answer:
      "No app Android você pode resolver até 5 questões por dia sem login. Depois disso, entre ou crie uma conta gratuita para continuar sem limite diário. Na web, a área de questões requer login.",
  },
  {
    question: "Existe versão para iPhone?",
    answer:
      "Não. Neste momento o aplicativo está disponível somente para Android. Usuários de outros sistemas podem acessar o portal pelo navegador.",
  },
  {
    question: "Quais filtros estão disponíveis?",
    answer:
      "O app permite filtrar por disciplina, assunto, banca, instituição, cargo, ano, nível, modalidade e palavra-chave.",
  },
  {
    question: "O aplicativo garante aprovação?",
    answer:
      "Não. O Concurseiro é uma ferramenta independente de estudo. Ele ajuda a praticar e acompanhar desempenho, mas não representa órgãos públicos, bancas e nem garante aprovação.",
  },
  {
    question: "Onde encontro informações oficiais do concurso?",
    answer:
      "Confirme sempre editais, inscrições, datas e requisitos nos sites oficiais dos órgãos, das bancas organizadoras e nos diários oficiais correspondentes.",
  },
];

export function ProductProof() {
  return (
    <section className={styles.section} aria-labelledby="produto-em-uso-title">
      <div className="container">
        <div className={styles.heading}>
          <Badge>Produto em uso</Badge>
          <h2 id="produto-em-uso-title">Veja exatamente como o O Concurseiro funciona</h2>
          <p>
            Capturas reais da versão Android. Sem telas conceituais, números de aprovação ou
            funcionalidades que ainda não existem.
          </p>
        </div>

        <div className={styles.screenshotGrid} aria-label="Telas reais do aplicativo Android">
          {screenshots.map((screenshot) => (
            <figure className={styles.screenshotCard} key={screenshot.src} data-testid="product-screenshot">
              <a
                className={styles.phoneFrame}
                href={screenshot.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ampliar: ${screenshot.title}`}
              >
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1080}
                  height={1920}
                  sizes="(max-width: 780px) 78vw, 280px"
                />
              </a>
              <figcaption>
                <strong>{screenshot.title}</strong>
                <span>{screenshot.description}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.evidenceGrid}>
          <article className={styles.reviewPanel} aria-labelledby="avaliacoes-title">
            <div className={styles.panelHeading}>
              <div>
                <span className={styles.eyebrow}>Avaliações verificáveis</span>
                <h3 id="avaliacoes-title">O que usuários dizem no Google Play</h3>
              </div>
              <div className={styles.reviewSummary}>
                <strong aria-label="Todas as três avaliações exibidas têm cinco de cinco estrelas">5★</strong>
                <span>3 avaliações públicas</span>
              </div>
            </div>
            <div className={styles.reviews}>
              {reviews.map((review) => (
                <blockquote key={review.author}>
                  <span aria-label="5 de 5 estrelas">★★★★★</span>
                  <p>“{review.quote}”</p>
                  <cite>{review.author} · Google Play</cite>
                </blockquote>
              ))}
            </div>
            <p className={styles.sourceNote}>
              Avaliações públicas consultadas em 16/07/2026. A amostra ainda é pequena e é
              apresentada sem extrapolar seus resultados.
            </p>
            <AttributedStoreLink
              appearance="text"
              className={styles.textLink}
              href={GOOGLE_PLAY_URL}
              ctaId="home_google_play_reviews"
            >
              Conferir avaliações no Google Play
            </AttributedStoreLink>
          </article>

          <article className={styles.planPanel} aria-labelledby="plano-title">
            <Badge>Plano atual</Badge>
            <h3 id="plano-title">Acesso gratuito</h3>
            <div className={styles.price}>
              <strong>R$ 0</strong>
              <span>sem assinatura</span>
            </div>
            <p>Hoje existe um único acesso. Não há plano pago escondido depois do cadastro.</p>
            <ul>
              <li>Questões com filtros simples e avançados</li>
              <li>Histórico de respostas e desempenho</li>
              <li>Comentários e interação nas questões</li>
              <li>Acesso pela web e pelo app Android</li>
              <li>Até 5 questões por dia no app antes do login</li>
            </ul>
            <div className={styles.planActions}>
              <Button href="/cadastro">Criar conta grátis</Button>
              <AttributedStoreLink href={GOOGLE_PLAY_URL} ctaId="home_free_plan" variant="secondary">
                Baixar para Android
              </AttributedStoreLink>
            </div>
          </article>
        </div>

        <div className={styles.comparisonSection}>
          <div className={styles.subheading}>
            <span className={styles.eyebrow}>Comparação transparente</span>
            <h3>Escolha onde começar</h3>
            <p>O acesso continua gratuito; o que muda é a experiência disponível em cada canal.</p>
          </div>
          <div className={styles.tableScroll}>
            <table aria-label="Comparação entre portal público, conta gratuita e aplicativo Android">
              <thead>
                <tr>
                  <th scope="col">Recurso</th>
                  <th scope="col">Portal público</th>
                  <th scope="col">Conta gratuita</th>
                  <th scope="col">App Android</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td>{row.publicPortal}</td>
                    <td>{row.freeAccount}</td>
                    <td>{row.androidApp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.subheading}>
            <span className={styles.eyebrow}>Perguntas frequentes</span>
            <h3>Antes de começar</h3>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
