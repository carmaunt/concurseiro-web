"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";
import { getApiErrorMessage } from "@/services/api";
import { criarComentario, curtirComentario, descurtirComentario, listarComentarios } from "@/services/comentariosService";
import styles from "@/app/questoes/[idQuestion]/resolver.module.css";

export function ComentariosQuestao({ questaoId }: { questaoId: string }) {
  const queryClient = useQueryClient();
  const [texto, setTexto] = useState("");
  const [ordenar, setOrdenar] = useState<"recentes" | "curtidas">("recentes");
  const queryKey = ["comentarios", questaoId, ordenar] as const;
  const comentariosQuery = useQuery({ queryKey, queryFn: () => listarComentarios(questaoId, ordenar) });
  const atualizarLista = () => queryClient.invalidateQueries({ queryKey: ["comentarios", questaoId] });
  const criarMutation = useMutation({
    mutationFn: () => criarComentario(questaoId, texto.trim()),
    onSuccess: () => {
      setTexto("");
      atualizarLista();
    },
  });
  const curtirMutation = useMutation({ mutationFn: curtirComentario, onSuccess: atualizarLista });
  const descurtirMutation = useMutation({ mutationFn: descurtirComentario, onSuccess: atualizarLista });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (texto.trim()) criarMutation.mutate();
  }

  return (
    <section className={styles.comments} aria-labelledby="comentarios-title">
      <div className={styles.commentsHeader}>
        <div>
          <h2 id="comentarios-title">Comentários</h2>
          <p>Compartilhe sua dúvida ou raciocínio sobre esta questão.</p>
        </div>
        <label className={styles.sortLabel}>
          <span>Ordenar</span>
          <select value={ordenar} onChange={(event) => setOrdenar(event.target.value as "recentes" | "curtidas")}>
            <option value="recentes">Recentes</option>
            <option value="curtidas">Mais curtidos</option>
          </select>
        </label>
      </div>

      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <label className="field">
          <span className="label">Adicionar comentário</span>
          <textarea
            className="input"
            value={texto}
            onChange={(event) => setTexto(event.target.value)}
            maxLength={5000}
            rows={4}
            placeholder="Escreva um comentário construtivo..."
          />
        </label>
        {criarMutation.error ? <p className="errorText">{getApiErrorMessage(criarMutation.error, "Não foi possível publicar o comentário.")}</p> : null}
        <div className={styles.commentActions}>
          <span>{texto.length}/5000</span>
          <Button type="submit" disabled={!texto.trim() || criarMutation.isPending}>
            {criarMutation.isPending ? "Publicando..." : "Publicar comentário"}
          </Button>
        </div>
      </form>

      {comentariosQuery.isLoading ? <p className="muted">Carregando comentários...</p> : null}
      {comentariosQuery.error ? <p className="errorText">{getApiErrorMessage(comentariosQuery.error, "Não foi possível carregar os comentários.")}</p> : null}
      {!comentariosQuery.isLoading && !comentariosQuery.error && !comentariosQuery.data?.content.length ? (
        <EmptyState title="Ainda não há comentários" description="Seja a primeira pessoa a compartilhar uma observação." />
      ) : null}
      <div className={styles.commentList}>
        {comentariosQuery.data?.content.map((comentario) => (
          <article key={comentario.id} className={styles.comment}>
            <header>
              <strong>{comentario.autor}</strong>
              <time dateTime={comentario.criadoEm}>
                {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(comentario.criadoEm))}
              </time>
            </header>
            <p>{comentario.texto}</p>
            <footer>
              <button type="button" onClick={() => curtirMutation.mutate(comentario.id)} disabled={curtirMutation.isPending}>Útil · {comentario.curtidas}</button>
              <button type="button" onClick={() => descurtirMutation.mutate(comentario.id)} disabled={descurtirMutation.isPending}>Não útil · {comentario.descurtidas}</button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
