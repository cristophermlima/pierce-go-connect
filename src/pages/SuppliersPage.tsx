
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddEvaluationForm from "@/components/AddEvaluationForm";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showEvaluationDialog, setShowEvaluationDialog] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = ["Todos", "Joias e Acessórios", "Equipamentos", "Descartáveis"];

  const suppliers = [
    {
      name: "Revolution Piercing",
      type: "Joias e Acessórios",
      location: "Nacional",
      rating: "4.8",
      reviews: "56",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Angel Piercing",
      type: "Joias e Acessórios",
      location: "São Paulo, SP",
      rating: "4.6",
      reviews: "42",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "My Piercing",
      type: "Equipamentos",
      location: "Rio de Janeiro, RJ",
      rating: "4.9",
      reviews: "38",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Luvas & Cia",
      type: "Descartáveis",
      location: "Belo Horizonte, MG",
      rating: "4.7",
      reviews: "29",
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Titanium Gold",
      type: "Joias Premium",
      location: "Nacional",
      rating: "5.0",
      reviews: "18",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Biossegurança Total",
      type: "Equipamentos",
      location: "Curitiba, PR",
      rating: "4.8",
      reviews: "33",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const handleOpenEvaluationDialog = (supplierName: string) => {
    if (!user) {
      toast.error("Você precisa estar logado para avaliar um fornecedor");
      navigate('/auth');
      return;
    }
    setCurrentSupplier(supplierName);
    setShowEvaluationDialog(true);
  };

  const filteredSuppliers = suppliers.filter(supplier => 
    (activeCategory === "Todos" || supplier.type.includes(activeCategory)) &&
    (searchQuery === "" || 
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      supplier.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MainLayout>
      {/* Header */}
      <section className="bg-gradient-to-r from-piercing-purple/10 to-piercing-pink/10 py-8 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Fornecedores</h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 lg:mb-8">
              Encontre os melhores fornecedores de joias, equipamentos e materiais para body piercing.
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
                    <h3 className="font-medium text-red-900 dark:text-red-100 mb-1">Destaque sua loja no diretório oficial</h3>
                    <p className="text-sm text-red-700 dark:text-red-200">
                      Aumente a visibilidade da sua loja e atraia mais clientes. Lojas no diretório oficial recebem até 5x mais visualizações.
                    </p>
                  </div>
                </div>
                <Link to="/cadastrar" className="flex-shrink-0">
                  <Button className="bg-red-500 hover:bg-red-600 text-white w-full lg:w-auto">
                    Anunciar minha loja
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
                onClick={() => handleOpenEvaluationDialog("Avaliar Fornecedor")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.3-4.3"></path><path d="M11 8v6"></path><path d="M8 11h6"></path></svg>
                Avaliar Fornecedor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Suppliers Section */}
      <section className="py-8 lg:py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Fornecedores em Destaque</h2>
            <p className="text-sm lg:text-base text-muted-foreground">
              Estes são fornecedores oficiais que passaram por aprovação e são patrocinados. Para adicionar sua loja ao diretório oficial clique em "Adicionar Loja" e escolha o plano adequado.
            </p>
          </div>

          {filteredSuppliers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredSuppliers.map((supplier, i) => (
                <SupplierCard 
                  key={i}
                  name={supplier.name}
                  type={supplier.type}
                  location={supplier.location}
                  rating={supplier.rating}
                  reviews={supplier.reviews}
                  image={supplier.image}
                  onEvaluate={() => handleOpenEvaluationDialog(supplier.name)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 lg:py-16">
              <h3 className="text-xl lg:text-2xl font-medium mb-2">Nenhum fornecedor encontrado</h3>
              <p className="text-muted-foreground mb-4 lg:mb-6">
                Tente ajustar seus filtros ou busca para ver mais resultados.
              </p>
              <Link to="/cadastrar">
                <Button className="bg-gradient-to-r from-piercing-purple to-piercing-pink">
                  Adicionar Primeira Loja
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Add Evaluation Dialog */}
      <Dialog 
        open={showEvaluationDialog} 
        onOpenChange={setShowEvaluationDialog}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentSupplier === "Avaliar Fornecedor" ? "Avaliar Fornecedor" : `Avaliar ${currentSupplier}`}
            </DialogTitle>
            <DialogDescription>
              Compartilhe sua experiência com a comunidade.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto">
            <AddEvaluationForm 
              type="supplier" 
              onSubmit={() => setShowEvaluationDialog(false)}
              onCancel={() => setShowEvaluationDialog(false)}
            />
          </div>
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
  image: string;
  onEvaluate: () => void;
}

function SupplierCard({ name, type, location, rating, reviews, image, onEvaluate }: SupplierCardProps) {
  return (
    <Card className="overflow-hidden border-border/30 bg-card/80 backdrop-blur-sm">
      <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
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
