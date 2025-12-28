import BankTagContent from '@/components/BankTagContent/BankTagContent';
import SideBar from '@/components/SideBar/SideBar';
import './HomePage.css';
const testNav: string[] = [
  'All Tags',
  'Favorites',
  'PvM',
  'PvP',
  'Skilling',
  'Clue',
  'Minigame',
  'Quest',
  'Miscellaneous',
];

function HomePage() {
  return (
    <div className="home-container">
      <SideBar navItems={testNav} />
      <BankTagContent />
    </div>
  );
}

export default HomePage;
