import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { IconBadge } from '@/components/Icon';
import { VisualPanel } from '@/components/VisualPanel';

export const metadata: Metadata = {
  title: 'Trabalhe Conosco',
  description: 'Faça parte da equipe LCS e atue em operações de facilities, limpeza, portaria e apoio operacional.',
};

export default function WorkWithUsPage() {
  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Trabalhe Conosco'}]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">Faça parte de uma equipe que entrega confiança todos os dias.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Buscamos profissionais comprometidos, responsáveis e interessados em crescer em uma empresa com foco em qualidade, segurança e relacionamento.</p>
              <Button href="https://lcslibertadcomercialeservicos.pandape.infojobs.com.br/" className="mt-8">Enviar currículo</Button>
            </div>
            <VisualPanel label="Carreiras LCS" />
          </div>
        </Container>
      </section>
      <section className="section-y bg-page">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <Card title="Ambiente organizado" text="Processos claros para apoiar o trabalho de cada profissional." />
            <Card title="Treinamento" text="Orientação para manter o padrão de atendimento e segurança." />
            <Card title="Crescimento" text="Valorização de pessoas comprometidas com resultado." />
          </div>
        </Container>
      </section>
    </>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
      <IconBadge name="people" />
      <h2 className="mt-5 font-heading text-xl font-black text-ink">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </div>
  );
}
