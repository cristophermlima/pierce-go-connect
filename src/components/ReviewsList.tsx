
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  author: string;
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
}

interface ReviewsListProps {
  type: "event" | "supplier";
  reviews: Review[];
  onAddReview?: () => void;
}

export default function ReviewsList({ type, reviews, onAddReview }: ReviewsListProps) {
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "lowest">("recent");
  
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  return (
    <div className="space-y-6">
      {reviews.length > 0 ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Avaliações</h3>
              <p className="text-sm text-muted-foreground">
                {reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ordenar por:</span>
              <select
                className="bg-muted text-sm py-1 px-2 rounded"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recent" | "highest" | "lowest")}
              >
                <option value="recent">Mais recentes</option>
                <option value="highest">Maior pontuação</option>
                <option value="lowest">Menor pontuação</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} type={type} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Ainda não há avaliações para este {type === "event" ? "evento" : "fornecedor"}.
          </p>
          <Button
            onClick={onAddReview}
            className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
          >
            Seja o primeiro a avaliar
          </Button>
        </div>
      )}
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
  type: "event" | "supplier";
}

function ReviewCard({ review, type }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  
  const handleHelpfulClick = () => {
    setIsHelpful(!isHelpful);
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-400"}>
            {star <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="border border-border/30 rounded-lg p-4 bg-card/80 backdrop-blur-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{review.author || "Usuário anônimo"}</div>
          <div className="text-sm text-muted-foreground">{review.date}</div>
        </div>
        <div className="flex items-center">{renderStars(review.rating)}</div>
      </div>
      
      {type === "event" && (review.technicalRating || review.ethicalRating || review.diplomaticRating) && (
        <div className="grid grid-cols-3 gap-2 my-3">
          {review.technicalRating && (
            <div>
              <div className="text-xs text-muted-foreground">Técnica</div>
              <div className="text-sm text-yellow-400">{"★".repeat(review.technicalRating)}{"☆".repeat(5 - review.technicalRating)}</div>
            </div>
          )}
          
          {review.ethicalRating && (
            <div>
              <div className="text-xs text-muted-foreground">Ética</div>
              <div className="text-sm text-yellow-400">{"★".repeat(review.ethicalRating)}{"☆".repeat(5 - review.ethicalRating)}</div>
            </div>
          )}
          
          {review.diplomaticRating && (
            <div>
              <div className="text-xs text-muted-foreground">Diplomacia</div>
              <div className="text-sm text-yellow-400">{"★".repeat(review.diplomaticRating)}{"☆".repeat(5 - review.diplomaticRating)}</div>
            </div>
          )}
        </div>
      )}
      
      {type === "supplier" && (review.organizationRating || review.locationRating || review.valueRating) && (
        <div className="grid grid-cols-3 gap-2 my-3">
          {review.organizationRating && (
            <div>
              <div className="text-xs text-muted-foreground">Organização</div>
              <div className="text-sm text-yellow-400">{"★".repeat(review.organizationRating)}{"☆".repeat(5 - review.organizationRating)}</div>
            </div>
          )}
          
          {review.locationRating && (
            <div>
              <div className="text-xs text-muted-foreground">Localização</div>
              <div className="text-sm text-yellow-400">{"★".repeat(review.locationRating)}{"☆".repeat(5 - review.locationRating)}</div>
            </div>
          )}
          
          {review.valueRating && (
            <div>
              <div className="text-xs text-muted-foreground">Preço/Valor</div>
              <div className="text-sm text-yellow-400">{"★".repeat(review.valueRating)}{"☆".repeat(5 - review.valueRating)}</div>
            </div>
          )}
        </div>
      )}
      
      <p className="my-3">{review.comment}</p>
      
      {review.images && review.images.length > 0 && (
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
