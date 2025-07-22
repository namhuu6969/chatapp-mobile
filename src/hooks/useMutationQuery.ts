import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useToast } from './useToast';

interface MutationParams {
  service: () => Promise<any>;
  invalidateKeys?: any[] | any[][];
  onSuccess?: (data: any, variables: any, context: any) => void; // thêm ở đây
  onError?: (data: any, variables: any, context: any) => void; // thêm ở đây
}
type UseQueryMutationOptions<TData> = Omit<
  UseMutationOptions<TData, unknown, MutationParams>,
  'mutationFn'
>;

export const useMutationQuery = <TData = unknown>(
  options?: UseQueryMutationOptions<TData>
) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation<TData, unknown, MutationParams>({
    mutationFn: async ({ service }) => {
      const response = await service();
      return response;
    },
    onSuccess: (data, variables, context) => {
      const keys = variables?.invalidateKeys;

      if (keys && keys.length > 0) {
        keys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          });
        });
      }
      if (variables?.onSuccess) {
        variables.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (variables?.onError) {
        const axiosError = error as AxiosError;
        const errorReturn = axiosError?.response;
        const errorStatus = errorReturn?.status;
        if (errorStatus === 403) {
          toast.showError('You do not have permission to do this action');
          return;
        }
        if (errorStatus === 401) {
          toast.showError('Please sign in');
          window.location.href = '/auth/login';
          return;
        }
        variables.onError(errorReturn?.data, variables, context);
      }
    },
    ...options,
  });
};
