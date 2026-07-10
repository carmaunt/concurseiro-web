import { api, unwrapApiData } from "./api";
import type { Comentario, PageResponse } from "@/types/questoes";

export async function listarComentarios(questaoId: string, ordenar: "recentes" | "curtidas" = "recentes") {
  const response = await api.get(`/api/v1/questoes/${encodeURIComponent(questaoId)}/comentarios`, {
    params: { page: 0, size: 20, ordenar },
  });
  return unwrapApiData<PageResponse<Comentario>>(response.data);
}

export async function criarComentario(questaoId: string, texto: string) {
  const response = await api.post(`/api/v1/questoes/${encodeURIComponent(questaoId)}/comentarios`, { texto });
  return unwrapApiData<Comentario>(response.data);
}

export async function curtirComentario(id: number) {
  const response = await api.post(`/api/v1/comentarios/${id}/curtir`);
  return unwrapApiData<Comentario>(response.data);
}

export async function descurtirComentario(id: number) {
  const response = await api.post(`/api/v1/comentarios/${id}/descurtir`);
  return unwrapApiData<Comentario>(response.data);
}
