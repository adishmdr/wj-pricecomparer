
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchMovies } from '../api/movieApi';
import { MovieComparison } from '../types';
import MovieCard from './MovieCard';
import CompareModal from './CompareModal';
import Skeleton from './Skeleton';

interface MovieListProps {
  searchTerm: string;
}

const MovieList: React.FC<MovieListProps> = ({ searchTerm }) => {
  const [movies, setMovies] = useState<MovieComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<{ cinemaWorldId?: string; filmWorldId?: string } | null>(null);

  const loadMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies();
      // Sort by year ascending
      const sortedMovies = [...data].sort((a, b) => {
        const yearA = a.cinemaWorldMovie?.year || a.filmWorldMovie?.year || '0';
        const yearB = b.cinemaWorldMovie?.year || b.filmWorldMovie?.year || '0';
        return yearA.localeCompare(yearB);
      });
      setMovies(sortedMovies);
      if (sortedMovies.length === 0) {
        setError('No movies available at this time.');
      }
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleCompare = (cinemaWorldId?: string, filmWorldId?: string) => {
    if (cinemaWorldId || filmWorldId) {
      setSelectedMovie({ cinemaWorldId, filmWorldId });
    }
  };

  const closeModal = () => setSelectedMovie(null);

  // Filter movies based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) || ''
  );

  if (loading) {
    return (
      <div className="container mx-auto px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center text-gray-200">Explore Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <Skeleton height="h-40 sm:h-56 md:h-72" className="mb-2 sm:mb-4" />
                <Skeleton width="w-3/4" height="h-4 sm:h-6" className="mb-1 sm:mb-2 mx-auto" />
                <Skeleton width="w-1/2" height="h-3 sm:h-4" className="mx-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 sm:py-10 text-gray-400">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto shadow-green-500 shadow-lg"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/9/9b/Yoda_Empire_Strikes_Back.png"
            alt="Star Wars Error"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto mb-2 sm:mb-4 rounded-full object-cover"
          />
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-200 mb-2 sm:mb-4 text-center">
            Do or do not. There is retry.
          </h2>
          <p className="mb-2 sm:mb-4 text-gray-300 text-sm sm:text-base text-center">
            Happens to every guy sometimes this does.
          </p>
          <p className="mb-2 sm:mb-4 text-gray-300 text-xs sm:text-sm text-center">{error}</p>
          <button
            onClick={loadMovies}
            className="bg-green-600 text-white py-1 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  if (filteredMovies.length === 0 && searchTerm) {
    return (
      <div className="text-center py-6 sm:py-10 text-gray-400">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto shadow-lg"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-200 mb-2 sm:mb-4 text-center">
            No Results Found
          </h2>
          <p className="text-sm sm:text-base text-center">No movies found matching "{searchTerm}". Try a different search term.</p>
        </motion.div>
      </div>
    );
  }

  if (filteredMovies.length === 0) {
    return (
      <div className="text-center py-6 sm:py-10 text-gray-400">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto shadow-lg"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-200 mb-2 sm:mb-4 text-center">
            No Movies Available
          </h2>
          <p className="text-sm sm:text-base text-center">No movies available to display at this time.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center text-gray-200">Explore Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
        {filteredMovies.map((movie, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <MovieCard movie={movie} onCompare={handleCompare} />
          </motion.div>
        ))}
      </div>
      {selectedMovie && (
        <CompareModal
          cinemaWorldId={selectedMovie.cinemaWorldId}
          filmWorldId={selectedMovie.filmWorldId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MovieList;