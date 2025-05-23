
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
  color: string;
}

export default function PlansPage() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handlePlanSelection = async (planId: string) => {
    if (!user) {
      toast.error("Você precisa estar logado para assinar um plano", {
        description: "Faça login para continuar com a assinatura"
      });
      navigate("/auth", { state: { from: "/planos" } });
      return;
    }
    
    setSelectedPlan(planId);
    setIsLoading(planId);
    
    try {
      // For free plan, just show success message
      if (planId === "free") {
        toast.success("Plano gratuito selecionado!");
        setIsLoading(null);
        return;
      }
      
      // For paid plans, create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan: planId, billingInterval }
      });
      
      if (error) {
        console.error("Error creating checkout session:", error);
        toast.error("Erro ao processar pagamento", {
          description: "Ocorreu um erro ao criar a sessão de pagamento."
        });
        return;
      }
      
      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        toast.error("Erro ao gerar link de pagamento");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("Erro ao processar pagamento");
    } finally {
      setIsLoading(null);
    }
  };
  
  const pricingPlans: PricingPlan[] = [
    {
      id: "free",
      name: "Gratuito",
      description: "Para profissionais iniciantes que querem experimentar.",
      price: 0,
      color: "bg-muted hover:bg-muted/80 text-foreground",
      features: [
        { name: "Acesso à agenda de eventos", included: true },
        { name: "Avaliação básica de eventos", included: true },
        { name: "Perfil pessoal", included: true },
        { name: "Comunidade de piercers", included: true },
        { name: "Acesso ilimitado às avaliações", included: false },
        { name: "Planejamento de viagens", included: false },
        { name: "Descontos exclusivos com fornecedores", included: false },
        { name: "API para integração com outros sistemas", included: false },
      ],
      buttonText: "Começar Grátis"
    },
    {
      id: "pro",
      name: "Profissional",
      description: "Para piercers ativos que querem expandir sua rede.",
      price: billingInterval === "monthly" ? 19.90 : 199.90,
      color: "bg-gradient-to-r from-piercing-purple to-piercing-pink text-white",
      features: [
        { name: "Acesso à agenda de eventos", included: true },
        { name: "Avaliação básica de eventos", included: true },
        { name: "Perfil pessoal", included: true },
        { name: "Comunidade de piercers", included: true },
        { name: "Acesso ilimitado às avaliações", included: true },
        { name: "Planejamento de viagens", included: true },
        { name: "Descontos exclusivos com fornecedores", included: true },
        { name: "API para integração com outros sistemas", included: false },
      ],
      popular: true,
      buttonText: "Assinar Agora"
    },
    {
      id: "business",
      name: "Business",
      description: "Para estúdios e organizadores de eventos.",
      price: billingInterval === "monthly" ? 49.90 : 499.90,
      color: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
      features: [
        { name: "Acesso à agenda de eventos", included: true },
        { name: "Avaliação básica de eventos", included: true },
        { name: "Perfil pessoal", included: true },
        { name: "Comunidade de piercers", included: true },
        { name: "Acesso ilimitado às avaliações", included: true },
        { name: "Planejamento de viagens", included: true },
        { name: "Descontos exclusivos com fornecedores", included: true },
        { name: "API para integração com outros sistemas", included: true },
      ],
      buttonText: "Fale Conosco"
    }
  ];

  // Calculate savings for annual billing
  const getAnnualSavings = (planId: string): number => {
    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan || plan.id === "free") return 0;
    
    const monthlyCost = billingInterval === "monthly" ? plan.price : plan.price / 12;
    const annualCost = billingInterval === "annual" ? plan.price / 12 : plan.price * 12;
    
    return Number(((monthlyCost * 12) - annualCost).toFixed(2));
  };

  return (
    <MainLayout className="bg-gradient-to-b from-black to-gray-900">
      <div className="container py-10 px-4">
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
                className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-100 md:scale-105' : ''} transition-all duration-300 hover:border-primary/70 hover:shadow-md`}
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
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? 'Grátis' : `R$${plan.price.toFixed(2)}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground ml-1">
                        /{billingInterval === "monthly" ? "mês" : "ano"}
                      </span>
                    )}
                    
                    {billingInterval === "annual" && plan.price > 0 && (
                      <p className="text-sm text-emerald-500 mt-1">
                        Economia de R${getAnnualSavings(plan.id)} por ano
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        {feature.included ? (
                          <Check className="mr-2 h-5 w-5 text-emerald-500 shrink-0" />
                        ) : (
                          <X className="mr-2 h-5 w-5 text-gray-400 shrink-0" />
                        )}
                        <span className={!feature.included ? "text-muted-foreground" : ""}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.color}`}
                    onClick={() => handlePlanSelection(plan.id)}
                    disabled={isLoading !== null}
                  >
                    {isLoading === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      plan.buttonText
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-8">Perguntas Frequentes</h2>
            
            <div className="max-w-3xl mx-auto grid gap-6">
              <Card className="text-left bg-transparent">
                <CardHeader>
                  <CardTitle className="text-lg">Posso cancelar minha assinatura a qualquer momento?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sim, todas as assinaturas podem ser canceladas a qualquer momento sem taxas adicionais. 
                    Após o cancelamento, você continuará tendo acesso aos recursos do seu plano até o fim do período pago.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-left bg-transparent">
                <CardHeader>
                  <CardTitle className="text-lg">Como funciona o período de teste?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oferecemos 7 dias de teste gratuito para os planos Profissional e Business, sem necessidade de cartão de crédito. 
                    Durante este período, você terá acesso a todos os recursos do plano selecionado.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-left bg-transparent">
                <CardHeader>
                  <CardTitle className="text-lg">O que acontece se eu mudar de plano?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Você pode atualizar seu plano a qualquer momento, e iremos ajustar o valor proporcional ao tempo restante do seu plano atual. 
                    Ao fazer upgrade, você terá acesso imediato aos novos recursos.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-left bg-transparent">
                <CardHeader>
                  <CardTitle className="text-lg">Quais formas de pagamento são aceitas?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Aceitamos cartões de crédito das principais bandeiras (Visa, Mastercard, American Express), PIX e boleto bancário para pagamentos no Brasil.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-primary/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Precisa de um plano personalizado?</h3>
                <p className="text-muted-foreground mb-6">
                  Para grandes estúdios ou organizadores de eventos com necessidades específicas, oferecemos planos personalizados. 
                  Entre em contato conosco para discutirmos como podemos atender às suas necessidades.
                </p>
                <Button 
                  className="bg-gradient-to-r from-piercing-purple to-piercing-blue text-white"
                  onClick={() => navigate("/submit", { state: { subject: "Plano Personalizado" } })}
                >
                  Fale com nossa equipe
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
