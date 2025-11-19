import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddPiercerPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    experience_years: "",
    city: "",
    state: "",
    specialty: "" as string
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa estar logado para cadastrar um perfil de piercer");
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('piercers').insert({
        user_id: user.id,
        name: formData.name,
        bio: formData.bio,
        experience_years: parseInt(formData.experience_years) || null,
        city: formData.city,
        state: formData.state,
        country: "Brasil",
        specialties: formData.specialty ? [formData.specialty] : null
      });

      if (error) throw error;

      toast.success("Perfil de piercer cadastrado com sucesso!");
      navigate('/piercers');
    } catch (error: any) {
      console.error("Error creating piercer:", error);
      toast.error("Erro ao cadastrar perfil de piercer");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Cadastrar Perfil de Piercer</CardTitle>
              <CardDescription>
                Crie seu perfil profissional no catálogo de piercers do PiercerGo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Profissional *</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome profissional"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio/Descrição</Label>
                  <Textarea
                    id="bio"
                    placeholder="Conte um pouco sobre você e sua experiência..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience_years">Anos de Experiência</Label>
                    <Input
                      id="experience_years"
                      type="number"
                      min="0"
                      placeholder="Ex: 5"
                      value={formData.experience_years}
                      onChange={(e) => handleInputChange('experience_years', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade Principal</Label>
                    <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Orelha">Orelha</SelectItem>
                        <SelectItem value="Nariz">Nariz</SelectItem>
                        <SelectItem value="Septum">Septum</SelectItem>
                        <SelectItem value="Labret">Labret</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                        <SelectItem value="Microdermal">Microdermal</SelectItem>
                        <SelectItem value="Nipple">Nipple</SelectItem>
                        <SelectItem value="Genital">Genital</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      placeholder="Ex: São Paulo"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">Estado *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="MG">MG</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                        <SelectItem value="RS">RS</SelectItem>
                        <SelectItem value="BA">BA</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="PE">PE</SelectItem>
                        <SelectItem value="CE">CE</SelectItem>
                        <SelectItem value="GO">GO</SelectItem>
                        <SelectItem value="DF">DF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/piercers')}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-piercing-purple to-piercing-pink"
                  >
                    {loading ? "Cadastrando..." : "Cadastrar Perfil"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
