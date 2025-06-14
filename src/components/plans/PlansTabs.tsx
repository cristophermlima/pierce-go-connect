
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlanCard } from "./PlanCard";
import { eventOrganizerPlans } from "@/data/eventOrganizerPlans";
import { supplierPlans } from "@/data/supplierPlans";
import { piercerPlans } from "@/data/piercerPlans";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export function PlansTabs() {
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

  const renderPlans = (plans: typeof piercerPlans) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          loading={loading === plan.id}
          onSubscribe={handleSubscribe}
        />
      ))}
    </div>
  );

  return (
    <Tabs defaultValue="piercers" className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto mb-10 gap-2 sm:gap-0">
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
        {renderPlans(piercerPlans)}
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
  );
}
