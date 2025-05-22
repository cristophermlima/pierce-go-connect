
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

// Generic type for query response
type QueryResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};

// Valid table names for type safety
type TableName = 'events' | 'suppliers' | 'profiles' | 'reviews' | 'schedules' | 'travel_plans';

// Hook to fetch data from Supabase
export function useSupabaseQuery<T = any>(
  key: string | (string | number)[],
  tableName: TableName,
  queryFn: () => Promise<QueryResponse<T>>,
  options?: UseQueryOptions<T | null, PostgrestError, T>
) {
  const queryKey = Array.isArray(key) ? key : [key];

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data, error } = await queryFn();
      
      if (error) {
        console.error(`Error fetching from ${tableName}:`, error);
        throw error;
      }
      
      return data;
    },
    ...options
  });
}

// Helper function to fetch data by ID
export function useSupabaseQueryById<T = any>(
  tableName: TableName,
  id: string | undefined,
  options?: UseQueryOptions<T | null, PostgrestError, T>
) {
  return useSupabaseQuery<T>(
    [tableName, id], 
    tableName,
    async () => {
      if (!id) return { data: null, error: null };
      
      return await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
    },
    {
      enabled: !!id,
      ...options
    }
  );
}
