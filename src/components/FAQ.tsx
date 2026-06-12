export function FAQ({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <details key={item.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-black text-ink marker:hidden">
            {item.question}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soft-blue/30 text-navy transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
