
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

export default function AddScheduleEventPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription } = useSubscription();

  // Check if user is subscribed
  if (!subscription?.subscribed) {
    navigate("/planos");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para adicionar eventos.",
        variant: "destructive",
      });
      return;
    }
    
    if (!title || !startDate || !startTime) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    // Combine date and time for start and end
    const startDateTime = new Date(`${startDate}T${startTime}`);
    let endDateTime = null;
    
    if (endDate && endTime) {
      endDateTime = new Date(`${endDate}T${endTime}`);
      
      // Validate dates
      if (endDateTime < startDateTime) {
        toast({
          title: "Erro na data",
          description: "A data de término deve ser posterior à data de início.",
          variant: "destructive",
        });
        return;
      }
    } else if (endDate && !endTime) {
      toast({
        title: "Horário necessário",
        description: "Por favor, defina um horário de término.",
        variant: "destructive",
      });
      return;
    } else if (!endDate && endTime) {
      // If only end time is specified, use start date
      endDateTime = new Date(`${startDate}T${endTime}`);
    } else {
      // If no end specified, default to 1 hour after start
      endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 1);
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.from("schedules").insert({
        user_id: user.id,
        title,
        location,
        description,
        start_date: startDateTime.toISOString(),
        end_date: endDateTime.toISOString(),
      });
      
      if (error) throw error;
      
      toast({
        title: "Evento adicionado",
        description: "O evento foi adicionado à sua agenda com sucesso!",
      });
      
      navigate("/agenda");
    } catch (error: any) {
      console.error("Error adding event:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o evento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button
              variant="outline"
              className="mb-4"
              onClick={() => navigate("/agenda")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              Voltar para Agenda
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">Adicionar Evento</h1>
            <p className="text-muted-foreground">
              Adicione um novo evento à sua agenda
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Nome do Evento*
                  </label>
                  <Input
                    id="title"
                    placeholder="Digite o nome do evento"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Local
                  </label>
                  <Input
                    id="location"
                    placeholder="Local do evento (opcional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="text-sm font-medium">
                      Data de Início*
                    </label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="startTime" className="text-sm font-medium">
                      Horário de Início*
                    </label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="endDate" className="text-sm font-medium">
                      Data de Término
                    </label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="endTime" className="text-sm font-medium">
                      Horário de Término
                    </label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descrição
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Descrição do evento (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/agenda")}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
                        Salvando...
                      </>
                    ) : (
                      "Adicionar Evento"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
