import './Nav.css';
import { Text } from '@chakra-ui/react';

function Nav() {
  return (
    <div className="nav-bar">
      <Text className="logo">
        <a href="/">OSRS Bank Tags </a>
      </Text>
      <nav className="nav-container">
        <ul>
          <li>
            <a href="/create" className="nav-import-button">
              Import Bank Tab
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
