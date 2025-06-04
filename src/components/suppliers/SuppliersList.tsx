
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SupplierCard } from "./SupplierCard";

interface Supplier {
  name: string;
  type: string;
  location: string;
  rating: string;
  reviews: string;
  image: string;
}

interface SuppliersListProps {
  suppliers: Supplier[];
  onEvaluate: (supplierName: string) => void;
}

export function SuppliersList({ suppliers, onEvaluate }: SuppliersListProps) {
  return (
    <section className="py-8 lg:py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-6 lg:mb-8">
          <h2 className="text-xl lg:text-2xl font-bold mb-2">Fornecedores em Destaque</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Estes são fornecedores oficiais que passaram por aprovação e são patrocinados. Para adicionar sua loja ao diretório oficial clique em "Adicionar Loja" e escolha o plano adequado.
          </p>
        </div>

        {suppliers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {suppliers.map((supplier, i) => (
              <SupplierCard 
                key={i}
                name={supplier.name}
                type={supplier.type}
                location={supplier.location}
                rating={supplier.rating}
                reviews={supplier.reviews}
                image={supplier.image}
                onEvaluate={() => onEvaluate(supplier.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 lg:py-16">
            <h3 className="text-xl lg:text-2xl font-medium mb-2">Nenhum fornecedor encontrado</h3>
            <p className="text-muted-foreground mb-4 lg:mb-6">
              Tente ajustar seus filtros ou busca para ver mais resultados.
            </p>
            <Link to="/cadastrar">
              <Button className="bg-gradient-to-r from-piercing-purple to-piercing-pink">
                Adicionar Primeira Loja
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
