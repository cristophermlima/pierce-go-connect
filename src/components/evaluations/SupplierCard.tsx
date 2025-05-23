
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ReviewsList from "@/components/ReviewsList";

interface SupplierCardProps {
  title: string;
  type: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  onAddReview?: () => void;
  refreshKey?: number; // Add refreshKey prop
  id?: string; // Add optional id prop
}

export function SupplierCard({ 
  title, 
  type, 
  image, 
  location, 
  rating, 
  reviews, 
  onAddReview,
  refreshKey = 0, // Default to 0
  id
}: SupplierCardProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  return (
    <>
      <div className="overflow-hidden border-border/30 bg-card/80 backdrop-blur-sm rounded-lg">
        <div className="relative h-48 bg-muted">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 pb-2">
          <div className="text-sm text-primary mb-1">{type}</div>
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {location}
          </div>
        </div>
        <div className="px-4 space-y-3 pt-0">
          <div className="flex items-center gap-2">
            <div className="text-yellow-400">⭐</div>
            <div className="font-semibold">{rating}</div>
            <div className="text-muted-foreground text-sm">({reviews})</div>
          </div>
        </div>
        <div className="p-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowDetailsDialog(true)}
          >
            Ver Avaliações
          </Button>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{location} - {type}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="text-yellow-400 text-xl">⭐</div>
              <div className="font-semibold text-lg">{rating}</div>
              <div className="text-muted-foreground">({reviews} avaliações)</div>
            </div>
            
            {/* Show actual reviews using ReviewsList */}
            {id ? (
              <ReviewsList 
                type="supplier" 
                entityId={id} 
                onAddReview={onAddReview}
                refreshKey={refreshKey} 
              />
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">Ainda não há avaliações para este fornecedor.</p>
                <Button 
                  onClick={onAddReview}
                  className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
                >
                  Seja o primeiro a avaliar
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SupplierCard;
