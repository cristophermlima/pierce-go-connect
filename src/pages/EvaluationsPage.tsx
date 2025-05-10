
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddEvaluationForm from "@/components/AddEvaluationForm";

export default function EvaluationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEvaluationDialog, setShowAddEvaluationDialog] = useState(false);
  const [evaluationType, setEvaluationType] = useState<"event" | "supplier">("event");

  const openAddEvaluationDialog = (type: "event" | "supplier") => {
    setEvaluationType(type);
    setShowAddEvaluationDialog(true);
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-3">Score Piercing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Avaliações técnicas, diplomáticas e éticas de eventos e fornecedores da área de body piercing.
            </p>
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="eventos" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList className="bg-muted">
                  <TabsTrigger value="eventos" className="px-8 py-2">Eventos</TabsTrigger>
                  <TabsTrigger value="fornecedores" className="px-8 py-2">Fornecedores</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-3">
                  <Button 
                    className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
                    onClick={() => openAddEvaluationDialog("event")}
                  >
                    Adicionar Avaliação
                  </Button>
                </div>
              </div>
              
              <div className="relative mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.3-4.3"></path></svg>
                <Input 
                  className="pl-10 bg-muted border-none" 
                  placeholder="Buscar eventos ou fornecedores..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <TabsContent value="eventos">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EventCard 
                    title="GEP - Grupo de Estudos em Piercing"
                    type="Conferência"
                    image="/placeholder.svg"
                    location="São Paulo, SP"
                    rating={4.8}
                    reviews={56}
                    technicalRating={4}
                    ethicalRating={3}
                    diplomaticRating={5}
                    onAddReview={() => openAddEvaluationDialog("event")}
                  />
                  <EventCard 
                    title="Expo Piercing Brasil"
                    type="Exposição"
                    image="/placeholder.svg"
                    location="Rio de Janeiro, RJ"
                    rating={4.6}
                    reviews={42}
                    technicalRating={3}
                    ethicalRating={5}
                    diplomaticRating={4}
                    onAddReview={() => openAddEvaluationDialog("event")}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="fornecedores">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SupplierCard 
                    title="Revolution Piercing"
                    type="Joias e Acessórios"
                    image="/placeholder.svg"
                    location="Nacional"
                    rating={4.8}
                    reviews={56}
                    onAddReview={() => openAddEvaluationDialog("supplier")}
                  />
                  <SupplierCard 
                    title="Angel Piercing"
                    type="Joias e Acessórios"
                    image="/placeholder.svg"
                    location="São Paulo, SP"
                    rating={4.6}
                    reviews={42}
                    onAddReview={() => openAddEvaluationDialog("supplier")}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Add Evaluation Dialog */}
      <Dialog open={showAddEvaluationDialog} onOpenChange={setShowAddEvaluationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Avaliação</DialogTitle>
            <DialogDescription>
              Compartilhe sua experiência com a comunidade.
            </DialogDescription>
          </DialogHeader>
          <AddEvaluationForm 
            type={evaluationType} 
            onSubmit={() => setShowAddEvaluationDialog(false)}
            onCancel={() => setShowAddEvaluationDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

interface EventCardProps {
  title: string;
  type: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  technicalRating: number;
  ethicalRating: number;
  diplomaticRating: number;
  onAddReview?: () => void;
}

function EventCard({ 
  title, 
  type, 
  image, 
  location, 
  rating, 
  reviews, 
  technicalRating, 
  ethicalRating, 
  diplomaticRating,
  onAddReview
}: EventCardProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  return (
    <>
      <Card className="overflow-hidden border-border/30 bg-card/80 backdrop-blur-sm">
        <div className="relative h-48 bg-muted">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Oficial
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="text-sm text-primary mb-1">{type}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {location}
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center gap-2">
            <div className="text-yellow-400">⭐</div>
            <div className="font-semibold">{rating}</div>
            <div className="text-muted-foreground text-sm">({reviews})</div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="m9 9-2 2 2 2"></path><path d="m13 13 2-2-2-2"></path><circle cx="12" cy="12" r="10"></circle></svg>
                <span className="text-sm">Técnica</span>
              </div>
              <div className="flex text-yellow-400">
                {"★".repeat(technicalRating)}{"☆".repeat(5-technicalRating)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path><circle cx="16.5" cy="7.5" r=".5"></circle></svg>
                <span className="text-sm">Ética</span>
              </div>
              <div className="flex text-yellow-400">
                {"★".repeat(ethicalRating)}{"☆".repeat(5-ethicalRating)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1z"></path></svg>
                <span className="text-sm">Diplomacia</span>
              </div>
              <div className="flex text-yellow-400">
                {"★".repeat(diplomaticRating)}{"☆".repeat(5-diplomaticRating)}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowDetailsDialog(true)}
          >
            Ver Avaliações
          </Button>
        </CardFooter>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{location}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="text-yellow-400 text-xl">⭐</div>
              <div className="font-semibold text-lg">{rating}</div>
              <div className="text-muted-foreground">({reviews} avaliações)</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="m9 9-2 2 2 2"></path><path d="m13 13 2-2-2-2"></path><circle cx="12" cy="12" r="10"></circle></svg>
                  <span>Técnica</span>
                </div>
                <div className="flex text-yellow-400 text-lg">
                  {"★".repeat(technicalRating)}{"☆".repeat(5-technicalRating)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path><circle cx="16.5" cy="7.5" r=".5"></circle></svg>
                  <span>Ética</span>
                </div>
                <div className="flex text-yellow-400 text-lg">
                  {"★".repeat(ethicalRating)}{"☆".repeat(5-ethicalRating)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1z"></path></svg>
                  <span>Diplomacia</span>
                </div>
                <div className="flex text-yellow-400 text-lg">
                  {"★".repeat(diplomaticRating)}{"☆".repeat(5-diplomaticRating)}
                </div>
              </div>
            </div>
            
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">Ainda não há avaliações para este evento.</p>
              <Button 
                onClick={onAddReview}
                className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
              >
                Seja o primeiro a avaliar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface SupplierCardProps {
  title: string;
  type: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  onAddReview?: () => void;
}

function SupplierCard({ title, type, image, location, rating, reviews, onAddReview }: SupplierCardProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  return (
    <>
      <Card className="overflow-hidden border-border/30 bg-card/80 backdrop-blur-sm">
        <div className="relative h-48 bg-muted">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <CardHeader className="pb-2">
          <div className="text-sm text-primary mb-1">{type}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {location}
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center gap-2">
            <div className="text-yellow-400">⭐</div>
            <div className="font-semibold">{rating}</div>
            <div className="text-muted-foreground text-sm">({reviews})</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowDetailsDialog(true)}
          >
            Ver Avaliações
          </Button>
        </CardFooter>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{location} - {type}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="text-yellow-400 text-xl">⭐</div>
              <div className="font-semibold text-lg">{rating}</div>
              <div className="text-muted-foreground">({reviews} avaliações)</div>
            </div>
            
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">Ainda não há avaliações para este fornecedor.</p>
              <Button 
                onClick={onAddReview}
                className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
              >
                Seja o primeiro a avaliar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
