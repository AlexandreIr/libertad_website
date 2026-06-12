import Link from 'next/link';

export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
      <Link href="/" className="font-semibold text-royal">Home</Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span>/</span>
          {item.href ? <Link href={item.href} className="font-semibold text-royal">{item.label}</Link> : <span className="font-semibold text-ink">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
