
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  type: string;
  image: string;
  location: string;
}

interface EventsTabProps {
  onAddReview: (type: "event") => void;
  searchQuery?: string;
}

export function EventsTab({ onAddReview, searchQuery = "" }: EventsTabProps) {
  const [events, setEvents] = useState<Array<{
    id?: string;
    title: string;
    type: string;
    image: string;
    location: string;
    rating: number;
    reviews: number;
    technicalRating?: number;
    ethicalRating?: number;
    diplomaticRating?: number;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        
        // Fetch events from Supabase
        let query = supabase.from('events').select('*');
        
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%, type.ilike.%${searchQuery}%, location.ilike.%${searchQuery}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error("Error fetching events:", error);
          return;
        }

        // For each event, fetch their reviews to calculate average ratings
        const eventsWithRatings = await Promise.all(
          data.map(async (event: Event) => {
            const { data: reviews, error: reviewsError } = await supabase
              .from('reviews')
              .select('overall_rating, environment_rating, safety_rating, organization_rating')
              .eq('event_id', event.id);

            if (reviewsError) {
              console.error("Error fetching reviews:", reviewsError);
              return {
                ...event,
                rating: 0,
                reviews: 0,
                technicalRating: 0,
                ethicalRating: 0,
                diplomaticRating: 0,
                image: event.image || "/placeholder.svg"
              };
            }

            const rating = reviews.length > 0 
              ? reviews.reduce((sum: number, review: any) => sum + review.overall_rating, 0) / reviews.length
              : 0;
              
            const technicalRating = reviews.length > 0 
              ? reviews.reduce((sum: number, review: any) => sum + (review.environment_rating || 0), 0) / reviews.length
              : 0;
              
            const ethicalRating = reviews.length > 0 
              ? reviews.reduce((sum: number, review: any) => sum + (review.safety_rating || 0), 0) / reviews.length
              : 0;
              
            const diplomaticRating = reviews.length > 0 
              ? reviews.reduce((sum: number, review: any) => sum + (review.organization_rating || 0), 0) / reviews.length
              : 0;

            return {
              ...event,
              rating: parseFloat(rating.toFixed(1)),
              reviews: reviews.length,
              technicalRating: parseFloat(technicalRating.toFixed(1)),
              ethicalRating: parseFloat(ethicalRating.toFixed(1)),
              diplomaticRating: parseFloat(diplomaticRating.toFixed(1)),
              image: event.image || "/placeholder.svg"
            };
          })
        );

        setEvents(eventsWithRatings);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [searchQuery]);

  // If we don't have events from the database yet, use our mock data
  const mockEvents = [
    {
      title: "GEP - Grupo de Estudos em Piercing",
      type: "Conferência",
      image: "/placeholder.svg",
      location: "São Paulo, SP",
      rating: 4.8,
      reviews: 56,
      technicalRating: 4,
      ethicalRating: 3,
      diplomaticRating: 5
    },
    {
      title: "Expo Piercing Brasil",
      type: "Exposição",
      image: "/placeholder.svg",
      location: "Rio de Janeiro, RJ",
      rating: 4.6,
      reviews: 42,
      technicalRating: 3,
      ethicalRating: 5,
      diplomaticRating: 4
    }
  ];

  const displayEvents = events.length > 0 ? events : mockEvents;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading ? (
        <div className="col-span-2 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : displayEvents.length > 0 ? (
        displayEvents.map((event, index) => (
          <EventCard 
            key={event.id || index}
            title={event.title}
            type={event.type}
            image={event.image}
            location={event.location}
            rating={event.rating}
            reviews={event.reviews}
            technicalRating={event.technicalRating}
            ethicalRating={event.ethicalRating}
            diplomaticRating={event.diplomaticRating}
            onAddReview={() => onAddReview("event")}
          />
        ))
      ) : (
        <div className="col-span-2 text-center py-12">
          <p className="text-muted-foreground">Nenhum evento encontrado.</p>
        </div>
      )}
    </div>
  );
}

export default EventsTab;
