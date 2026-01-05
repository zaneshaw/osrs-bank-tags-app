import { Text } from '@chakra-ui/react';
import { Tooltip } from '../ui/tooltip';
import { FaRegQuestionCircle } from 'react-icons/fa';
import './BankTabDisplay.css';

// todo: need a richer class for storing data instead of using this function and 'generateItemIds'
// function getLayoutPosition(itemIndex: number, importString: string) {
//   const tokens = importString.split('layout,')[1].split(','); // position, itemId, position, itemId...
//   const position = parseInt(tokens[itemIndex * 2]);

//   return [Math.floor(position / 8) + 1, (position % 8) + 1];
// }

const toolTipContent = `Enabling layout will show the items in the custom tab as if they were in one single tab, rather than split into multiple custom tabs provided by Jagex, assuming you use those as well. 
        This can be toggled by right clicking your custom tab in-game and selecting 'Enable Layout'.`;

export function BankTabDisplay({
  itemIds,
  layout,
  importString,
}: {
  itemIds: string[];
  layout: boolean;
  importString: string;
}) {
  console.log(importString);
  return (
    <div className="grid-box" style={{ gridArea: 'box-bank-tab' }}>
      <div className="display-header">
        <Text className="details-text">Preview:</Text>
        <Text className="bank-tab-layout">
          <span>Layout: </span>
          {layout ? (
            <span style={{ color: 'lime' }}>ENABLED</span>
          ) : (
            <span style={{ color: 'red' }}>DISABLED</span>
          )}
          <span className="info-icon">
            <Tooltip content={toolTipContent}>
              <FaRegQuestionCircle />
            </Tooltip>
          </span>
        </Text>
      </div>

      <div className="items-box-layout hide-scrollbar">
        {itemIds.map((itemId, i) => (
          <img
            key={i}
            src={`https://static.runelite.net/cache/item/icon/${itemId}.png`}
            alt={`https://static.runelite.net/cache/item/icon/952.png`}
            // style={{ gridArea: `${getLayoutPosition(i, importString).join('/')}` }}
          />
        ))}
      </div>
    </div>
  );
}
