"use client";

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from './utils';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    loading = false, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
      outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
      ghost: 'text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizes = {
      default: 'h-11 px-6 py-2 text-sm',
      sm: 'h-9 px-4 py-1.5 text-sm',
      lg: 'h-14 px-8 py-3 text-lg',
      icon: 'h-10 w-10 p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };

// "use client";

// import React from 'react';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
//   size?: 'sm' | 'md' | 'lg';
//   loading?: boolean;
//   children: React.ReactNode;
// }

// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ 
//     className = '', 
//     variant = 'primary', 
//     size = 'md', 
//     loading = false, 
//     disabled,
//     children, 
//     ...props 
//   }, ref) => {
//     const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
//     const variantStyles = {
//       primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
//       secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
//       outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
//       ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
//     };

//     const sizeStyles = {
//       sm: 'px-3 py-1.5 text-sm',
//       md: 'px-4 py-2 text-base',
//       lg: 'px-6 py-3 text-lg'
//     };

//     return (
//       <button
//         ref={ref}
//         className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
//         disabled={disabled || loading}
//         {...props}
//       >
//         {loading && (
//           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//         )}
//         {children}
//       </button>
//     );
//   }
// );

// Button.displayName = 'Button';
// import { ReactNode } from "react";

// interface ButtonProps {
//   children: ReactNode;
//   className?: string;
//   appName: string;
// }

// export const Button = ({ children, className, appName }: ButtonProps) => {
//   return (
//     <button
//       className={className}
//       onClick={() => alert(`Hello from your ${appName} app!`)}
//     >
//       {children}
//     </button>
//   );
// };

// import { ReactNode, ButtonHTMLAttributes } from "react";

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   children: ReactNode;
//   className?: string;
//   appName?: string;
//   onClick?: () => void;
// }

// export const Button = ({ children, className = "", appName, onClick, ...props }: ButtonProps) => {
//   return (
//     <button
//       onClick={() => {
//         if (onClick) {
//           onClick();
//         } else if (appName) {
//           alert(`Hello from ${appName}!`);
//         }
//       }}
//       className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };