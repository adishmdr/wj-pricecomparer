// src/components/StarWarsCrawl.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StarWarsCrawl: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  

  

  

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: 'url(https://i.ytimg.com/vi/JquobII5VjA/maxresdefault.jpg)' }}
      />
        <>
          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            animate={{ width:  300 , opacity:  1  }}
            transition={{ duration: 10, ease: 'linear', delay: 5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto"
          />

          <motion.button
            
            initial={{ opacity: 0 }}
            animate={{ opacity:  [0, 0, 1] }} // isPlaying ? 1 : 0 }}
            transition={{ duration: 66, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl bg-transparent border-0 text-yellow-300 font-bold cursor-pointer"
          >
            Restart
          </motion.button>
        </>
    </div>
  );
};

export default StarWarsCrawl;