
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddEvaluationForm from "@/components/AddEvaluationForm";
import SupplierEvaluationForm from "@/components/SupplierEvaluationForm";
import EventsTab from "@/components/evaluations/EventsTab";
import SuppliersTab from "@/components/evaluations/SuppliersTab";
import { toast } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EvaluationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEvaluationDialog, setShowAddEvaluationDialog] = useState(false);
  const [evaluationType, setEvaluationType] = useState<"event" | "supplier">("event");
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("eventos");
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const navigate = useNavigate();

  const openAddEvaluationDialog = (type: "event" | "supplier") => {
    if (!user) {
      toast.error("Você precisa estar logado para avaliar");
      navigate('/auth', { state: { from: location.pathname } });
      return;
    }
    setEvaluationType(type);
    setShowAddEvaluationDialog(true);
  };

  const handleFormSubmit = (reviewData: any) => {
    console.log("Nova avaliação submetida:", reviewData);
    
    setShowAddEvaluationDialog(false);
    toast.success("Avaliação enviada com sucesso!");
    
    setRefreshKey(prevKey => prevKey + 1);
    console.log("RefreshKey incrementado:", refreshKey + 1);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Score Piercing</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Avaliações técnicas, diplomáticas e éticas de eventos e fornecedores da área de body piercing.
            </p>
          </div>
          
          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <TabsList className="w-full sm:w-auto bg-muted">
                  <TabsTrigger value="eventos" className="flex-1 sm:flex-none px-4 sm:px-8 py-2">Eventos</TabsTrigger>
                  <TabsTrigger value="fornecedores" className="flex-1 sm:flex-none px-4 sm:px-8 py-2">Fornecedores</TabsTrigger>
                </TabsList>
                
                <Button 
                  className="bg-gradient-to-r from-piercing-purple to-piercing-pink w-full sm:w-auto"
                  onClick={() => openAddEvaluationDialog(activeTab === "eventos" ? "event" : "supplier")}
                >
                  Adicionar Avaliação
                </Button>
              </div>
              
              <div className="relative mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.3-4.3"></path></svg>
                <Input 
                  className="pl-10 bg-muted border-none" 
                  placeholder="Buscar eventos ou fornecedores..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <TabsContent value="eventos">
                <EventsTab 
                  onAddReview={(type) => openAddEvaluationDialog(type)} 
                  searchQuery={searchQuery} 
                  refreshKey={refreshKey}
                />
              </TabsContent>
              
              <TabsContent value="fornecedores">
                <SuppliersTab 
                  onAddReview={(type) => openAddEvaluationDialog(type)} 
                  searchQuery={searchQuery} 
                  refreshKey={refreshKey}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={showAddEvaluationDialog} onOpenChange={setShowAddEvaluationDialog}>
        <DialogContent className={`sm:max-w-2xl ${isMobile ? 'p-4 h-[90vh] overflow-scroll' : ''}`}>
          <DialogHeader>
            <DialogTitle>
              {evaluationType === "event" ? "Avaliar Evento" : "Avaliar Fornecedor"}
            </DialogTitle>
            <DialogDescription>
              Compartilhe sua experiência com a comunidade.
            </DialogDescription>
          </DialogHeader>
          <div className={isMobile ? 'max-h-[70vh] overflow-y-auto -mx-4 px-4' : ''}>
            {evaluationType === "event" ? (
              <AddEvaluationForm 
                type={evaluationType} 
                onSubmit={handleFormSubmit}
                onCancel={() => setShowAddEvaluationDialog(false)}
              />
            ) : (
              <SupplierEvaluationForm 
                onSubmit={handleFormSubmit}
                onCancel={() => setShowAddEvaluationDialog(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
