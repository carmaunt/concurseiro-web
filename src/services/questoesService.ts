import { api, unwrapApiData } from "./api";
import type {
  PageResponse,
  Questao,
  QuestaoFilters,
  RespostaQuestao,
  RespostaQuestaoAmostra,
} from "@/types/questoes";

export async function listarAmostraQuestoes(size = 5) {
  const response = await api.get("/api/v1/questoes/amostra", { params: { size } });
  return unwrapApiData<Questao[]>(response.data);
}

export async function responderQuestaoAmostra(idQuestion: string, respostaSelecionada: string) {
  const response = await api.post(
    `/api/v1/questoes/amostra/${encodeURIComponent(idQuestion)}/respostas`,
    { respostaSelecionada },
  );
  return unwrapApiData<RespostaQuestaoAmostra>(response.data);
}

export async function listarQuestoes(filters: QuestaoFilters, page = 0, size = 10) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("size", String(size));
  params.set("sort", "criadoEm,desc");

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const response = await api.get(`/api/v1/questoes/web?${params.toString()}`);
  return unwrapApiData<PageResponse<Questao>>(response.data);
}

export async function buscarQuestao(idQuestion: string) {
  const response = await api.get(`/api/v1/questoes/web/${encodeURIComponent(idQuestion)}`);
  return unwrapApiData<Questao>(response.data);
}

export async function responderQuestao(idQuestion: string, respostaSelecionada: string) {
  const response = await api.post(`/api/v1/questoes/web/${encodeURIComponent(idQuestion)}/respostas`, {
    respostaSelecionada,
  });
  return unwrapApiData<RespostaQuestao>(response.data);
}

export async function buscarUltimaResposta(idQuestion: string) {
  const response = await api.get(`/api/v1/questoes/web/${encodeURIComponent(idQuestion)}/respostas/ultima`);
  return unwrapApiData<RespostaQuestao>(response.data);
}
