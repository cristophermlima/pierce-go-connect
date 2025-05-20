
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewCard, type Review } from "@/components/reviews/ReviewCard";

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
