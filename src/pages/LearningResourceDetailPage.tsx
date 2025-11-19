import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Book, User, ExternalLink, Star } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type LearningResource = {
  id: string;
  title: string;
  description: string | null;
  content_type: string | null;
  author: string | null;
  url: string | null;
  created_at: string;
  updated_at: string;
};

export default function LearningResourceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState<LearningResource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('learning_resources')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setResource(data);
    } catch (error) {
      console.error('Error fetching resource:', error);
      toast.error("Erro ao carregar recurso");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="text-center">Carregando...</div>
        </div>
      </MainLayout>
    );
  }

  if (!resource) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Recurso não encontrado</p>
            <Button onClick={() => navigate('/aprender')}>Voltar para Aprendizado</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/aprender')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {resource.content_type && (
                    <Badge className="mb-3">{resource.content_type}</Badge>
                  )}
                  <CardTitle className="text-3xl mb-3">{resource.title}</CardTitle>
                  {resource.author && (
                    <div className="flex items-center text-muted-foreground mb-4">
                      <User className="w-4 h-4 mr-2" />
                      <span>por {resource.author}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {resource.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sobre o Curso</h3>
                  <p className="text-muted-foreground">{resource.description}</p>
                </div>
              )}

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">O que você vai aprender</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Técnicas profissionais de body piercing</li>
                  <li>✓ Anatomia e fisiologia aplicada</li>
                  <li>✓ Protocolos de segurança e assepsia</li>
                  <li>✓ Seleção adequada de joias e materiais</li>
                  <li>✓ Cicatrização e cuidados pós-perfuração</li>
                  <li>✓ Atendimento ao cliente e gestão de estúdio</li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Detalhes do Curso</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Formato</p>
                    <p className="font-medium">{resource.content_type || 'Curso Online'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Certificado</p>
                    <p className="font-medium">Sim, incluso</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Carga Horária</p>
                    <p className="font-medium">40 horas</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Acesso</p>
                    <p className="font-medium">Vitalício</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Avaliações</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-semibold">4.9</span>
                  <span className="text-muted-foreground">(127 avaliações)</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  "Excelente curso! Aprendi muito sobre técnicas profissionais e segurança." - Maria S.
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <Button className="flex-1 bg-gradient-to-r from-piercing-purple to-piercing-pink">
                  Adquirir Curso - R$ 497,00
                </Button>
                {resource.url && (
                  <Button variant="outline" onClick={() => window.open(resource.url!, '_blank')}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Saiba Mais
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
