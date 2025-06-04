
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SuppliersFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onEvaluate: () => void;
}

const categories = ["Todos", "Joias e Acessórios", "Equipamentos", "Descartáveis"];

export function SuppliersFilters({ 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory, 
  onEvaluate 
}: SuppliersFiltersProps) {
  return (
    <section className="py-6 lg:py-8 border-b border-border bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-full md:max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.3-4.3"></path></svg>
              <Input 
                className="pl-10" 
                placeholder="Buscar fornecedores..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`${activeCategory === category ? 
                    "bg-primary hover:bg-primary/90" : 
                    "border-border hover:bg-muted/50"
                  } text-xs`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/cadastrar" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Adicionar Loja
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="flex-1 md:flex-none"
              onClick={onEvaluate}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.3-4.3"></path><path d="M11 8v6"></path><path d="M8 11h6"></path></svg>
              Avaliar Fornecedor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
