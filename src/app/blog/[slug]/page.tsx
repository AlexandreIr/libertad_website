import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";

import { ArticleBody } from "./components/ArticleBody";
import { ArticleHeader } from "./components/ArticleHeader";
import { ArticleSidebar } from "./components/ArticleSidebar";
import { CommentsSection } from "./components/CommentSection";
import { RelatedArticles } from "./components/RelatedArticles";

import { getAllPosts, getPostBySlug, revalidate } from "./lib/articleApi";
import { prepareArticleHtml, stripHtml } from "./lib/articleFormatters";


type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado",
    };
  }

  const description = post.summary || stripHtml(post.content).slice(0, 155);

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
  ]);

  if (!post) notFound();

  const { html, headings } = prepareArticleHtml(post.content);

  const firstCategory = post.categories[0];

  const sameCategoryPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!firstCategory) return false;

      return item.categories.some(
        (category) =>
          category.slug === firstCategory.slug ||
          category.name === firstCategory.name
      );
    });

  const fallbackPosts = allPosts.filter((item) => item.slug !== post.slug);

  const relatedPosts =
    sameCategoryPosts.length >= 3
      ? sameCategoryPosts.slice(0, 3)
      : [
          ...sameCategoryPosts,
          ...fallbackPosts.filter(
            (item) => !sameCategoryPosts.some((same) => same.slug === item.slug)
          ),
        ].slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    author: {
      "@type": "Organization",
      name: "Equipe LCS",
    },
    publisher: {
      "@type": "Organization",
      name: "LCS",
    },
    datePublished: post.publishedAt || undefined,
    mainEntityOfPage: `/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      <ArticleHeader post={post} />

      <section className="bg-white pb-20 pt-10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <ArticleBody
                title={post.title}
                coverImageUrl={post.coverImageUrl}
                html={html}
              />

              <CommentsSection postSlug={post.slug} />

              <RelatedArticles posts={relatedPosts} />
            </div>

            <ArticleSidebar headings={headings} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}