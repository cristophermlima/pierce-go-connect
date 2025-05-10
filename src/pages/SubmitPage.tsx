
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

export default function SubmitPage() {
  const [eventLoading, setEventLoading] = useState(false);
  const [shopLoading, setShopLoading] = useState(false);

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventLoading(true);
    
    try {
      // In a real app, we would submit to an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Evento enviado para aprovação com sucesso!");
      // Reset form here
    } catch (error) {
      toast.error("Erro ao enviar o evento. Tente novamente.");
    } finally {
      setEventLoading(false);
    }
  };

  const handleShopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShopLoading(true);
    
    try {
      // In a real app, we would submit to an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Loja enviada para aprovação com sucesso!");
      // Reset form here
    } catch (error) {
      toast.error("Erro ao enviar a loja. Tente novamente.");
    } finally {
      setShopLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container py-16 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Cadastrar</h1>
          <p className="text-xl text-muted-foreground">
            Cadastre seu evento ou sua loja para a comunidade de body piercing
          </p>
        </div>

        <Tabs defaultValue="event" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="event">Cadastrar Evento</TabsTrigger>
            <TabsTrigger value="shop">Cadastrar Loja/Estúdio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="event">
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Informações do Evento</h2>
              
              <form onSubmit={handleEventSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome do Evento *</label>
                    <Input required placeholder="Ex: Workshop Técnicas Avançadas" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo de Evento *</label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conference">Conferência</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="expo">Exposição</SelectItem>
                        <SelectItem value="course">Curso</SelectItem>
                        <SelectItem value="meetup">Meetup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Data de Início *</label>
                    <Input type="date" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Data de Término *</label>
                    <Input type="date" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Horário *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" placeholder="Início" required />
                      <Input type="time" placeholder="Término" required />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Endereço Completo *</label>
                  <Input required placeholder="Ex: Av. Paulista, 1000 - Bela Vista" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Cidade *</label>
                    <Input required placeholder="Ex: São Paulo" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Estado *</label>
                    <Input required placeholder="Ex: SP" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">CEP *</label>
                    <Input required placeholder="Ex: 01310-000" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                  <Input type="number" min="0" step="0.01" placeholder="Deixe em branco se for gratuito" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição do Evento *</label>
                  <Textarea 
                    required 
                    placeholder="Descreva detalhes sobre o evento, palestrantes, temas abordados, etc." 
                    className="h-32"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Website ou Link para Inscrição</label>
                  <Input placeholder="Ex: https://meueventopiercers.com" type="url" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Imagens do Evento</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Arraste e solte suas imagens aqui</p>
                    <Button type="button" variant="outline" className="text-sm">
                      Selecionar Imagens
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Adicione até 5 imagens de alta qualidade</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Organização</label>
                  <Input placeholder="Nome da organização ou organizador" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Contato para Dúvidas</label>
                  <Input type="email" placeholder="Email de contato" />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink"
                    disabled={eventLoading}
                  >
                    {eventLoading ? "Enviando..." : "Enviar Evento para Aprovação"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    * Seu evento passará por uma revisão antes de ser publicado
                  </p>
                </div>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="shop">
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Informações da Loja/Estúdio</h2>
              
              <form onSubmit={handleShopSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome da Loja/Estúdio *</label>
                    <Input required placeholder="Ex: Revolution Piercing Studio" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo de Negócio *</label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="store">Loja de Joias e Acessórios</SelectItem>
                        <SelectItem value="studio">Estúdio de Body Piercing</SelectItem>
                        <SelectItem value="supplier">Fornecedor de Equipamentos</SelectItem>
                        <SelectItem value="distributor">Distribuidor</SelectItem>
                        <SelectItem value="school">Escola/Centro de Formação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Sobre o Negócio *</label>
                  <Textarea 
                    required
                    placeholder="Descreva sua loja/estúdio, especialidades, diferenciais, etc." 
                    className="h-32"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Endereço Completo *</label>
                  <Input required placeholder="Ex: Rua Augusta, 500 - Consolação" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Cidade *</label>
                    <Input required placeholder="Ex: São Paulo" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Estado *</label>
                    <Input required placeholder="Ex: SP" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">CEP *</label>
                    <Input required placeholder="Ex: 01305-000" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone de Contato *</label>
                    <Input required placeholder="Ex: (11) 99999-9999" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email de Contato *</label>
                    <Input required type="email" placeholder="Ex: contato@revolucionpiercing.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Website</label>
                    <Input placeholder="Ex: https://revolucionpiercing.com" type="url" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <Input placeholder="Ex: @revolucionpiercing" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Horário de Funcionamento</label>
                  <Textarea 
                    placeholder="Ex: Segunda a Sexta: 10h às 19h, Sábado: 10h às 15h" 
                    className="h-20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Imagens da Loja/Estúdio</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Arraste e solte suas imagens aqui</p>
                    <Button type="button" variant="outline" className="text-sm">
                      Selecionar Imagens
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Adicione até 10 imagens de alta qualidade</p>
                  </div>
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink"
                    disabled={shopLoading}
                  >
                    {shopLoading ? "Enviando..." : "Enviar Loja para Aprovação"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    * Seu cadastro passará por uma revisão antes de ser publicado
                  </p>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
