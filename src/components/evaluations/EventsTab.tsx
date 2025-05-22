
import EventCard from "./EventCard";

interface EventsTabProps {
  onAddReview: (type: "event") => void;
}

export function EventsTab({ onAddReview }: EventsTabProps) {
  const events = [
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event, index) => (
        <EventCard 
          key={index}
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
      ))}
    </div>
  );
}

export default EventsTab;
