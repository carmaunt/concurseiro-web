import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { possuiTextoApoio, TextoApoio } from "./TextoApoio";

describe("TextoApoio", () => {
  it("renderiza texto com marcação simples", () => {
    render(<TextoApoio textoApoioTipo="TEXTO" textoApoioConteudo="Prazo **importante**" />);
    expect(screen.getByText("importante").tagName).toBe("STRONG");
  });

  it("preserva o conteúdo de código", () => {
    render(<TextoApoio textoApoioTipo="CODIGO" textoApoioConteudo={'const resposta = "A";'} />);
    expect(screen.getByText('const resposta = "A";').closest("pre")).not.toBeNull();
  });

  it("renderiza uma tabela estruturada", () => {
    render(
      <TextoApoio
        textoApoioTipo="TABELA"
        textoApoioJson={JSON.stringify({ colunas: ["Cargo", "Vagas"], linhas: [["Analista", "20"]] })}
      />,
    );
    expect(screen.getByRole("columnheader", { name: "Cargo" })).not.toBeNull();
    expect(screen.getByRole("cell", { name: "20" })).not.toBeNull();
  });

  it("renderiza imagem enviada ao armazenamento", () => {
    render(
      <TextoApoio
        textoApoioTipo="IMAGEM"
        textoApoioConteudo="Gráfico de desempenho"
        textoApoioJson={JSON.stringify({ url: "https://imagens.exemplo.com/grafico.png", alt: "Gráfico de desempenho", largura: 800, altura: 600 })}
      />,
    );
    const imagem = screen.getByRole("img", { name: "Gráfico de desempenho" });
    expect(imagem.getAttribute("src")).toBe("https://imagens.exemplo.com/grafico.png");
  });

  it("renderiza imagem legada armazenada em data URL", () => {
    const imagemLegada = "data:image/png;base64,iVBORw0KGgo=";
    render(<TextoApoio textoApoioTipo="IMAGEM" textoApoioJson={JSON.stringify({ url: imagemLegada, alt: "Mapa histórico" })} />);
    expect(screen.getByRole("img", { name: "Mapa histórico" }).getAttribute("src")).toBe(imagemLegada);
  });

  it("não tenta carregar URL de imagem inválida", () => {
    render(<TextoApoio textoApoioTipo="IMAGEM" textoApoioJson='{"url":"javascript:alert(1)"}' />);
    expect(screen.getByText("Imagem de apoio indisponível.")).not.toBeNull();
  });

  it("considera conteúdo JSON como texto de apoio", () => {
    expect(possuiTextoApoio({ textoApoioJson: '{"url":"https://exemplo.com/a.png"}' })).toBe(true);
    expect(possuiTextoApoio({ textoApoioConteudo: "   " })).toBe(false);
  });
});
