
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TravelPage() {
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-3">Planejamento de Viagem</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encontre as melhores opções de hospedagem, transporte, alimentação e entretenimento para os eventos de body piercing.
            </p>
          </div>

          <Card className="glass-card mb-10">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Planeje sua viagem para o próximo evento</h3>
              
              <Tabs defaultValue="hospedagem">
                <TabsList className="mb-6">
                  <TabsTrigger value="hospedagem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"></path><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path><path d="M12 4v16"></path></svg>
                    Hospedagem
                  </TabsTrigger>
                  <TabsTrigger value="voos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
                    Voos
                  </TabsTrigger>
                  <TabsTrigger value="transporte">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="5" cy="19" r="2"></circle><circle cx="19" cy="19" r="2"></circle><path d="M5 19h14"></path><path d="m9 9-4 4h10l-4-4"></path><path d="M15.5 9.5 12 4 8.5 9.5"></path></svg>
                    Transporte
                  </TabsTrigger>
                  <TabsTrigger value="alimentacao">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path><line x1="6" x2="18" y1="17" y2="17"></line></svg>
                    Alimentação
                  </TabsTrigger>
                  <TabsTrigger value="passeios">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path><path d="M12 13v8"></path><path d="M12 3v3"></path></svg>
                    Passeios e Cultura
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="hospedagem" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Evento</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um evento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gep">GEP - Grupo de Estudos em Piercing</SelectItem>
                          <SelectItem value="expo">Expo Piercing Brasil 2025</SelectItem>
                          <SelectItem value="meeting">6º Meeting Anual para Piercers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Check-in</label>
                      <Input type="date" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Check-out</label>
                      <Input type="date" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Hóspedes</label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue placeholder="Número de hóspedes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hóspede</SelectItem>
                          <SelectItem value="2">2 hóspedes</SelectItem>
                          <SelectItem value="3">3 hóspedes</SelectItem>
                          <SelectItem value="4">4 hóspedes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button className="bg-gradient-to-r from-piercing-purple to-piercing-pink px-8">Buscar Hospedagem</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="voos" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Origem</label>
                      <Input placeholder="Cidade de origem" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Destino</label>
                      <Input placeholder="Cidade de destino" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Data de ida</label>
                      <Input type="date" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Data de volta</label>
                      <Input type="date" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Passageiros</label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="Número de passageiros" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 passageiro</SelectItem>
                          <SelectItem value="2">2 passageiros</SelectItem>
                          <SelectItem value="3">3 passageiros</SelectItem>
                          <SelectItem value="4">4 passageiros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button className="bg-gradient-to-r from-piercing-purple to-piercing-pink px-8">Buscar Voos</Button>
                  </div>
                </TabsContent>
                
                {/* Outros conteúdos para os outros tabs seriam similares */}
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HotelCard 
              name="Hotel Piercing Premium"
              image="/placeholder.svg"
              distance="300m do local do evento"
              rating={4.8}
              reviews={120}
              discount="15% de desconto para membros PierceGo"
              price={250}
            />
            
            <HotelCard 
              name="Hostel Central"
              image="/placeholder.svg"
              distance="1km do local do evento"
              rating={4.3}
              reviews={85}
              price={120}
            />
            
            <HotelCard 
              name="Apartamento Airbnb"
              image="/placeholder.svg"
              distance="800m do local do evento"
              rating={4.7}
              reviews={64}
              price={165}
            />
            
            <HotelCard 
              name="Hotel Econômico"
              image="/placeholder.svg"
              distance="1.5km do local do evento"
              rating={4.2}
              reviews={46}
              price={105}
            />
          </div>
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Promoções e Parcerias</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-muted">
                  <CardContent className="flex items-center justify-center p-12">
                    <img src="/placeholder.svg" alt="Parceiro" className="w-24 h-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

interface HotelCardProps {
  name: string;
  image: string;
  distance: string;
  rating: number;
  reviews: number;
  discount?: string;
  price: number;
}

function HotelCard({ name, image, distance, rating, reviews, discount, price }: HotelCardProps) {
  return (
    <Card className="overflow-hidden border-border/30 bg-card/80 backdrop-blur-sm">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="col-span-2 p-4">
          <CardTitle className="text-lg">{name}</CardTitle>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {distance}
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="text-yellow-400">⭐</div>
            <div className="font-semibold">{rating}</div>
            <div className="text-muted-foreground text-sm">({reviews} avaliações)</div>
          </div>
          
          {discount && (
            <div className="mt-2 text-sm text-primary font-medium">
              {discount}
            </div>
          )}
          
          <div className="mt-3 flex justify-between items-center">
            <div>
              <span className="font-bold">BRL {price}</span> / noite
            </div>
            <Button variant="outline" size="sm">Ver Detalhes</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
