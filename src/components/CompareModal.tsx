// src/components/CompareModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { compareMovies } from '../api/movieApi';
import { MovieComparison } from '../types';
import Skeleton from './Skeleton';
import { FALLBACK_IMAGE_URL } from '../constants/constants';
import MovieInfo from './MovieInfo';
import ComparisonTable from './ComparisonTable';

interface CompareModalProps {
  cinemaWorldId?: string;
  filmWorldId?: string;
  onClose: () => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ cinemaWorldId, filmWorldId, onClose }) => {
  const [comparison, setComparison] = useState<MovieComparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComparison = async () => {
      if (!cinemaWorldId && !filmWorldId) {
        setError('No valid movie IDs provided.');
        setLoading(false);
        return;
      }

      try {
        const data = await compareMovies(cinemaWorldId || '', filmWorldId || '');
        setComparison(data);
      } catch (err) {
        setError('Failed to load comparison data.');
      } finally {
        setLoading(false);
      }
    };
    loadComparison();
  }, [cinemaWorldId, filmWorldId]);

  // Determine the cheapest price
  const getCheapestPrice = () => {
    if (!comparison) return null;
    const cwPrice = comparison.cinemaWorldMovie?.price
      ? parseFloat(comparison.cinemaWorldMovie.price)
      : null;
    const fwPrice = comparison.filmWorldMovie?.price
      ? parseFloat(comparison.filmWorldMovie.price)
      : null;
    
    if (cwPrice !== null && fwPrice !== null) {
      return Math.min(cwPrice, fwPrice);
    }
    return cwPrice ?? fwPrice ?? null;
  };

  const cheapestPrice = getCheapestPrice();

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="fixed inset-0 bg-black opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="relative bg-gray-900 rounded-lg p-6 w-full max-w-2xl mx-4 border-t-4 border-green-500"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors text-xl"
            aria-label="Close modal"
          >
            X
          </button>

          <Dialog.Title className="text-2xl font-bold text-gray-200 mb-4">
            {comparison?.title || 'Price Comparison'}
          </Dialog.Title>

          {loading && (
            <div className="space-y-6">
              <Skeleton width="w-full" height="h-64" className="rounded-lg mb-4" />
              <div className="space-y-2">
                <Skeleton width="w-3/4" height="h-6" />
                <Skeleton width="w-1/2" height="h-4" />
                <Skeleton width="w-2/3" height="h-4" />
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} width="w-full" height="h-4" />
                ))}
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <Skeleton width="w-1/3" height="h-5" className="mb-2" />
                <Skeleton width="w-1/2" height="h-4" />
                <Skeleton width="w-1/4" height="h-4" />
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <Skeleton width="w-1/3" height="h-5" className="mb-2" />
                <Skeleton width="w-1/2" height="h-4" />
                <Skeleton width="w-1/4" height="h-4" />
              </div>
            </div>
          )}

          {error && <p className="text-red-400">{error}</p>}

          {!loading && !error && comparison && (
            <div className="space-y-6">
              <MovieInfo comparison={comparison} />
              <ComparisonTable comparison={comparison} cheapestPrice={cheapestPrice} />
            </div>
          )}
        </motion.div>
      </div>
    </Dialog>
  );
};

export default CompareModal;