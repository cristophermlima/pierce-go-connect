
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { X, Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddEvaluationFormProps {
  type: "event" | "supplier";
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialEventName?: string;
}

export default function AddEvaluationForm({ type, onSubmit, onCancel, initialEventName = "" }: AddEvaluationFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [eventName, setEventName] = useState(initialEventName);
  const [supplierName, setSupplierName] = useState("");
  const [comment, setComment] = useState("");
  const [organizationRating, setOrganizationRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa estar logado para enviar uma avaliação");
      return;
    }
    
    if (rating === 0) {
      toast.error("Por favor, forneça uma avaliação geral");
      return;
    }

    if (type === "event" && !eventName) {
      toast.error("Por favor, informe o nome do evento");
      return;
    }

    if (type === "supplier" && !supplierName) {
      toast.error("Por favor, informe o nome do fornecedor");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload images to Supabase Storage if any
      const uploadedImageUrls: string[] = [];
      
      if (images.length > 0) {
        for (const image of images) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;
          
          const { error: uploadError, data } = await supabase.storage
            .from('images')
            .upload(filePath, image);
            
          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            continue;
          }
          
          if (data) {
            const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
            uploadedImageUrls.push(urlData.publicUrl);
          }
        }
      }
      
      // Prepare review data
      const reviewData: any = {
        user_id: user.id,
        comment,
        overall_rating: rating,
        images: uploadedImageUrls,
        organization_rating: organizationRating,
      };
      
      if (type === 'event') {
        reviewData.event_name = eventName;
        reviewData.environment_rating = locationRating;
        reviewData.safety_rating = valueRating;
      } else {
        reviewData.supplier_name = supplierName;
        reviewData.quality_rating = valueRating;
      }
      
      // Submit to Supabase
      const { error, data } = await supabase
        .from('reviews')
        .insert(reviewData)
        .select();
        
      if (error) {
        throw error;
      }
      
      console.log('Nova avaliação submetida:', data ? data[0] : reviewData);
      
      if (onSubmit) {
        onSubmit(data ? data[0] : reviewData);
      }
      
      toast.success(`Avaliação enviada com sucesso!`);
    } catch (error: any) {
      toast.error(`Erro ao enviar avaliação: ${error.message}`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).slice(0, 5);
      setImages([...images, ...fileArray]);
      
      const newPreviewUrls = fileArray.map(file => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
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
      <h2 className="text-xl font-bold mb-1 text-white">Nova Avaliação</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Avalie um {type === "event" ? "evento" : "fornecedor"} com base na sua experiência
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              O que você está avaliando?
            </label>
            <Select defaultValue={type === "event" ? "evento" : "fornecedor"}>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="evento">Evento</SelectItem>
                <SelectItem value="fornecedor">Fornecedor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === "event" ? (
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Nome do Evento</label>
              <Input 
                placeholder="Selecione um evento" 
                value={eventName} 
                onChange={(e) => setEventName(e.target.value)}
                className="bg-muted border-border"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Nome do Fornecedor</label>
              <Input 
                placeholder="Selecione um fornecedor" 
                value={supplierName} 
                onChange={(e) => setSupplierName(e.target.value)}
                className="bg-muted border-border"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Seu Nome (opcional)</label>
            <Input 
              placeholder="Digite seu nome para avaliar anonimamente" 
              className="bg-muted border-border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Seu Email (opcional)</label>
            <Input 
              type="email"
              placeholder="Não será exibido publicamente" 
              className="bg-muted border-border"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Avaliação Geral</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Organização</label>
              <StarRating value={organizationRating} onChange={setOrganizationRating} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                {type === "event" ? "Localização" : "Localização"}
              </label>
              <StarRating value={locationRating} onChange={setLocationRating} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                {type === "event" ? "Valor" : "Valor"}
              </label>
              <StarRating value={valueRating} onChange={setValueRating} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Sua Experiência</label>
            <Textarea 
              placeholder="Descreva sua experiência em detalhes. O que você gostou? O que poderia ser melhorado?" 
              className="h-32 bg-muted border-border"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Adicionar Fotos (opcional)</label>
            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={src} 
                      alt={`Prévia ${index + 1}`} 
                      className="h-16 w-16 object-cover rounded" 
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5"
                      onClick={() => removeImage(index)}
                    >
                      <X size={14} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-muted">
              <div className="flex justify-center mb-2">
                <Upload className="text-muted-foreground" size={24} />
              </div>
              <p className="text-sm text-muted-foreground mb-3">Arraste e solte suas fotos aqui</p>
              <Button 
                type="button" 
                variant="destructive"
                className="text-sm bg-red-500 hover:bg-red-600"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Selecionar Fotos
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={previewImages.length >= 5}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {previewImages.length}/5 fotos selecionadas (máximo de 2MB cada)
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 justify-end">
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-red-500 hover:bg-red-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
          </Button>
        </div>
      </form>
    </div>
  );
}
