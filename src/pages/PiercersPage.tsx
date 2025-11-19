import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/components/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Star, Phone, Instagram, Globe, Search, Verified, Mail, Calendar } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type Piercer = {
  id: string;
  user_id: string | null;
  name: string;
  bio: string | null;
  experience_years: number | null;
  specialties: string[] | null;
  city: string;
  state: string;
  country: string;
  portfolio_images: string[] | null;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
};

export default function PiercersPage() {
  const navigate = useNavigate();
  const [piercers, setPiercers] = useState<Piercer[]>([]);
  const [filteredPiercers, setFilteredPiercers] = useState<Piercer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");

  useEffect(() => {
    fetchPiercers();
  }, []);

  useEffect(() => {
    filterPiercers();
  }, [piercers, searchTerm, cityFilter, stateFilter, specialtyFilter]);

  const fetchPiercers = async () => {
    try {
      const { data, error } = await supabase
        .from('piercers')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      // Adiciona piercers fictícios para demonstração
      const mockPiercers = [
        {
          id: "mock-1",
          user_id: null,
          name: "Ana Silva",
          bio: "Especialista em piercings de orelha e nariz com 8 anos de experiência. Certificada em técnicas avançadas de perfuração.",
          experience_years: 8,
          specialties: ["Orelha", "Nariz", "Helix", "Tragus"],
          city: "São Paulo",
          state: "SP",
          country: "Brasil",
          portfolio_images: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"],
          rating: 4.9,
          review_count: 127,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-2",
          user_id: null,
          name: "Carlos Mendes",
          bio: "Piercer profissional especializado em piercings faciais e corporais. Apaixonado por body art e segurança.",
          experience_years: 12,
          specialties: ["Septum", "Medusa", "Industrial", "Microdermal"],
          city: "Rio de Janeiro",
          state: "RJ",
          country: "Brasil",
          portfolio_images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"],
          rating: 5.0,
          review_count: 93,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-3",
          user_id: null,
          name: "Mariana Costa",
          bio: "Body piercer com foco em piercings delicados e minimalistas. Técnicas modernas e ambiente acolhedor.",
          experience_years: 6,
          specialties: ["Orelha", "Conch", "Daith", "Rook"],
          city: "Belo Horizonte",
          state: "MG",
          country: "Brasil",
          portfolio_images: ["https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80"],
          rating: 4.8,
          review_count: 64,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-4",
          user_id: null,
          name: "Roberto Alves",
          bio: "Especialista em piercings complexos e personalizados. Atendimento individualizado e materiais de primeira linha.",
          experience_years: 15,
          specialties: ["Industrial", "Surface", "Dermal Anchor", "Snake Bites"],
          city: "Curitiba",
          state: "PR",
          country: "Brasil",
          portfolio_images: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"],
          rating: 4.9,
          review_count: 156,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-5",
          user_id: null,
          name: "Juliana Santos",
          bio: "Body piercer certificada com expertise em anatomia e técnicas de cicatrização. Ambiente seguro e higiênico.",
          experience_years: 9,
          specialties: ["Septum", "Nostril", "Labret", "Bridge"],
          city: "Porto Alegre",
          state: "RS",
          country: "Brasil",
          portfolio_images: ["https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"],
          rating: 4.7,
          review_count: 82,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "mock-6",
          user_id: null,
          name: "Pedro Oliveira",
          bio: "Piercer profissional com anos de experiência em eventos e convenções. Especializado em piercings genitais e faciais.",
          experience_years: 11,
          specialties: ["Prince Albert", "Nipple", "VCH", "Eyebrow"],
          city: "Salvador",
          state: "BA",
          country: "Brasil",
          portfolio_images: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"],
          rating: 5.0,
          review_count: 118,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ];

      // Se houver dados reais, mescla com os fictícios
      setPiercers(data && data.length > 0 ? [...data, ...mockPiercers] : mockPiercers);
    } catch (error) {
      console.error('Error fetching piercers:', error);
      toast.error("Erro ao carregar piercers");
    } finally {
      setLoading(false);
    }
  };

  const filterPiercers = () => {
    let filtered = piercers;

    if (searchTerm) {
      filtered = filtered.filter(piercer =>
        piercer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        piercer.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        piercer.specialties?.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (cityFilter !== "all") {
      filtered = filtered.filter(piercer => piercer.city === cityFilter);
    }

    if (stateFilter !== "all") {
      filtered = filtered.filter(piercer => piercer.state === stateFilter);
    }

    if (specialtyFilter !== "all") {
      filtered = filtered.filter(piercer => 
        piercer.specialties?.includes(specialtyFilter)
      );
    }

    setFilteredPiercers(filtered);
  };

  // Corrigir arrays para não incluir valores vazios
  const cities = [...new Set(piercers.map(p => p.city).filter(Boolean).filter(city => city !== ''))].sort();
  const states = [...new Set(piercers.map(p => p.state).filter(Boolean).filter(state => state !== ''))].sort();
  const allSpecialties = [...new Set(
    piercers.flatMap(p => (p.specialties || [])).filter(Boolean).filter(s => s !== '')
  )].sort();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const PiercerCard = ({ piercer }: { piercer: Piercer }) => (
    <Card>
      <CardHeader className="text-center pb-4">
        <div className="relative mx-auto mb-4">
          <Avatar className="w-16 h-16 mx-auto border-4 border-white shadow-lg">
            <AvatarImage src={piercer.portfolio_images?.[0]} alt={piercer.name} />
            <AvatarFallback className="text-lg font-bold">
              {piercer.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <CardTitle className="text-lg font-bold">
          {piercer.name}
        </CardTitle>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4" />
            {piercer.city}, {piercer.state}, {piercer.country}
          </div>
          
          {piercer.experience_years && (
            <div className="flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4" />
              {piercer.experience_years} anos de experiência
            </div>
          )}
          
          {piercer.rating > 0 && (
            <div className="flex items-center justify-center gap-2">
              <div className="flex">{renderStars(piercer.rating)}</div>
              <span className="text-sm">
                {piercer.rating.toFixed(1)} ({piercer.review_count} avaliações)
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {piercer.bio && (
          <p className="text-sm text-muted-foreground text-center line-clamp-3">
            {piercer.bio}
          </p>
        )}
        
        {piercer.specialties && piercer.specialties.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Especialidades:</p>
            <div className="flex flex-wrap gap-1">
              {piercer.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {piercer.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{piercer.specialties.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="text-center">Carregando piercers...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Catálogo de <span className="text-gradient">Piercers</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Encontre piercers qualificados na sua cidade ou descubra profissionais em outras regiões
            </p>
          </div>
          <Button 
            onClick={() => navigate('/piercers/cadastrar')}
            className="bg-gradient-to-r from-piercing-purple to-piercing-pink whitespace-nowrap"
          >
            Cadastrar Perfil
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar piercers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as cidades</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Especialidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as especialidades</SelectItem>
              {allSpecialties.map(specialty => (
                <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setCityFilter("all");
            setStateFilter("all");
            setSpecialtyFilter("all");
          }}>
            Limpar filtros
          </Button>
        </div>

        {/* All Piercers */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Todos os Piercers ({filteredPiercers.length})
          </h2>
          
          {filteredPiercers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum piercer encontrado com os filtros aplicados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPiercers.map((piercer) => (
                <PiercerCard key={piercer.id} piercer={piercer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
