"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthLayout } from "@/components/AuthLayout";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ComentariosQuestao } from "@/components/ComentariosQuestao";
import { EmptyState } from "@/components/EmptyState";
import { Loading } from "@/components/Loading";
import { MarkdownText } from "@/components/MarkdownText";
import { possuiTextoApoio, TextoApoio } from "@/components/TextoApoio";
import { alternativasCertoErrado, parseAlternativas } from "@/services/alternativas";
import { getApiErrorMessage } from "@/services/api";
import { buscarQuestao, responderQuestao } from "@/services/questoesService";
import type { RespostaQuestao } from "@/types/questoes";
import styles from "./resolver.module.css";

export default function ResolverQuestaoPage() {
  const params = useParams<{ idQuestion: string }>();
  const idQuestion = params.idQuestion;
  const [selecionada, setSelecionada] = useState<string>("");
  const [resultado, setResultado] = useState<RespostaQuestao | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);

  const questaoQuery = useQuery({
    queryKey: ["questao", idQuestion],
    queryFn: () => buscarQuestao(idQuestion),
    enabled: Boolean(idQuestion),
  });

  const responderMutation = useMutation({
    mutationFn: () => responderQuestao(idQuestion, selecionada),
    onSuccess: (data) => setResultado(data),
  });

  const questao = questaoQuery.data;
  // O resultado é mantido somente nesta sessão da página. Recarregar inicia
  // uma nova tentativa e nunca expõe o gabarito a partir do histórico.
  const respostaVisivel = resultado;
  const alternativas = useMemo(() => {
    if (!questao) return [];
    if (questao.modalidade === "CERTO_ERRADO") return alternativasCertoErrado();
    return parseAlternativas(questao.alternativas);
  }, [questao]);

  return (
    <AuthLayout>
      <section className="container section">
        <Link className={styles.backLink} href="/questoes">
          Voltar para questões
        </Link>

        {questaoQuery.isLoading ? <Loading label="Carregando questão..." /> : null}

        {questaoQuery.error ? (
          <EmptyState
            title="Não foi possível carregar a questão"
            description={getApiErrorMessage(questaoQuery.error, "Tente novamente em instantes.")}
            actionHref="/questoes"
            actionLabel="Voltar para listagem"
          />
        ) : null}

        {questao ? (
          <div className={styles.layout}>
            <article className={styles.mainColumn}>
              <Card>
                <div className={styles.meta}>
                  <Badge>{questao.disciplina || "Disciplina não informada"}</Badge>
                  <span>{questao.banca || "Banca não informada"} · {questao.ano || "Ano não informado"}</span>
                </div>
                <h1>{questao.idQuestion}</h1>
                <p className={styles.catalog}>
                  {questao.assunto || "Assunto não informado"}
                  {questao.subassunto ? ` · ${questao.subassunto}` : ""}
                  {questao.instituicao ? ` · ${questao.instituicao}` : ""}
                </p>
              </Card>

              {possuiTextoApoio(questao) ? (
                <Card>
                  <div className={styles.readingText}>
                    <TextoApoio {...questao} />
                  </div>
                </Card>
              ) : null}

              <Card>
                {questao.enunciado ? (
                  <div className={styles.enunciado}>
                    <MarkdownText text={questao.enunciado} />
                  </div>
                ) : null}
                <div className={styles.questionText}>
                  <MarkdownText text={questao.questao || "Questão sem texto disponível."} />
                </div>
              </Card>

              <Card>
                <h2>Alternativas</h2>
                {alternativas.length === 0 ? (
                  <EmptyState
                    title="Alternativas indisponíveis"
                    description="A questão veio da API sem alternativas parseáveis. Confira o cadastro no painel admin."
                  />
                ) : (
                  <div className={styles.options}>
                    {alternativas.map((alternativa) => {
                      const isSelected = selecionada === alternativa.letra;
                      const isCorrect = respostaVisivel?.gabarito === alternativa.letra;
                      const isWrongSelected = respostaVisivel && respostaVisivel.respostaSelecionada === alternativa.letra && !respostaVisivel.acertou;

                      return (
                        <button
                          key={alternativa.letra}
                          type="button"
                          className={[
                            styles.option,
                            isSelected ? styles.selected : "",
                            isCorrect ? styles.correct : "",
                            isWrongSelected ? styles.wrong : "",
                          ].join(" ")}
                          onClick={() => {
                            if (!respostaVisivel) setSelecionada(alternativa.letra);
                          }}
                          disabled={Boolean(respostaVisivel)}
                        >
                          <strong>{alternativa.letra}</strong>
                          <span>{alternativa.texto}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </Card>

              {idQuestion ? <ComentariosQuestao questaoId={idQuestion} /> : null}
            </article>

            <aside className={styles.sideColumn}>
              <Card>
                <h2>Responder</h2>
                {respostaVisivel ? (
                  <div className={styles.result}>
                    <Badge>{respostaVisivel.acertou ? "Acertou" : "Errou"}</Badge>
                    <p>
                      Sua resposta: <strong>{respostaVisivel.respostaSelecionada}</strong>
                    </p>
                    <p>
                      Gabarito: <strong>{respostaVisivel.gabarito}</strong>
                    </p>
                    {respostaVisivel.explicacao ? (
                      <>
                        <Button type="button" variant="secondary" onClick={() => setMostrarExplicacao((current) => !current)}>
                          {mostrarExplicacao ? "Ocultar explicação" : "Ver explicação"}
                        </Button>
                        {mostrarExplicacao ? (
                          <div className={styles.explanation}>
                            <strong>Explicação</strong>
                            <MarkdownText text={respostaVisivel.explicacao} />
                          </div>
                        ) : null}
                      </>
                    ) : null}
                    <Button href="/questoes" variant="secondary">
                      Resolver outra
                    </Button>
                  </div>
                ) : (
                  <div className={styles.answerBox}>
                    <p className="muted">
                      Escolha uma alternativa. O gabarito só será exibido após o envio.
                    </p>
                    {responderMutation.error ? (
                      <p className="errorText">{getApiErrorMessage(responderMutation.error, "Não foi possível enviar sua resposta.")}</p>
                    ) : null}
                    <Button
                      type="button"
                      disabled={!selecionada || responderMutation.isPending}
                      onClick={() => responderMutation.mutate()}
                    >
                      {responderMutation.isPending ? "Enviando..." : "Enviar resposta"}
                    </Button>
                  </div>
                )}
              </Card>
            </aside>
          </div>
        ) : null}
      </section>
    </AuthLayout>
  );
}
