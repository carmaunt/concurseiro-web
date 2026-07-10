export type ConteudoTipo = "NOTICIA" | "BLOG" | "CONCURSO_ABERTO" | "EDITAL_PREVISTO";
export type ConteudoStatus = "RASCUNHO" | "PUBLICADO";

export type TaxonomiaResumo = {
  id: number;
  nome: string;
  slug: string;
};

export type ConteudoPortal = {
  id: number;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  imagemCapa?: string | null;
  categoria?: string | null;
  category?: TaxonomiaResumo | null;
  tags?: TaxonomiaResumo[];
  status: ConteudoStatus;
  tipo: ConteudoTipo;
  destaque: boolean;
  publicadoEm?: string | null;
  seoTitulo?: string | null;
  seoDescricao?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ConteudosPage = {
  content: ConteudoPortal[];
  page?: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  first?: boolean;
  last?: boolean;
};
