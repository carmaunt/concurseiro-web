"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Loading } from "@/components/Loading";
import { MarkdownText } from "@/components/MarkdownText";
import { possuiTextoApoio, TextoApoio } from "@/components/TextoApoio";
import { alternativasCertoErrado, parseAlternativas } from "@/services/alternativas";
import { getApiErrorMessage } from "@/services/api";
import { listarAmostraQuestoes, responderQuestaoAmostra } from "@/services/questoesService";
import type { RespostaQuestaoAmostra } from "@/types/questoes";
import styles from "./experimentar.module.css";

const SAMPLE_SIZE = 5;

export function AmostraQuestoes() {
  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState("");
  const [resultados, setResultados] = useState<RespostaQuestaoAmostra[]>([]);
  const [concluida, setConcluida] = useState(false);

  const questoesQuery = useQuery({
    queryKey: ["questoes", "amostra", SAMPLE_SIZE],
    queryFn: () => listarAmostraQuestoes(SAMPLE_SIZE),
    staleTime: 5 * 60_000,
  });

  const questoes = questoesQuery.data ?? [];
  const questao = questoes[indice];
  const resultado = questao
    ? resultados.find((item) => item.idQuestion === questao.idQuestion)
    : undefined;

  const alternativas = useMemo(() => {
    if (!questao) return [];
    if (questao.modalidade === "CERTO_ERRADO") return alternativasCertoErrado();
    return parseAlternativas(questao.alternativas);
  }, [questao]);

  const responderMutation = useMutation({
    mutationFn: () => responderQuestaoAmostra(questao.idQuestion, selecionada),
    onSuccess: (resposta) => {
      setResultados((atuais) => [
        ...atuais.filter((item) => item.idQuestion !== resposta.idQuestion),
        resposta,
      ]);
    },
  });

  const acertos = resultados.filter((item) => item.acertou).length;

  function avancar() {
    if (indice + 1 >= questoes.length) {
      setConcluida(true);
      return;
    }

    setIndice((atual) => atual + 1);
    setSelecionada("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reiniciar() {
    setIndice(0);
    setSelecionada("");
    setResultados([]);
    setConcluida(false);
  }

  if (questoesQuery.isLoading) {
    return (
      <section className="container section">
        <Loading label="Preparando sua experiência gratuita..." />
      </section>
    );
  }

  if (questoesQuery.error) {
    return (
      <section className="container section">
        <EmptyState
          title="Não foi possível preparar as questões"
          description={getApiErrorMessage(
            questoesQuery.error,
            "Tente novamente em alguns instantes.",
          )}
          actionLabel="Tentar novamente"
          onAction={() => questoesQuery.refetch()}
        />
      </section>
    );
  }

  if (questoes.length === 0) {
    return (
      <section className="container section">
        <EmptyState
          title="A amostra ainda não está disponível"
          description="Não encontramos questões publicadas para esta experiência."
          actionHref="/"
          actionLabel="Voltar ao início"
        />
      </section>
    );
  }

  if (concluida) {
    const aproveitamento = Math.round((acertos / questoes.length) * 100);

    return (
      <section className={`container ${styles.section}`}>
        <Card className={styles.summary}>
          <Badge>Amostra concluída</Badge>
          <h1>Você experimentou o O Concurseiro sem criar conta</h1>
          <div className={styles.score}>
            <strong>{acertos}/{questoes.length}</strong>
            <span>{aproveitamento}% de aproveitamento nesta amostra</span>
          </div>
          <p>
            Crie uma conta gratuita para resolver questões sem limite diário, usar filtros e
            guardar seu histórico de desempenho.
          </p>
          <div className={styles.summaryActions}>
            <Button href="/cadastro">Criar conta e salvar progresso</Button>
            <Button type="button" variant="secondary" onClick={reiniciar}>
              Refazer amostra
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className={`container ${styles.section}`}>
      <header className={styles.intro}>
        <Badge>Sem cadastro</Badge>
        <h1>
          Experimente {questoes.length} {questoes.length === 1 ? "questão grátis" : "questões grátis"}
        </h1>
        <p>
          Responda primeiro. O gabarito e a explicação aparecem somente depois do envio.
          Esta amostra não é registrada no seu histórico.
        </p>
        <div className={styles.progressRow}>
          <strong>Questão {indice + 1} de {questoes.length}</strong>
          <progress value={indice + (resultado ? 1 : 0)} max={questoes.length}>
            {indice + (resultado ? 1 : 0)} de {questoes.length}
          </progress>
        </div>
      </header>

      <div className={styles.layout}>
        <main className={styles.questionColumn}>
          <Card>
            <div className={styles.meta}>
              <Badge>{questao.disciplina || "Disciplina não informada"}</Badge>
              <span>{questao.banca || "Banca não informada"} · {questao.ano || "Ano não informado"}</span>
            </div>
            <p className={styles.catalog}>
              {questao.assunto || "Assunto não informado"}
              {questao.instituicao ? ` · ${questao.instituicao}` : ""}
            </p>
          </Card>

          {possuiTextoApoio(questao) ? (
            <Card>
              <TextoApoio {...questao} />
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
            <h2>Escolha uma alternativa</h2>
            <div className={styles.options}>
              {alternativas.map((alternativa) => {
                const selecionadaAgora = selecionada === alternativa.letra;
                const correta = resultado?.gabarito === alternativa.letra;
                const erradaSelecionada =
                  resultado?.respostaSelecionada === alternativa.letra && !resultado.acertou;

                return (
                  <button
                    key={alternativa.letra}
                    type="button"
                    className={[
                      styles.option,
                      selecionadaAgora ? styles.selected : "",
                      correta ? styles.correct : "",
                      erradaSelecionada ? styles.wrong : "",
                    ].join(" ")}
                    onClick={() => !resultado && setSelecionada(alternativa.letra)}
                    disabled={Boolean(resultado)}
                  >
                    <strong>{alternativa.letra}</strong>
                    <span>{alternativa.texto}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </main>

        <aside className={styles.answerColumn}>
          <Card>
            {resultado ? (
              <div className={styles.result} aria-live="polite">
                <Badge>{resultado.acertou ? "Acertou" : "Errou"}</Badge>
                <h2>{resultado.acertou ? "Boa resposta" : "Continue praticando"}</h2>
                <p>
                  Você marcou <strong>{resultado.respostaSelecionada}</strong>. Gabarito:{" "}
                  <strong>{resultado.gabarito}</strong>.
                </p>
                {resultado.explicacao ? (
                  <div className={styles.explanation}>
                    <strong>Explicação</strong>
                    <MarkdownText text={resultado.explicacao} />
                  </div>
                ) : null}
                <Button type="button" onClick={avancar}>
                  {indice + 1 >= questoes.length ? "Ver meu resultado" : "Próxima questão"}
                </Button>
              </div>
            ) : (
              <div className={styles.answerBox}>
                <h2>Confira sua resposta</h2>
                <p>Não é necessário entrar. Escolha uma alternativa e envie.</p>
                {responderMutation.error ? (
                  <p className="errorText">
                    {getApiErrorMessage(
                      responderMutation.error,
                      "Não foi possível corrigir sua resposta.",
                    )}
                  </p>
                ) : null}
                <Button
                  type="button"
                  disabled={!selecionada || responderMutation.isPending}
                  onClick={() => responderMutation.mutate()}
                >
                  {responderMutation.isPending ? "Corrigindo..." : "Responder sem cadastro"}
                </Button>
              </div>
            )}
          </Card>
          <p className={styles.loginHint}>
            Já possui conta? <a href="/login?next=%2Fquestoes">Entrar para acessar seu histórico</a>
          </p>
        </aside>
      </div>
    </section>
  );
}
