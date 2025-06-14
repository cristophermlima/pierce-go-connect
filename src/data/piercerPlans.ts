
export const piercerPlans = [
  {
    id: "piercer_monthly",
    name: "Piercer Premium Mensal",
    price: "R$ 9,90",
    period: "/mês",
    originalPrice: null,
    description: "Assinatura mensal para piercers profissionais com benefícios exclusivos.",
    features: [
      "Destacar perfil no diretório de piercers",
      "Prioridade nas pesquisas regionais",
      "Acesso a recursos premium da plataforma",
      "Suporte dedicado via WhatsApp"
    ],
    popular: false,
    color: "from-indigo-500 to-fuchsia-500",
    badge: "Mensal",
    badgeColor: "bg-indigo-500",
    trialDays: 7 // trial de 7 dias mensais para demonstração
  },
  {
    id: "piercer_annual",
    name: "Piercer Premium Anual",
    price: "R$ 79,90",
    period: "/ano",
    originalPrice: "Equivale a R$ 6,66/mês",
    description: "Assinatura anual com desconto para piercers que querem sempre visibilidade máxima.",
    features: [
      "Todos benefícios do plano mensal",
      "Desconto exclusivo anual",
      "Convites para eventos exclusivos",
      "Brindes e campanhas promocionais"
    ],
    popular: true,
    color: "from-pink-500 to-purple-500",
    badge: "Anual",
    badgeColor: "bg-pink-500",
    trialDays: 14 // exemplo: trial de 14 dias anual
  }
];
