import { useQuery } from '@tanstack/react-query';
import { filterBankTabs } from '@/api/filterBankTabs';

export function useFilterBankTabs(category: string) {
  return useQuery({
    queryFn: () => filterBankTabs(category),
    queryKey: ['bankTabs', category],
  });
}
