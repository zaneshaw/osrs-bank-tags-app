import { Button } from '@chakra-ui/react';
import './BankTagCard.css';
import type { BankTabResponse } from '@/types';
import { FaRegCopy } from 'react-icons/fa6';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router';
import { useFavorites } from '@/hooks/useFavorites';

interface BankTagCardProps {
  data: BankTabResponse;
}

function BankTagCard({ data }: BankTagCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const handleCopy = () => {
    navigator.clipboard.writeText(data.import_string);
  };

  const handleLike = (tagId: string) => {
    toggleFavorite(tagId);
  };

  const isLiked = isFavorite(data.id.toString());

  return (
    <div className="bank-tag-card">
      <Link className="unselectable-text tag-title" to={`/banktab/${data.id}`}>
        {data.name}
      </Link>
      <img
        className="tab-icon"
        src={`https://static.runelite.net/cache/item/icon/${data.icon}.png`}
        alt={`https://static.runelite.net/cache/item/icon/952.png`}
      />
      <div className="card-footer">
        <Button
          onClick={handleCopy}
          variant="outline"
          colorPalette="yellow"
          className="copy-button"
        >
          Import String <FaRegCopy />
        </Button>
        {isLiked ? (
          <IoMdHeart onClick={() => handleLike(data.id.toString())} className="like-button" />
        ) : (
          <IoMdHeartEmpty onClick={() => handleLike(data.id.toString())} className="like-button" />
        )}
      </div>
    </div>
  );
}

export default BankTagCard;
