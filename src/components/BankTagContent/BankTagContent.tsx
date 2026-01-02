import { Input, InputGroup } from '@chakra-ui/react';
import BankTagCard from '../BankTagCard/BankTagCard';
import { LuSearch } from 'react-icons/lu';
import './BankTagContent.css';
import { useMemo, useState } from 'react';
import { useFilterBankTabs } from '@/hooks/useFilterBankTabs';

// const testData: BankTagData[] = [
//   { tagId: '1', tagName: 'Zulrah', tagString: 'hello!', tagTags: [] },
//   { tagId: '2', tagName: 'Muspah', tagString: '', tagTags: [] },
//   { tagId: '3', tagName: 'Vorkath', tagString: '', tagTags: [] },
//   { tagId: '4', tagName: 'Cerberus', tagString: '', tagTags: [] },
//   { tagId: '5', tagName: 'Alchemical Hydra', tagString: '', tagTags: [] },
//   { tagId: '6', tagName: 'Grotesque Guardians', tagString: '', tagTags: [] },
//   { tagId: '7', tagName: 'Farming', tagString: '', tagTags: [] },
//   { tagId: '8', tagName: 'Clue Scrolls', tagString: '', tagTags: [] },
//   { tagId: '9', tagName: 'Food', tagString: '', tagTags: [] },
//   { tagId: '10', tagName: 'Potions', tagString: '', tagTags: [] },
// ];
interface BankTagContentProps {
  selectedCategory: string;
}

function BankTagContent({ selectedCategory }: BankTagContentProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  console.log(selectedCategory);
  const { data: categoryData, isPending, error } = useFilterBankTabs(selectedCategory);

  const visibleData = useMemo(() => {
    if (!categoryData) return [];

    if (!searchTerm.trim()) return categoryData;

    const q = searchTerm.toLowerCase();

    return categoryData.filter(
      (tab) =>
        tab.name.toLowerCase().includes(q) || tab.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [categoryData, searchTerm]);

  return (
    <div className="content-container" style={{ gridArea: 'content' }}>
      <InputGroup className="search-bar" startElement={<LuSearch />}>
        <Input
          placeholder="Search Tabs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {isPending && <p className="center-message loading-text">Loading bank tags...</p>}

      {error && <p className="center-message error-text">Error loading bank tags.</p>}

      <div className="tags-container">
        {visibleData.map((tag) => (
          <BankTagCard key={tag.id} data={tag} />
        ))}
      </div>
    </div>
  );
}

export default BankTagContent;
