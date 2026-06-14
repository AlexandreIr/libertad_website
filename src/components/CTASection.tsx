import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { siteConfig } from '@/data/site';

export function CTASection({
  title = 'Sua operação precisa de mais organização, segurança e previsibilidade?',
  text = 'Fale com nossos especialistas e descubra a solução ideal para o seu negócio.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-white py-10">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-navy p-8 text-white shadow-2xl md:p-10">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-red" />
          <div className="absolute -right-24 top-0 h-56 w-56 rotate-45 bg-royal/30" />
          <div className="absolute -left-20 bottom-0 h-52 w-52 rotate-45 bg-royal/20" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="flex gap-5">
              <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 md:grid">
                <Icon name="chart" className="h-8 w-8" />
              </span>
              <div>
                <h2 className="font-heading text-2xl font-black leading-tight sm:text-3xl">{title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">{text}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/orcamento" variant="red">Solicitar orçamento</Button>
              <Button href={`https://wa.me/+55${siteConfig.whatsapp.replace(/\D/g, '')}`} variant="ghost">Falar no WhatsApp</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
