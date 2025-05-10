
import MainLayout from "@/components/MainLayout";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Mock data for events
const allEvents = [
  {
    id: "1",
    title: "Festival Tattoo Brasil",
    location: "São Paulo, SP",
    date: new Date("2025-06-15"),
    image: "https://images.unsplash.com/photo-1622298760148-0f9c81f4a101?q=80&w=2070&auto=format&fit=crop",
    category: "Festival"
  },
  {
    id: "2",
    title: "Workshop Técnicas Avançadas",
    location: "Rio de Janeiro, RJ",
    date: new Date("2025-07-22"),
    image: "https://images.unsplash.com/photo-1612371636004-04df25c9f51d?q=80&w=2070&auto=format&fit=crop",
    category: "Workshop"
  },
  {
    id: "3",
    title: "Convenção Piercing Art",
    location: "Belo Horizonte, MG",
    date: new Date("2025-08-10"),
    image: "https://images.unsplash.com/photo-1581743525371-1d03b65cebb2?q=80&w=2071&auto=format&fit=crop",
    category: "Convenção"
  },
  {
    id: "4",
    title: "Curso de Primeiros Passos",
    location: "Curitiba, PR",
    date: new Date("2025-09-05"),
    image: "https://images.unsplash.com/photo-1581213966500-e573326d8138?q=80&w=1974&auto=format&fit=crop",
    category: "Curso"
  },
  {
    id: "5",
    title: "Exposição de Arte Corporal",
    location: "Salvador, BA",
    date: new Date("2025-10-12"),
    image: "https://images.unsplash.com/photo-1523439988913-83fdcd686544?q=80&w=2070&auto=format&fit=crop",
    category: "Exposição"
  },
  {
    id: "6",
    title: "Encontro Anual de Profissionais",
    location: "Brasília, DF",
    date: new Date("2025-11-20"),
    image: "https://images.unsplash.com/photo-1559596420-e351a35b6515?q=80&w=1926&auto=format&fit=crop",
    category: "Conferência"
  }
];

// Categories for filtering
const categories = ["Todos", "Festival", "Workshop", "Convenção", "Curso", "Exposição", "Conferência"];

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
      <section className="bg-muted/5 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-4">Eventos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Descubra os próximos eventos de body piercing em todo o Brasil.
            Use os filtros para encontrar eventos específicos por categoria ou localização.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="search"
                placeholder="Buscar por nome ou cidade..."
                className="w-full bg-muted/40 border border-border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? 
                    "bg-primary hover:bg-primary/90" : 
                    "border-border hover:bg-muted/50"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium mb-2">Nenhum evento encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar seus filtros ou busca para ver mais resultados.
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
