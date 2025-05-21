
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

type QueryOptions<T> = {
  table: string;
  columns?: string;
  filters?: {
    column: string;
    operator: string;
    value: any;
  }[];
  order?: {
    column: string;
    ascending?: boolean;
  };
  limit?: number;
  rangeFrom?: number;
  rangeTo?: number;
};

export function useSupabaseQuery<T>(options: QueryOptions<T>) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let query = supabase
        .from(options.table)
        .select(options.columns || '*', { count: 'exact' });

      if (options.filters && options.filters.length > 0) {
        options.filters.forEach(filter => {
          if (filter.operator === 'eq') {
            query = query.eq(filter.column, filter.value);
          } else if (filter.operator === 'neq') {
            query = query.neq(filter.column, filter.value);
          } else if (filter.operator === 'gt') {
            query = query.gt(filter.column, filter.value);
          } else if (filter.operator === 'lt') {
            query = query.lt(filter.column, filter.value);
          } else if (filter.operator === 'gte') {
            query = query.gte(filter.column, filter.value);
          } else if (filter.operator === 'lte') {
            query = query.lte(filter.column, filter.value);
          } else if (filter.operator === 'like') {
            query = query.like(filter.column, `%${filter.value}%`);
          } else if (filter.operator === 'ilike') {
            query = query.ilike(filter.column, `%${filter.value}%`);
          } else if (filter.operator === 'in') {
            query = query.in(filter.column, filter.value);
          }
        });
      }

      if (options.order) {
        query = query.order(options.order.column, {
          ascending: options.order.ascending ?? true
        });
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.rangeFrom !== undefined && options.rangeTo !== undefined) {
        query = query.range(options.rangeFrom, options.rangeTo);
      }

      const { data, error, count: resultCount } = await query;

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setData(data as T[]);
      setCount(resultCount || null);
      setLoading(false);
    }

    fetchData();
  }, [
    options.table,
    options.columns,
    options.limit,
    options.rangeFrom,
    options.rangeTo,
    // Note: objects are passed by reference, so we need to stringify them for the dependency array
    JSON.stringify(options.filters),
    JSON.stringify(options.order)
  ]);

  return { data, loading, error, count };
}

export default useSupabaseQuery;
