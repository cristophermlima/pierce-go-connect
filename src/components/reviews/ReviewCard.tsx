
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarRating, CategoryStarRating } from "./StarRating";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export interface Review {
  id: string;
  author: string;
  authorAvatar?: string;
  date: string;
  rating: number;
  comment: string;
  technicalRating?: number;
  ethicalRating?: number;
  diplomaticRating?: number;
  organizationRating?: number;
  locationRating?: number;
  valueRating?: number;
  helpful: number;
  images?: string[];
  entityName?: string; // Add entity name field
}

interface ReviewCardProps {
  review: Review;
  type: "event" | "supplier";
  onReviewDeleted?: () => void;
}

export function ReviewCard({ review, type, onReviewDeleted }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAdmin } = useIsAdmin();
  
  const handleHelpfulClick = () => {
    setIsHelpful(!isHelpful);
  };

  const handleDeleteReview = async () => {
    if (!isAdmin) return;

    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', review.id);

      if (error) throw error;

      toast.success('Avaliação excluída com sucesso');
      if (onReviewDeleted) {
        onReviewDeleted();
      }
    } catch (error: any) {
      console.error('Error deleting review:', error);
      toast.error('Erro ao excluir avaliação');
    } finally {
      setIsDeleting(false);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="border border-border/30 rounded-lg p-4 bg-card/80 backdrop-blur-sm">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar>
            {review.authorAvatar ? (
              <AvatarImage src={review.authorAvatar} alt={review.author} />
            ) : (
              <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-semibold">{review.author}</div>
            <div className="text-sm text-muted-foreground">{review.date}</div>
            {review.entityName && (
              <div className="text-sm text-primary font-medium">
                {type === 'event' ? 'Evento: ' : 'Fornecedor: '}{review.entityName}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={review.rating} />
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteReview}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>
      
      {type === "event" && (review.technicalRating || review.ethicalRating || review.diplomaticRating) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3">
          {review.technicalRating && (
            <CategoryStarRating rating={review.technicalRating} label="Técnica" />
          )}
          
          {review.ethicalRating && (
            <CategoryStarRating rating={review.ethicalRating} label="Ética" />
          )}
          
          {review.diplomaticRating && (
            <CategoryStarRating rating={review.diplomaticRating} label="Diplomacia" />
          )}
        </div>
      )}
      
      {type === "supplier" && (review.organizationRating || review.locationRating || review.valueRating) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3">
          {review.organizationRating && (
            <CategoryStarRating rating={review.organizationRating} label="Organização" />
          )}
          
          {review.locationRating && (
            <CategoryStarRating rating={review.locationRating} label="Localização" />
          )}
          
          {review.valueRating && (
            <CategoryStarRating rating={review.valueRating} label="Preço/Valor" />
          )}
        </div>
      )}
      
      <p className="my-3">{review.comment}</p>
      
      {review.images && review.images.length > 0 && (
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {review.images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Imagem ${index + 1}`} 
                className="h-16 w-16 object-cover rounded"
              />
            ))}
          </div>
        </ScrollArea>
      )}
      
      <div className="flex justify-between items-center mt-4 pt-2 border-t border-border/30">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleHelpfulClick}
          className={isHelpful ? "text-primary" : ""}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M7 10v12"></path>
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
          </svg>
          {isHelpful ? (review.helpful + 1) : review.helpful} {(isHelpful ? (review.helpful + 1) : review.helpful) === 1 ? 'pessoa achou útil' : 'pessoas acharam útil'}
        </Button>
        
        <Button variant="ghost" size="sm">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
          </svg>
          Responder
        </Button>
      </div>
    </div>
  );
}
