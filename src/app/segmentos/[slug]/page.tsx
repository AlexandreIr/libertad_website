import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BenefitCard, ServiceCard } from '@/components/Cards';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { IconBadge } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { VisualPanel } from '@/components/VisualPanel';
import { faqs, segments, services } from '@/data/site';

export function generateStaticParams() {
  return segments.map((segment) => ({ slug: segment.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const segment = segments.find((item) => item.slug === slug);
  if (!segment) return {};
  return {
    title: segment.title,
    description: segment.description,
    alternates: { canonical: `/segmentos/${segment.slug}` },
  };
}

export default async function SegmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const segment = segments.find((item) => item.slug === slug);
  if (!segment) notFound();
  const isIndustry = segment.slug === 'industrias';

  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Segmentos', href: '/segmentos' }, { label: segment.title }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-soft-blue/30 px-3 py-1 text-xs font-black uppercase tracking-[0.15em] text-navy">{segment.title}</p>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                {segment.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Atuamos lado a lado da sua operação para garantir ambientes produtivos, processos organizados e equipes treinadas, reduzindo riscos e aumentando a eficiência todos os dias.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/orcamento">Solicitar orçamento</Button>
                <Button href="/orcamento" variant="secondary">Falar com especialista</Button>
              </div>
            </div>
            <VisualPanel label={segment.title} variant={isIndustry ? 'industry' : 'default'} />
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <hr className="mx-auto mb-6 h-1 w-24 rounded-full border-0 bg-red-600" />
          <SectionHeading title={isIndustry ? 'Desafios do setor industrial' : `Desafios de ${segment.title}`} description="Entendemos os principais desafios que impactam produtividade, experiência e segurança da operação." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {['Ambientes críticos', 'Manutenção da produtividade', 'Padronização de processos', 'Gestão de pessoas e terceiros', 'Conformidade e auditorias', 'Custos operacionais'].map((item, index) => (
              <BenefitCard key={item} title={item} text="Rotinas exigem controle, documentação, equipe treinada e acompanhamento constante." icon={index % 2 === 0 ? 'shield' : 'chart'} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <hr className="mx-auto mb-6 h-1 w-24 rounded-full border-0 bg-red-600" />
          <SectionHeading title={`Serviços mais indicados para ${segment.title.toLowerCase()}`} description="Soluções completas para manter sua operação segura, eficiente e dentro do padrão." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} title={service.title} text={service.short} icon={service.icon} href={`/servicos/${service.slug}`} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          
          <div className="grid gap-12 lg:grid-cols-3">
            <div className='py-4'>
              <SectionHeading align="left" title="Benefícios para a sua operação" />
              <ul className="mt-8 grid gap-4 text-slate-700">
                {['Mais segurança para pessoas, equipamentos e processos.', 'Redução de falhas operacionais.', 'Padronização e conformidade em todas as rotinas.', 'Equipes treinadas, supervisionadas e alinhadas.', 'Melhoria contínua com foco em eficiência.'].map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl bg-white p-4 shadow-card items-center font-semibold"><span className="font-black text-royal "><IconBadge name="check" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-soft-blue/30 text-royal" /></span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-card">
              <SectionHeading align="left" title="Processos e supervisão" description="Metodologia própria para garantir qualidade e controle." />
              <div className="mt-8 grid gap-4">
                {['Planejamento', 'Execução', 'Supervisão', 'Relatórios'].map((item, index) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy font-black text-white">{index + 1}</span>
                    <p className="text-sm leading-6 text-slate-600"><strong className="block text-ink">{item}</strong> Controle em tempo real, registro de rotinas e melhoria constante.</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='py-4'>
              <SectionHeading align="left" title={`Por que escolher a LCS para ${segment.title.toLowerCase()}?`} />
              <div className="mt-8 grid gap-4">
                {['Experiência em operações complexas', 'Soluções personalizadas', 'Foco em segurança e qualidade', 'Atendimento ágil e comunicação transparente', 'Suporte próximo'].map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 shadow-card items-center"><IconBadge name="check" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-soft-blue/30 text-royal" /> <span className="font-semibold text-slate-700">{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <hr className="mx-auto mb-6 h-1 w-24 rounded-full border-0 bg-red-600" />
          <SectionHeading title="Perguntas frequentes" />
          <div className="mt-10"><FAQ items={faqs} /></div>
        </Container>
      </section>

      <CTASection title="Sua operação merece continuidade, segurança e resultados consistentes." />
    </>
  );
}
