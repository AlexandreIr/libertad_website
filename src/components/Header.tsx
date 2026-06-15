'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, siteConfig, services, segments } from '@/data/site';
import { Button } from '@/components/Button';
import { cn } from '@/lib/cn';
import { useState, useRef, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<'services' | 'segments' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur opacity-96">
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
            <span className="block text-2xl tracking-[0.35em] text-ink font-['Times_new_Roman']">L
              <span className="text-red">C</span>S</span>
            <span className="block text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Libertad Comercial e Serviços
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex relative" aria-label="Navegação principal" ref={dropdownRef}>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isServicesDropdown = item.label === 'Serviços';
            const isSegmentsDropdown = item.label === 'Segmentos';

            if (isServicesDropdown || isSegmentsDropdown) {
              return (
                <div key={item.href} className="relative group">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === (isServicesDropdown ? 'services' : 'segments') ? null : (isServicesDropdown ? 'services' : 'segments'))}
                    className={cn(
                      'relative text-sm font-semibold text-slate-700 transition hover:text-royal flex items-center gap-1.5 cursor-pointer hover:scale-110',
                      active && 'text-navy',
                    )}
                  >
                    {item.label}
                    <svg
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        openDropdown === (isServicesDropdown ? 'services' : 'segments') && 'rotate-180'
                      )}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </button>

                  {openDropdown === (isServicesDropdown ? 'services' : 'segments') && (
                    <div className="absolute left-0 mt-0 w-56 rounded-lg border border-slate-200 bg-white shadow-lg z-50">
                      <div className="p-2">
                        {(isServicesDropdown ? services : segments).map((item) => (
                          <Link
                            key={item.slug}
                            href={`${isServicesDropdown ? '/servicos' : '/segmentos'}/${item.slug}`}
                            onClick={() => setOpenDropdown(null)}
                            className="block rounded-md px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm font-semibold text-slate-700 transition hover:text-royal cursor-pointer hover:scale-110',
                  active && 'text-navy',
                )}
                onClick={() => setOpenDropdown(null)}
              >
                {item.label}
                {active ? <span className="absolute -bottom-3 left-0 h-0.5 w-full rounded-full bg-royal" /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={`https://wa.me/+55${siteConfig.whatsapp.replace(/\D/g, '')}`} variant="secondary" className="py-2.5">
            WhatsApp
          </Button>
          <Button
            href="/orcamento"
            className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 cursor-pointer"
          >
            <span className="relative z-10">Solicitar orçamento</span>

            <div className="pointer-events-none absolute inset-0 flex h-full w-full justify-center animate-[shine_2.8s_linear_infinite]">
               <div className="h-full w-30 bg-white/20 blur-sm -skew-x-12" />
            </div>
          </Button>      
        </div>

        <details className="group lg:hidden">
          <summary className="list-none rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-navy marker:hidden">
            Menu
          </summary>
          <div className="absolute left-4 right-4 top-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <nav className="grid gap-1">
              {navItems.map((item) => {
                const isServicesDropdown = item.label === 'Serviços';
                const isSegmentsDropdown = item.label === 'Segmentos';

                if (isServicesDropdown || isSegmentsDropdown) {
                  return (
                    <details key={item.href} className="group/sub">
                      <summary className="list-none rounded-xl px-3 py-3 text-sm font-bold text-slate-700 hover:bg-soft-blue/20 marker:hidden cursor-pointer flex items-center justify-between">
                        {item.label}
                        <svg className="h-4 w-4 transition-transform group-open/sub:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                      </summary>
                      <div className="grid gap-1 bg-slate-50 rounded-lg p-2 ml-2 mt-1">
                        {(isServicesDropdown ? services : segments).map((subItem) => (
                          <Link
                            key={subItem.slug}
                            href={`${isServicesDropdown ? '/servicos' : '/segmentos'}/${subItem.slug}`}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </details>
                  );
                }

                return (
                  <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-sm font-bold text-slate-700 hover:bg-soft-blue/20">
                    {item.label}
                  </Link>
                );
              })}
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
