
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewsList from "@/components/ReviewsList";
import AddEvaluationForm from "@/components/AddEvaluationForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
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
    toast.success(isSaved ? "Evento removido dos salvos" : "Evento salvo com sucesso!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copiado para a área de transferência!");
  };

  const openEvaluationDialog = () => {
    setShowEvaluationDialog(true);
  };

  const closeEvaluationDialog = () => {
    setShowEvaluationDialog(false);
  };

  const handleSubmitEvaluation = () => {
    setRefreshKey(prev => prev + 1);
    closeEvaluationDialog();
    toast.success("Avaliação enviada com sucesso!");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container px-4 py-6 lg:py-10">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Event Image */}
                <div className="lg:w-2/3">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-piercing-purple/20 to-piercing-pink/20">
                    <img 
                      src="https://images.unsplash.com/photo-1622298760148-0f9c81f4a101?q=80&w=2070&auto=format&fit=crop"
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Event Info */}
                <div className="lg:w-1/3">
                  <div className="glass-card p-6 rounded-lg sticky top-6">
                    <div className="flex items-center gap-2 text-red-500 mb-4">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Oficial</span>
                      <span className="text-sm">{event.type}</span>
                    </div>

                    <h1 className="text-2xl lg:text-3xl font-bold mb-4">{event.title}</h1>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="16" x2="16" y1="2" y2="6"></line>
                          <line x1="8" x2="8" y1="2" y2="6"></line>
                          <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-3xl font-bold text-primary mb-2">{event.price}</div>
                      <p className="text-sm text-muted-foreground">Inclui acesso a todas as atividades</p>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink text-white">
                        Inscrever-se
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={handleSave} className="text-sm">
                          {isSaved ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                              </svg>
                              Salvo
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                              </svg>
                              Salvar
                            </>
                          )}
                        </Button>
                        
                        <Button variant="outline" onClick={handleShare} className="text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                            <circle cx="18" cy="5" r="3"/>
                            <circle cx="6" cy="12" r="3"/>
                            <circle cx="18" cy="19" r="3"/>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                          </svg>
                          Compartilhar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="sobre" className="w-full">
              <TabsList className="bg-muted mb-6 w-full lg:w-auto">
                <TabsTrigger value="sobre">Sobre o Evento</TabsTrigger>
                <TabsTrigger value="programacao">Programação</TabsTrigger>
                <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sobre" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <section>
                      <h2 className="text-2xl font-bold mb-4">Sobre o Evento</h2>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-bold mb-4">Durante os dias do evento, você terá acesso a:</h3>
                      <ul className="space-y-3">
                        {event.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
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
                  </div>
                  
                  {/* Travel Planning Sidebar */}
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-lg">
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
                        
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full text-sm h-8" onClick={() => navigate('/viagens#hospedagem')}>Ver Hospedagens</Button>
                          <Button variant="outline" className="w-full text-sm h-8" onClick={() => navigate('/viagens#hospedagem')}>Hotéis Próximos</Button>
                          <Button variant="outline" className="w-full text-sm h-8" onClick={() => navigate('/viagens#voos')}>Buscar Voos</Button>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink"
                          onClick={() => navigate('/viagens')}
                        >
                          Planejar Minha Viagem
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="programacao">
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-4">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Programação em breve</h3>
                  <p className="text-muted-foreground">A programação completa será divulgada nas próximas semanas.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="avaliacoes">
                <ReviewsList 
                  type="event" 
                  entityId={id}
                  onAddReview={openEvaluationDialog}
                  refreshKey={refreshKey}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Evaluation Dialog with Scroll */}
      <Dialog open={showEvaluationDialog} onOpenChange={setShowEvaluationDialog}>
        <DialogContent className="max-w-4xl max-h-[95vh] p-0">
          <div className="max-h-[95vh] overflow-y-auto">
            <div className="p-6">
              <AddEvaluationForm 
                type="event" 
                onSubmit={handleSubmitEvaluation} 
                onCancel={closeEvaluationDialog} 
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
