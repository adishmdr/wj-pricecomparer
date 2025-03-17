// src/components/Skeleton.tsx
import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = 'w-full', height = 'h-4', className = '' }) => {
  return (
    <div className={`bg-gray-200 animate-pulse rounded ${width} ${height} ${className}`} />

  );
};

export default Skeleton;