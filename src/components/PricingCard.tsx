
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  onSubscribe: () => void;
  loading?: boolean;
}

export function PricingCard({
  title,
  description,
  price,
  period,
  features,
  popular = false,
  onSubscribe,
  loading = false
}: PricingCardProps) {
  return (
    <Card className={`relative ${popular ? 'ring-2 ring-purple-500' : ''}`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500">
          Mais Popular
        </Badge>
      )}
      
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onSubscribe}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          {loading ? "Processando..." : "Assinar Agora"}
        </Button>
      </CardContent>
    </Card>
  );
}
