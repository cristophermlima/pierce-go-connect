
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EventsFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function EventsFilters({ categories, selectedCategory, onCategoryChange }: EventsFiltersProps) {
  return (
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
                  onClick={() => onCategoryChange(category)}
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
  );
}

export default EventsFilters;
