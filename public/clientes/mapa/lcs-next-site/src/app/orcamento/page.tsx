import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { Icon, IconBadge } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { VisualPanel } from '@/components/VisualPanel';
import { faqs, segments, services, siteConfig, type IconName } from '@/data/site';

export const metadata: Metadata = {
  title: 'Solicite um orçamento',
  description: 'Solicite uma proposta personalizada para facilities, limpeza profissional, portaria, manutenção e terceirização operacional.',
};

export default function BudgetPage() {
  return (
    <>
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Orçamento' }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                Solicite uma proposta personalizada para sua empresa
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Conte para nós as necessidades do seu negócio e receba uma proposta detalhada, rápida e sem compromisso.
              </p>
              <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2"><Icon name="shield" className="h-5 w-5 text-royal" /> Atendimento rápido</span>
                <span className="inline-flex items-center gap-2"><Icon name="check" className="h-5 w-5 text-royal" /> Sem compromisso</span>
                <span className="inline-flex items-center gap-2"><Icon name="document" className="h-5 w-5 text-royal" /> Seus dados protegidos</span>
              </div>
            </div>
            <VisualPanel label="Orçamento LCS" />
          </div>
        </Container>
      </section>

      <section className="section-y bg-page pt-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <form action="/orcamento/obrigado" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-heading text-2xl font-black text-ink">Preencha o formulário</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Quanto mais detalhes você enviar, mais assertiva será nossa proposta.</p>
              <div className="mt-8 grid gap-5">
                <Field label="Nome completo" name="nome" placeholder="Digite seu nome completo" required />
                <Field label="Empresa" name="empresa" placeholder="Razão social da empresa" required />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Telefone / WhatsApp" name="telefone" placeholder="(11) 99999-9999" required />
                  <Field label="E-mail" name="email" type="email" placeholder="seu@email.com" required />
                </div>
                <Field label="Cidade" name="cidade" placeholder="Informe sua cidade" required />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Select label="Tipo de serviço desejado" name="servico" options={services.map((service) => service.title)} />
                  <Select label="Segmento da empresa" name="segmento" options={segments.map((segment) => segment.title)} />
                </div>
                <Field label="Quantidade aproximada de colaboradores ou unidades" name="tamanho" placeholder="Ex.: 25 colaboradores ou 3 unidades" />
                <label className="grid gap-2 text-sm font-bold text-ink">
                  Mensagem
                  <textarea name="mensagem" rows={5} placeholder="Conte-nos mais sobre suas necessidades, objetivos e expectativas..." className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-royal" />
                </label>
                <label className="flex gap-3 text-sm leading-6 text-slate-600">
                  <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300" />
                  Ao enviar, você concorda com o tratamento dos seus dados conforme nossa Política de Privacidade.
                </label>
                <Button type="submit" className="w-full">Enviar solicitação de orçamento</Button>
                <p className="text-center text-xs text-slate-500">Seus dados estão seguros conosco.</p>
              </div>
            </form>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-heading text-2xl font-black text-ink">Por que escolher a LCS?</h2>
              <div className="mt-8 grid gap-6">
                {[
                  ['Experiência comprovada', 'Soluções operacionais com alto padrão de qualidade.'],
                  ['Equipe treinada e supervisionada', 'Profissionais preparados para representar sua empresa.'],
                  ['Processos e tecnologia', 'Metodologias, relatórios e ferramentas de controle.'],
                  ['Contratos sob medida', 'Flexibilidade, segurança e transparência em cada etapa.'],
                  ['Atendimento próximo', 'Suporte antes, durante e depois da implantação.'],
                ].map(([title, text], index) => (
                  <div key={title} className="flex gap-4">
                    <IconBadge name={index === 0 ? 'check' : index === 1 ? 'people' : index === 2 ? 'shield' : index === 3 ? 'document' : 'headset'} />
                    <div>
                      <h3 className="font-heading text-lg font-black text-ink">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-3xl bg-navy p-6 text-white">
                <IconBadge name="chart" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white" />
                <h3 className="mt-4 font-heading text-xl font-black">Soluções que geram resultados reais</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">Ambientes mais organizados, seguros e produtivos para o crescimento do seu negócio.</p>
              </div>
            </div>
          </div>

          <section className="mt-16">
            <SectionHeading title="Fale com a nossa equipe agora" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {( [
                ['WhatsApp', siteConfig.whatsapp, 'phone'],
                ['Telefone', siteConfig.phone, 'phone'],
                ['E-mail', siteConfig.email, 'mail'],
                ['Horário de atendimento', 'Segunda a sexta, 08h às 18h', 'clock'],
              ] satisfies Array<[string, string, IconName]> ).map(([title, text, icon]) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                  <IconBadge name={icon} />
                  <h3 className="mt-4 font-heading text-lg font-black text-ink">{title}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <SectionHeading title="Dúvidas frequentes" />
            <div className="mt-8"><FAQ items={faqs} /></div>
          </section>
        </Container>
      </section>

      <CTASection title="Vamos encontrar a melhor solução para o seu negócio." />
    </>
  );
}

function Field({ label, name, placeholder, type = 'text', required = false }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}{required ? ' *' : ''}
      <input name={name} type={type} required={required} placeholder={placeholder} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-royal" />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <select name={name} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-royal">
        <option>Selecione</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
