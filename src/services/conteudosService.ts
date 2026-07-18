import { api, unwrapApiData } from "./api";
import type { ConteudoPortal, ConteudoTipo, ConteudosPage, TaxonomiaResumo } from "@/types/conteudos";

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
};

// Chamadas de Server Components não passam pelo navegador; use a URL interna
// da API para não depender do proxy público durante a renderização.
const API_BASE_URL = process.env.CONCURSEIRO_API_URL || process.env.NEXT_PUBLIC_API_URL;

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiEnvelope<T>).data as T;
  }

  return payload as T;
}

async function apiFetch<T>(path: string, tags: string[] = ["conteudos"]): Promise<T | null> {
  if (!API_BASE_URL) return null;

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 300, tags },
    });

    if (!response.ok) return null;

    return unwrap<T>((await response.json()) as ApiEnvelope<T>);
  } catch {
    return null;
  }
}

export async function listarConteudosParaSitemap(tipo: ConteudoTipo) {
  const firstPage = await listarConteudosPublicosPage({ tipo, page: 0, size: 50 });
  const pages = await Promise.all(
    Array.from({ length: Math.max(0, firstPage.totalPages - 1) }, (_, index) =>
      listarConteudosPublicosPage({ tipo, page: index + 1, size: 50 }),
    ),
  );

  return [firstPage, ...pages].flatMap((page) => page.content);
}

export async function listarConteudosPublicos(tipo: ConteudoTipo, size = 10) {
  const data = await listarConteudosPublicosPage({ tipo, size });
  return data.content;
}

export async function listarConteudosRelacionados(search: string, size = 6) {
  const params = new URLSearchParams({
    search: search.trim(),
    page: "0",
    size: String(size),
  });
  const data = await apiFetch<ConteudosPage>(`/api/v1/conteudos?${params.toString()}`);
  return normalizeConteudosPage(data).content;
}

export async function listarConteudosPublicosPage({
  tipo,
  search,
  category,
  tag,
  page = 0,
  size = 10,
}: {
  tipo: ConteudoTipo;
  search?: string;
  category?: string;
  tag?: string;
  page?: number;
  size?: number;
}) {
  const params = new URLSearchParams({
    tipo,
    page: String(page),
    size: String(size),
  });

  if (search?.trim()) {
    params.set("search", search.trim());
  }
  if (category?.trim()) params.set("category", category.trim());
  if (tag?.trim()) params.set("tag", tag.trim());

  const data = await apiFetch<ConteudosPage>(`/api/v1/conteudos?${params.toString()}`);
  return normalizeConteudosPage(data);
}

export async function listarConteudosPublicosPageClient({
  tipo,
  search,
  category,
  tag,
  page = 0,
  size = 10,
}: {
  tipo: ConteudoTipo;
  search?: string;
  category?: string;
  tag?: string;
  page?: number;
  size?: number;
}) {
  const response = await api.get("/api/v1/conteudos", {
    params: {
      tipo,
      search: search?.trim() || undefined,
      category: category?.trim() || undefined,
      tag: tag?.trim() || undefined,
      page,
      size,
    },
  });

  return normalizeConteudosPage(unwrapApiData<ConteudosPage>(response.data));
}

export async function listarTaxonomiasPublicasClient(tipo: ConteudoTipo) {
  const [categoriasResponse, tagsResponse] = await Promise.all([
    api.get("/api/v1/categorias/publicas", { params: { tipo } }),
    api.get("/api/v1/tags/publicas", { params: { tipo } }),
  ]);

  return {
    categorias: unwrapApiData<TaxonomiaResumo[]>(categoriasResponse.data),
    tags: unwrapApiData<TaxonomiaResumo[]>(tagsResponse.data),
  };
}

export async function listarDestaques(size = 5) {
  const data = await apiFetch<ConteudosPage>(`/api/v1/conteudos/destaques?page=0&size=${size}`);
  return data?.content ?? [];
}

export async function buscarConteudoPublicado(tipo: ConteudoTipo, slug: string) {
  return apiFetch<ConteudoPortal>(`/api/v1/conteudos/${tipo}/${encodeURIComponent(slug)}`);
}

export async function buscarConteudoPublicadoComFallback(tipo: ConteudoTipo, slugs: readonly string[]) {
  for (const slug of slugs) {
    const conteudo = await buscarConteudoPublicado(tipo, slug);
    if (conteudo) return conteudo;
  }

  return null;
}

export function tipoToPath(tipo: ConteudoTipo) {
  const map: Record<ConteudoTipo, string> = {
    NOTICIA: "/noticias",
    BLOG: "/blog",
    CONCURSO_ABERTO: "/concursos-abertos",
    EDITAL_PREVISTO: "/editais-previstos",
  };

  return map[tipo];
}

export function formatDate(value?: string | null) {
  if (!value) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export function normalizeConteudosPage(data?: ConteudosPage | null): Required<Pick<ConteudosPage, "content">> & {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
} {
  const number = data?.page?.number ?? data?.number ?? 0;
  const size = data?.page?.size ?? data?.size ?? data?.content?.length ?? 0;
  const totalElements = data?.page?.totalElements ?? data?.totalElements ?? data?.content?.length ?? 0;
  const totalPages = data?.page?.totalPages ?? data?.totalPages ?? (size > 0 ? Math.ceil(totalElements / size) : 0);

  return {
    content: data?.content ?? [],
    number,
    size,
    totalElements,
    totalPages,
    first: data?.first ?? (number <= 0),
    last: data?.last ?? (totalPages === 0 || number >= totalPages - 1),
  };
}
