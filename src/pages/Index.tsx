
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/MainLayout";
import AdCarousel from "@/components/AdCarousel";
import { Calendar, MapPin, Users, Zap, BookOpen, Crown } from "lucide-react";

export default function Index() {
  return (
    <MainLayout>
      {/* Advertisement Carousel */}
      <AdCarousel />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-piercing-purple/10 via-transparent to-piercing-pink/10" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              A plataforma completa para o universo do{" "}
              <span className="text-gradient">Body Piercing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conecte-se com eventos, fornecedores confiáveis, piercers qualificados e recursos educacionais em uma única plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/eventos">
                <Button size="lg" className="bg-gradient-to-r from-piercing-purple to-piercing-pink">
                  Explorar Eventos
                </Button>
              </Link>
              <Link to="/fornecedores">
                <Button size="lg" variant="outline">
                  Ver Fornecedores
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tudo que você precisa em um só lugar</h2>
            <p className="text-xl text-muted-foreground">
              Descubra as funcionalidades que vão revolucionar sua experiência no body piercing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Calendar className="w-12 h-12 text-piercing-purple mb-4" />
                <CardTitle>Eventos</CardTitle>
                <CardDescription>
                  Encontre convenções, workshops e encontros de body piercing em todo o Brasil
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="w-12 h-12 text-piercing-pink mb-4" />
                <CardTitle>Fornecedores</CardTitle>
                <CardDescription>
                  Conecte-se com fornecedores confiáveis de joias, equipamentos e materiais
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="w-12 h-12 text-piercing-purple mb-4" />
                <CardTitle>Score Piercing</CardTitle>
                <CardDescription>
                  Sistema de avaliações técnicas, diplomáticas e éticas da comunidade
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <MapPin className="w-12 h-12 text-piercing-pink mb-4" />
                <CardTitle>Catálogo de Piercers</CardTitle>
                <CardDescription>
                  Encontre piercers qualificados na sua cidade ou descubra profissionais em outras regiões
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-piercing-purple mb-4" />
                <CardTitle>Aprendizado</CardTitle>
                <CardDescription>
                  Acesse ebooks, cursos e materiais educacionais para aprimorar suas técnicas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Crown className="w-12 h-12 text-piercing-pink mb-4" />
                <CardTitle>Planos Premium</CardTitle>
                <CardDescription>
                  Desbloqueie funcionalidades avançadas para organizadores e fornecedores
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-piercing-purple/5 to-piercing-pink/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Faça parte da maior comunidade de body piercing do Brasil
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Cadastre-se gratuitamente e tenha acesso a todas as funcionalidades básicas da plataforma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cadastrar">
                <Button size="lg" className="bg-gradient-to-r from-piercing-purple to-piercing-pink">
                  Criar Conta Gratuita
                </Button>
              </Link>
              <Link to="/planos">
                <Button size="lg" variant="outline">
                  Ver Planos Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
