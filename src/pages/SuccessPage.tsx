
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useSubscription } from "@/hooks/useSubscription";

export default function SuccessPage() {
  const navigate = useNavigate();
  const { checkSubscription } = useSubscription();
  
  useEffect(() => {
    // Check subscription status after successful payment
    const updateSubscriptionStatus = async () => {
      try {
        await checkSubscription();
        toast.success("Assinatura ativada com sucesso!");
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };
    
    updateSubscriptionStatus();
  }, [checkSubscription]);
  
  return (
    <MainLayout>
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-3">Pagamento Confirmado!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Obrigado pela sua assinatura. Sua conta foi atualizada com sucesso.
            Agora você tem acesso a recursos premium como adicionar eventos à sua agenda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => navigate("/agenda")}
              className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
            >
              Ir para Agenda
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/perfil")}
            >
              Ver Perfil
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
            >
              Voltar para Início
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
