import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { IconBadge } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Solicitação recebida',
  description: 'Sua solicitação de orçamento foi recebida com sucesso pela LCS.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Orçamento', href: '/orcamento' }, { label: 'Obrigado' }]} />
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-card sm:p-14">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-50 text-4xl text-green-600">✓</div>
            <h1 className="mt-8 font-heading text-4xl font-black leading-tight text-ink sm:text-5xl">
              Solicitação recebida <span className="text-royal">com sucesso.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-600">
              Obrigado por confiar na LCS — Libertad Comercial e Serviços. Nossa equipe analisará sua solicitação e entrará em contato em breve para apresentar as melhores soluções para o seu negócio.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/">Voltar para a Home</Button>
              <Button href="https://wa.me/5511987654321" variant="secondary">Falar no WhatsApp</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-page pt-10">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-black text-ink">Próximos passos</h2>
            <p className="mt-2 text-slate-600">O que acontece agora?</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['Análise da solicitação', 'Nossa equipe vai avaliar as informações enviadas e entender as necessidades da sua empresa.'],
              ['Contato especializado', 'Entraremos em contato em breve para alinhar detalhes e apresentar as melhores soluções.'],
              ['Proposta personalizada', 'Você receberá uma proposta sob medida, com foco em eficiência, segurança e resultados.'],
            ].map(([title, text], index) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card">
                <IconBadge name={index === 0 ? 'document' : index === 1 ? 'headset' : 'check'} className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-soft-blue/30 text-royal" />
                <span className="mx-auto mt-5 grid h-8 w-8 place-items-center rounded-full bg-navy text-sm font-black text-white">{index + 1}</span>
                <h3 className="mt-4 font-heading text-xl font-black text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-heading text-3xl font-black text-ink">Conheça mais da LCS</h2>
            <p className="mt-2 text-slate-600">Explore nossos conteúdos e serviços.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ['Serviços', '/servicos', 'Soluções para cada necessidade do seu negócio.'],
              ['Quem Somos', '/quem-somos', 'Conheça nossa história, missão e valores.'],
              ['Blog', '/blog', 'Conteúdos e insights para apoiar sua gestão.'],
            ].map(([title, href, text]) => (
              <Link key={title} href={href} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="font-heading text-xl font-black text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                <span className="mt-4 inline-flex text-xl font-black text-red">→</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
