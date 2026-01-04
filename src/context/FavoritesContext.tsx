import { useCallback, useEffect, useMemo, useState } from 'react';
import { FavoritesContext } from './favoritesContext';

export const FavoritesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('myFavorites');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('myFavorites', JSON.stringify(favoriteIds));
    } catch {
      // ignore storage errors
    }
  }, [favoriteIds]);

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite, setFavoriteIds }),
    [favoriteIds, isFavorite, toggleFavorite, setFavoriteIds]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
