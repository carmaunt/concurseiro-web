export type PageResponse<T> = {
  content: T[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
};

export type Questao = {
  idQuestion: string;
  enunciado?: string | null;
  questao?: string | null;
  alternativas?: string | null;
  textoApoioTitulo?: string | null;
  textoApoioConteudo?: string | null;
  disciplina?: string | null;
  disciplinaId?: number | null;
  assunto?: string | null;
  assuntoId?: number | null;
  subassunto?: string | null;
  subassuntoId?: number | null;
  banca?: string | null;
  bancaId?: number | null;
  instituicao?: string | null;
  instituicaoId?: number | null;
  ano?: number | null;
  cargo?: string | null;
  nivel?: string | null;
  modalidade?: string | null;
  provaId?: number | null;
  criadoEm?: string | null;
};

export type QuestaoFilters = {
  texto?: string;
  disciplinaId?: string;
  assuntoId?: string;
  subassuntoId?: string;
  bancaId?: string;
  instituicaoId?: string;
  ano?: string;
};

export type CatalogoItem = {
  id: number;
  nome: string;
};

export type RespostaQuestao = {
  id: number;
  idQuestion: string;
  disciplina: string;
  respostaSelecionada: string;
  gabarito: string;
  acertou: boolean;
  explicacao?: string | null;
  respondidaEm: string;
};

export type Comentario = {
  id: number;
  questaoId: string;
  autor: string;
  texto: string;
  curtidas: number;
  descurtidas: number;
  criadoEm: string;
};
