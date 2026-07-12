import { MarkdownText } from "@/components/MarkdownText";
import type { Questao } from "@/types/questoes";
import styles from "./TextoApoio.module.css";

type TipoTextoApoio = "TEXTO" | "CODIGO" | "TABELA" | "IMAGEM";

type TabelaTextoApoio = {
  colunas: string[];
  linhas: string[][];
};

type ImagemTextoApoio = {
  url: string;
  alt: string;
  largura?: number;
  altura?: number;
};

type Props = Pick<Questao, "textoApoioTitulo" | "textoApoioTipo" | "textoApoioConteudo" | "textoApoioJson">;

export function possuiTextoApoio(questao: Props) {
  return Boolean(questao.textoApoioConteudo?.trim() || questao.textoApoioJson?.trim());
}

export function TextoApoio({ textoApoioTitulo, textoApoioTipo, textoApoioConteudo, textoApoioJson }: Props) {
  const tipo = normalizarTipo(textoApoioTipo);
  const titulo = textoApoioTitulo || "Texto de apoio";

  return (
    <section className={styles.container} aria-label={titulo}>
      <h3>{titulo}</h3>
      {tipo === "CODIGO" ? <pre className={styles.code}><code>{textoApoioConteudo || ""}</code></pre> : null}
      {tipo === "TABELA" ? <Tabela conteudo={textoApoioConteudo} conteudoJson={textoApoioJson} /> : null}
      {tipo === "IMAGEM" ? <Imagem conteudo={textoApoioConteudo} conteudoJson={textoApoioJson} /> : null}
      {tipo === "TEXTO" ? <MarkdownText text={textoApoioConteudo} /> : null}
    </section>
  );
}

function Tabela({ conteudo, conteudoJson }: Pick<Props, "textoApoioConteudo" | "textoApoioJson"> & { conteudo?: string | null; conteudoJson?: string | null }) {
  const tabela = parseTabela(conteudoJson, conteudo);
  const possuiConteudo = tabela.colunas.some(Boolean) || tabela.linhas.some((linha) => linha.some(Boolean));

  if (!possuiConteudo) return <p className={styles.unavailable}>Tabela de apoio sem conteúdo estruturado.</p>;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>{tabela.colunas.map((coluna, index) => <th key={`${coluna}-${index}`} scope="col">{coluna}</th>)}</tr>
        </thead>
        <tbody>
          {tabela.linhas.map((linha, linhaIndex) => (
            <tr key={linhaIndex}>
              {tabela.colunas.map((_, colunaIndex) => <td key={colunaIndex}>{linha[colunaIndex] || ""}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Imagem({ conteudo, conteudoJson }: { conteudo?: string | null; conteudoJson?: string | null }) {
  const imagem = parseImagem(conteudoJson);
  if (!imagem) return <p className={styles.unavailable}>Imagem de apoio indisponível.</p>;

  return (
    // A URL vem do cadastro editorial e pode variar conforme o armazenamento.
    // Usar img evita que uma alteração de host no acervo dependa de rebuild do Next.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.image}
      src={imagem.url}
      alt={imagem.alt || conteudo || "Imagem de apoio da questão"}
      width={imagem.largura}
      height={imagem.altura}
      loading="lazy"
    />
  );
}

function normalizarTipo(tipo?: string | null): TipoTextoApoio {
  if (tipo === "CODIGO" || tipo === "TABELA" || tipo === "IMAGEM") return tipo;
  return "TEXTO";
}

function parseTabela(conteudoJson?: string | null, conteudo?: string | null): TabelaTextoApoio {
  if (conteudoJson?.trim()) {
    try {
      const parsed = JSON.parse(conteudoJson) as Partial<TabelaTextoApoio>;
      if (Array.isArray(parsed.colunas) && Array.isArray(parsed.linhas)) {
        const colunas = parsed.colunas.map(String);
        const tamanho = Math.max(colunas.length, 1);
        return {
          colunas: colunas.length ? colunas : [""],
          linhas: parsed.linhas.map((linha) => ajustarLinha(Array.isArray(linha) ? linha.map(String) : [], tamanho)),
        };
      }
    } catch {
      // O conteúdo textual abaixo permite exibir cadastros legados de tabela.
    }
  }

  const linhas = (conteudo || "")
    .split(/\r?\n/)
    .map((linha) => linha.split("|").map((celula) => celula.trim()))
    .filter((linha) => linha.some(Boolean));
  const colunas = linhas[0] || [""];
  return { colunas, linhas: linhas.slice(1).map((linha) => ajustarLinha(linha, colunas.length)) };
}

function parseImagem(conteudoJson?: string | null): ImagemTextoApoio | null {
  if (!conteudoJson?.trim()) return null;

  try {
    const parsed = JSON.parse(conteudoJson) as Partial<ImagemTextoApoio>;
    if (typeof parsed.url !== "string" || !urlDeImagemSegura(parsed.url)) return null;
    return {
      url: parsed.url.trim(),
      alt: typeof parsed.alt === "string" ? parsed.alt.trim() : "",
      largura: numeroPositivo(parsed.largura),
      altura: numeroPositivo(parsed.altura),
    };
  } catch {
    return null;
  }
}

function ajustarLinha(linha: string[], tamanho: number) {
  return Array.from({ length: tamanho }, (_, index) => linha[index] ?? "");
}

function numeroPositivo(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
}

function urlDeImagemSegura(valor: string) {
  const dataImagePattern = /^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=\s]+$/i;
  // Cadastros antigos armazenam a imagem diretamente em Base64. Restringimos
  // aos MIME types de imagem aceitos pela API para não aceitar data URLs ativos.
  if (valor.length <= 8 * 1024 * 1024 && dataImagePattern.test(valor)) return true;

  try {
    const url = new URL(valor);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
