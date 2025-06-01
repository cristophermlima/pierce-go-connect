
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { user, profile } = useAuth();

  // If user is logged in, redirect to dashboard-style content
  if (user) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Bem-vindo de volta, {profile?.full_name || "Usuário"}!
              </h1>
              <p className="text-xl text-muted-foreground">
                Acesse suas funcionalidades favoritas abaixo
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path></svg>
                    Avaliações
                  </CardTitle>
                  <CardDescription>
                    Avalie eventos e fornecedores da comunidade
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/avaliacoes">
                    <Button className="w-full">Acessar Avaliações</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                    Eventos
                  </CardTitle>
                  <CardDescription>
                    Explore eventos de body piercing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/eventos">
                    <Button className="w-full">Ver Eventos</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Fornecedores
                  </CardTitle>
                  <CardDescription>
                    Encontre os melhores fornecedores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/fornecedores">
                    <Button className="w-full">Ver Fornecedores</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                    Minha Agenda
                  </CardTitle>
                  <CardDescription>
                    Gerencie seus compromissos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/agenda">
                    <Button className="w-full">Ver Agenda</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    Dashboard
                  </CardTitle>
                  <CardDescription>
                    Visão geral das suas atividades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard">
                    <Button className="w-full">Acessar Dashboard</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
                    Cadastrar
                  </CardTitle>
                  <CardDescription>
                    Adicione eventos ou estabelecimentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/cadastrar">
                    <Button className="w-full">Cadastrar Conteúdo</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // If user is not logged in, show the original landing page
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-piercing-purple/20 via-background to-piercing-pink/20" />
          <div className="container relative px-4 lg:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-r from-piercing-purple to-piercing-pink bg-clip-text text-transparent">
                    PiercerGo
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl">
                  A plataforma completa para profissionais e entusiastas de body piercing. 
                  Avalie, descubra e conecte-se com a comunidade.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-piercing-purple to-piercing-pink button-glow">
                    Começar Agora
                  </Button>
                </Link>
                <Link to="/eventos">
                  <Button variant="outline" size="lg">
                    Explorar Eventos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Tudo que você precisa em um só lugar</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Descubra as funcionalidades que vão revolucionar sua experiência no mundo do body piercing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-piercing-purple to-piercing-pink rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <CardTitle>Avaliações Especializadas</CardTitle>
                  <CardDescription>
                    Sistema único de avaliação técnica, ética e diplomática para eventos e fornecedores
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-piercing-purple to-piercing-pink rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                  </div>
                  <CardTitle>Eventos e Agenda</CardTitle>
                  <CardDescription>
                    Descubra eventos próximos e organize sua agenda profissional de forma inteligente
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-piercing-purple to-piercing-pink rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <CardTitle>Rede de Fornecedores</CardTitle>
                  <CardDescription>
                    Conecte-se com os melhores fornecedores de joias, equipamentos e materiais
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 lg:px-6">
            <div className="text-center space-y-8">
              <h2 className="text-3xl font-bold">Pronto para começar?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Junte-se à comunidade PiercerGo e eleve seu nível profissional
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-piercing-purple to-piercing-pink button-glow">
                    Criar Conta Gratuita
                  </Button>
                </Link>
                <Link to="/avaliacoes">
                  <Button variant="outline" size="lg">
                    Ver Avaliações
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
