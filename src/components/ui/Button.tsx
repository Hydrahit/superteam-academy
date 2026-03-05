'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', isLoading, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none radius-continuous h-[44px] md:h-[50px] px-5 text-[17px]";
    
    const variants = {
      primary: "bg-accent text-white hover:bg-accent-hover",
      secondary: "bg-surface text-primary border border-border shadow-sm hover:bg-black/5 dark:hover:bg-white/5",
      ghost: "bg-transparent text-primary hover:bg-black/5 dark:hover:bg-white/5",
      destructive: "bg-semantic-error/10 text-semantic-error hover:bg-semantic-error/20",
    };

    return (
      <button 
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
