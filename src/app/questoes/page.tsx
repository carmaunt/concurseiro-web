"use client";

import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthLayout } from "@/components/AuthLayout";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Loading } from "@/components/Loading";
import { getApiErrorMessage } from "@/services/api";
import { listarQuestoes } from "@/services/questoesService";
import type { QuestaoFilters } from "@/types/questoes";
import styles from "./questoes.module.css";

const initialFilters: QuestaoFilters = {
  texto: "",
  disciplinaId: "",
  assuntoId: "",
  bancaId: "",
  instituicaoId: "",
  ano: "",
};

export default function QuestoesPage() {
  const [filters, setFilters] = useState<QuestaoFilters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<QuestaoFilters>(initialFilters);
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["questoes", appliedFilters, page],
    queryFn: () => listarQuestoes(appliedFilters, page, 10),
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(0);
    setAppliedFilters(filters);
  }

  return (
    <AuthLayout>
      <section className="container section">
        <div className="sectionHeader">
          <div>
            <h1>Questões</h1>
            <p>Encontre questões por assunto, banca, órgão ou ano e pratique no seu ritmo.</p>
          </div>
        </div>

        <Card>
          <form className={styles.filters} onSubmit={handleSubmit}>
            <label className="field">
              <span className="label">Busca</span>
              <input
                className="input"
                value={filters.texto}
                onChange={(event) => setFilters((current) => ({ ...current, texto: event.target.value }))}
                placeholder="Texto da questão"
              />
            </label>
            <label className="field">
              <span className="label">Disciplina ID</span>
              <input
                className="input"
                inputMode="numeric"
                value={filters.disciplinaId}
                onChange={(event) => setFilters((current) => ({ ...current, disciplinaId: event.target.value }))}
              />
            </label>
            <label className="field">
              <span className="label">Banca ID</span>
              <input
                className="input"
                inputMode="numeric"
                value={filters.bancaId}
                onChange={(event) => setFilters((current) => ({ ...current, bancaId: event.target.value }))}
              />
            </label>
            <label className="field">
              <span className="label">Assunto ID</span>
              <input
                className="input"
                inputMode="numeric"
                value={filters.assuntoId}
                onChange={(event) => setFilters((current) => ({ ...current, assuntoId: event.target.value }))}
              />
            </label>
            <label className="field">
              <span className="label">Órgão ID</span>
              <input
                className="input"
                inputMode="numeric"
                value={filters.instituicaoId}
                onChange={(event) => setFilters((current) => ({ ...current, instituicaoId: event.target.value }))}
              />
            </label>
            <label className="field">
              <span className="label">Ano</span>
              <input
                className="input"
                inputMode="numeric"
                value={filters.ano}
                onChange={(event) => setFilters((current) => ({ ...current, ano: event.target.value }))}
              />
            </label>
            <div className={styles.filterActions}>
              <Button type="submit">Filtrar</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setFilters(initialFilters);
                  setAppliedFilters(initialFilters);
                  setPage(0);
                }}
              >
                Limpar
              </Button>
            </div>
          </form>
        </Card>
      </section>

      <section className="container section">
        {isLoading ? <Loading label="Carregando questões..." /> : null}
        {error ? <p className="errorText">{getApiErrorMessage(error, "Erro ao carregar questões.")}</p> : null}
        {!isLoading && data?.content.length === 0 ? (
          <EmptyState
            title="Nenhuma questão encontrada"
            description="Ajuste os filtros e tente uma nova busca."
          />
        ) : null}

        <div className="grid">
          {data?.content.map((questao) => (
            <Card key={questao.idQuestion}>
              <div className={styles.questionHeader}>
                <Badge>{questao.disciplina || "Disciplina não informada"}</Badge>
                <span className="muted">{questao.banca || "Banca não informada"} · {questao.ano || "Ano não informado"}</span>
              </div>
              <h2 className={styles.questionTitle}>{questao.idQuestion}</h2>
              <p>{questao.questao || questao.enunciado || "Questão sem texto disponível."}</p>
              <p className="muted">
                {questao.assunto ? `${questao.assunto} · ` : ""}
                {questao.instituicao || "Instituição não informada"}
              </p>
              <div className={styles.questionActions}>
                <Button href={`/questoes/${questao.idQuestion}`} variant="secondary">
                  Resolver questão
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {data && data.totalPages > 1 ? (
          <div className={styles.pagination}>
            <Button type="button" variant="secondary" disabled={data.first} onClick={() => setPage((current) => current - 1)}>
              Anterior
            </Button>
            <span>Página {data.number + 1} de {data.totalPages}</span>
            <Button type="button" variant="secondary" disabled={data.last} onClick={() => setPage((current) => current + 1)}>
              Próxima
            </Button>
          </div>
        ) : null}
      </section>
    </AuthLayout>
  );
}
