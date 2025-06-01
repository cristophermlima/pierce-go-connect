
import React from "react";
import ReviewsList from "@/components/ReviewsList";

interface SuppliersTabProps {
  onAddReview: (type: "supplier") => void;
  searchQuery?: string;
  refreshKey?: number;
}

export function SuppliersTab({ onAddReview, searchQuery = "", refreshKey = 0 }: SuppliersTabProps) {
  return (
    <div className="space-y-6">
      <ReviewsList 
        type="supplier" 
        refreshKey={refreshKey}
        onAddReview={() => onAddReview("supplier")}
      />
    </div>
  );
}

export default SuppliersTab;
