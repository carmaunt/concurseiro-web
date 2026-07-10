export type UltimaResposta = {
  idQuestion: string;
  disciplina: string;
  respostaSelecionada: string;
  gabarito: string;
  acertou: boolean;
  respondidaEm: string;
};

export type DesempenhoDisciplina = {
  disciplina: string;
  total: number;
  acertos: number;
  erros: number;
  aproveitamento: number;
};

export type DashboardEstudante = {
  questoesResolvidas: number;
  acertos: number;
  erros: number;
  aproveitamento: number;
  ultimasRespostas: UltimaResposta[];
  desempenhoPorDisciplina: DesempenhoDisciplina[];
};
