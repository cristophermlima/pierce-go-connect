
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SupplierCardProps {
  name: string;
  type: string;
  location: string;
  rating: string;
  reviews: string;
  image: string;
  onEvaluate: () => void;
}

export function SupplierCard({ name, type, location, rating, reviews, image, onEvaluate }: SupplierCardProps) {
  return (
    <Card className="overflow-hidden border-border/30 bg-card/80 backdrop-blur-sm">
      <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      
      <div className="p-4">
        <div className="text-sm text-primary">{type}</div>
        <h3 className="font-bold text-xl mt-1">{name}</h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {location}
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <div className="text-yellow-400">⭐</div>
          <div className="font-semibold">{rating}</div>
          <div className="text-muted-foreground text-sm">({reviews})</div>
        </div>
        
        <div className="flex flex-col gap-2 mt-4">
          <Button variant="outline" className="w-full">Ver Detalhes</Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onEvaluate}
          >
            Avaliar
          </Button>
        </div>
      </div>
    </Card>
  );
}
