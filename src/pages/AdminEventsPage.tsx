
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface Event {
  id: string;
  title: string;
  location: string;
  image: string | null;
  created_at: string;
  creator_name: string;
  event_date?: string;
  organizer_id?: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      if (!isAdmin) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('events')
          .select(`
            id,
            title,
            location,
            image,
            created_at,
            organizer_id
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Get creator details and add them to each event
        // In a real app, you would fetch these from profiles or do a join
        const enhancedEvents = data?.map(event => ({
          ...event,
          creator_name: "Usuário " + event.organizer_id?.substring(0, 8),
          event_date: event.created_at ? new Date(event.created_at).toISOString().split('T')[0] : "N/A"
        })) || [];
        
        setEvents(enhancedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error("Erro ao carregar eventos");
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, [isAdmin]);

  const handleDeleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setEvents(prevEvents => 
        prevEvents.filter(event => event.id !== id)
      );
      
      toast.success("Evento removido com sucesso");
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error("Erro ao remover evento");
    }
  };

  const filteredEvents = events.filter(event => 
    event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout 
      title="Gerenciar Eventos" 
      description="Visualize e gerencie todos os eventos da plataforma"
      requiredRole="admin"
    >
      <div className="bg-background rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <Input 
                className="pl-10" 
                placeholder="Buscar eventos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="sm:w-auto"
              >
                Exportar Lista
              </Button>
              <Button 
                onClick={() => navigate('/admin/eventos/adicionar')}
              >
                Adicionar Evento
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Localização</TableHead>
                <TableHead className="hidden md:table-cell">Data do Evento</TableHead>
                <TableHead className="hidden md:table-cell">Criado por</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Nenhum evento encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{event.location}</TableCell>
                    <TableCell className="hidden md:table-cell">{event.event_date}</TableCell>
                    <TableCell className="hidden md:table-cell">{event.creator_name || "Sistema"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        Publicado
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/admin/eventos/editar/${event.id}`)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteEvent(event.id)}>
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
