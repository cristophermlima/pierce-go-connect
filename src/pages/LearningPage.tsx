
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Search, BookOpen, PlayCircle, Clock, FileText, Star, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface LearningResource {
  id: string;
  title: string;
  description: string;
  type: "ebook" | "course";
  category: string;
  price: number;
  affiliate_link: string;
  cover_image: string;
  author: string;
  duration?: string;
  pages?: number;
  featured: boolean;
}

export default function LearningPage() {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<LearningResource[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [searchQuery, activeTab, resources]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("learning_resources")
        .select("*")
        .eq("active", true)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching learning resources:", error);
      toast.error("Erro ao carregar recursos");
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    if (activeTab !== "all") {
      filtered = filtered.filter(resource => resource.type === activeTab);
    }

    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  };

  const handleAffiliateClick = (link: string, title: string) => {
    // Analytics tracking could be added here
    console.log(`Affiliate click: ${title}`);
    window.open(link, '_blank');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Aprenda <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Body Piercing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ebooks e cursos especializados para elevar seu conhecimento e técnicas em body piercing
          </p>
        </div>

        {/* Busca */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar ebooks e cursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="ebook">Ebooks</TabsTrigger>
            <TabsTrigger value="course">Cursos</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Grid de Recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                {resource.cover_image && (
                  <img
                    src={resource.cover_image}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                {resource.featured && (
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant={resource.type === "ebook" ? "default" : "secondary"}>
                    {resource.type === "ebook" ? (
                      <BookOpen className="w-3 h-3 mr-1" />
                    ) : (
                      <PlayCircle className="w-3 h-3 mr-1" />
                    )}
                    {resource.type === "ebook" ? "Ebook" : "Curso"}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                {resource.author && (
                  <CardDescription>por {resource.author}</CardDescription>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    {resource.type === "ebook" && resource.pages && (
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {resource.pages} páginas
                      </div>
                    )}
                    {resource.type === "course" && resource.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {resource.duration}
                      </div>
                    )}
                  </div>
                  
                  {resource.category && (
                    <Badge variant="outline">{resource.category}</Badge>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-2xl font-bold text-green-600">
                      R$ {resource.price?.toFixed(2).replace(".", ",")}
                    </div>
                    <Button 
                      onClick={() => handleAffiliateClick(resource.affiliate_link, resource.title)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                    >
                      Comprar
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              Nenhum recurso encontrado com os filtros selecionados
            </p>
          </div>
        )}

        {/* Seção de Informação sobre Afiliados */}
        <div className="mt-16 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Sobre nossos links de afiliados</h3>
          <p className="text-sm text-muted-foreground">
            Este site pode conter links de afiliados. Quando você compra através desses links, 
            podemos receber uma comissão sem custo adicional para você. Isso nos ajuda a manter 
            a plataforma gratuita e sempre atualizada com os melhores conteúdos.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
