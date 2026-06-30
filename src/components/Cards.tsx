import Link from 'next/link';
import type { IconName } from '@/data/site';
import { Icon, IconBadge } from '@/components/Icon';

export function ServiceCard({
  title,
  text,
  icon,
  href,
}: {
  title: string;
  text: string;
  icon: IconName;
  href: string;
}) {
  return (
    <Link href={href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-royal/40 hover:shadow-xl">
      <IconBadge name={icon} />
      <h3 className="mt-5 font-heading text-xl font-black text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
      <span className="mt-5 inline-flex text-xl font-black text-red transition group-hover:translate-x-1">→</span>
    </Link>
  );
}

export function SegmentCard({
  title,
  text,
  icon,
  href,
}: {
  title: string;
  text: string;
  icon: IconName;
  href: string;
}) {
  return (
    <Link href={href} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-40 bg-linear-to-br from-navy via-royal to-soft-blue">
        <div className="absolute -right-10 -top-10 h-32 w-32 rotate-45 bg-white/20" />
        <div className="absolute left-6 top-6 grid h-16 w-16 place-items-center rounded-2xl bg-white/95 text-royal shadow-lg">
          <Icon name={icon} className="h-8 w-8" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-black text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
        <span className="mt-5 inline-flex text-xl font-black text-red transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}

export function BenefitCard({ title, text, icon }: { title: string; text: string; icon: IconName }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <IconBadge name={icon} />
      <h3 className="mt-4 font-heading text-lg font-black text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

export function PostCard({
  title,
  category,
  date,
  excerpt,
  href,
}: {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  href: string;
}) {
  return (
    <Link href={href} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-44 bg-linear-to-br from-slate-200 via-soft-blue/50 to-royal/70" />
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <span className="rounded-full bg-soft-blue/30 px-3 py-1 text-navy">{category}</span>
          <span>{date}</span>
        </div>
        <h3 className="mt-4 font-heading text-xl font-black leading-tight text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{excerpt}</p>
        <span className="mt-5 inline-flex text-xl font-black text-red transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
