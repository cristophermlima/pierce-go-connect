
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/sonner";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { subscription } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserSchedule();
    }
  }, [user]);

  async function fetchUserSchedule() {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      toast.error("Erro ao carregar agenda");
    } finally {
      setLoading(false);
    }
  }

  function handleAddEvent() {
    if (!subscription?.subscribed) {
      // Show subscription required modal
      toast.error("É necessário ter uma assinatura ativa para adicionar eventos à agenda", {
        action: {
          label: "Ver Planos",
          onClick: () => navigate("/planos")
        },
        duration: 5000
      });
      return;
    }
    
    // If subscribed, navigate to add event page
    navigate("/agenda/adicionar");
  }

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Minha Agenda</h1>
              <p className="text-muted-foreground">
                Organize seus eventos, cursos, viagens e compromissos profissionais em um só lugar. 
                Salve eventos da plataforma, adicione suas viagens, workshops e muito mais.
              </p>
            </div>
            <Button 
              onClick={handleAddEvent}
              className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Adicionar Evento à Agenda
            </Button>
          </div>

          {!subscription?.subscribed && (
            <Card className="mb-8 border-amber-400/50 bg-amber-50 dark:bg-amber-950/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-400/30 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-amber-600"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-400">Assinatura necessária</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Para adicionar eventos à sua agenda, você precisa ter uma assinatura ativa.
                      Escolha um plano que melhor atenda às suas necessidades.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-amber-400 hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-900/50"
                      onClick={() => navigate("/planos")}
                    >
                      Ver Planos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Calendário</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium">Meus Eventos</CardTitle>
                <Button variant="outline" size="sm" onClick={fetchUserSchedule}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                    <path d="M21 3v5h-5"></path>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                    <path d="M8 16H3v5"></path>
                  </svg>
                  Atualizar
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="bg-muted w-2 flex-shrink-0" />
                          <div className="p-4 w-full">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                {event.location && (
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                      <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    {event.location}
                                  </div>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(event.start_date).toLocaleDateString('pt-BR')}
                              </div>
                            </div>
                            {event.description && (
                              <p className="text-sm mt-2">{event.description}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mb-3 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto opacity-50">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Nenhum evento agendado</h3>
                    <p className="text-muted-foreground mb-6">
                      {subscription?.subscribed 
                        ? "Adicione um evento à sua agenda para começar." 
                        : "Assine um plano para adicionar eventos à sua agenda."}
                    </p>
                    {subscription?.subscribed ? (
                      <Button 
                        variant="outline" 
                        onClick={() => navigate("/agenda/adicionar")}
                      >
                        Adicionar Primeiro Evento
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => navigate("/planos")}
                      >
                        Ver Planos de Assinatura
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
