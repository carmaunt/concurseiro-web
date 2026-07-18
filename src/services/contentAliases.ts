import type { ConteudoTipo } from "@/types/conteudos";

type ContentAlias = {
  tipo: ConteudoTipo;
  from: string;
  to: string;
};

const CONTENT_ALIASES: ContentAlias[] = [
  {
    tipo: "NOTICIA",
    from: "governo-autoriza-concursos-receita-federal-banco-central-316-vagas",
    to: "concurso-receita-federal-2026-146-vagas",
  },
];

export function canonicalContentSlug(tipo: ConteudoTipo, slug: string) {
  return CONTENT_ALIASES.find((alias) => alias.tipo === tipo && alias.from === slug)?.to ?? slug;
}

export function contentLookupSlugs(tipo: ConteudoTipo, slug: string) {
  const canonicalSlug = canonicalContentSlug(tipo, slug);
  const legacySlugs = CONTENT_ALIASES
    .filter((alias) => alias.tipo === tipo && alias.to === canonicalSlug)
    .map((alias) => alias.from);

  return Array.from(new Set([canonicalSlug, ...legacySlugs]));
}
