
import MainLayout from "@/components/MainLayout";
import { PlansTabs } from "@/components/plans/PlansTabs";
import { PlansPromoBanner } from "@/components/plans/PlansPromoBanner";
import { Link } from "react-router-dom";

export default function PlansPage() {
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Planos para <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Profissionais</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para seu perfil profissional no mundo do body piercing
          </p>
          <div className="mt-4">
            <Link to="/faq-assinaturas" className="text-sm text-pink-500 hover:underline">
              Dúvidas? Veja o FAQ de Assinaturas
            </Link>
          </div>
        </div>

        <PlansPromoBanner />

        <PlansTabs />

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Pagamento seguro processado pelo Stripe • Cancele a qualquer momento
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
