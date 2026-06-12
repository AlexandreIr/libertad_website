import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Container } from '@/components/Container';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade da LCS — Libertad Comercial e Serviços.',
};

export default function PrivacyPage() {
  return (
    <section className="geometric-bg py-16 lg:py-20">
      <Container>
        <Breadcrumb items={[{ label: 'Política de Privacidade' }]} />
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card sm:p-12">
          <h1 className="font-heading text-4xl font-black text-ink">Política de Privacidade</h1>
          <div className="prose-content mt-8">
            <p>Esta é uma política mockada para a primeira versão do site. Antes da publicação, substitua este conteúdo por um texto jurídico revisado e adequado à LGPD.</p>
            <h2>Dados coletados</h2>
            <p>Podemos coletar informações enviadas em formulários, como nome, empresa, telefone, e-mail e mensagem.</p>
            <h2>Uso das informações</h2>
            <p>Os dados são usados para atendimento comercial, elaboração de propostas e comunicação com interessados nos serviços da LCS.</p>
            <h2>Contato</h2>
            <p>Para dúvidas sobre privacidade, entre em contato pelo e-mail contato@lcsservicos.com.br.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
