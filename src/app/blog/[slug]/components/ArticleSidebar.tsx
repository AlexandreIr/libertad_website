import { Button } from "@/components/Button";
import type { HeadingItem } from "../lib/articleTypes";

type ArticleSidebarProps = {
  headings: HeadingItem[];
};

export function ArticleSidebar({ headings }: ArticleSidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="font-heading text-xl font-black text-ink">
          Neste artigo
        </h2>

        {headings.length > 0 ? (
          <ol className="mt-5 grid gap-3 text-sm leading-6 text-slate-700">
            {headings.map((heading) => (
  <li
    key={heading.id}
    className={
      heading.level >= 4
        ? "pl-8 text-xs text-slate-400"
        : heading.level === 3
          ? "pl-4 text-slate-500"
          : "text-slate-700"
    }
  >
    <a href={`#${heading.id}`} className="transition hover:text-royal">
      <span className="mr-1 font-black text-navy">{heading.number}.</span>
      {heading.text}
    </a>
  </li>
))}
          </ol>
        ) : (
          <p className="mt-5 text-sm leading-6 text-slate-700">
            Leia o conteúdo completo e veja os principais pontos do artigo.
          </p>
        )}

        <Button href="/orcamento" className="mt-6 w-full">
          Falar com especialista
        </Button>
      </div>
    </aside>
  );
}