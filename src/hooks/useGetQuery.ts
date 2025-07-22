// useQuery.ts
import {
  useQuery as useReactQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const useGetQuery = <TData = unknown>(
  key: unknown[],
  service: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) => {
  const { enabled = true, ...restOptions } = options || {};

  return useReactQuery<TData>({
    queryKey: key,
    queryFn: async () => {
      try {
        return await service();
      } catch (error) {
        if ((error as AxiosError).isAxiosError) {
          const axiosError = error as AxiosError;
          throw axiosError.response?.data ?? error;
        }
        throw error;
      }
    },
    enabled,
    ...restOptions,
  });
};
