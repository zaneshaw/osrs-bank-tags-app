import BankTagCard from '@/components/BankTagCard/BankTagCard';
import './Favorites.css';
import { useGetFavorites } from '@/hooks/useGetFavorites';

function Favorites() {
  const favoriteIds = localStorage.getItem('myFavorites')
    ? JSON.parse(localStorage.getItem('myFavorites')!)
    : [];
  console.log('Favorite IDs:', favoriteIds);
  const { data: favorites, isLoading, error } = useGetFavorites(favoriteIds); // Example favorite IDs

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">My Favorite Bank Tabs</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading favorites.</p>}
      {favorites && favorites.length === 0 && <p>No favorites found.</p>}
      {favorites && favorites.length > 0 && (
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
