
import React from 'react';
import { motion } from 'framer-motion';
import { MovieComparison } from '../types';
import { FALLBACK_IMAGE_URL } from '../constants/constants';

interface MovieCardProps {
  movie: MovieComparison;
  onCompare: (cinemaWorldId?: string, filmWorldId?: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onCompare }) => {
  const { title, cinemaWorldMovie, filmWorldMovie } = movie;
  const posterUrl = cinemaWorldMovie?.poster || filmWorldMovie?.poster || FALLBACK_IMAGE_URL;

  return (
    <motion.div
      className=" rounded-lg overflow-hidden shadow-lg relative "
      whileHover={{ scale: 1.05 ,backgroundColor: '#1f2937'}}
      whileTap={{ scale: 0.98 }}
      onClick={() => onCompare(cinemaWorldMovie?.id, filmWorldMovie?.id)}
    >
      <img
        src={posterUrl}
        alt={`${title} poster`}
        className="w-full h-72 object-cover"
        onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE_URL)}
      />
      <div className="p-3 text-left">
        <h3 className="text-md font-semibold text-gray-200 ">{title || 'Unknown Title'}</h3>
        <p className="text-xs text-gray-400">{cinemaWorldMovie?.year || filmWorldMovie?.year || 'N/A'}</p>
      </div>
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-opacity flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-white font-semibold text-lg">Compare Prices</span>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;