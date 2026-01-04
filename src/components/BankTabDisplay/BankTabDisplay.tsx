import { Text } from '@chakra-ui/react';

// todo: need a richer class for storing data instead of using this function and 'generateItemIds'
function getLayoutPosition(itemIndex: number, importString: string) {
  const tokens = importString.split("layout,")[1].split(","); // position, itemId, position, itemId...
  const position = parseInt(tokens[(itemIndex * 2)]);

  return [Math.floor(position / 8) + 1, (position % 8) + 1];
}

export function BankTabDisplay({ itemIds, layout, importString }: { itemIds: string[], layout: boolean, importString: string }) {
  return (
    <div className="grid-box" style={{ gridArea: 'box-bank-tab' }}>
      <div style={{display: "flex", justifyContent: "space-between", width: "100%", borderBottom: '1px solid #fff'}}>
        <Text className="details-text">Bank Tab Preview:</Text>
        <Text className="bank-tab-layout">
          <span>Layout: </span>
          {layout ? <span style={{ color: "lime" }}>ENABLED</span> : <span style={{ color: "red" }}>DISABLED</span>}
        </Text>
      </div>
      {layout ? (
        <div className="items-box items-box-layout">
          {itemIds.map((itemId, i) => (
            <img
              key={i}
              src={`https://static.runelite.net/cache/item/icon/${itemId}.png`}
              alt={`https://static.runelite.net/cache/item/icon/952.png`}
              style={{ gridArea: `${getLayoutPosition(i, importString).join("/")}` }}
            />
          ))}
        </div>
      ) : (
        <div className="items-box hide-scrollbar">
          {/* Item icons will render here starting top-left */}
          {itemIds.map((itemId, i) => (
            <img
              key={i}
              src={`https://static.runelite.net/cache/item/icon/${itemId}.png`}
              alt={`https://static.runelite.net/cache/item/icon/952.png`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
