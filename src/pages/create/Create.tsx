import { Textarea, Button, Text } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import './Create.css';
import { checkBankTagString, type CheckBankTagStringResult } from '@/util/checkBankTagString';
import { useState } from 'react';
import { RxCross2, RxCheck } from 'react-icons/rx';
import { FaRegQuestionCircle } from 'react-icons/fa';

function Create() {
  const [importString, setImportString] = useState('');
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [icon, setIcon] = useState<string | null>(null);
  const [layout, setLayout] = useState<boolean | null>(null);
  const [tagName, setTagName] = useState<string | null>(null);

  const handleImportClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setImportString(text.replaceAll(' ', ''));
      const validation = checkBankTagString(text);
      setIsValid(validation.result.isValid);
      setLayout(validation.layout);
      setIcon(validation.icon);
      setTagName(validation.tagName);
      if (validation.result.message && !validation.result.isValid) {
        setMessage(validation.result.message);
      } else {
        setMessage('Your bank tag is valid!');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <div className="create-container">
      <h1>Create Bank Tab</h1>
      <Button size="sm" onClick={handleImportClipboard}>
        Import Clipboard
      </Button>
      <Textarea className="create-textarea" size="xl" value={importString} readOnly={true} />
      <div className="result-container">
        <Validation result={{ isValid: isValid, message }} />
        <NameDisplay tagName={tagName} />
        <TagsDisplay />
        <IconDisplay icon={icon} />
        <LayoutEnabled layout={layout} />
      </div>

      <Button size="sm" disabled={!isValid}>
        Submit
      </Button>
    </div>
  );
}

export default Create;

function LayoutEnabled({ layout }: Pick<CheckBankTagStringResult, 'layout'>) {
  return (
    <div className="result-box" style={{ gridArea: 'box-layout' }}>
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
  );
}

function Validation({ result: { isValid, message } }: Pick<CheckBankTagStringResult, 'result'>) {
  return (
    <div className="result-box" style={{ gridArea: 'box-validation' }}>
      <Text className="details-text">
        Valid:{' '}
        {isValid ? <RxCheck color="green" /> : isValid === false ? <RxCross2 color="red" /> : null}
      </Text>
      <Text className={isValid ? 'valid-text' : 'invalid-text'}>{message ? message : ''}</Text>
    </div>
  );
}

function IconDisplay({ icon }: Pick<CheckBankTagStringResult, 'icon'>) {
  return (
    <div className="result-box" style={{ gridArea: 'box-icon' }}>
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
  );
}

function NameDisplay({ tagName }: Pick<CheckBankTagStringResult, 'tagName'>) {
  return (
    <div className="result-box" style={{ gridArea: 'box-name' }}>
      <Text className="details-text">Name: {tagName ? tagName : null}</Text>
    </div>
  );
}

function TagsDisplay() {
  return (
    <div className="result-box" style={{ gridArea: 'box-tags' }}>
      <Text className="details-text">Tags:</Text>
    </div>
  );
}
