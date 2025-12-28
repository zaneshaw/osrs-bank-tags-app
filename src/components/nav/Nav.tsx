import './Nav.css';
import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="nav-bar">
      <Text className="nav-logo nav-button">
        <Link to="/">OSRS Bank Tags </Link>
      </Text>
      <Text>
        <Link to="/create" className="nav-import-button nav-button">
          Import Bank Tab
        </Link>
      </Text>
    </div>
  );
}

export default Nav;
