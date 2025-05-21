
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
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface AddEvaluationFormProps {
  type: "event" | "supplier";
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialEventName?: string;
}

export default function AddEvaluationForm({ type, onSubmit, onCancel, initialEventName = "" }: AddEvaluationFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [eventName, setEventName] = useState(initialEventName);
  const [eventDate, setEventDate] = useState("");
  const [comment, setComment] = useState("");
  const [technicalRating, setTechnicalRating] = useState(0);
  const [ethicalRating, setEthicalRating] = useState(0);
  const [diplomaticRating, setDiplomaticRating] = useState(0);
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
    
    setIsSubmitting(true);
    
    try {
      // Upload images to Supabase Storage if any
      const uploadedImageUrls: string[] = [];
      
      if (images.length > 0) {
        for (const image of images) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, image);
            
          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            continue;
          }
          
          const { data } = supabase.storage.from('images').getPublicUrl(filePath);
          uploadedImageUrls.push(data.publicUrl);
        }
      }
      
      // Prepare review data
      const reviewData = {
        user_id: user.id,
        title,
        comment,
        overall_rating: rating,
        images: uploadedImageUrls,
        created_at: new Date().toISOString()
      };
      
      if (type === 'event') {
        Object.assign(reviewData, {
          event_name: eventName, // Custom field for non-registered events
          event_date: eventDate, // Date of participation
          technical_rating: technicalRating,
          ethical_rating: ethicalRating,
          diplomatic_rating: diplomaticRating
        });
      } else {
        Object.assign(reviewData, {
          organization_rating: organizationRating,
          location_rating: locationRating,
          value_rating: valueRating
        });
      }
      
      // In a real app, we would submit to Supabase
      // const { error } = await supabase.from('reviews').insert(reviewData);
      
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(reviewData);
      }
      
      toast.success(`Avaliação enviada com sucesso!`);
    } catch (error) {
      toast.error("Erro ao enviar avaliação. Tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).slice(0, 5); // Limit to 5 files
      setImages([...images, ...fileArray]);
      
      // Create preview URLs
      const newPreviewUrls = fileArray.map(file => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previewImages];
    // Revoke the object URL to free memory
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
    <ScrollArea className="h-[80vh] md:h-[60vh] pr-4">
      <div className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-1">Nova Avaliação</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Avalie um {type === "event" ? "evento" : "fornecedor"} com base na sua experiência
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {type === "event" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Evento</label>
                  <Input 
                    placeholder="Informe o nome do evento que você participou" 
                    value={eventName} 
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Participação</label>
                  <Input 
                    type="date" 
                    value={eventDate} 
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Título da Avaliação</label>
              <Input 
                placeholder="Resumo da sua experiência" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Avaliação Geral</label>
              <StarRating value={rating} onChange={setRating} />
            </div>
            
            {type === "event" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Técnica</label>
                  <StarRating value={technicalRating} onChange={setTechnicalRating} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Ética</label>
                  <StarRating value={ethicalRating} onChange={setEthicalRating} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Diplomacia</label>
                  <StarRating value={diplomaticRating} onChange={setDiplomaticRating} />
                </div>
              </div>
            )}
            
            {type === "supplier" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">Sua Experiência</label>
              <Textarea 
                placeholder="Descreva sua experiência em detalhes. O que você gostou? O que poderia ser melhorado?" 
                className="h-32"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Adicionar Fotos (opcional)</label>
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
              
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <div className="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" x2="12" y1="3" y2="15"></line>
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Arraste e solte suas fotos aqui</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-sm"
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
              className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
            </Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
}
