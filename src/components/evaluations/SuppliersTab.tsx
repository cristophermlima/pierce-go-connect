
import SupplierCard from "./SupplierCard";

interface SuppliersTabProps {
  onAddReview: (type: "supplier") => void;
}

export function SuppliersTab({ onAddReview }: SuppliersTabProps) {
  const suppliers = [
    {
      title: "Revolution Piercing",
      type: "Joias e Acessórios",
      image: "/placeholder.svg",
      location: "Nacional",
      rating: 4.8,
      reviews: 56
    },
    {
      title: "Angel Piercing",
      type: "Joias e Acessórios",
      image: "/placeholder.svg",
      location: "São Paulo, SP",
      rating: 4.6,
      reviews: 42
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {suppliers.map((supplier, index) => (
        <SupplierCard 
          key={index}
          title={supplier.title}
          type={supplier.type}
          image={supplier.image}
          location={supplier.location}
          rating={supplier.rating}
          reviews={supplier.reviews}
          onAddReview={() => onAddReview("supplier")}
        />
      ))}
    </div>
  );
}

export default SuppliersTab;
