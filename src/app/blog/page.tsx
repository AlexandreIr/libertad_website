import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PostCard } from "@/components/Cards";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { posts } from "@/data/site";
import { api } from "@/lib/api/api";

export const metadata: Metadata = {
  title: "Blog sobre facilities e gestão operacional",
  description:
    "Conteúdos sobre facilities, terceirização, limpeza profissional, condomínios e gestão operacional.",
};

type Category = {
  id?: number;
  name: string;
  slug?: string;
};

type PagedResponse<T> = {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  page?: number;
  size?: number;
};

async function getCategories(): Promise<Category[]> {
  try {
    const response = await api.get<PagedResponse<Category> | Category[]>(
      "/api/categories"
    );

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data.content ?? [];
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    return [];
  }
}

export default async function BlogPage() {
  const featured = posts[0];
  const categories = await getCategories();

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
              Conteúdos práticos e atualizados para ajudar empresas e
              condomínios a tomarem decisões mais inteligentes todos os dias.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-y bg-page pt-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <Link
                href={`/blog/${featured.slug}`}
                className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-[0.55fr_0.45fr]"
              >
                <div className="min-h-17.5 bg-linear-to-br from-navy via-royal to-soft-blue" />

                <div className="p-8">
                  <span className="rounded-full bg-navy px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
                    Destaque
                  </span>

                  <p className="mt-5 text-sm text-slate-500">
                    {featured.date}
                  </p>

                  <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-ink">
                    {featured.title}
                  </h2>

                  <p className="mt-4 leading-7 text-slate-600">
                    {featured.excerpt}
                  </p>

                  <p className="mt-6 text-sm font-bold text-navy">
                    Equipe LCS • {featured.readTime}
                  </p>
                </div>
              </Link>

              <div className="mt-8 flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-card">
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <Link
                      key={category.slug ?? category.name}
                      href={
                        category.slug
                          ? `/api/categories/${category.slug}`
                          : "#"
                      }
                      className={
                        index === 0
                          ? "rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white"
                          : "rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-navy"
                      }
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <span className="px-4 py-3 text-sm font-semibold text-slate-500">
                    Nenhuma categoria encontrada.
                  </span>
                )}
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {posts.slice(1).map((post) => (
                  <PostCard
                    key={post.slug}
                    {...post}
                    href={`/blog/${post.slug}`}
                  />
                ))}
              </div>

              <div className="mt-10 flex justify-center gap-2">
                {["Anterior", "1", "2", "3", "Próxima"].map((item, index) => (
                  <button
                    key={item}
                    className={
                      index === 1
                        ? "rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white"
                        : "rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600"
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="font-heading text-xl font-black text-ink">
                  Categorias
                </h2>

                <div className="mt-5 grid gap-4 text-sm font-semibold text-slate-700">
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <Link
                        key={category.slug ?? category.name}
                        href={
                          category.slug
                            ? `/blog/categoria/${category.slug}`
                            : "#"
                        }
                        className="flex justify-between border-b border-slate-100 pb-3 transition hover:text-royal"
                      >
                        <span>{category.name}</span>
                        <span>{18 - index} artigos</span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      Nenhuma categoria cadastrada.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="font-heading text-xl font-black text-ink">
                  Artigos mais lidos
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

                      {post.title}
                    </Link>
                  ))}
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