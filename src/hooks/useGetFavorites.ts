import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '@/api/getFavorites';

export function useGetFavorites(favoriteIds: string[]) {
  return useQuery({
    queryFn: () => getFavorites(favoriteIds),
    queryKey: ['favorites', favoriteIds],
    enabled: favoriteIds.length > 0,
  });
}
