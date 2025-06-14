
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown } from "lucide-react";

interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    price: string;
    period: string;
    originalPrice: string | null;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
    badge: string;
    badgeColor: string;
  };
  loading: boolean;
  onSubscribe: (planId: string) => void;
}

export function PlanCard({ plan, loading, onSubscribe }: PlanCardProps) {
  return (
    <Card 
      className={`relative flex flex-col justify-between w-full max-w-md mx-auto md:mx-0 ${plan.popular ? 'ring-2 ring-yellow-500 scale-105' : ''} transition-transform duration-150`}
    >
      {/* Trial info visual se disponível */}
      {plan.trialDays && (
        <span className="absolute top-3 right-3 bg-green-200 text-green-900 text-xs font-semibold px-3 py-1 rounded-full z-10 shadow">Trial {plan.trialDays} dias grátis</span>
      )}
      <Badge className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.badgeColor} px-3 py-1 text-base flex items-center`}>
        {plan.popular && <Star className="w-3 h-3 mr-1" />}
        {plan.badge}
        {plan.popular && " - Mais Popular"}
      </Badge>
      <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4 px-4 text-center">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-2`}>
          <Crown className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="flex flex-col sm:flex-row items-center gap-1 mt-2">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground">{plan.period}</span>
        </div>
        {plan.originalPrice && (
          <p className="text-sm text-green-500 font-medium">
            {plan.originalPrice}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between px-4 space-y-6 pb-6">
        <ul className="space-y-3 mb-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-left">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => onSubscribe(plan.id)}
          disabled={loading}
          className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 py-2 text-base font-semibold rounded-md`}
        >
          {loading ? "Processando..." : plan.trialDays ? `Testar Grátis (${plan.trialDays} dias)` : "Assinar Agora"}
        </Button>
      </CardContent>
    </Card>
  );
}
