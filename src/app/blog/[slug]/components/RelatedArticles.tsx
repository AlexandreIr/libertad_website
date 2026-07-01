import Link from "next/link";
import type { BlogPost } from "../lib/articleTypes";
import { formatDate } from "../lib/articleFormatters";

type RelatedArticlesProps = {
  posts: BlogPost[];
};

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-heading text-3xl font-black text-ink">
        Leia também
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {posts.map((post) => {
          const firstCategory = post.categories[0];

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex aspect-[16/9] items-center justify-center bg-slate-100">
                {post.coverImageUrl ? (
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-navy via-royal to-soft-blue" />
                )}
              </div>

              <div className="p-6">
                {firstCategory && (
                  <span className="rounded-full bg-soft-blue/30 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-navy">
                    {firstCategory.name}
                  </span>
                )}

                <p className="mt-4 text-sm text-slate-500">
                  {formatDate(post.publishedAt)}
                </p>

                <h3 className="mt-2 font-heading text-xl font-black leading-tight text-ink transition group-hover:text-royal">
                  {post.title}
                </h3>

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
        })}
      </div>
    </section>
  );
}