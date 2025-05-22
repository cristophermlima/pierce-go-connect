
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

export interface EvaluationStateProps {
  searchQuery: string;
  showAddEvaluationDialog: boolean;
  evaluationType: "event" | "supplier";
}

export function useEvaluationState() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEvaluationDialog, setShowAddEvaluationDialog] = useState(false);
  const [evaluationType, setEvaluationType] = useState<"event" | "supplier">("event");
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

  return {
    searchQuery,
    setSearchQuery,
    showAddEvaluationDialog,
    setShowAddEvaluationDialog,
    evaluationType,
    setEvaluationType,
    openAddEvaluationDialog
  };
}
