
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}

export default function SubscriptionCard() {
  const { user } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [managingSubscription, setManagingSubscription] = useState(false);

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  const checkSubscription = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) {
        console.error("Error checking subscription:", error);
        toast.error("Erro ao verificar status da assinatura");
        return;
      }
      
      setSubscriptionData(data);
    } catch (error) {
      console.error("Subscription check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setManagingSubscription(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      
      if (error) {
        console.error("Error creating portal session:", error);
        toast.error("Erro ao abrir portal de gerenciamento");
        return;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Subscription management error:", error);
      toast.error("Erro ao gerenciar assinatura");
    } finally {
      setManagingSubscription(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  const getPlanDetails = (tier?: string) => {
    switch (tier) {
      case "pro":
        return {
          name: "Profissional",
          color: "bg-gradient-to-r from-piercing-purple to-piercing-pink",
          badgeVariant: "purple"
        };
      case "business":
        return {
          name: "Business",
          color: "bg-gradient-to-r from-blue-500 to-indigo-600",
          badgeVariant: "info"
        };
      default:
        return {
          name: "Gratuito",
          color: "bg-muted",
          badgeVariant: "outline"
        };
    }
  };

  const planDetails = getPlanDetails(subscriptionData?.subscription_tier);

  return (
    <Card className="border border-primary/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Sua Assinatura</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={checkSubscription}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Atualizar"}
          </Button>
        </div>
        <CardDescription>Gerenciar seu plano de assinatura</CardDescription>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Plano atual:</p>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-xl font-bold">{planDetails.name}</h3>
                  <Badge variant={planDetails.badgeVariant as any}>
                    {subscriptionData?.subscribed ? "Ativo" : "Gratuito"}
                  </Badge>
                </div>
              </div>
            </div>

            {subscriptionData?.subscribed && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Válido até: {formatDate(subscriptionData?.subscription_end)}
                </p>
              </div>
            )}

            <div className="pt-2">
              {subscriptionData?.subscribed ? (
                <p className="text-sm">
                  Você tem acesso a todos os recursos do plano {planDetails.name}.
                </p>
              ) : (
                <p className="text-sm">
                  Atualize para um plano pago para acessar recursos avançados.
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        {subscriptionData?.subscribed ? (
          <Button
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={handleManageSubscription}
            disabled={managingSubscription}
          >
            {managingSubscription ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="h-4 w-4" />
            )}
            Gerenciar assinatura
          </Button>
        ) : (
          <Button
            className={`w-full sm:w-auto ${planDetails.color} text-white`}
            onClick={() => window.location.href = "/planos"}
          >
            Atualizar plano
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
