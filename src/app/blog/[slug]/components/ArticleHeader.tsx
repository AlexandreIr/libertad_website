import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { Icon } from "@/components/Icon";
import type { BlogPost } from "../lib/articleTypes";
import { formatDate } from "../lib/articleFormatters";

type ArticleHeaderProps = {
  post: BlogPost;
};

export function ArticleHeader({ post }: ArticleHeaderProps) {
  const firstCategory = post.categories[0];

  return (
    <section className="geometric-bg py-16 lg:py-20">
      <Container>
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <div className="max-w-4xl">
          <div className="mb-5 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
            {firstCategory && (
              <span className="rounded-full bg-soft-blue/30 px-3 py-1 text-navy">
                {firstCategory.name}
              </span>
            )}

            <span>{post.readTime}</span>
          </div>

          <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>

          {post.summary && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {post.summary}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <span className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-bold text-white">
                L
              </span>

              Por <strong className="text-ink">Equipe LCS</strong>
            </span>

            <span className="inline-flex items-center gap-2">
              <Icon name="clock" className="h-5 w-5 text-royal" />
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}