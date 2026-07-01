"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api/api";
import type { ApiComment, BlogComment, PagedResponse } from "../lib/articleTypes";
import { getArrayContent, normalizeComment, formatDate } from "../lib/articleFormatters";
import { createCommentPath, getCommentsPath } from "../lib/articleApi";

type CommentsSectionProps = {
  postSlug: string;
};

const COMMENTS_PAGE_SIZE = 5;

type CommentFormState = {
  authorName: string;
  authorEmail: string;
  content: string;
};

export function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState<CommentFormState>({
    authorName: "",
    authorEmail: "",
    content: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.authorName.trim().length >= 2 &&
      form.authorEmail.trim().length >= 5 &&
      form.content.trim().length >= 5
    );
  }, [form]);

  async function loadComments(nextPage = page) {
    if (!postSlug) return;

    try {
      setLoading(true);
      setError("");

      const response = await api.get<PagedResponse<ApiComment> | ApiComment[]>(
        getCommentsPath(postSlug, nextPage, COMMENTS_PAGE_SIZE)
      );

      const data = response.data;

      setComments(getArrayContent(data).map(normalizeComment));

      if (Array.isArray(data)) {
        setTotalPages(1);
      } else {
        setTotalPages(Math.max(1, data.totalPages ?? 1));
      }
    } catch (err) {
      console.error("Erro ao carregar comentários:", err);
      setError("Não foi possível carregar os comentários aprovados.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComments(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, postSlug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!postSlug || !canSubmit) return;

    try {
      setSending(true);
      setError("");
      setSuccessMessage("");

      await api.post(createCommentPath(postSlug), {
        authorName: form.authorName.trim(),
        authorEmail: form.authorEmail.trim(),
        content: form.content.trim(),
      });

      setForm({
        authorName: "",
        authorEmail: "",
        content: "",
      });

      setSuccessMessage(
        "Comentário enviado com sucesso. Ele aparecerá aqui depois da aprovação."
      );

      setPage(0);
      await loadComments(0);
    } catch (err) {
      console.error("Erro ao enviar comentário:", err);
      setError("Não foi possível enviar seu comentário agora.");
    } finally {
      setSending(false);
    }
  }

  if (!postSlug) {
    return null;
  }

  return (
    <section className="mt-16 rounded-4xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <div className="max-w-3xl">
        <span className="rounded-full bg-soft-blue/30 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-navy">
          Comentários
        </span>

        <h2 className="mt-4 font-heading text-3xl font-black text-ink">
          Participe da conversa
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          Compartilhe sua opinião sobre o artigo. Os comentários passam por moderação
          antes de aparecerem publicamente.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Nome
            </span>

            <input
              type="text"
              value={form.authorName}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  authorName: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-royal focus:bg-white"
              placeholder="Seu nome"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              E-mail
            </span>

            <input
              type="email"
              value={form.authorEmail}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  authorEmail: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-royal focus:bg-white"
              placeholder="seuemail@exemplo.com"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Comentário
          </span>

          <textarea
            value={form.content}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                content: event.target.value,
              }))
            }
            rows={5}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-royal focus:bg-white"
            placeholder="Escreva seu comentário..."
          />
        </label>

        {successMessage && (
          <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
            {successMessage}
          </p>
        )}

        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit || sending}
          className="w-fit rounded-xl bg-navy px-6 py-3 text-sm font-black text-white transition hover:bg-royal disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Enviando..." : "Enviar comentário"}
        </button>
      </form>

      <div className="mt-10 border-t border-slate-200 pt-8">
        <h3 className="font-heading text-2xl font-black text-ink">
          Comentários
        </h3>

        {loading && (
          <div className="mt-6 grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-3xl bg-slate-100"
              />
            ))}
          </div>
        )}

        {!loading && comments.length === 0 && (
          <p className="mt-5 rounded-3xl bg-slate-50 p-5 text-sm font-semibold text-slate-600">
            Ainda não há comentários neste artigo. Seja o primeiro a comentar!
          </p>
        )}

        {!loading && comments.length > 0 && (
          <div className="mt-6 grid gap-4">
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <strong className="text-ink">{comment.authorName}</strong>

                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>

                <p className="mt-3 leading-7 text-slate-700">{comment.content}</p>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setPage(index)}
                className={
                  page === index
                    ? "rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white"
                    : "rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                }
              >
                {index + 1}
              </button>
            ))}

            <button
              type="button"
              disabled={page + 1 >= totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages - 1, current + 1))
              }
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </section>
  );
}