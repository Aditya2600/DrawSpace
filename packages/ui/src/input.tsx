"use client";

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'outlined';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, variant = 'default', ...props }, ref) => {
    const baseStyles = 'w-full px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
    
    const variantStyles = {
      default: 'border border-gray-300 bg-white text-gray-900 placeholder-gray-500 hover:border-gray-400',
      outlined: 'border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 hover:border-gray-300 focus:bg-white'
    };

    const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${variantStyles[variant]} ${errorStyles} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
// import { InputHTMLAttributes } from "react";

// export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
//   return (
//     <input
//       {...props}
//       className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${props.className || ""}`}
//     />
//   );
// };