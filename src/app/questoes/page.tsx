"use client";

import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Loading } from "@/components/Loading";
import { QuestaoResolucao } from "@/components/QuestaoResolucao";
import { getApiErrorMessage } from "@/services/api";
import {
  listarAnos,
  listarAssuntosPorDisciplina,
  listarBancas,
  listarDisciplinas,
  listarInstituicoes,
  listarSubassuntosPorAssunto,
} from "@/services/catalogosService";
import { listarQuestoes } from "@/services/questoesService";
import type { QuestaoFilters } from "@/types/questoes";
import styles from "./questoes.module.css";

const initialFilters: QuestaoFilters = {
  texto: "",
  disciplinaId: "",
  assuntoId: "",
  subassuntoId: "",
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
  const disciplinasQuery = useQuery({ queryKey: ["catalogo", "disciplinas"], queryFn: listarDisciplinas, staleTime: 30 * 60_000 });
  const bancasQuery = useQuery({ queryKey: ["catalogo", "bancas"], queryFn: listarBancas, staleTime: 30 * 60_000 });
  const instituicoesQuery = useQuery({ queryKey: ["catalogo", "instituicoes"], queryFn: listarInstituicoes, staleTime: 30 * 60_000 });
  const anosQuery = useQuery({ queryKey: ["catalogo", "anos"], queryFn: listarAnos, staleTime: 30 * 60_000 });
  const assuntosQuery = useQuery({
    queryKey: ["catalogo", "assuntos", filters.disciplinaId],
    queryFn: () => listarAssuntosPorDisciplina(filters.disciplinaId!),
    enabled: Boolean(filters.disciplinaId),
    staleTime: 30 * 60_000,
  });
  const subassuntosQuery = useQuery({
    queryKey: ["catalogo", "subassuntos", filters.assuntoId],
    queryFn: () => listarSubassuntosPorAssunto(filters.assuntoId!),
    enabled: Boolean(filters.assuntoId),
    staleTime: 30 * 60_000,
  });

  const catalogoError = disciplinasQuery.error || bancasQuery.error || instituicoesQuery.error || anosQuery.error || assuntosQuery.error || subassuntosQuery.error;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(0);
    setAppliedFilters(filters);
  }

  function mudarPagina(proximaPagina: number) {
    setPage(proximaPagina);
    window.setTimeout(() => document.getElementById("lista-questoes")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
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
              <span className="label">Disciplina</span>
              <select
                className="input"
                value={filters.disciplinaId}
                disabled={disciplinasQuery.isLoading}
                onChange={(event) => setFilters((current) => ({ ...current, disciplinaId: event.target.value, assuntoId: "", subassuntoId: "" }))}
              >
                <option value="">Todas as disciplinas</option>
                {disciplinasQuery.data?.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </label>
            <label className="field">
              <span className="label">Assunto</span>
              <select
                className="input"
                value={filters.assuntoId}
                disabled={!filters.disciplinaId || assuntosQuery.isLoading}
                onChange={(event) => setFilters((current) => ({ ...current, assuntoId: event.target.value, subassuntoId: "" }))}
              >
                <option value="">{filters.disciplinaId ? "Todos os assuntos" : "Escolha uma disciplina"}</option>
                {assuntosQuery.data?.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </label>
            <label className="field">
              <span className="label">Subassunto</span>
              <select
                className="input"
                value={filters.subassuntoId}
                disabled={!filters.assuntoId || subassuntosQuery.isLoading}
                onChange={(event) => setFilters((current) => ({ ...current, subassuntoId: event.target.value }))}
              >
                <option value="">{filters.assuntoId ? "Todos os subassuntos" : "Escolha um assunto"}</option>
                {subassuntosQuery.data?.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </label>
            <label className="field">
              <span className="label">Banca</span>
              <select
                className="input"
                value={filters.bancaId}
                disabled={bancasQuery.isLoading}
                onChange={(event) => setFilters((current) => ({ ...current, bancaId: event.target.value }))}
              >
                <option value="">Todas as bancas</option>
                {bancasQuery.data?.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </label>
            <label className="field">
              <span className="label">Órgão</span>
              <select
                className="input"
                value={filters.instituicaoId}
                disabled={instituicoesQuery.isLoading}
                onChange={(event) => setFilters((current) => ({ ...current, instituicaoId: event.target.value }))}
              >
                <option value="">Todos os órgãos</option>
                {instituicoesQuery.data?.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </label>
            <label className="field">
              <span className="label">Ano</span>
              <select
                className="input"
                value={filters.ano}
                disabled={anosQuery.isLoading}
                onChange={(event) => setFilters((current) => ({ ...current, ano: event.target.value }))}
              >
                <option value="">Todos os anos</option>
                {anosQuery.data?.map((ano) => <option key={ano} value={ano}>{ano}</option>)}
              </select>
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
        {catalogoError ? <p className="errorText">Não foi possível carregar todos os filtros. Atualize a página para tentar novamente.</p> : null}
        {!isLoading && data?.content.length === 0 ? (
          <EmptyState
            title="Nenhuma questão encontrada"
            description="Ajuste os filtros e tente uma nova busca."
          />
        ) : null}

        <div id="lista-questoes" className={styles.questionList}>
          {data?.content.map((questao, index) => (
            <QuestaoResolucao key={questao.idQuestion} questao={questao} numero={page * 10 + index + 1} />
          ))}
        </div>

        {data && data.page.totalPages > 1 ? (
          <div className={styles.pagination}>
            <Button type="button" variant="secondary" disabled={data.page.number === 0} onClick={() => mudarPagina(page - 1)}>
              Anterior
            </Button>
            <span>Página {data.page.number + 1} de {data.page.totalPages}</span>
            <Button type="button" variant="secondary" disabled={data.page.number >= data.page.totalPages - 1} onClick={() => mudarPagina(page + 1)}>
              Próxima
            </Button>
          </div>
        ) : null}
      </section>
    </AuthLayout>
  );
}
