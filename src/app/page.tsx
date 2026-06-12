import Link from 'next/link';
import { Button } from '@/components/Button';
import { BenefitCard, PostCard, SegmentCard, ServiceCard } from '@/components/Cards';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { Icon, IconBadge } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { VisualPanel } from '@/components/VisualPanel';
import { benefits, posts, segments, services } from '@/data/site';

export default function HomePage() {
  return (
    <>
      <section className="geometric-bg overflow-hidden py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.22em] text-red">Libertad Comercial e Serviços</p>
              <h1 className="font-heading text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Soluções comerciais e operacionais para empresas que precisam de{' '}
                <span className="text-royal">confiança todos os dias.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Atuamos com facilities, apoio operacional, limpeza profissional, portaria e terceirização de mão de obra para garantir ambientes organizados, seguros e eficientes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="/orcamento"
                  className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110"
                >
                <span className="relative z-10">Solicite agora seu orçamento</span>

                <div className="pointer-events-none absolute inset-0 flex h-full w-full justify-center animate-[shine_3s_linear_infinite]">
                  <div className="h-full w-30 bg-white/20 blur-sm -skew-x-12" />
                </div>
                </Button>               
                <Button href="/servicos" variant="secondary">Conhecer serviços</Button>
              </div>
            </div>
            <VisualPanel label="Equipe operacional LCS" />
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
          <hr className="mx-auto mb-6 h-1 w-24 rounded-full border-0 bg-red-600" />
          <SectionHeading title="O que fazemos" description="Soluções completas para o bom funcionamento do seu negócio." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} title={service.title} text={service.short} icon={service.icon} href={`/servicos/${service.slug}`} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <hr className="mx-auto mb-6 h-1 w-24 rounded-full border-0 bg-red-600" />
          <SectionHeading title="Soluções por segmento" description="Cada ambiente tem desafios próprios. A LCS adapta equipe, rotina e controle ao contexto de cada operação." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map((segment) => (
              <SegmentCard key={segment.slug} title={segment.title} text={segment.description} icon={segment.icon} href={`/segmentos/${segment.slug}`} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <hr className="mx-auto mb-6 h-1 w-24 rounded-full border-0 bg-red-600" />
          <SectionHeading title="Por que escolher a LCS" description="Empresas não contratam apenas execução. Elas contratam previsibilidade, segurança e resposta rápida quando a rotina aperta." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => <BenefitCard key={benefit.title} {...benefit} />)}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeading align="left" title="Processo de contratação" description="Simples, ágil e transparente do primeiro contato à operação." />
            <div className="grid gap-5 sm:grid-cols-4">
              {['Entendimento', 'Proposta', 'Implantação', 'Gestão e melhoria'].map((step, index) => (
                <div key={step} className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-black text-white">{index + 1}</span>
                  <h3 className="mt-5 font-heading text-lg font-black text-ink">{step}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{index === 0 ? 'Entendemos necessidades e desafios.' : index === 1 ? 'Apresentamos escopo e investimento.' : index === 2 ? 'Estruturamos equipe, rotina e metas.' : 'Acompanhamos indicadores e melhorias.'}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-page">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <VisualPanel label="Institucional LCS" variant="building" className="min-h-[360px]" />
            <div>
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-red">Quem somos</p>
              <h2 className="font-heading text-3xl font-black tracking-tight text-ink sm:text-4xl">Libertad Comercial e Serviços</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                A LCS nasceu para entregar excelência em serviços e soluções operacionais que simplificam a gestão e elevam o padrão de ambientes corporativos, industriais, comerciais e residenciais.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Mais do que executar, somos parceiros estratégicos que trabalham com ética, transparência e foco em resultados sustentáveis.
              </p>
              <Button href="/quem-somos" variant="secondary" className="mt-8">Conheça nossa história</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <SectionHeading align='left'  title="Blog LCS" description="Conteúdos para uma gestão mais eficiente, segura e previsível." />
            <Link href="/blog" className="font-bold text-red">Ver todos os artigos →</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} title={post.title} category={post.category} date={post.date} excerpt={post.excerpt} href={`/blog/${post.slug}`} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
