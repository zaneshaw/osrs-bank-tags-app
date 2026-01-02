import './Nav.css';
import { Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="nav-bar">
      <Text className="nav-logo">
        <Link to="/">OSRS Bank Tags </Link>
      </Text>
      {/* <Text>
        <Link to="/create" className="nav-import-button nav-button">
          Import Bank Tab
        </Link>
      </Text> */}
      <div className="nav-buttons-container">
        <Link to="/import" className="nav-import-button nav-button">
          <Button colorPalette="yellow" variant="outline" className="nav-button">
            Import Bank Tab
          </Button>
        </Link>
        <Link to="/favorites" className="nav-import-button nav-button">
          <Button colorPalette="yellow" variant="outline" className="nav-button">
            Favorites
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
