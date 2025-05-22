
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

export default function PlansPage() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");
  const navigate = useNavigate();
  
  const handlePlanSelection = (planId: string) => {
    if (!user) {
      toast.error("Você precisa estar logado para assinar um plano");
      navigate("/auth");
      return;
    }
    
    setSelectedPlan(planId);
    // Em uma implementação real, aqui você redirecionaria para a página de checkout
    toast.success("Plano selecionado! Em breve você será redirecionado para o checkout.");
  };
  
  const pricingPlans: PricingPlan[] = [
    {
      id: "free",
      name: "Gratuito",
      description: "Para profissionais iniciantes que querem experimentar.",
      price: 0,
      features: [
        "Acesso à agenda de eventos",
        "Avaliação básica de eventos",
        "Perfil pessoal",
        "Comunidade de piercers"
      ],
      buttonText: "Começar Grátis"
    },
    {
      id: "pro",
      name: "Profissional",
      description: "Para piercers ativos que querem expandir sua rede.",
      price: billingInterval === "monthly" ? 19.90 : 199,
      features: [
        "Todos os recursos do plano gratuito",
        "Acesso ilimitado às avaliações",
        "Planejamento de viagens",
        "Descontos exclusivos com fornecedores",
        "Networking com organizadores"
      ],
      popular: true,
      buttonText: "Assinar Agora"
    },
    {
      id: "business",
      name: "Business",
      description: "Para estúdios e organizadores de eventos.",
      price: billingInterval === "monthly" ? 49.90 : 499,
      features: [
        "Todos os recursos do plano profissional",
        "Publicação ilimitada de eventos",
        "Ferramentas de marketing digital",
        "Análise de dados e relatórios",
        "API para integração com outros sistemas",
        "Suporte prioritário"
      ],
      buttonText: "Fale Conosco"
    }
  ];

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Planos e Preços</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para impulsionar sua carreira como body piercer profissional.
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-muted rounded-full p-1">
              <Button
                variant={billingInterval === "monthly" ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => setBillingInterval("monthly")}
              >
                Mensal
              </Button>
              <Button
                variant={billingInterval === "annual" ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => setBillingInterval("annual")}
              >
                Anual <span className="ml-1 text-xs font-normal text-emerald-500">Economize 20%</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary text-white">
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground ml-1">
                        /{billingInterval === "monthly" ? "mês" : "ano"}
                      </span>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-piercing-purple to-piercing-pink' : (plan.id === "free" ? "bg-muted hover:bg-muted/80 text-foreground" : '')}`}
                    variant={plan.id === "free" ? "outline" : "default"}
                    onClick={() => handlePlanSelection(plan.id)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
            
            <div className="max-w-3xl mx-auto grid gap-6">
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Posso cancelar minha assinatura a qualquer momento?</h3>
                <p className="text-muted-foreground">Sim, todas as assinaturas podem ser canceladas a qualquer momento sem taxas adicionais.</p>
              </div>
              
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Como funciona o período de teste?</h3>
                <p className="text-muted-foreground">Oferecemos 7 dias de teste gratuito para os planos Profissional e Business, sem necessidade de cartão de crédito.</p>
              </div>
              
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">O que acontece se eu mudar de plano?</h3>
                <p className="text-muted-foreground">Você pode atualizar seu plano a qualquer momento, e iremos ajustar o valor proporcional ao tempo restante do seu plano atual.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
