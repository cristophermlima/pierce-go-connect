
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";

interface AdminStats {
  totalUsers: number;
  totalEvents: number;
  totalSuppliers: number;
  totalReviews: number;
  pendingCertificates: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalEvents: 0,
    totalSuppliers: 0,
    totalReviews: 0,
    pendingCertificates: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    async function fetchAdminStats() {
      try {
        setLoading(true);
        
        // Get total users count
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        if (usersError) throw usersError;
        
        // Get total events count
        const { count: eventsCount, error: eventsError } = await supabase
          .from('events')
          .select('*', { count: 'exact', head: true });
          
        if (eventsError) throw eventsError;
        
        // Get total suppliers count
        const { count: suppliersCount, error: suppliersError } = await supabase
          .from('suppliers')
          .select('*', { count: 'exact', head: true });
          
        if (suppliersError) throw suppliersError;
        
        // Get total reviews count
        const { count: reviewsCount, error: reviewsError } = await supabase
          .from('reviews')
          .select('*', { count: 'exact', head: true });
          
        if (reviewsError) throw reviewsError;
        
        // Get pending certificates count
        const { count: pendingCount, error: pendingError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('certificate_status', 'pending')
          .not('certificate_url', 'is', null);
          
        if (pendingError) throw pendingError;
        
        setStats({
          totalUsers: usersCount || 0,
          totalEvents: eventsCount || 0,
          totalSuppliers: suppliersCount || 0,
          totalReviews: reviewsCount || 0,
          pendingCertificates: pendingCount || 0,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    }

    if (isAdmin) {
      fetchAdminStats();
    }
  }, [isAdmin]);

  return (
    <AdminLayout 
      title="Painel Administrativo" 
      description="Gerencie todos os aspectos da plataforma"
      requiredRole="admin"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Usuários" 
          value={loading ? "..." : stats.totalUsers.toString()} 
          onClick={() => navigate('/admin/usuarios')}
        />
        <StatCard 
          title="Eventos" 
          value={loading ? "..." : stats.totalEvents.toString()} 
          onClick={() => navigate('/admin/eventos')}
        />
        <StatCard 
          title="Fornecedores" 
          value={loading ? "..." : stats.totalSuppliers.toString()} 
          onClick={() => navigate('/admin/fornecedores')}
        />
        <StatCard 
          title="Avaliações" 
          value={loading ? "..." : stats.totalReviews.toString()} 
          onClick={() => navigate('/admin/avaliacoes')}
        />
      </div>
      
      {/* Pending Certificates Alert */}
      {stats.pendingCertificates > 0 && (
        <Card className="mb-6 border-yellow-500/50 bg-yellow-500/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="m9 15 2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-500">Certificados Pendentes</h3>
                <p className="text-sm text-muted-foreground">
                  {stats.pendingCertificates} piercer(s) aguardando aprovação de certificado
                </p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/admin/usuarios')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Revisar Agora
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/usuarios')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Aprovar Certificados de Piercers
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/eventos/adicionar')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar Novo Evento
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/fornecedores/adicionar')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar Novo Fornecedor
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/planos/gerenciar')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Gerenciar Planos
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Supabase</span>
                <span className="flex items-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="ml-1">Operacional</span>
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Stripe</span>
                <span className="flex items-center text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span className="ml-1">Pendente</span>
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Storage</span>
                <span className="flex items-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="ml-1">Operacional</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  onClick: () => void;
}

function StatCard({ title, value, onClick }: StatCardProps) {
  return (
    <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={onClick}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
