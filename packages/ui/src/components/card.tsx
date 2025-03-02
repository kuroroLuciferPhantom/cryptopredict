import * as React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  bordered?: boolean;
  elevated?: boolean;
}

export const Card = ({
  children,
  title,
  className = '',
  bordered = false,
  elevated = false,
}: CardProps) => {
  const baseClasses = 'bg-white rounded-lg overflow-hidden';
  const borderedClasses = bordered ? 'border border-gray-200' : '';
  const elevatedClasses = elevated ? 'shadow-lg' : '';

  return (
    <div className={`${baseClasses} ${borderedClasses} ${elevatedClasses} ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};
