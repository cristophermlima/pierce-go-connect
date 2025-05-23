
import React, { useEffect, useState } from "react";
import SupplierCard from "./SupplierCard";
import { supabase } from '@/integrations/supabase/client';

interface Supplier {
  id: string;
  title: string;
  type: string;
  image: string;
  location: string;
  rating?: number;
  reviews?: number;
}

interface SuppliersTabProps {
  onAddReview: (type: "supplier") => void;
  searchQuery?: string;
  refreshKey?: number; // Add refreshKey prop
}

export function SuppliersTab({ onAddReview, searchQuery = "", refreshKey = 0 }: SuppliersTabProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        setLoading(true);
        
        // Fetch suppliers from Supabase
        let query = supabase.from('suppliers').select('*');
        
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%, type.ilike.%${searchQuery}%, location.ilike.%${searchQuery}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error("Error fetching suppliers:", error);
          return;
        }

        // For each supplier, fetch their reviews to calculate average rating
        const suppliersWithRatings = await Promise.all(
          data.map(async (supplier: Supplier) => {
            const { data: reviews, error: reviewsError } = await supabase
              .from('reviews')
              .select('overall_rating')
              .eq('supplier_id', supplier.id);

            if (reviewsError) {
              console.error("Error fetching reviews:", reviewsError);
              return {
                ...supplier,
                rating: 0,
                reviews: 0,
                image: supplier.image || "/placeholder.svg"
              };
            }

            const rating = reviews.length > 0 
              ? reviews.reduce((sum: number, review: any) => sum + review.overall_rating, 0) / reviews.length
              : 0;

            return {
              ...supplier,
              rating: parseFloat(rating.toFixed(1)),
              reviews: reviews.length,
              image: supplier.image || "/placeholder.svg"
            };
          })
        );

        setSuppliers(suppliersWithRatings);
      } catch (err) {
        console.error("Failed to fetch suppliers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSuppliers();
  }, [searchQuery, refreshKey]); // Add refreshKey as dependency

  // Mock suppliers as a fallback
  const mockSuppliers = [
    {
      id: "mock-1",
      title: "Revolution Piercing",
      type: "Joias e Acessórios",
      image: "/placeholder.svg",
      location: "Nacional",
      rating: 4.8,
      reviews: 56
    },
    {
      id: "mock-2",
      title: "Angel Piercing",
      type: "Joias e Acessórios",
      image: "/placeholder.svg",
      location: "São Paulo, SP",
      rating: 4.6,
      reviews: 42
    }
  ];

  const displaySuppliers = suppliers.length > 0 ? suppliers : mockSuppliers;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading ? (
        <div className="col-span-2 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : displaySuppliers.length > 0 ? (
        displaySuppliers.map((supplier) => (
          <SupplierCard 
            key={supplier.id}
            id={supplier.id}
            title={supplier.title}
            type={supplier.type}
            image={supplier.image}
            location={supplier.location}
            rating={supplier.rating || 0}
            reviews={supplier.reviews || 0}
            onAddReview={() => onAddReview("supplier")}
            refreshKey={refreshKey}
          />
        ))
      ) : (
        <div className="col-span-2 text-center py-12">
          <p className="text-muted-foreground">Nenhum fornecedor encontrado.</p>
        </div>
      )}
    </div>
  );
}

export default SuppliersTab;
