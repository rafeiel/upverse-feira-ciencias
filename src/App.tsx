import { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage';
import JornadaPage from './components/JornadaPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'jornada'>('home');

  useEffect(() => {
    // Simples roteamento baseado no pathname
    const path = window.location.pathname;
    if (path === '/jornada') {
      setCurrentPage('jornada');
    } else {
      setCurrentPage('home');
    }

    // Listener para mudanças de URL
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPage(path === '/jornada' ? 'jornada' : 'home');
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <div className="App">
      {currentPage === 'home' ? <LandingPage /> : <JornadaPage />}
    </div>
  );
}

export default App;