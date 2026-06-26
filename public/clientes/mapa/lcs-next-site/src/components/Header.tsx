'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/site';
import { Button } from '@/components/Button';
import { cn } from '@/lib/cn';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="h-1 bg-gradient-to-r from-red via-red to-navy" />
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Ir para a página inicial">
          <Image
            src="/brand/lcs-logo.png"
            alt="LCS — Libertad Comercial e Serviços"
            width={105}
            height={102}
            priority
            className="h-14 w-16 object-contain object-left"
          />
          <span className="hidden leading-tight sm:block">
            <span className="block font-heading text-2xl tracking-[0.35em] text-ink">LCS</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Libertad Comercial e Serviços
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm font-semibold text-slate-700 transition hover:text-royal',
                  active && 'text-navy',
                )}
              >
                {item.label}
                {active ? <span className="absolute -bottom-3 left-0 h-0.5 w-full rounded-full bg-royal" /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="https://wa.me/5511987654321" variant="secondary" className="py-2.5">
            WhatsApp
          </Button>
          <Button href="/orcamento" className="py-2.5">
            Solicitar orçamento
          </Button>
        </div>

        <details className="group lg:hidden">
          <summary className="list-none rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-navy marker:hidden">
            Menu
          </summary>
          <div className="absolute left-4 right-4 top-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-sm font-bold text-slate-700 hover:bg-soft-blue/20">
                  {item.label}
                </Link>
              ))}
              <Button href="/orcamento" className="mt-2 w-full">
                Solicitar orçamento
              </Button>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
