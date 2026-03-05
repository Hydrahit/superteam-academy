import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = '', type = 'info', title, children, ...props }, ref) => {
    const styles = {
      success: 'bg-semantic-success/10 text-semantic-success border-semantic-success/20',
      error: 'bg-semantic-error/10 text-semantic-error border-semantic-error/20',
      warning: 'bg-semantic-warning/10 text-semantic-warning border-semantic-warning/20',
      info: 'bg-semantic-info/10 text-semantic-info border-semantic-info/20',
    };

    const icons = {
      success: <CheckCircle2 className="w-5 h-5" />,
      error: <AlertCircle className="w-5 h-5" />,
      warning: <AlertTriangle className="w-5 h-5" />,
      info: <Info className="w-5 h-5" />,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`flex gap-3 p-4 radius-continuous border ${styles[type]} ${className}`}
        {...props}
      >
        <div className="shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex flex-col">
          <h5 className="font-semibold text-[15px]">{title}</h5>
          {children && <div className="text-[14px] opacity-90 mt-1">{children}</div>}
        </div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';
