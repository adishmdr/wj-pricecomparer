// src/components/StarWarsCrawl.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StarWarsCrawl: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStartCrawl = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error('Audio playback failed:', err.message);
        alert('Audio failed to play. Please ensure the file is accessible.');
      });
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to start
    }
    // Allow restart after a short delay to reset animation
    setTimeout(() => setIsPlaying(true), 100);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const timer = setTimeout(() => {
        onComplete(); // Trigger completion after animation
        if (audioRef.current) audioRef.current.pause();
      }, 5300); // Matches reel animation duration (5.3s)
      return () => clearTimeout(timer);
    }
  }, [isPlaying, onComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: 'url(https://i.ytimg.com/vi/JquobII5VjA/maxresdefault.jpg)' }}
      />
      {!isPlaying ? (
        <button
          onClick={handleStartCrawl}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold z-10"
        >
          Start Crawl
        </button>
      ) : (
        <>
          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlaying ? 1 : 0 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="text-blue-400 text-4xl md:text-5xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[578px] text-center"
          >
            <p className="mb-4">A long time ago, in a galaxy far, far away...</p>
          </motion.div>

          {/* Logo */}
          <motion.img
            src="http://vignette1.wikia.nocookie.net/disney/images/8/8b/Starwars-logo.png"
            alt="Star Wars Logo"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isPlaying ? 300 : 0, opacity: isPlaying ? 1 : 0 }}
            transition={{ duration: 10, ease: 'linear', delay: 5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto"
          />

          {/* Reel */}
          {/* <div className="reel absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[580px] h-[100em] overflow-hidden perspective-255 rotate-x-30deg origin-bottom text-yellow-300 font-bold text-4xl md:text-5xl text-justify">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: isPlaying ? '-50%' : '100%', opacity: isPlaying ? [1, 1, 0] :0}}
              transition={{ duration: 5.3, ease: 'linear', delay: 12 }}
              className="absolute top-100% w-full"
            >
              <h1 className="text-center mb-6">Episode IV</h1>
              <h2 className="text-center mb-6">A NEW HOPE</h2>
              <p className="leading-loose mt-12">It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.</p>
              <p className="leading-loose mt-12">During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.</p>
              <p className="leading-loose mt-12">Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....</p>
            </motion.div>
          </div> */}

          {/* Audio */}
          <audio ref={audioRef} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/244725/MainTitle.ogg" />

          {/* Restart Button */}
          <motion.button
            onClick={handleRestart}
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlaying ? [0, 0, 1] : 0 }}
            transition={{ duration: 66, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl bg-transparent border-0 text-yellow-300 font-bold cursor-pointer"
          >
            Restart
          </motion.button>
        </>
      )}
    </div>
  );
};

export default StarWarsCrawl;