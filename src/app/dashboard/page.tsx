"use client";

import { useQuery } from "@tanstack/react-query";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Loading } from "@/components/Loading";
import { carregarDashboardEstudante } from "@/services/dashboardService";
import { getStoredSession } from "@/services/auth";
import { me } from "@/services/authService";
import styles from "./dashboard.module.css";

const featureCards = [
  { title: "Questões", description: "Escolha uma questão e avance na sua preparação.", href: "/questoes" },
  { title: "Seu desempenho", description: "Acompanhe seus acertos, erros e aproveitamento nesta página." },
];

export default function DashboardPage() {
  const storedSession = getStoredSession();
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me,
  });
  const dashboardQuery = useQuery({
    queryKey: ["dashboard-estudante"],
    queryFn: carregarDashboardEstudante,
  });

  const email = data?.email ?? storedSession?.email;
  const dashboard = dashboardQuery.data;

  return (
    <AuthLayout>
      <section className="container section">
        <div className="sectionHeader">
          <div>
            <h1>Dashboard do Estudante</h1>
            <p>{email ? `Olá, ${email}.` : "Acompanhe sua evolução no O Concurseiro."}</p>
          </div>
          <Button href="/questoes">Resolver questões</Button>
        </div>

        {isLoading || dashboardQuery.isLoading ? <Loading label="Carregando dashboard..." /> : null}
        {data === undefined && !isLoading ? <p className="errorText">Não foi possível validar sua sessão.</p> : null}
        {dashboardQuery.error ? <p className="errorText">Não foi possível carregar seus indicadores agora.</p> : null}

        <div className={`grid gridThree ${styles.metrics}`}>
          <Card>
            <span className={styles.metricValue}>{dashboard?.questoesResolvidas ?? 0}</span>
            <strong>Questões resolvidas</strong>
            <p className="muted">Histórico registrado pela web.</p>
          </Card>
          <Card>
            <span className={styles.metricValue}>{dashboard?.acertos ?? 0}</span>
            <strong>Acertos</strong>
            <p className="muted">{dashboard?.erros ?? 0} erro(s) registrado(s).</p>
          </Card>
          <Card>
            <span className={styles.metricValue}>{dashboard?.aproveitamento ?? 0}%</span>
            <strong>Taxa de aproveitamento</strong>
            <p className="muted">Calculada no backend com respostas reais.</p>
          </Card>
        </div>
      </section>

      <section className="container section">
        <div className="grid gridTwo">
          {featureCards.map((card) => (
            <Card key={card.title}>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className="muted">{card.description}</p>
              {card.href ? (
                <Button href={card.href} variant="secondary">
                  Abrir
                </Button>
              ) : null}
            </Card>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="grid gridTwo">
          <Card>
            <h2 className={styles.cardTitle}>Últimas respostas</h2>
            {dashboard?.ultimasRespostas?.length ? (
              <div className={styles.list}>
                {dashboard.ultimasRespostas.map((item) => (
                  <a key={`${item.idQuestion}-${item.respondidaEm}`} href={`/questoes/${item.idQuestion}`} className={styles.listItem}>
                    <span>
                      <strong>{item.idQuestion}</strong>
                      <small>{item.disciplina}</small>
                    </span>
                    <em className={item.acertou ? styles.hit : styles.miss}>{item.acertou ? "Acerto" : "Erro"}</em>
                  </a>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Ainda não há respostas"
                description="Resolva sua primeira questão para preencher este painel."
                actionHref="/questoes"
                actionLabel="Resolver primeira questão"
              />
            )}
          </Card>

          <Card>
            <h2 className={styles.cardTitle}>Disciplinas mais estudadas</h2>
            {dashboard?.desempenhoPorDisciplina?.length ? (
              <div className={styles.list}>
                {dashboard.desempenhoPorDisciplina.map((item) => (
                  <div key={item.disciplina} className={styles.disciplineItem}>
                    <div>
                      <strong>{item.disciplina}</strong>
                      <small>{item.total} questão(ões) · {item.acertos} acerto(s)</small>
                    </div>
                    <span>{item.aproveitamento}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Sem disciplinas estudadas"
                description="As disciplinas aparecem aqui conforme você responde questões."
              />
            )}
          </Card>
        </div>
      </section>
    </AuthLayout>
  );
}
