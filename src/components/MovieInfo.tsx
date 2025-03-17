// src/components/MovieInfo.tsx
import React from 'react';
import { MovieComparison } from '../types';
import { FALLBACK_IMAGE_URL } from '../constants/constants';

interface MovieInfoProps {
  comparison: MovieComparison;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ comparison }) => {
  return (
    <div className="space-y-4">
      {/* Movie Poster */}
      <img
        src={comparison.cinemaWorldMovie?.poster || comparison.filmWorldMovie?.poster || FALLBACK_IMAGE_URL}
        alt={`${comparison.title} poster`}
        className="w-full h-64 object-cover rounded-lg"
        onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE_URL)}
      />
      {/* Movie Info */}
      <div className="text-gray-300 space-y-4">
        <div className="flex flex-row justify-between w-full">
          <p>
            <strong>Rated:</strong>{' '}
            {comparison.cinemaWorldMovie?.rated || comparison.filmWorldMovie?.rated ? (
              <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {comparison.cinemaWorldMovie?.rated || comparison.filmWorldMovie?.rated}
              </span>
            ) : (
              'N/A'
            )}
          </p>
          <p>
            <strong>Rating:</strong>{' '}
            {comparison.cinemaWorldMovie?.rating || comparison.filmWorldMovie?.rating ? (
              <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                {comparison.cinemaWorldMovie?.rating || comparison.filmWorldMovie?.rating}/10
              </span>
            ) : (
              'N/A'
            )}
          </p>
          <p>
            <strong>Metascore:</strong>{' '}
            {comparison.cinemaWorldMovie?.metascore || comparison.filmWorldMovie?.metascore ? (
              <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">
                {comparison.cinemaWorldMovie?.metascore || comparison.filmWorldMovie?.metascore}
              </span>
            ) : (
              'N/A'
            )}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p><strong>Released:</strong> {comparison.cinemaWorldMovie?.released || comparison.filmWorldMovie?.released || 'N/A'}</p>
          <p><strong>Runtime:</strong> {comparison.cinemaWorldMovie?.runtime || comparison.filmWorldMovie?.runtime || 'N/A'}</p>
          <p>{comparison.cinemaWorldMovie?.genre || comparison.filmWorldMovie?.genre || 'N/A'}</p>
        </div>
        <p><strong>Director:</strong> {comparison.cinemaWorldMovie?.director || comparison.filmWorldMovie?.director || 'N/A'}</p>
        <p><strong>Awards:</strong> {comparison.cinemaWorldMovie?.awards || comparison.filmWorldMovie?.awards || 'N/A'}</p>
        <p><strong>Actors:</strong> {comparison.cinemaWorldMovie?.actors || comparison.filmWorldMovie?.actors || 'N/A'}</p>
        <p><strong>Plot:</strong> {comparison.cinemaWorldMovie?.plot || comparison.filmWorldMovie?.plot || 'N/A'}</p>
        <p><strong>Language:</strong> {comparison.cinemaWorldMovie?.language || comparison.filmWorldMovie?.language || 'N/A'}</p>
        <p><strong>Country:</strong> {comparison.cinemaWorldMovie?.country || comparison.filmWorldMovie?.country || 'N/A'}</p>
        <p><strong>Votes:</strong> {comparison.cinemaWorldMovie?.votes || comparison.filmWorldMovie?.votes || 'N/A'}</p>
      </div>
    </div>
  );
};

export default MovieInfo;