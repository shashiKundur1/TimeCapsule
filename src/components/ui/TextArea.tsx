import React from 'react';
import { cn } from '../../utils/cn';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 focus:outline-none transition-all duration-200 min-h-[100px]',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-300',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };