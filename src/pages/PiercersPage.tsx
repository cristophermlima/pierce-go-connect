
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MainLayout from "@/components/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, Star, Instagram, Globe, Phone, Award } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Piercer {
  id: string;
  name: string;
  bio: string;
  experience_years: number;
  specialties: string[];
  city: string;
  state: string;
  country: string;
  phone?: string;
  instagram?: string;
  website?: string;
  portfolio_images: string[];
  rating: number;
  total_reviews: number;
  verified: boolean;
  featured: boolean;
}

export default function PiercersPage() {
  const [piercers, setPiercers] = useState<Piercer[]>([]);
  const [filteredPiercers, setFilteredPiercers] = useState<Piercer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPiercers();
  }, []);

  useEffect(() => {
    filterPiercers();
  }, [searchQuery, selectedCity, piercers]);

  const fetchPiercers = async () => {
    try {
      const { data, error } = await supabase
        .from("piercers")
        .select("*")
        .order("featured", { ascending: false })
        .order("rating", { ascending: false });

      if (error) throw error;
      setPiercers(data || []);
    } catch (error) {
      console.error("Error fetching piercers:", error);
      toast.error("Erro ao carregar piercers");
    } finally {
      setLoading(false);
    }
  };

  const filterPiercers = () => {
    let filtered = piercers;

    if (searchQuery) {
      filtered = filtered.filter(piercer =>
        piercer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        piercer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        piercer.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        piercer.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(piercer => 
        piercer.city.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    setFilteredPiercers(filtered);
  };

  const cities = [...new Set(piercers.map(p => p.city))].sort();

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
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
            Catálogo de <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Piercers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre os melhores profissionais de body piercing da sua região ou descubra talentos pelo Brasil
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por nome, cidade ou especialidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="">Todas as cidades</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Grid de Piercers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPiercers.map((piercer) => (
            <Card key={piercer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={piercer.portfolio_images?.[0]} />
                      <AvatarFallback>{piercer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {piercer.name}
                        {piercer.verified && (
                          <Award className="w-4 h-4 text-blue-500" title="Verificado" />
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {piercer.city}, {piercer.state}
                      </div>
                    </div>
                  </div>
                  {piercer.featured && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Destaque
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {piercer.rating > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{piercer.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({piercer.total_reviews} avaliações)
                      </span>
                    </div>
                  )}
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {piercer.bio || "Profissional especializado em body piercing"}
                  </p>
                  
                  {piercer.experience_years && (
                    <p className="text-sm">
                      <span className="font-medium">{piercer.experience_years} anos</span> de experiência
                    </p>
                  )}
                  
                  {piercer.specialties?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {piercer.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {piercer.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{piercer.specialties.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 pt-2">
                    {piercer.instagram && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://instagram.com/${piercer.instagram}`} target="_blank" rel="noopener noreferrer">
                          <Instagram className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                    {piercer.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={piercer.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                    {piercer.phone && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://wa.me/${piercer.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                          <Phone className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPiercers.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              Nenhum piercer encontrado com os filtros selecionados
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
