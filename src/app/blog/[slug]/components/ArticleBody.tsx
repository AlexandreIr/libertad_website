import { ArticleCover } from "./ArticleCover";

type ArticleBodyProps = {
  title: string;
  coverImageUrl: string;
  html: string;
};

export function ArticleBody({ title, coverImageUrl, html }: ArticleBodyProps) {
  return (
    <article className="prose-content article-content max-w-none">
      <ArticleCover src={coverImageUrl} title={title} />

      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p>
          Este artigo ainda não possui conteúdo cadastrado. Revise o post no painel
          administrativo e preencha o corpo do texto.
        </p>
      )}
    </article>
  );
}