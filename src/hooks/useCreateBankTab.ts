import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBankTab } from '@/api/createBankTab';

export function useCreateBankTab() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBankTab,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankTabs'] });
    },
    onError: (error) => {
      console.error('Error creating bank tab:', error);
    },
  });
}
