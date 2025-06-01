
import { useState, useEffect } from 'react';
import AdminLayout from "@/components/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from 'react-router-dom';

interface EventListing {
  id: string;
  title: string;
  type: string;
  location: string;
  created_at: string;
  views?: number;
  registrations?: number;
  event_date?: string;
}

interface EventReview {
  id: string;
  comment: string;
  overall_rating: number;
  created_at: string;
  environment_rating?: number;
  organization_rating?: number;
  safety_rating?: number;
}

export default function OrganizerDashboardPage() {
  const { user, profile } = useAuth();
  const [events, setEvents] = useState<EventListing[]>([]);
  const [reviews, setReviews] = useState<EventReview[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchOrganizerData() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch organizer events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('creator_id', user.id);
          
        if (eventsError) throw eventsError;
        
        // Add mock analytics data (in a real app, you'd have a proper analytics table)
        const enhancedEvents = eventsData?.map(event => ({
          ...event,
          views: Math.floor(Math.random() * 120) + 30,
          registrations: Math.floor(Math.random() * 20) + 5,
          event_date: new Date(new Date().getTime() + Math.random() * 10000000000).toISOString().split('T')[0]
        }));
        
        setEvents(enhancedEvents || []);
        
        // Fetch reviews for all events
        if (eventsData && eventsData.length > 0) {
          const eventIds = eventsData.map(event => event.id);
          
          const { data: reviewsData, error: reviewsError } = await supabase
            .from('reviews')
            .select('*')
            .in('event_id', eventIds)
            .order('created_at', { ascending: false });
            
          if (reviewsError) throw reviewsError;
          
          setReviews(reviewsData || []);
        }
      } catch (error) {
        console.error('Error fetching organizer data:', error);
        toast.error("Erro ao carregar dados do organizador");
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrganizerData();
  }, [user]);

  return (
    <AdminLayout
      title="Painel do Organizador"
      description="Gerencie seus eventos, registros e avaliações"
      requiredRole="event_organizer"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visualizações Totais</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : events.reduce((sum, item) => sum + (item.views || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +15.3% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inscrições</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : events.reduce((sum, item) => sum + (item.registrations || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +8.2% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Médias</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : reviews.length > 0 
                ? (reviews.reduce((sum, review) => sum + review.overall_rating, 0) / reviews.length).toFixed(1) 
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Baseado em {reviews.length} avaliações
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="events">
        <TabsList className="mb-6">
          <TabsTrigger value="events">Meus Eventos</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="attendees">Participantes</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Eventos Cadastrados</CardTitle>
                <CardDescription>Gerencie seus eventos na plataforma</CardDescription>
              </div>
              <Button onClick={() => navigate('/eventos/adicionar')}>Adicionar Evento</Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="font-medium text-lg mb-2">Nenhum evento cadastrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Você ainda não cadastrou nenhum evento na plataforma.
                  </p>
                  <Button onClick={() => navigate('/eventos/adicionar')}>Adicionar Primeiro Evento</Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Inscrições</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{event.type}</TableCell>
                        <TableCell>{event.event_date || "N/A"}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.registrations}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                            Ativo
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/eventos/editar/${event.id}`)}>
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Avaliações Recebidas</CardTitle>
              <CardDescription>Veja o que os participantes estão dizendo sobre seus eventos</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="font-medium text-lg mb-2">Nenhuma avaliação ainda</h3>
                  <p className="text-muted-foreground">
                    Seus eventos ainda não receberam avaliações.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Avaliação</TableHead>
                      <TableHead>Comentário</TableHead>
                      <TableHead>Técnica</TableHead>
                      <TableHead>Ética</TableHead>
                      <TableHead>Diplomacia</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                          {new Date(review.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <div className="flex text-yellow-400">
                            {"★".repeat(Math.round(review.overall_rating || 0))}
                            {"☆".repeat(5 - Math.round(review.overall_rating || 0))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                        <TableCell>
                          {review.environment_rating ? (
                            <div className="flex text-yellow-400">
                              {"★".repeat(Math.round(review.environment_rating || 0))}
                              {"☆".repeat(5 - Math.round(review.environment_rating || 0))}
                            </div>
                          ) : "N/A"}
                        </TableCell>
                        <TableCell>
                          {review.safety_rating ? (
                            <div className="flex text-yellow-400">
                              {"★".repeat(Math.round(review.safety_rating || 0))}
                              {"☆".repeat(5 - Math.round(review.safety_rating || 0))}
                            </div>
                          ) : "N/A"}
                        </TableCell>
                        <TableCell>
                          {review.organization_rating ? (
                            <div className="flex text-yellow-400">
                              {"★".repeat(Math.round(review.organization_rating || 0))}
                              {"☆".repeat(5 - Math.round(review.organization_rating || 0))}
                            </div>
                          ) : "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Responder
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendees">
          <Card>
            <CardHeader>
              <CardTitle>Participantes dos Eventos</CardTitle>
              <CardDescription>Visualize e gerencie os participantes inscritos em seus eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-16">
                <p className="text-muted-foreground">Gerenciamento de participantes será implementado em breve</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Organizador</CardTitle>
              <CardDescription>Gerencie as configurações da sua conta de organizador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Informações do Organizador</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nome do Organizador/Empresa</label>
                    <input
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      defaultValue={profile?.full_name || ""}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Site</label>
                    <input
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="www.seusite.com.br"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Configurações de Evento</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Permitir comentários nos eventos</span>
                    <div className="h-6 w-11 bg-primary/80 rounded-full relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 bg-white h-5 w-5 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Enviar alertas para inscrições</span>
                    <div className="h-6 w-11 bg-primary/80 rounded-full relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 bg-white h-5 w-5 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="bg-gradient-to-r from-piercing-purple to-piercing-pink">
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
