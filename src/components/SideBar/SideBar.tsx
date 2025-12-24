import { MdKeyboardArrowRight } from 'react-icons/md';

import './SideBar.css';
import { useState } from 'react';

interface SideBarProps {
  navItems: string[];
}

function SideBar({ navItems }: SideBarProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    setSelected(item);
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar-items">
        <ul>
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.replaceAll(' ', '')}`}
                onClick={() => handleSelect(item)}
                className={selected === item ? 'selected' : ''}
              >
                {item}
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
