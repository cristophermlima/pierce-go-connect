
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MainLayout from "@/components/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Book, Play, Search, Star, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type LearningResource = {
  id: string;
  title: string;
  description: string | null;
  type: "ebook" | "course";
  category: string | null;
  price: number | null;
  affiliate_link: string;
  cover_image: string | null;
  author: string | null;
  duration: string | null;
  pages: number | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export default function LearningPage() {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, typeFilter, categoryFilter]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('learning_resources')
        .select('*')
        .eq('active', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedData = (data || []).map(item => ({
        ...item,
        type: item.type as "ebook" | "course"
      }));

      setResources(typedData);
    } catch (error) {
      console.error('Error fetching learning resources:', error);
      toast.error("Erro ao carregar recursos de aprendizado");
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(resource => resource.type === typeFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(resource => resource.category === categoryFilter);
    }

    setFilteredResources(filtered);
  };

  const categories = [...new Set(resources.map(r => r.category).filter(Boolean))];

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="text-center">Carregando recursos...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Centro de <span className="text-gradient">Aprendizado</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Ebooks, cursos e materiais educacionais para aprimorar suas técnicas de body piercing
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="ebook">E-books</SelectItem>
              <SelectItem value="course">Cursos</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category!}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setTypeFilter("all");
            setCategoryFilter("all");
          }}>
            Limpar filtros
          </Button>
        </div>

        {/* Featured Resources */}
        {filteredResources.some(r => r.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recursos em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(resource => resource.featured).map((resource) => (
                <Card key={resource.id} className="relative overflow-hidden">
                  <Badge className="absolute top-4 right-4 bg-yellow-500">
                    <Star className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                  
                  {resource.cover_image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={resource.cover_image} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {resource.type === 'ebook' ? (
                        <Book className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Play className="w-4 h-4 text-green-500" />
                      )}
                      <Badge variant="outline">{resource.type === 'ebook' ? 'E-book' : 'Curso'}</Badge>
                      {resource.category && <Badge variant="secondary">{resource.category}</Badge>}
                    </div>
                    <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                    {resource.author && (
                      <CardDescription>por {resource.author}</CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    {resource.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      {resource.type === 'ebook' && resource.pages && (
                        <span className="text-sm text-muted-foreground">{resource.pages} páginas</span>
                      )}
                      {resource.type === 'course' && resource.duration && (
                        <span className="text-sm text-muted-foreground">{resource.duration}</span>
                      )}
                      {resource.price && (
                        <span className="font-bold text-lg">R$ {resource.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => window.open(resource.affiliate_link, '_blank')}
                    >
                      Acessar Conteúdo
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Todos os Recursos ({filteredResources.length})
          </h2>
          
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum recurso encontrado com os filtros aplicados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(resource => !resource.featured).map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  {resource.cover_image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={resource.cover_image} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {resource.type === 'ebook' ? (
                        <Book className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Play className="w-4 h-4 text-green-500" />
                      )}
                      <Badge variant="outline">{resource.type === 'ebook' ? 'E-book' : 'Curso'}</Badge>
                      {resource.category && <Badge variant="secondary">{resource.category}</Badge>}
                    </div>
                    <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                    {resource.author && (
                      <CardDescription>por {resource.author}</CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    {resource.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      {resource.type === 'ebook' && resource.pages && (
                        <span className="text-sm text-muted-foreground">{resource.pages} páginas</span>
                      )}
                      {resource.type === 'course' && resource.duration && (
                        <span className="text-sm text-muted-foreground">{resource.duration}</span>
                      )}
                      {resource.price && (
                        <span className="font-bold text-lg">R$ {resource.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => window.open(resource.affiliate_link, '_blank')}
                    >
                      Acessar Conteúdo
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
