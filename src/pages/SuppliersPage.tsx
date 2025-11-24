
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddEvaluationForm from "@/components/AddEvaluationForm";
import { SuppliersHeader } from "@/components/suppliers/SuppliersHeader";
import { SuppliersFilters } from "@/components/suppliers/SuppliersFilters";
import { SuppliersList } from "@/components/suppliers/SuppliersList";
import AdCarousel from "@/components/AdCarousel";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showEvaluationDialog, setShowEvaluationDialog] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const suppliers = [
    {
      name: "Piercing Elite",
      type: "Joias e Acessórios",
      location: "Nacional",
      rating: "4.8",
      reviews: "56",
      image: ""
    },
    {
      name: "Style & Body",
      type: "Joias e Acessórios",
      location: "São Paulo, SP",
      rating: "4.6",
      reviews: "42",
      image: ""
    },
    {
      name: "Pro Equipment",
      type: "Equipamentos",
      location: "Rio de Janeiro, RJ",
      rating: "4.9",
      reviews: "38",
      image: ""
    },
    {
      name: "Body Care Supplies",
      type: "Descartáveis",
      location: "Belo Horizonte, MG",
      rating: "4.7",
      reviews: "29",
      image: ""
    },
    {
      name: "Premium Body Art",
      type: "Joias Premium",
      location: "Nacional",
      rating: "5.0",
      reviews: "18",
      image: ""
    },
    {
      name: "Safety First",
      type: "Equipamentos",
      location: "Curitiba, PR",
      rating: "4.8",
      reviews: "33",
      image: ""
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
      <AdCarousel />
      <SuppliersHeader />
      
      <SuppliersFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onEvaluate={() => handleOpenEvaluationDialog("Avaliar Fornecedor")}
      />

      <SuppliersList 
        suppliers={filteredSuppliers}
        onEvaluate={handleOpenEvaluationDialog}
      />

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

