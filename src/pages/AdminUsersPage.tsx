
import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  full_name: string;
  email: string;
  city: string | null;
  is_admin: boolean;
  is_event_organizer: boolean;
  is_supplier: boolean;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    async function fetchUsers() {
      if (!isAdmin) return;
      
      try {
        setLoading(true);
        
        // Join profiles with auth.users to get emails
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id,
            full_name,
            city,
            is_admin,
            is_event_organizer,
            is_supplier,
            created_at
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // For admin view, we need to fetch emails from auth.users
        // This would typically be done in a server-side function for security
        // Here we're simulating it by adding placeholder emails
        const usersWithEmail = data?.map(user => ({
          ...user,
          email: `usuario_${user.id.substring(0, 8)}@exemplo.com` // Placeholder email
        })) || [];
        
        setUsers(usersWithEmail);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, [isAdmin]);

  const handleRoleChange = async (userId: string, role: string, value: boolean) => {
    try {
      const updates: Record<string, boolean> = {};
      updates[role] = value;
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, [role]: value } : user
        )
      );
      
      toast.success(`Status de ${role.replace('is_', '')} atualizado`);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error("Erro ao atualizar o perfil do usuário");
    }
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout 
      title="Gerenciar Usuários" 
      description="Visualize e gerencie todas as contas de usuários"
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
                placeholder="Buscar usuários..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              Exportar Lista
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Cidade</TableHead>
                <TableHead className="hidden md:table-cell">Data de Criação</TableHead>
                <TableHead>Administrador</TableHead>
                <TableHead>Organizador</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.full_name || "Usuário Anônimo"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.city || "Não informado"}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={user.is_admin || false}
                        onCheckedChange={(value) => handleRoleChange(user.id, 'is_admin', value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={user.is_event_organizer || false}
                        onCheckedChange={(value) => handleRoleChange(user.id, 'is_event_organizer', value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={user.is_supplier || false}
                        onCheckedChange={(value) => handleRoleChange(user.id, 'is_supplier', value)}
                      />
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
                          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Enviar Email</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            Suspender Conta
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
