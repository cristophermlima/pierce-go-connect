
import React, { useEffect, useState } from "react";
import { supabase } from '@/integrations/supabase/client';
import ReviewsList from "@/components/ReviewsList";

interface EventsTabProps {
  onAddReview: (type: "event") => void;
  searchQuery?: string;
  refreshKey?: number;
}

export function EventsTab({ onAddReview, searchQuery = "", refreshKey = 0 }: EventsTabProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvaluatedEvents() {
      try {
        setLoading(true);
        
        let query = supabase
          .from('reviews')
          .select(`
            event_name,
            event_id,
            overall_rating,
            created_at
          `)
          .not('event_name', 'is', null);
        
        if (searchQuery) {
          query = query.ilike('event_name', `%${searchQuery}%`);
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching reviewed events:", error);
          return;
        }

        const eventMap = new Map();
        data?.forEach((review: any) => {
          const eventName = review.event_name;
          if (!eventMap.has(eventName)) {
            eventMap.set(eventName, {
              name: eventName,
              id: review.event_id || `event-${eventName.toLowerCase().replace(/\s+/g, '-')}`,
              reviewCount: 1,
              averageRating: review.overall_rating,
              lastReview: review.created_at
            });
          } else {
            const existing = eventMap.get(eventName);
            existing.reviewCount += 1;
            existing.averageRating = (existing.averageRating + review.overall_rating) / 2;
          }
        });

        setEvents(Array.from(eventMap.values()));
      } catch (err) {
        console.error("Failed to fetch reviewed events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvaluatedEvents();
  }, [searchQuery, refreshKey]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {events.length > 0 ? (
        <div className="space-y-8">
          {events.map((event) => (
            <div key={event.id} className="space-y-4">
              <div className="border-b border-border pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{event.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{event.reviewCount} {event.reviewCount === 1 ? "avaliação" : "avaliações"}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span>{event.averageRating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddReview("event")}
                    className="bg-gradient-to-r from-piercing-purple to-piercing-pink text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Avaliar Evento
                  </button>
                </div>
              </div>
              
              <ReviewsList 
                type="event" 
                refreshKey={refreshKey}
                onAddReview={() => onAddReview("event")}
              />
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default EventsTab;
