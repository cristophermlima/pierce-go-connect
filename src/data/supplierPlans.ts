
export const supplierPlans = [
  {
    id: "supplier_monthly",
    name: "Fornecedor Básico",
    price: "R$ 29,90",
    period: "/mês",
    originalPrice: null,
    description: "Ideal para fornecedores que querem começar a divulgar seus produtos",
    features: [
      "Listagem no diretório de fornecedores",
      "Página com informações básicas e contato",
      "Até 5 fotos de produtos",
      "Visibilidade nas buscas por categoria",
      "Suporte por e-mail"
    ],
    popular: false,
    color: "from-blue-500 to-cyan-500",
    badge: "Mensal",
    badgeColor: "bg-blue-500"
  },
  {
    id: "supplier_semester",
    name: "Fornecedor Destaque",
    price: "R$ 149,90",
    period: "/semestre",
    originalPrice: "R$ 24,98/mês",
    description: "Ideal para fornecedores estabelecidos que querem mais visibilidade",
    features: [
      "Tudo do plano básico",
      "Destaque nas buscas por região",
      "Até 15 fotos de produtos",
      "Inclusão na newsletter mensal",
      "Badge de 'Fornecedor Verificado'",
      "Relatório de visualizações",
      "Suporte prioritário"
    ],
    popular: true,
    color: "from-purple-500 to-violet-500",
    badge: "Semestral",
    badgeColor: "bg-purple-500"
  },
  {
    id: "supplier_annual",
    name: "Fornecedor Premium",
    price: "R$ 239,00",
    period: "/ano",
    originalPrice: "R$ 19,92/mês",
    description: "Ideal para grandes fornecedores que querem máxima exposição",
    features: [
      "Tudo dos planos anteriores",
      "Posicionamento premium nas buscas",
      "Galeria ilimitada de produtos",
      "Página customizada com banner",
      "Inclusão em campanhas especiais",
      "Análises detalhadas de performance",
      "Suporte dedicado por WhatsApp"
    ],
    popular: false,
    color: "from-amber-500 to-orange-500",
    badge: "Anual",
    badgeColor: "bg-amber-500"
  }
];
