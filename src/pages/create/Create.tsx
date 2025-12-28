import {
  Textarea,
  Button,
  Text,
  Checkbox,
  Fieldset,
  CheckboxGroup,
  For,
  Input,
  Group,
} from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import './Create.css';
import '../../index.css';
import { checkBankTagString, type CheckBankTagStringResult } from '@/util/checkBankTagString';
import { useState } from 'react';
import { RxCross2, RxCheck } from 'react-icons/rx';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { TagsEnum, type Tags } from './models';
import { FaRegSquarePlus } from 'react-icons/fa6';

function Create() {
  const [importString, setImportString] = useState('');
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [icon, setIcon] = useState<string | null>(null);
  const [layout, setLayout] = useState<boolean | null>(null);
  const [tagName, setTagName] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [itemIds, setItemIds] = useState<string[] | null>(null);

  const handleImportClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setImportString(text.replaceAll(' ', ''));
      const validation = checkBankTagString(text);
      setIsValid(validation.result.isValid);
      setLayout(validation.layout);
      setIcon(validation.icon);
      setTagName(validation.tagName);
      setItemIds(validation.itemIds);
      if (validation.result.message && !validation.result.isValid) {
        setMessage(validation.result.message);
      } else {
        setMessage('Your bank tag is valid!');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleSubmit = () => {
    // For demonstration, we'll just log the data
    console.log('Submitting Bank Tag with the following data:');
    console.log({
      icon,
      import_string: importString,
      layout,
      tagName,
      tags: selectedTags,
    });
    // Here you would typically send the data to your backend or process it further
  };

  return (
    <div className="create-container">
      <Button size="sm" onClick={handleImportClipboard}>
        Import Clipboard
      </Button>
      <Textarea
        className={`create-textarea ${
          isValid ? 'valid-glow' : isValid === false ? 'invalid-glow' : ''
        }`}
        size="xl"
        value={importString}
        readOnly={true}
      />
      <Text className={isValid ? 'valid-text' : 'invalid-text'}>{message ? message : ''}</Text>
      <div className="result-container">
        <BankTagForm layout={layout} icon={icon} tagName={tagName} />
        <BankTabDisplay itemIds={itemIds ? itemIds : []} />
        <TagsDisplay selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      </div>

      <Button size="sm" disabled={!isValid || selectedTags.length === 0} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default Create;

function BankTagForm({
  layout,
  icon,
  tagName,
}: Pick<CheckBankTagStringResult, 'layout' | 'icon' | 'tagName'>) {
  return (
    <div className="result-box" style={{ gridArea: 'box-form' }}>
      <div className="tag-name">
        <Text className="details-text">
          Name: <div style={{ color: 'yellow' }}>{tagName ? tagName : null}</div>
        </Text>
      </div>
      <div className="tag-icon">
        <Text className="details-text">
          Icon:{' '}
          {icon ? (
            <img
              className="icon-image"
              src={`https://static.runelite.net/cache/item/icon/${icon}.png`}
              alt="icon"
            />
          ) : null}
        </Text>
      </div>
      <div className="tag-layout">
        <Text className="details-text">
          Layout Enabled:{' '}
          {layout ? <RxCheck color="green" /> : layout === false ? <RxCross2 color="red" /> : null}
        </Text>
        <div className="info-icon">
          <Tooltip
            content="Enabling layout will show the items in the custom tab as if they were in one single tab, rather than split into multiple custom tabs provided by Jagex, assuming you use those as well. 
        This can be toggled by right clicking your custom tab in-game and selecting 'Enable Layout'."
          >
            <FaRegQuestionCircle />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function BankTabDisplay({ itemIds }: { itemIds: string[] }) {
  return (
    <div className="result-box" style={{ gridArea: 'box-bank-tab' }}>
      <Text className="details-text">Bank Tab Preview:</Text>
      <div className="items-box hide-scrollbar">
        {/* Item icons will render here starting top-left */}
        {itemIds.map((itemId) => (
          <img
            key={itemId}
            src={`https://static.runelite.net/cache/item/icon/${itemId}.png`}
            alt={`https://static.runelite.net/cache/item/icon/952.png`}
          />
        ))}
      </div>
    </div>
  );
}

function TagsDisplay({
  selectedTags,
  setSelectedTags,
}: {
  selectedTags: Tags[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tags[]>>;
}) {
  const [selectableTags, setSelectableTags] = useState<string[]>([...TagsEnum.options]);
  const [customTag, setCustomTag] = useState<string>('');

  const handleAddCustomTag = (tag: string) => {
    if (tag && !selectableTags.includes(tag)) {
      setSelectableTags((prev) => [...prev, tag as Tags]);
    }
  };
  return (
    <div className="result-box" style={{ gridArea: 'box-tags' }}>
      <Fieldset.Root>
        <CheckboxGroup
          name="tags"
          value={selectedTags}
          onValueChange={(vals) => setSelectedTags(vals as Tags[])}
        >
          <Fieldset.Legend fontSize="xl" mb="2">
            Select tags:
          </Fieldset.Legend>
          <Fieldset.Content
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <For each={selectableTags}>
              {(value) => (
                <Checkbox.Root
                  variant={'outline'}
                  colorPalette={'yellow'}
                  key={value}
                  value={value}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control boxSize="1em" border="1px solid yellow" />
                  <Checkbox.Label fontSize={'2xl'}>{value}</Checkbox.Label>
                </Checkbox.Root>
              )}
            </For>
            <Group w="full" gap={3}>
              <Input
                fontSize="2xl"
                height="45px"
                variant="subtle"
                focusRingColor={'yellow'}
                placeholder="Custom Tag"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
              />
              <FaRegSquarePlus
                className="add-icon"
                size={18}
                cursor="pointer"
                onClick={() => handleAddCustomTag(customTag)}
              />
            </Group>
          </Fieldset.Content>
        </CheckboxGroup>
      </Fieldset.Root>
    </div>
  );
}

// function LayoutEnabled({ layout }: Pick<CheckBankTagStringResult, 'layout'>) {
//   return (
//     <div className="result-box" style={{ gridArea: 'box-layout' }}>
//       <Text className="details-text">
//         Layout Enabled:{' '}
//         {layout ? <RxCheck color="green" /> : layout === false ? <RxCross2 color="red" /> : null}
//       </Text>
//       <div className="info-icon">
//         <Tooltip
//           content="Enabling layout will show the items in the custom tab as if they were in one single tab, rather than split into multiple custom tabs provided by Jagex, assuming you use those as well.
//         This can be toggled by right clicking your custom tab in-game and selecting 'Enable Layout'."
//         >
//           <FaRegQuestionCircle />
//         </Tooltip>
//       </div>
//     </div>
//   );
// }

// function IconDisplay({ icon }: Pick<CheckBankTagStringResult, 'icon'>) {
//   return (
//     <div className="result-box" style={{ gridArea: 'box-icon' }}>
//       <Text className="details-text">
//         Icon:{' '}
//         {icon ? (
//           <img
//             className="icon-image"
//             src={`https://static.runelite.net/cache/item/icon/${icon}.png`}
//             alt="icon"
//           />
//         ) : null}
//       </Text>
//     </div>
//   );
// }

// function NameDisplay({ tagName }: Pick<CheckBankTagStringResult, 'tagName'>) {
//   return (
//     <div className="result-box" style={{ gridArea: 'box-name' }}>
//       <Text className="details-text">Name: {tagName ? tagName : null}</Text>
//     </div>
//   );
// }
