
import MainLayout from "@/components/MainLayout";
import PricingCard from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PlansPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="bg-muted/5 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-4">Nossos Planos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Escolha o plano ideal para suas necessidades na comunidade de body piercing.
          </p>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="access" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="access">Acessar a Plataforma</TabsTrigger>
                <TabsTrigger value="publish">Publicar Eventos</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="access" className="space-y-8">
              <div className="max-w-xl mx-auto glass-card rounded-2xl p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">Acesso Premium</h3>
                    <p className="text-muted-foreground">Acesso completo à plataforma</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">R$5,90<span className="text-sm text-muted-foreground">/mês</span></p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary mr-2" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>7 dias gratuitos ao se cadastrar</span>
                  </div>
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary mr-2" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>Acesso a todos os eventos e detalhes</span>
                  </div>
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary mr-2" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>Avaliações e comentários ilimitados</span>
                  </div>
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary mr-2" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>Notificações de eventos na sua região</span>
                  </div>
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary mr-2" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>Acesso às informações de logística e hospedagem</span>
                  </div>
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary mr-2" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>Salvar eventos favoritos</span>
                  </div>
                </div>

                <Button className="mt-8 w-full bg-gradient-to-r from-piercing-purple to-piercing-blue button-glow">
                  Começar 7 dias grátis
                </Button>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Cancele a qualquer momento. Após o período gratuito, será cobrada a assinatura mensal.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="publish">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                <PricingCard
                  title="Mensal"
                  price={29.90}
                  period="mês"
                  description="Ideal para profissionais que querem começar a divulgar seus eventos"
                  features={[
                    "1 evento ativo por mês",
                    "Todos os benefícios do acesso premium",
                    "Moderação e aprovação rápida",
                    "Métricas de visualizações e cliques"
                  ]}
                />
                
                <PricingCard
                  title="Semestral"
                  price={139.90}
                  period="6 meses"
                  description="Para quem precisa divulgar eventos com frequência"
                  features={[
                    "Até 6 eventos em 6 meses",
                    "Economize 22% em relação ao plano mensal",
                    "Todos os benefícios do plano mensal",
                    "Suporte prioritário"
                  ]}
                  highlight={true}
                />
                
                <PricingCard
                  title="Anual"
                  price={199.90}
                  period="ano"
                  description="Para organizadores frequentes de eventos"
                  features={[
                    "Eventos ilimitados por 12 meses",
                    "Destaque na agenda principal",
                    "Maior economia anual (mais de 40%)",
                    "Relatórios avançados de performance"
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/5">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-2">O que acontece após os 7 dias gratuitos?</h3>
              <p className="text-muted-foreground">
                Após o período de teste gratuito de 7 dias, será cobrada automaticamente a assinatura mensal de R$5,90, 
                a menos que você cancele antes do término do período.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-muted-foreground">
                Sim, você pode cancelar sua assinatura a qualquer momento através do seu perfil. 
                Após o cancelamento, você continuará com acesso até o final do período pago.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-2">Como funciona a publicação de eventos?</h3>
              <p className="text-muted-foreground">
                Após assinar um dos planos de publicação, você terá acesso a um formulário simples para submeter seu evento. 
                Nosso time fará uma moderação rápida e, uma vez aprovado, seu evento aparecerá na agenda principal.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-2">Posso mudar de plano depois?</h3>
              <p className="text-muted-foreground">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                As mudanças entram em vigor no próximo ciclo de cobrança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-background to-background -z-10" />
        
        <div className="container px-4 md:px-6">
          <div className="glass-card p-8 md:p-12 rounded-3xl max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cadastre-se hoje e aproveite 7 dias de acesso gratuito à plataforma completa.
              Sem compromisso, cancele quando quiser.
            </p>
            <Button className="button-glow bg-gradient-to-r from-piercing-purple to-piercing-blue text-white px-8 py-6 text-lg">
              Criar Conta Grátis
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
