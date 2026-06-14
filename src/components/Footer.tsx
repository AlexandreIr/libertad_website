import Image from 'next/image';
import Link from 'next/link';
import { services, segments, siteConfig } from '@/data/site';
import { Icon } from '@/components/Icon';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rotate-45 bg-royal/30" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-48 w-48 rotate-45 bg-royal/20" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/lcs-logo.png"
                alt="LCS — Libertad Comercial e Serviços"
                width={90}
                height={90}
                className="h-14 w-16 object-contain brightness-0 invert"
              />
              <div>
                <p className="font-heading text-2xl tracking-[0.35em]">LCS</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/60">Libertad Comercial e Serviços</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
              Soluções comerciais e operacionais para empresas que não podem parar.
            </p>
            <div className="mt-5 flex gap-3 text-white/80">
              {['in', 'ig', 'fb', 'yt'].map((item) => (
                <span key={item} className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-xs font-bold">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <FooterColumn title="Serviços">
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href={`/servicos/${service.slug}`}>
                {service.title}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Segmentos">
            {segments.map((segment) => (
              <Link key={segment.slug} href={`/segmentos/${segment.slug}`}>
                {segment.title}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Institucional">
            <Link href="/quem-somos">Quem Somos</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/trabalhe-conosco">Trabalhe Conosco</Link>
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <Link href="/orcamento">Orçamento</Link>
          </FooterColumn>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-white">Fale com a LCS</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex gap-2"><Icon name="phone" className="h-4 w-4 text-soft-blue" /> {siteConfig.phone}</li>
              <li className="flex gap-2"><Icon name="phone" className="h-4 w-4 text-soft-blue" /> {siteConfig.whatsapp}</li>
              <li className="flex gap-2"><Icon name="mail" className="h-4 w-4 text-soft-blue" /> {siteConfig.email}</li>
              <li className="flex gap-2"><Icon name="pin" className="h-4 w-4 text-soft-blue" /> {siteConfig.address}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">
          © {new Date().getFullYear()} LCS — Libertad Comercial e Serviços. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-white">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-white/70 [&_a]:transition [&_a:hover]:text-white">
        {children}
      </div>
    </div>
  );
}
