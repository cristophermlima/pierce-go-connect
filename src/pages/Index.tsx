
import MainLayout from "@/components/MainLayout";
import EventCard from "@/components/EventCard";
import PricingCard from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for featured events
const featuredEvents = [
  {
    id: "1",
    title: "Festival Tattoo Brasil",
    location: "São Paulo, SP",
    date: new Date("2025-06-15"),
    image: "https://images.unsplash.com/photo-1622298760148-0f9c81f4a101?q=80&w=2070&auto=format&fit=crop",
    category: "Festival"
  },
  {
    id: "2",
    title: "Workshop Técnicas Avançadas",
    location: "Rio de Janeiro, RJ",
    date: new Date("2025-07-22"),
    image: "https://images.unsplash.com/photo-1612371636004-04df25c9f51d?q=80&w=2070&auto=format&fit=crop",
    category: "Workshop"
  },
  {
    id: "3",
    title: "Convenção Piercing Art",
    location: "Belo Horizonte, MG",
    date: new Date("2025-08-10"),
    image: "https://images.unsplash.com/photo-1581743525371-1d03b65cebb2?q=80&w=2071&auto=format&fit=crop",
    category: "Convenção"
  }
];

export default function Index() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-radial from-piercing-purple/20 via-background to-background -z-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1543297031-d102cd432d54?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay -z-20" />
        
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Conecte-se com a comunidade de <span className="text-gradient">Body Piercing</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[600px] mb-8">
              Descubra eventos, compartilhe avaliações e eleve sua jornada no universo do body piercing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/eventos">
                <Button className="button-glow bg-gradient-to-r from-piercing-purple to-piercing-blue text-white px-8 py-6 text-lg">
                  Explorar Eventos
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="outline" className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Eventos em Destaque</h2>
            <Link to="/eventos" className="text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/5">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Tudo que você precisa em um só lugar</h2>
            <p className="text-muted-foreground">
              Centralizamos todas as informações para que você foque no que realmente importa: a arte do body piercing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Agenda de Eventos</h3>
              <p className="text-muted-foreground">
                Encontre os principais eventos do setor, workshops e convenções em todo o Brasil.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"></path><path d="M12 12v.01"></path><path d="M11 17v.01"></path><path d="M7 14v.01"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Avaliações e Reviews</h3>
              <p className="text-muted-foreground">
                Compartilhe suas experiências e avalie eventos e fornecedores de produtos.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m14.5 9-5 5"></path><path d="m9.5 9 5 5"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Logística Simplificada</h3>
              <p className="text-muted-foreground">
                Encontre hospedagem, transporte e informações sobre deslocamento para eventos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Escolha seu plano</h2>
            <p className="text-muted-foreground">
              Temos opções para quem quer participar da comunidade e para profissionais que desejam divulgar seus eventos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
            <PricingCard
              title="Acesso Básico"
              price={5.90}
              period="mês"
              description="Para entusiastas que querem ficar por dentro de todos os eventos"
              features={[
                "Acesso a todos os eventos",
                "Avaliações e reviews",
                "Notificações personalizadas",
                "7 dias grátis no cadastro"
              ]}
            />
            
            <PricingCard
              title="Publicador Mensal"
              price={29.90}
              period="mês"
              description="Para profissionais que querem divulgar seus eventos"
              features={[
                "1 evento ativo por mês",
                "Todos os benefícios do Acesso Básico",
                "Dashboard simples de métricas",
                "Suporte prioritário"
              ]}
              highlight={true}
            />
            
            <PricingCard
              title="Publicador Anual"
              price={199.90}
              period="ano"
              description="Para organizadores frequentes de eventos"
              features={[
                "Eventos ilimitados",
                "Destaque na agenda principal",
                "Todos os benefícios anteriores",
                "Relatórios avançados de performance"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-background to-background -z-10" />
        
        <div className="container px-4 md:px-6">
          <div className="glass-card p-8 md:p-12 rounded-3xl max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para se conectar com a comunidade?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de profissionais e entusiastas de body piercing. 
              Cadastre-se agora e ganhe 7 dias de acesso gratuito à plataforma completa.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/cadastro">
                <Button className="button-glow bg-gradient-to-r from-piercing-purple to-piercing-blue text-white px-8 py-6 text-lg">
                  Criar Conta Grátis
                </Button>
              </Link>
              <Link to="/eventos">
                <Button variant="outline" className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg">
                  Explorar Primeiro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
