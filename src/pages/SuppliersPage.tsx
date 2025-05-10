
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddEvaluationForm from "@/components/AddEvaluationForm";

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showEvaluationDialog, setShowEvaluationDialog] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<string | null>(null);

  const handleOpenEvaluationDialog = (supplierName: string) => {
    setCurrentSupplier(supplierName);
    setShowEvaluationDialog(true);
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-3">Fornecedores</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encontre os melhores fornecedores de joias, equipamentos e materiais para body piercing.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.3-4.3"></path></svg>
              <Input 
                className="pl-10" 
                placeholder="Buscar fornecedores..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg>
                Filtrar
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 md:flex-none"
                onClick={() => handleOpenEvaluationDialog("Avaliar Fornecedor")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.3-4.3"></path><path d="M11 8v6"></path><path d="M8 11h6"></path></svg>
                Avaliar Fornecedor
              </Button>
            </div>
          </div>
          
          <div className="mb-6 flex flex-wrap gap-2">
            <Button 
              variant={activeCategory === "Todos" ? "secondary" : "ghost"} 
              className="rounded-full"
              onClick={() => setActiveCategory("Todos")}
            >
              Todos
            </Button>
            <Button 
              variant={activeCategory === "Joias e Acessórios" ? "secondary" : "ghost"} 
              className="rounded-full"
              onClick={() => setActiveCategory("Joias e Acessórios")}
            >
              Joias e Acessórios
            </Button>
            <Button 
              variant={activeCategory === "Equipamentos" ? "secondary" : "ghost"} 
              className="rounded-full"
              onClick={() => setActiveCategory("Equipamentos")}
            >
              Equipamentos
            </Button>
            <Button 
              variant={activeCategory === "Descartáveis" ? "secondary" : "ghost"} 
              className="rounded-full"
              onClick={() => setActiveCategory("Descartáveis")}
            >
              Descartáveis
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Revolution Piercing",
                type: "Joias e Acessórios",
                location: "Nacional",
                rating: "4.8",
                reviews: "56"
              },
              {
                name: "Angel Piercing",
                type: "Joias e Acessórios",
                location: "São Paulo, SP",
                rating: "4.6",
                reviews: "42"
              },
              {
                name: "My Piercing",
                type: "Equipamentos",
                location: "Rio de Janeiro, RJ",
                rating: "4.9",
                reviews: "38"
              },
              {
                name: "Luvas & Cia",
                type: "Descartáveis",
                location: "Belo Horizonte, MG",
                rating: "4.7",
                reviews: "29"
              },
              {
                name: "Titanium Gold",
                type: "Joias Premium",
                location: "Nacional",
                rating: "5.0",
                reviews: "18"
              },
              {
                name: "Biossegurança Total",
                type: "Equipamentos",
                location: "Curitiba, PR",
                rating: "4.8",
                reviews: "33"
              }
            ]
            .filter(supplier => 
              (activeCategory === "Todos" || supplier.type.includes(activeCategory)) &&
              (searchQuery === "" || 
                supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                supplier.location.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((supplier, i) => (
              <SupplierCard 
                key={i}
                name={supplier.name}
                type={supplier.type}
                location={supplier.location}
                rating={supplier.rating}
                reviews={supplier.reviews}
                onEvaluate={() => handleOpenEvaluationDialog(supplier.name)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add Evaluation Dialog */}
      <Dialog open={showEvaluationDialog} onOpenChange={setShowEvaluationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentSupplier === "Avaliar Fornecedor" ? "Avaliar Fornecedor" : `Avaliar ${currentSupplier}`}
            </DialogTitle>
            <DialogDescription>
              Compartilhe sua experiência com a comunidade.
            </DialogDescription>
          </DialogHeader>
          <AddEvaluationForm 
            type="supplier" 
            onSubmit={() => setShowEvaluationDialog(false)}
            onCancel={() => setShowEvaluationDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

interface SupplierCardProps {
  name: string;
  type: string;
  location: string;
  rating: string;
  reviews: string;
  onEvaluate: () => void;
}

function SupplierCard({ name, type, location, rating, reviews, onEvaluate }: SupplierCardProps) {
  return (
    <Card className="overflow-hidden border-border/30 bg-card/80 backdrop-blur-sm">
      <div className="h-48 bg-muted flex items-center justify-center">
        <img src="/placeholder.svg" alt={name} className="w-24 h-24" />
      </div>
      
      <div className="p-4">
        <div className="text-sm text-primary">{type}</div>
        <h3 className="font-bold text-xl mt-1">{name}</h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {location}
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <div className="text-yellow-400">⭐</div>
          <div className="font-semibold">{rating}</div>
          <div className="text-muted-foreground text-sm">({reviews})</div>
        </div>
        
        <div className="flex flex-col gap-2 mt-4">
          <Button variant="outline" className="w-full">Ver Detalhes</Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onEvaluate}
          >
            Avaliar
          </Button>
        </div>
      </div>
    </Card>
  );
}
