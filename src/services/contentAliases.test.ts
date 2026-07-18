import { describe, expect, it } from "vitest";
import { canonicalContentSlug, contentLookupSlugs } from "./contentAliases";

const legacySlug = "governo-autoriza-concursos-receita-federal-banco-central-316-vagas";
const canonicalSlug = "concurso-receita-federal-2026-146-vagas";

describe("contentAliases", () => {
  it("converte o endereço antigo da notícia para o slug canônico", () => {
    expect(canonicalContentSlug("NOTICIA", legacySlug)).toBe(canonicalSlug);
  });

  it("consulta primeiro o slug canônico e mantém o antigo como fallback durante a migração", () => {
    expect(contentLookupSlugs("NOTICIA", canonicalSlug)).toEqual([canonicalSlug, legacySlug]);
  });

  it("não altera conteúdos sem alias", () => {
    expect(contentLookupSlugs("BLOG", "como-estudar")).toEqual(["como-estudar"]);
  });
});
