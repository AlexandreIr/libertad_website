export const siteConfig = {
  name: 'LCS — Libertad Comercial e Serviços',
  shortName: 'LCS',
  url: 'https://libertadfacilities.com.br/',
  description:
    'Soluções em facilities, limpeza profissional, manutenção, portaria e apoio operacional para empresas, condomínios, indústrias e instituições.',
  phone: '(11) 2311-3010',
  whatsapp: '(11) 91417-6485',
  email: 'contato@lcsservicos.com.br',
  address: 'Rua Bom Pastor, 739 — Ipiranga, São Paulo/SP',
  cnpj: '00.000.000/0000-00',
};

export const navItems = [
  { label: 'Serviços', href: '/servicos' },
  { label: 'Segmentos', href: '/segmentos' },
  { label: 'Quem Somos', href: '/quem-somos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
  { label: 'Contato', href: '/orcamento' },
];

export type IconName =
  | 'building'
  | 'spray'
  | 'shield'
  | 'wrench'
  | 'people'
  | 'briefcase'
  | 'factory'
  | 'heart'
  | 'cap'
  | 'shop'
  | 'chart'
  | 'document'
  | 'pin'
  | 'headset'
  | 'check'
  | 'clock'
  | 'mail'
  | 'phone'
  | 'target'
  | 'eye'
  | 'diamond'
  | 'rocket';

export const services = [
  {
    slug: 'facilities',
    title: 'Facilities',
    icon: 'building' as IconName,
    short:
      'Gestão integrada de serviços que otimizam processos, reduzem custos e aumentam a eficiência operacional.',
    heroTitle:
      'Facilities para empresas que precisam de operação organizada e suporte confiável.',
    description:
      'Gerenciamos serviços de facilities com foco na eficiência, conservação dos ambientes e suporte contínuo às operações do seu negócio.',
    included: [
      'Gestão de rotinas operacionais',
      'Apoio à conservação de ambientes',
      'Suporte à manutenção básica',
      'Organização de equipes terceirizadas',
      'Acompanhamento de qualidade',
      'Relatórios operacionais',
    ],
  },
  {
    slug: 'limpeza-profissional',
    title: 'Limpeza Profissional',
    icon: 'spray' as IconName,
    short:
      'Ambientes limpos, higienizados e saudáveis com padrão elevado de qualidade e controle.',
    heroTitle:
      'Limpeza profissional para ambientes empresariais mais seguros e produtivos.',
    description:
      'Estruturamos rotinas de limpeza, higienização e conservação para empresas que precisam de ambientes impecáveis todos os dias.',
    included: [
      'Limpeza recorrente',
      'Higienização de áreas críticas',
      'Conservação de pisos',
      'Controle de materiais',
      'Supervisão de equipe',
      'Checklists operacionais',
    ],
  },
  {
    slug: 'portaria-controle-acesso',
    title: 'Portaria e Controle de Acesso',
    icon: 'shield' as IconName,
    short:
      'Segurança, recepção e controle de acesso com tecnologia e profissionais qualificados.',
    heroTitle:
      'Portaria e controle de acesso com presença, tecnologia e padronização.',
    description:
      'Apoiamos sua operação com profissionais preparados, processos de identificação e controle de fluxo de pessoas e veículos.',
    included: [
      'Controle de entrada e saída',
      'Recepção de visitantes',
      'Registro de ocorrências',
      'Apoio à segurança patrimonial',
      'Padronização de atendimento',
      'Relatórios de movimentação',
    ],
  },
  {
    slug: 'terceirizacao-mao-de-obra',
    title: 'Terceirização de Mão de Obra',
    icon: 'people' as IconName,
    short:
      'Profissionais qualificados para diversas funções, com gestão completa e transparente.',
    heroTitle:
      'Terceirização de mão de obra com gestão, transparência e segurança.',
    description:
      'Montamos equipes sob medida para diferentes rotinas operacionais, com supervisão, controle e foco em resultado.',
    included: [
      'Recrutamento operacional',
      'Equipe uniformizada',
      'Supervisão contínua',
      'Substituição planejada',
      'Gestão de escalas',
      'Indicadores de qualidade',
    ],
  },
];

export const segments = [
  {
    slug: 'industrias',
    title: 'Indústrias',
    icon: 'factory' as IconName,
    description:
      'Ambientes produtivos mais seguros, organizados e em conformidade com normas.',
    heroTitle:
      'Soluções operacionais para indústrias que exigem continuidade, segurança e padronização.',
  },
  {
    slug: 'clinicas-e-saude',
    title: 'Clínicas e Saúde',
    icon: 'heart' as IconName,
    description:
      'Higiene especializada para ambientes que exigem cuidado, controle e confiança.',
    heroTitle:
      'Serviços especializados para clínicas e ambientes de saúde que exigem máximo cuidado.',
  },
  {
    slug: 'escritorios',
    title: 'Escritórios Corporativos',
    icon: 'briefcase' as IconName,
    description:
      'Ambientes organizados que promovem bem-estar, produtividade e boa experiência.',
    heroTitle:
      'Soluções para escritórios que precisam de conforto, organização e produtividade.',
  },
  {
    slug: 'educacao',
    title: 'Educação',
    icon: 'cap' as IconName,
    description:
      'Espaços limpos e seguros para aprendizado, convivência e desenvolvimento.',
    heroTitle:
      'Soluções para instituições de ensino que precisam de ambientes seguros e bem cuidados.',
  },
  {
    slug: 'varejo',
    title: 'Varejo',
    icon: 'shop' as IconName,
    description:
      'Experiência positiva para clientes com ambientes sempre limpos, funcionais e seguros.',
    heroTitle:
      'Soluções para varejo e centros comerciais que valorizam experiência e continuidade.',
  },
];

export const benefits = [
  {
    title: 'Qualidade comprovada',
    text: 'Padrões rigorosos, checklists e melhoria contínua.',
    icon: 'check' as IconName,
  },
  {
    title: 'Segurança em primeiro lugar',
    text: 'Processos, EPIs e protocolos para proteger pessoas e patrimônios.',
    icon: 'shield' as IconName,
  },
  {
    title: 'Gestão transparente',
    text: 'Relatórios, indicadores e comunicação clara durante a operação.',
    icon: 'document' as IconName,
  },
  {
    title: 'Flexibilidade e escala',
    text: 'Contratos sob medida para acompanhar a necessidade do cliente.',
    icon: 'chart' as IconName,
  },
];

export const posts = [
  {
    slug: 'como-reduzir-falhas-na-terceirizacao-de-servicos',
    title:
      'Como reduzir falhas na terceirização de serviços e aumentar a previsibilidade operacional',
    category: 'Gestão e Operações',
    date: '12 de maio de 2026',
    readTime: '8 min de leitura',
    excerpt:
      'Boas práticas, indicadores e processos que transformam a terceirização em um motor de eficiência, qualidade e segurança.',
  },
  {
    slug: 'praticas-para-reduzir-custos-com-facilities',
    title: '5 práticas para reduzir custos operacionais com facilities',
    category: 'Facilities',
    date: '08 de maio de 2026',
    readTime: '4 min de leitura',
    excerpt:
      'Dicas aplicáveis para otimizar processos, reduzir desperdícios e melhorar resultados.',
  },
  {
    slug: 'limpeza-profissional-pilar-do-negocio',
    title: 'Limpeza profissional: mais que higiene, um pilar do negócio',
    category: 'Limpeza Profissional',
    date: '02 de maio de 2026',
    readTime: '6 min de leitura',
    excerpt:
      'Como ambientes limpos aumentam produtividade, segurança e percepção de qualidade.',
  },
  {
    slug: 'terceirizacao-com-qualidade-como-escolher-parceiro',
    title: 'Terceirização com qualidade: como escolher o parceiro ideal',
    category: 'Contratação de Serviços',
    date: '28 de abril de 2026',
    readTime: '5 min de leitura',
    excerpt:
      'Critérios essenciais para avaliar empresas de facilities e garantir uma parceria segura.',
  },
  {
    slug: 'gestao-de-facilities-em-condominios',
    title: 'Gestão de facilities em condomínios: o que considerar',
    category: 'Condomínios',
    date: '22 de abril de 2026',
    readTime: '4 min de leitura',
    excerpt:
      'Boas práticas para garantir segurança, conservação e satisfação dos moradores.',
  },
  {
    slug: 'indicadores-que-transformam-a-gestao-operacional',
    title: 'Indicadores que transformam a gestão operacional',
    category: 'Gestão Operacional',
    date: '15 de abril de 2026',
    readTime: '4 min de leitura',
    excerpt:
      'KPIs essenciais para medir desempenho e tomar decisões baseadas em dados.',
  },
];

export const faqs = [
  {
    question: 'Quais serviços a LCS oferece?',
    answer:
      'A LCS oferece soluções em facilities, limpeza profissional, portaria, manutenção predial, apoio administrativo e terceirização operacional.',
  },
  {
    question: 'A LCS atende empresas de qual porte?',
    answer:
      'Atendemos desde operações pequenas e médias até ambientes corporativos, industriais e institucionais com rotinas mais complexas.',
  },
  {
    question: 'Os profissionais são treinados?',
    answer:
      'Sim. As equipes são orientadas, uniformizadas e acompanhadas para manter o padrão de atendimento definido no contrato.',
  },
  {
    question: 'Como funciona o início do contrato?',
    answer:
      'Começamos com diagnóstico, proposta personalizada, planejamento da operação e implantação com acompanhamento próximo.',
  },
];
