import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BenefitCard, SegmentCard } from '@/components/Cards';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { IconBadge } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { VisualPanel } from '@/components/VisualPanel';
import { faqs, segments } from '@/data/site';

export const metadata: Metadata = {
  title: 'Segmentos atendidos',
  description: 'Soluções operacionais sob medida para condomínios, indústrias, clínicas, escritórios, educação e varejo.',
};

export default function SegmentosPage() {
  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Segmentos' }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                Atendimento sob medida para diferentes tipos de <span className="text-royal">operação.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Cada ambiente tem desafios únicos. Por isso, a LCS desenvolve soluções personalizadas que garantem eficiência, segurança e tranquilidade todos os dias.
              </p>
            </div>
            <VisualPanel label="Segmentos LCS" />
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <SectionHeading title="Nossos segmentos de atuação" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map((segment) => (
              <SegmentCard key={segment.slug} title={segment.title} text={segment.description} icon={segment.icon} href={`/segmentos/${segment.slug}`} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <SectionHeading title="Como a LCS personaliza soluções para o seu segmento" />
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              ['Diagnóstico', 'Entendemos ambiente, rotinas e desafios específicos.'],
              ['Plano personalizado', 'Desenvolvemos um plano de serviços sob medida.'],
              ['Execução com padrão LCS', 'Equipes treinadas, processos rigorosos e alta performance.'],
              ['Acompanhamento contínuo', 'Indicadores, auditorias e melhorias constantes.'],
            ].map(([title, text], index) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-black text-white">{index + 1}</span>
                <h3 className="mt-5 font-heading text-lg font-black text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <SectionHeading title="Benefícios que você sente no dia a dia" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['Ambientes mais limpos', 'Seguros e organizados.'],
              ['Redução de riscos', 'Conformidade com normas.'],
              ['Equipes treinadas', 'Supervisionadas e alinhadas.'],
              ['Soluções flexíveis', 'Acompanham seu crescimento.'],
              ['Foco no negócio', 'Mais tempo para sua operação principal.'],
            ].map(([title, text]) => (
              <BenefitCard key={title} title={title} text={text} icon="check" />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading align="left" title="Cases e destaques" />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {['Condomínio Residencial Alphaville', 'Indústria Metalúrgica Sul', 'Clínica Integrada Vida', 'Shopping Center Plaza'].map((item, index) => (
                  <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                    <IconBadge name={index === 1 ? 'factory' : index === 2 ? 'heart' : 'building'} />
                    <h3 className="mt-4 font-heading text-lg font-black text-ink">{item}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Rotinas padronizadas, acompanhamento próximo e melhoria contínua na operação.</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading align="left" title="Perguntas frequentes" />
              <div className="mt-8"><FAQ items={faqs} /></div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection title="Pronto para elevar o padrão da sua operação?" />
    </>
  );
}
