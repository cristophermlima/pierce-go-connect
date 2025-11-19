
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MainLayout from "@/components/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Book, Play, Search, Star, ExternalLink, Clock, FileText, Users, Award } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type LearningResource = {
  id: string;
  title: string;
  description: string | null;
  content_type: string | null;
  author: string | null;
  url: string | null;
  created_at: string;
  updated_at: string;
};

export default function LearningPage() {
  const navigate = useNavigate();
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, typeFilter]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('learning_resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Adiciona recursos fictícios para demonstração
      const mockResources: LearningResource[] = [
        {
          id: "mock-1",
          title: "Curso Completo de Body Piercing Profissional",
          description: "Aprenda todas as técnicas essenciais de perfuração, anatomia, assepsia e cicatrização. Curso certificado com 40 horas de conteúdo prático e teórico.",
          content_type: "Curso",
          author: "Ana Silva",
          url: "https://exemplo.com/curso-body-piercing",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-2",
          title: "E-book: Guia Completo de Joias para Piercing",
          description: "Conheça os diferentes tipos de joias, materiais seguros, tamanhos e como escolher a joia ideal para cada perfuração. Inclui guia de fornecedores confiáveis.",
          content_type: "E-book",
          author: "Carlos Mendes",
          url: "https://exemplo.com/ebook-joias",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-3",
          title: "Workshop: Piercings Faciais Avançados",
          description: "Workshop intensivo de 2 dias focado em piercings faciais complexos: bridge, dermal anchor, microdermal e técnicas avançadas de perfuração.",
          content_type: "Workshop",
          author: "Mariana Costa",
          url: "https://exemplo.com/workshop-faciais",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-4",
          title: "Certificação Internacional em Body Piercing",
          description: "Programa completo de certificação reconhecido internacionalmente. Aprenda anatomia, microbiologia, técnicas de perfuração e gestão de estúdio.",
          content_type: "Certificação",
          author: "Roberto Alves",
          url: "https://exemplo.com/certificacao",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-5",
          title: "E-book: Segurança e Assepsia no Body Piercing",
          description: "Manual completo sobre protocolos de segurança, esterilização, autoclave, descarte de materiais e prevenção de infecções.",
          content_type: "E-book",
          author: "Juliana Santos",
          url: "https://exemplo.com/ebook-seguranca",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-6",
          title: "Curso: Marketing Digital para Piercers",
          description: "Aprenda a promover seu trabalho nas redes sociais, criar portfólio profissional, atrair clientes e construir sua marca pessoal.",
          content_type: "Curso",
          author: "Pedro Oliveira",
          url: "https://exemplo.com/curso-marketing",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ];

      // Mescla dados reais com fictícios
      setResources(data && data.length > 0 ? [...data, ...mockResources] : mockResources);
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
      filtered = filtered.filter(resource => resource.content_type === typeFilter);
    }

    setFilteredResources(filtered);
  };

  const ResourceCard = ({ resource }: { resource: LearningResource }) => (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          {resource.content_type === 'ebook' ? (
            <div className="flex items-center gap-1 text-blue-600">
              <Book className="w-4 h-4" />
              <Badge variant="outline" className="text-blue-600 border-blue-600">E-book</Badge>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-green-600">
              <Play className="w-4 h-4" />
              <Badge variant="outline" className="text-green-600 border-green-600">Curso</Badge>
            </div>
          )}
        </div>
        
        <CardTitle className="line-clamp-2 text-lg leading-tight">
          {resource.title}
        </CardTitle>
        
        {resource.author && (
          <CardDescription className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            por {resource.author}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {resource.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {resource.description}
          </p>
        )}
        
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
          onClick={() => resource.url && window.open(resource.url, '_blank')}
        >
          Ver Mais
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

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
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Centro de <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Aprendizado</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Transforme sua carreira com os melhores cursos e e-books de body piercing do mercado
              </p>
            </div>
            <Button 
              onClick={() => navigate('/aprender/adicionar')}
              className="bg-gradient-to-r from-piercing-purple to-piercing-pink whitespace-nowrap"
            >
              Adicionar Recurso
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              Certificados reconhecidos
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              +1.200 alunos satisfeitos
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              Avaliação 4.9/5
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cursos e e-books..."
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

          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setTypeFilter("all");
          }}>
            Limpar filtros
          </Button>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Todos os Recursos ({filteredResources.length})
          </h2>
          
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum recurso encontrado com os filtros aplicados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>

        {/* Trust Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Garantia de Qualidade</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Todos os nossos cursos e e-books são criados por profissionais experientes e reconhecidos no mercado de body piercing. 
            Oferecemos 7 dias de garantia para sua total satisfação.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              Certificado digital
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              Acesso vitalício
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              Suporte dedicado
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
