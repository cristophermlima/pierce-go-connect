
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  location: string;
  date: Date;
  image: string;
  category: string;
  participants: string;
}

interface EventsGridProps {
  events: Event[];
}

export function EventsGrid({ events }: EventsGridProps) {
  return (
    <section className="py-8 lg:py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-6 lg:mb-8">
          <h2 className="text-xl lg:text-2xl font-bold mb-2">Eventos em Destaque</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Estes são eventos oficiais que passaram por aprovação e são patrocinados. Para adicionar seu evento à agenda oficial clique em "Adicionar Evento" e escolha a agenda oficial.
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {events.map(event => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                location={event.location}
                date={event.date}
                image={event.image}
                category={event.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 lg:py-16">
            <h3 className="text-xl lg:text-2xl font-medium mb-2">Nenhum evento encontrado</h3>
            <p className="text-muted-foreground mb-4 lg:mb-6">
              Tente ajustar seus filtros ou busca para ver mais resultados.
            </p>
            <Link to="/eventos/adicionar">
              <Button className="bg-gradient-to-r from-piercing-purple to-piercing-pink">
                Adicionar Primeiro Evento
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsGrid;
