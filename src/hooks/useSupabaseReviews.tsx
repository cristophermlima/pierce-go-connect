
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Review } from '@/components/reviews/ReviewCard';
import { toast } from '@/components/ui/sonner';

interface UseSupabaseReviewsParams {
  type: 'event' | 'supplier';
  entityId?: string;
  refreshKey?: number;
}

export function useSupabaseReviews({ type, entityId, refreshKey = 0 }: UseSupabaseReviewsParams) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching reviews for ${type} with ID ${entityId || 'all'}, refreshKey: ${refreshKey}`);
      
      let query = supabase.from('reviews').select(`
        id,
        comment,
        overall_rating,
        environment_rating,
        organization_rating,
        safety_rating,
        quality_rating,
        images,
        created_at,
        user_id,
        event_id,
        supplier_id,
        event_name,
        supplier_name
      `);

      // Add filter based on type
      if (entityId) {
        if (type === 'event') {
          query = query.eq('event_id', entityId);
        } else {
          query = query.eq('supplier_id', entityId);
        }
      } else if (type === 'event') {
        query = query.not('event_name', 'is', null);
      } else {
        query = query.not('supplier_name', 'is', null);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;

      if (data) {
        console.log(`Found ${data.length} reviews for ${type}`);
        
        const formattedReviews: Review[] = data.map((item: any) => ({
          id: item.id,
          author: 'Usuário anônimo',
          authorAvatar: undefined,
          date: new Date(item.created_at).toLocaleDateString('pt-BR'),
          rating: item.overall_rating,
          comment: item.comment,
          // Correct mapping for events: Técnica=environment, Ética=safety, Diplomacia=organization
          technicalRating: type === 'event' ? item.environment_rating : undefined,
          ethicalRating: type === 'event' ? item.safety_rating : undefined,
          diplomaticRating: type === 'event' ? item.organization_rating : undefined,
          organizationRating: type === 'supplier' ? item.organization_rating : undefined,
          locationRating: undefined,
          valueRating: type === 'supplier' ? item.quality_rating : undefined,
          helpful: 0,
          images: item.images || [],
          entityName: type === 'event' ? item.event_name : item.supplier_name, // Add entity name
        }));

        setReviews(formattedReviews);
      }
    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      setError(err);
      toast.error("Erro ao carregar avaliações");
    } finally {
      setLoading(false);
    }
  }, [type, entityId, refreshKey]);

  const refreshReviews = useCallback(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    console.log("useSupabaseReviews - refreshKey changed:", refreshKey);
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, loading, error, refreshReviews };
}
