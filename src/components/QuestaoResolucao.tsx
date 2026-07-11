"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ComentariosQuestao } from "@/components/ComentariosQuestao";
import { EmptyState } from "@/components/EmptyState";
import { alternativasCertoErrado, parseAlternativas } from "@/services/alternativas";
import { getApiErrorMessage } from "@/services/api";
import { responderQuestao } from "@/services/questoesService";
import type { Questao, RespostaQuestao } from "@/types/questoes";
import styles from "./QuestaoResolucao.module.css";

type Props = {
  questao: Questao;
  numero: number;
};

export function QuestaoResolucao({ questao, numero }: Props) {
  const [selecionada, setSelecionada] = useState("");
  const [resultado, setResultado] = useState<RespostaQuestao | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);

  const responderMutation = useMutation({
    mutationFn: () => responderQuestao(questao.idQuestion, selecionada),
    onSuccess: setResultado,
  });

  const alternativas = useMemo(() => {
    if (questao.modalidade === "CERTO_ERRADO") return alternativasCertoErrado();
    return parseAlternativas(questao.alternativas);
  }, [questao.alternativas, questao.modalidade]);

  return (
    <article className={styles.question} aria-labelledby={`questao-${questao.idQuestion}`}>
      <Card>
        <header className={styles.header}>
          <div className={styles.identity}>
            <span className={styles.number}>{numero}</span>
            <strong id={`questao-${questao.idQuestion}`}>{questao.idQuestion}</strong>
          </div>
          <div className={styles.taxonomy}>
            <Badge>{questao.disciplina || "Disciplina não informada"}</Badge>
            <span>{questao.assunto || "Assunto não informado"}</span>
            {questao.subassunto ? <span>{questao.subassunto}</span> : null}
          </div>
        </header>

        <div className={styles.catalog}>
          <span><strong>Ano:</strong> {questao.ano || "Não informado"}</span>
          <span><strong>Banca:</strong> {questao.banca || "Não informada"}</span>
          <span><strong>Órgão:</strong> {questao.instituicao || "Não informado"}</span>
          {questao.cargo ? <span><strong>Cargo:</strong> {questao.cargo}</span> : null}
        </div>

        {questao.textoApoioConteudo ? (
          <section className={styles.supportText}>
            <h3>{questao.textoApoioTitulo || "Texto de apoio"}</h3>
            {questao.textoApoioConteudo.split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </section>
        ) : null}

        <section className={styles.statement}>
          {questao.enunciado ? <p className={styles.enunciado}>{questao.enunciado}</p> : null}
          {(questao.questao || "Questão sem texto disponível.").split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </section>

        <section className={styles.answers} aria-label={`Alternativas da questão ${numero}`}>
          {alternativas.length === 0 ? (
            <EmptyState
              title="Alternativas indisponíveis"
              description="A questão veio da API sem alternativas parseáveis. Confira o cadastro no painel admin."
            />
          ) : alternativas.map((alternativa) => {
            const isSelected = selecionada === alternativa.letra;
            const isCorrect = resultado?.gabarito === alternativa.letra;
            const isWrongSelected = resultado?.respostaSelecionada === alternativa.letra && !resultado.acertou;

            return (
              <button
                key={alternativa.letra}
                type="button"
                className={[styles.option, isSelected ? styles.selected : "", isCorrect ? styles.correct : "", isWrongSelected ? styles.wrong : ""].join(" ")}
                onClick={() => !resultado && setSelecionada(alternativa.letra)}
                disabled={Boolean(resultado)}
              >
                <strong>{alternativa.letra}</strong>
                <span>{alternativa.texto}</span>
              </button>
            );
          })}
        </section>

        <footer className={styles.footer}>
          {resultado ? (
            <div className={styles.result}>
              <Badge>{resultado.acertou ? "Acertou" : "Errou"}</Badge>
              <span>Você marcou <strong>{resultado.respostaSelecionada}</strong>. Gabarito: <strong>{resultado.gabarito}</strong>.</span>
              {resultado.explicacao ? (
                <Button type="button" variant="secondary" onClick={() => setMostrarExplicacao((current) => !current)}>
                  {mostrarExplicacao ? "Ocultar explicação" : "Ver explicação"}
                </Button>
              ) : null}
            </div>
          ) : (
            <div className={styles.answerAction}>
              {responderMutation.error ? <p className="errorText">{getApiErrorMessage(responderMutation.error, "Não foi possível enviar sua resposta.")}</p> : null}
              <Button type="button" disabled={!selecionada || responderMutation.isPending} onClick={() => responderMutation.mutate()}>
                {responderMutation.isPending ? "Enviando..." : "Responder"}
              </Button>
            </div>
          )}

          <Button type="button" variant="ghost" onClick={() => setMostrarComentarios((current) => !current)}>
            {mostrarComentarios ? "Ocultar comentários" : "Ver comentários"}
          </Button>
        </footer>

        {mostrarExplicacao && resultado?.explicacao ? <div className={styles.explanation}><strong>Explicação</strong><p>{resultado.explicacao}</p></div> : null}
        {mostrarComentarios ? <div className={styles.comments}><ComentariosQuestao questaoId={questao.idQuestion} /></div> : null}
      </Card>
    </article>
  );
}
