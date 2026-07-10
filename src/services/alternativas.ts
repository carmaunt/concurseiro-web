export type Alternativa = {
  letra: string;
  texto: string;
};

export function parseAlternativas(raw?: string | null): Alternativa[] {
  if (!raw) return [];

  const matches = [...raw.matchAll(/(?:^|\n)\s*([A-E])\)\s*([\s\S]*?)(?=\n\s*[A-E]\)\s*|$)/gi)];

  if (matches.length > 0) {
    return matches.map((match) => ({
      letra: match[1].toUpperCase(),
      texto: match[2].trim(),
    }));
  }

  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => ({
      letra: String.fromCharCode(65 + index),
      texto: line.replace(/^[A-E]\)\s*/i, ""),
    }));
}

export function alternativasCertoErrado() {
  return [
    { letra: "C", texto: "Certo" },
    { letra: "E", texto: "Errado" },
  ];
}
