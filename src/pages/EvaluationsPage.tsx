
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import EvaluationsHeader from "@/components/evaluations/EvaluationsHeader";
import EvaluationsSearch from "@/components/evaluations/EvaluationsSearch";
import EvaluationsContent from "@/components/evaluations/EvaluationsContent";
import EvaluationDialog from "@/components/evaluations/EvaluationDialog";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EvaluationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEvaluationDialog, setShowAddEvaluationDialog] = useState(false);
  const [evaluationType, setEvaluationType] = useState<"event" | "supplier">("event");
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("eventos");
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
          <EvaluationsHeader />
          
          <div className="mb-6">
            <EvaluationsContent
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onAddEvaluation={openAddEvaluationDialog}
              searchQuery={searchQuery}
              refreshKey={refreshKey}
            />
            
            <EvaluationsSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>

      <EvaluationDialog
        open={showAddEvaluationDialog}
        onOpenChange={setShowAddEvaluationDialog}
        evaluationType={evaluationType}
        onSubmit={handleFormSubmit}
      />
    </MainLayout>
  );
}
