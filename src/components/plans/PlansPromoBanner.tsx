
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Percent } from "lucide-react";

export function PlansPromoBanner() {
  return (
    <Alert className="mb-8 bg-pink-50 border-pink-300 text-pink-900 shadow-sm flex items-center" variant="default">
      <Percent className="w-6 h-6 mr-2 text-pink-400" />
      <div>
        <AlertTitle>Promoção limitada!</AlertTitle>
        <AlertDescription>
          Aproveite <span className="font-bold text-pink-600">30% OFF</span> no plano anual Piercer Premium nos 7 primeiros dias após cadastro.<br/>
          Não perca essa oportunidade!
        </AlertDescription>
      </div>
    </Alert>
  );
}
