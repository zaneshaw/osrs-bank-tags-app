import { MdKeyboardArrowRight, MdMenu, MdClose } from 'react-icons/md';

import './SideBar.css';
import { useState } from 'react';

interface SideBarProps {
  navItems: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

function SideBar({ navItems, selectedCategory, setSelectedCategory }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: string) => {
    setSelectedCategory(item.toLowerCase());

    setIsOpen(false); // close menu on selection (mobile)
  };

  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <div className="sidebar-container" style={{ gridArea: 'sidebar' }}>
      <button
        className="sidebar-toggle"
        aria-controls="sidebar-nav"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        {isOpen ? <MdClose /> : <MdMenu />}
        <span>Menu</span>
      </button>

      <div id="sidebar-nav" className={`sidebar-items ${isOpen ? 'open' : ''}`}>
        <ul>
          {navItems.map((item) => (
            <li key={item} className="unselectable-text">
              <a
                href={`#${item}`}
                onClick={() => handleSelect(item)}
                className={`${selectedCategory === item.toLocaleLowerCase() ? 'selected' : ''}`}
              >
                {item === '' ? 'All Tags' : item}
                <MdKeyboardArrowRight />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
