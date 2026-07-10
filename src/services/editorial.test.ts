import { describe, expect, it } from "vitest";
import { pluralizeSearchResults, splitTags } from "./editorial";

describe("editorial", () => {
  it("normaliza tags de texto e remove itens vazios", () => {
    expect(splitTags("  CESPE, Direito Administrativo, , ")).toEqual([
      "CESPE",
      "Direito Administrativo",
    ]);
  });

  it("descreve corretamente o resultado de busca", () => {
    expect(pluralizeSearchResults(0, "PF")).toBe('Nenhuma publicação encontrada para "PF"');
    expect(pluralizeSearchResults(1)).toBe("1 publicação encontrada");
    expect(pluralizeSearchResults(2)).toBe("2 publicações encontradas");
  });
});
