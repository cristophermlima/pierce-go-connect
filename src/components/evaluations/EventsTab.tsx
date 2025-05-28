
import React from "react";
import ReviewsList from "@/components/ReviewsList";

interface EventsTabProps {
  onAddReview: (type: "event") => void;
  searchQuery?: string;
  refreshKey?: number;
}

export function EventsTab({ onAddReview, searchQuery = "", refreshKey = 0 }: EventsTabProps) {
  return (
    <div className="space-y-6">
      <ReviewsList 
        type="event" 
        refreshKey={refreshKey}
        onAddReview={() => onAddReview("event")}
      />
    </div>
  );
}

export default EventsTab;
