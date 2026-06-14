import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BenefitCard } from '@/components/Cards';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { IconBadge } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { VisualPanel } from '@/components/VisualPanel';

export const metadata: Metadata = {
  title: 'Quem Somos',
  description: 'Conheça a LCS — Libertad Comercial e Serviços, uma empresa comprometida com eficiência, presença e confiança.',
};

export default function AboutPage() {
  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Quem Somos' }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                Uma empresa comprometida com eficiência, presença e <span className="text-royal">confiança.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A LCS entrega soluções operacionais completas que simplificam a gestão, reduzem custos e garantem ambientes organizados, seguros e produtivos todos os dias.
              </p>
            </div>
            <VisualPanel label="Institucional" variant="building" />
          </div>
        </Container>
      </section>

       <section className="-mt-10 relative z-10">
        <Container>
          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-card md:grid-cols-4">
            {[
              ['+30 anos', 'de experiência', 'Excelência comprovada.'],
              ['Equipe', 'treinada', 'Profissionais capacitados e supervisionados.'],
              ['Atendimento', 'personalizado', 'Soluções alinhadas à realidade de cada cliente.'],
              ['Contratos', 'sob medida', 'Flexibilidade, segurança e transparência.'],
            ].map(([top, title, text], index) => (
              <div key={title} className="flex gap-4 border-slate-200 p-3 md:border-r last:md:border-r-0">
                <IconBadge name={index === 0 ? 'check' : index === 1 ? 'people' : index === 2 ? 'headset' : 'document'} />
                <div>
                  <p className="font-heading text-xl font-black text-ink">{top}</p>
                  <p className="font-bold text-navy">{title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-red">Nossa história</p>
              <h2 className="font-heading text-3xl font-black tracking-tight text-ink sm:text-4xl">Construída sobre confiança, movida por resultados.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                A LCS nasceu com o propósito de oferecer soluções operacionais completas, unindo gente, processos e tecnologia para transformar ambientes e impulsionar negócios.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Ao longo da trajetória, ampliamos presença, investimos em capacitação e fortalecemos parcerias sólidas, sempre guiados por ética, responsabilidade e foco no cliente.
              </p>
            </div>
            <div className="grid gap-5">
              <VisualPanel label="Equipe LCS" className="min-h-[300px]" />
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <IconBadge name="check" />
                <p className="mt-4 text-lg font-bold leading-7 text-navy">LCS. Liberdade para o seu negócio crescer com tranquilidade.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <BenefitCard title="Missão" icon="target" text="Oferecer soluções operacionais completas e personalizadas que gerem eficiência, reduzam custos e promovam ambientes organizados." />
            <BenefitCard title="Visão" icon="eye" text="Ser referência nacional em terceirização de serviços operacionais, reconhecida pela excelência e confiança." />
            <BenefitCard title="Valores" icon="diamond" text="Ética, transparência, compromisso com resultados, valorização das pessoas, inovação e responsabilidade." />
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <SectionHeading title="Nossos diferenciais" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Gestão próxima e personalizada', 'Atendimento consultivo e acompanhamento contínuo com foco no resultado.'],
              ['Equipes treinadas e supervisionadas', 'Profissionais capacitados, uniformizados e alinhados aos padrões LCS.'],
              ['Processos e tecnologia', 'Metodologias eficientes e ferramentas que garantem controle e qualidade.'],
              ['Cobertura nacional', 'Estrutura própria e parceiros estratégicos para atendimento em todo o Brasil.'],
              ['Soluções completas', 'Portfólio integrado para simplificar a gestão e gerar ganhos reais.'],
              ['Segurança e compliance', 'Padrões legais, operacionais e de segurança em todas as frentes.'],
            ].map(([title, text], index) => (
              <BenefitCard key={title} title={title} text={text} icon={index % 2 === 0 ? 'people' : 'shield'} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <SectionHeading title="Linha do tempo" />
          <div className="mt-12 grid gap-5 md:grid-cols-5">
            {[
              ['1989', 'Fundação'],
              ['2016', 'Expansão regional'],
              ['2018', 'Novas soluções'],
              ['2021', 'Presença nacional'],
              ['2026+', 'O futuro'],
            ].map(([year, title], index) => (
              <div key={year} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-card">
                <IconBadge name={index === 4 ? 'rocket' : 'building'} className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-soft-blue/30 text-royal" />
                <p className="mt-5 font-heading text-2xl font-black text-royal">{year}</p>
                <h3 className="font-heading text-base font-black text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Evolução com foco em eficiência, qualidade e relacionamento de confiança.</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection title="Pronto para transformar a gestão de serviços na sua empresa?" />
    </>
  );
}
