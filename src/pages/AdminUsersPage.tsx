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
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { CheckCircle, XCircle, Eye, Clock, Search, MoreVertical } from "lucide-react";

interface User {
  id: string;
  full_name: string;
  email: string;
  city: string | null;
  is_admin: boolean;
  is_event_organizer: boolean;
  is_supplier: boolean;
  is_piercer: boolean;
  profile_type: string | null;
  certificate_url: string | null;
  certificate_status: string | null;
  created_at: string;
}

const PROFILE_TYPE_LABELS: Record<string, string> = {
  piercer_individual: "Piercer Individual",
  piercing_shop: "Loja de Piercing",
  piercing_tattoo_studio: "Estúdio de Piercing e Tatuagem",
  supplier: "Fornecedor",
  event_promoter: "Promotor de Eventos",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-600 border-green-500/30",
  rejected: "bg-red-500/20 text-red-600 border-red-500/30",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    async function fetchUsers() {
      if (!isAdmin) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id,
            full_name,
            city,
            is_admin,
            is_event_organizer,
            is_supplier,
            is_piercer,
            profile_type,
            certificate_url,
            certificate_status,
            created_at
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        const usersWithEmail = data?.map(user => ({
          ...user,
          email: `usuario_${user.id.substring(0, 8)}@exemplo.com`
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

  const handleCertificateAction = async (userId: string, action: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ certificate_status: action })
        .eq('id', userId);
        
      if (error) throw error;
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, certificate_status: action } : user
        )
      );
      
      setShowCertificateDialog(false);
      setSelectedUser(null);
      
      toast.success(action === 'approved' ? "Certificado aprovado!" : "Certificado rejeitado!");
    } catch (error) {
      console.error('Error updating certificate status:', error);
      toast.error("Erro ao atualizar status do certificado");
    }
  };

  const openCertificateDialog = (user: User) => {
    setSelectedUser(user);
    setShowCertificateDialog(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.city?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && user.certificate_status === "pending";
    if (activeTab === "piercers") return matchesSearch && user.is_piercer;
    if (activeTab === "suppliers") return matchesSearch && user.is_supplier;
    if (activeTab === "organizers") return matchesSearch && user.is_event_organizer;
    
    return matchesSearch;
  });

  const pendingCount = users.filter(u => u.certificate_status === "pending").length;

  return (
    <AdminLayout 
      title="Gerenciar Usuários" 
      description="Visualize e gerencie todas as contas de usuários e certificados"
      requiredRole="admin"
    >
      <div className="bg-background rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="pending" className="relative">
                  Pendentes
                  {pendingCount > 0 && (
                    <span className="ml-2 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="piercers">Piercers</TabsTrigger>
                <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
                <TabsTrigger value="organizers">Organizadores</TabsTrigger>
              </TabsList>
              
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  className="pl-10" 
                  placeholder="Buscar usuários..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </Tabs>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="hidden md:table-cell">Cidade</TableHead>
                <TableHead>Certificado</TableHead>
                <TableHead className="hidden lg:table-cell">Data</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.full_name || "Sem nome"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.profile_type ? (
                        <Badge variant="outline" className="text-xs">
                          {PROFILE_TYPE_LABELS[user.profile_type] || user.profile_type}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">Não definido</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.city || "Não informado"}
                    </TableCell>
                    <TableCell>
                      {user.certificate_url ? (
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={STATUS_COLORS[user.certificate_status || 'pending']}
                          >
                            {user.certificate_status === 'pending' && <Clock size={12} className="mr-1" />}
                            {user.certificate_status === 'approved' && <CheckCircle size={12} className="mr-1" />}
                            {user.certificate_status === 'rejected' && <XCircle size={12} className="mr-1" />}
                            {STATUS_LABELS[user.certificate_status || 'pending']}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openCertificateDialog(user)}
                          >
                            <Eye size={14} />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">Sem certificado</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs">
                      {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={user.is_admin || false}
                        onCheckedChange={(value) => handleRoleChange(user.id, 'is_admin', value)}
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openCertificateDialog(user)}>
                            Ver Detalhes
                          </DropdownMenuItem>
                          {user.certificate_url && user.certificate_status === 'pending' && (
                            <>
                              <DropdownMenuItem 
                                className="text-green-600"
                                onClick={() => handleCertificateAction(user.id, 'approved')}
                              >
                                <CheckCircle size={14} className="mr-2" />
                                Aprovar Certificado
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleCertificateAction(user.id, 'rejected')}
                              >
                                <XCircle size={14} className="mr-2" />
                                Rejeitar Certificado
                              </DropdownMenuItem>
                            </>
                          )}
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

      {/* Certificate Dialog */}
      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
            <DialogDescription>
              {selectedUser?.full_name || "Usuário"} - {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Tipo de Perfil</p>
                  <p className="font-medium">
                    {selectedUser.profile_type 
                      ? PROFILE_TYPE_LABELS[selectedUser.profile_type] 
                      : "Não definido"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cidade</p>
                  <p className="font-medium">{selectedUser.city || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status do Certificado</p>
                  <Badge 
                    variant="outline" 
                    className={STATUS_COLORS[selectedUser.certificate_status || 'pending']}
                  >
                    {STATUS_LABELS[selectedUser.certificate_status || 'pending']}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Data de Cadastro</p>
                  <p className="font-medium">
                    {new Date(selectedUser.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              {selectedUser.certificate_url && (
                <div>
                  <p className="text-muted-foreground mb-2">Certificado</p>
                  <img 
                    src={selectedUser.certificate_url} 
                    alt="Certificado" 
                    className="w-full max-h-96 object-contain rounded-lg border"
                  />
                </div>
              )}
            </div>
          )}

          {selectedUser?.certificate_url && selectedUser.certificate_status === 'pending' && (
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => handleCertificateAction(selectedUser.id, 'rejected')}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <XCircle size={16} className="mr-2" />
                Rejeitar
              </Button>
              <Button 
                onClick={() => handleCertificateAction(selectedUser.id, 'approved')}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle size={16} className="mr-2" />
                Aprovar
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
