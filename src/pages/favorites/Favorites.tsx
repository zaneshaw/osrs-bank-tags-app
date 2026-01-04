import BankTagCard from '@/components/BankTagCard/BankTagCard';
import './Favorites.css';
import { useGetFavorites } from '@/hooks/useGetFavorites';
import { Spinner } from '@chakra-ui/react';
import { useFavorites } from '@/hooks/useFavorites';

function Favorites() {
  const { favoriteIds } = useFavorites();

  // 2. Query (auto-disabled if empty)
  const { data: favorites = [], isLoading, error } = useGetFavorites(favoriteIds);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">My Favorite Bank Tabs</h1>

      {isLoading && (
        <p className="center-message loading-text">
          <Spinner size="lg" color="colorPalette.600" colorPalette="yellow" />
        </p>
      )}

      {error && <p className="center-message error-text">Error loading favorites.</p>}

      {!isLoading && favorites.length === 0 && (
        <p className="center-message">No favorites found.</p>
      )}
      {favorites.length > 0 && (
        <div className="tags-container">
          {favorites.map((tab) => (
            <BankTagCard key={tab.id} data={tab} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
