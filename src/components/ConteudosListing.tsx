"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./Button";
import { EditorialCard, EditorialListItem } from "./EditorialCards";
import { EmptyState } from "./EmptyState";
import { Skeleton } from "./Skeleton";
import { getApiErrorMessage } from "@/services/api";
import {
  listarConteudosPublicosPageClient,
  listarTaxonomiasPublicasClient,
} from "@/services/conteudosService";
import { pluralizeSearchResults } from "@/services/editorial";
import type { ConteudoTipo, TaxonomiaResumo } from "@/types/conteudos";
import styles from "./ConteudosListing.module.css";

const PAGE_SIZE = 9;

type UrlUpdate = {
  search?: string;
  category?: string;
  tag?: string;
  page?: number;
};

function findTaxonomia(items: TaxonomiaResumo[] | undefined, slug: string) {
  return items?.find((item) => item.slug === slug);
}

export function ConteudosListing({
  title,
  description,
  tipo,
  emptyTitle,
  emptyDescription,
  searchPlaceholder,
}: {
  title: string;
  description: string;
  tipo: ConteudoTipo;
  emptyTitle: string;
  emptyDescription: string;
  searchPlaceholder: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") ?? "";
  const urlCategory = searchParams.get("category") ?? "";
  const urlTag = searchParams.get("tag") ?? "";
  const pageParam = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const [searchValue, setSearchValue] = useState(urlSearch);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const updateUrl = useCallback((updates: UrlUpdate, scroll = true) => {
    const params = new URLSearchParams(searchParams.toString());
    const values = {
      search: updates.search ?? urlSearch,
      category: updates.category ?? urlCategory,
      tag: updates.tag ?? urlTag,
      page: updates.page ?? currentPage,
    };

    (["search", "category", "tag"] as const).forEach((key) => {
      const value = values[key].trim();
      if (value) params.set(key, value);
      else params.delete(key);
    });

    if (values.page > 1) params.set("page", String(values.page));
    else params.delete("page");

    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll });

    if (scroll) {
      window.requestAnimationFrame(() => {
        document.getElementById("conteudos-listagem")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [currentPage, pathname, router, searchParams, urlCategory, urlSearch, urlTag]);

  const query = useQuery({
    queryKey: ["conteudos-publicos", tipo, urlSearch, urlCategory, urlTag, currentPage],
    queryFn: () => listarConteudosPublicosPageClient({
      tipo,
      search: urlSearch,
      category: urlCategory,
      tag: urlTag,
      page: currentPage - 1,
      size: PAGE_SIZE,
    }),
    placeholderData: (previous) => previous,
  });

  const taxonomiasQuery = useQuery({
    queryKey: ["taxonomias-publicas", tipo],
    queryFn: () => listarTaxonomiasPublicasClient(tipo),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchValue === urlSearch) return;
      updateUrl({ search: searchValue, page: 1 }, false);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [searchValue, updateUrl, urlSearch]);

  const data = query.data;
  const [principal, ...restantes] = data?.content ?? [];
  const selectedCategory = findTaxonomia(taxonomiasQuery.data?.categorias, urlCategory);
  const selectedTag = findTaxonomia(taxonomiasQuery.data?.tags, urlTag);
  const taxonomyFilterCount = Number(Boolean(urlCategory)) + Number(Boolean(urlTag));
  const hasFilters = Boolean(urlSearch || urlCategory || urlTag);

  const countText = useMemo(
    () => pluralizeSearchResults(data?.totalElements ?? 0, urlSearch),
    [data?.totalElements, urlSearch],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateUrl({ search: searchValue, page: 1 });
  }

  function clearAllFilters() {
    setSearchValue("");
    updateUrl({ search: "", category: "", tag: "", page: 1 });
  }

  function removeSearch() {
    setSearchValue("");
    updateUrl({ search: "", page: 1 });
  }

  return (
    <section id="conteudos-listagem" className="container section">
      <div className="sectionHeader">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {data ? <span className={styles.count}>{countText}</span> : null}
      </div>

      <form className={styles.searchBox} onSubmit={handleSubmit}>
        <label className={`field ${styles.searchField}`}>
          <span className="label">Pesquisar publicações</span>
          <input
            className="input"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder={searchPlaceholder}
            autoComplete="off"
          />
        </label>

        <button
          className={styles.filterToggle}
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="filtros-editoriais"
          onClick={() => setFiltersOpen((current) => !current)}
        >
          <span>Filtros</span>
          {taxonomyFilterCount > 0 ? <strong>{taxonomyFilterCount}</strong> : null}
        </button>

        <div id="filtros-editoriais" className={`${styles.filterFields} ${filtersOpen ? styles.filtersOpen : ""}`}>
          <label className="field">
            <span className="label">Categoria</span>
            <select
              className="input"
              value={urlCategory}
              disabled={taxonomiasQuery.isLoading}
              onChange={(event) => updateUrl({ category: event.target.value, page: 1 }, false)}
            >
              <option value="">Todas as categorias</option>
              {taxonomiasQuery.data?.categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.slug}>{categoria.nome}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="label">Tag</span>
            <select
              className="input"
              value={urlTag}
              disabled={taxonomiasQuery.isLoading}
              onChange={(event) => updateUrl({ tag: event.target.value, page: 1 }, false)}
            >
              <option value="">Todas as tags</option>
              {taxonomiasQuery.data?.tags.map((tag) => (
                <option key={tag.id} value={tag.slug}>{tag.nome}</option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.searchActions}>
          <Button type="submit">Buscar</Button>
          {hasFilters ? <Button type="button" variant="ghost" onClick={clearAllFilters}>Limpar filtros</Button> : null}
        </div>
      </form>

      {taxonomiasQuery.error ? (
        <div className={styles.filterError} role="status">
          <span>Não foi possível carregar as opções de filtro.</span>
          <button type="button" onClick={() => taxonomiasQuery.refetch()}>Tentar novamente</button>
        </div>
      ) : null}

      {hasFilters ? (
        <div className={styles.activeFilters} aria-label="Filtros ativos">
          <span>Filtros ativos</span>
          {urlSearch ? <button type="button" onClick={removeSearch}>Busca: {urlSearch}<b aria-hidden="true">×</b></button> : null}
          {urlCategory ? (
            <button type="button" onClick={() => updateUrl({ category: "", page: 1 }, false)}>
              {selectedCategory?.nome ?? urlCategory}<b aria-hidden="true">×</b>
            </button>
          ) : null}
          {urlTag ? (
            <button type="button" onClick={() => updateUrl({ tag: "", page: 1 }, false)}>
              {selectedTag?.nome ?? urlTag}<b aria-hidden="true">×</b>
            </button>
          ) : null}
        </div>
      ) : null}

      {query.isLoading ? (
        <div className={styles.loadingGrid}>
          <Skeleton variant="card" count={3} />
        </div>
      ) : null}

      {query.error ? (
        <EmptyState
          title="Não foi possível carregar os conteúdos agora"
          description={getApiErrorMessage(query.error, "Tente novamente em instantes.")}
          actionLabel="Tentar novamente"
          onAction={() => query.refetch()}
        />
      ) : null}

      {!query.isLoading && !query.error && data?.content.length === 0 ? (
        <EmptyState
          title={hasFilters ? "Nenhuma publicação encontrada" : emptyTitle}
          description={hasFilters
            ? "Nenhuma publicação foi encontrada com os filtros selecionados."
            : emptyDescription}
          actionLabel={hasFilters ? "Limpar filtros" : undefined}
          onAction={hasFilters ? clearAllFilters : undefined}
        />
      ) : null}

      {data && data.content.length > 0 ? (
        <div className={query.isFetching ? styles.dimmed : undefined}>
          {principal ? <div className={styles.featuredGrid}><EditorialCard conteudo={principal} /></div> : null}
          {restantes.length > 0 ? (
            <div className={styles.list}>
              {restantes.map((conteudo) => <EditorialListItem key={conteudo.id} conteudo={conteudo} />)}
            </div>
          ) : null}
        </div>
      ) : null}

      {data && data.totalPages > 1 ? (
        <nav className={styles.pagination} aria-label="Paginação">
          <Button type="button" variant="secondary" disabled={data.first} onClick={() => updateUrl({ page: currentPage - 1 })}>Anterior</Button>
          <span>Página {data.number + 1} de {data.totalPages}</span>
          <Button type="button" variant="secondary" disabled={data.last} onClick={() => updateUrl({ page: currentPage + 1 })}>Próxima</Button>
        </nav>
      ) : null}
    </section>
  );
}
