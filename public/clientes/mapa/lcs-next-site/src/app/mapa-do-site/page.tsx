import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { Icon } from '@/components/Icon';
import { siteConfig } from '@/data/site';
import { getFlatSiteMapLinks, getSiteMapGroups, type SiteMapGroup } from '@/lib/site-map';

export const metadata: Metadata = {
  title: 'Mapa do Site',
  description:
    'Encontre rapidamente as páginas, serviços, segmentos e artigos do blog da LCS — Libertad Comercial e Serviços.',
  alternates: {
    canonical: '/mapa-do-site',
  },
  openGraph: {
    title: 'Mapa do Site | LCS',
    description:
      'Índice navegável com as principais páginas, serviços, segmentos e artigos do site da LCS.',
    url: `${siteConfig.url}/mapa-do-site`,
  },
};

export default function SiteMapPage() {
  const groups = getSiteMapGroups();
  const totalLinks = getFlatSiteMapLinks({ includeVisualOnly: true }).length;

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Mapa do Site',
    url: `${siteConfig.url}/mapa-do-site`,
    description: metadata.description,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <section className="geometric-bg border-b border-slate-200 py-16 sm:py-20 lg:py-24">
        <Container>
          <Breadcrumb items={[{ label: 'Mapa do Site' }]} />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-soft-blue/30 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-navy">
                Navegação completa
              </span>
              <h1 className="mt-6 max-w-4xl font-heading text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">
                Mapa do Site da <span className="text-royal">LCS</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Encontre rapidamente páginas institucionais, soluções por serviço, segmentos atendidos e artigos do blog em uma estrutura clara, modular e preparada para crescer junto com o site.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-navy p-8 text-white shadow-2xl">
              <div className="absolute -right-16 -top-16 h-44 w-44 rotate-45 bg-royal/40" />
              <div className="absolute -bottom-20 -left-20 h-52 w-52 rotate-45 bg-sky/20" />
              <div className="relative">
                <Icon name="document" className="h-12 w-12 text-soft-blue" />
                <p className="mt-6 font-heading text-5xl font-black">{totalLinks}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-white/70">
                  links organizados
                </p>
                <p className="mt-5 text-sm leading-6 text-white/75">
                  Esta página consome a mesma fonte de rotas usada pelo sitemap XML, evitando listas duplicadas e reduzindo risco de páginas esquecidas.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {groups.map((group) => (
              <SiteMapGroupCard key={group.title} group={group} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

function SiteMapGroupCard({ group }: { group: SiteMapGroup }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-soft-blue/30 text-royal">
          <Icon name="document" className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-black text-ink">{group.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
        </div>
      </div>

      <div className="mt-7 grid gap-3">
        {group.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-slate-200 bg-page/70 p-4 transition hover:-translate-y-0.5 hover:border-royal/40 hover:bg-white hover:shadow-lg"
          >
            <span className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-heading text-base font-black text-ink group-hover:text-royal">
                {link.label}
              </span>
              <span className="flex items-center gap-2">
                {link.badge ? (
                  <span className="rounded-full bg-soft-blue/30 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-navy">
                    {link.badge}
                  </span>
                ) : null}
                <span className="text-lg font-black text-red transition group-hover:translate-x-1">→</span>
              </span>
            </span>
            {link.description ? (
              <span className="mt-2 block text-sm leading-6 text-slate-600">{link.description}</span>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
