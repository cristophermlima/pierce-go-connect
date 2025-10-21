
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

interface Supplier {
  id: string;
  name: string;
  category: string | null;
  location: string | null;
  image: string | null;
  created_at: string;
  creator_name: string;
  creator_email: string;
  user_id?: string;
}

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSuppliers() {
      if (!isAdmin) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('suppliers')
          .select(`
            id,
            name,
            category,
            location,
            image,
            created_at,
            user_id
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Get creator details and add them to each supplier
        const enhancedSuppliers = data?.map(supplier => ({
          ...supplier,
          creator_name: "Usuário " + supplier.user_id?.substring(0, 8),
          creator_email: `usuario_${supplier.user_id?.substring(0, 6)}@exemplo.com`
        })) || [];
        
        setSuppliers(enhancedSuppliers);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        toast.error("Erro ao carregar fornecedores");
      } finally {
        setLoading(false);
      }
    }
    
    fetchSuppliers();
  }, [isAdmin]);

  const handleDeleteSupplier = async (id: string) => {
    try {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setSuppliers(prevSuppliers => 
        prevSuppliers.filter(supplier => supplier.id !== id)
      );
      
      toast.success("Fornecedor removido com sucesso");
    } catch (error) {
      console.error('Error deleting supplier:', error);
      toast.error("Erro ao remover fornecedor");
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout 
      title="Gerenciar Fornecedores" 
      description="Visualize e gerencie todos os fornecedores da plataforma"
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
                placeholder="Buscar fornecedores..." 
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
                onClick={() => navigate('/admin/fornecedores/adicionar')}
              >
                Adicionar Fornecedor
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="hidden md:table-cell">Localização</TableHead>
                <TableHead className="hidden md:table-cell">Criado por</TableHead>
                <TableHead className="hidden md:table-cell">Data</TableHead>
                <TableHead>Status</TableHead>
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
              ) : filteredSuppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    Nenhum fornecedor encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.category || "N/A"}</TableCell>
                    <TableCell className="hidden md:table-cell">{supplier.location}</TableCell>
                    <TableCell className="hidden md:table-cell">{supplier.creator_name || "Sistema"}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(supplier.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        Ativo
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
                          <DropdownMenuItem onClick={() => navigate(`/admin/fornecedores/editar/${supplier.id}`)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteSupplier(supplier.id)}>
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
