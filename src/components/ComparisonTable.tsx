// src/components/ComparisonTable.tsx
import React from 'react';
import { MovieComparison } from '../types';

interface ComparisonTableProps {
  comparison: MovieComparison;
  cheapestPrice: number | null;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ comparison, cheapestPrice }) => {
  return (
    <div className="space-y-4">
      {/* Comparison Table */}
      <div className="flex flex-row justify-around space-x-4">
        {comparison.cinemaWorldMovie && (
          <div
            className={`bg-gray-800 p-4 w-48 rounded-lg ${
              cheapestPrice === parseFloat(comparison.cinemaWorldMovie.price || '0') ? 'border-2 border-green-500' : ''
            }`}
          >
            <h4 className="font-semibold text-green-400">CinemaWorld</h4>
            {/* <p>ID: {comparison.cinemaWorldMovie.id}</p> */}
            <p>Price: ${comparison.cinemaWorldMovie.price || 'N/A'}</p>
          </div>
        )}
        {comparison.filmWorldMovie && (
          <div
            className={`bg-gray-800 p-4 w-48 rounded-lg ${
              cheapestPrice === parseFloat(comparison.filmWorldMovie.price || '0') ? 'border-2 border-green-500' : ''
            }`}
          >
            <h4 className="font-semibold text-green-400">FilmWorld</h4>
            {/* <p>ID: {comparison.filmWorldMovie.id}</p> */}
            <p>Price: ${comparison.filmWorldMovie.price || 'N/A'}</p>
          </div>
        )}
      </div>
      {/* Cheapest Price */}
      {cheapestPrice && (
        <p className="text-orange-500 font-bold text-2xl text-center">
          Cheapest Price: ${cheapestPrice.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default ComparisonTable;