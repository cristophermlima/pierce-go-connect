
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function SuppliersHeader() {
  return (
    <section className="bg-gradient-to-r from-piercing-purple/10 to-piercing-pink/10 py-8 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Fornecedores</h1>
          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 lg:mb-8">
            Encontre os melhores fornecedores de joias, equipamentos e materiais para body piercing.
          </p>
          
          {/* Notice banner */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-4xl mx-auto mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3 text-left">
                <div className="bg-red-500/20 rounded-full p-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-red-900 dark:text-red-100 mb-1">Destaque sua loja no diretório oficial</h3>
                  <p className="text-sm text-red-700 dark:text-red-200">
                    Aumente a visibilidade da sua loja e atraia mais clientes. Lojas no diretório oficial recebem até 5x mais visualizações.
                  </p>
                </div>
              </div>
              <Link to="/cadastrar" className="flex-shrink-0">
                <Button className="bg-red-500 hover:bg-red-600 text-white w-full lg:w-auto">
                  Anunciar minha loja
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
