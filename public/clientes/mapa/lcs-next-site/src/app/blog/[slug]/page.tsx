import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { PostCard } from '@/components/Cards';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { Icon, IconBadge } from '@/components/Icon';
import { posts } from '@/data/site';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: 'Equipe LCS' },
    datePublished: '2026-05-12',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="geometric-bg py-16 lg:py-20">
        <Container>
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-5 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
                <span className="rounded-full bg-soft-blue/30 px-3 py-1 text-navy">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">{post.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{post.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600">
                <span className="inline-flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-bold text-white">L</span> Por <strong className="text-ink">Equipe LCS</strong></span>
                <span className="inline-flex items-center gap-2"><Icon name="clock" className="h-5 w-5 text-royal" /> {post.date}</span>
              </div>
            </div>
            <aside className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-card lg:block">
              <h2 className="font-heading text-xl font-black text-ink">Neste artigo</h2>
              <ol className="mt-5 grid gap-3 text-sm leading-6 text-slate-700">
                <li>1. Por que falhas acontecem na terceirização?</li>
                <li>2. Os impactos das falhas operacionais</li>
                <li>3. Práticas para ganhar previsibilidade</li>
                <li>4. Indicadores que realmente importam</li>
                <li>5. Tecnologia e dados como aliados</li>
              </ol>
              <Button href="/orcamento" className="mt-6 w-full">Falar com especialista</Button>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-white pb-20 pt-10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <article className="prose-content max-w-none">
              <div className="mb-10 min-h-[380px] rounded-[2rem] bg-gradient-to-br from-navy via-royal to-soft-blue shadow-card" />
              <p>
                A terceirização de serviços é uma estratégia consolidada para reduzir custos, aumentar a eficiência e permitir que empresas foquem no que realmente importa: seu core business. No entanto, quando mal gerenciada, pode gerar falhas que impactam produtividade, segurança e experiência.
              </p>
              <h2>1. Por que falhas acontecem na terceirização?</h2>
              <p>
                Falhas não são resultado apenas da execução. Elas geralmente nascem de problemas estruturais na contratação e na gestão do serviço.
              </p>
              <div className="my-8 grid gap-4 rounded-3xl border border-slate-200 bg-page p-6 sm:grid-cols-5">
                {['Expectativas mal alinhadas', 'Escopo pouco claro', 'Falta de treinamento', 'Ausência de indicadores', 'Comunicação fraca'].map((item) => (
                  <div key={item} className="text-center text-sm font-bold text-slate-700">
                    <IconBadge name="document" className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-soft-blue/30 text-royal" />
                    {item}
                  </div>
                ))}
              </div>
              <blockquote>
                O que não é medido, não é gerenciado. E o que não é gerenciado, falha.
              </blockquote>
              <h2>2. Os impactos das falhas operacionais</h2>
              <p>
                Quando a terceirização não funciona como deveria, os efeitos aparecem rapidamente: queda na qualidade, aumento de retrabalho, riscos de segurança, insatisfação de clientes e perda de previsibilidade.
              </p>
              <h2>3. Práticas para reduzir falhas e ganhar previsibilidade</h2>
              <p>
                Comece definindo escopo, indicadores, rotinas e responsáveis. Depois, mantenha supervisão ativa, comunicação clara e revisões periódicas de desempenho.
              </p>
              <div className="my-10 rounded-3xl bg-navy p-8 text-white">
                <h3 className="font-heading text-2xl font-black">Transforme sua operação com gestão, dados e pessoas.</h3>
                <p className="mt-3 text-white/75">A LCS ajuda sua empresa a alcançar mais eficiência, qualidade e segurança todos os dias.</p>
                <Button href="/orcamento" variant="red" className="mt-6">Solicitar diagnóstico gratuito</Button>
              </div>
              <h2>4. Indicadores que realmente importam</h2>
              <p>
                Taxa de cumprimento de rotina, tempo de resposta, ocorrências, absenteísmo, satisfação do cliente interno e custo por unidade atendida são métricas essenciais para sair do achismo.
              </p>
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <IconBadge name="document" />
                <h2 className="mt-4 font-heading text-xl font-black text-ink">Checklist: sua terceirização está no caminho certo?</h2>
                <ul className="mt-5 grid gap-3 text-sm text-slate-700">
                  {['O escopo está definido?', 'Existem indicadores?', 'As rotinas são treinadas?', 'Há comunicação clara?', 'Não conformidades são tratadas?'].map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-royal">✓</span>{item}</li>
                  ))}
                </ul>
                <Button href="/orcamento" variant="secondary" className="mt-6 w-full">Baixar checklist</Button>
              </div>
            </aside>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-3xl font-black text-ink">Leia também</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {posts.filter((item) => item.slug !== post.slug).slice(0, 3).map((item) => (
                <PostCard key={item.slug} {...item} href={`/blog/${item.slug}`} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
