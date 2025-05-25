
import React from "react";
import ReviewsList from "@/components/ReviewsList";

interface EventsTabProps {
  onAddReview: (type: "event") => void;
  searchQuery?: string;
  refreshKey?: number;
}

export function EventsTab({ onAddReview, searchQuery = "", refreshKey = 0 }: EventsTabProps) {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M3 11h18l-1.2 8.4a2 2 0 01-2 1.6H6.2a2 2 0 01-2-1.6L3 11z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Nenhum evento avaliado ainda</h3>
        <p className="text-muted-foreground mb-6">
          {searchQuery ? "Nenhum evento encontrado para sua busca." : "Seja o primeiro a avaliar um evento e compartilhe sua experiência com a comunidade."}
        </p>
        <button
          onClick={() => onAddReview("event")}
          className="bg-gradient-to-r from-piercing-purple to-piercing-pink text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Avaliar Primeiro Evento
        </button>
      </div>
      
      <ReviewsList 
        type="event" 
        refreshKey={refreshKey}
        onAddReview={() => onAddReview("event")}
      />
    </div>
  );
}

export default EventsTab;
