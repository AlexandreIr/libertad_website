import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BenefitCard, ServiceCard } from '@/components/Cards';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { Icon } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { VisualPanel } from '@/components/VisualPanel';
import { benefits, faqs, services } from '@/data/site';

export const metadata: Metadata = {
  title: 'Serviços integrados de facilities e terceirização',
  description: 'Conheça os serviços da LCS: facilities, limpeza profissional, portaria, manutenção predial, apoio administrativo e terceirização operacional.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Serviços' }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                Serviços integrados para manter sua operação funcionando com <span className="text-royal">eficiência.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Soluções completas em facilities, limpeza, portaria, manutenção e apoio administrativo para ambientes organizados, seguros e produtivos.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/orcamento">Solicitar orçamento</Button>
                <Button href="/orcamento" variant="secondary">Falar com um especialista</Button>
              </div>
              <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2"><Icon name="shield" className="h-5 w-5 text-royal" /> Atendimento em todo o Brasil</span>
                <span className="inline-flex items-center gap-2"><Icon name="people" className="h-5 w-5 text-royal" /> Equipes treinadas</span>
                <span className="inline-flex items-center gap-2"><Icon name="document" className="h-5 w-5 text-royal" /> Contratos sob medida</span>
              </div>
            </div>
            <VisualPanel label="Serviços LCS" variant="cleaning" />
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <SectionHeading title="Nossos serviços" description="Soluções completas e integradas para diferentes necessidades do seu negócio." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} title={service.title} text={service.short} icon={service.icon} href={`/servicos/${service.slug}`} />
            ))}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card lg:col-span-3">
              <div className="grid gap-8 md:grid-cols-[0.5fr_1fr] md:items-center">
                <VisualPanel label="Plano sob medida" className="min-h-[240px]" />
                <div>
                  <h3 className="font-heading text-2xl font-black text-ink">Soluções personalizadas para cada espaço.</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-slate-600">Analisamos suas necessidades e desenhamos o plano ideal para sua rotina, seu segmento e o padrão de qualidade esperado pela sua empresa.</p>
                  <Button href="/orcamento" variant="secondary" className="mt-6">Conhecer abordagem</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <SectionHeading title="Por que contratar a LCS?" description="Mais eficiência, segurança e tranquilidade para o seu dia a dia." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => <BenefitCard key={benefit.title} {...benefit} />)}
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <SectionHeading title="Perguntas frequentes" />
          <div className="mt-10"><FAQ items={faqs} /></div>
        </Container>
      </section>

      <CTASection title="Solicite um orçamento personalizado." text="Fale com um especialista e receba uma proposta sob medida para a sua operação." />
    </>
  );
}
