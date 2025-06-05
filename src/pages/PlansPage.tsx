
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Check, Crown, Star } from "lucide-react";

const plans = [
  {
    id: "event_organizer",
    name: "Organizador de Eventos",
    price: "R$ 29,90",
    period: "/mês",
    description: "Para profissionais que organizam eventos de body piercing",
    features: [
      "Criar eventos ilimitados",
      "Dashboard avançado de analytics",
      "Gestão de participantes",
      "Relatórios detalhados",
      "Suporte prioritário",
      "Badge de verificação"
    ],
    popular: true,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "supplier",
    name: "Fornecedor Premium",
    price: "R$ 39,90",
    period: "/mês",
    description: "Para fornecedores de joias, equipamentos e materiais",
    features: [
      "Catálogo de produtos ilimitado",
      "Destaque nas buscas",
      "Analytics de vendas",
      "Sistema de avaliações premium",
      "Integração com WhatsApp",
      "Badge de fornecedor verificado"
    ],
    popular: false,
    color: "from-blue-500 to-cyan-500"
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

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Escolha seu <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Plano</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desbloqueie todo o potencial da plataforma com nossos planos premium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              )}
              
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
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
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

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Pagamento seguro processado pelo Stripe • Cancele a qualquer momento
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
