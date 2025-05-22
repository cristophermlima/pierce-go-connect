
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Review } from '@/components/reviews/ReviewCard';
import { toast } from '@/components/ui/sonner';

interface UseSupabaseReviewsParams {
  type: 'event' | 'supplier';
  entityId?: string;
}

export function useSupabaseReviews({ type, entityId }: UseSupabaseReviewsParams) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError(null);
      
      try {
        let query = supabase.from('reviews').select(`
          id,
          title,
          comment,
          overall_rating,
          environment_rating,
          organization_rating,
          safety_rating,
          quality_rating,
          images,
          created_at,
          user_id,
          profiles(full_name, avatar_url)
        `);

        // Add filter based on type
        if (entityId) {
          if (type === 'event') {
            query = query.eq('event_id', entityId);
          } else {
            query = query.eq('supplier_id', entityId);
          }
        } else if (type === 'event') {
          query = query.not('event_id', 'is', null);
        } else {
          query = query.not('supplier_id', 'is', null);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;

        if (data) {
          const formattedReviews: Review[] = data.map((item: any) => ({
            id: item.id,
            author: item.profiles?.full_name || 'Usuário anônimo',
            authorAvatar: item.profiles?.avatar_url,
            date: new Date(item.created_at).toLocaleDateString('pt-BR'),
            rating: item.overall_rating,
            comment: item.comment,
            technicalRating: type === 'event' ? item.environment_rating : undefined,
            ethicalRating: type === 'event' ? item.safety_rating : undefined,
            diplomaticRating: type === 'event' ? item.organization_rating : undefined,
            organizationRating: item.organization_rating,
            locationRating: undefined,
            valueRating: type === 'supplier' ? item.quality_rating : undefined,
            helpful: 0,
            images: item.images || [],
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
    }

    fetchReviews();
  }, [type, entityId]);

  return { reviews, loading, error };
}
