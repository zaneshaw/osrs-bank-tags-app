import './BankTab.css';
import { useParams } from 'react-router-dom';
import { useGetBankTab } from '@/hooks/useGetBankTab';
import { generateItemIds } from '@/util/checkBankTagString';
import { BankTabDisplay } from '@/components/BankTabDisplay/BankTabDisplay';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';

function BankTab() {
  const { tabId } = useParams<{ tabId: string }>();
  const { data: tabData, error: error, isPending, isError } = useGetBankTab(tabId!);
  const itemIds = tabData ? generateItemIds(tabData.import_string.split(',')) : [];
  const [favoritedState, setFavoritedState] = useState<boolean>(() => {
    return localStorage.getItem('myFavorites')?.includes(tabId!) ?? false;
  });
  const [copySuccess, setCopySuccess] = useState<boolean | null>(null);

  if (isPending) {
    return <p className="center-message loading-text">Loading bank tab...</p>;
  }

  if (isError || !tabData) {
    console.log('Error fetching bank tab data or data is undefined.', error);

    return <p className="center-message error-text">Error loading bank tab.</p>;
  }

  const handleFav = () => {
    const favorites: string[] = JSON.parse(localStorage.getItem('myFavorites') ?? '[]');

    const tabIdStr = tabData.id.toString();
    const isFavorited = favorites.includes(tabIdStr);

    const nextFavorites = isFavorited
      ? favorites.filter((id) => id !== tabIdStr)
      : [...favorites, tabIdStr];

    localStorage.setItem('myFavorites', JSON.stringify(nextFavorites));
    setFavoritedState(!isFavorited);
  };

  const handleCopyImportString = async () => {
    try {
      await navigator.clipboard.writeText(tabData.import_string);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy import string: ', err);
      setCopySuccess(false);
    }
  };

  return (
    <div className="bank-tab-container">
      <h1 className="bank-tab-title">{tabData.name}</h1>
      <div className="bank-tab-content">
        <div className="bank-tab-buttons" style={{ gridArea: 'box-buttons' }}>
          <div className="bank-tab-import">
            <Button onClick={handleCopyImportString}>
              Copy Import String{' '}
              {copySuccess !== null &&
                (copySuccess ? (
                  <FaCheck key="success" className="icon flash " />
                ) : (
                  <RxCross1 key="error" className="icon flash " />
                ))}
            </Button>
          </div>
          <div className={`bank-tab-fav`}>
            <Button
              onClick={handleFav}
              colorPalette={'yellow'}
              variant={favoritedState ? 'outline' : 'solid'}
            >
              {favoritedState ? 'Remove Favorite' : 'Favorite'}
            </Button>
          </div>
        </div>
        <div className="bank-tab-info" style={{ gridArea: 'box-info' }}>
          <div className="bank-tab-date">
            Date Created: {new Date(tabData.created_at).toLocaleDateString()}
          </div>
          <div className="bank-tab-likes">Favorites: {tabData.likes}</div>
        </div>
        <BankTabDisplay itemIds={itemIds} />
      </div>
    </div>
  );
}

export default BankTab;
