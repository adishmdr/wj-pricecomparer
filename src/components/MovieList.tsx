// src/components/MovieList.tsx
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

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        // Sort by year ascending
        const sortedMovies = [...data].sort((a, b) => {
          const yearA = a.cinemaWorldMovie?.year || a.filmWorldMovie?.year || '0';
          const yearB = b.cinemaWorldMovie?.year || b.filmWorldMovie?.year || '0';
          return yearA.localeCompare(yearB);
        });
        setMovies(sortedMovies);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
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
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-200">Explore Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <Skeleton height="h-72" className="mb-4" />
                <Skeleton width="w-3/4" height="h-6" className="mb-2 mx-auto" />
                <Skeleton width="w-1/2" height="h-4" className="mx-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-400">{error}</div>;
  }

  if (filteredMovies.length === 0 && searchTerm) {
    return (
      <div className="text-center py-10 text-gray-400">
        <p>No movies found matching "{searchTerm}". Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-200">Explore Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
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