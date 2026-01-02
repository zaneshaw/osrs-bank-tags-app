import { Button } from '@chakra-ui/react';
import './BankTagCard.css';
import type { BankTabResponse } from '@/types';
import { FaRegCopy } from 'react-icons/fa6';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useState } from 'react';
import { Link } from 'react-router';

interface BankTagCardProps {
  data: BankTabResponse;
}

function BankTagCard({ data }: BankTagCardProps) {
  const [likedItems, setLikedItems] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem(`myFavorites`) || '[]')
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(data.import_string);
  };

  const handleLike = (tagId: string) => {
    if (likedItems.includes(tagId)) {
      const updatedItems = likedItems.filter((id: string) => id !== tagId);
      setLikedItems(updatedItems);
      localStorage.setItem(`myFavorites`, JSON.stringify(updatedItems));
    } else {
      const updatedItems = [...likedItems, tagId];
      setLikedItems(updatedItems);
      localStorage.setItem(`myFavorites`, JSON.stringify(updatedItems));
    }
  };

  const isLiked = likedItems.includes(data.id.toString());

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
