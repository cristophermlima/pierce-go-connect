
export const eventOrganizerPlans = [
  {
    id: "event_organizer_monthly",
    name: "Presença Básica",
    price: "R$ 19,90",
    period: "/mês",
    originalPrice: null,
    description: "Ideal para quem quer testar ou divulgar um evento pontual",
    features: [
      "Publicação de 1 evento ou curso por mês",
      "Página com nome, descrição, data, cidade e link",
      "Aparece na agenda do Piercer Go com filtros",
      "Visibilidade padrão nas buscas",
      "Suporte por e-mail"
    ],
    popular: false,
    color: "from-green-500 to-emerald-500",
    badge: "Mensal",
    badgeColor: "bg-green-500"
  },
  {
    id: "event_organizer_semester",
    name: "Destaque Recorrente",
    price: "R$ 99,00",
    period: "/semestre",
    originalPrice: "R$ 16,50/mês",
    description: "Ideal para quem realiza cursos ou turmas com frequência",
    features: [
      "Publicação de até 3 eventos",
      "Página com até 3 imagens + botão de inscrição",
      "Destaque nas buscas por cidade e tipo",
      "Inclusão mensal na newsletter regional",
      "Relatório de visualizações e cliques",
      "Suporte por e-mail com prioridade"
    ],
    popular: true,
    color: "from-yellow-500 to-orange-500",
    badge: "Semestral",
    badgeColor: "bg-yellow-500"
  },
  {
    id: "event_organizer_annual",
    name: "Organizador Parceiro",
    price: "R$ 179,00",
    period: "/ano",
    originalPrice: "R$ 14,90/mês",
    description: "Ideal para escolas, estúdios ou produtores que fazem eventos o ano todo",
    features: [
      "4 publicações diferentes durante o ano",
      "Página completa com galeria, vídeo e botão",
      "Destaque superior nas buscas regionais",
      "Inclusão em até 4 campanhas de e-mail marketing",
      'Selo "Organizador Parceiro" na página',
      "Relatório semestral com dados de alcance",
      "Suporte por WhatsApp e e-mail prioritário"
    ],
    popular: false,
    color: "from-red-500 to-pink-500",
    badge: "Anual",
    badgeColor: "bg-red-500"
  }
];
