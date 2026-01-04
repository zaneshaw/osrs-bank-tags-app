import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeBankTab } from '@/api/likeBankTab';
import type { BankTabResponse } from '@/types';

export function useLikeBankTab(tabId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeBankTab(tabId),
    onMutate: async () => {
      // 1. Cancel any outgoing refetches for both keys to prevent overwrites
      await queryClient.cancelQueries({ queryKey: ['bankTabs'] });
      await queryClient.cancelQueries({ queryKey: ['bankTabs', tabId] });

      // 2. Snapshot current state for rollback
      const previousList = queryClient.getQueryData<BankTabResponse[]>(['bankTabs']);
      const previousDetail = queryClient.getQueryData<BankTabResponse>(['bankTabs', tabId]);

      // 3. Optimistically update the list cache
      queryClient.setQueryData<BankTabResponse[]>(['bankTabs'], (old) =>
        old?.map((tab) => (tab.id === tabId ? { ...tab, likes_count: (tab.likes || 0) + 1 } : tab))
      );

      // 4. Optimistically update the detail cache
      queryClient.setQueryData<BankTabResponse>(['bankTabs', tabId], (old) =>
        old ? { ...old, likes_count: (old.likes_count || 0) + 1 } : old
      );

      return { previousList, previousDetail };
    },
    onError: (err, variables, context) => {
      // Rollback both caches on error
      if (context?.previousList) queryClient.setQueryData(['bankTabs'], context.previousList);
      if (context?.previousDetail)
        queryClient.setQueryData(['bankTabs', tabId], context.previousDetail);
    },
    onSettled: () => {
      // Sync everything with the server
      queryClient.invalidateQueries({ queryKey: ['bankTabs'] });
    },
  });
}
