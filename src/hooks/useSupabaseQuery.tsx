
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

// Tipo genérico para a resposta da consulta
type QueryResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};

// Hook para buscar dados do Supabase
export function useSupabaseQuery<T = any>(
  key: string | (string | number)[],
  tableName: string,
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

// Função auxiliar para buscar dados por ID
export function useSupabaseQueryById<T = any>(
  tableName: string,
  id: string | number | undefined,
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
