
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
    <Card className={`relative ${plan.popular ? 'ring-2 ring-yellow-500 scale-105' : ''}`}>
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
          onClick={() => onSubscribe(plan.id)}
          disabled={loading}
          className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90`}
        >
          {loading ? "Processando..." : "Assinar Agora"}
        </Button>
      </CardContent>
    </Card>
  );
}
