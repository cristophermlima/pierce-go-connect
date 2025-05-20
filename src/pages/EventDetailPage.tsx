
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewsList from "@/components/ReviewsList";
import AddEvaluationForm from "@/components/AddEvaluationForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

export default function EventDetailPage() {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [showEvaluationDialog, setShowEvaluationDialog] = useState(false);
  
  // Mock data for a single event based on the image provided
  const event = {
    id: id || "1",
    title: "GEP - Grupo de Estudos em Piercing",
    type: "Conferência",
    rating: 4.8,
    reviews: 56,
    date: "15-17 Maio, 2025",
    time: "09:00 - 18:00",
    location: "Centro de Convenções, São Paulo, SP",
    address: "Av. Paulista 1000 - Bela Vista, São Paulo - SP",
    price: "R$ 420,00",
    description: "O 8º Congresso Internacional para Piercers Profissionais (GEP) é um evento anual que reúne os melhores profissionais do Brasil para compartilhar conhecimentos, técnicas e novidades do mundo do body piercing. Com palestras, workshops práticos e networking, o GEP é imperdível para quem quer se manter atualizado e crescer na profissão. Este ano celebraremos 30 anos de Gauntlet e teremos pela primeira vez Jim Ward no Brasil!",
    features: [
      "Palestras com profissionais renomados nacionais e internacionais",
      "Workshops práticos com certificação",
      "Exposição de fornecedores de joias e equipamentos",
      "Networking com profissionais de todo o Brasil",
      "Material didático completo"
    ],
    organizer: "Associação Brasileira de Body Piercing"
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    // In a real app, we would implement sharing functionality
    console.log("Compartilhar evento:", event.title);
    // For now, let's show a toast instead
    toast("Link copiado para a área de transferência!");
  };

  const openEvaluationDialog = () => {
    setShowEvaluationDialog(true);
  };

  const closeEvaluationDialog = () => {
    setShowEvaluationDialog(false);
  };

  const handleSubmitEvaluation = (data: any) => {
    const newReview = {
      id: `review-${Date.now()}`,
      author: data.name || "Usuário anônimo",
      date: new Date().toLocaleDateString('pt-BR'),
      rating: data.rating,
      comment: data.comment,
      technicalRating: data.technicalRating,
      ethicalRating: data.ethicalRating,
      diplomaticRating: data.diplomaticRating,
      helpful: 0,
      images: data.images || []
    };

    setReviews([newReview, ...reviews]);
    closeEvaluationDialog();
    toast.success("Avaliação enviada com sucesso!");
  };

  return (
    <MainLayout>
      <div className="relative bg-gradient-to-b from-primary/20 to-transparent pt-10">
        <div className="container px-4 py-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-primary">
              <span>Evento</span>
              {isSaved ? (
                <button onClick={handleSave} className="text-yellow-400">
                  ★ 1 ({event.reviews})
                </button>
              ) : (
                <button onClick={handleSave} className="text-muted-foreground">
                  ☆ 0 ({event.reviews})
                </button>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                {event.date}
                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {event.time}
                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {event.location}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 my-4">
              <Button className="bg-primary hover:bg-primary/90">Inscrever-se</Button>
              <Button variant="outline" onClick={handleSave}>
                {isSaved ? "Salvo" : "Salvar"}
              </Button>
              <Button variant="outline" onClick={handleShare}>Compartilhar</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Tabs defaultValue="sobre">
                  <TabsList className="bg-muted mb-6">
                    <TabsTrigger value="sobre">Sobre o Evento</TabsTrigger>
                    <TabsTrigger value="programacao">Programação</TabsTrigger>
                    <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sobre" className="space-y-6">
                    <section>
                      <h2 className="text-xl font-bold mb-3">Sobre o Evento</h2>
                      <p className="text-muted-foreground">{event.description}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-bold mb-3">Durante os dois do evento, você terá acesso a:</h3>
                      <ul className="space-y-2">
                        {event.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 text-primary">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                    
                    <section>
                      <p className="text-sm text-muted-foreground">
                        <strong>Organizado por:</strong> {event.organizer}
                      </p>
                    </section>
                  </TabsContent>
                  
                  <TabsContent value="programacao">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Programação completa será divulgada em breve.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="avaliacoes">
                    <ReviewsList 
                      type="event" 
                      reviews={reviews} 
                      onAddReview={openEvaluationDialog} 
                    />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-6">
                <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/30 p-4">
                  <h3 className="text-lg font-semibold mb-4">Planejamento de Viagem</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Hospedagem</h4>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium">Hotel Parceiro</p>
                        <p className="text-xs text-muted-foreground">A partir de R$ 250/noite</p>
                        <p className="text-xs text-primary mt-1">15% de desconto para participantes</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Buscar no Airbnb</h4>
                      <p className="text-xs text-muted-foreground">Encontre acomodações próximas</p>
                      <Button variant="outline" className="w-full mt-2 text-sm h-8">Ver opções</Button>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Hotéis Próximos</h4>
                      <p className="text-xs text-muted-foreground">Opções econômicas</p>
                      <Button variant="outline" className="w-full mt-2 text-sm h-8">Ver opções</Button>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Transporte</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Passagens Aéreas</p>
                          <p className="text-xs text-muted-foreground">Compare preços e horários</p>
                          <Button variant="outline" className="w-full mt-1 text-sm h-8">Buscar voos</Button>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Traslado Aeroporto-Hotel</p>
                          <p className="text-xs text-muted-foreground">Serviço com desconto</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Alimentação</h4>
                      <p className="text-sm">Restaurantes Próximos</p>
                      <p className="text-xs text-muted-foreground">Opções para todos os gostos</p>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink">
                      Planejar Minha Viagem
                    </Button>
                  </div>
                </div>
                
                <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/30 p-4">
                  <h3 className="text-lg font-semibold mb-2">Preço</h3>
                  <p className="text-2xl font-bold">{event.price}</p>
                  <p className="text-sm text-muted-foreground mb-4">Inclui acesso a todas as atividades</p>
                  <Button className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink">
                    Inscrever-se
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Dialog */}
      <Dialog open={showEvaluationDialog} onOpenChange={setShowEvaluationDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <AddEvaluationForm 
            type="event" 
            onSubmit={handleSubmitEvaluation} 
            onCancel={closeEvaluationDialog} 
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
