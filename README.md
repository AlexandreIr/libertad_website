# LCS — Libertad Comercial e Serviços

Primeira versão em Next.js + Tailwind CSS do site institucional da LCS, criada a partir do design aprovado: paleta azul/vermelho/cinza, linguagem corporativa premium, páginas SEO-friendly e componentes reutilizáveis.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Rotas estáticas e dinâmicas para serviços, segmentos e blog
- Metadata, sitemap, robots e JSON-LD base

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Páginas criadas

- `/`
- `/servicos`
- `/servicos/[slug]`
- `/segmentos`
- `/segmentos/[slug]`
- `/quem-somos`
- `/blog`
- `/blog/[slug]`
- `/orcamento`
- `/orcamento/obrigado`
- `/trabalhe-conosco`
- `/politica-de-privacidade`

## Onde editar conteúdo

A maior parte dos textos mockados está em:

```txt
src/data/site.ts
```

## Próximos ajustes importantes

1. Substituir os blocos visuais abstratos por fotos reais da operação ou imagens licenciadas.
2. Revisar dados reais: CNPJ, telefone, WhatsApp, e-mail e endereço.
3. Integrar o formulário de orçamento com API, CRM, e-mail ou WhatsApp.
4. Revisar juridicamente a política de privacidade antes de publicar.
5. Criar versão final de favicon e Open Graph image.
