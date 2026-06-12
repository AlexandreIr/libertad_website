import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BenefitCard, SegmentCard } from '@/components/Cards';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { IconBadge } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { VisualPanel } from '@/components/VisualPanel';
import { benefits, faqs, segments, services } from '@/data/site';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/servicos/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Serviços', href: '/servicos' }, { label: service.title }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                {service.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{service.description} Soluções flexíveis que se adaptam à sua rotina e aos seus objetivos.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/orcamento">Solicitar orçamento</Button>
                <Button href="https://wa.me/5511987654321" variant="secondary">Falar no WhatsApp</Button>
              </div>
            </div>
            <VisualPanel label={service.title} variant="cleaning" />
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
              <IconBadge name="building" />
              <h2 className="mt-5 font-heading text-2xl font-black text-ink">Visão geral do serviço</h2>
              <p className="mt-4 leading-7 text-slate-600">O serviço de {service.title} da LCS integra pessoas, processos e tecnologia para garantir ambientes organizados, seguros e funcionais. Atuamos na gestão diária de atividades operacionais para sua empresa focar no que realmente importa.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
              <IconBadge name="target" />
              <h2 className="mt-5 font-heading text-2xl font-black text-ink">Quando contratar</h2>
              <p className="mt-4 leading-7 text-slate-600">Ideal para empresas que buscam reduzir custos operacionais, melhorar a experiência nos ambientes e contar com um parceiro confiável para cuidar da rotina com padronização.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <SectionHeading title="O que está incluso" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.map((item, index) => (
              <BenefitCard key={item} icon={index % 2 === 0 ? 'document' : 'wrench'} title={item} text="Planejamento, execução e acompanhamento para manter o padrão de qualidade da operação." />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading align="left" title="Benefícios" />
              <ul className="mt-8 grid gap-4 text-slate-700">
                {['Redução de custos com gestão integrada.', 'Ambientes organizados e seguros todos os dias.', 'Equipes treinadas e supervisionadas.', 'Processos padronizados e com foco em qualidade.', 'Mais tempo para sua empresa focar no core business.'].map((item) => (
                  <li key={item} className="flex gap-3"><span className="font-black text-royal">✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading align="left" title="Segmentos atendidos" />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {segments.slice(0, 4).map((segment) => (
                  <SegmentCard key={segment.slug} title={segment.title} text={segment.description} icon={segment.icon} href={`/segmentos/${segment.slug}`} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <SectionHeading title="Perguntas frequentes" />
          <div className="mt-10"><FAQ items={faqs} /></div>
        </Container>
      </section>

      <CTASection title="Vamos tornar a operação da sua empresa mais eficiente?" />
    </>
  );
}
