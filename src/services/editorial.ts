import type { ConteudoPortal, ConteudoTipo } from "@/types/conteudos";

export function pluralizePublications(count: number) {
  return count === 1 ? "1 publicação" : `${count} publicações`;
}

export function pluralizeSearchResults(count: number, search?: string | null) {
  const base = count === 0
    ? "Nenhuma publicação encontrada"
    : count === 1
      ? "1 publicação encontrada"
      : `${count} publicações encontradas`;

  return search?.trim() ? `${base} para "${search.trim()}"` : base;
}

export function tipoLabel(tipo: ConteudoTipo) {
  const labels: Record<ConteudoTipo, string> = {
    NOTICIA: "Notícia",
    BLOG: "Artigo",
    CONCURSO_ABERTO: "Concurso aberto",
    EDITAL_PREVISTO: "Edital previsto",
  };

  return labels[tipo];
}

export function ctaLabel(tipo: ConteudoTipo) {
  const labels: Record<ConteudoTipo, string> = {
    NOTICIA: "Ler notícia",
    BLOG: "Ler artigo",
    CONCURSO_ABERTO: "Ver concurso",
    EDITAL_PREVISTO: "Ver edital",
  };

  return labels[tipo];
}

export function splitTags(tags?: string | Array<{ nome: string }> | null) {
  if (!tags) return [];

  if (Array.isArray(tags)) return tags.map((tag) => tag.nome);

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function normalizeContent(content: string) {
  return content.replaceAll("\\n", "\n");
}

export function excludeContent(conteudos: ConteudoPortal[], current?: ConteudoPortal | null) {
  if (!current) return conteudos;
  return conteudos.filter((conteudo) => conteudo.id !== current.id);
}
