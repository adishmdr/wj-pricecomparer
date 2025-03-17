
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MovieList from './components/MovieList';
import StarWarsCrawl from './components/StarWarsCrawl';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStartedCrawl, setHasStartedCrawl] = useState(false);

  
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsLoading(true); 
      // const audio = new Audio('/audio/starwars-theme.mp3'); 
      // audio.volume = 0.5; 
      // audio.play().catch((err) => {
      //   console.error('Audio playback failed:', err.message);
      //   alert('Audio failed to play. Please ensure the file is accessible.');
      // });

      const timer = setTimeout(() => {
        setIsLoading(false);
        // audio.pause();
        localStorage.setItem('hasVisited', 'true'); 
      }, 5000); // 5 seconds for the crawl

      return () => {
        clearTimeout(timer);
        // audio.pause();
      };
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCrawlComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <StarWarsCrawl onComplete={handleCrawlComplete} />;
  }

  return (
    <div className="min-h-screen text-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-start items-center">
        
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 text-center">
        <div className="absolute inset-0 bg-center opacity-20 blur-sm" />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-4 flex justify-center">
            <img
              src="https://lumiere-a.akamaihd.net/v1/images/sw_nav_logo_mobile_659fef1a_1_99c6e87c.png?region=0,0,312,32"
              alt="Star Wars Logo Mobile"
              className="h-8 md:hidden" // Mobile logo (312x32)
            />
            <img
              src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
              alt="Star Wars Logo Desktop"
              className="h-24 hidden md:block" // Desktop logo (586x254)
            />
          </div>
          <p className="text-lg md:text-xl mb-6 font-semibold text-green-400 italic">May the Force be With You!</p>
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8 shadow-green-600 shadow-xl">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-gray-800 text-white p-3 rounded outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </motion.div>
      </section>

      <main className="container mx-auto px-4 py-10">
        <MovieList searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default App;