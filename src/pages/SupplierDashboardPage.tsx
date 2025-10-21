
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

interface SupplierListing {
  id: string;
  name: string;
  category: string | null;
  location: string | null;
  created_at: string;
  views?: number;
  clicks?: number;
  user_id?: string;
}

interface SupplierReview {
  id: string;
  comment: string;
  overall_rating: number;
  created_at: string;
  organization_rating?: number;
  quality_rating?: number;
}

export default function SupplierDashboardPage() {
  const { user, profile } = useAuth();
  const [listings, setListings] = useState<SupplierListing[]>([]);
  const [reviews, setReviews] = useState<SupplierReview[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchSupplierData() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch supplier listings
        const { data: listingsData, error: listingsError } = await supabase
          .from('suppliers')
          .select('*')
          .eq('user_id', user.id);
          
        if (listingsError) throw listingsError;
        
        // Add mock analytics data (in a real app, you'd have a proper analytics table)
        const enhancedListings = listingsData?.map(listing => ({
          ...listing,
          views: Math.floor(Math.random() * 100) + 50,
          clicks: Math.floor(Math.random() * 30) + 10,
        }));
        
        setListings(enhancedListings || []);
        
        // Fetch reviews for all supplier listings
        if (listingsData && listingsData.length > 0) {
          const supplierIds = listingsData.map(listing => listing.id);
          
          const { data: reviewsData, error: reviewsError } = await supabase
            .from('reviews')
            .select('*')
            .in('supplier_id', supplierIds)
            .order('created_at', { ascending: false });
            
          if (reviewsError) throw reviewsError;
          
          setReviews(reviewsData || []);
        }
      } catch (error) {
        console.error('Error fetching supplier data:', error);
        toast.error("Erro ao carregar dados do fornecedor");
      } finally {
        setLoading(false);
      }
    }
    
    fetchSupplierData();
  }, [user]);

  return (
    <AdminLayout
      title="Painel do Fornecedor"
      description="Gerencie suas lojas, produtos e avaliações"
      requiredRole="supplier"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : listings.reduce((sum, item) => sum + (item.views || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cliques</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M15 10v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v1"></path>
              <path d="M11 11.5v-1a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v1"></path>
              <path d="M11 11.5v-1a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v1"></path>
              <path d="M9 14h2"></path>
              <line x1="12" y1="14" x2="14" y2="14"></line>
              <path d="M12 14v4"></path>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : listings.reduce((sum, item) => sum + (item.clicks || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +10.5% em relação ao mês passado
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
      
      <Tabs defaultValue="listings">
        <TabsList className="mb-6">
          <TabsTrigger value="listings">Minhas Lojas</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="listings">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lojas Cadastradas</CardTitle>
                <CardDescription>Gerencie suas lojas no diretório</CardDescription>
              </div>
              <Button>Adicionar Nova Loja</Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : listings.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="font-medium text-lg mb-2">Nenhuma loja cadastrada</h3>
                  <p className="text-muted-foreground mb-4">
                    Você ainda não cadastrou nenhuma loja no diretório.
                  </p>
                  <Button>Adicionar Primeira Loja</Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Visualizações</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">{listing.name}</TableCell>
                        <TableCell>{listing.category || "N/A"}</TableCell>
                        <TableCell>{listing.location}</TableCell>
                        <TableCell>{listing.views}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                            Ativo
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
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
              <CardDescription>Veja o que seus clientes estão dizendo sobre seus produtos e serviços</CardDescription>
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
                    Você ainda não recebeu avaliações para suas lojas.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Avaliação</TableHead>
                      <TableHead>Comentário</TableHead>
                      <TableHead>Organização</TableHead>
                      <TableHead>Qualidade</TableHead>
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
                          {review.organization_rating ? (
                            <div className="flex text-yellow-400">
                              {"★".repeat(Math.round(review.organization_rating || 0))}
                              {"☆".repeat(5 - Math.round(review.organization_rating || 0))}
                            </div>
                          ) : "N/A"}
                        </TableCell>
                        <TableCell>
                          {review.quality_rating ? (
                            <div className="flex text-yellow-400">
                              {"★".repeat(Math.round(review.quality_rating || 0))}
                              {"☆".repeat(5 - Math.round(review.quality_rating || 0))}
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

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Desempenho</CardTitle>
              <CardDescription>Visualize as métricas de desempenho de seus anúncios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-16">
                <p className="text-muted-foreground">Gráficos de análise serão implementados em breve</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Conta</CardTitle>
              <CardDescription>Gerencie as configurações da sua conta de fornecedor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Informações de Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email de Contato</label>
                    <input
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={user?.email || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Telefone</label>
                    <input
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Configurações de Notificação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Receber notificações de novas avaliações</span>
                    <div className="h-6 w-11 bg-primary/80 rounded-full relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 bg-white h-5 w-5 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Receber relatórios semanais</span>
                    <div className="h-6 w-11 bg-muted rounded-full relative cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 bg-white h-5 w-5 rounded-full"></div>
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
