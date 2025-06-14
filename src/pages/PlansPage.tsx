import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Check, Crown, Star } from "lucide-react";

const eventOrganizerPlans = [
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

const supplierPlans = [
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

const piercerPlans = [
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
    badgeColor: "bg-indigo-500"
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
    badgeColor: "bg-pink-500"
  }
];

export default function PlansPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planType: string) => {
    if (!user) {
      toast.error("Você precisa estar logado para assinar um plano");
      return;
    }

    setLoading(planType);
    try {
      const { data, error } = await supabase.functions.invoke("create-subscription-checkout", {
        body: { planType }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      console.error("Error creating checkout:", error);
      toast.error("Erro ao processar assinatura. Tente novamente.");
    } finally {
      setLoading(null);
    }
  };

  const renderPlans = (plans: typeof eventOrganizerPlans) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {plans.map((plan) => (
        <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-yellow-500 scale-105' : ''}`}>
          <Badge className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.badgeColor}`}>
            {plan.popular && <Star className="w-3 h-3 mr-1" />}
            {plan.badge}
            {plan.popular && " - Mais Popular"}
          </Badge>
          
          <CardHeader>
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
              <Crown className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>
            {plan.originalPrice && (
              <p className="text-sm text-green-600 font-medium">
                {plan.originalPrice}
              </p>
            )}
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading === plan.id}
              className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90`}
            >
              {loading === plan.id ? "Processando..." : "Assinar Agora"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Planos para <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Profissionais</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para seu perfil profissional no mundo do body piercing
          </p>
        </div>

        <Tabs defaultValue="piercers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-10">
            <TabsTrigger value="piercers">Piercers</TabsTrigger>
            <TabsTrigger value="organizers">Organizadores de Eventos</TabsTrigger>
            <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="piercers" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Planos para Piercers</h2>
              <p className="text-muted-foreground">
                Tenha destaque e recursos exclusivos sendo assinante premium como piercer.
              </p>
            </div>
            {renderPlans(piercerPlans as any)}
          </TabsContent>

          <TabsContent value="organizers" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Planos para Organizadores de Eventos</h2>
              <p className="text-muted-foreground">
                Divulgue seus eventos e cursos de body piercing para milhares de pessoas
              </p>
            </div>
            {renderPlans(eventOrganizerPlans)}
          </TabsContent>
          
          <TabsContent value="suppliers" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Planos para Fornecedores</h2>
              <p className="text-muted-foreground">
                Mostre seus produtos e serviços para profissionais e entusiastas do piercing
              </p>
            </div>
            {renderPlans(supplierPlans)}
          </TabsContent>
        </Tabs>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Pagamento seguro processado pelo Stripe • Cancele a qualquer momento
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
