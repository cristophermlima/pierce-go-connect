
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { toast } from '@/components/ui/sonner';

interface RoleProtectedRouteProps {
  children: ReactNode;
  requiredRole: 'admin' | 'event_organizer' | 'supplier' | undefined;
}

export default function RoleProtectedRoute({ children, requiredRole }: RoleProtectedRouteProps) {
  const { user, profile, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const location = useLocation();
  
  useEffect(() => {
    if (!user && !authLoading) {
      toast.error("Você precisa estar logado para acessar esta página");
    } else if (!adminLoading && requiredRole === "admin" && !isAdmin) {
      toast.error("Você não tem permissão para acessar esta página");
    } else if (!authLoading && requiredRole === "event_organizer" && !profile?.is_event_organizer && !isAdmin) {
      toast.error("Você precisa ser um organizador de eventos para acessar esta página");
    } else if (!authLoading && requiredRole === "supplier" && !profile?.is_supplier && !isAdmin) {
      toast.error("Você precisa ser um fornecedor para acessar esta página");
    }
  }, [user, profile, isAdmin, authLoading, adminLoading, requiredRole]);
  
  if (authLoading || adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} />;
  }
  
  if (requiredRole === "admin" && !isAdmin) {
    return <Navigate to="/" />;
  }
  
  if (requiredRole === "event_organizer" && !profile?.is_event_organizer && !isAdmin) {
    return <Navigate to="/" />;
  }
  
  if (requiredRole === "supplier" && !profile?.is_supplier && !isAdmin) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}
