import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import PricingCard from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Store, User } from "lucide-react";

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const userPlans = [
    {
      title: "Gratuito",
      price: 0,
      period: "sempre",
      description: "Para usuários que querem explorar a plataforma",
      features: [
        "Visualizar eventos",
        "Avaliar eventos e fornecedores",
        "Acesso limitado a conteúdo"
      ]
    },
    {
      title: "Agenda Pessoal",
      price: billingCycle === "monthly" ? 5.9 : 59,
      period: billingCycle === "monthly" ? "mês" : "ano",
      description: "Ideal para organizar sua agenda pessoal",
      features: [
        "Tudo do plano gratuito",
        "Agenda pessoal completa",
        "Lembretes e notificações",
        "Sincronização de eventos"
      ]
    },
    {
      title: "Profissional",
      price: billingCycle === "monthly" ? 29 : 290,
      period: billingCycle === "monthly" ? "mês" : "ano",
      description: "Para profissionais do piercing",
      features: [
        "Tudo do plano Agenda Pessoal",
        "Agenda avançada",
        "Planejamento de viagens",
        "Avaliações detalhadas",
        "Suporte prioritário"
      ],
      highlight: true
    },
    {
      title: "Premium",
      price: billingCycle === "monthly" ? 49 : 490,
      period: billingCycle === "monthly" ? "mês" : "ano",
      description: "Para profissionais avançados",
      features: [
        "Tudo do plano profissional",
        "Recursos exclusivos",
        "Análises detalhadas",
        "Acesso antecipado a novidades",
        "Consultoria personalizada"
      ]
    }
  ];

  const supplierPlans = [
    {
      title: "Básico",
      price: billingCycle === "monthly" ? 49 : 490,
      period: billingCycle === "monthly" ? "mês" : "ano",
      description: "Para pequenas lojas e fornecedores iniciantes",
      features: [
        "Perfil de loja básico",
        "Até 10 produtos anunciados",
        "Avaliações de clientes",
        "Contato direto com clientes",
        "Estatísticas básicas"
      ]
    },
    {
      title: "Profissional",
      price: billingCycle === "monthly" ? 99 : 990,
      period: billingCycle === "monthly" ? "mês" : "ano",
      description: "Para fornecedores estabelecidos",
      features: [
        "Tudo do plano básico",
        "Produtos ilimitados",
        "Destaque na busca",
        "Múltiplas imagens por produto",
        "Promoções e descontos",
        "Relatórios detalhados"
      ],
      highlight: true
    },
    {
      title: "Enterprise",
      price: billingCycle === "monthly" ? 199 : 1990,
      period: billingCycle === "monthly" ? "mês" : "ano",
      description: "Para grandes fornecedores e distribuidores",
      features: [
        "Tudo do plano profissional",
        "API de integração",
        "Gerenciamento de múltiplas lojas",
        "Suporte dedicado",
        "Treinamento personalizado",
        "Análises avançadas de mercado"
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Escolha seu plano</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Planos flexíveis para profissionais do piercing e fornecedores
            </p>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profissionais
                </TabsTrigger>
                <TabsTrigger value="suppliers" className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Fornecedores
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4 p-1 bg-muted rounded-lg">
                <Button
                  variant={billingCycle === "monthly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBillingCycle("monthly")}
                  className="rounded-md"
                >
                  Mensal
                </Button>
                <Button
                  variant={billingCycle === "yearly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBillingCycle("yearly")}
                  className="rounded-md"
                >
                  Anual
                  <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                    2 meses grátis
                  </span>
                </Button>
              </div>
            </div>

            <TabsContent value="users">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {userPlans.map((plan, index) => (
                  <PricingCard key={index} {...plan} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="suppliers">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {supplierPlans.map((plan, index) => (
                  <PricingCard key={index} {...plan} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Posso cancelar a qualquer momento?</h3>
                  <p className="text-muted-foreground text-sm">
                    Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Os preços incluem impostos?</h3>
                  <p className="text-muted-foreground text-sm">
                    Os preços são apresentados sem impostos. Impostos aplicáveis serão adicionados no checkout.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Existe desconto para planos anuais?</h3>
                  <p className="text-muted-foreground text-sm">
                    Sim, planos anuais têm desconto equivalente a 2 meses gratuitos.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Como funciona o suporte?</h3>
                  <p className="text-muted-foreground text-sm">
                    Oferecemos suporte via email para todos os planos, com suporte prioritário para planos pagos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
