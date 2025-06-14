
import MainLayout from "@/components/MainLayout";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FAQAssinaturasPage() {
  return (
    <MainLayout>
      <div className="container max-w-2xl py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Dúvidas Frequentes sobre Assinaturas</h1>
        <Accordion type="multiple" className="mb-10">
          <AccordionItem value="como-funciona">
            <AccordionTrigger>Como funciona a assinatura premium?</AccordionTrigger>
            <AccordionContent>
              Você adquire um plano (mensal, anual etc) e desbloqueia recursos avançados na plataforma enquanto houver assinatura ativa. O pagamento é processado de forma segura pelo Stripe.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cancelar">
            <AccordionTrigger>Posso cancelar a qualquer momento?</AccordionTrigger>
            <AccordionContent>
              Sim! O cancelamento pode ser feito no portal de gestão Stripe a qualquer momento, sem multa ou burocracia.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="meios-pagamento">
            <AccordionTrigger>Quais meios de pagamento são aceitos?</AccordionTrigger>
            <AccordionContent>
              Aceitamos cartões de crédito e outros métodos suportados pelo Stripe.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="trial">
            <AccordionTrigger>Tenho direito a um período trial/gratuito?</AccordionTrigger>
            <AccordionContent>
              Alguns planos elegíveis oferecem período gratuito inicial (verifique no card do plano). O trial é válido apenas na primeira assinatura.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="seguranca">
            <AccordionTrigger>Meu pagamento é seguro?</AccordionTrigger>
            <AccordionContent>
              Sim! Todas as transações são processadas pelo Stripe, referência mundial em pagamentos.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex justify-center">
          <Link to="/planos">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">Voltar para Planos</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
