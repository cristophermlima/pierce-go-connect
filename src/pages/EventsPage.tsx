
import MainLayout from "@/components/MainLayout";
import EventsHeader from "@/components/events/EventsHeader";
import EventsFilters from "@/components/events/EventsFilters";
import EventsGrid from "@/components/events/EventsGrid";
import { useState } from "react";

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
      <EventsHeader />
      <EventsFilters 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <EventsGrid events={filteredEvents} />
    </MainLayout>
  );
}
