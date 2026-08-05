import { describe, expect, it } from "vitest";
import { parseEditorialUrlParams, pluralizeSearchResults, splitTags } from "./editorial";

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

  it("normaliza filtros editoriais da URL para busca server-side", () => {
    expect(parseEditorialUrlParams({
      search: "  prova ",
      category: ["bancas", "ignorar"],
      tag: "fgv",
      page: "3",
    })).toEqual({
      search: "prova",
      category: "bancas",
      tag: "fgv",
      displayPage: 3,
      pageIndex: 2,
      shouldNoIndex: true,
    });
  });

  it("mantém a listagem principal indexável e ignora parâmetros de campanha", () => {
    expect(parseEditorialUrlParams({ utm_source: "instagram" })).toEqual({
      search: "",
      category: "",
      tag: "",
      displayPage: 1,
      pageIndex: 0,
      shouldNoIndex: false,
    });
  });
});
