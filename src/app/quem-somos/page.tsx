import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BenefitCard } from '@/components/Cards';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { IconBadge } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { VisualPanel } from '@/components/VisualPanel';
import { IconName } from '@/data/site';

export const metadata: Metadata = {
  title: 'Quem Somos',
  description:
    'Conheça a LCS — Libertad Comercial e Serviços, uma empresa comprometida com eficiência, presença e confiança.',
};

interface BenefitsItem {
  icon: IconName;
  title: string;
  text: string;
}

const benefits: BenefitsItem[] = [
  {
    icon: 'diamond',
    title: 'Gestão próxima e personalizada',
    text: 'Atendimento consultivo e acompanhamento contínuo com foco no resultado.'
  },
  {
    icon: 'briefcase',
    title: 'Equipes treinadas e supervisionadas',
    text: 'Profissionais capacitados, uniformizados e alinhados aos padrões LCS.'
  },
  {
    icon: 'document',
    title: 'Processos e tecnologia',
    text: 'Metodologias eficientes e ferramentas que garantem controle e qualidade.'
  },
  {
    icon: 'check',
    title: 'Soluções completas',
    text: 'Portfólio integrado para simplificar a gestão e gerar ganhos reais.'
  },
  {
    icon: 'shield',
    title: 'Segurança e compliance',
    text: 'Padrões legais, operacionais e de segurança em todas as frentes.'
  },
  {
    icon: 'rocket',
    title: 'Agilidade no atendimento',
    text: 'Respostas rápidas e soluções assertivas para cada situação.'
  }
]

export default function AboutPage() {
  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Quem Somos' }]} />

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                Uma empresa comprometida com eficiência, presença e{' '}
                <span className="text-royal">confiança.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Somos uma empresa especializada em terceirização de mão de obra e serviços de facilities,
                oferecendo soluções completas para empresas de todos os portes e segmentos.
                Contamos com uma equipe altamente qualificada e experiente,
                preparada para assumir a gestão de diversos serviços operacionais,
                permitindo que nossos clientes concentrem seus esforços no crescimento e desenvolvimento de seus negócios.
              </p>
            </div>

            <VisualPanel label="Institucional" variant="building" />
          </div>
        </Container>
      </section>

      <section className="relative z-10 mt-5">
        <Container>
          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-card md:grid-cols-4">
            {[
              ['+30 anos', 'de experiência', 'Excelência comprovada.'],
              ['Equipe', 'treinada', 'Profissionais capacitados e supervisionados.'],
              ['Atendimento', 'personalizado', 'Soluções alinhadas à realidade de cada cliente.'],
              ['Contratos', 'sob medida', 'Flexibilidade, segurança e transparência.'],
            ].map(([top, title, text], index) => (
              <div
                key={title}
                className="flex gap-4 border-slate-200 p-3 md:border-r last:md:border-r-0"
              >
                <IconBadge
                  name={
                    index === 0
                      ? 'check'
                      : index === 1
                        ? 'people'
                        : index === 2
                          ? 'headset'
                          : 'document'
                  }
                />

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
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-red">
                Nossa história
              </p>

              <h2 className="font-heading text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Construída sobre confiança, movida por resultados.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                A LCS nasceu com o propósito de oferecer soluções operacionais completas, unindo gente, processos e tecnologia para transformar ambientes e impulsionar negócios.
              </p>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Ao longo da trajetória, ampliamos presença, investimos em capacitação e fortalecemos parcerias sólidas, sempre guiados por ética, responsabilidade e foco no cliente.
              </p>
            </div>

            <div className="grid gap-5">
              <VisualPanel label="Equipe LCS" className="min-h-75" />

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <IconBadge name="check" />
                <p className="mt-4 text-lg font-bold leading-7 text-navy">
                  LCS. Liberdade para o seu negócio crescer com tranquilidade.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <BenefitCard
              title="Visão"
              icon="eye"
              text="Ser a primeira escolha das organizações que buscam soluções completas e inovadoras em gestão de facilities, sendo reconhecida pela excelência dos serviços prestados, pela qualificação de nossa equipe e pelo compromisso com a sustentabilidade."
            />

            <BenefitCard
              title="Missão"
              icon="target"
              text="Atender e superar as expectativas de nossos clientes por meio da excelência na prestação de serviços, oferecendo soluções eficientes, seguras e de alta qualidade, que proporcionem a melhor experiência e contribuam para o sucesso de seus negócios."
            />

            <BenefitCard
              title="Valores"
              icon="diamond"
              text="A LCS valoriza as pessoas, promovendo equidade, diversidade, inclusão e respeito em um ambiente acolhedor. Incentiva o desenvolvimento profissional, a segurança, a excelência nos serviços e a melhoria contínua de seus processos e equipes."
            />
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <hr className="mx-auto mb-6 h-1 w-24 rounded-full border-0 bg-red-600" />

          <SectionHeading title="Nossos diferenciais" />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <BenefitCard
                key={item.title}
                title={item.title}
                text={item.text}
                icon={item.icon}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <hr className="mx-auto mb-6 h-1 w-24 rounded-full border-0 bg-red-600" />

          <div className="bg-white p-3 sm:p-5">
            <div className="overflow-x-auto">
              <div className="min-w-230 lg:min-w-0">
                <Image
                  src="/brand/timeline.png"
                  alt="Linha do tempo da LCS, apresentando os principais marcos da empresa entre 1989 e 2026"
                  width={1672}
                  height={941}
                  sizes="(min-width: 1280px) 1120px, (min-width: 1024px) 90vw, 920px"
                  className="h-auto w-full rounded-2xl object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection title="Pronto para transformar a gestão de serviços na sua empresa?" />
    </>
  );
}