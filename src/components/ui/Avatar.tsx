import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  fallback,
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  };

  const baseClasses = 'rounded-full object-cover border-2 border-white shadow-md';

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${baseClasses} ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} ${sizes[size]} bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold ${className}`}
    >
      {fallback || alt.charAt(0).toUpperCase()}
    </div>
  );
};