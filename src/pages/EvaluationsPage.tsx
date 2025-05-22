
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddEvaluationForm from "@/components/AddEvaluationForm";
import EventsTab from "@/components/evaluations/EventsTab";
import SuppliersTab from "@/components/evaluations/SuppliersTab";
import { useEvaluationState } from "@/hooks/useEvaluationState";
import { toast } from "@/components/ui/sonner";

export default function EvaluationsPage() {
  const {
    searchQuery,
    setSearchQuery,
    showAddEvaluationDialog,
    setShowAddEvaluationDialog,
    evaluationType,
    openAddEvaluationDialog
  } = useEvaluationState();

  const handleFormSubmit = () => {
    setShowAddEvaluationDialog(false);
    toast.success("Avaliação enviada com sucesso!");
    // Force reload after a short delay to show the new review
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-3">Score Piercing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Avaliações técnicas, diplomáticas e éticas de eventos e fornecedores da área de body piercing.
            </p>
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="eventos" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList className="bg-muted">
                  <TabsTrigger value="eventos" className="px-8 py-2">Eventos</TabsTrigger>
                  <TabsTrigger value="fornecedores" className="px-8 py-2">Fornecedores</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-3">
                  <Button 
                    className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
                    onClick={() => openAddEvaluationDialog("event")}
                  >
                    Adicionar Avaliação
                  </Button>
                </div>
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
                <EventsTab onAddReview={(type) => openAddEvaluationDialog(type)} searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="fornecedores">
                <SuppliersTab onAddReview={(type) => openAddEvaluationDialog(type)} searchQuery={searchQuery} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Add Evaluation Dialog */}
      <Dialog open={showAddEvaluationDialog} onOpenChange={setShowAddEvaluationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Avaliação</DialogTitle>
            <DialogDescription>
              Compartilhe sua experiência com a comunidade.
            </DialogDescription>
          </DialogHeader>
          <AddEvaluationForm 
            type={evaluationType} 
            onSubmit={handleFormSubmit}
            onCancel={() => setShowAddEvaluationDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
