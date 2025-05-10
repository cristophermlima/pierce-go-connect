
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

interface AddEvaluationFormProps {
  type: "event" | "supplier";
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export default function AddEvaluationForm({ type, onSubmit, onCancel }: AddEvaluationFormProps) {
  const [rating, setRating] = useState(0);
  const [organizationRating, setOrganizationRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Por favor, forneça uma avaliação geral");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would submit to an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`${type === "event" ? "Evento" : "Fornecedor"} avaliado com sucesso!`);
      
      if (onSubmit) {
        onSubmit({
          rating,
          organizationRating,
          locationRating,
          valueRating
        });
      }
    } catch (error) {
      toast.error("Erro ao enviar avaliação. Tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-xl focus:outline-none"
          >
            {star <= value ? (
              <span className="text-yellow-400">★</span>
            ) : (
              <span className="text-gray-400">☆</span>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-1">Nova Avaliação</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Avalie um {type === "event" ? "evento" : "fornecedor"} com base na sua experiência
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">O que você está avaliando?</label>
            <Select defaultValue={type}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Evento</SelectItem>
                <SelectItem value="supplier">Fornecedor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === "supplier" && (
            <div>
              <label className="block text-sm font-medium mb-1">Nome do Fornecedor</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revolution">Revolution Piercing</SelectItem>
                  <SelectItem value="angel">Angel Piercing</SelectItem>
                  <SelectItem value="my-piercing">My Piercing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {type === "event" && (
            <div>
              <label className="block text-sm font-medium mb-1">Nome do Evento</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gep">GEP - Grupo de Estudos em Piercing</SelectItem>
                  <SelectItem value="expo">Expo Piercing Brasil</SelectItem>
                  <SelectItem value="workshop">Workshop Técnicas Avançadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Seu Nome (opcional)</label>
            <Input placeholder="Deixe em branco para avaliar anonimamente" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Seu Email (opcional)</label>
            <Input placeholder="Não será exibido publicamente" type="email" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Avaliação Geral</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Organização</label>
              <StarRating value={organizationRating} onChange={setOrganizationRating} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Localização</label>
              <StarRating value={locationRating} onChange={setLocationRating} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Valor</label>
              <StarRating value={valueRating} onChange={setValueRating} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Sua Experiência</label>
            <Textarea 
              placeholder="Descreva sua experiência em detalhes. O que você gostou? O que poderia ser melhorado?" 
              className="h-32"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Adicionar Fotos (opcional)</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <div className="flex justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" x2="12" y1="3" y2="15"></line>
                </svg>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Arraste e solte suas fotos aqui</p>
              <Button type="button" variant="outline" className="text-sm">
                Selecionar Fotos
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Máximo de 5 fotos, até 2MB cada</p>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
        </Button>
      </form>
    </div>
  );
}
