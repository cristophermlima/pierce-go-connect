
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

interface AdminLayoutProps {
  children: ReactNode;
  requiredRole?: "admin" | "event_organizer" | "supplier" | undefined;
  title: string;
  description?: string;
}

export default function AdminLayout({ 
  children, 
  requiredRole = undefined, 
  title, 
  description 
}: AdminLayoutProps) {
  const { user, profile } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Você precisa estar logado para acessar esta página");
      navigate('/auth');
      return;
    }

    if (!adminLoading) {
      if (requiredRole === "admin" && !isAdmin) {
        toast.error("Você não tem permissão para acessar esta página");
        navigate('/');
        return;
      }

      if (requiredRole === "event_organizer" && !profile?.is_event_organizer && !isAdmin) {
        toast.error("Você precisa ser um organizador de eventos para acessar esta página");
        navigate('/');
        return;
      }

      if (requiredRole === "supplier" && !profile?.is_supplier && !isAdmin) {
        toast.error("Você precisa ser um fornecedor para acessar esta página");
        navigate('/');
        return;
      }
    }
  }, [user, profile, isAdmin, adminLoading, requiredRole, navigate]);

  const getActiveTab = () => {
    const path = window.location.pathname;
    if (path.includes('/admin/eventos')) return 'eventos';
    if (path.includes('/admin/fornecedores')) return 'fornecedores';
    if (path.includes('/admin/usuarios')) return 'usuarios';
    if (path.includes('/admin/planos')) return 'planos';
    return 'dashboard';
  };

  if (adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b">
        <div className="container py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              Ver Site
            </Button>
            <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
          </div>
        </div>
      </header>

      <div className="container py-6">
        {isAdmin && (
          <Card className="mb-6 p-2">
            <Tabs value={getActiveTab()} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex-1"
                  onClick={() => navigate('/admin')}
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="eventos" 
                  className="flex-1"
                  onClick={() => navigate('/admin/eventos')}
                >
                  Eventos
                </TabsTrigger>
                <TabsTrigger 
                  value="fornecedores" 
                  className="flex-1"
                  onClick={() => navigate('/admin/fornecedores')}
                >
                  Fornecedores
                </TabsTrigger>
                <TabsTrigger 
                  value="usuarios" 
                  className="flex-1"
                  onClick={() => navigate('/admin/usuarios')}
                >
                  Usuários
                </TabsTrigger>
                <TabsTrigger 
                  value="planos" 
                  className="flex-1"
                  onClick={() => navigate('/admin/planos')}
                >
                  Planos
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>
        )}

        {children}
      </div>
    </div>
  );
}
