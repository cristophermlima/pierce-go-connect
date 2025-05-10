
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export default function PricingCard({ 
  title, 
  price, 
  period, 
  description, 
  features, 
  highlight = false 
}: PricingCardProps) {
  return (
    <div className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
      highlight ? 
      'border-primary/50 shadow-lg shadow-primary/20 scale-105 md:scale-110' : 
      'hover:border-white/20'
    }`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold">R${price}</span>
        <span className="ml-1 text-sm text-muted-foreground">/{period}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex text-sm">
            <Check className="mr-2 h-5 w-5 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className={`mt-6 w-full button-glow ${
        highlight ? 
        'bg-gradient-to-r from-piercing-purple to-piercing-blue' : 
        'bg-card hover:bg-card/80 border border-primary/40'
      }`}>
        {highlight ? 'Comece Agora' : 'Assinar'}
      </Button>
    </div>
  );
}
