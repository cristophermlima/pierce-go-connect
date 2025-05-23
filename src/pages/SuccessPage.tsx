
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/sonner";
import { CheckCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [verifying, setVerifying] = useState(true);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  useEffect(() => {
    async function verifySubscription() {
      try {
        // Get session ID from URL query params
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');

        if (!sessionId) {
          toast.error("Nenhuma sessão de pagamento encontrada.");
          navigate("/planos");
          return;
        }

        // Verify the subscription status
        const { data, error } = await supabase.functions.invoke("check-subscription");
        
        if (error) {
          console.error("Error verifying subscription:", error);
          toast.error("Erro ao verificar assinatura.");
          return;
        }

        if (data.subscribed) {
          setSubscriptionDetails(data);
          toast.success("Assinatura ativada com sucesso!");
        } else {
          // This should not normally happen if the payment was successful
          toast.error("Assinatura não encontrada. Tente novamente ou entre em contato com o suporte.");
        }
      } catch (error) {
        console.error("Error in subscription verification:", error);
        toast.error("Erro ao processar assinatura.");
      } finally {
        setVerifying(false);
      }
    }

    verifySubscription();
  }, [location.search, navigate, toast]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  const getPlanName = (tier: string) => {
    switch (tier) {
      case "pro":
        return "Profissional";
      case "business":
        return "Business";
      default:
        return "Plano Desconhecido";
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl py-16 px-4">
        <div className="glass-card border border-primary/30 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCheck className="h-10 w-10 text-emerald-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Pagamento Confirmado!</h1>
          
          {verifying ? (
            <p className="text-muted-foreground mb-6">Verificando detalhes da sua assinatura...</p>
          ) : subscriptionDetails ? (
            <div className="space-y-4 mb-8">
              <p className="text-xl">
                Sua assinatura do plano <span className="font-bold text-primary">{getPlanName(subscriptionDetails.subscription_tier)}</span> foi ativada com sucesso!
              </p>
              <p className="text-muted-foreground">
                Validade até: {formatDate(subscriptionDetails.subscription_end)}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground mb-6">Os detalhes da assinatura estarão disponíveis em breve.</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate("/perfil")}
              className="w-full sm:w-auto"
            >
              Ver meu perfil
            </Button>
            <Button 
              onClick={() => navigate("/")}
              className="w-full sm:w-auto bg-gradient-to-r from-piercing-purple to-piercing-blue"
            >
              Ir para o início
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
