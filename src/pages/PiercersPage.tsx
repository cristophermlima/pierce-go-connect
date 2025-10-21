import { useState, useEffect } from "react";
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
        .order('featured', { ascending: false })
        .order('rating', { ascending: false });

      if (error) throw error;

      // Se não houver piercers cadastrados, adiciona um fictício apenas para ilustração visual
      if (!data || data.length === 0) {
        setPiercers([
          {
            id: "ficticio-1",
            user_id: null,
            name: "Joana Fictícia",
            bio: "Especialista em perfurações de orelha, nariz e boca. Mais de 10 anos de experiência em studios renomados.",
            experience_years: 10,
            specialties: ["Orelha", "Nariz", "Microdermal", "Industrial"],
            city: "São Paulo",
            state: "SP",
            country: "Brasil",
            portfolio_images: [
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
            ],
            rating: 4.9,
            review_count: 48,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ]);
      } else {
        setPiercers(data);
      }
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Catálogo de <span className="text-gradient">Piercers</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Encontre piercers qualificados na sua cidade ou descubra profissionais em outras regiões
          </p>
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
