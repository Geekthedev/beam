import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700';
  
  const Component = onClick || hover ? motion.div : 'div';
  
  const motionProps = onClick || hover ? {
    whileHover: { y: -4, scale: 1.02 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`${baseClasses} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
};