import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-surface text-primary border border-border',
      success: 'bg-semantic-success/15 text-semantic-success border border-semantic-success/30',
      warning: 'bg-semantic-warning/15 text-semantic-warning border border-semantic-warning/30',
      error: 'bg-semantic-error/15 text-semantic-error border border-semantic-error/30',
      outline: 'bg-transparent text-secondary border border-border',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold tracking-wide ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
