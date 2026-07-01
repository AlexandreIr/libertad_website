"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { api } from "@/lib/api/api";

type Category = {
  id?: number;
  name: string;
  slug?: string;
};

type ApiPost = {
  id?: number;
  title?: string;
  slug?: string;

  summary?: string;
  sumary?: string;
  excerpt?: string;
  content?: string;

  coverImageUrl?: string;
  coverImage?: string;
  image?: string;

  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  readTime?: string;
  readingTime?: string;

  category?: Category;
  categories?: Category[] | Category;
};

type BlogPost = {
  id?: number;
  title: string;
  slug: string;
  summary: string;
  coverImageUrl: string;
  publishedAt: string;
  readTime: string;
  categories: Category[];
};

type PagedResponse<T> = {
  content?: T[];
  totalElements?: number;
  totalPages?: number;
  page?: number;
  size?: number;
};

const PAGE_SIZE = 7;

function getArrayContent<T>(data: PagedResponse<T> | T[] | undefined): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.content ?? [];
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function normalizeCategories(post: ApiPost): Category[] {
  if (Array.isArray(post.categories)) return post.categories;

  if (post.categories && !Array.isArray(post.categories)) {
    return [post.categories];
  }

  if (post.category) return [post.category];

  return [];
}

function estimateReadTime(post: ApiPost, summary: string): string {
  if (post.readTime) return post.readTime;
  if (post.readingTime) return post.readingTime;

  const baseText = `${post.title ?? ""} ${summary} ${post.content ?? ""}`;
  const words = baseText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min de leitura`;
}

function normalizePost(post: ApiPost): BlogPost | null {
  if (!post.title || !post.slug) return null;

  const summary = post.summary ?? post.sumary ?? post.excerpt ?? "";
  const publishedAt = post.publishedAt ?? post.createdAt ?? post.updatedAt ?? "";
  const coverImageUrl = post.coverImageUrl ?? post.coverImage ?? post.image ?? "";

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary,
    coverImageUrl,
    publishedAt,
    readTime: estimateReadTime(post, summary),
    categories: normalizeCategories(post),
  };
}

function getCategoryKey(category: Category): string {
  return category.slug?.trim() || category.name.trim();
}

function formatDate(date: string): string {
  if (!date) return "Data não informada";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function buildPaginationItems(
  currentPage: number,
  totalPages: number
): Array<number | string> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  const validPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items: Array<number | string> = [];

  validPages.forEach((page, index) => {
    const previous = validPages[index - 1];

    if (previous && page - previous > 1) {
      items.push(`ellipsis-${page}`);
    }

    items.push(page);
  });

  return items;
}

function ArticleImage({
  src,
  title,
  featured = false,
}: {
  src: string;
  title: string;
  featured?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={
          featured
            ? "min-h-[260px] bg-gradient-to-br from-navy via-royal to-soft-blue"
            : "h-52 bg-gradient-to-br from-navy via-royal to-soft-blue"
        }
      />
    );
  }

  return (
    <div
      className={
        featured
          ? "flex min-h-[260px] items-center justify-center bg-slate-100"
          : "flex h-52 items-center justify-center bg-slate-100"
      }
    >
      <img
        src={src}
        alt={title}
        loading={featured ? "eager" : "lazy"}
        className="h-full w-full object-contain p-2"
      />
    </div>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  const firstCategory = post.categories[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl"
    >
      <ArticleImage src={post.coverImageUrl} title={post.title} />

      <div className="p-6">
        {firstCategory && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-navy">
            {firstCategory.name}
          </span>
        )}

        <p className="mt-4 text-sm text-slate-500">{formatDate(post.publishedAt)}</p>

        <h2 className="mt-2 font-heading text-xl font-black leading-tight text-ink transition group-hover:text-royal">
          {post.title}
        </h2>

        {post.summary && (
          <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
            {post.summary}
          </p>
        )}

        <p className="mt-5 text-sm font-bold text-navy">
          Equipe LCS • {post.readTime}
        </p>
      </div>
    </Link>
  );
}

function FeaturedArticle({ post }: { post: BlogPost }) {
  const firstCategory = post.categories[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-[0.55fr_0.45fr]"
    >
      <ArticleImage src={post.coverImageUrl} title={post.title} featured />

      <div className="p-8">
        <span className="rounded-full bg-navy px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
          Destaque
        </span>

        <p className="mt-5 text-sm text-slate-500">
          {formatDate(post.publishedAt)}
          {firstCategory ? ` • ${firstCategory.name}` : ""}
        </p>

        <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-ink">
          {post.title}
        </h2>

        {post.summary && (
          <p className="mt-4 leading-7 text-slate-600">{post.summary}</p>
        )}

        <p className="mt-6 text-sm font-bold text-navy">
          Equipe LCS • {post.readTime}
        </p>
      </div>
    </Link>
  );
}

export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadBlogData() {
      try {
        setLoading(true);
        setError("");

        const [postsResponse, categoriesResponse] = await Promise.all([
          api.get<PagedResponse<ApiPost> | ApiPost[]>("/posts", {
            params: {
              page: 0,
              size: 1000,
              sort: "publishedAt,desc",
            },
            signal: controller.signal,
          }),
          api.get<PagedResponse<Category> | Category[]>("/api/categories", {
            signal: controller.signal,
          }),
        ]);

        const normalizedPosts = getArrayContent(postsResponse.data)
          .map(normalizePost)
          .filter((post): post is BlogPost => Boolean(post))
          .sort((a, b) => {
            const dateA = new Date(a.publishedAt).getTime() || 0;
            const dateB = new Date(b.publishedAt).getTime() || 0;
            return dateB - dateA;
          });

        const normalizedCategories = getArrayContent(categoriesResponse.data).filter(
          (category) => category.name?.trim()
        );

        setPosts(normalizedPosts);
        setCategories(normalizedCategories);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Erro ao carregar blog:", err);
        setError("Não foi possível carregar os artigos do blog agora.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadBlogData();

    return () => {
      controller.abort();
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    posts.forEach((post) => {
      post.categories.forEach((category) => {
        const key = getCategoryKey(category);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      });
    });

    return counts;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return posts.filter((post) => {
      const postCategoryKeys = post.categories.map(getCategoryKey);

      const matchesCategory =
        selectedCategory === "all" || postCategoryKeys.includes(selectedCategory);

      const searchableText = normalizeText(
        [
          post.title,
          post.summary,
          post.publishedAt,
          ...post.categories.map((category) => category.name),
        ].join(" ")
      );

      const matchesSearch =
        !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [posts, search, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, currentPage]);

  const featuredPost = paginatedPosts[0];
  const gridPosts = paginatedPosts.slice(1);

  const paginationItems = useMemo(
    () => buildPaginationItems(currentPage, totalPages),
    [currentPage, totalPages]
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleCategoryChange(categoryKey: string) {
    setSelectedCategory(categoryKey);
    setCurrentPage(1);
  }

  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: "Blog" }]} />

          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
              Insights sobre facilities, terceirização e{" "}
              <span className="text-royal">gestão operacional</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Conteúdos práticos e atualizados para ajudar empresas e condomínios
              a tomarem decisões mais inteligentes todos os dias.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-y bg-page pt-10">
        <Container>
          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
            <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                  Pesquisar artigo
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Busque por título, resumo ou categoria..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-ink outline-none transition placeholder:text-slate-400 focus:border-royal focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                  Categoria
                </span>

                <select
                  value={selectedCategory}
                  onChange={(event) => handleCategoryChange(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-ink outline-none transition focus:border-royal focus:bg-white"
                >
                  <option value="all">Todas as categorias</option>

                  {categories.map((category) => {
                    const key = getCategoryKey(category);

                    return (
                      <option key={key} value={key}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            {(search || selectedCategory !== "all") && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-slate-500">
                  {filteredPosts.length} resultado
                  {filteredPosts.length === 1 ? "" : "s"} encontrado
                  {filteredPosts.length === 1 ? "" : "s"}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-navy transition hover:bg-slate-200"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <div className="mb-8 flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-card">
                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className={
                    selectedCategory === "all"
                      ? "rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white"
                      : "rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-navy"
                  }
                >
                  Todos
                </button>

                {categories.length > 0 ? (
                  categories.map((category) => {
                    const key = getCategoryKey(category);
                    const count = categoryCounts.get(key) ?? 0;

                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => handleCategoryChange(key)}
                        className={
                          selectedCategory === key
                            ? "rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white"
                            : "rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-navy"
                        }
                      >
                        {category.name}
                        {count > 0 ? ` (${count})` : ""}
                      </button>
                    );
                  })
                ) : (
                  <span className="px-4 py-3 text-sm font-semibold text-slate-500">
                    Nenhuma categoria encontrada.
                  </span>
                )}
              </div>

              {loading && (
                <div className="grid gap-5">
                  <div className="h-[340px] animate-pulse rounded-3xl bg-slate-200" />
                  <div className="grid gap-5 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-[330px] animate-pulse rounded-3xl bg-slate-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {!loading && error && (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                  <h2 className="font-heading text-2xl font-black text-red-700">
                    Erro ao carregar artigos
                  </h2>

                  <p className="mt-3 text-sm font-semibold text-red-600">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-6 rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-800"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              {!loading && !error && !featuredPost && (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card">
                  <h2 className="font-heading text-2xl font-black text-ink">
                    Nenhum artigo encontrado
                  </h2>

                  <p className="mt-3 text-slate-600">
                    Tente buscar por outro termo ou selecionar outra categoria.
                  </p>
                </div>
              )}

              {!loading && !error && featuredPost && (
                <>
                  <FeaturedArticle post={featuredPost} />

                  {gridPosts.length > 0 && (
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                      {gridPosts.map((post) => (
                        <ArticleCard key={post.slug} post={post} />
                      ))}
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="mt-10 flex flex-wrap justify-center gap-2">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage((page) => Math.max(1, page - 1))
                        }
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Anterior
                      </button>

                      {paginationItems.map((item) => {
                        if (typeof item === "string") {
                          return (
                            <span
                              key={item}
                              className="rounded-lg px-4 py-2 text-sm font-bold text-slate-400"
                            >
                              ...
                            </span>
                          );
                        }

                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => setCurrentPage(item)}
                            className={
                              currentPage === item
                                ? "rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white"
                                : "rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                            }
                          >
                            {item}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                          setCurrentPage((page) => Math.min(totalPages, page + 1))
                        }
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Próxima
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="font-heading text-xl font-black text-ink">
                  Categorias
                </h2>

                <div className="mt-5 grid gap-4 text-sm font-semibold text-slate-700">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange("all")}
                    className="flex justify-between border-b border-slate-100 pb-3 text-left transition hover:text-royal"
                  >
                    <span>Todas</span>
                    <span>{posts.length}</span>
                  </button>

                  {categories.length > 0 ? (
                    categories.map((category) => {
                      const key = getCategoryKey(category);
                      const count = categoryCounts.get(key) ?? 0;

                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => handleCategoryChange(key)}
                          className="flex justify-between border-b border-slate-100 pb-3 text-left transition hover:text-royal"
                        >
                          <span>{category.name}</span>
                          <span>{count}</span>
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-sm text-slate-500">
                      Nenhuma categoria cadastrada.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="font-heading text-xl font-black text-ink">
                  Artigos recentes
                </h2>

                <div className="mt-5 grid gap-4">
                  {posts.slice(0, 5).map((post, index) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex gap-3 text-sm font-semibold text-slate-700 hover:text-royal"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-xs text-white">
                        {index + 1}
                      </span>

                      <span>{post.title}</span>
                    </Link>
                  ))}

                  {!loading && posts.length === 0 && (
                    <p className="text-sm text-slate-500">
                      Nenhum artigo publicado ainda.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}