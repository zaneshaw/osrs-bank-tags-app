import BankTagContent from '@/components/BankTagContent/BankTagContent';
import SideBar from '@/components/SideBar/SideBar';
import './HomePage.css';
import { useState } from 'react';
const testNav: string[] = [
  '',
  'PvM',
  'PvP',
  'Skilling',
  'Clue',
  'Minigame',
  'Quest',
  'Miscellaneous',
];

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <div className="home-container">
      <SideBar
        navItems={testNav}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BankTagContent selectedCategory={selectedCategory} />
    </div>
  );
}

export default HomePage;
