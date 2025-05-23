
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ReviewsList from "@/components/ReviewsList";

interface EventCardProps {
  title: string;
  type: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  technicalRating: number;
  ethicalRating: number;
  diplomaticRating: number;
  onAddReview?: () => void;
  refreshKey?: number; // Add refreshKey prop
  id?: string; // Add optional id prop
}

export function EventCard({ 
  title, 
  type, 
  image, 
  location, 
  rating, 
  reviews, 
  technicalRating, 
  ethicalRating, 
  diplomaticRating,
  onAddReview,
  refreshKey = 0, // Default to 0
  id
}: EventCardProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  return (
    <>
      <div className="overflow-hidden border-border/30 bg-card/80 backdrop-blur-sm rounded-lg">
        <div className="relative h-48 bg-muted">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Oficial
          </div>
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

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="m9 9-2 2 2 2"></path><path d="m13 13 2-2-2-2"></path><circle cx="12" cy="12" r="10"></circle></svg>
                <span className="text-sm">Técnica</span>
              </div>
              <div className="flex text-yellow-400">
                {"★".repeat(technicalRating)}{"☆".repeat(5-technicalRating)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path><circle cx="16.5" cy="7.5" r=".5"></circle></svg>
                <span className="text-sm">Ética</span>
              </div>
              <div className="flex text-yellow-400">
                {"★".repeat(ethicalRating)}{"☆".repeat(5-ethicalRating)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1z"></path></svg>
                <span className="text-sm">Diplomacia</span>
              </div>
              <div className="flex text-yellow-400">
                {"★".repeat(diplomaticRating)}{"☆".repeat(5-diplomaticRating)}
              </div>
            </div>
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
            <DialogDescription>{location}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="text-yellow-400 text-xl">⭐</div>
              <div className="font-semibold text-lg">{rating}</div>
              <div className="text-muted-foreground">({reviews} avaliações)</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="m9 9-2 2 2 2"></path><path d="m13 13 2-2-2-2"></path><circle cx="12" cy="12" r="10"></circle></svg>
                  <span>Técnica</span>
                </div>
                <div className="flex text-yellow-400 text-lg">
                  {"★".repeat(technicalRating)}{"☆".repeat(5-technicalRating)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path><circle cx="16.5" cy="7.5" r=".5"></circle></svg>
                  <span>Ética</span>
                </div>
                <div className="flex text-yellow-400 text-lg">
                  {"★".repeat(ethicalRating)}{"☆".repeat(5-ethicalRating)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1z"></path></svg>
                  <span>Diplomacia</span>
                </div>
                <div className="flex text-yellow-400 text-lg">
                  {"★".repeat(diplomaticRating)}{"☆".repeat(5-diplomaticRating)}
                </div>
              </div>
            </div>
            
            {/* Show actual reviews using ReviewsList */}
            {id ? (
              <ReviewsList 
                type="event" 
                entityId={id} 
                onAddReview={onAddReview}
                refreshKey={refreshKey} 
              />
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">Ainda não há avaliações para este evento.</p>
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

export default EventCard;
