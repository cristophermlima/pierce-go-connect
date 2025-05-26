
import MainLayout from "@/components/MainLayout";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

// Mock data for events
const allEvents = [
  {
    id: "1",
    title: "GEP - Grupo de Estudos em Piercing",
    location: "São Paulo, SP",
    date: new Date("2025-03-15"),
    image: "https://images.unsplash.com/photo-1622298760148-0f9c81f4a101?q=80&w=2070&auto=format&fit=crop",
    category: "Conferência",
    participants: "120 participantes"
  },
  {
    id: "2", 
    title: "1° Meeting Anual para Piercers Profissionais",
    location: "São Paulo, SP",
    date: new Date("2025-06-10"),
    image: "https://images.unsplash.com/photo-1612371636004-04df25c9f51d?q=80&w=2070&auto=format&fit=crop",
    category: "Meeting",
    participants: "120 participantes"
  },
  {
    id: "3",
    title: "Expo Piercing Brasil 2025", 
    location: "São Paulo, SP",
    date: new Date("2025-08-12"),
    image: "https://images.unsplash.com/photo-1581743525371-1d03b65cebb2?q=80&w=2071&auto=format&fit=crop",
    category: "Exposição",
    participants: "120 participantes"
  },
  {
    id: "4",
    title: "4° Conferência Anual APPPBR",
    location: "Rio de Janeiro, RJ", 
    date: new Date("2025-09-05"),
    image: "https://images.unsplash.com/photo-1581213966500-e573326d8138?q=80&w=1974&auto=format&fit=crop",
    category: "Conferência",
    participants: "120 participantes"
  }
];

// Categories for filtering  
const categories = ["Todos", "Conferência", "Workshop", "Meeting", "Exposição", "Curso"];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on category and search query
  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = selectedCategory === "Todos" || event.category === selectedCategory;
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      {/* Header */}
      <section className="bg-gradient-to-r from-piercing-purple/10 to-piercing-pink/10 py-8 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Agenda de Eventos</h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 lg:mb-8">
              Encontre todos os eventos de body piercing, workshops, conferências e cursos em um só lugar.
            </p>
            
            {/* Notice banner */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-4xl mx-auto mb-6 lg:mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-start gap-3 text-left">
                  <div className="bg-red-500/20 rounded-full p-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-red-900 dark:text-red-100 mb-1">Destaque seu evento na agenda oficial</h3>
                    <p className="text-sm text-red-700 dark:text-red-200">
                      Aumente a visibilidade do seu evento e atraia mais participantes. Eventos na agenda oficial recebem até 5x mais visualizações.
                    </p>
                  </div>
                </div>
                <Link to="/eventos/adicionar" className="flex-shrink-0">
                  <Button className="bg-red-500 hover:bg-red-600 text-white w-full lg:w-auto">
                    Anunciar meu evento
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Actions */}
      <section className="py-6 lg:py-8 border-b border-border bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button variant="outline" className="text-sm w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtrar
              </Button>
              
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={`${selectedCategory === category ? 
                      "bg-primary hover:bg-primary/90" : 
                      "border-border hover:bg-muted/50"
                    } text-xs`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/eventos/adicionar" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Adicionar Evento
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-8 lg:py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Eventos em Destaque</h2>
            <p className="text-sm lg:text-base text-muted-foreground">
              Estes são eventos oficiais que passaram por aprovação e são patrocinados. Para adicionar seu evento à agenda oficial clique em "Adicionar Evento" e escolha a agenda oficial.
            </p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredEvents.map(event => (
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
    </MainLayout>
  );
}
