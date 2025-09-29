import { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage';
import IndexPage from './components/IndexPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'index'>('home');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/jornada' || path === '/index') {
      setCurrentPage('index');
    } else {
      setCurrentPage('home');
    }

    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPage(path === '/jornada' || path === '/index' ? 'index' : 'home');
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <div className="App">
      {currentPage === 'home' ? <LandingPage /> : <IndexPage />}
    </div>
  );
}

export default App;