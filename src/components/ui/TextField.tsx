import React from 'react';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="flex flex-col gap-tight w-full">
        {label && (
          <label htmlFor={inputId} className="text-[13px] font-medium text-secondary ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`h-[44px] px-4 bg-canvas border ${
            error ? 'border-semantic-error focus:ring-semantic-error/20' : 'border-border focus:border-accent focus:ring-accent/20'
          } radius-continuous text-[17px] text-primary placeholder:text-secondary/50 focus:outline-none focus:ring-4 transition-all ${className}`}
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} className="text-[13px] text-semantic-error ml-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);
TextField.displayName = 'TextField';
