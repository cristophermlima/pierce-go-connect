
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import EventsTab from "@/components/evaluations/EventsTab";
import SuppliersTab from "@/components/evaluations/SuppliersTab";

interface EvaluationsContentProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  onAddEvaluation: (type: "event" | "supplier") => void;
  searchQuery: string;
  refreshKey: number;
}

export function EvaluationsContent({ 
  activeTab, 
  onTabChange, 
  onAddEvaluation, 
  searchQuery, 
  refreshKey 
}: EvaluationsContentProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <TabsList className="w-full sm:w-auto bg-muted">
          <TabsTrigger value="eventos" className="flex-1 sm:flex-none px-4 sm:px-8 py-2">
            Eventos
          </TabsTrigger>
          <TabsTrigger value="fornecedores" className="flex-1 sm:flex-none px-4 sm:px-8 py-2">
            Fornecedores
          </TabsTrigger>
        </TabsList>
        
        <Button 
          className="bg-gradient-to-r from-piercing-purple to-piercing-pink w-full sm:w-auto"
          onClick={() => onAddEvaluation(activeTab === "eventos" ? "event" : "supplier")}
        >
          Adicionar Avaliação
        </Button>
      </div>

      <TabsContent value="eventos">
        <EventsTab 
          onAddReview={(type) => onAddEvaluation(type)} 
          searchQuery={searchQuery} 
          refreshKey={refreshKey}
        />
      </TabsContent>
      
      <TabsContent value="fornecedores">
        <SuppliersTab 
          onAddReview={(type) => onAddEvaluation(type)} 
          searchQuery={searchQuery} 
          refreshKey={refreshKey}
        />
      </TabsContent>
    </Tabs>
  );
}

export default EvaluationsContent;
