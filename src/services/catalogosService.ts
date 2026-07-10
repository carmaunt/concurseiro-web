import { api, unwrapApiData } from "./api";
import type { CatalogoItem } from "@/types/questoes";

async function listarCatalogo(path: string) {
  const response = await api.get(path);
  return unwrapApiData<CatalogoItem[]>(response.data);
}

export function listarDisciplinas() {
  return listarCatalogo("/api/v1/catalogo/disciplinas");
}

export function listarAssuntosPorDisciplina(disciplinaId: string) {
  return listarCatalogo(`/api/v1/catalogo/disciplinas/${encodeURIComponent(disciplinaId)}/assuntos`);
}

export function listarSubassuntosPorAssunto(assuntoId: string) {
  return listarCatalogo(`/api/v1/catalogo/assuntos/${encodeURIComponent(assuntoId)}/subassuntos`);
}

export function listarBancas() {
  return listarCatalogo("/api/v1/catalogo/bancas");
}

export function listarInstituicoes() {
  return listarCatalogo("/api/v1/catalogo/instituicoes");
}

export async function listarAnos() {
  const response = await api.get("/api/v1/catalogo/anos");
  return unwrapApiData<number[]>(response.data);
}
