import './App.css';
import Nav from './components/nav/Nav';
import HomePage from './pages/home/HomePage';

function App() {
  return (
    <>
      <div className="app-container">
        <Nav />
        
          <HomePage />
        
      </div>
    </>
  );
}

export default App;
