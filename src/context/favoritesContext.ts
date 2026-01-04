import { createContext } from 'react';

export interface FavoritesContextType {
  favoriteIds: string[];
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (itemId: string) => void;
  setFavoriteIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
