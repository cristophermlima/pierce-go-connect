
import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewsList from "@/components/ReviewsList";

export default function ProfilePage() {
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [city, setCity] = useState(profile?.city || "");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      setIsUpdating(true);
      
      const { error } = await updateProfile({
        full_name: fullName,
        city: city
      });
      
      if (error) {
        toast.error("Erro ao atualizar perfil: " + error.message);
        return;
      }
      
      await refreshProfile();
      toast.success("Perfil atualizado com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao atualizar perfil: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left sidebar - User info */}
            <div>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <Avatar className="h-24 w-24">
                      {profile?.avatar_url ? (
                        <AvatarImage src={profile.avatar_url} alt={profile.full_name || ''} />
                      ) : (
                        <AvatarFallback className="text-xl">{getInitials(profile?.full_name)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold">{profile?.full_name || "Usuário"}</h2>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      {profile?.city && (
                        <p className="text-sm text-muted-foreground mt-1">{profile.city}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome Completo</label>
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cidade</label>
                      <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Sua cidade"
                      />
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink"
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right content - Tabs for reviews, etc */}
            <div className="md:col-span-2">
              <Tabs defaultValue="reviews">
                <TabsList className="w-full">
                  <TabsTrigger value="reviews" className="flex-1">Minhas Avaliações</TabsTrigger>
                  <TabsTrigger value="trips" className="flex-1">Minhas Viagens</TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1">Configurações</TabsTrigger>
                </TabsList>
                
                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Avaliações de Eventos</h3>
                    {user && (
                      <ReviewsList type="event" />
                    )}
                    
                    <h3 className="text-xl font-bold mt-8">Avaliações de Fornecedores</h3>
                    {user && (
                      <ReviewsList type="supplier" />
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="trips" className="mt-6">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      Você ainda não tem viagens registradas.
                    </p>
                    <Button
                      className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
                      onClick={() => {}}
                    >
                      Planejar uma Viagem
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Segurança</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">Alterar Senha</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Preferências</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Receber notificações por email</label>
                          <div className="relative inline-flex items-center">
                            <input 
                              type="checkbox" 
                              className="sr-only" 
                              id="notifications"
                            />
                            <div className="h-6 w-11 rounded-full bg-muted"></div>
                            <div className="absolute left-0.5 h-5 w-5 rounded-full bg-background border"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
