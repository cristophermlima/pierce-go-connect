
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

interface SupplierEvaluationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function SupplierEvaluationForm({ onSubmit, onCancel }: SupplierEvaluationFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [supplierName, setSupplierName] = useState("");
  const [comment, setComment] = useState("");
  const [overallRating, setOverallRating] = useState(5);
  const [organizationRating, setOrganizationRating] = useState(5);
  const [qualityRating, setQualityRating] = useState(5);
  const [priceRating, setPriceRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa estar logado para avaliar");
      return;
    }

    if (!supplierName.trim()) {
      toast.error("Por favor, informe o nome do fornecedor");
      return;
    }

    if (!comment.trim()) {
      toast.error("Por favor, escreva um comentário");
      return;
    }

    setLoading(true);

    try {
      const reviewData = {
        user_id: user.id,
        supplier_name: supplierName.trim(),
        comment: comment.trim(),
        overall_rating: overallRating,
        organization_rating: organizationRating,
        quality_rating: qualityRating,
        images: [],
      };

      console.log("Submitting supplier review data:", reviewData);

      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select()
        .single();

      if (error) throw error;

      console.log("Supplier review submitted successfully:", data);
      onSubmit(data);
      
      // Reset form
      setSupplierName("");
      setComment("");
      setOverallRating(5);
      setOrganizationRating(5);
      setQualityRating(5);
      setPriceRating(5);
      
    } catch (error: any) {
      console.error("Error submitting supplier review:", error);
      toast.error("Erro ao enviar avaliação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ value, onChange, label }: { value: number; onChange: (value: number) => void; label: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <svg
              className={`w-6 h-6 ${
                star <= value ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">({value}/5)</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="supplierName">Nome do Fornecedor</Label>
          <Input
            id="supplierName"
            type="text"
            placeholder="Nome do fornecedor ou loja"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StarRating
            value={overallRating}
            onChange={setOverallRating}
            label="Avaliação Geral"
          />
          
          <StarRating
            value={organizationRating}
            onChange={setOrganizationRating}
            label="Organização"
          />
          
          <StarRating
            value={qualityRating}
            onChange={setQualityRating}
            label="Qualidade dos Produtos"
          />
          
          <StarRating
            value={priceRating}
            onChange={setPriceRating}
            label="Preço/Valor"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Comentário</Label>
          <Textarea
            id="comment"
            placeholder="Conte sobre sua experiência com este fornecedor..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-piercing-purple to-piercing-pink"
          >
            {loading ? "Enviando..." : "Enviar Avaliação"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
