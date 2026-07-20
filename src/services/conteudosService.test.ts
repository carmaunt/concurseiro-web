import { describe, expect, it } from "vitest";
import { formatDate, normalizeConteudosPage } from "./conteudosService";

describe("normalizeConteudosPage", () => {
  it("normaliza páginas no formato da API Spring", () => {
    const page = normalizeConteudosPage({
      content: [],
      page: { number: 1, size: 10, totalElements: 12, totalPages: 2 },
    });

    expect(page).toMatchObject({ number: 1, size: 10, totalElements: 12, totalPages: 2, first: false, last: true });
  });

  it("retorna uma página vazia segura diante de resposta indisponível", () => {
    expect(normalizeConteudosPage(null)).toMatchObject({
      content: [],
      number: 0,
      totalElements: 0,
      totalPages: 0,
      first: true,
      last: true,
    });
  });
});

describe("formatDate", () => {
  it("mantém a data editorial no fuso de São Paulo durante a virada em UTC", () => {
    expect(formatDate("2026-07-20T02:27:02.148605Z")).toBe("19 de jul. de 2026");
  });
});
