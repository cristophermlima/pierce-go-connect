
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  reviewsCount: number;
  travelPlansCount: number;
  upcomingEventCount: number;
}

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    reviewsCount: 0,
    travelPlansCount: 0,
    upcomingEventCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch reviews count
        const { count: reviewsCount } = await supabase
          .from('reviews')
          .select('id', { count: 'exact', head: false })
          .eq('user_id', user.id);
        
        // Fetch travel plans count
        const { count: travelPlansCount } = await supabase
          .from('travel_plans')
          .select('id', { count: 'exact', head: false })
          .eq('user_id', user.id);
        
        // Fetch upcoming events
        const now = new Date().toISOString();
        const { count: upcomingEventCount } = await supabase
          .from('schedules')
          .select('id', { count: 'exact', head: false })
          .eq('user_id', user.id)
          .gte('start_date', now);
          
        setStats({
          reviewsCount: reviewsCount || 0,
          travelPlansCount: travelPlansCount || 0,
          upcomingEventCount: upcomingEventCount || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user]);

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Bem-vindo de volta, {profile?.full_name || "Usuário"}!
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/planos')}
              >
                Meu Plano
              </Button>
              <Button 
                className="bg-gradient-to-r from-piercing-purple to-piercing-pink" 
                onClick={() => navigate('/submit')}
              >
                Adicionar Conteúdo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{loading ? "..." : stats.reviewsCount}</CardTitle>
                <CardDescription>Avaliações</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-0 h-auto hover:bg-transparent hover:text-primary"
                  onClick={() => navigate('/avaliacoes')}
                >
                  Ver avaliações →
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{loading ? "..." : stats.travelPlansCount}</CardTitle>
                <CardDescription>Planos de Viagem</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-0 h-auto hover:bg-transparent hover:text-primary"
                  onClick={() => navigate('/viagens')}
                >
                  Ver viagens →
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{loading ? "..." : stats.upcomingEventCount}</CardTitle>
                <CardDescription>Eventos Futuros</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-0 h-auto hover:bg-transparent hover:text-primary"
                  onClick={() => navigate('/eventos')}
                >
                  Ver eventos →
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Últimas Avaliações</CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center">
                {loading ? (
                  <div className="animate-pulse h-4 w-full max-w-sm rounded bg-muted"></div>
                ) : stats.reviewsCount > 0 ? (
                  <p>Conteúdo das avaliações recentes</p>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Você ainda não fez avaliações.
                    <br />
                    <Button 
                      variant="link" 
                      onClick={() => navigate('/avaliacoes')}
                    >
                      Faça sua primeira avaliação
                    </Button>
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center">
                {loading ? (
                  <div className="animate-pulse h-4 w-full max-w-sm rounded bg-muted"></div>
                ) : stats.upcomingEventCount > 0 ? (
                  <p>Conteúdo dos próximos eventos</p>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Você não tem eventos futuros.
                    <br />
                    <Button 
                      variant="link" 
                      onClick={() => navigate('/eventos')}
                    >
                      Explore eventos
                    </Button>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
