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
import './ImportTab.css';
import '../../index.css';
import { checkBankTagString, type CheckBankTagStringResult } from '@/util/checkBankTagString';
import { useState } from 'react';
import { TagsEnum, type Tags, CreateSchema } from './models';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { useCreateBankTab } from '@/hooks/useCreateBankTab';
import { useNavigate } from 'react-router-dom';
import { BankTabDisplay } from '@/components/BankTabDisplay/BankTabDisplay';

function Create() {
  const [importString, setImportString] = useState('');
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [icon, setIcon] = useState<string | null>(null);
  const [layout, setLayout] = useState<boolean | null>(null);
  const [tagName, setTagName] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [itemIds, setItemIds] = useState<string[] | null>(null);
  const navigate = useNavigate();

  const createBankTab = useCreateBankTab();

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

  const handleSubmit = async () => {
    try {
      if (!isValid || !icon || !tagName) {
        setMessage('Please import a valid bank tag first.');
        return;
      }

      // add tagName to array,change tags to lowercase and remove duplicates
      const selectedTagsWithName = [...selectedTags, tagName];
      const selectedTagsSet = new Set(selectedTagsWithName.map((tag) => tag.toLowerCase()));
      const finalTags = Array.from(selectedTagsSet);

      const toValidate = {
        icon: icon,
        tagName: tagName,
        importString: importString,
        layout: !!layout,
        tags: finalTags,
        likes: 0,
      };

      const parsed = CreateSchema.safeParse(toValidate);
      if (!parsed.success) {
        const firstErr = parsed.error.issues[0]?.message ?? 'Invalid form data';

        setMessage(firstErr);
        return;
      }

      const payload = {
        name: parsed.data.tagName,
        icon: parsed.data.icon,
        import_string: parsed.data.importString,
        layout: parsed.data.layout,
        tags: parsed.data.tags,
        likes: parsed.data.likes,
      };

      const result = await createBankTab.mutateAsync(payload);

      //redirect to the newly created bank tab page
      navigate(`/banktab/${result.id}`);

      setMessage('Bank tab created successfully!');
    } catch (err) {
      console.error('Submit failed:', err);
      setMessage('Failed to create bank tab.');
    }
  };

  return (
    <div className="create-container">
      <Button size="sm" onClick={handleImportClipboard}>
        Import From Clipboard
      </Button>
      <Textarea
        className={`create-textarea ${
          isValid ? 'valid-glow' : isValid === false ? 'invalid-glow' : ''
        }`}
        size="xl"
        value={importString}
        readOnly={true}
      />

      <div className="result-container">
        <BankTagForm icon={icon} tagName={tagName} />
        <BankTabDisplay
          itemIds={itemIds ?? []}
          layout={layout ?? false}
          importString={importString ?? ''}
        />
        <TagsDisplay selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <Button
          className="submit-box"
          style={{ gridArea: 'box-submit' }}
          size="sm"
          disabled={!isValid || selectedTags.length === 0 || createBankTab.isPending}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <Text className={isValid ? 'valid-text' : 'invalid-text'}>{message ? message : ' '}</Text>
    </div>
  );
}

export default Create;

function BankTagForm({ icon, tagName }: Pick<CheckBankTagStringResult, 'icon' | 'tagName'>) {
  return (
    <div className="grid-box" style={{ gridArea: 'box-form' }}>
      <div className="tag-name">
        <Text className="details-text">
          Name: <span className="detail">{tagName ? tagName : null}</span>
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
      setCustomTag('');
    }
  };
  return (
    <div className="grid-box" style={{ gridArea: 'box-tags' }}>
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
                  <Checkbox.Control boxSize="1em" border="1px solid #eab308" />
                  <Checkbox.Label fontSize={'2xl'}>{value}</Checkbox.Label>
                </Checkbox.Root>
              )}
            </For>
            <Group w="full" gap={3}>
              <Input
                fontSize="2xl"
                height="45px"
                variant="subtle"
                focusRingColor={'#eab308'}
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
//     <div className="grid-box" style={{ gridArea: 'box-layout' }}>
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
//     <div className="grid-box" style={{ gridArea: 'box-icon' }}>
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
//     <div className="grid-box" style={{ gridArea: 'box-name' }}>
//       <Text className="details-text">Name: {tagName ? tagName : null}</Text>
//     </div>
//   );
// }
