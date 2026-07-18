import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArticleNextStep } from "./ArticleNextStep";
import type { ConteudoPortal, ConteudoTipo } from "@/types/conteudos";

function conteudo(tipo: ConteudoTipo, overrides: Partial<ConteudoPortal> = {}): ConteudoPortal {
  return {
    id: 42,
    titulo: "Concurso da Polícia Militar",
    slug: "concurso-policia-militar",
    resumo: "Resumo",
    conteudo: "Conteúdo",
    status: "PUBLICADO",
    tipo,
    destaque: false,
    createdAt: "2026-07-16T12:00:00Z",
    updatedAt: "2026-07-16T12:00:00Z",
    ...overrides,
  };
}

describe("ArticleNextStep", () => {
  it.each([
    ["NOTICIA", "Transforme informação em prática", "Praticar 5 questões grátis"],
    ["BLOG", "Aplique o que acabou de aprender", "Testar meu nível grátis"],
    ["CONCURSO_ABERTO", "Dê o primeiro passo para esta oportunidade", "Começar diagnóstico grátis"],
    ["EDITAL_PREVISTO", "Comece antes da publicação do edital", "Começar a praticar grátis"],
  ] as const)("adapta a ação para %s", (tipo, heading, linkLabel) => {
    const { unmount } = render(<ArticleNextStep conteudo={conteudo(tipo)} />);

    expect(screen.getByRole("heading", { name: heading })).not.toBeNull();
    const link = screen.getByRole("link", { name: linkLabel });
    expect(link.getAttribute("href")).toContain("/experimentar?");
    expect(link.getAttribute("href")).toContain(`tipo=${tipo.toLowerCase()}`);
    expect(screen.getByText(/5 questões variadas do acervo/)).not.toBeNull();

    unmount();
  });

  it("leva a uma listagem realmente filtrada quando o conteúdo possui tag", () => {
    render(
      <ArticleNextStep
        conteudo={conteudo("CONCURSO_ABERTO", {
          tags: [{ id: 7, nome: "Polícia Militar", slug: "policia-militar" }],
        })}
      />,
    );

    const related = screen.getByRole("link", { name: "Ver mais sobre Polícia Militar" });
    expect(related.getAttribute("href")).toBe("/concursos-abertos?tag=policia-militar");
    expect(screen.getByText(/Se “Polícia Militar” está no seu radar/)).not.toBeNull();
  });

  it("usa categoria como contexto quando não existe tag", () => {
    render(
      <ArticleNextStep
        conteudo={conteudo("BLOG", {
          category: { id: 3, nome: "Estratégia de estudo", slug: "estrategia-de-estudo" },
        })}
      />,
    );

    expect(screen.getByRole("link", { name: "Ver mais sobre Estratégia de estudo" }).getAttribute("href"))
      .toBe("/blog?category=estrategia-de-estudo");
  });
});
